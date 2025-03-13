// limit slider paragraph text characters and add "..." + read more button
document.addEventListener("DOMContentLoaded", function(){

// limit slider paragraph text
    const slideParagraphs = document.querySelectorAll(".slide-paragraph");

    slideParagraphs.forEach((slideParagraph) => {
        const textLimit = 100;
        const fullText = slideParagraph.innerText;
        const aTag = slideParagraph.querySelector(".paragraph-anchor-tag");

        if(slideParagraph.innerText.length > textLimit){
            slideParagraph.innerHTML = fullText.substring(0, textLimit) + "..." + aTag.innerHTML;
        }
    });

    // limit video card paragraph text
    const videoParagraphs = document.querySelectorAll(".video-paragraph");

    videoParagraphs.forEach((videoParagraph) => {
        const textLimit = 150;
        const fullText = videoParagraph.innerText;
        const aTag = videoParagraph.querySelector(".video-anchor-tag");

        if(videoParagraph.innerText.length > textLimit){
            videoParagraph.innerHTML = fullText.substring(0, textLimit) + "..." + aTag.innerHTML;
        }
    });
});

// load first slide
window.addEventListener("DOMContentLoaded", () => {
    const firstSlide = document.querySelector(".first-slide");
    const firstSlideBtn = document.querySelector(".first-slide-btn");
    const firstIndicatorBar = document.querySelector(".first-indicator-bar");

    setTimeout(() => {
        firstSlide.classList.add("actuve");
    }, 300);

    firstSlideBtn.classList.add("active");
    firstIndicatorBar.classList.add("active");
});

// javascript for slider
const slider = document.querySelector(".slider");
const slides = slider.querySelectorAll(".slide");
const numberOfSlides = slides.length;
const slideBtns = document.querySelectorAll(".slide-btn");
const slideIndicatorBars = document.querySelectorAll(".indicator-bar");
var slideNumber = 0;

// slider autoplay
var playSlider;

var repeater = () => {
    playSlider = setInterval(function() {
        slides.forEach((slide) => {
            slide.classList.remove("active");
        });
    
        slideBtns.forEach((slideBtn) => {
            slideBtn.classList.remove("active");
        });
    
        slideIndicatorBars.forEach((slideIndicatorBar) => {
            slideIndicatorBar.classList.remove("active");
        });
    
        slideNumber++;
    
        if(slideNumber > (numberOfSlides - 1)){
            slideNumber = 0;
        }
    
        slides[slideNumber].classList.add("active");
        slideBtns[slideNumber].classList.add("active");
        slideIndicatorBars[slideNumber].classList.add("active");
    }, 8500);
}
repeater();

// slider next/prev btn navigation
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

// slider next btn navigation
nextBtn.addEventListener("click", () => {
    slides.forEach((slide) => {
        slide.classList.remove("active");
    });

    slideBtns.forEach((slideBtn) => {
        slideBtn.classList.remove("active");
    });

    slideIndicatorBars.forEach((slideIndicatorBar) => {
        slideIndicatorBar.classList.remove("active");
    });

    slideNumber++;

    if(slideNumber > (numberOfSlides - 1)){
        slideNumber = 0;
    }

    slides[slideNumber].classList.add("active");
    slideBtns[slideNumber].classList.add("active");
    slideIndicatorBars[slideNumber].classList.add("active");

    clearInterval(playSlider);
    repeater();
});

// slider previous btn navigation
prevBtn.addEventListener("click", () => {
    slides.forEach((slide) => {
        slide.classList.remove("active");
    });

    slideBtns.forEach((slideBtn) => {
        slideBtn.classList.remove("active");
    });

    slideIndicatorBars.forEach((slideIndicatorBar) => {
        slideIndicatorBar.classList.remove("active");
    });

    slideNumber--;

    if(slideNumber < 0){
        slideNumber = numberOfSlides - 1;
    }

    slides[slideNumber].classList.add("active");
    slideBtns[slideNumber].classList.add("active");
    slideIndicatorBars[slideNumber].classList.add("active");

    clearInterval(playSlider);
    repeater();
});

// slider pagination
var slideBtnNav = function(slideBtnClick){
    slides.forEach((slide) => {
        slide.classList.remove("active");
    });

    slideBtns.forEach((slideBtn) => {
        slideBtn.classList.remove("active");
    });

    slideIndicatorBars.forEach((slideIndicatorBar) => {
        slideIndicatorBar.classList.remove("active");
    });

    slides[slideBtnClick].classList.add("active");
    slideBtns[slideBtnClick].classList.add("active");
    slideIndicatorBars[slideBtnClick].classList.add("active");
}

slideBtns.forEach((slideBtn, i) => {
    slideBtn.addEventListener("click", () => {
        slideBtnNav(i);
        clearInterval(playSlider);
        repeater();
        slideNumber = i;
    });
});

// javascript for video modals
slides.forEach((slide, i) => {
    let watchVideoBtn = slide.querySelector(".watch-video-btn");
    let slideVideoModal = slide.querySelector(".slide-video-modal");
    let videoModalContent = slide.querySelector(".video-modal-content");
    let videoCloseBtn = slide.querySelector(".video-close-btn");
    let animalVideo = slide.querySelector(".animal-video");

    // open video modals on click watch video btn
    watchVideoBtn.addEventListener("click", () => {
        slideVideoModal.classList.add("active");

        setTimeout(() => {
            videoModalContent.classList.add("active");
        }, 300);

        animalVideo.play();

        // stop slider autoplay on click
        if(slideVideoModal.classList.contains("active")){
            clearInterval(playSlider);
        }
    });

    // reset current slide autoplay time on mouseover the slide video modal
    // slideVideoModal.addEventListener("mouseover", () => {
    //     clearInterval(playSlider);
    // });

    // close video modals on click video modals close buttons
    const videoClose = function(closeBtnClick){
        //restart the current slider indicator bar on click the video close button
        slideIndicatorBars.forEach((slideIndicatorBar) => {
            slideIndicatorBar.classList.remove("active");
        });

        setTimeout(() => {
            slideIndicatorBars[closeBtnClick].classList.add("active");
        }, 0);
    }

    videoCloseBtn.addEventListener("click", () => {
        slideVideoModal.classList.remove("active");
        videoModalContent.classList.remove("active");

        slideIndicatorBars.forEach((slideIndicatorBar) => {
            slideIndicatorBar.classList.remove("active");
        });

        animalVideo.pause();

        clearInterval(playSlider);
        repeater();
        videoClose(i);
    });
});