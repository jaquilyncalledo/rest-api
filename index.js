import  Express,{Router, json} from "express";
import dotenv from 'dotenv';
dotenv.config();

const {API_URL} = process.env;
const app = Express();
const router = Router();

app.use(json()).use (
    router.get('/',function(req, res) {
    return res.send("hello from rest-api v2");
}),
router.post("/post-request/", (req , res) => {
    const body = req.body;
    const params = req.params;
    const queryparams = req.query;
    res
        .status(200)
        .json({Body: body, Params: params,"Query params":queryparams});
}),
);

app.listen(3000, function () {
    console.log(API_URL);
    console.log("server is running at port 3000");
});