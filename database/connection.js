import { Sequelize } from "sequelize";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const config = require("./config/config.json")[
  process.env.NODE_ENV || "development"
];

const db = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

export default db;
