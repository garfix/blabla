BlaBla.time = {
    // Adaption from a scene of Sign O' The Times - Prince (1987)
    // https://www.youtube.com/watch?v=8EdxM72EZ94
    createComponent: function (element, data) {

        return {
            setup: function() {
                element.style.backgroundColor = "#343336";
            },
            animations: [
                {
                    largeText: null,
                    smallText: null,

                    setup: function () {

                        let smallText = document.createElement('div');
                        smallText.className = "small-text";
                        element.appendChild(smallText);

                        let largeText = document.createElement('div');
                        largeText.className = "large-text";
                        element.appendChild(largeText);

                        this.largeText = largeText;
                        largeText.innerHTML = data.largeText;
                        this.smallText = smallText;
                        smallText.innerHTML = data.smallText;
                    },
                    step: function (time) {

                        time = time % 9000;

                        let start = 0;
                        if (time >= start && time < start + 9000) {
                            this.largeText.style.transform = "translateX(" + (50 - (time-start) / 50) + "%)";
                            this.smallText.style.transform = "translateX(" + (50 - (time-start) / 50) + "%)";
                        }
                    }
                }
            ]
        }
    }
};
