import express from "express"
import "dotenv/config"

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
    res.json("Hello World");
})

app.listen(port, () => {
    console.log(`Server Running on port: http://localhost:${port}`);
})