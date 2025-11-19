import shortId from 'shortid';
import UserModel from '../Schema/user.js';
import generateToken from '../utils/generateToken.js';



// @desc    Register a new user
// @route   POST /user/register
// @access  Public
export const addUser = async (req, res) => {
    const { name, email, password } = req.body
  
    const userExists = await UserModel.findOne({ email })
  
    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }
    const id=shortId.generate();
    const user = await UserModel.create({
      id,
      name,
      email,
      password,
    })
  
    if (user) {
      console.log(user);
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user.id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  }


  export const getUserList = async (req, res) => {
    try {
      const list = await UserModel.find().lean();
      if (!list || list.length === 0) {
        return res.status(404).json({ message: "No Data Found" });
      }
      res.json(list);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };



  export const deleteUser=async(req, res)=>{
    const user = await UserModel.findOne({ 'id': req.params.id });
    
    if (user) {
      await user.deleteOne();
      res.status(201).json({ message: 'User record deleted successfully' });
    } else {
      res.status(404);
      throw new Error('user record not found');
    }
  
  }