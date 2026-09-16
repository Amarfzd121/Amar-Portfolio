const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

const frameCount = 240;
const currentFrame = index => (
    `./frames/frame_${index.toString().padStart(4, '0')}.jpg`
);

const preloadImages = () => {
    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
    }
};

const img = new Image();
img.src = currentFrame(1);
canvas.width = 1920;
canvas.height = 1080;

img.onload = function() {
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
}

const updateImage = index => {
    img.src = currentFrame(index);
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
}

window.addEventListener('scroll', () => {  
    const scrollTop = document.documentElement.scrollTop;
    const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
    
    // To prevent division by zero or negative values
    if (maxScrollTop <= 0) return;

    const scrollFraction = scrollTop / maxScrollTop;
    const frameIndex = Math.min(
        frameCount - 1,
        Math.ceil(scrollFraction * frameCount)
    );
    
    requestAnimationFrame(() => updateImage(frameIndex + 1));
});

// Update canvas size on resize to maintain aspect ratio
window.addEventListener('resize', () => {
    // Keep the drawing buffer same, CSS object-fit: cover will handle scaling
});

preloadImages();

fetch("submit.php", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
})
