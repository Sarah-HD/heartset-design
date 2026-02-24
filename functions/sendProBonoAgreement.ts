import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import { jsPDF } from 'npm:jspdf@4.0.0';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { userEmail, tierAssignmentId } = await req.json();

    if (!userEmail) {
      return Response.json({ error: 'userEmail is required' }, { status: 400 });
    }

    const docRecord = await base44.asServiceRole.entities.LegalDocument.create({
      userEmail,
      documentType: 'pro_bono_contract',
      status: 'generating',
      tierAssignmentId
    });

    try {
      const proBonoContent = `This Agreement ("Agreement") is entered into between Heartset Design ("Provider") and ${userEmail} ("Participant").

1. NATURE OF ENGAGEMENT
This is a pro bono or pilot engagement for the Authority Infrastructure™ Sprint program. Participant acknowledges this is a reduced-rate or complimentary offering provided in exchange for feedback and case study participation.

2. PROGRAM DELIVERABLES
Provider will deliver:
• Access to the 28-day Authority Infrastructure™ Sprint program
• Video training materials
• Homework assignments and structured exercises
• Office hours access (subject to availability)
• Dashboard access for program duration

3. PARTICIPANT OBLIGATIONS
Participant agrees to:
• Complete onboarding materials in a timely manner
• Engage with assigned homework and exercises
• Provide honest feedback on program materials and structure
• Allow Provider to use anonymized results as case study material
• Respect program boundaries (no DM coaching, no brainstorming sessions)

4. INTELLECTUAL PROPERTY
• All program materials, methods, and frameworks remain the sole property of Heartset Design
• Participant retains ownership of their own business information and submissions
• Provider may reference Participant's results (anonymized) in marketing materials

5. NO GUARANTEES
This program focuses on organizing existing work into scalable infrastructure. Provider makes no guarantees regarding revenue, client acquisition, or business outcomes.

6. CONFIDENTIALITY
Both parties agree to maintain confidentiality of proprietary business information shared during the engagement.

7. TERM AND TERMINATION
This Agreement begins upon signature and continues through program completion (approximately 28 days). Either party may terminate with written notice.

8. LIMITATION OF LIABILITY
Provider's liability is limited to the amount paid (if any) for the program.

By signing below, Participant acknowledges they have read, understood, and agree to the terms of this Agreement.`;

      // Create PDF
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const maxLineWidth = pageWidth - 2 * margin;

      doc.setFontSize(16);
      doc.text('PRO BONO / PILOT AGREEMENT', pageWidth / 2, 20, { align: 'center' });
      
      doc.setFontSize(12);
      doc.text('Heartset Design', pageWidth / 2, 30, { align: 'center' });

      doc.setFontSize(10);
      const lines = doc.splitTextToSize(proBonoContent, maxLineWidth);
      let y = 45;

      lines.forEach((line) => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        doc.text(line, margin, y);
        y += 6;
      });

      // Signature section
      if (y > 240) {
        doc.addPage();
        y = 20;
      }
      y += 20;
      const signaturePage = doc.internal.getCurrentPageInfo().pageNumber;
      const signatureY = y;
      
      doc.setFontSize(11);
      doc.text('Participant Signature: _________________________', margin, y);
      y += 10;
      const dateY = y;
      doc.text(`Date: _________________________`, margin, y);

      const pdfBytes = doc.output('arraybuffer');
      const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
      const pdfFile = new File([pdfBlob], `ProBono_Agreement_${userEmail}_${Date.now()}.pdf`, { type: 'application/pdf' });

      const { file_url: pdfUrl } = await base44.asServiceRole.integrations.Core.UploadFile({ 
        file: pdfFile 
      });

      const signwellApiKey = Deno.env.get('SIGNWELL_API_KEY');
      
      if (!signwellApiKey) {
        throw new Error('SIGNWELL_API_KEY not configured');
      }

      // Create and send document with signature and date fields positioned correctly
      const signwellResponse = await fetch('https://www.signwell.com/api/v1/documents/', {
        method: 'POST',
        headers: {
          'X-Api-Key': signwellApiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          test_mode: false,
          name: `Pro Bono Agreement - ${userEmail}`,
          files: [{
            name: `ProBono_Agreement_${userEmail}.pdf`,
            file_url: pdfUrl
          }],
          recipients: [
            {
              id: '1',
              email: userEmail,
              name: userEmail.split('@')[0]
            }
          ],
          fields: [
            [
              {
                type: 'signature',
                page: signaturePage,
                x: 140,
                y: pageHeight - signatureY - 10,
                width: 200,
                height: 40,
                recipient_id: '1',
                required: true
              },
              {
                type: 'text',
                page: signaturePage,
                x: 40,
                y: pageHeight - dateY - 5,
                width: 150,
                height: 20,
                recipient_id: '1',
                required: true,
                label: 'Date'
              }
            ]
          ]
        })
      });

      if (!signwellResponse.ok) {
        const errorText = await signwellResponse.text();
        throw new Error(`SignWell API error: ${errorText}`);
      }

      const signwellData = await signwellResponse.json();
      const documentId = signwellData.id;

      await base44.asServiceRole.entities.LegalDocument.update(docRecord.id, {
        status: 'sent',
        generatedContent: proBonoContent,
        docusealSubmissionId: documentId
      });

      return Response.json({ 
        success: true, 
        documentId: docRecord.id,
        pdfUrl,
        message: 'Pro Bono Agreement generated and sent for signature'
      });

    } catch (error) {
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