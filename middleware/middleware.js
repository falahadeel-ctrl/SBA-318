
export const logreq = function (req, res, next){
    console.log(`${req.url} - ${req.method}`);
    next();
}
export const error = function(error,_req,res, _next){
res.send(`not working ${error}`).status(500);
}