// //Домашнее задание № 18
"use strict";

const url =
  "https://it-academy-js-api-zmicerboksha.vercel.app/api/course/books?size=20&page=0&orderBy=id,asc";

const pagesSelect = document.querySelector("#pagesSelect");
const inputSearch = document.querySelector(".input-search");
const btnSearch = document.querySelector("button.search");
const ulPagination = document.querySelector("ul.pagination.pagination-lg");
// let changePages;
const pageItem = document.querySelectorAll("li.page-item");
const tHead = document.querySelector("thead");
const sortable = document.querySelectorAll(".sortable");

let newTr;
let numberPage = 1;
let sortableElement;
let sortFrom = "asc";

function getBooks(url) {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((response) => response.content)
    .then((books) => {
      console.log(books);
      books.forEach((book) => {
        // console.log(book)
        newTr = document.createElement("tr");
        newTr.classList.add("added");
        tHead.append(newTr);

        let bookId = document.createElement("td");
        newTr.append(bookId);
        bookId.innerHTML = `${book.id}`;

        let bookTitle = document.createElement("td");
        newTr.append(bookTitle);
        bookTitle.innerHTML = `${book.title}`;

        let bookAuthor = document.createElement("td");
        newTr.append(bookAuthor);
        bookAuthor.innerHTML = `${book.author}`;

        let bookYear = document.createElement("td");
        newTr.append(bookYear);
        bookYear.innerHTML = `${book.year}`;

        let bookPrice = document.createElement("td");
        newTr.append(bookPrice);
        bookPrice.innerHTML = `${book.price}`;

        let bookImage = document.createElement("td");
        let img = document.createElement("img");
        img.setAttribute("src", `${book.imageLink}`);
        bookImage.append(img);
        newTr.append(bookImage);
      });
    });
  console.log(url);

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((response) => response.totalPages)
    .then((lengthPages) => {
      console.log(lengthPages);
      for (let i = 0; i < lengthPages; i++) {
        let newLi = document.createElement("li");
        newLi.classList.add("page-item");
        newLi.innerHTML = `<a class="page-link" href="#">${i + 1}</a>`;
        ulPagination.append(newLi);
      }
    });
  console.log(url);
}
getBooks(url);

function removeTr() {
  let added = document.querySelectorAll(".added");
  added.forEach((elem) => {
    elem.remove();
  });
  let pageItem = document.querySelectorAll(".page-item");
  pageItem.forEach((elem) => {
    elem.remove();
  });
}

// console.log(url.indexOf("size"));

function changeUrl() {
  getBooks(
    `${url.slice(0, url.indexOf("size"))}&size=${pagesSelect.value}&page=${
      numberPage - 1
    }&search=${inputSearch.value}&orderBy=${sortableElement},${sortFrom}`
  );
  console.log(
    `${url.slice(0, url.indexOf("size"))}&size=${pagesSelect.value}&page=${
      numberPage - 1
    }&search=${inputSearch.value}&orderBy=${sortableElement},${sortFrom}`
  );
}

pagesSelect.addEventListener("change", () => {
  removeTr();
  changeUrl();
});

btnSearch.addEventListener("click", () => {
  removeTr();
  changeUrl();
});

sortable.forEach((elem) => {
  elem.addEventListener("click", (event) => {
    sortFrom = sortFrom === "asc" ? "desc" : "asc";
    sortableElement = event.target.dataset.field;
    removeTr();
    changeUrl();
  });
});

ulPagination.addEventListener("click", (event) => {
  numberPage = +event.target.innerHTML;
  removeTr();
  changeUrl();
  numberPage = 1;
});
