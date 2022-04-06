import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protect = async (req, res, next) => {
  let token;

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header!!
      token = req.headers.authorization.split(' ')[1];

      // verify!!
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // get user from token
      req.user = await User.findById(decoded.id).select('-password');

      next()
    } catch (error) {
      console.log(error);
      return res.status(401).send('Unauthorized!');
    }
  }

  if (!token) {
    return res.status(401).send('No token!!!');
  }
}

