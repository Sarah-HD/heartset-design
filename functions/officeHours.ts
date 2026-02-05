import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action, eventData } = await req.json();

    const accessToken = await base44.asServiceRole.connectors.getAccessToken("googlecalendar");

    if (action === 'getAvailableSlots') {
      // Get calendar events for the next 30 days
      const now = new Date();
      const thirtyDaysLater = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?` +
        `timeMin=${now.toISOString()}&` +
        `timeMax=${thirtyDaysLater.toISOString()}&` +
        `singleEvents=true&` +
        `orderBy=startTime`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      
      // Generate available slots (Tuesday 1-3pm, Thursday 11am-12pm EST)
      const availableSlots = generateAvailableSlots(data.items || []);
      
      return Response.json({ slots: availableSlots });
    }

    if (action === 'bookSlot') {
      const event = {
        summary: `Office Hours - ${user.full_name || user.email}`,
        description: `Office hours session with ${user.full_name || user.email}\n\nEmail: ${user.email}\n\nTopic:\n${eventData.topic}`,
        start: {
          dateTime: eventData.startTime,
          timeZone: 'America/New_York',
        },
        end: {
          dateTime: eventData.endTime,
          timeZone: 'America/New_York',
        },
        attendees: [
          { email: user.email }
        ],
        conferenceData: {
          createRequest: {
            requestId: `office-hours-${Date.now()}`,
            conferenceSolutionKey: { type: 'hangoutsMeet' }
          }
        }
      };

      const response = await fetch(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(event),
        }
      );

      const createdEvent = await response.json();

      const meetingLink = createdEvent.hangoutLink || 'Meeting link will be in your calendar invitation';
      const sessionTime = new Date(eventData.startTime).toLocaleString('en-US', { 
        timeZone: 'America/New_York',
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short'
      });

      // Send confirmation email
      await base44.integrations.Core.SendEmail({
        to: user.email,
        subject: 'Office Hours Session Confirmed',
        body: `Your office hours session has been confirmed.\n\n━━━━━━━━━━━━━━━━━━━━━\n\nSESSION DETAILS\n\nTime: ${sessionTime}\nDuration: 20 minutes\n\nMeeting Link:\n${meetingLink}\n\n━━━━━━━━━━━━━━━━━━━━━\n\nWHAT YOU'LL COVER\n\n${eventData.topic}\n\n━━━━━━━━━━━━━━━━━━━━━\n\nA calendar invitation has been sent to your email with the meeting details.\n\nSee you then.`
      });

      return Response.json({ success: true, event: createdEvent });
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});

function generateAvailableSlots(existingEvents) {
  const slots = [];
  const now = new Date();
  
  // Define office hours windows (Eastern Time)
  const windows = [
    { day: 2, startHour: 13, endHour: 15 }, // Tuesday 1-3pm
    { day: 4, startHour: 11, endHour: 12 }, // Thursday 11am-12pm
  ];

  // Generate slots for next 4 weeks
  for (let week = 0; week < 4; week++) {
    windows.forEach(window => {
      const date = new Date(now);
      date.setDate(date.getDate() + (7 * week) + ((window.day - date.getDay() + 7) % 7));
      
      if (date < now) return;

      for (let hour = window.startHour; hour < window.endHour; hour++) {
        const slotStart = new Date(date);
        slotStart.setHours(hour, 0, 0, 0);
        
        const slotEnd = new Date(slotStart);
        slotEnd.setMinutes(20); // 20-minute slots

        // Check if slot conflicts with existing events
        const isBooked = existingEvents.some(event => {
          const eventStart = new Date(event.start.dateTime || event.start.date);
          const eventEnd = new Date(event.end.dateTime || event.end.date);
          return slotStart < eventEnd && slotEnd > eventStart;
        });

        if (!isBooked && slotStart > now) {
          slots.push({
            start: slotStart.toISOString(),
            end: slotEnd.toISOString(),
            display: slotStart.toLocaleString('en-US', { 
              timeZone: 'America/New_York',
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              timeZoneName: 'short'
            })
          });
        }
      }
    });
  }

  return slots.slice(0, 20); // Limit to 20 available slots
}