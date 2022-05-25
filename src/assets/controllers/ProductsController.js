import db from "./DataBaseConection.js";

class ProdctsController {
    static async getProducts() {
        try {
            const response = await db.get("/products");
            return response.data;
        } catch (error){
            throw error;
        }
    }
    
}

export default ProdctsController;