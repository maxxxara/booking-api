import Express from "express";
const app = new Express();
import moviesRoutes from "./routes/movies.js";
import calendarRoutes from "./routes/calendar.js";
import seatsRoutes from "./routes/seats.js";
import chatRoutes from "./routes/chat.js";
import cors from "cors";


app.use(Express.json())


app.use(cors({credentials: true, origin: 'https://stupendous-froyo-ab7bef.netlify.app/'}));



app.use("/movies/", moviesRoutes);
app.use("/calendar/", calendarRoutes);
app.use("/seats/", seatsRoutes);
app.use("/chat/", chatRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log("API Working");
})
