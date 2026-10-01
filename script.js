const grid = document.getElementById("book-grid");
const searchInput = document.getElementById("search-input");
const resultCount = document.getElementById("result-count");
const emptyMessage = document.getElementById("empty-message");

function formatAge(ageMin) {
  if (ageMin === null) return "情報なし";
  if (ageMin === 1.5) return "1歳半から";
  return `${ageMin}歳から`;
}

function createBookCard(book) {
  const article = document.createElement("article");
  article.className = "book-card";

  const translatorText = book.translator
    ? `<br>訳：${book.translator}`
    : "";

  const tagsHtml = book.tags
    .map(tag => `<span class="tag">${tag}</span>`)
    .join("");

  article.innerHTML = `
    <div class="book-cover">
      表紙画像は後で追加
    </div>

    <h3>${book.title}</h3>

    <p class="creator">
      作：${book.author}<br>
      絵：${book.illustrator}
      ${translatorText}
    </p>

    <p class="description">${book.description}</p>

    <dl class="meta">
      <div class="meta-row">
        <dt>出版社</dt>
        <dd>${book.publisher}</dd>
      </div>
      <div class="meta-row">
        <dt>出版年</dt>
        <dd>${book.year}年</dd>
      </div>
      <div class="meta-row">
        <dt>対象</dt>
        <dd>${formatAge(book.ageMin)}</dd>
      </div>
      <div class="meta-row">
        <dt>ISBN</dt>
        <dd>${book.isbn}</dd>
      </div>
    </dl>

    <div class="tags">
      ${tagsHtml}
    </div>
  `;

  return article;
}

function renderBooks(bookList) {
  grid.innerHTML = "";

  bookList.forEach(book => {
    grid.appendChild(createBookCard(book));
  });

  resultCount.textContent = `${bookList.length}冊`;
  emptyMessage.hidden = bookList.length !== 0;
}

function searchBooks() {
  const keyword = searchInput.value.trim().toLowerCase();

  const filteredBooks = books.filter(book => {
    const searchableText = `
      ${book.title}
      ${book.author}
      ${book.illustrator}
      ${book.translator}
    `.toLowerCase();

    return searchableText.includes(keyword);
  });

  renderBooks(filteredBooks);
}

searchInput.addEventListener("input", searchBooks);

// 最初は全冊を表示
renderBooks(books);
