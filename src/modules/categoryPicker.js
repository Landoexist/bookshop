import {displayBooks,changeCategory} from './displayBooks';
const queryCategory = [
    "Architecture",
    "Art",
    "Biography & Autobiography",
    "Business",
    "Crafts & Hobbies",
    "Drama",
    "Fiction",
    "Cooking",
    "Health & Fitness",
    "History",
    "Humor",
    "Poetry",
    "Psychology",
    "Science",
    "Technology",
    "Travel",
  ];

const categoryList = document.querySelectorAll('.categories-list__item')
export let currentCategory = queryCategory[0]
categoryList.forEach(categoryItem => {
  categoryItem.addEventListener('click',async()=>{
    document.querySelector('.books').scrollIntoView(true);
    var scrolledY = window.scrollY;
    if(scrolledY){
      window.scroll(0, scrolledY - 120);
    }
    categoryList.forEach(el => {
      el.className = 'categories-list__item'
    });
    
    categoryItem.className = 'categories-list__item categories-list__item_active'
    currentCategory = queryCategory[Array.from(categoryList).indexOf(categoryItem)]
    changeCategory();
    await displayBooks(currentCategory,0);
  })
});

