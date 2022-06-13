import db from "./DataBaseConection.js";

class OrdersController {
    static async getAllOrders(payload) {
        try {
            const response = await db.post("/order/getAllOrders", payload);
            return response;
        } catch (error){
            throw error;
        }
    }
    static async getOneOrder(payload) {
        try {
            const response = await db.post(
                `/order/getOneOrder/${payload.orderId}}`, 
                payload.id
            );
            return response;
        } catch (error){
            throw error;
        }
    }
    static async createOrder(payload) {
        try {
            const response = await db.post(`/order/createOrder`, payload);
            return response;
        } catch (error){
            throw error;
        }
    }
    
}

export default OrdersController;