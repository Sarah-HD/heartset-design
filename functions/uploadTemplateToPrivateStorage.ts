import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

// Admin-only function to upload a file URL to private storage
Deno.serve(async (req) => {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (user?.role !== 'admin') {
        return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { fileUrl, fileName } = await req.json();

    // Fetch the file from the provided URL
    const fileResponse = await fetch(fileUrl);
    if (!fileResponse.ok) {
        return Response.json({ error: 'Failed to fetch file from URL' }, { status: 400 });
    }

    const fileBlob = await fileResponse.blob();

    // Upload to private storage
    const result = await base44.asServiceRole.integrations.Core.UploadPrivateFile({ file: fileBlob });

    return Response.json({ 
        success: true,
        file_uri: result.file_uri,
        fileName: fileName || 'template',
        message: 'File stored in private storage. Save the file_uri to use for downloads.'
    });
});