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
      subject: 'Your Authority Infrastructure™ Access Is Live',
      body: `You've been granted access to the Authority Infrastructure™ Sprint.

Your next steps are simple:
1. Log in to your dashboard
2. Complete your Client Profile
3. Complete your Sprint Onboarding

These must be completed before Week 1 materials unlock.

This Sprint is execution-based. No preparation is required beyond completing what's assigned.

Access your dashboard here: ${dashboardUrl}

— Sarah`
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});