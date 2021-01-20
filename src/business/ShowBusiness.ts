import { BaseError } from "../error/BaseError";

class ShowBusiness {
public createShow = async (input: any): Promise<any>=>{
try {
    
} catch (error) {
    throw new BaseError(error.message, error.statusCode);
    
}
} 
}

export const showBusiness: ShowBusiness = new ShowBusiness()