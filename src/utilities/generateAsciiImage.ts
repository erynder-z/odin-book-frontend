class Cell {
    public x: number;
    public y: number;
    public symbol: string;
    public color: string;

    constructor(x: number, y: number, symbol: string, color: string) {
        this.x = x;
        this.y = y;
        this.symbol = symbol;
        this.color = color;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'blue';
        ctx.fillText(this.symbol, this.x + 0.1, this.y + 0.1);
        ctx.fillStyle = this.color;
        ctx.fillText(this.symbol, this.x, this.y);
    }
}

class AsciiEffect {
    #imageCellArray: Cell[] = [];
    #pixels: ImageData;
    #ctx: CanvasRenderingContext2D;
    #width: number;
    #height: number;

    constructor(
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number,
        image: HTMLImageElement
    ) {
        this.#ctx = ctx;
        this.#width = width;
        this.#height = height;
        this.#ctx.drawImage(image, 0, 0, this.#width, this.#height);
        this.#pixels = this.#ctx.getImageData(0, 0, this.#width, this.#height);
    }

    #convertToSymbol(g: number): string {
        if (g > 250) return '@';
        else if (g > 240) return '*';
        else if (g > 220) return '+';
        else if (g > 200) return '#';
        else if (g > 180) return '&';
        else if (g > 160) return '%';
        else if (g > 140) return '!';
        else if (g > 120) return ':';
        else if (g > 100) return '%';
        else if (g > 80) return '/';
        else if (g > 60) return '-';
        else if (g > 40) return 'X';
        else if (g > 20) return 'Y';
        else return '';
    }

    #scanImage(cellSize: number) {
        this.#imageCellArray = [];
        for (let y = 0; y < this.#pixels.height; y += cellSize) {
            for (let x = 0; x < this.#pixels.width; x += cellSize) {
                const posX = x * 4;
                const posY = y * 4;
                const pos = posY * this.#pixels.width + posX;

                if (this.#pixels.data[pos + 3] > 128) {
                    const red = this.#pixels.data[pos];
                    const green = this.#pixels.data[pos + 1];
                    const blue = this.#pixels.data[pos + 2];
                    const total = red + green + blue;
                    const averageColorValue = total / 3;
                    const color = `rgb(${red},${green},${blue})`;
                    const symbol = this.#convertToSymbol(averageColorValue);

                    if (total > 50) {
                        this.#imageCellArray.push(
                            new Cell(x, y, symbol, color)
                        );
                    }
                }
            }
        }
    }
    #drawAscii() {
        this.#ctx.clearRect(0, 0, this.#width, this.#height);
        for (let i = 0; i < this.#imageCellArray.length; i++) {
            this.#imageCellArray[i].draw(this.#ctx);
        }
    }
    draw(cellSize: number) {
        this.#scanImage(cellSize);
        this.#drawAscii();
    }
}

export function generateAsciiImage(
    baseImage: string,
    canvasId: string,
    cellSize: number
) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d', {
        willReadFrequently: true,
    }) as CanvasRenderingContext2D;

    const image1 = new Image();
    image1.src = baseImage;
    image1.onload = function initialize() {
        canvas.width = image1.width;
        canvas.height = image1.height;
        const effect = new AsciiEffect(
            ctx,
            image1.width,
            image1.height,
            image1
        );
        ctx.font = cellSize * 1.25 + 'px monospace';
        effect.draw(cellSize);
    };
}
