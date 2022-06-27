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
    static async getProductsByFilter(payload) {
        try {
            const response = await db.post(
                `/product/getByFilter?subcategory=${payload.filters.subcategory}&min=${payload.filters.min}&max=${payload.filters.max}`, 
                payload.id
            );
            return response;
        } catch (error){
            throw error;
        }
    }
    static async getProductById(id) {
        try {
            const response = await db.get(`/product/getOneProduct/${id}` );
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
    static async editProduct(payload){
        try{
            const response = await db.post("/product/editProduct", payload)
            return response;
        }catch(error){
            throw error
        }
    }
    
}

export default ProdctsController;