export function loadImages() {
    const imagesContext = require.context('./imgs/carousel_imgs', false, /\.webp$/);
   
    const images = [];
    imagesContext.keys().forEach(key => {
        const img = document.createElement('img');
        img.src = imagesContext(key);
        img.alt = key.match(/^\.\/(.+)\.webp$/i).at(-1).replace(/\-/g, " ") + " Image";
        images.push(img);
    });
    return images;
}