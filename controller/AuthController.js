import Users from "../models/UsersModel.js";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";

export const Login = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        [Op.or]: [{ email: req.body.email }, { username: req.body.email }],
      },
    });
    if (!user) {
      return res.status(400).json({ msg: "U Are a Bot" });
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(400).json({ msg: "Password Not Match" });
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
      {
        where: {
          id: user.id,
        },
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      //   secure : true
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    console.log(error);
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
