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

    const emailBody = `
    <p>Hi ${userName},</p>
    
    <p>I'm excited to let you know you've been selected to participate in the pilot of the $6,950 Implementation Sprint.</p>
    
    <p>This sprint is designed to help you:</p>
    <ul>
      <li>Clarify your revenue targets</li>
      <li>Strengthen your offer structure</li>
      <li>Build your 100-contact targeting blueprint in a focused, practical way</li>
    </ul>
    
    <p><strong>Next Steps</strong></p>
    
    <ol>
      <li><strong>Review & Sign:</strong> Please check your inbox for a separate email from SignWell. You will need to sign the Pilot Participation Agreement electronically.</li>
      <li><strong>Access:</strong> Once the document is signed, you'll receive your platform access and onboarding instructions immediately.</li>
    </ol>
    
    <p>I'm looking forward to getting started!</p>
    
    <p>Best,<br>Sarah</p>
    `;

    await base44.asServiceRole.integrations.Core.SendEmail({
      from_name: 'Heartset Design',
      to: userEmail,
      subject: "Action Required: Your Pilot Participation Agreement",
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