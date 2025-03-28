// import css;
import "./modern-normalize-customized.css";
import "./styles.css";

import events from "./pubsub.js";
import pages from "./pages.js";
import { loadImages } from "./images.js";



// cache dom
(function domCacher(){

    document.addEventListener("DOMContentLoaded", cacheDom);
    
    const dom = {};
    function cacheDom() {
        dom.html = document.documentElement;
        dom.main = document.querySelector("main");
        dom.navBtns = document.querySelectorAll("header nav .btn");
        events.emit("domCached", dom);
    }
})();

// render main elmt for any page
(function pageController(){
    
    events.on("domCached", init);

    function init(dom) {
        for(let i=0, p=pages.createPages(); i<p.length; i++) {
            dom.main.innerHTML += p.at(i).outerHTML;
        }

        //init with home page and cache wrapper
        dom.html.classList.add("home");
        dom.imageWrapper = document.querySelector("main .image-wrapper");
        dom.carouselBtns = document.querySelectorAll("main .image-container button");  
        console.log(dom.carouselBtns)
        events.emit("pageInit", dom)
    }

})();

// Attach listeners
(function listenerAttacher(){

    events.on("domCached", attachNavBtnLsiteners);
    events.on("pageInit", attachCarouselBtnListeners);
    
    function attachNavBtnLsiteners(dom) {
        // For each btn onclick notify change of page
        dom.navBtns.forEach(btn => {
            btn.onclick = () => {
                dom.html.className = btn.classList[0];
                events.emit("pageChange", {
                    dom,
                    page: btn.classList[0] 
                })
            }
        });
    }
    function attachCarouselBtnListeners(dom) {
        dom.carouselBtns.forEach(btn => {
            btn.onclick = () => {
                carousel.rotate(btn.className);
            }
        });
    }
})();

// Active effect for nav btns
(function activateNavBtns() {

    events.on("pageChange", activateNavBtn);

    function activateNavBtn({dom, page}) {
        dom.navBtns.forEach((btn) => {
            btn.classList.contains(page) ?
                btn.classList.add("active") :
                btn.classList.remove("active");
        });    
    }
})();

// add auto image swap functionality
const carousel = (function (){
    document.addEventListener("DOMContentLoaded", cacheImgs);
    events.on("pageInit", startCarousel);
    events.on("pageChange", continueCaoursel);

    let imgs = null, 
        intervalId = null, 
        imageWrapper=null,  
        i = 0,
        positions=["top", "bottom", "right"];

    // Logic
    function cacheImgs() {
        imgs = loadImages();
    }
    function startCarousel(dom) {
        i = Math.floor(Math.random() * 13);
        imageWrapper = dom.imageWrapper;
        
        // first image
        setCarouselImgs();
    }
    function continueCaoursel({dom, page}) {

        // if change not to home page
        if (!dom.html.classList.contains("home")) {
            intervalId ? clearInterval(intervalId) : undefined;
        } else {
            // continue interval
            setCarouselImgs();
        }
    }

    // add funcitionality for next and previous, next not needed as already increamnted
    function rotate(action) {
        clearInterval(intervalId);
        i = action === "previous" ? ((i-2) + 13) % 13 : i
        setCarouselImgs(true);
    }

    // carousel
    function setCarouselImgs(immediate) {
        if (immediate) {
            imgChanger();
        }
        intervalId = setInterval(imgChanger, 5000);
    }
    function imgChanger() {
        imageWrapper.className = "image-wrapper disappear " + positions[Math.floor(Math.random()*3)];
        setTimeout(()=>{
            imageWrapper.classList.remove("disappear");
            imageWrapper.classList.add("appear");
            // imageWrapper.className = "image-wrapper appear";
            imageWrapper.innerHTML = imgs[i].outerHTML;
        },1000)
        i = ++i % 13;            
    }

    
    return {rotate}
})();

// create menu

// create about