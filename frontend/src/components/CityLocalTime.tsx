import { Typography } from "@mui/material";

function CityLocalTime({timezone}: {timezone: string}) {
    const localTime = new Date();

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