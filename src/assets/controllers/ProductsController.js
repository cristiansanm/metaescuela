import db from "./DataBaseConection.js";

class ProdctsController {
    static async getProducts(payload) {
        try {
            const response = await db.post("/product/getAll", payload);
            return response;
        } catch (error){
            throw error;
        }
    }
    static async createProduct(payload){
        try{
            const response = await db.post("/product/createProduct", payload)
            return response;
        }catch(error){
            throw error
        }
    }
    
}

export default ProdctsController;