BlaBla.starwars = {
    // https://www.youtube.com/watch?v=yHfLyMAHrQE
    // http://www.theforce.net/fanfilms/postproduction/crawl/opening.asp
    // https://gist.github.com/christopherkade/97fd94f20c3a4ffddfa5aba46261082f
    // https://dev.to/christopherkade/developing-the-star-wars-opening-crawl-in-htmlcss-2j9e
    // https://www.dafontfree.io/star-jedi-font/
    createComponent: function (element, data) {

        const starCount = 100;
        const fadeDuration = 2000;
        const scaleDuration = 6000;

        const wpStartIntro = 0;
        const wpStartLogo = 10000;
        const wpStartText = wpStartLogo + 4000;
        const wpEndText = wpStartText + 65000;

        return {
            setup: function() {
                // distance of viewer to z-0 plane
                element.style.perspective = "600px";
                // position of horizon
                element.style.perspectiveOrigin = "top";
                element.style.overflow = "hidden";
                element.style.backgroundColor = "#000";

                // stars
                for (let i = 0; i < starCount; i++) {
                    let star = document.createElement('div');
                    star.style.position = "absolute";
                    star.style.backgroundColor = "#808080";
                    star.style.width = "1px";
                    star.style.height = "1px";
                    star.style.left = Math.floor(Math.random() * element.offsetWidth) + "px";
                    star.style.top = Math.floor(Math.random() * element.offsetHeight) + "px";
                    element.appendChild(star);
                }
            },
            animations: [
                {
                    text: null,

                    setup: function () {

                        let surface = document.createElement('div');
                        surface.style.position = 'absolute';
                        surface.style.width = "470px";
                        surface.style.height = "100%";
                        surface.style.color = '#ffffff';
                        surface.style.top = '60%';
                        surface.style.left = '50%';
                        surface.style.transform = 'translate(-50%, -50%) rotateX(90deg)';
                        surface.style.overflow = "hidden";
                        element.appendChild(surface);

                        let text = document.createElement('div');
                        text.style.position = "absolute";
                        text.style.top = "0";
                        text.style.color = "#c8a90b";
                        text.style.fontFamily = "FranklinGothicBook";
                        text.style.fontSize = "30pt";
                        text.style.fontWeight = "bold";
                        text.style.textAlign = "justify";
                        text.style.transform = "translateY(10000px)";
                        surface.appendChild(text);

                        let overlay = document.createElement('div');
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
                        if (time >= wpStartText && time <= wpEndText) {
                            let y = (time - wpStartText) / 40;
                            this.text.style.transform = "translateY(" + (600 - y) + "px)";
                        }
                    }
                },
                {
                    text: null,

                    setup: function () {

                        let text = document.createElement('div');
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
                        text.style.opacity = 0;
                        element.appendChild(text);

                        this.text = text;
                        text.innerHTML = data.intro;
                    },
                    step: function (time) {
                        if (time >= wpStartIntro && time <= wpStartIntro + fadeDuration) {
                            this.text.style.opacity = (time - wpStartIntro) / fadeDuration;
                        }
                        if (time >= wpStartLogo - fadeDuration && time <= wpStartLogo) {
                            this.text.style.opacity = (wpStartLogo - time) / fadeDuration;
                        }
                    }
                },
                {
                    text: null,

                    setup: function () {

                        let text = document.createElement('div');
                        text.style.position = "absolute";
                        text.style.top = "50%";
                        text.style.left = "50%";
                        text.style.transformOrigin = "center";
                        text.style.transform = 'translate(-50%, -50%) scale(0)';
                        text.style.color = "#c8a90b";
                        text.style.fontFamily = "StarJediHollow";
                        text.style.fontSize = "50vh";
                        text.style.textAlign = "center";
                        element.appendChild(text);

                        this.text = text;
                        text.innerHTML = data.title;
                    },
                    step: function (time) {
                        if (time >= wpStartLogo && time <= wpStartLogo + scaleDuration) {
                            let fraction = 1 - (time - wpStartLogo) / scaleDuration;
                            this.text.style.opacity = fraction;
                            this.text.style.transform = " translate(-50%, -50%) scale(" + fraction + ")";
                        }
                    }
                }
            ]
        }
    }
};
