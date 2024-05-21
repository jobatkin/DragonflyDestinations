import { Typography } from "@mui/material";

export interface CityLocalTimeProps {
    timezone: string,
    timestamp: number,
    tz_offset_hours: number
}

function CityLocalTime({timezone, timestamp, tz_offset_hours}: CityLocalTimeProps) {
    const localTime = new Date(timestamp*1000 + (tz_offset_hours*1000));

    const options = {
        weekday: 'long' as const,
        year: 'numeric' as const,
        month: 'long' as const,
        day: 'numeric' as const,
        dayPeriod: 'short' as const,
        hourCycle: "h24" as const,
        hour: '2-digit' as const,
        minute: '2-digit' as const,
        timeZone: timezone,
        timeZoneName: 'longOffset' as const
    };
    const dateTimeFormat = new Intl.DateTimeFormat('en-US', options);
    
    // generate all the parts of the date/time and store in one object
    const parts = dateTimeFormat.formatToParts(localTime).reduce((partObj:any, part) => { partObj[part.type] = part.value; return partObj; }, {});
    const ampm = parts.hour >= 12 ? 'pm' : 'am';
    
    return (
        <Typography>Local time: {" "}
            {parts.weekday}, {parts.month} {parts.day} at {parts.hour % 12 || 12}:{parts.minute} {ampm} ({parts.timeZoneName})
        </Typography>
    )
}

export default CityLocalTime;