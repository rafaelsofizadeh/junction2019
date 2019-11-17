function Segment(start, end) {
    this.start = start;
    this.end = end;
    this.contains = 0;
    this.contained = [];
}

Segment.prototype.generateRandomPoint = function () {
    const m = (this.end.y - this.start.y) / (this.end.x - this.start.x);
    const random = Math.random();

    let x, y;
    if (this.start.x === this.end.x) {
        x = this.start.x;
        y = (this.end.y - this.start.y) * random + this.start.y;
    } else {
        x = (this.end.x - this.start.x) * random + this.start.x;
        y = m * (x - this.start.x) + this.start.y;
    }

    const point = { x, y };

    this.contains++;
    this.contained.push(point);

    return point;
};

function Line(geometry) {
    if (geometry.length) {
        if (geometry[0] instanceof Segment) {
            this.geometry = geometry;
        } else {
            const segments = [];
            for (let i = 0; i < geometry.length - 1; i++) {
                const segment = new Segment(geometry[i], geometry[i + 1]);
                segments.push(segment);
            }

            this.geometry = segments;
        }
    }

    this.enter = [];
    this.leave = [];
}

Line.prototype.generateRandomPoint = function () { return this.geometry[Math.floor(Math.random(this.geometry.length))].generateRandomPoint() };
Line.prototype.contains = function () { return this.geometry.reduce((contains, segment) => contains + segment.contains, 0) };