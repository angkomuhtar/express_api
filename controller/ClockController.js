import { Op, where } from "sequelize";
import jwt from "jsonwebtoken";
import moment from "moment";
import Clock from "../database/models/clock.js";

export const getClockById = async (req, res) => {
  try {
    let refresh_token = req.cookies.refreshToken;
    jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_KEY,
      async (err, decoded) => {
        const { count, rows } = await Clock.findAndCountAll({
          where: {
            user_id: decoded.userId,
          },
          include: ["users"],
          order: [["created_at", "DESC"]],
          limit: 10,
          offset: 0 * 10,
        });
        return res.status(200).json({
          success: true,
          message: "get data successfully",
          data: {
            total: count,
            rows,
          },
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      Error: "Internal Error",
      message: "Something is broken",
    });
  }
};

export const postClockIn = async (req, res) => {
  try {
    let refresh_token = req.cookies.refreshToken;
    jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_KEY,
      async (err, decoded) => {
        if (err) return res.sendStatus(403);
        let timeClock = moment().add(8, "h").format("YYYY-MM-DD HH:mm:ss");
        if (req.body?.type == "out") {
          await Clock.update(
            { clock_out: timeClock },
            {
              where: {
                [Op.and]: [
                  { user_id: decoded.userId },
                  { date: moment().format("YYYY-MM-DD") },
                ],
              },
            }
          ).catch((e) => {
            return res.status(500).json({
              success: false,
              Error: "Erorr",
              message: "Error when Insert data",
            });
          });
        } else if (req.body?.type == "in") {
          console.log(req);
          //       user_id: DataTypes.INTEGER,
          // date: DataTypes.DATEONLY,
          // clock_in: DataTypes.DATE,
          // clock_out: DataTypes.DATE,
          // tipe: DataTypes.ENUM("N", "NS", "DS", "OS"),
          // status: DataTypes.ENUM("A", "I", "S", "O", "L"),
          await Clock.create({
            clock_in: timeClock,
            user_id: decoded.userId,
            date: moment().format("YYYY-MM-DD"),
            tipe: "N",
            status: "H",
          }).catch((e) => {
            return res.status(500).json({
              success: false,
              Error: "Erorr",
              message: "Error when Insert data",
            });
          });
        }

        let { count, rows } = await Clock.findAndCountAll({
          where: {
            [Op.and]: [
              { user_id: decoded.userId },
              { date: moment().format("YYYY-MM-DD") },
            ],
          },
        });
        return res.status(200).json({
          success: true,
          message:
            req.body?.type == "in"
              ? "Clock In successfully"
              : "Clock Out successfully",
          data: {
            total: count,
            rows: rows,
          },
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      Error: "Internal Error",
      message: "Something is broken",
    });
  }
};

export const checkClockIn = async (req, res) => {
  try {
    let refresh_token = req.cookies.refreshToken;
    jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_KEY,
      async (err, decoded) => {
        if (err) return res.sendStatus(403);

        let { count, rows } = await Clock.findAndCountAll({
          where: {
            [Op.and]: [
              { user_id: decoded.userId },
              { date: moment().format("YYYY-MM-DD") },
            ],
          },
        });
        return res.status(200).json({
          success: true,
          message: "get data successfully",
          data: {
            total: count,
            rows: rows,
          },
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      Error: "Internal Error",
      message: "Something is broken",
    });
  }
};

export const CreateAbsen = () => {
  console.log("Im Running Here", moment().format("HH:mm:ss"));
};
