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
      from_name: 'Heartset Design',
      to: userEmail,
      subject: 'Onboarding Required to Proceed',
      body: `Your Authority Infrastructure™ Sprint onboarding is still incomplete.

Completion is required to:
• Unlock Week 1 materials
• Participate in execution tracking
• Receive next-step instructions

This onboarding is not creative work. It is an inventory of what already exists.

Complete onboarding here: ${dashboardUrl}

— Sarah`
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});