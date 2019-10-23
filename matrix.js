function vecToMatrix(v) {
    let m = [];
    for (let i = 0; i < 3; i++) {
        m[i] = [];
    }
    m[0][0] = v.x;
    m[1][0] = v.y;
    m[2][0] = v.z;
    return m;
}
//adding the forth dimension to draw a 4d matrix
function vec4ToMatrix(v) {
    let m = vecToMatrix(v);
    m[3] = [];
    m[3][0] = v.w;
    return m;
}

function matrixToVec(m) {
    return createVector(m[0][0], m[1][0], m[2][0]);
}

function matrixToVec4(m) {
    let r = new P4Vector(m[0][0], m[1][0], m[2][0], 0);
    if (m.length > 3) {
        r.w = m[3][0];
    }
    return r;
}