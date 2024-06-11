const axios = require('axios');

const getPopularPlaces = async (country) => {
    const query = `${country} tourist attractions`;

    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${process.env.GOOGLE_MAPS_KEY}&type=tourist_attraction`;
    const response = await axios.get(url);
    
    return response.data.results;
};

// Function to get final photo URL from photo reference
const getFinalPhotoUrl = async (photoReference) => {
    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference=${photoReference}&key=${process.env.GOOGLE_MAPS_KEY}`;
    const response = await axios.get(photoUrl, { maxRedirects: 0, validateStatus: null });

    // The final URL will be in the 'location' header of the 302 response
    if (response.status === 302) {
        return response.headers.location;
    }

    throw new Error('Failed to get the final photo URL');
};

const fetchCountryPhotos = async (country) => {
    try {
        console.log(process.env.GOOGLE_MAPS_KEY)
        const places = await getPopularPlaces(country);
        let countryPhotos = [];

        for (let place of places.slice(0, 5)) { // Limit to top 5 places
            const photoLink = await getFinalPhotoUrl(place.photos[0].photo_reference);
            countryPhotos = countryPhotos.concat(photoLink);
        }
        console.log(countryPhotos)
        return countryPhotos;
    } catch (error) {
        console.error('Error fetching photos: ', error);
    }
    return [];
};

module.exports = { fetchCountryPhotos }
