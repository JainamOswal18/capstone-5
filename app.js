import express from "express"
import "dotenv/config"

const app = express();
const port = process.env.PORT;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.listen(port, () => {
    console.log(`Server Running on port: http://localhost:${port}`);
})