const { users } = require("../../models");

// exports manual add data user
exports.addUsers = async (request, response) => {
  try {
    await users.create(request.body);

    response.status(200).send({
      status: "Success",
      message: "Add User Finished",
    });
  } catch (error) {
    console.log(error);
    response.send({
      status: "Failed",
      message: "Server Error!",
    });
  }
};

// exports get data all user
exports.getUsers = async (request, response) => {
  try {
    const AllUsers = await users.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    response.status(200).send({
      status: "Success",
      data: {
        AllUsers,
      },
    });
  } catch (error) {
    console.log(error);
    response.send({
      status: "Failed",
      message: "Server Error!",
    });
  }
};

// exports get data user by id
exports.getUser = async (request, response) => {
  try {
    const { id } = request.params;
    const data = await users.findOne({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
      where: {
        id,
      },
    });

    if (!data) {
      return response.status(404).send({
        status: "Failed",
        message: "User Not Found!",
      });
    }

    response.status(200).send({
      status: "Success",
      message: "Get User Success!",
      user: data,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      status: "Failed",
      message: "Server Error!",
    });
  }
};

// exports delete data user
exports.deleteUser = async (request, response) => {
  try {
    const { id } = request.params;

    await users.destroy({
      where: {
        id,
      },
    });

    response.status(200).send({
      status: "Success",
      message: `Delete User Id: ${id} Success!`,
    });
  } catch (error) {
    console.log(error);
    response.send({
      status: "Failed",
      message: "Server Error!",
    });
  }
};

// exports change data user
exports.updateUser = async (request, response) => {
  try {
    const { id } = request.params;

    await users.update(request.body, {
      where: {
        id,
      },
    });

    response.status(200).send({
      status: "Success",
      message: `Update User Id: ${id} Success!`,
      data: request.body,
    });
  } catch (error) {
    console.log(error);
    response.send({
      status: "Failed",
      message: "Server Error!",
    });
  }
};

// exports change image
exports.updateUserImage = async (request, response) => {
  try {
    const { id } = request.params;
    const data = await users.update(
      {
        image: request.file.filename,
      },
      {
        where: {
          id,
        },
      }
    );
    console.log(request.file);

    response.status(200).send({
      status: "Success",
      message: `Image User with Id: ${id} Updated`,
      data,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      status: "Failed",
      message: "Server Error",
    });
  }
};
