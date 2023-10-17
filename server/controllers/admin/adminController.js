import asyncHandler from 'express-async-handler';
import generateToken from '../../utils/generateToken.js';
import userModel from '../../models/User.js'

const adminpage = asyncHandler(async (req, res) => {

  res.json({ message: 'Success' });
})


const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const name='admin'

  try {
      if (email === 'admin@gmail.com' && password === '123') {

        const token = generateToken(email); // Generate the token here
        res.cookie('jwt', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });

          res.status(201).json({ email,name,token });


      } else if (email === 'admin@gmail.com') {
          res.status(401).json({ message: 'Invalid password' });
      } else {
          res.status(401).json({ message: 'Invalid email' });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
  }
});

const findAllusers = asyncHandler(async (req, res) => {
  try {
      const users = await userModel.find()
      res.status(200).json( users )
  }
  catch (err) {
      res.status(500).json({ err })
  }

})


export {
  adminpage,
  authAdmin,
 findAllusers,
};  
