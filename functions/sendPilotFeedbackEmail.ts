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

Now that you've moved through the Sprint, I'd love your honest feedback.

A few quick questions:
1. What felt most valuable?
2. Where did you feel friction?
3. What would strengthen this as a $6,950 implementation experience?

Direct feedback is welcome — this is how the final version gets sharper.

Appreciate you being part of this.

—
Sarah`;

    await base44.integrations.Core.SendEmail({
      from_name: 'Sarah Heartset',
      to: userEmail,
      subject: 'Pilot Feedback',
      body: emailBody
    });

    return Response.json({ 
      success: true,
      message: 'Feedback email sent successfully'
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});