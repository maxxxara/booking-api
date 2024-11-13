import Express from "express";
const app = new Express();

app.use(Express.json())
// Add headers before the routes are defined
app.get('/', (req, res) => {
  res.send('Hello World!')
})
const PORT = process.env.PORT || 5050;
app.listen(Number(PORT), () => {
    console.log("API Working");
})
