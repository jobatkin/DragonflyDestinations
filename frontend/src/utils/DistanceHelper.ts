class DistanceHelper {

    static toRadians(degrees: number) {
        return degrees * (Math.PI / 180);
    }
    
    // calculates the distance in kilometres between two lat/long coordinates
    static calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371; // Earth's radius in kilometers
        const dLat = DistanceHelper.toRadians(lat2 - lat1);
        const dLon = DistanceHelper.toRadians(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(DistanceHelper.toRadians(lat1)) * Math.cos(DistanceHelper.toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in kilometers
    };    
}

export default DistanceHelper