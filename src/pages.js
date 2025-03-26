export default (function (){

    // create cach object
    const pages = {};
    function renderPage(html, main, page) {
        
        // get page name
        page = page || "home";

        // If already on page
        if (dom.html.classList.contains(page)) return;

        // Cache
        pages[page] = pages[page] || createMain(page)
        
        // apply class and render main content for page
        html.className = page;
        main.innerHTML = pages[page];
    }


    function createMain(page){
        switch(page){
            case "home":
                return `
                    <div class="welcome-wrapper">
                        <div class="welcome card">
                            <p><span class="strong">Welcome!!</span> We pride ourselfs on being the premier hotspot for vegan foodies in <span class="strong">Los Angeles</span>. We combine a carefully selected list of vegan Delicacies with superb Fine Dining expierence, all the while maintaining that homey atmosphere vegans look for.</p>
                        </div>
                    </div>
                    <div class="image-wrapper">
                        <button class="previous">previous</button>
                        <button class="next">next</button>
                    </div>`;
            case "menu":
                return `                    <div class="image-wrapper">
                        <button class="previous">previous</button>
                        <button class="next">next</button>
                    </div>`
            case "about":
                return `           <div class="welcome-wrapper">
                        <div class="welcome card">
                            <p><span class="strong">Welcome!!</span> We pride ourselfs on being the premier hotspot for vegan foodies in <span class="strong">Los Angeles</span>. We combine a carefully selected list of vegan Delicacies with superb Fine Dining expierence, all the while maintaining that homey atmosphere vegans look for.</p>
                        </div>
                    </div>`
        }
    } 
    return {renderPage}
})();
