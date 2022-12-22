import Express from "express";
const app = new Express();
import moviesRoutes from "./routes/movies.js";
import calendarRoutes from "./routes/calendar.js";
import seatsRoutes from "./routes/seats.js";
import chatRoutes from "./routes/chat.js";
import cors from "cors";


app.use(Express.json())

//middlewares
// access ccors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true)
    next()
})
// const corsOpts = {
//     origin: 'https://movie-booking-api.vercel.app/',
  
//     methods: [
//       'GET',
//       'POST',
//     ],
  
//     allowedHeaders: [
//       'Content-Type',
//     ],
// };
  
// app.use(cors());

// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });

var corsOptions = {
    origin: 'https://movie-booking-api.vercel.app/',
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));


app.use("/movies/", moviesRoutes);
app.use("/calendar/", calendarRoutes);
app.use("/seats/", seatsRoutes);
app.use("/chat/", chatRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log("API Working");
})
