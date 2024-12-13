import axios from "axios";

export default class LoggingHelper {

    static log(msg: any) {
        if (process.env.NODE_ENV !== "production") {
            console.log(msg);
        }
    }

    // log to console if development mode, store if in production
    static error(err: Error) {
        if (process.env.NODE_ENV !== "production") {
            console.error(err);
//        } else {
            LoggingHelper.logError(err);
        }
    }    

    static async logError(err: Error) {
        const errorData = {
            type: typeof err,
            code: axios.isAxiosError(err) ? err.response?.status : null,
            message: err.message,  
            responseResult: axios.isAxiosError(err) ? err.response?.data.result : null,
            stackTrace: err.stack?.substring(0,512)    
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_SERVER}/api/errorLog`, errorData);
        } catch (error) {
            // ran into problems saving the error - log both to the console
            if (process.env.NODE_ENV !== "production") {
                console.error(err);
                console.error(error);
            }
        }
    }
}