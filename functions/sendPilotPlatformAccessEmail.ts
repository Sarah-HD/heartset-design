import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { userEmail, userName, loginLink } = await req.json();

    if (!userEmail || !userName) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const emailBody = `Hi ${userName},

Your agreement has been received — welcome in.

You now have access to the platform.

The first step is completing your onboarding baseline. This gives me visibility into your current structure so the Sprint starts from the right foundation.

Once that's submitted, I'll unlock Week 1 for you.

Here's your login link:
${loginLink}

Excited to see what you build inside this.

—
Sarah`;

    await base44.integrations.Core.SendEmail({
      from_name: 'Sarah Heartset',
      to: userEmail,
      subject: 'Access + First Step',
      body: emailBody
    });

    return Response.json({ 
      success: true,
      message: 'Platform access email sent successfully'
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});