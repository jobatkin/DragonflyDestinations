import { UserFavourite, FavouriteList } from "@/types";

class FavouriteHelper {

    // if the given country is already a favourite, find which list it's in and return both
    static findFavourite(code: string, lists: FavouriteList[]): [UserFavourite | undefined, number] {
        let favourite;
        let listIndex = 0;

        for (let i = 0; i < lists.length; i++) {
            favourite = lists[i].favourites.find(fav => fav.countryCode == code);
            if (favourite) {
                listIndex = i;
                break;
            }
        }

        return [favourite, listIndex];
    }
}

export default FavouriteHelper