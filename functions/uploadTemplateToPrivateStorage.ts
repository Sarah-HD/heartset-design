import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (user?.role !== 'admin') {
        return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { fileUrl, fileName } = await req.json();

    // Upload to private storage by passing the URL directly
    const result = await base44.asServiceRole.integrations.Core.UploadPrivateFile({ file: fileUrl });

    return Response.json({ 
        success: true,
        file_uri: result.file_uri,
        fileName: fileName || 'OutreachTrackerTemplate.xlsx',
        message: 'File stored in private storage. Save the file_uri for authenticated downloads.'
    });
});