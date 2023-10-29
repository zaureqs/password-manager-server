const prisma = require("../prisma/prismaClient");
const cookieToken = require("../utils/cookieToken");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send("Please provide all fields");
    }
    const findUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (findUser) {
      return res.status(400).send("user already exists");
    }

    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.Salt_rounds));
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    // send user to token
    cookieToken(user, res);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
};

//login user

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(200).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    //find a user based on email
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    //when there is no user
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "user not found ! please provide a valid user id",
      });
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password);

    //when password is incorrect
    if (!passwordMatch) {
      return res.status(200).json({
        success: false,
        message: "enter valid password",
      });
    }

    cookieToken(user, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "An server error occurred in login",
    });
  }
};

//logout user

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).send({
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
};

//check is loggedin or not

exports.logedin = async (req, res) => {
  req.user.password = null;
  res.send({
    success: true,
    user: req.user,
  });
};

//delete user

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.user;

    let user = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    console.log(user);

    res.status(200).send({
      success: true,
      message: "user deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred in deletion");
  }
};
