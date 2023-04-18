import slider1 from "../images/slider1.png";
import slider2 from "../images/slider2.png";
import slider3 from "../images/slider3.png";

const sliderLine = document.querySelector(".slider-line");

sliderLine.innerHTML = `<img src="${slider1}" class="slider-image" alt="">
<img src="${slider2}" class="slider-image" alt="">
<img src="${slider3}" class="slider-image" alt="">`;

const sliderImages = document.querySelectorAll('.slider-image')


let width;

let headerHeight;
let sliderHeight;

const banner1 =document.querySelector('.banner1')
const banner2 =document.querySelector('.banner2')

const displayBanners = ()=>{
    headerHeight = document.querySelector(".header").offsetHeight;
    sliderHeight = document.querySelector(".slider-section").offsetHeight;
    banner1.style.top = headerHeight+sliderHeight*0.1+'px'
    banner2.style.top = headerHeight+sliderHeight*0.5+'px'
    banner1.style.left = (document.querySelector("main").offsetWidth-document.querySelector(".slider-section").offsetWidth)/2+document.querySelector(".slider-section").offsetWidth*0.9+'px'
    
    banner2.style.left = (document.querySelector("main").offsetWidth-document.querySelector(".slider-section").offsetWidth)/2+document.querySelector(".slider-section").offsetWidth*0.935+'px'
    if (document.querySelector("main").offsetWidth<768) {
        banner1.style.left = (document.querySelector("main").offsetWidth-document.querySelector(".slider-section").offsetWidth)/2+document.querySelector(".slider-section").offsetWidth*0.865+'px'
        banner2.style.left = (document.querySelector("main").offsetWidth-document.querySelector(".slider-section").offsetWidth)/2+document.querySelector(".slider-section").offsetWidth*0.905+'px'
    }
}

const changeSlideSize = ()=>{
    width = document.querySelector(".slider-section").offsetWidth;
    sliderLine.style.width = width*sliderImages.length+'px';
    sliderImages.forEach(image => {
        image.style.width = width+'px'
        image.style.height = 'auto'
    });
    displayBanners();
}
window.addEventListener('resize',changeSlideSize);
window.addEventListener('load', displayBanners);
changeSlideSize();

const circles = document.querySelectorAll('.slider__circle')
let activeSlide = 0;

const rollSlider = (activeSlideNumber)=>{
    sliderLine.style.transform = `translate(-${activeSlideNumber*width}px)`
}
const changeSlide=()=>{
    circles.forEach(circle => {
        circle.addEventListener('click',()=>{
            circles.forEach(el => {
                el.className='slider__circle'
            });
            circle.className ='slider__circle'?'slider__circle slider__circle_active':'slider__circle'
            activeSlide = Array.from(circles).indexOf(circle);
            rollSlider(activeSlide);
        })
    });
}

setInterval(() => {
    activeSlide == 2?activeSlide =0:activeSlide++;
    circles.forEach(circle => {
        circle.className = 'slider__circle'
    });
    circles[activeSlide].className='slider__circle slider__circle_active'
    rollSlider(activeSlide);
}, 5000);

changeSlide();

