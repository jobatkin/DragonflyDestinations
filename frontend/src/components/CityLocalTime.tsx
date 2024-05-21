import { Typography } from "@mui/material";

export interface CityLocalTimeProps {
    timezone: string,
    timestamp: number,
    tz_offset_hours: number
}

function CityLocalTime({timezone, timestamp, tz_offset_hours}: CityLocalTimeProps) {
    const localTime = new Date(timestamp*1000 + (tz_offset_hours*1000));
    const formattedHr = localTime.getHours().toLocaleString(undefined, { minimumIntegerDigits: 2 });
    const formattedMin = localTime.getMinutes().toLocaleString(undefined, { minimumIntegerDigits: 2 });
    const tzHours = tz_offset_hours/3600;

    const options = {
        weekday: 'long' as const,
        year: 'numeric' as const,
        month: 'long' as const,
        day: 'numeric' as const,
        timeZone: timezone
      };
      const dateTimeFormat = new Intl.DateTimeFormat('en-US', options);
      
      const parts = dateTimeFormat.formatToParts(localTime);
      console.log(parts)

    return (
        <Typography>Local time: {formattedHr}:{formattedMin} UTC{tzHours} 
            {new Intl.DateTimeFormat('en-GB', {
                dateStyle: 'full',
                timeStyle: 'long',
            }).format(localTime)}
        </Typography>
    )
}

export default CityLocalTime;