export function generateICS(event: {
  title: string;
  date: string;       // "09 August 2026"
  startTime: string;  // "12:00"
  endTime: string;    // "12:30"
  venue: string;
  desc: string;
}): string {
  // Parse date + times into UTC format (YYYYMMDDTHHMMSSZ)
  const parseDateTime = (date: string, time: string) => {
    const d = new Date(`${date} ${time}`);
    return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };

  const start = parseDateTime(event.date, event.startTime);
  const end = parseDateTime(event.date, event.endTime);

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `SUMMARY:${event.title}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `LOCATION:${event.venue}`,
    `DESCRIPTION:${event.desc}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return ics;
}

export function downloadICS(ics: string, filename: string) {
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}