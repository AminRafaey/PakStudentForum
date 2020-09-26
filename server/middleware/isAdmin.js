module.exports = function(req, res, next){
    console.log(req.user);
    if(req.user.type !== "Admin") return res.status(401).send("Invalid Access denied.")
    next();
}