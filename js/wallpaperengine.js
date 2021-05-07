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

var nonePreset = false;

window.wallpaperPropertyListener = {
    applyUserProperties: function(properties) {
        if (properties.showFPS) {
            showFPS = properties.showFPS.value;
        }
        if (properties.selectPreset) {
            switch (properties.selectPreset.value) {
                case 1:
                    nonePreset = true;
                    break;
                case 2:
                    nonePreset = false;
                    backgroundColor1 = "#7b00ff";
                    backgroundColor2 = "#1a237e";
                    particleColor = "#ffffff";
                    lineColor = "#ffffff";
                    particleQuantity = 100;
                    particleRadius = 3;
                    lineWidth = 2;
                    minVelocity = 0.5;
                    maxVelocity = 2;
                    changeCanvasColor();
                    window.cancelAnimationFrame(reqAnim);
                    start();
                    break;
                case 3:
                    nonePreset = false;
                    backgroundColor1 = "#ffffff";
                    backgroundColor2 = "#ffffff";
                    particleColor = "#1a1a1a";
                    lineColor = "#1a1a1a";
                    particleQuantity = 150;
                    particleRadius = 4;
                    lineWidth = 3;
                    minVelocity = 1;
                    maxVelocity = 2;
                    changeCanvasColor();
                    window.cancelAnimationFrame(reqAnim);
                    start();
                    break;
                case 4:
                    nonePreset = false;
                    backgroundColor1 = "#0f2437";
                    backgroundColor2 = "#0f2437";
                    particleColor = "#50b86b";
                    lineColor = "#50b86b";
                    particleQuantity = 100;
                    particleRadius = 0;
                    lineWidth = 5;
                    minVelocity = 0.5;
                    maxVelocity = 1;
                    changeCanvasColor();
                    window.cancelAnimationFrame(reqAnim);
                    start();
                    break;
                case 5:
                    nonePreset = false;
                    backgroundColor1 = "#161a1d";
                    backgroundColor2 = "#0b090a";
                    particleColor = "#e5383b";
                    lineColor = "#ffffff";
                    particleQuantity = 100;
                    particleRadius = 3;
                    lineWidth = 2;
                    minVelocity = 0.1;
                    maxVelocity = 0.5;
                    changeCanvasColor();
                    window.cancelAnimationFrame(reqAnim);
                    start();
                    break;
                case 6:
                    nonePreset = false;
                    backgroundColor1 = "#003566";
                    backgroundColor2 = "#001d3d";
                    particleColor = "#ffd60a";
                    lineColor = "#ffd60a";
                    particleQuantity = 120;
                    particleRadius = 3;
                    lineWidth = 2;
                    minVelocity = 4;
                    maxVelocity = 5;
                    changeCanvasColor();
                    window.cancelAnimationFrame(reqAnim);
                    start();
                    break;
            }
        }
        if (properties.backgroundColor1) {
            if (nonePreset) {
                let color = properties.backgroundColor1.value.split(" ");
                backgroundColor1 = weColorToHex(color[0], color[1], color[2]);
                changeCanvasColor();
            }
        }
        if (properties.backgroundColor2) {
            if (nonePreset) {
                let color = properties.backgroundColor2.value.split(" ");
                backgroundColor2 = weColorToHex(color[0], color[1], color[2]);
                changeCanvasColor();
            }
        }
        if (properties.particleColor) {
            if (nonePreset) {
                let color = properties.particleColor.value.split(" ");
                particleColor = weColorToHex(color[0], color[1], color[2]);
                window.cancelAnimationFrame(reqAnim);
                start();
            }
        }
        if (properties.lineColor) {
            if (nonePreset) {
                let color = properties.lineColor.value.split(" ");
                lineColor = weColorToHex(color[0], color[1], color[2]);
                window.cancelAnimationFrame(reqAnim);
                start();
            }
        }
        if (properties.particleQuantity) {
            if (nonePreset) {
                particleQuantity = properties.particleQuantity.value;
                window.cancelAnimationFrame(reqAnim);
                start();
            }
        }
        if (properties.particleRadius) {
            if (nonePreset) {
                particleRadius = properties.particleRadius.value;
                window.cancelAnimationFrame(reqAnim);
                start();
            }
        }
        if (properties.lineWidth) {
            if (nonePreset) {
                lineWidth = properties.lineWidth.value;
                window.cancelAnimationFrame(reqAnim);
                start();
            }
        }
        if (properties.particleMinVel) {
            if (nonePreset) {
                minVelocity = properties.particleMinVel.value * 0.1;
                if (maxVelocity < minVelocity) {
                    let x = minVelocity;
                    minVelocity = maxVelocity;
                    maxVelocity = x;
                }
                window.cancelAnimationFrame(reqAnim);
                start();
            }
        }
        if (properties.particleMaxVel) {
            if (nonePreset) {
                maxVelocity = properties.particleMaxVel.value * 0.1;
                if (maxVelocity < minVelocity) {
                    let x = minVelocity;
                    minVelocity = maxVelocity;
                    maxVelocity = x;
                }
                window.cancelAnimationFrame(reqAnim);
                start();
            }
        }
        if (properties.disapearOffset) {
            if (nonePreset) {
                disapearOffset = properties.disapearOffset.value;
                window.cancelAnimationFrame(reqAnim);
                start();
            }
        }
        if (properties.minDistOpacity) {
            if (nonePreset) {
                minDistOpacity = properties.minDistOpacity.value;
                window.cancelAnimationFrame(reqAnim);
                start();
            }
        }
        if (properties.maxDistOpacity) {
            if (nonePreset) {
                maxDistOpacity = properties.maxDistOpacity.value;
                window.cancelAnimationFrame(reqAnim);
                start();
            }
        }
    }
}