import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

async function sendGmail(base44, to, subject, body, fromName = 'Sarah from Heartset Design') {
  const accessToken = await base44.asServiceRole.connectors.getAccessToken('gmail');
  const messageParts = [
    `To: ${to}`,
    `From: ${fromName} <me>`,
    `Subject: ${subject}`,
    'Content-Type: text/html; charset=utf-8',
    '',
    body
  ];
  const message = messageParts.join('\n');
  const encoded = btoa(unescape(encodeURIComponent(message))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ raw: encoded })
  });
  if (!res.ok) throw new Error(await res.text());
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { userEmail, userName, agreementLink } = await req.json();

    if (!userEmail || !userName) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const firstName = userName.split(' ')[0];
    const emailBody = `
    <p>Hi ${firstName},</p>
    
    <p>I'm excited to let you know you've been selected to participate in the pilot of the $6,950 Implementation Sprint.</p>
    
    <p>This sprint is designed to help you:</p>
    <ul>
      <li>Clarify your revenue targets</li>
      <li>Strengthen your offer structure</li>
      <li>Build your 100-contact targeting blueprint in a focused, practical way</li>
    </ul>
    
    <p><strong>Next Steps</strong></p>
    
    <ol>
      <li><strong>Review & Sign:</strong> Please check your inbox for a separate email from SignWell. You will need to sign the Pilot Participation Agreement electronically.</li>
      <li><strong>Access:</strong> Once the document is signed, you'll receive your platform access and onboarding instructions immediately.</li>
    </ol>
    
    <p>I'm looking forward to getting started!</p>
    
    <p>Best,<br>Sarah</p>
    `;

    await sendGmail(base44, userEmail, "Action Required: Your Pilot Participation Agreement", emailBody);

    return Response.json({ 
      success: true,
      message: 'Pilot acceptance email sent successfully'
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});