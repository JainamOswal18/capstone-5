# 📚 Book Notes

Welcome to **Book Notes** – my capstone project designed to strengthen and demonstrate my understanding of:

- Integrating public APIs
- Server-side rendering with Express and Node.js
- Performing full CRUD operations with PostgreSQL for persistent storage

---

## 🚀 Features

- 🔍 Search books from Search Bar using debouncing and the [OpenLibrary API](https://openlibrary.org/dev/docs/api/search)
- 🖼️ View book covers, titles, authors
- ✍️ Add reviews and star-based ratings
- ✏️ Edit or delete existing reviews
- 🧠 Data is stored persistently using PostgreSQL

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, EJS templating
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **API Used:** OpenLibrary API

---

## 💾 Setup Instructions

1. **Clone the repository:**

    ```bash
    git clone https://github.com/JainamOswal18/capstone-5.git
    cd capstone-5
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up your PostgreSQL database:**

    - Create a database named `Book_Notes`
    - Run the following SQL to create the table:

      ```sql
      CREATE TABLE books_data (
          id SERIAL PRIMARY KEY,
          coverId BIGINT,
          title VARCHAR(50),
          author VARCHAR(50),
          review TEXT,
          rating INTEGER CHECK (rating >= 0 AND rating <= 5),
          date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      ```

4. **Configure your environment variables:**

    - Create a `.env` file in the root directory:
      
      ```env
      DB_PASSWORD=your_db_password
      ```

5. **Run the application:**

    ```bash
    node app.js
    ```

---

## 🎯 Purpose

This project was built to help me revise and solidify my backend development skills by working on:

- Integrating external data via public APIs
- Implementing server-side rendering using EJS
- Creating real-world CRUD operations with PostgreSQL
- Practicing modular Express.js app architecture

---

## 🧪 Future Improvements

- Add user login/authentication
- Implement pagination and filter/sort options
- Deploy using Render, Railway, or Supabase with custom domain

---

## 📬 Contact

For questions, feedback, or collaboration opportunities, feel free to reach out via email or GitHub!

