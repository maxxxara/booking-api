import Express from "express";
const app = new Express();
import moviesRoutes from "./routes/movies.js";
import calendarRoutes from "./routes/calendar.js";
import seatsRoutes from "./routes/seats.js";
import chatRoutes from "./routes/chat.js";
import cors from "cors";


app.use(Express.json())
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://stupendous-froyo-ab7bef.netlify.app/');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(cors({credentials: true, origin: 'http://stupendous-froyo-ab7bef.netlify.app/'}));



app.use("/movies/", moviesRoutes);
app.use("/calendar/", calendarRoutes);
app.use("/seats/", seatsRoutes);
app.use("/chat/", chatRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log("API Working");
})
