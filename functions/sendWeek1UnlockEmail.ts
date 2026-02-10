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
      subject: 'Week 1 Is Now Available',
      body: `Your onboarding has been received.

Week 1 is now unlocked inside your dashboard.

This week focuses on:
• Asset inventory
• Method clarity
• Audience placement
• Monetization reality

You are not required to "perfect" anything. You are required to complete what's assigned.

Access Week 1 here: ${dashboardUrl}

— Sarah`
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});