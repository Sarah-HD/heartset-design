import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import { Client, Environment } from 'npm:square';

const squareClient = new Client({
  accessToken: Deno.env.get('SQUARE_ACCESS_TOKEN'),
  environment: Environment.Production
});

const TIER_PRICING = {
  'sprint_6500': {
    amount: 650000, // $6,500 in cents
    name: 'Authority Infrastructure™ Implementation Sprint',
    description: '28-day structured execution sprint'
  },
  'advisory_10000': {
    amount: 1000000, // $10,000 in cents
    name: 'Authority Infrastructure™ Advisory',
    description: 'Framework refinement and market positioning'
  },
  'infrastructure_25000': {
    amount: 2500000, // $25,000 in cents
    name: 'Authority Infrastructure™ Full Build',
    description: 'Complete system build and implementation'
  }
};

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { userEmail, tier, tierAssignmentId } = await req.json();

    if (!userEmail || !tier || !TIER_PRICING[tier]) {
      return Response.json({ error: 'Invalid parameters' }, { status: 400 });
    }

    const pricing = TIER_PRICING[tier];

    // Create payment link
    const response = await squareClient.checkoutApi.createPaymentLink({
      idempotencyKey: `${tierAssignmentId}-${Date.now()}`,
      order: {
        locationId: 'main', // You may need to update this with actual location ID
        lineItems: [{
          name: pricing.name,
          quantity: '1',
          basePriceMoney: {
            amount: BigInt(pricing.amount),
            currency: 'USD'
          },
          note: pricing.description
        }]
      },
      checkoutOptions: {
        askForShippingAddress: false,
        allowTipping: false,
        customFields: [{
          title: 'Email'
        }],
        subscriptionPlanId: null,
        redirectUrl: `https://heartsetdesign.base44.app/Account`,
        merchantSupportEmail: 'support@heartsetdesign.com'
      },
      prePopulatedData: {
        buyerEmail: userEmail
      }
    });

    const paymentLink = response.result.paymentLink;

    return Response.json({
      success: true,
      paymentUrl: paymentLink.url,
      paymentLinkId: paymentLink.id,
      orderId: paymentLink.orderId
    });

  } catch (error) {
    console.error('Square payment link error:', error);
    return Response.json({ 
      error: error.message,
      details: error.errors || []
    }, { status: 500 });
  }
});