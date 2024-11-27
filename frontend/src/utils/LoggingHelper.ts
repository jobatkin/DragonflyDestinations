export default class LoggingHelper {

    static log(msg: any) {
        if (process.env.NODE_ENV !== "production") {
            console.log(msg);
        }
    }

    // @TODO: store or email these if in production
    static error(err: Error) {
        if (process.env.NODE_ENV !== "production") {
            console.error(err);
        }
    }    
}