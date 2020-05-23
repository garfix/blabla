BlaBla.wargames = {
    // https://www.youtube.com/watch?v=KXzNo0vR_dU
    // https://github.com/sirjamesp/WarGamesFont
    createComponent: function (element, data) {

        return {
            setup: function() {
                element.style.backgroundColor = "#000020";
            },
            animations: [
                {
                    surface: null,
                    events: null,
                    eventIndex: 0,
                    currentSpan: null,

                    setup: function () {

                        let surface = document.createElement('div');
                        surface.style.padding = "10vw";
                        surface.style.fontFamily = "WOPR";
                        surface.style.fontSize = "24pt";
                        surface.style.textShadow = "0 0 15pt #ffffff, 0 0 15pt #ffffff, 0 0 15pt #ffffff";
                        surface.style.position = 'absolute';
                        surface.style.height = "100%";
                        surface.style.color = '#91d9ff';
                        element.appendChild(surface);

                        this.surface = surface;

                        this.events = this.calcEvents(data.fragments)
                    },
                    step: function (time) {

                        while (this.eventIndex < this.events.length - 1) {
                            let event = this.events[this.eventIndex];

                            if (event.time > time) break;

                            if (event.type === 'add span') {
                                let span = document.createElement('span');
                                span.style.marginBottom = "24pt";
                                this.currentSpan = span;
                                this.surface.appendChild(span);
                            } else if (event.type === 'text') {
                                this.currentSpan.textContent = event.contents
                            } else if (event.type === 'newline') {
                                let br = document.createElement('br');
                                this.surface.appendChild(br);
                            }

                            this.eventIndex++;
                        }
                    },
                    calcEvents: function (fragments) {

                        let events = [];
                        let time = 0;
                        let cursor = String.fromCodePoint(0x0002);

                        events.push({
                            time: time,
                            type: 'add span'
                        });
                        events.push({
                            time: time,
                            type: 'text',
                            contents: cursor
                        });

                        for (let i = 0; i < fragments.length; i++) {
                            let fragment = fragments[i];
                            time += fragment.delay;
                            for (let t = 0; t < fragment.text.length; t++) {
                                let letters = fragment.text.substr(0, t);
                                events.push({
                                    time: time,
                                    type: 'text',
                                    contents: letters + cursor
                                });
                                time += 500 / fragment.speed
                            }
                            events.push({
                                time: time,
                                type: 'text',
                                contents: fragment.text
                            });
                            events.push({
                                time: time,
                                type: 'newline'
                            });
                            events.push({
                                time: time,
                                type: 'newline'
                            });
                            if (i % 2 === 1) {
                                events.push({
                                    time: time,
                                    type: 'newline'
                                });
                            }
                            events.push({
                                time: time,
                                type: 'add span'
                            });
                            events.push({
                                time: time,
                                type: 'text',
                                contents: cursor
                            });
                        }

                        return events;
                    }
                }
            ]
        }
    }
};
