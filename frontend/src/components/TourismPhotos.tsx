import { ImageList, ImageListItem } from "@mui/material";

function TourismPhotos({photos, country}: {photos: string[], country: string}) {
    return (
        <ImageList sx={{ width: '100%', my: 4, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr)) !important' }} cols={5} gap={16} rowHeight={250}>
        {photos.map((photo, i) => (
            <ImageListItem key={photo}>
            <img
                srcSet={`${photo}?fit=crop&auto=format&dpr=2 2x`}
                src={`${photo}?fit=crop&auto=format`}
                alt={`${country} tourist attraction #${i+1}`}
                loading="lazy"
            />
            </ImageListItem>
        ))}
        </ImageList>        
    )
}

export default TourismPhotos