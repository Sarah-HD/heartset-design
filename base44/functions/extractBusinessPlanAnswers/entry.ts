import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { file_url } = await req.json();

    if (!file_url) {
      return Response.json({ error: 'file_url is required' }, { status: 400 });
    }

    const extractionSchema = {
      type: "object",
      properties: {
        weekly_client_hours: { type: "string" },
        weekly_admin_hours: { type: "string" },
        revenue_density: { type: "string" },
        scalability_check: { type: "string" },
        market_role: { type: "string" },
        target_client: { type: "string" },
        problem_gap: { type: "string" },
        transformation: { type: "string" },
        has_framework: { type: "string" },
        framework_name: { type: "string" },
        framework_pillars: { type: "string" },
        pillar_logic: { type: "string" },
        documentation_level: { type: "string" },
        existing_assets: { type: "string" },
        asset_registry: { type: "string" },
        asset_performance: { type: "string" },
        authority_marks: { type: "string" },
        outcome_evidence: { type: "string" },
        proof_types: { type: "string" },
        delivery_load: { type: "string" },
        delivery_format: { type: "string" },
        growth_constraints: { type: "string" },
        offer_suite: { type: "string" },
        premium_tier: { type: "string" },
        offer_structure: { type: "string" },
        breaking_point: { type: "string" },
        offer_outcome_definition: { type: "string" },
        market_gathering: { type: "string" },
        demand_history: { type: "string" },
        client_voice: { type: "string" },
        objection_handling: { type: "string" },
        tech_stack: { type: "string" },
        ownership: { type: "string" },
        success_metric: { type: "string" },
        thirty_day_bound: { type: "string" },
        revenue_sprint_target: { type: "string" },
        reverse_outreach: { type: "string" },
        contact_criteria: { type: "string" }
      }
    };

    const extractionResult = await base44.integrations.Core.ExtractDataFromUploadedFile({
      file_url,
      json_schema: extractionSchema
    });

    if (extractionResult.status === 'error') {
      return Response.json({ 
        error: 'Failed to extract data from document',
        details: extractionResult.details 
      }, { status: 400 });
    }

    const mappedAnswers = {
      "1.1": extractionResult.output.weekly_client_hours || "",
      "1.2": extractionResult.output.revenue_density || "",
      "1.3": extractionResult.output.scalability_check || "",
      "2.1": extractionResult.output.market_role || "",
      "2.2": extractionResult.output.target_client || "",
      "2.3": extractionResult.output.problem_gap || "",
      "2.4": extractionResult.output.transformation || "",
      "3.1": extractionResult.output.has_framework || "",
      "3.2": extractionResult.output.framework_name || "",
      "3.3": extractionResult.output.framework_pillars || "",
      "3.4": extractionResult.output.pillar_logic || "",
      "3.5": extractionResult.output.documentation_level || "",
      "4.1": extractionResult.output.existing_assets || "",
      "4.2": extractionResult.output.asset_registry || "",
      "4.3": extractionResult.output.asset_performance || "",
      "4.4": extractionResult.output.authority_marks || "",
      "4.5": extractionResult.output.outcome_evidence || "",
      "4.6": extractionResult.output.proof_types || "",
      "5.1": extractionResult.output.delivery_load || "",
      "5.2": extractionResult.output.delivery_format || "",
      "5.3": extractionResult.output.growth_constraints || "",
      "5.4": extractionResult.output.offer_suite || "",
      "5.5": extractionResult.output.premium_tier || "",
      "5.6": extractionResult.output.offer_structure || "",
      "5.7": extractionResult.output.breaking_point || "",
      "5.8": extractionResult.output.offer_outcome_definition || "",
      "6.1": extractionResult.output.market_gathering || "",
      "6.2": extractionResult.output.demand_history || "",
      "6.3": extractionResult.output.client_voice || "",
      "6.4": extractionResult.output.objection_handling || "",
      "6.5": extractionResult.output.tech_stack || "",
      "6.6": extractionResult.output.ownership || "",
      "7.1": extractionResult.output.success_metric || "",
      "7.2": extractionResult.output.thirty_day_bound || "",
      "7.3": extractionResult.output.revenue_sprint_target || "",
      "7.4": extractionResult.output.reverse_outreach || "",
      "7.5": extractionResult.output.contact_criteria || ""
    };

    return Response.json({ 
      success: true,
      answers: mappedAnswers
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});