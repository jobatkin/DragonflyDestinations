import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import TourismItems from "./TourismItems";

function TourismActivities({activities}: {activities: string[]}) {
    return (
        <TourismItems items={activities} colour="extra" icon={<LocalActivityIcon/>} heading="Top things to do:"/>
    );
}

export default TourismActivities;
