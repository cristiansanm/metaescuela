import db from "./DataBaseConection.js";

class UserController {
    static async loginUser(payload) {
        try {
            const response = await db.post("/user/loginUser", payload);
            return response;
        } catch (error){
            throw error;
        }
    }
    static async registerUser(payload){
        try{
            const response = await db.post("/user/registerUser", payload)
            return response;
        }catch(error){
            throw error
        }
    }
    
}

export default UserController;