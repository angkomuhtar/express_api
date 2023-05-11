import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const ApplExperience = db.define(
  "appl_experience",
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
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    start: DataTypes.DATEONLY,
    end: DataTypes.DATEONLY,
    position: DataTypes.STRING(50),
    position_end: DataTypes.STRING(50),
    jenis_usaha: DataTypes.STRING(50),
    nama_pemilik: DataTypes.STRING(50),
    atasan_langsung: DataTypes.STRING(50),
    jumlah_karyawan: DataTypes.INTEGER(10),
    no_telp: DataTypes.STRING(50),
    tugas: DataTypes.TEXT,
    gaji: DataTypes.INTEGER(10),
    tunjangan_1: DataTypes.INTEGER(10),
    tunjangan_2: DataTypes.INTEGER(10),
    tunjangan_3: DataTypes.INTEGER(10),
    tunjangan_a: DataTypes.INTEGER(10),
    tunjangan_b: DataTypes.INTEGER(10),
    tunjangan_c: DataTypes.INTEGER(10),
    take_home_pay: DataTypes.INTEGER(10),
    berhenti: DataTypes.TEXT,
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
ApplExperience.sync();
export default ApplExperience;
