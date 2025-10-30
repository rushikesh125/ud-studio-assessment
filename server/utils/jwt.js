import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken=(user)=>{
    return jwt.sign(
        {
            id:user._id,
            email:user.email,
            name:user.name,
            provider:user.provider,
        },
        JWT_SECRET,
        {
            expiresIn:"7c"
        }
    )
};

export const verifyToken = (token)=>{
    return jwt.verify(token,JWT_SECRET);
}