import {displayBooks} from './displayBooks';
import {currentCategory} from './categoryPicker';
const loadMoreBtn = document.querySelector('.load-more__button')

let index =0;

loadMoreBtn.addEventListener('click',async()=>{
    index+=6;
    await displayBooks(currentCategory,index);
})