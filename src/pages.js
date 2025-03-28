
export default (function (){

    // create cach object
    const pages = [];

    function createPages(){
        for(let page of ["home", "menu", "about"]) {
            const pageDiv = document.createElement("div");
            pageDiv.id = page;
            pageDiv.classList.add("content");
            pageDiv.innerHTML = createContent(page);
            pages.push(pageDiv);
        }
        return pages;
    } 
    function createContent(page) {
        switch(page){
            case "home":
                return `
                    <div class="welcome-wrapper">
                        <div class="welcome card">
                            <p><span class="strong">Welcome!!</span> We pride ourselfs on being the premier hotspot for vegan foodies in <span class="strong">Los Angeles</span>. We combine a carefully selected list of vegan Delicacies with superb Fine Dining expierence, all the while maintaining that homey atmosphere vegans look for.</p>
                        </div>
                    </div>
                    <div class="image-container">
                        <button class="previous">previous</button>
                        <button class="next">next</button>
                        <div class="image-wrapper"><div>
                    </div>`;
            case "menu":
                return <div class="menu-container">
                        <div class="food">
                            
                        </div>
                        <div class="drink">next</div>
                        </div>
            case "about":
                return `           <div class="welcome-wrapper">
                        <div class="welcome card">
                            <p><span class="strong">Welcome!!</span> We pride ourselfs on being the premier hotspot for vegan foodies in <span class="strong">Los Angeles</span>. We combine a carefully selected list of vegan Delicacies with superb Fine Dining expierence, all the while maintaining that homey atmosphere vegans look for.</p>
                        </div>
                    </div>`
        }
    }
    return {createPages}
})();
