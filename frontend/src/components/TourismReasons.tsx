import WhereToVoteIcon from "@mui/icons-material/WhereToVote";
import TourismItems from "./TourismItems";

// display a list of reasons for tourists to visit a country, using predefined icons and heading
function TourismReasons({reasons}: {reasons: string[]}) {
    return (
        <TourismItems items={reasons} colour="primary" icon={<WhereToVoteIcon/>} heading="Reasons to visit:"/>
    );
}

export default TourismReasons;
