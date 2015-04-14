function Point(x, y) {
    this.X = x;
    this.Y = y;
}

function simpleMoveRecognizer() {
    this.points = [];
    this.result = [
        [0, 0]
    ];
}
simpleMoveRecognizer.prototype.beginPoint = function(x, y) {
    this.points.push(new Point(x, y));
}
simpleMoveRecognizer.prototype.movePoint = function(x, y) {
    this.points.push(new Point(x, y));
    var len = this.points.length;
    var dx = this.points[len - 1].X - this.points[len - 2].X;
    var dy = this.points[len - 1].Y - this.points[len - 2].Y;
    this.result[0][0] = 0;
    this.result[0][1] = dy;
    return this.result;
}
simpleMoveRecognizer.prototype.endPoint = function() {
    if (this.points.length < 3) {
        return "error";
    }
    return this.result;
}
simpleMoveRecognizer.prototype.getPoints = function() {
    return this.points;
}