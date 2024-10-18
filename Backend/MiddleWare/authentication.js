import jwt from 'jsonwebtoken'

const verifyUser = async (req, res, next)=>{
  try {
    const {token} = req.headers;
    if(!token){
      return res.status(400).send({success:false, message:"token Not found"});
    }

    try {
      const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(400).send({success:"Not Verified", message:"Session experied", navigate:'/account'});
    }

    next();

  } catch (error) {
    return res.status(500).send({success:false, message:"Error:"+error.message})
  }
}

export  default verifyUser