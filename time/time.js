BlaBla.time = {
    // Adaption from a scene of Sign O' The Times - Prince (1987)
    // https://www.youtube.com/watch?v=8EdxM72EZ94
    createComponent: function (element, data) {

        const firstStart = 0;
        const firstDuration = 13000;
        const secondStart = 9000;
        const secondDuration = 9000;
        const timeRange = 18000;

        return {
            setup: function() {
                element.style.backgroundColor = "#343336";
            },
            animations: [
                {
                    surfaces: [],
                    largeTexts: [],
                    smallTexts: [],

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
                        this.largeTexts[1].style.transform = "translateX(200vw)";
                        this.smallTexts[1].style.transform = "translateX(200vw)";
                    },
                    step: function (time) {

                        time = time % timeRange;

                        if (time >= firstStart && time < firstStart + firstDuration) {
                            this.largeTexts[0].style.transform = "translateX(" + (100 - (time-firstStart) / 50) + "vw)";
                            this.smallTexts[0].style.transform = "translateX(" + (100 - (time-firstStart) / 75) + "vw)";
                        }

                        if (time >= secondStart && time < secondStart + secondDuration) {
                            this.largeTexts[1].style.transform =
                                "translateX(" + (75 - (time-secondStart) / 50) + "vw) translateY(" + (-100 + (time-secondStart) / 75) + "vh)";
                            this.smallTexts[1].style.transform =
                                "translateX(" + (85 - (time-secondStart) / 75) + "vw) translateY(" + (-100 + (time-secondStart) / 50) + "vh)";
                        }
                    }
                }
            ]
        }
    }
};
