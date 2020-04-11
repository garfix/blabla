BlaBla.starwars = {
    // https://www.youtube.com/watch?v=yHfLyMAHrQE
    // http://www.theforce.net/fanfilms/postproduction/crawl/opening.asp
    createComponent: function (element, data) {

        return {
            animations: [
                {
                    text: null,

                    setup: function () {
                        element.style.perspective = "200px";
                        element.style.overflow = "hidden";
                        element.style.backgroundColor = "#000";

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
                        text.style.transform = "translateY(" + this.pos + "px)";
                        text.style.width = "100%";
                        text.style.color = "#c8a90b";
                        text.style.fontFamily = "FranklinGothicBook";
                        text.style.fontSize = "30pt";
                        text.style.fontWeight = "bold";
                        text.style.textAlign = "justify";
                        surface.appendChild(text);

                        let overlay = BlaBla.base.createDiv();
                        overlay.style.top = "0";
                        overlay.style.position = "absolute";
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

                    },
                    step: function (time) {

                    }
                }
            ]
        }
    }
};
