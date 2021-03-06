function Point(x, y) {
    this.X = x;
    this.Y = y;
}

function SimpleRecognizer() {
    this.points = [];
    this.result = "";
}
SimpleRecognizer.prototype.beginPoint = function(x, y) {
    this.points = [];
    this.result = "";
    this.points.push(new Point(x, y));
}
SimpleRecognizer.prototype.movePoint = function(x, y) {
    this.points.push(new Point(x, y));
    if (this.result == "not support") {
        return;
    }
    var newRtn = "";
    var len = this.points.length;
    var dx = this.points[len - 1].X - this.points[len - 2].X;
    var dy = this.points[len - 1].Y - this.points[len - 2].Y;
    if (dx > 0) {
        newRtn = "right";
    } else {
        newRtn = "left";
    }
    if (this.result == "") {
        this.result = newRtn;
        return;
    }
    if (this.result != newRtn) {
        this.result = "not support";
    }
}
SimpleRecognizer.prototype.endPoint = function() {
    if (this.points.length < 3) {
        return "error";
    }
    return this.result;
}
SimpleRecognizer.prototype.getPoints = function() {
    return this.points;
}