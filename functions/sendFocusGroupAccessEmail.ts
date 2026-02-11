import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    console.log('Processing focus group access email request');
    
    const { userEmail, formData } = await req.json();

    if (!userEmail) {
      return Response.json({ error: 'userEmail is required' }, { status: 400 });
    }

    const dashboardUrl = 'https://heartsetdesign.base44.app';

    // Send access email from Base44
    await base44.asServiceRole.integrations.Core.SendEmail({
      from_name: 'Heartset.app',
      to: userEmail,
      subject: 'You're in — next steps inside',
      body: `Your Focus Group registration has been confirmed.

Dashboard: ${dashboardUrl}

What happens next:
• You'll receive a separate email from Sarah with important instructions
• Check both your Primary and Promotions folders
• Watch for session dates and materials

This is an automated confirmation from the Heartset platform.

Questions? Reply to any email from Sarah.`
    });

    // Sync to HubSpot to trigger the orientation email
    try {
      const hubspotToken = await base44.asServiceRole.connectors.getAccessToken('hubspot');
      
      const contactPayload = {
        properties: {
          email: userEmail,
          firstname: formData.firstName,
          lastname: formData.lastName,
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
      // Continue anyway - the Base44 email was sent
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});