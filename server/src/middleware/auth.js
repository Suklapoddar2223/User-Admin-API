const isLoggedIn = (req,res,next)=>{
try {
    if( req.session.userId){
        next()
    }else{
        return res.status(400).json({
            message: "Please log-in"
        })
    }
} catch (error) {
    console.log(error)
}
};
//user logged out ,middleware:
const isLoggedOut = (req,res,next)=>{
    try {
        if( req.session.userId){
            return res.status(400).json({
                message: "Please log-out"
            })
            
        }
            next()
        
    } catch (error) {
        console.log(error)
    }
    };

module.exports = {isLoggedIn, isLoggedOut}