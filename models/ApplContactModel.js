import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const ApplContact = db.define(
  "appl_contact",
  {
    id: {
      type: DataTypes.INTEGER(10),
      autoIncrement: true,
      primaryKey: true,
    },
    appl_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nama: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    alamat_or_kegiatan: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    jabatan: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    hubungan: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    tipe: DataTypes.ENUM("REF", "EME", "SOS"),
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default ApplContact;
