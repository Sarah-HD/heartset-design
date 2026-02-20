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

    const emailBody = `Action Required: Your Pilot Participation Agreement

Hi ${userName},

I'm excited to let you know you've been selected to participate in the pilot of the $6,950 Implementation Sprint.

This sprint is designed to help you:
• Clarify your revenue targets
• Strengthen your offer structure
• Build your 100-contact targeting blueprint in a focused, practical way

Next Steps

1. Review & Sign: Please check your inbox for a separate email from SignWell. You will need to sign the Pilot Participation Agreement electronically.

2. Access: Once the document is signed, you'll receive your platform access and onboarding instructions immediately.

I'm looking forward to getting started!

Best,
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