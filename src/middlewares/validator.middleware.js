import { ExpressValidator, validationResult } from "express-validator";

export const handleValidationErrors = (req, res, next)=>{
    const error = validationResult(req);
}