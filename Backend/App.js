import express from 'express';
import { configDotenv } from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors'
import cookieParser from 'cookie-parser';

// import route
import indexRoute from './routes/index.route.js';

configDotenv();
const PORT = process.env.PORT || 3000;
const app = express();

const alloworigin = [
        'http://localhost:5173',
        'http://localhost:5174',
];


app.use(cors({
        origin: (origin, callback) => {
                callback(null, true)
                // if (alloworigin.includes(origin)) {
                //         callback(null, true)
                // } else {
                //         throw new Error("cors error")
                // }
        },
        credentials: true
}
));
// app.use((req, res, next) => { {

//         console.log("Request URL:", req.body);
//         next();
// }});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/", indexRoute)


app.listen(PORT, () => {
        console.log('Server is running on port: ', PORT);
});


