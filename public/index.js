document.addEventListener("DOMContentLoaded", () => {

    const searchBar = document.getElementById("searchBar");
    const dropdown = document.getElementById("myDropdown");
    
    const debounce = (func, delay) => {
      let timerId; // Closure Variable shared amongst every function call even after the current function completes
      return function (...args) { // pass all params without manipulating anything
        clearTimeout(timerId); // clear previous timeout
        timerId = setTimeout(() => { // new countdown/timer of 0.3seconds, once completed, function is called with all input params
          func(...args);
        }, delay);
      };
    };

    const debouncedFetch = debounce(fetchData, 300); // create a debounce instance for event listener

    searchBar.addEventListener("input", () => {
        if (searchBar.value.trim()) {
            debouncedFetch();
        }
    });    
    
    async function fetchData() {
        const searchTerm = searchBar.value.trim();
        console.log("Search Term: " ,searchTerm);
        
        try {
            const response = await fetch(`https://openlibrary.org/search.json?q=${searchTerm}&limit=10`);
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log(data);
            const results = data.docs;
            console.log(results);

            const bookTitle = results.map((book) => book.title);
            const authorName = results.map((book) => book.author_name ? book.author_name[0] : "Unknown");
            const coverId = results.map((book) => book.cover_i);

            console.log(bookTitle, authorName,coverId);
            
            renderDropdown(bookTitle, authorName, coverId);
            
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }

    // const items = ["The Alchemist", "Sapiens", "1984"];
    // const bookAuthor = ["Paulo Coelho", "Yuval Noah Harari", "George Orwell"];
    // const coverId = [8234151, 8750432, 8238439]; // Use 0 if not available
    
    
    async function renderDropdown(items, bookAuthor, coverId) {
      dropdown.innerHTML = ""; // clear previous results
      for (let i = 0; i < items.length; i++) {
        const link = document.createElement("a");
        link.href = `/book?title=${encodeURIComponent(
          items[i]
        )}&author=${encodeURIComponent(bookAuthor[i])}&coverId=${coverId[i] || 0}`;
        link.innerHTML = `
          <li class="listItem">
            <img src="https://covers.openlibrary.org/b/id/${
              coverId[i] || 0
            }-S.jpg?default=https://openlibrary.org/static/images/icons/avatar_book-sm.png" width="40" height="60" alt="book picture">
            <div>
              <p><strong>${items[i]}</strong></p>
              <p>By ${bookAuthor[i]}</p>
            </div>
          </li>
        `;
        dropdown.appendChild(link);
      }
      dropdown.style.display = "block";
    }
})
