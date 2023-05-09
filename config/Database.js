import { Sequelize } from "sequelize";

const db = new Sequelize("mam_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
