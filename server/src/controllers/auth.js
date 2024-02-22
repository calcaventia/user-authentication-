const db = require("../db");
const { hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { SECRET } = require("../constants");

exports.getUsers = async (req, res) => {
  try {
    const { rows } = await db.query("select user_id, email from users");
    return res.status(200).json({
      success: true,
      users: rows,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await hash(password, 10);
    await db.query(
      "insert into users(name, email, password) values ($1 , $2, $3)",
      [name, email, hashedPassword]
    );
    return res.status(201).json({
      success: true,
      message: "The registration was successful. Please Login.",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

const { sign } = require("jsonwebtoken");
const { SECRET } = require("../constants");

exports.login = async (req, res) => {
  const { user } = req;
  const { rememberMe } = req.body; // Assuming rememberMe is sent in the request body

  const payload = {
    id: user.user_id,
    email: user.email,
  };

  try {
    const token = await sign(payload, SECRET);

    // Set cookie with token and configure expiration based on Remember Me flag
    const cookieOptions = {
      httpOnly: true,
      // Set expiration time based on the Remember Me flag
      expires: rememberMe
        ? new Date(Date.now() + 30 * 24 * 3600 * 1000)
        : undefined,
    };

    return res.status(200).cookie("token", token, cookieOptions).json({
      success: true,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.protected = async (req, res) => {
  try {
    return res.status(200).json({
      info: "protected info",
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.logout = async (req, res) => {
  try {
    return res.status(200).clearCookie("token", { httpOnly: true }).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};
