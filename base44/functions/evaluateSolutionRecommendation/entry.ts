import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Evaluates onboarding survey responses and recommends a solution path
 * Based on readiness signals, capacity, and complexity
 */

function evaluateSolution(onboardingData) {
  let score = {
    sprint: 0,
    custom: 0,
    diy: 0
  };

  // Readiness Signals
  if (onboardingData.hasMethod) {
    score.sprint += 2;
    score.custom += 1;
  } else {
    score.diy += 3;
  }

  // Method components indicate structure
  const componentCount = onboardingData.methodComponents?.length || 0;
  if (componentCount >= 4) {
    score.sprint += 2;
    score.custom += 2;
  } else if (componentCount >= 2) {
    score.sprint += 1;
  } else {
    score.diy += 1;
  }

  // Existing assets show execution history
  const assetCount = onboardingData.existingAssets?.length || 0;
  if (assetCount >= 2) {
    score.sprint += 2;
  } else if (assetCount >= 1) {
    score.sprint += 1;
  } else {
    score.diy += 2;
  }

  // Prior pricing history
  const highestPrice = onboardingData.highestPrice || 0;
  if (highestPrice >= 10000) {
    score.custom += 3;
    score.sprint += 1;
  } else if (highestPrice >= 3000) {
    score.sprint += 3;
  } else if (highestPrice >= 500) {
    score.sprint += 1;
  } else {
    score.diy += 2;
  }

  // Authority signals (credentials + outcomes)
  if (onboardingData.credentials && onboardingData.credentials.length > 10) {
    score.sprint += 1;
    score.custom += 1;
  }
  const outcomeCount = onboardingData.outcomes?.length || 0;
  if (outcomeCount >= 2) {
    score.sprint += 1;
  }

  // Delivery complexity
  const deliveryFormats = onboardingData.deliveryFormat?.length || 0;
  if (deliveryFormats >= 3) {
    score.custom += 2;
  } else if (deliveryFormats >= 1) {
    score.sprint += 1;
  }

  // Tool ecosystem maturity
  let toolCount = 0;
  if (onboardingData.toolWebsite) toolCount++;
  if (onboardingData.toolEmail) toolCount++;
  if (onboardingData.toolScheduling) toolCount++;
  if (onboardingData.toolForms) toolCount++;
  if (onboardingData.toolDocuments) toolCount++;

  if (toolCount >= 4) {
    score.sprint += 2;
  } else if (toolCount >= 2) {
    score.sprint += 1;
  } else {
    score.diy += 1;
  }

  // Determine recommendation
  if (score.custom > score.sprint && score.custom > score.diy) {
    return 'custom_advanced';
  } else if (score.sprint > score.diy) {
    return 'sprint_6500';
  } else {
    return 'diy_selfguided';
  }
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { onboardingId } = await req.json();

    if (!onboardingId) {
      return Response.json({ error: 'onboardingId required' }, { status: 400 });
    }

    // Get onboarding data
    const onboardings = await base44.entities.SprintOnboarding.filter({ id: onboardingId });
    if (!onboardings || onboardings.length === 0) {
      return Response.json({ error: 'Onboarding not found' }, { status: 404 });
    }

    const onboarding = onboardings[0];

    // Evaluate recommendation
    const recommendation = evaluateSolution(onboarding);

    // Update onboarding with recommendation
    await base44.entities.SprintOnboarding.update(onboardingId, {
      recommendedSolution: recommendation
    });

    return Response.json({
      success: true,
      recommendation
    });

  } catch (error) {
    console.error('Solution evaluation error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});