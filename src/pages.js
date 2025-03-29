import menu from "./menu.json";
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
                const decorators = `
                <img class="decorator top left" src="https://img.icons8.com/color/48/gailan.png" alt="gailan"/>
                <img class="decorator top right" src="https://img.icons8.com/color/48/gailan.png" alt="gailan"/>
                <img class="decorator bottom left" src="https://img.icons8.com/color/48/gailan.png" alt="gailan"/>
                <img class="decorator bottom right" src="https://img.icons8.com/color/48/gailan.png" alt="gailan"/>
            `;
                    let html = `<button class="previous">&lt;</button>
                                <button class="next">&gt;</button>`;

                    for (let [type, list] of Object.entries(menu)){
                        html += `<div class="card menu ${type}">
                                    ${decorators}
                                    <h2> ${type} </h2>
                                    <ul>`;

                        list.sort((a,b) =>  b.price-a.price)
                        for (let item of list) {
                            html += `<li>
                                        <span class="name">${item.name}</span>
                                        <span class="sep">${".".repeat(500)}</span>
                                        <span class="price">${item.price}</span>
                                    </li>`;
                        }
                        html +="</ul></div>";
                    }

                return html;

            case "about":
                return `<div class="about card">
                            <div>
                                <div class="name"><span>Name: &emsp;&emsp;&emsp;&emsp;&emsp;</span><span>Banon</span>
                                </div>
                                <div class="email"><span>Email: &emsp;&emsp;&emsp;&emsp;&emsp;</span> <a href="#">banon@fakemail.com</a></div>
                                <span class="tel"><span>Phone Number: &emsp;</span><span>+999 (999) 34355</span></span>
                            </div>
                            <div>
                                <p>
                                    This site was developed per <b>The Odin Project</b>'s <em>Restaurant Page</em> 
                                    project specification for practicing "<b>ES6</b>" module <code>import and <code>export</code> syntax, as well as beginner
                                    level <b>webpack</b> bundler configuration. If you were patient enough to read this, you have the makings of a good coder.
                                </p>
                        
                            </div>`
                        
        }
    }
    return {createPages}
})();
