import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    const { userEmail } = await req.json();

    if (!userEmail) {
      return Response.json({ error: 'userEmail is required' }, { status: 400 });
    }

    await base44.asServiceRole.integrations.Core.SendEmail({
      from_name: 'Sarah — Heartset Design',
      to: userEmail,
      subject: 'Week 1 Received',
      body: `Your Week 1 submission has been received.

No additional action is required at this time.

Week 2 instructions will be released according to the Sprint schedule.

— Sarah`
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});