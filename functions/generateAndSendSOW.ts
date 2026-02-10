import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import { jsPDF } from 'npm:jspdf@4.0.0';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { userEmail, tierAssignmentId, documentType = 'scope_of_work' } = await req.json();

    if (!userEmail) {
      return Response.json({ error: 'userEmail is required' }, { status: 400 });
    }

    // Create a tracking record
    const docRecord = await base44.asServiceRole.entities.LegalDocument.create({
      userEmail,
      documentType,
      status: 'generating',
      tierAssignmentId
    });

    try {
      // Get tier assignment details for context
      const assignments = await base44.asServiceRole.entities.TierAssignment.filter({ userEmail });
      const assignment = assignments.find(a => a.id === tierAssignmentId) || assignments[0];

      // Generate SOW content using AI
      const sowContent = await base44.asServiceRole.integrations.Core.InvokeLLM({
        prompt: `Generate a professional Scope of Work document for Heartset Design Authority Infrastructure™.

Client Email: ${userEmail}
Tier: ${assignment?.tier || 'custom'}
Pro Bono: ${assignment?.isProBono ? 'Yes' : 'No'}

The document should include:
1. Project Overview (Authority Infrastructure™ engagement)
2. Scope of Services (based on tier: Sprint, Advisory, or Infrastructure)
3. Timeline and Milestones
4. Deliverables
5. Client Responsibilities
6. Terms and Conditions

Make it professional, clear, and tailored to the tier level. Use formal legal language appropriate for a scope of work contract.`,
      });

      // Create PDF
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      const maxLineWidth = pageWidth - 2 * margin;

      // Title
      doc.setFontSize(20);
      doc.text('SCOPE OF WORK', pageWidth / 2, 20, { align: 'center' });
      
      doc.setFontSize(16);
      doc.text('Heartset Design', pageWidth / 2, 30, { align: 'center' });

      // Content
      doc.setFontSize(11);
      const lines = doc.splitTextToSize(sowContent, maxLineWidth);
      let y = 45;

      lines.forEach((line) => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        doc.text(line, margin, y);
        y += 7;
      });

      // Signature section
      if (y > 240) {
        doc.addPage();
        y = 20;
      }
      y += 20;
      doc.setFontSize(12);
      doc.text('Client Signature: _________________________', margin, y);
      y += 10;
      doc.text(`Date: _________________________`, margin, y);

      const pdfBytes = doc.output('arraybuffer');
      const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
      const pdfFile = new File([pdfBlob], `SOW_${userEmail}_${Date.now()}.pdf`, { type: 'application/pdf' });

      // Upload PDF to Base44
      const { file_url: pdfUrl } = await base44.asServiceRole.integrations.Core.UploadFile({ 
        file: pdfFile 
      });

      // Send to SignWell
      const signwellApiKey = Deno.env.get('SIGNWELL_API_KEY');
      
      if (!signwellApiKey) {
        throw new Error('SIGNWELL_API_KEY not configured');
      }

      // Create SignWell document
      const signwellResponse = await fetch('https://www.signwell.com/api/v1/documents/', {
        method: 'POST',
        headers: {
          'X-Api-Key': signwellApiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          test_mode: false,
          name: `Scope of Work - ${userEmail}`,
          files: [{
            name: `SOW_${userEmail}.pdf`,
            file_url: pdfUrl
          }],
          recipients: [{
            email: userEmail,
            name: userEmail.split('@')[0],
            order: 1
          }],
          draft: false
        })
      });

      if (!signwellResponse.ok) {
        const errorText = await signwellResponse.text();
        throw new Error(`SignWell API error: ${errorText}`);
      }

      const signwellData = await signwellResponse.json();

      // Update record with success
      await base44.asServiceRole.entities.LegalDocument.update(docRecord.id, {
        status: 'sent',
        generatedContent: sowContent,
        docusealSubmissionId: signwellData.id
      });

      return Response.json({ 
        success: true, 
        documentId: docRecord.id,
        pdfUrl,
        message: 'Scope of Work generated and sent for signature'
      });

    } catch (error) {
      // Update record with failure
      await base44.asServiceRole.entities.LegalDocument.update(docRecord.id, {
        status: 'failed',
        errorMessage: error.message
      });
      throw error;
    }

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});