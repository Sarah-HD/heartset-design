import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Verify webhook authenticity (optional but recommended)
    const signature = req.headers.get('x-signwell-signature');
    // Add signature verification logic here if SignWell provides it

    const webhookData = await req.json();
    
    console.log('SignWell webhook received:', webhookData);

    // Extract document ID and status from webhook
    const documentId = webhookData.document?.id || webhookData.id;
    const status = webhookData.status || webhookData.document?.status;

    if (!documentId) {
      return Response.json({ error: 'Missing document ID' }, { status: 400 });
    }

    // Find the LegalDocument record by SignWell document ID
    const legalDocs = await base44.asServiceRole.entities.LegalDocument.filter({
      docusealSubmissionId: documentId
    });

    if (legalDocs.length === 0) {
      console.log('No matching legal document found for ID:', documentId);
      return Response.json({ 
        message: 'Document not found in system',
        documentId 
      }, { status: 404 });
    }

    const legalDoc = legalDocs[0];

    // Update status based on webhook event
    if (status === 'completed' || webhookData.event === 'document.completed') {
      await base44.asServiceRole.entities.LegalDocument.update(legalDoc.id, {
        status: 'signed',
        signedDocumentUrl: webhookData.document?.file_url || webhookData.file_url
      });

      console.log('Legal document marked as signed:', legalDoc.id);

      return Response.json({ 
        success: true,
        message: 'Document status updated to signed',
        documentId: legalDoc.id
      });
    }

    // Handle other statuses if needed
    return Response.json({ 
      success: true,
      message: 'Webhook received but no action taken',
      status
    });

  } catch (error) {
    console.error('SignWell webhook error:', error);
    return Response.json({ 
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
});