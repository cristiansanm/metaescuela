import db from "./DataBaseConection.js";

class ProdctsController {
    static async getProducts() {
        try {
            const response = await db.get("/products/getAllProducts");
            return response.data;
        } catch (error){
            throw error;
        }
    }
    static async createProduct(payload){
        try{
            const response = await db.post("/product/createProduct", payload)
            return response.data;
        }catch(error){
            throw error
        }
    }
    
}

export default ProdctsController;