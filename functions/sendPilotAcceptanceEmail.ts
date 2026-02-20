import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { userEmail, userName, agreementLink } = await req.json();

    if (!userEmail || !userName) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const emailBody = `Hi ${userName},

I'm excited to let you know you've been selected to participate in the pilot of the $6,950 Implementation Sprint.

This sprint is designed to help you clarify your revenue targets, strengthen your offer structure, and build your 100-contact targeting blueprint in a focused, practical way.

Before we begin, please review and sign the Pilot Participation Agreement below:

${agreementLink || '[Agreement will be sent separately]'}

Once that's complete, you'll receive platform access and onboarding instructions.

Looking forward to getting started.

—
Sarah`;

    // Use service role to send email to users who haven't signed up yet
    await base44.asServiceRole.integrations.Core.SendEmail({
      from_name: 'Sarah Heartset',
      to: userEmail,
      subject: "You're In — Pilot Access",
      body: emailBody
    });

    return Response.json({ 
      success: true,
      message: 'Pilot acceptance email sent successfully'
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});