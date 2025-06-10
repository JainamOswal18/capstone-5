import express from "express"
import "dotenv/config"
import { Pool } from "pg";

const app = express();
const port = process.env.PORT;

const pool = new Pool({
  user: "postgres",
  hostname: "localhost",
  database: "Book_Notes",
  password: process.env.DB_PASSWORD,
  port: 5432,
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {

    const results = await pool.query("SELECT * FROM books_data");
    console.log(results.rows);

    res.render("index.ejs", {data: results.rows});
});

app.post("/filter", async (req, res) => {

    console.log(req.body);

    let results;

    switch (req.body.filterOption) {
        case 'title':
            results = await pool.query("SELECT * FROM books_data order by title asc");
            break;
    
        case 'rating':
            results = await pool.query("SELECT * FROM books_data order by rating desc");
            break;
        
        case 'date':
            results = await pool.query("SELECT * FROM books_data order by date asc");
            break;
    

    }

    console.log(results.rows);

    res.render("index.ejs", { data: results.rows });
});

app.get("/book", async (req, res) => {
    const bookInfo = {
      title: req.query.title,
      author: req.query.author,
      coverId: req.query.coverId,
      review: req.query.review || "",
      rating: req.query.rating || "",
    };

    const results = await pool.query("SELECT * FROM books_data WHERE title=$1", [bookInfo.title]);
    console.log(results.rows);

    res.render("addBook.ejs", {
        data: results.rows.length > 0 ? results.rows : null,
        bookInfo: bookInfo
    });
    
});

app.post("/addBook", async (req, res) => {
    const { title, author, coverId, review_text, rating } = req.body;

    const existing = await pool.query(
      "SELECT * FROM books_data WHERE coverId = $1",
      [coverId]
    );

    if (existing.rows.length > 0) {
      await pool.query(
        "UPDATE books_data SET review=$1, rating=$2 WHERE coverId=$3",
        [review_text, rating, coverId]
      );
    } else {
      await pool.query(
        "INSERT INTO books_data (coverid, title, author, review, rating) VALUES ($1, $2, $3, $4, $5)",
        [coverId, title, author, review_text, rating]
      );
    }

    res.redirect("/");

});

app.post("/modify", (req, res) => {

    console.log(req.body);
    
    if (req.body.action == 'Edit') {
        return res.redirect(
          `/book?title=${encodeURIComponent(
            req.body.title
          )}&author=${encodeURIComponent(req.body.author)}&coverId=${
            req.body.coverId
          }&review=${encodeURIComponent(req.body.review)}&rating=${
            req.body.rating
          }`
        );
    } 

    if (req.body.action == 'Delete') {
        pool.query("DELETE FROM books_data WHERE coverId=$1", [req.body.coverId]);
        return res.redirect("/");
    }

    res.status(400).send("Invalid action");
});

// { edit: 'Edit' }
// { delete: 'Delete' }

app.listen(port, () => {
    console.log(`Server Running on port: http://localhost:${port}`);
});