import {randomUUID} from 'crypto';
export const traceMiddleWare = (req, res, next)=>{
    const traceId = randomUUID();
    req.traceId = traceId;
    res.setHeader("X-trace-Id",traceId);
    console.log("El ID asignado:"+traceId)
    next();
}