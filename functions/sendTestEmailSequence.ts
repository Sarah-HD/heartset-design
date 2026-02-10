import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { testEmail } = await req.json();

    if (!testEmail) {
      return Response.json({ error: 'testEmail is required' }, { status: 400 });
    }

    // Send all 5 emails in sequence
    await base44.asServiceRole.functions.invoke('sendAccessEmail', { userEmail: testEmail });
    await base44.asServiceRole.functions.invoke('sendOnboardingReminderEmail', { userEmail: testEmail });
    await base44.asServiceRole.functions.invoke('sendWeek1UnlockEmail', { userEmail: testEmail });
    await base44.asServiceRole.functions.invoke('sendWeek1CheckpointEmail', { userEmail: testEmail });
    await base44.asServiceRole.functions.invoke('sendWeek1ReceivedEmail', { userEmail: testEmail });

    return Response.json({ 
      success: true,
      message: 'All 5 test emails sent successfully'
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});