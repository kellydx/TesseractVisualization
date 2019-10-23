//create a vector object that takes 4 parameters as 4 respective dimensions
class P4Vector {
    constructor(x, y, z, w) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.w = w || 0;
    }
//matrix multiplication
    mult(f) {
        this.x *= f;
        this.y *= f;
        this.z *= f;
        this.w *= f;
    }
}
