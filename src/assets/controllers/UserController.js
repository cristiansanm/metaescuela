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
    static async getOneUser(payload) {
        try {
            const response = await db.post(
                `/user/getOneUser`, 
                payload
            );
            return response;
        } catch (error){
            throw error;
        }
    }
    static async deleteProfilePhoto(payload){
        try{
            const response = await db.post(
                `/user/deleteProfilePhoto`,
                payload
            )
            return response
        }catch(error){
            throw error;
        }
    }

    static async editUser(payload){
        try{
            const response = await db.put(
                `/user/editUser`,
                payload
            )
            return response
        }catch(error){
            throw error;
        }
    }

    static async addProfilePhoto(payload){
        try{
            const response = await db.post(
                `/user/addProfilePhoto`,
                payload
            )
            return response
        }catch(error){
            throw error;
        }
    
    }
    static async getMiniInfo(payload){
        try{
            const response = await db.post(
                `/user/getMiniInfo`,
                payload
            )
            return response
        }catch(error){
            throw error;
        }
    }
}
    

export default UserController;