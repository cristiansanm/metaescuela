import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;
 
const Users = db.define('users',{
    user_name:{
        type: DataTypes.STRING
    },
    user_email:{
        type: DataTypes.STRING
    },
    user_password:{
        type: DataTypes.STRING
    },
    user_phone:{
        type: DataTypes.INTEGER
    },
    user_address:{
        type: DataTypes.STRING
    },
    user_deliver_at_institute:{
        type: DataTypes.STRING
    },
    user_image:{
        type: DataTypes.LONGBLOB
    },
    user_is_seller:{
        type: DataTypes.INTEGER
    },
    user_is_buyer:{
        type: DataTypes.INTEGER
    },
    createdAt:{
        type: DataTypes.DATE
    },
    updateAt:{
        type: DataTypes.DATE
    },

    refresh_token:{
        type: DataTypes.TEXT
    }
},{
    freezeTableName:true
});
 
(async () => {
    await db.sync();
})();
 
export default Users;