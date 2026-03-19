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

    // 1. Invite user to platform
    await base44.users.inviteUser(userEmail, 'user');

    // 2. Create tier assignment
    await base44.asServiceRole.entities.TierAssignment.create({
      userEmail: userEmail,
      tier: 'sprint_6500',
      status: 'assigned',
      isProBono: true,
      isBypass: false,
      adminNotes: `Pro bono pilot participant - onboarded ${new Date().toISOString()}`
    });

    // 3. Create empty sprint onboarding record
    await base44.asServiceRole.entities.SprintOnboarding.create({
      userEmail: userEmail,
      ipAcknowledgement: false,
      clientIpAcknowledgement: false,
      executionAcknowledgement: false
    });

    // 4. Update user with cohort type
    const invitedUser = await base44.asServiceRole.entities.User.filter({ email: userEmail });
    if (invitedUser.length > 0) {
      await base44.asServiceRole.entities.User.update(invitedUser[0].id, {
        cohort_type: 'sprint',
        full_name: userName
      });
    }

    return Response.json({ 
      success: true,
      message: 'Pro bono user onboarded successfully'
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});