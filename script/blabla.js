BlaBla = {

    processes: [],
    processIncrement: 0,

    addProcess: function (component, element) {

        this.processIncrement++;

        let process = {
            id: this.processIncrement,
            // time in milliseconds
            time: 0,
            component: component,
            element: element,
            state: "paused",
            setTime: function(time) {
                this.time = time;
            },
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

        component.setup();

        for (let a = 0; a < component.animations.length; a++) {
            component.animations[a].setup();
        }

        this.processes.push(process);

        return process;
    },

    removeProcess: function(processId) {

        let newProcesses = [];

        for (let i = 0; i < this.processes.length; i++) {
            let process = this.processes[i];
            if (process.id !== processId) {
                newProcesses.push(process);
            } else {
                process.element.innerHTML = "";
            }
        }

        this.processes = newProcesses;
    },

    start: function () {

        let prevTime = 0;

        let step = (time) => {

            time = time || prevTime;

            let timeDiff = time - prevTime;

            prevTime = time;

            for (let i = 0; i < this.processes.length; i++) {
                let process = this.processes[i];
                if (process.state === "paused") {
                    continue;
                }

                process.time += timeDiff;

                let animations = process.component.animations;
                for (let a = 0; a < animations.length; a++) {
                    let animation = animations[a];
                    animation.step(process.time);
                }
            }

            window.requestAnimationFrame(step);
        };

        step();
    }
};
