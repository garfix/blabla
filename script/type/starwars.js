BlaBla.starwars = {
    // https://www.youtube.com/watch?v=yHfLyMAHrQE
    // http://www.theforce.net/fanfilms/postproduction/crawl/opening.asp
    // https://gist.github.com/christopherkade/97fd94f20c3a4ffddfa5aba46261082f
    // https://dev.to/christopherkade/developing-the-star-wars-opening-crawl-in-htmlcss-2j9e
    createComponent: function (element, data) {

        return {
            setup: function() {
                element.style.perspective = "200px";
                element.style.overflow = "hidden";
                element.style.backgroundColor = "#000";
            },
            animations: [
                {
                    text: null,

                    setup: function () {

                        let surface = BlaBla.base.createDiv();
                        surface.style.width = "470px";
                        surface.style.height = "430px";
                        surface.style.color = '#ffffff';
                        surface.style.marginLeft = 'auto';
                        surface.style.marginRight = 'auto';
                        surface.style.transform = 'rotateX(40deg)';
                        surface.style.overflow = "hidden";
                        element.appendChild(surface);

                        let text = BlaBla.base.createDiv();
                        text.style.position = "absolute";
                        text.style.top = "0";
                        text.style.color = "#c8a90b";
                        text.style.fontFamily = "FranklinGothicBook";
                        text.style.fontSize = "30pt";
                        text.style.fontWeight = "bold";
                        text.style.textAlign = "justify";
                        surface.appendChild(text);

                        let overlay = BlaBla.base.createDiv();
                        overlay.style.position = "absolute";
                        overlay.style.top = "0";
                        overlay.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 1.0), rgba(255, 0, 0, 0.0))";
                        overlay.style.width = "100%";
                        overlay.style.height = "100%";
                        surface.appendChild(overlay);

                        this.text = text;
                        text.innerHTML = data.text;
                    },
                    step: function (time) {
                        if (time < 1450) {
                            this.text.style.transform = "translateY(" + (400 - time) + "px)";
                        }
                    }
                }, {
                    setup: function () {

                        let text = BlaBla.base.createDiv();
                        text.style.position = "absolute";
                        text.style.top = "50%";
                        text.style.left = "50%";
                        text.style.transform = 'translate(-50%, -50%)';
                        text.style.width = "700px";
                        text.style.color = "#056eda";
                        text.style.fontFamily = "FranklinGothicBook";
                        text.style.filter = "blur(1.75px)";
                        text.style.fontSize = "36pt";
                        text.style.fontWeight = "600";
                        text.style.textAlign = "justify";
                        element.appendChild(text);

                        text.innerHTML = data.intro;
                    },
                    step: function (time) {

                    }
                }
            ]
        }
    }
};
