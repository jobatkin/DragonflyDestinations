const axios = require('axios');

const getPopularPlaces = async (country) => {
    const query = `${country} tourist attractions`;

    // const oldUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${process.env.GOOGLE_MAPS_KEY}&type=tourist_attraction`;
    const newUrl = 'https://places.googleapis.com/v1/places:searchText';
    const newOptions = {
        textQuery: query,
        includedType: "tourist_attraction",
        pageSize: 5,
        rankPreference: "RELEVANCE",
        minRating: 4,
        strictTypeFiltering: true
    };
    const newHeaders = { headers: {
        'X-Goog-Api-Key': process.env.GOOGLE_MAPS_KEY,
        'X-Goog-FieldMask': 'places.photos,places.displayName'
    } };

    // const oldResponse = await axios.get(oldUrl);
    const newResponse = await axios.post(newUrl, newOptions, newHeaders);
    
    // return oldResponse.data.results;
    return newResponse.data.places;
};

// Function to get final photo URL from photo reference
const getFinalPhotoUrl = async (photoReference) => {
    //const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference=${photoReference}&key=${process.env.GOOGLE_MAPS_KEY}`;
    const photoUrl = `https://places.googleapis.com/v1/${photoReference}/media?key=${process.env.GOOGLE_MAPS_KEY}&maxWidthPx=500&skipHttpRedirect=true`
    const response = await axios.get(photoUrl);

    // The final URL will be in the 'location' header of the 302 response
    //if (response.status === 302) {
    //    return response.headers.location;
    //}
    return response.data.photoUri;
};

const fetchCountryPhotos = async (country) => {
    try {
        const places = await getPopularPlaces(country);
        let countryPhotos = [];

        for (let place of places.slice(0, 5)) { // Limit to top 5 places
            const photoLink = await getFinalPhotoUrl(place.photos[0].name);
            countryPhotos = countryPhotos.concat(photoLink);
        }
        console.log(countryPhotos)
        return countryPhotos;
    } catch (error) {
        console.error('Error fetching photos: ', error);
    }
    return null;
};

module.exports = { fetchCountryPhotos }
