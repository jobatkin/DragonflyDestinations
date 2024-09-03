import { cookies } from "next/headers";

class CookieHelper {

    static isAuthenticated() {
        // extract the user from the cookie
        const cookieUserString = cookies().get('user')?.value
        const authUser = cookieUserString && JSON.parse(cookieUserString);
        
        return authUser && 'token' in authUser;
    }

    static favouriteParam() {
        return this.isAuthenticated() ? "?includeFavourites=true" : '';    
    }
}

export default CookieHelper