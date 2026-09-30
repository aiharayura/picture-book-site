const latestContainer = document.getElementById("latest-book");
const grid = document.getElementById("book-grid");
const count = document.getElementById("book-count");

count.textContent = `${books.length} picture books / reading notes`;

const latestBook = books[books.length - 1];
const olderBooks = books.slice(0, -1);

latestContainer.innerHTML = `
<article class="latest">
  <div class="latest-cover cover-${latestBook.color}">${latestBook.title}</div>
  <div>
    <span class="latest-badge">NEW</span>
    <div class="latest-author">${latestBook.author}</div>
    <h3>${latestBook.title}</h3>
    <p class="latest-summary">${latestBook.summary}</p>
    <div class="latest-memo"><strong>読んだメモ</strong>${latestBook.memo}</div>
  </div>
</article>`;

olderBooks.forEach((book,index)=>{
  const card=document.createElement("article");
  card.className="card";
  card.innerHTML=`
    <div class="cover cover-${book.color}">${book.title}</div>
    <div class="author">${book.author}</div>
    <h3>${book.title}</h3>
    <p class="summary">${book.summary}</p>
    <div class="memo"><strong>読んだメモ</strong>${book.memo}</div>
    <div class="details" id="details-${index}">${book.details}</div>
    <div class="button-area"><button class="button" aria-expanded="false" aria-controls="details-${index}" onclick="toggleDetails(this,'details-${index}')">詳しく見る</button></div>`;
  grid.appendChild(card);
});

function toggleDetails(button,id){
  const box=document.getElementById(id);
  const open=box.classList.toggle("open");
  button.setAttribute("aria-expanded",String(open));
  button.textContent=open?"閉じる":"詳しく見る";
}
