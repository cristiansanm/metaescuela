import db from "./DataBaseConection.js";

class SellerController {
    static async getAllProducts(payload) {
        try {
            const response = await db.post(
                "/seller/getAllProducts", payload
            );
            return response;
        } catch (error){
            throw error;
        }
    }
    static async getSoldProducts(payload) {
        try {
            const response = await db.post(
                `/seller/getSoldProducts`, 
                payload
            );
            return response;
        } catch (error){
            throw error;
        }
    }
    
}

export default SellerController;