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
    rotateX(-PI / 2);
    //array of projected points
    let projected3d = [];

    for (let i = 0; i < points.length; i++) {
        const v = points[i];
        //XY rotation matrix
        const rotationXY = [
            [cos(angle), -sin(angle), 0, 0],    //x
            [sin(angle), cos(angle), 0, 0],     //y
            [0, 0, 1, 0],                       //z
            [0, 0, 0, 1],                       //w
        ];
        // ZW rotationMatrix
        const rotationZW = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, cos(angle), -sin(angle)],
            [0, 0, sin(angle), cos(angle)]
        ];
        //rotated arount each vertex
        let rotated = matmul(rotationXY, v);
        rotated = matmul(rotationZW, rotated);

        let distance = 2;
        let w = 1 / (distance - rotated.w);

        // create projection matrix with 3 rows and 4 columns
        const projection = [
            [w, 0, 0, 0],
            [0, w, 0, 0],
            [0, 0, w, 0],
        ];

        //the projected point
        let projected = matmul(projection, rotated);
        projected.mult(width / 8);
        projected3d[i] = projected;

        stroke(255, 200);
        strokeWeight(32);
        noFill();

        point(projected.x, projected.y, projected.z);
    }

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
    angle += 0.02;
}

//This function draws a line connecting 2 vertices
function connect(offset, i, j, points) {
    strokeWeight(4);
    stroke(255);
    const a = points[i + offset];
    const b = points[j + offset];
    line(a.x, a.y, a.z, b.x, b.y, b.z);
}