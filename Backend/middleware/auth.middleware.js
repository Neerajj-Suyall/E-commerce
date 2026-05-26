import jwt from "jsonwebtoken";

const key = "sdflkjds";

const authLogin = (req, res, next) => {
    const authToken = req.cookies.auth || null;
    // console.log(req.cookies );
    
    if(authToken === null){
        console.log("null in auth middleware");
        
        res.end(); return;
    }

    jwt.verify(authToken, key, (err, payload) => {
        if(err !== null){
            res.end(); return;
        }

        req.authData = payload  
        next();
    })
}


const gernateToken = (payload) => {    
    const token = jwt.sign(payload, key , {expiresIn: '200m'});
    return token;
}


export {authLogin, gernateToken};