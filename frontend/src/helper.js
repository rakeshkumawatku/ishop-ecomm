function generateRandomGradient() {
    const gradientBox = document.getElementById('gradient-box');
    const colors = [];
    for (let i = 0; i < 2; i++) {
        // Generate random RGB color values
        const red = Math.floor(Math.random() * 180);
        const green = Math.floor(Math.random() * 180);
        const blue = Math.floor(Math.random() * 180);
        colors.push(`rgb(${red},${green},${blue})`);
    }
    // Apply linear gradient to the background
    const background = `linear-gradient(to right , ${colors[0]}, ${colors[1]})`;
    return background
}

export { generateRandomGradient }; 