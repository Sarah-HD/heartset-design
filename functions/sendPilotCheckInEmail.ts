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

Just checking in to see how Week 1 is going.

Have you completed:
• Revenue Target Planner
• Participation Model
• 100-Contact Criteria

If you've hit any friction, let me know — that's valuable feedback at this stage.

Keep going.

—
Sarah`;

    // Use service role to send email to users who may not be logged in
    await base44.asServiceRole.integrations.Core.SendEmail({
      from_name: 'Sarah Heartset',
      to: userEmail,
      subject: 'Quick Check-In',
      body: emailBody
    });

    return Response.json({ 
      success: true,
      message: 'Check-in email sent successfully'
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});