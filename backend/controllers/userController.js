import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// @desc register new user
// @route POST /api/users
// @access Public
export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({ message: "Please fill all things!!!"})
  }

  const userExists = await User.findOne({email});

  if (userExists) {
    return res.status(400).send({ message: "User already exists. "});
  }

  // encrypt password
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPass,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    return res.status(400).send({message: "Invalid user data"});
  }
}

// @desc authenticate user (login)
// @route POST /api/login
// @access Public
export const loginUser = async (req, res) => {
  const {email, password} = req.body;

  const user = await User.findOne({email})

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })  
  } else {
    return res.status(400).send({message: "No logon 4 u!!!!!"});
  }
}

// @desc get user data
// @route GET /api/users/me
// @access Private
export const getMe = async (req, res) => {
  const { _id, name, email} = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name,
    email
  })
}

// Generate our token!
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}