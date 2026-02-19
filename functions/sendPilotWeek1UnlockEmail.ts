import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { userEmail, userName } = await req.json();

    if (!userEmail || !userName) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const emailBody = `Hi ${userName},

Week 1 is now unlocked in your dashboard.

This week will help you:
• Define your revenue target
• Model your participation assumptions
• Clarify your tier outcomes
• Build your 100-contact criteria

Take your time and move through it thoughtfully.

Thank you again for being part of the pilot — your feedback genuinely helps refine this into a strong $6,950 experience.

—
Sarah`;

    await base44.integrations.Core.SendEmail({
      from_name: 'Sarah Heartset',
      to: userEmail,
      subject: 'Week 1 Is Live',
      body: emailBody
    });

    return Response.json({ 
      success: true,
      message: 'Week 1 unlock email sent successfully'
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});