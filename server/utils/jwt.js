import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken=(user)=>{
    console.log("JWT:",JWT_SECRET)
    return jwt.sign(
        {
            id:user._id,
            email:user.email,
            name:user.name,
            provider:user.provider,
        },
        JWT_SECRET,
        {
            expiresIn:"7d"
        }
    )
};

export const verifyToken = (token)=>{
    return jwt.verify(token,JWT_SECRET);
}