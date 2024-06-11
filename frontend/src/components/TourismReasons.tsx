import WhereToVoteIcon from "@mui/icons-material/WhereToVote";
import TourismItems from "./TourismItems";

function TourismReasons({reasons}: {reasons: string[]}) {
    return (
        <TourismItems items={reasons} colour="primary" icon={<WhereToVoteIcon/>} heading="Reasons to visit:"/>
    );
}

export default TourismReasons;
