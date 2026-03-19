import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    // Get all admin users
    const users = await base44.asServiceRole.entities.User.filter({ role: 'admin' });
    
    for (const user of users) {
      await base44.asServiceRole.integrations.Core.SendEmail({
        to: user.email,
        from_name: "Authority Infrastructure™",
        subject: "Quarterly System Audit Required",
        body: `
          <h2>Quarterly Authority Infrastructure™ System Audit Required</h2>
          <p><strong>Action Required:</strong> Conduct full audit of Parts 1–4</p>
          <p>Verify routing logic, eligibility enforcement, and system integrity controls.</p>
          <p><a href="${Deno.env.get('BASE44_APP_URL')}/OperatingManual">Access Operating Manual</a></p>
          <p>Complete the audit checkbox when finished to update your compliance record.</p>
        `
      });
    }
    
    return Response.json({ success: true, notified: users.length });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});