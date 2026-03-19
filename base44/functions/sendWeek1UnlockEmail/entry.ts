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
    
    const { userEmail, userName } = await req.json();

    if (!userEmail) {
      return Response.json({ error: 'userEmail is required' }, { status: 400 });
    }

    const dashboardUrl = 'https://heartsetdesign.base44.app';
    const firstName = userName ? userName.split(' ')[0] : '';
    const greeting = firstName ? `Hi ${firstName},\n\n` : '';

    await sendGmail(base44, userEmail, 'Week 1 Is Now Available', `${greeting}Your onboarding has been received.

Week 1 is now unlocked inside your dashboard.

This week focuses on:
• Asset inventory
• Method clarity
• Audience placement
• Monetization reality

You are not required to "perfect" anything. You are required to complete what's assigned.

Access Week 1 here: ${dashboardUrl}

— Sarah`);

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});