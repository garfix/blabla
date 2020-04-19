BlaBla.patkat = {
    // https://en.wikipedia.org/wiki/Matrix_digital_rain
    // https://www.youtube.com/watch?v=E8y3eDUMb4Q
    // https://www.dafont.com/matrix-code-nfi.font
    createComponent: function (element) {

        const tileSizeX = 18;
        const tileSizeY = 24;
        const chars = "abcdefghijklmnopqrstuvwxyz0123456789$+-*/=%\"'#&_(),.;:?!";

        const pat = [
            "*********           ***            ***          ***     ",
            "***   ****          ***            ***          ***     ",
            "***    ***          ***                         ***     ",
            "***   ****  ******  ****** ******* ***  ******* ***  ***",
            "*********      **** ***    *****   *** *****    *** ****",
            "***        ******** ***    ***     *** ***      ******* ",
            "***        ***  *** *****  ***     *** *****    *** ****",
            "***        ********  ***** ***     ***  ******* ***  ***",
        ];

        const heart = [
            "    ****   ****  ",
            "  ******* *******",
            "  ***************",
            "  ***************",
            "    ***********  ",
            "      *******    ",
            "        ***      ",
            "         *       ",
        ];

        const kat = [
            "***    ***             ***      ***          ",
            "***   ***              ***      ***          ",
            "***  ***               ***                   ",
            "*******       ******   ******  ****   ****** ",
            "********         ****  ***      ***      ****",
            "***  ****    ********  ***      ***  ********",
            "***   ****   ***  ***  *****    ***  ***  ***",
            "***    ****  ********   *****   ***  ********",
            "                               ***           ",
            "                             ****            ",
            "                           ****              ",
        ];

        return {

            setup: function() {
                element.style.backgroundColor = "#000";

            },
            animations: [
                {
                    matrix: [],
                    columns: [],

                    setup: function () {
                        element.style.fontFamily = "Matrix";
                        element.style.fontSize = "24px";
                        element.style.fontWeight = "bold";
                    },
                    step: function (time) {

                        let width = element.offsetWidth;
                        let height = element.offsetHeight;

                        let tilesX = Math.ceil(width / tileSizeX);
                        let tilesY = Math.ceil(height / tileSizeY);

                        let wrapY = 3 * tilesY;

                        for (let x = 0; x < tilesX; x++) {

                            if (!this.matrix[x]) {
                                this.matrix[x] = [];
                                this.columns[x] = {
                                    // y position of leading character in the column
                                    leaderPosition: Math.floor(Math.random() * wrapY),
                                    // add this amount each time
                                    leaderSpeed: 5 + Math.random() * 3,
                                    // variable counting up
                                    leaderCursor: 0,
                                };
                            }
                            let column = this.columns[x];
                            column.leaderCursor += column.leaderSpeed;
                            if (column.leaderCursor > 10) {
                                column.leaderCursor -= 10;
                                column.leaderPosition++;
                                if (column.leaderPosition >= wrapY) {
                                    column.leaderPosition -= wrapY;
                                }
                            }

                            for (let y = 0; y < tilesY; y++) {

                                if (!this.matrix[x][y]) {

                                    let charIndex = Math.round(Math.random() * (chars.length - 1));

                                    let tile = document.createElement('div');
                                    tile.style.position = 'absolute';
                                    tile.style.width = tileSizeX + 'px';
                                    tile.style.height = tileSizeY + 'px';
                                    tile.style.left = (x * tileSizeX) + 'px';
                                    tile.style.top = (y * tileSizeY) + 'px';
                                    tile.style.color = '#000';
                                    tile.textContent = chars[charIndex];
                                    element.appendChild(tile);

                                    let newCell = {
                                        hue: 296,
                                        // current index into `chars`
                                        charIndex: charIndex,
                                        // constant duration until changing into the next character
                                        charRotationDuration: 1 + Math.floor(Math.random() * 100),
                                        // variable counting up
                                        charRotationCursor: 0,
                                        // how long the cell stays in its current lightness
                                        lightnessDuration: 1 + Math.floor(Math.random() * 3),
                                        // variable counting up
                                        lightnessCursor: 0,
                                        // current lightness in [0..100]
                                        lightness: 0,

                                    };

                                    let left = Math.floor((tilesX - pat[0].length) / 2);
                                    let top = 5;
                                    if (pat[y-top] && pat[y-top][x-left] && pat[y-top][x-left] === "*") {
                                        newCell.hue = 44;
                                        newCell.lightnessDuration = 7 + Math.floor(Math.random() * 5)
                                    }
                                    left = Math.floor((tilesX - heart[0].length) / 2);
                                    top = 16;
                                    if (heart[y-top] && heart[y-top][x-left] && heart[y-top][x-left] === "*") {
                                        newCell.hue = 0;
                                        newCell.lightnessDuration = 12 + Math.floor(Math.random() * 2)
                                    }
                                    left = Math.floor((tilesX - kat[0].length) / 2);
                                    top = 26;
                                    if (kat[y-top] && kat[y-top][x-left] && kat[y-top][x-left] === "*") {
                                        newCell.hue = 140;
                                        newCell.lightnessDuration = 7 + Math.floor(Math.random() * 5)
                                    }

                                    this.matrix[x][y] = newCell;

                                    newCell.tile = tile;
                                }
                                let cell = this.matrix[x][y];
                                cell.charRotationCursor++;
                                if (cell.charRotationCursor === cell.charRotationDuration) {
                                    cell.charIndex = Math.round(Math.random() * (chars.length - 1));
                                    cell.charRotationCursor = 0;
                                }
                                if (y === column.leaderPosition) {
                                    cell.lightness = 100;
                                    cell.lightnessCursor = 0;
                                }
                                if (cell.lightness > 0) {
                                    cell.lightnessCursor++;
                                    if (cell.lightnessCursor === cell.lightnessDuration) {
                                        if (cell.lightness > 60) {
                                            cell.lightness -= 10;
                                        } else {
                                            cell.lightness -= 2;
                                        }
                                        cell.lightnessCursor = 0;
                                    }
                                }
                                let tile = cell.tile;
                                if (cell.lightness > 0) {
                                    tile.textContent = chars[cell.charIndex];
                                } else {
                                    tile.textContent = '';
                                }
                                tile.style.color = "hsl(" + cell.hue + " 100% " + cell.lightness + "%)";
                            }
                        }
                    }
                }
            ]
        }
    }
};
