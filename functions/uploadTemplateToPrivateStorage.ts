import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (user?.role !== 'admin') {
            return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
        }

        const { fileUrl, fileName } = await req.json();

        // Fetch the actual file bytes
        const fileResponse = await fetch(fileUrl);
        if (!fileResponse.ok) {
            return Response.json({ error: 'Failed to fetch file' }, { status: 400 });
        }

        const bytes = await fileResponse.arrayBuffer();
        const uint8 = new Uint8Array(bytes);

        // Convert to base64 string
        let binary = '';
        for (let i = 0; i < uint8.length; i++) {
            binary += String.fromCharCode(uint8[i]);
        }
        const base64 = btoa(binary);
        const dataUri = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64}`;

        const result = await base44.asServiceRole.integrations.Core.UploadPrivateFile({ file: dataUri });

        return Response.json({ 
            success: true,
            file_uri: result.file_uri,
            fileName: fileName || 'OutreachTrackerTemplate.xlsx',
        });
    } catch (error) {
        console.error('Error:', error.message);
        return Response.json({ error: error.message }, { status: 500 });
    }
});