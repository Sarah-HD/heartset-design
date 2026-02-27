import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { userEmail, formData } = await req.json();

    if (!userEmail) {
      return Response.json({ error: 'userEmail is required' }, { status: 400 });
    }

    const dashboardUrl = 'https://heartsetdesign.base44.app';

    const accessToken = await base44.asServiceRole.connectors.getAccessToken('gmail');
    const gmailBody = `Your Focus Group registration has been confirmed.

Dashboard: ${dashboardUrl}

What happens next:
• You'll receive a separate email from Sarah with important instructions
• Check both your Primary and Promotions folders
• Watch for session dates and materials

This is an automated confirmation from the Heartset platform.

Questions? Reply to any email from Sarah.`;
    const messageParts = [
      `To: ${userEmail}`,
      `Subject: You're in — next steps inside`,
      'Content-Type: text/plain; charset=utf-8',
      '',
      gmailBody
    ];
    const message = messageParts.join('\n');
    const encoded = btoa(unescape(encodeURIComponent(message))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const gmailRes = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ raw: encoded })
    });
    if (!gmailRes.ok) throw new Error(await gmailRes.text());

    // Sync to HubSpot to trigger the orientation email
    try {
      const hubspotToken = await base44.asServiceRole.connectors.getAccessToken('hubspot');
      
      const contactPayload = {
        properties: {
          email: userEmail,
          firstname: formData?.firstName,
          lastname: formData?.lastName,
          focus_group_status: 'submitted',
          focus_group_submission_date: new Date().toISOString()
        }
      };

      await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${hubspotToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactPayload)
      });
    } catch (hubspotError) {
      console.error('HubSpot sync failed:', hubspotError);
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});