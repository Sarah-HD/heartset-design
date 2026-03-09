import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (user?.role !== 'admin') {
            return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
        }

        const { fileUrl, fileName } = await req.json();
        console.log('Uploading file:', fileName, 'from URL:', fileUrl);

        const result = await base44.asServiceRole.integrations.Core.UploadPrivateFile({ file: fileUrl });
        console.log('Upload result:', JSON.stringify(result));

        return Response.json({ 
            success: true,
            file_uri: result.file_uri,
            fileName: fileName || 'OutreachTrackerTemplate.xlsx',
        });
    } catch (error) {
        console.error('Error:', error.message, error.stack);
        return Response.json({ error: error.message }, { status: 500 });
    }
});