import TapasIcon from '@mui/icons-material/Tapas';
import TourismItems from "./TourismItems";

function TourismCuisine({highlights}: {highlights: string[]}) {
    return (
        <TourismItems items={highlights} colour="info" icon={<TapasIcon/>} heading="What could I eat?"/>
    );
}

export default TourismCuisine;
