import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { surveyResponseId } = await req.json();

    // Fetch the survey response
    const responses = await base44.entities.SurveyResponse.filter({ id: surveyResponseId });
    if (responses.length === 0) {
      return Response.json({ error: 'Survey response not found' }, { status: 404 });
    }

    const response = responses[0];
    const nextStep = response.responses.next_step;
    const commAuth = response.responses.communication_auth;
    const userEmail = response.userEmail;

    // Exit if user declined communication
    if (commAuth === "Not at this time") {
      return Response.json({ message: 'User declined communication', sent: false });
    }

    let emailSubject = '';
    let emailBody = '';

    // Route email based on Q14 answer
    switch (nextStep) {
      case "28-Day Guided Sprint":
        emailSubject = "Your 28-Day Guided Sprint – Next Steps";
        emailBody = `Thank you for completing the Focus Group survey.

Based on your response, the 28-Day Guided Sprint is the right next step for you.

What's Included:
• 4 weeks of structured execution
• Weekly office hours (Tue/Thu)
• Assignment review + feedback
• Direct access to support infrastructure

Investment: $6,500

Your next step:
Reply to this email to schedule your intake call, or book directly at [CALENDAR LINK].

We'll walk through:
• Your current offer structure
• Lead generation constraints
• Expected 28-day outcomes

Looking forward to working with you.

— Heartset Design Team`;
        break;

      case "Private / Advisory Support":
        emailSubject = "Private Advisory Support – Intake Process";
        emailBody = `Thank you for completing the Focus Group survey.

Based on your response, Private Advisory Support is the best fit for your current stage.

What This Looks Like:
• Custom engagement structure
• Direct advisory access
• Institutional or high-complexity projects
• Flexible timeline + scope

Next Step:
Reply to this email with a brief overview of what you're building, and we'll schedule a discovery call to determine fit and structure.

This is not a sales call — it's a scoping conversation.

— Heartset Design Team`;
        break;

      case "DIY / Self-paced":
        emailSubject = "DIY Resources – Your Self-Paced Path";
        emailBody = `Thank you for completing the Focus Group survey.

Based on your response, you're ready to move forward independently.

Here's what we recommend:
• Re-watch the Focus Group videos at your own pace
• Use the reflection prompts to clarify your offer + lead strategy
• Apply the Law of Averages framework to your current pipeline

If you get stuck or need support later, we're here.

The 28-Day Sprint or Advisory options remain available when you're ready.

— Heartset Design Team`;
        break;

      case "No next step right now":
        emailSubject = "Thank You for Participating";
        emailBody = `Thank you for completing the Focus Group survey.

We understand you're not ready for a next step right now — that's completely fine.

If anything changes or you'd like to revisit the 28-Day Sprint or Advisory support, just reply to this email.

We'll keep you updated on future offerings.

— Heartset Design Team`;
        break;

      default:
        return Response.json({ error: 'Invalid next_step value' }, { status: 400 });
    }

    // Send email via Base44 integration
    await base44.integrations.Core.SendEmail({
      from_name: "Heartset Design",
      to: userEmail,
      subject: emailSubject,
      body: emailBody
    });

    return Response.json({ 
      message: 'Conversion email sent successfully',
      sent: true,
      nextStep 
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});