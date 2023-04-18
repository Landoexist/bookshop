import { getResponse } from "./request";
import noImage from "../images/noImage.png";
import {currentCategory} from './categoryPicker';

let booksListHTML = ``;
export let idList = [];
const loader = document.querySelector(".loader");
const loadMoreBtn = document.querySelector(".load-more__button");

export const displayBooks = async (category, index) => {
  loader.style.display = "block";
  loadMoreBtn.style.display = "none";
  let books = await getResponse(category, index);
  books.forEach((book) => {
    idList.push(book.id);
    const picture = !book.volumeInfo.imageLinks
      ? noImage
      : book.volumeInfo.imageLinks.thumbnail;
    const price =
      book.saleInfo.saleability != "NOT_FOR_SALE"
        ? book.saleInfo.saleability == "FREE"
          ? "FREE"
          : `${book.saleInfo.retailPrice.amount} ${book.saleInfo.retailPrice.currencyCode}`
        : "NOT FOR SALE";
    const authors = book.volumeInfo.authors
      ? `${book.volumeInfo.authors}`
      : "UNKNOWN";
    const averageRating = book.volumeInfo.averageRating;
    const ratingsCount = book.volumeInfo.ratingsCount;
    const reviews =
      averageRating && ratingsCount
        ? `
      <div class="book-rating">
        <div class="book-rating__stars" style="--rating: ${averageRating};">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <div class="book-rating__reviews">${ratingsCount} review</div>
      </div>
      `
        : "";
    const description = book.volumeInfo.description
      ? `${book.volumeInfo.description}`
      : "";
    const buyButton =
      price == "NOT FOR SALE"
        ? '<button class="button buy__button buy__button_disabled" disabled="diasbled">not for sale</button>'
        : localStorage.length != 0 && localStorage.getItem("booksIDs").includes(book.id)
          ? '<button class="button buy__button buy__button_pressed">in the cart</button>'
          : '<button class="button buy__button buy__button_active">buy now</button>';

    booksListHTML += `
    <div class="book-card">
              <div class="book-image">
              <img src="${picture}" alt="${book.volumeInfo.title}" />
              </div>
              <div class="book-info">
                <div class="book-author">${authors}</div>
                <div class="book-title">${book.volumeInfo.title}</div>
                ${reviews}
                <div class="book-description">
                    ${description}
                </div>
                <div class="book-price">${price}</div>
                ${buyButton}
              </div>
            </div>
    `;
  });
  loader.style.display = "none";
  loadMoreBtn.style.display = "block";
  document
    .querySelector(".books")
    .insertAdjacentHTML("beforeend", booksListHTML);
  booksListHTML = ``;
};

export const changeCategory = () => {
  booksListHTML = ``;
  document.querySelector(".books").innerHTML = "";
  idList = [];
};


document.addEventListener("DOMContentLoaded", async () => {
  await displayBooks(currentCategory, 0);
});