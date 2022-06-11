import { Sequelize } from "sequelize";
 
const db = new Sequelize('metaescuela', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});
 
export default db;