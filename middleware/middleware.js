
export const logreq = function (req, res, next){
    console.log(`${req.url} - ${req.method}`);
    next();
}
export const error = function(error,_req,res, _next){
res.status(500).send(`not working ${error}`);
}
export const timing = function(req, res, next){
    req.startTime = Date.now();
    next();
}