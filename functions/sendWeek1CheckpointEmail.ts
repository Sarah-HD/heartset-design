import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    const { userEmail } = await req.json();

    if (!userEmail) {
      return Response.json({ error: 'userEmail is required' }, { status: 400 });
    }

    const dashboardUrl = 'https://heartsetdesign.base44.app';

    await base44.asServiceRole.integrations.Core.SendEmail({
      from_name: 'Sarah — Heartset Design',
      to: userEmail,
      subject: 'Week 1 Execution Checkpoint',
      body: `This is a checkpoint reminder for Week 1.

If you are behind:
• Catch up
• Submit what you have
• Move forward

Momentum matters more than polish.

Access your dashboard here: ${dashboardUrl}

— Sarah`
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});