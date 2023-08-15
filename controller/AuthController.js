// import Users from "../models/UsersModel.js";
import bcrypt from "bcrypt";
import { Op, where } from "sequelize";
import jwt from "jsonwebtoken";
import Users from "../models/UsersModel.js";
import Profiles from "../models/ProfilesModel.js";

export const Login = async (req, res) => {
  // return req.body;
  if (!req?.body?.email || !req?.body?.password) {
    res.status(400).json({
      success: false,
      Error: "Validation errors in your request",
      message: "Username And Password is required",
    });
  }

  try {
    const user = await Users.findOne(
      {
        where: {
          [Op.or]: [
            {
              email: req.body.email,
            },
            {
              username: req.body.email,
            },
          ],
        },
      },
      { include: [{ model: Profiles, as: "profile" }] }
    );

    if (!user) {
      return res.status(400).json({
        success: false,
        Error: "Authentication Error" /* skip or optional error message */,
        message: "User not Found",
      });
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(400).json({
        success: false,
        Error: "Authentication Error" /* skip or optional error message */,
        message: "password missmatch",
      });
    }

    if (req?.body?.uniqueId) {
      if (user.phone_id == "") {
        await Users.update(
          {
            phone_id: req.body.uniqueId,
          },
          {
            where: {
              id: user.id,
            },
          }
        );
      } else if (user.phone_id !== req.body.uniqueId) {
        return res.status(400).json({
          success: false,
          Error: "Authentication Error" /* skip or optional error message */,
          message: "Phone Connect to Other Device",
        });
      }
    }

    const accessToken = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        email: user.email,
      },
      process.env.ACCESS_TOKEN_KEY,
      {
        expiresIn: "60s",
      }
    );

    const refreshToken = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        email: user.email,
      },
      process.env.REFRESH_TOKEN_KEY,
      {
        expiresIn: "1d",
      }
    );

    await Users.update(
      { refresh_token: refreshToken },
      { where: { id: user.id } }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      //   secure : true
    });

    res.status(200).json({ access_token: accessToken });
  } catch (error) {
    console.log("ERROR CATCH: ", error);
    res.status(400).json(error);
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.sendStatus(401);

    const user = Users.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!user) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, decoded) => {
      if (err) return res.sendStatus(403);

      const accessToken = jwt.sign(
        {
          userId: user.id,
          username: user.username,
          email: user.email,
        },
        process.env.ACCESS_TOKEN_KEY,
        {
          expiresIn: "60s",
        }
      );

      res.json({
        accessToken,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });

  if (!user[0]) return res.sendStatus(204);

  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: user[0].id,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};
