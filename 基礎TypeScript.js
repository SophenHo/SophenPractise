"use strict";
//Map泛型函數
function map(arr, func) {
    return arr.map(func);
}
console.log(map([1, 3, 2], (a) => {
    return a + 1;
}));
console.log(map(['1', '3', '2'], (a) => {
    return 'pre' + a;
}));
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Vec2 class (有x、y 及方法 len) 
// Vec3 calss (有 x、y、z及方法len) 
// Vec3繼承Vec2
class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    len() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}
class Vec3 extends Vec2 {
    constructor(x, y, z) {
        super(x, y);
        this.z = z;
    }
    len() {
        let len2 = super.len();
        return Math.sqrt(len2 * len2 + this.z * this.z);
    }
}
Vec2(1, 2).len();
console.log(Vec3(1, 2, 3).len());
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Vec2 與 Vec3繼承abstract class VecX
class VecX {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class vVes2 extends VecX {
    constructor(x, y) {
        super(x, y);
    }
    len() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}
class vVec3 extends VecX {
    constructor(x, y, z) {
        super(x, y);
        this.z = z;
    }
    len() {
        let len2 = super.len();
        return Math.sqrt(len2 * len2 + this.z * this.z);
    }
}
VesX(1, 2).len();
console.log(vVec2(1, 2).len());
console.log(vVec3(1, 2, 3).len());
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//使用打包工具將.ts包成一.js檔
