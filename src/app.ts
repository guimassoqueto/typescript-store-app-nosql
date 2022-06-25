import express, { Express, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
// utils
import { viewsLocation } from "./utils/viewsLocation.util";
// Node modules
import { join } from "path";
// custom middlewares
import { setDefaultUser } from "./middlewares/setDefaultUser.middleware";
import { setLoggedInFalse } from "./middlewares/setLoggedInFalse.middleware";

// routes
import { adminRoute } from "./routes/admin.route";
import { shopRoute } from "./routes/shop.route";
import { userRoute } from "./routes/loginRoute.route";
import { indexRoute } from "./routes/index.route";

const PORT = 3000;
const app: Express = express();

// http://expressjs.com/en/api.html#app.set
app.set('view engine', 'pug');

// set the folder location for the views
app.set('views', viewsLocation);

// static files
app.use(express.static(join(__dirname, 'static')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// middlewares
app.use(setDefaultUser);
app.use(setLoggedInFalse);

// routes
app.use('/admin', adminRoute);
app.use('/shop', shopRoute);
app.use('/user', userRoute);
app.get('/', indexRoute);

app.get('/404', (req: Request, res: Response, next: NextFunction) => {
    res.render("404");
})

app.listen(PORT, () => console.log("Server running"))