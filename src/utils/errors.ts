
class APIError extends Error{
    statusCode:number

    constructor(message:string,statusCode:number=400){
        super(message);
        this.statusCode=statusCode
        Object.setPrototypeOf(this,APIError.prototype)
    }
}

export default APIError