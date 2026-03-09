import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

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

    const arrayBuffer = await fileResponse.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    const dataUrl = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64}`;

    // Upload to private storage
    const result = await base44.asServiceRole.integrations.Core.UploadPrivateFile({ file: dataUrl });

    return Response.json({ 
        success: true,
        file_uri: result.file_uri,
        fileName: fileName || 'template',
        message: 'File stored in private storage. Save the file_uri to use for authenticated downloads.'
    });
});