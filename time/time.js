BlaBla.time = {
    // Adaption from a scene of Sign O' The Times - Prince (1987)
    // https://www.youtube.com/watch?v=8EdxM72EZ94
    createComponent: function (element, data) {

        const firstStart = 0;
        const firstDuration = 13000;
        const secondStart = 9000;
        const secondDuration = 9000;
        const timeRange = 18000;
        const barPeriod = 2000;
        const barPulse = 1000;

        return {
            setup: function() {
                element.style.backgroundColor = "#343336";
            },
            animations: [
                {
                    surfaces: [],
                    largeTexts: [],
                    smallTexts: [],
                    barLeft: null,
                    barRight: null,
                    barTop: null,
                    barBottom: null,

                    setup: function () {

                        let shadowClass;

                        for (let i = 0; i < 2; i++) {

                            let surface = document.createElement('div');
                            surface.className = "surface";
                            surface.style.transformOrigin = "center";
                            element.appendChild(surface);
                            this.surfaces[i] = surface;

                            let smallText = document.createElement('div');
                            shadowClass = (i === 0) ? 'small-shadow-top' : 'small-shadow-left';
                            smallText.className = "small-text " + shadowClass;
                            smallText.innerHTML = data.smallText;
                            surface.appendChild(smallText);
                            this.smallTexts[i] = smallText;

                            let largeText = document.createElement('div');
                            shadowClass = (i === 0) ? 'large-shadow-top' : 'large-shadow-left';
                            largeText.className = "large-text " + shadowClass;
                            largeText.innerHTML = data.largeText;
                            surface.appendChild(largeText);
                            this.largeTexts[i] = largeText;
                        }

                        this.surfaces[1].style.transform = "rotateZ(-30deg)";

                        let barLeft = document.createElement('div');
                        this.barLeft = barLeft;
                        barLeft.style.position = "absolute";
                        barLeft.style.left = 0;
                        barLeft.style.width = "10vw";
                        barLeft.style.top = 0;
                        barLeft.style.bottom = 0;
                        element.appendChild(barLeft);

                        let barRight = document.createElement('div');
                        this.barRight = barRight;
                        barRight.style.position = "absolute";
                        barRight.style.right = 0;
                        barRight.style.width = "10vw";
                        barRight.style.top = 0;
                        barRight.style.bottom = 0;
                        element.appendChild(barRight);

                        let barTop = document.createElement('div');
                        this.barTop = barTop;
                        barTop.style.position = "absolute";
                        barTop.style.top = 0;
                        barTop.style.height = "10vh";
                        barTop.style.left = 0;
                        barTop.style.right = 0;
                        element.appendChild(barTop);

                        let barBottom = document.createElement('div');
                        this.barBottom = barBottom;
                        barBottom.style.position = "absolute";
                        barBottom.style.bottom = 0;
                        barBottom.style.height = "10vh";
                        barBottom.style.left = 0;
                        barBottom.style.right = 0;
                        element.appendChild(barBottom);
                    },
                    step: function (time) {

                        time = time % timeRange;

                        if (time >= firstStart && time < firstStart + firstDuration) {
                            this.largeTexts[0].style.transform = "translateX(" + (100 - (time-firstStart) / 50) + "vw)";
                            this.smallTexts[0].style.transform = "translateX(" + (100 - (time-firstStart) / 75) + "vw)";
                        } else {
                            this.largeTexts[0].style.transform = "translateX(200vw)";
                            this.smallTexts[0].style.transform = "translateX(200vw)";
                        }

                        if (time >= secondStart && time < secondStart + secondDuration) {
                            this.largeTexts[1].style.transform =
                                "translateX(" + (75 - (time-secondStart) / 50) + "vw) translateY(" + (-100 + (time-secondStart) / 75) + "vh)";
                            this.smallTexts[1].style.transform =
                                "translateX(" + (85 - (time-secondStart) / 75) + "vw) translateY(" + (-100 + (time-secondStart) / 50) + "vh)";
                        } else {
                            this.largeTexts[1].style.transform = "translateX(200vw)";
                            this.smallTexts[1].style.transform = "translateX(200vw)";
                        }

                        let barTime = time % barPeriod;
                        let bgColor = "black";
                        let opacity = 1;
                        if (barTime < barPulse) {
                            let red = 255 - (barTime / barPulse) * 255;
                            bgColor = "rgb(" + red + ", 0, 0)"
                        }
                        if (time >= firstStart && time < firstStart + barPulse) {
                            opacity = 1 - ((firstStart + barPulse - time) / barPulse);
                        }
                        if (time >= secondStart - barPulse && time < secondStart) {
                            opacity = ((secondStart - time) / barPulse);
                        }

                        if (time >= secondStart && time < secondStart + barPulse) {
                            opacity = 1 - ((secondStart + barPulse - time) / barPulse);
                        }
                        if (time >= timeRange - barPulse && time < timeRange) {
                            opacity = ((timeRange - time) / barPulse);
                        }

                        if (time < secondStart) {
                            this.barTop.style.backgroundColor = bgColor;
                            this.barBottom.style.backgroundColor = bgColor;
                            this.barTop.style.opacity = opacity;
                            this.barBottom.style.opacity = opacity;
                            this.barTop.style.visibility = "visible";
                            this.barBottom.style.visibility = "visible";
                            this.barLeft.style.visibility = "hidden";
                            this.barRight.style.visibility = "hidden";
                        } else {
                            this.barLeft.style.backgroundColor = bgColor;
                            this.barRight.style.backgroundColor = bgColor;
                            this.barLeft.style.opacity = opacity;
                            this.barRight.style.opacity = opacity;
                            this.barTop.style.visibility = "hidden";
                            this.barBottom.style.visibility = "hidden";
                            this.barLeft.style.visibility = "visible";
                            this.barRight.style.visibility = "visible";
                        }
                    }
                }
            ]
        }
    }
};
