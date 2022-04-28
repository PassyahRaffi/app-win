const { users } = require("../../models");

const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// input variabel upload server
const uploadServer = "http://localhost:5000/uploads/";

// REGISTER
exports.register = async (request, response) => {
  // Joi scheme
  const scheme = joi.object({
    fullname: joi.string().min(4).required(),
    phone: joi.number().min(6).required(),
    email: joi.string().min(6).required(),
    password: joi.string().min(4).required(),
  });

  const { error } = scheme.validate(request.body);
  if (error) {
    return response.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });
  }

  try {
    const existUser = await users.findOne({
      where: {
        email: request.body.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (existUser) {
      return response.status(400).send({
        status: "failed",
        message: "Email Already Registered!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(request.body.password, salt);

    const newUser = await users.create({
      fullname: request.body.fullname,
      username: request.body.username,
      gender: request.body.gender,
      phone: request.body.phone,
      address: request.body.address,
      email: request.body.email,
      password: hashedPassword,
      image: "default-user.png",
    });

    const token = jwt.sign(
      {
        id: users.id,
        fullname: newUser.fullname,
        username: newUser.username,
        gender: newUser.gender,
        phone: newUser.phone,
        address: newUser.address,
        email: newUser.email,
        password: newUser.password,
        image: newUser.image,
      },
      process.env.JWT_KEY
    );

    response.status(200).send({
      status: "success",
      message: "Register Success!",
      data: {
        fullname: newUser.fullname,
        username: newUser.username,
        gender: newUser.gender,
        phone: newUser.phone,
        address: newUser.address,
        email: newUser.email,
        image: newUser.image,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      status: "failed",
      message: "Server Error!",
    });
  }
};

// LOGIN
exports.login = async (request, response) => {
  const scheme = joi.object({
    email: joi.string().email().min(6).required(),
    password: joi.string().min(4).required(),
  });

  const { error } = scheme.validate(request.body);
  if (error) {
    return response.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });
  }

  try {
    const existUser = await users.findOne({
      where: {
        email: request.body.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!existUser) {
      return response.status(400).send({
        status: "failed",
        message: "Email Is Not Registered!",
      });
    }

    const isValid = await bcrypt.compare(
      request.body.password,
      existUser.password
    );
    if (!isValid) {
      return response.status(400).send({
        status: "failed",
        message: "Password Incorrect!",
      });
    }

    const token = jwt.sign({ id: existUser.id }, process.env.JWT_KEY);
    const user = {
      id: existUser.id,
      fullname: existUser.fullname,
      username: existUser.username,
      gender: existUser.gender,
      phone: existUser.phone,
      address: existUser.address,
      email: existUser.email,
      image: uploadServer + existUser.image,
      token,
    };

    response.status(200).send({
      status: "succes",
      message: "Login Success!",
      data: { user },
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      status: "failed",
      message: "Server Error!",
    });
  }
};

// AUTH
exports.checkAuth = async (request, response) => {
  try {
    const id = request.users.id;

    const dataUser = await users.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    if (!dataUser) {
      return response.status(404).send({
        status: "failed",
        message: "User not Found!",
      });
    }

    response.send({
      status: "success",
      data: {
        user: {
          id: dataUser.id,
          fullname: dataUser.fullname,
          username: dataUser.username,
          gender: dataUser.gender,
          phone: dataUser.phone,
          address: dataUser.address,
          email: dataUser.email,
          image: uploadServer + dataUser.image,
        },
      },
    });
  } catch (error) {
    console.log(error);
    response.status(500).status({
      status: "failed",
      message: "Server Error!",
    });
  }
};
