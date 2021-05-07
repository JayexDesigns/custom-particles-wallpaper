const weColorToHex = (r, g, b) => {
    let hex;
    r = Math.floor(r * 255).toString(16);
    g = Math.floor(g * 255).toString(16);
    b = Math.floor(b * 255).toString(16);
    if (r.length <= 1) {
        r = `0${r}`;
    }
    if (g.length <= 1) {
        g = `0${g}`;
    }
    if (b.length <= 1) {
        b = `0${b}`;
    }
    hex = `#${r}${g}${b}`;
    return hex;
}

window.wallpaperPropertyListener = {
    applyUserProperties: function(properties) {
        if (properties.showFPS) {
            showFPS = properties.showFPS.value;
        }
        if (properties.selectPreset) {
            switch (properties.selectPreset) {
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    break;
                case 4:
                    break;
                case 5:
                    break;
                case 6:
                    break;
            }
        }
        if (properties.backgroundColor1) {
            let color = properties.backgroundColor1.value.split(" ");
            backgroundColor1 = weColorToHex(color[0], color[1], color[2]);
            changeCanvasColor();
        }
        if (properties.backgroundColor2) {
            let color = properties.backgroundColor2.value.split(" ");
            backgroundColor2 = weColorToHex(color[0], color[1], color[2]);
            changeCanvasColor();
        }
        if (properties.particlesColor) {
            let color = properties.particlesColor.value.split(" ");
            particleColor = weColorToHex(color[0], color[1], color[2]);
            window.cancelAnimationFrame(reqAnim);
            start();
        }
        if (properties.linesColor) {
            let color = properties.linesColor.value.split(" ");
            linesColor = weColorToHex(color[0], color[1], color[2]);
            window.cancelAnimationFrame(reqAnim);
            start();
        }
        if (properties.particleQuantity) {
            particleQuantity = properties.particleQuantity.value;
            window.cancelAnimationFrame(reqAnim);
            start();
        }
        if (properties.particleRadius) {
            particleRadius = properties.particleRadius.value;
            window.cancelAnimationFrame(reqAnim);
            start();
        }
        if (properties.lineWidth) {
            lineWidth = properties.lineWidth.value;
            window.cancelAnimationFrame(reqAnim);
            start();
        }
        if (properties.particleMinVel) {
            minVelocity = properties.particleMinVel.value * 0.1;
            window.cancelAnimationFrame(reqAnim);
            start();
        }
        if (properties.particleMaxVel) {
            maxVelocity = properties.particleMaxVel.value * 0.1;
            window.cancelAnimationFrame(reqAnim);
            start();
        }
    }
}