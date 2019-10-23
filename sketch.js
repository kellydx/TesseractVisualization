function setup() {
    let size = min(windowWidth, windowHeight);
    createCanvas(size, size, WEBGL);
    //create all 16 vertices of a tesseract
    points[0] = new P4Vector(-1, -1, -1, 1);
    points[1] = new P4Vector(1, -1, -1, 1);
    points[2] = new P4Vector(1, 1, -1, 1);
    points[3] = new P4Vector(-1, 1, -1, 1);
    points[4] = new P4Vector(-1, -1, 1, 1);
    points[5] = new P4Vector(1, -1, 1, 1);
    points[6] = new P4Vector(1, 1, 1, 1);
    points[7] = new P4Vector(-1, 1, 1, 1);
    points[8] = new P4Vector(-1, -1, -1, -1);
    points[9] = new P4Vector(1, -1, -1, -1);
    points[10] = new P4Vector(1, 1, -1, -1);
    points[11] = new P4Vector(-1, 1, -1, -1);
    points[12] = new P4Vector(-1, -1, 1, -1);
    points[13] = new P4Vector(1, -1, 1, -1);
    points[14] = new P4Vector(1, 1, 1, -1);
    points[15] = new P4Vector(-1, 1, 1, -1);
}

function draw() {
    background(0);
    //array of projected points
    let projected3d = [];
    // Connecting vertices to form edges of the inner cube
    for (let i = 0; i < 4; i++) {
        connect(0, i, (i + 1) % 4, projected3d);
        connect(0, i + 4, ((i + 1) % 4) + 4, projected3d);
        connect(0, i, i + 4, projected3d);
    }

    // Connecting vertices to form edges of the outer cube
    for (let i = 0; i < 4; i++) {
        connect(8, i, (i + 1) % 4, projected3d);
        connect(8, i + 4, ((i + 1) % 4) + 4, projected3d);
        connect(8, i, i + 4, projected3d);
    }

    // Drawing the edges connecting the inner and outer cubes
    for (let i = 0; i < 8; i++) {
        connect(0, i, i + 8, projected3d);
    }
}

//This function draws a line connecting 2 vertices
function connect(offset, i, j, points) {
    strokeWeight(4);
    stroke(255);
    const a = points[i + offset];
    const b = points[j + offset];
    line(a.x, a.y, a.z, b.x, b.y, b.z);
}