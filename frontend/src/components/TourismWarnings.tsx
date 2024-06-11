import FmdBadIcon from '@mui/icons-material/FmdBad';
import TourismItems from "./TourismItems";

export const safetyRatings = [
    { limit: 0, risk: 'Unknown', colour: '#888888', detail: 'Travel safety is unknown, proceed with caution'},
    { limit: 2.5, risk: 'Low', colour: '#6baf92', detail: 'Travel is relatively safe' },
    { limit: 3.5, risk: 'Medium', colour: '#d2b200', detail: 'Travel is usually safe, some areas are risky' },
    { limit: 4.5, risk: 'High', colour: '#FF6D00', detail: 'Travel is risky, prepare well and consider avoiding' },
    { limit: 5, risk: 'Extreme', colour: '#d32f2f', detail: 'Travel is unsafe and should be avoided' },
]

function TourismWarnings({warnings, safetyRating}: {warnings: string[], safetyRating?: number}) {
    let safetyInfo = safetyRatings.find(rating => safetyRating && safetyRating <= rating.limit);
    if (!safetyInfo) safetyInfo = safetyRatings[0];

    const extraItem = { iconValue: safetyRating || 0, bgColour: safetyInfo.colour, heading: `${safetyInfo.risk} Risk`, text: safetyInfo.detail };

    console.log(safetyInfo)
    return (
        <TourismItems items={warnings} colour="secondary" icon={<FmdBadIcon/>} heading="Things to watch out for:"
            extraItem={extraItem}/>
    );
}

export default TourismWarnings;
