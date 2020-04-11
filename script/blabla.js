BlaBla = {

    processes: [],

    addProcess: function (component, element) {

        for (let a = 0; a < component.animations.length; a++) {
            component.animations[a].setup();
        }

        let process = {
            time: 0,
            component: component,
            element: element,
            state: "paused",
            start: function () {
                this.state = "running";
            },
            pause: function () {
                this.state = "paused";
            },
            continue: function () {
                this.state = "running";
            },
            toggleState: function () {
                if (this.state === "paused") {
                    this.state = "running";
                } else {
                    this.state = "paused";
                }
            }
        };

        this.processes.push(process);

        return process;
    },

    start: function () {
        this.step();
    },

    step: function () {

        for (let i = 0; i < this.processes.length; i++) {
            let process = this.processes[i];
            if (process.state === "paused") {
                continue;
            }
            let animations = process.component.animations;
            for (let a = 0; a < animations.length; a++) {
                animation = animations[a];
                animation.step(process.time);
            }
            process.time++;
        }

        window.requestAnimationFrame(() => { this.step(); });
    }
};
