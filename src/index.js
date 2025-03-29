// sideffect import css;
import "./modern-normalize-customized.css";
import "./styles.css";

// import modules
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

// initialize site
(function pageInitializer(){
    
    events.on("domCached", init);

    function init(dom) {
        for(let i=0, p=pages.createPages(); i<p.length; i++) {
            dom.main.innerHTML += p.at(i).outerHTML;
        }

        //initialize site with home page and cache image-wrapper and carousel btns
        dom.html.classList.add("home");

        dom.menus = document.querySelectorAll(".card.menu");  

        dom.imageWrapper = document.querySelector("main .image-wrapper");
        
        dom.carouselImgBtns = document.querySelectorAll("#home button"); 
        dom.carouselMenuBtns = document.querySelectorAll("#menu button");
 
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
                events.emit("pageChange", dom)
            }
        });
    }
    function attachCarouselBtnListeners(dom) {

        dom.carouselImgBtns.forEach(btn => {
            btn.onclick = () => {
                imgCarousel.rotate(btn.className);
            }
        });
        dom.carouselMenuBtns.forEach(btn => {
            btn.onclick = () => {
                menuCarousel.rotate(btn.className);
            }
        });
    }
})();

// Active effect for nav btns, listenerAttacher helper
(function activateNavBtns() {

    events.on("pageChange", activateNavBtn);

    function activateNavBtn(dom) {
        dom.navBtns.forEach((btn) => {
            btn.classList.contains(dom.html.className) ?
                btn.classList.add("active") :
                btn.classList.remove("active");
        });    
    }
})();

// add home page image carousel functionality
const imgCarousel = (function (){
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
    function continueCaoursel(dom) {

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
        console.log(action)
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
            imageWrapper.innerHTML = imgs[i].outerHTML;
        },1000)
        i = ++i % 13;            
    }
    
    return {rotate}
})();

// menu carousel
const menuCarousel = (function (){
    events.on("pageInit", cacheMenus);
    events.on("pageChange", continueMenuCaoursel);
        
        let intervalId = null, 
            menus = null,
            menuContainer = null,
            activated = null,
            i = 2,
            positions = ["left", "right"];

    // Logic
    function cacheMenus(dom) {
        menus = Array.from(dom.menus);
    }
    function continueMenuCaoursel(dom) {

        // if change not to menu page stop carousel at current
        if (!dom.html.classList.contains("menu")) {
            intervalId ? clearInterval(intervalId) : undefined;
        } else {
            // continue interval
            setCarouselMenu(activated ? false : true);
        }
    }

    // carousel
    function setCarouselMenu(immediate) {
        if (immediate) {
            menuChanger();
        }
        intervalId = setInterval(menuChanger, 20000);
    }
    function menuChanger() {
        
        activated ? activated.classList.remove("active") : undefined;

        setTimeout(()=>{
            menus[i].classList.add("active");
            activated = menus[i]
        },500)
        i = ++i % 3;            
    }
    
    // add funcitionality for next and previous, next not needed as already incremented
    function rotate(action) {
        clearInterval(intervalId);
        i = action === "previous" ? ((i-2) + 3) % 3 : i
        setCarouselMenu(true);
    }

    return {rotate}
})();