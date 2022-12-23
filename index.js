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
  
// app.use(cors());

router.get('/', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    res.send('cors problem fixed:)');
});


app.use("/movies/", moviesRoutes);
app.use("/calendar/", calendarRoutes);
app.use("/seats/", seatsRoutes);
app.use("/chat/", chatRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log("API Working");
})
