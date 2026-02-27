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

    await sendGmail(base44, userEmail, 'Week 1 Received', `Your Week 1 submission has been received.

No additional action is required at this time.

Week 2 instructions will be released according to the Sprint schedule.

— Sarah`);

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});