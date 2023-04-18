const booksSection = document.querySelector(".books");
import { idList } from "./displayBooks";
const cartItems = document.querySelector(".cart-items-counter");
let idListBoughtBooks;

const cartItemsCounterDisplay = (boughtItemsCount) => {
  if (boughtItemsCount > 0) {
    cartItems.style.backgroundColor = "#FF353A";
    cartItems.textContent = boughtItemsCount;
  } else {
    cartItems.style.backgroundColor = "#11ffee00";
    cartItems.textContent = "";
  }
};

if (localStorage.length!=0) {
  idListBoughtBooks = localStorage.getItem('booksIDs').split(",");
  cartItemsCounterDisplay(idListBoughtBooks.length);
} else {
  idListBoughtBooks = []
}

const buyBook = (btn) => {
  if (btn.target.classList.contains("buy__button")) {
    if (btn.target.className == "button buy__button buy__button_active") {
      btn.target.className = "button buy__button buy__button_pressed";
      btn.target.textContent = "in the cart";
      idListBoughtBooks.push(
        idList[
          Array.from(document.querySelectorAll(".buy__button")).indexOf(
            btn.target
          )
        ]
      );
      localStorage.clear();
      localStorage.setItem("booksIDs",idListBoughtBooks)
      
      console.log({ ...localStorage });
    } else {
      idListBoughtBooks.splice(
        [
          idListBoughtBooks.indexOf(
            idList[
              Array.from(document.querySelectorAll(".buy__button")).indexOf(
                btn.target
              )
            ]
          ),
        ],
        1
      );
      
      localStorage.setItem("booksIDs",idListBoughtBooks)
      if (idListBoughtBooks.length==0) {
        localStorage.clear();
      }
      console.log({ ...localStorage });
      btn.target.className = "button buy__button buy__button_active";
      btn.target.textContent = "buy now";
    }
    cartItemsCounterDisplay(idListBoughtBooks.length);
  }
};


booksSection.addEventListener("click", buyBook);
