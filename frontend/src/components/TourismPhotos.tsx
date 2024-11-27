import { ImageList, ImageListItem } from "@mui/material";
import Image from "next/image";

// display a list of photos for a country, displayed in a grid
function TourismPhotos({photos, country}: {photos: string[], country: string}) {
    return (
        <ImageList sx={{ width: '100%', my: 4, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr)) !important' }} cols={5} gap={16} rowHeight={250}>
        {photos.map((photo, i) => (
            <ImageListItem key={photo}>
                <Image
                    src={`${photo}?fit=crop&auto=format`}
                    overrideSrc={`${photo}?fit=crop&auto=format`}
                    alt={`${country} tourist attraction #${i+1}`}
                    loading="lazy" fill
                    sizes="420px"
                />
            </ImageListItem>
        ))}
        </ImageList>        
    )
}

export default TourismPhotos