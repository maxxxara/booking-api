import Express from "express";
const app = new Express();
import moviesRoutes from "./routes/movies.js";
import calendarRoutes from "./routes/calendar.js";
import seatsRoutes from "./routes/seats.js";
import chatRoutes from "./routes/chat.js";
import cors from "cors";


app.use(Express.json())

//middlewares


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
  
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://movie-booking-delta.vercel.app/")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested, Content-Type, Accept Authorization"
    )
    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "POST, PUT, PATCH, GET, DELETE"
      )
      return res.status(200).json({})
    }
    next()
})
// app.use(cors())


app.use("/movies/", moviesRoutes);
app.use("/calendar/", calendarRoutes);
app.use("/seats/", seatsRoutes);
app.use("/chat/", chatRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log("API Working");
})
