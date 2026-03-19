import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { date } = await req.json();

    if (!date) {
      return Response.json({ error: 'Date is required' }, { status: 400 });
    }

    // Get Google Calendar access token
    const accessToken = await base44.asServiceRole.connectors.getAccessToken("googlecalendar");

    // Define available hours (9 AM to 5 PM, excluding lunch 12-1 PM)
    const availableHours = [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
    ];

    // Get day start and end
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    // Fetch existing events for the day
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${dayStart.toISOString()}&timeMax=${dayEnd.toISOString()}&singleEvents=true`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      return Response.json({ error: `Failed to fetch calendar events: ${error}` }, { status: 500 });
    }

    const data = await response.json();
    const bookedSlots = (data.items || []).map(event => {
      if (event.start.dateTime) {
        const start = new Date(event.start.dateTime);
        return `${String(start.getHours()).padStart(2, '0')}:${String(start.getMinutes()).padStart(2, '0')}`;
      }
      return null;
    }).filter(Boolean);

    // Filter out booked slots
    const availableSlots = availableHours.filter(slot => !bookedSlots.includes(slot));

    return Response.json({ availableSlots });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});