import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { name, email, date, time, sessionType, notes } = await req.json();

    if (!name || !email || !date || !time) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get Google Calendar access token
    const accessToken = await base44.asServiceRole.connectors.getAccessToken("googlecalendar");

    // Create event time
    const [hours, minutes] = time.split(':');
    const startDateTime = new Date(date);
    startDateTime.setHours(parseInt(hours), parseInt(minutes), 0);
    
    const endDateTime = new Date(startDateTime);
    endDateTime.setMinutes(endDateTime.getMinutes() + 15);

    // Create calendar event
    const event = {
      summary: sessionType === 'legal-referral' 
        ? '15-Minute Referral Call – Legal Pathway'
        : '15-Minute Strategy Session – Heartset Design',
      description: `Name: ${name}\nEmail: ${email}\n${sessionType === 'legal-referral' ? 'Type: Legal Referral Call' : 'Type: Strategy Session'}\n\nNotes:\n${notes || 'No additional notes'}`,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'America/New_York',
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'America/New_York',
      },
      attendees: [
        { email: email }
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 30 },
        ],
      },
    };

    const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      const error = await response.text();
      return Response.json({ error: `Failed to create calendar event: ${error}` }, { status: 500 });
    }

    const calendarEvent = await response.json();

    return Response.json({ 
      success: true, 
      eventId: calendarEvent.id,
      eventLink: calendarEvent.htmlLink
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});