// import "modern-normalize";
import "./modern-normalize-customized.css";
import "./styles.css";

import events from "./pubsub.js";
import pages from "./pages.js";


// cache dom
(function domCacher(){
    document.addEventListener("DOMContentLoaded", cacheDom);
    const dom = {};
    function cacheDom() {
        dom.html = document.documentElement;
        dom.main = document.querySelector("main");
        dom.navBtns = document.querySelectorAll("header nav .btn");
        events.emit("domCached", {dom});
    }
})();

// Attach listeners
(function listenerAttacher(){

    events.on("domCached", attachNavBtnLsiteners);
    // events.on("navChange", attachMainBtnListeners);
    
    function attachNavBtnLsiteners({dom}) {
        // For each btn onclick notify change of page
        dom.navBtns.forEach(btn => {
            btn.onclick = () => {
                events.emit("navChange", {
                    dom,
                    page: btn.classList[0] 
                })
            }
        });
    }
    // function attachMainBtnListeners({dom, page}) {
    //     return;
    // }
})();

// Active effect for nav btns
(function activateNavBtns() {

    events.on("navChange", activateNavBtn);

    function activateNavBtn({dom, page}) {
        
        if (dom.html.classList.contains(page)) return;

        dom.navBtns.forEach((btn) => {
            btn.classList.contains(page) ?
                btn.classList.add("active") :
                btn.classList.remove("active");
        });    
    }
})();

// render main elmt for any page
(function pageController(){
    events.on("domCached", render);
    events.on("navChange", render);
    function render({dom, page}) {
        pages.renderPage(dom.html, dom.main, page);
        events.emit("pageChange", dom);
    }
})();

// add auto image swap functionality

// add funcitionality for next and previous



// create menu

// create about