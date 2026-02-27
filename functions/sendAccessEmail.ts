import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

async function sendGmail(base44, to, subject, body, fromName = 'Sarah from Heartset Design') {
  const accessToken = await base44.asServiceRole.connectors.getAccessToken('gmail');
  const messageParts = [
    `To: ${to}`,
    `From: ${fromName} <me>`,
    `Subject: ${subject}`,
    'Content-Type: text/plain; charset=utf-8',
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
    
    const { userEmail } = await req.json();

    if (!userEmail) {
      return Response.json({ error: 'userEmail is required' }, { status: 400 });
    }

    const dashboardUrl = 'https://heartsetdesign.base44.app';

    await sendGmail(base44, userEmail, 'Your Authority Infrastructure™ Access Is Live', `You've been granted access to the Authority Infrastructure™ Sprint.

Your next steps are simple:
1. Log in to your dashboard
2. Complete your Client Profile
3. Complete your Sprint Onboarding

These must be completed before Week 1 materials unlock.

This Sprint is execution-based. No preparation is required beyond completing what's assigned.

Access your dashboard here: ${dashboardUrl}

— Sarah`);

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});