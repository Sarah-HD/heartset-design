import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { review_type } = await req.json();

    const accessToken = await base44.asServiceRole.connectors.getAccessToken("googlecalendar");

    let event;
    if (review_type === 'monthly') {
      // Monthly review - first Monday of each month at 9am EST
      event = {
        summary: "Authority Infrastructure™ – Monthly Governance Review",
        description: "Review Part 1: Strategic Foundation & System Intent.\nConfirm structural discipline and command intent alignment.",
        start: {
          dateTime: getNextFirstMonday(),
          timeZone: "America/New_York"
        },
        end: {
          dateTime: getNextFirstMonday(15),
          timeZone: "America/New_York"
        },
        recurrence: ["RRULE:FREQ=MONTHLY;BYDAY=1MO"]
      };
    } else {
      // Quarterly review - every 90 days
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + 90);
      const endDate = new Date(startDate);
      endDate.setMinutes(endDate.getMinutes() + 30);

      event = {
        summary: "Authority Infrastructure™ – Quarterly System Audit",
        description: "Conduct full audit of Parts 1–4.\nVerify routing logic, eligibility enforcement, and system integrity.",
        start: {
          dateTime: startDate.toISOString(),
          timeZone: "America/New_York"
        },
        end: {
          dateTime: endDate.toISOString(),
          timeZone: "America/New_York"
        },
        recurrence: ["RRULE:FREQ=DAILY;INTERVAL=90"]
      };
    }

    const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    });

    const result = await response.json();

    return Response.json({ success: true, event: result });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});

function getNextFirstMonday(minutesOffset = 0) {
  const now = new Date();
  const year = now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear();
  const month = now.getMonth() === 11 ? 0 : now.getMonth() + 1;
  
  const firstDay = new Date(year, month, 1);
  const dayOfWeek = firstDay.getDay();
  const daysUntilMonday = dayOfWeek === 0 ? 1 : (8 - dayOfWeek);
  
  const firstMonday = new Date(year, month, daysUntilMonday, 9, minutesOffset, 0);
  return firstMonday.toISOString();
}