import  Express,{json} from "express";
import dotenv from 'dotenv';
dotenv.config();

const {API_URL} = process.env;
const app = Express();

//routers
import userrouter from "./src/modules/user/user.route.js";


app
    .use(json())
    .use (`${API_URL}users/`, userrouter)
    //localhost://
    .use("*", (req ,res)=> {
    return res.status(404).send("Not Found...")
   });


app.listen(3000, function () {
    console.log(API_URL);
    console.log("server is running at port 3000");
});