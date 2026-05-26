import jwt from "jsonwebtoken";

const key = "slkvnasvkladnvlknvsdghzlmeirmvcmbvoksgaoigehnaphgbsoij";

const authadminLogin = (req, res, next) => {
    const authToken = req.cookies.auth || null;
    // console.log(req.cookies );
    
    if(authToken === null){
        console.log("you are not my Admin");
        res.status(403).end(); return;
    }

    jwt.verify(authToken, key, (err, payload) => {
        if(err !== null){
            res.end(); return;
        }

        req.authData = payload  
        next();
    })
}


const gernateadminToken = (payload) => {    
    const token = jwt.sign(payload, key , {expiresIn: '200m'});
    return token;
}


export {authadminLogin, gernateadminToken};