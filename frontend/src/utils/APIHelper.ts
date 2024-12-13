import axios from "axios"
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_SERVER;

// helper class to simplify backend requests triggered by user interactions
class APIHelper {

    static getToken() {
        let cookieUserString = document.cookie.split("; ")
            .find((row) => row.startsWith("user="))?.split("=")[1];

        cookieUserString = decodeURIComponent(cookieUserString || '');
        const authUser = cookieUserString && JSON.parse(cookieUserString);

        return authUser && 'token' in authUser ? authUser.token : null;        
    }

    static getOptions() {
        const token = APIHelper.getToken();
        const options = {            
            // automatically include token if user is logged in
            headers: { "x-access-token" : token },
        }

        return options;
    }

    static async getData(url: string) {
        const options = APIHelper.getOptions();
        const response = await axios.get(url, options);

        return response.data;
    }

    static async updateData(url: string, data: object) {
        const options = APIHelper.getOptions();
        const response = await axios.put(url, data, options);

        return response.data;
    }    

    static async postData(url: string, data: object) {
        const options = APIHelper.getOptions();
        const response = await axios.post(url, data, options);

        return response.data;
    }      

    static async deleteData(url: string) {
        const options = APIHelper.getOptions();
        const response = await axios.delete(url, options);

        return response.data;
    }      
}

export default APIHelper