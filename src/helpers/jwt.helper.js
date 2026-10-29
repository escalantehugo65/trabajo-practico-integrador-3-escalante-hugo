import jwt from 'jsonwebtoken';
import "dotenv/config";

export const generateToken=(payload)=>{
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:process.env.JWT_IN_EXPIRES})
};

export const verifyToken = (token)=>{
    return jwt.verify(token, process.env.JWT_SECRET)
};
