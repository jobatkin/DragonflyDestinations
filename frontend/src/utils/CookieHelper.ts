import { cookies } from "next/headers";

class CookieHelper {

    static async isAuthenticated() {
        // extract the user from the cookie
        const cookieUserString = (await cookies()).get('user')?.value
        const authUser = cookieUserString && JSON.parse(cookieUserString);
        
        return authUser && 'token' in authUser;
    }

    static async favouriteParam() {
        return (await this.isAuthenticated()) ? "?includeFavourites=true" : '';    
    }
}

export default CookieHelper