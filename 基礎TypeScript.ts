
// //Map泛型函數

// function map<T>(arr: T[], func: (arg: T) => T): T[] {
//     return arr.map(func);
// }

// console.log(map([1,3,2], (a: number)=>{
//     return a+1;
// }));

// console.log(map(['1','3','2'], (a: string)=>{
//     return 'pre'+a;
// }));

//用for實現map
function mapWithFor<T, U>(array: T[], transform: (value: T) => U): U[] {
    let result: U[] = [];
    for (let i = 0; i < array.length; i++) {
        result.push(transform(array[i]));
    }
    return result;
}
console.log(mapWithFor([1, 2, 3], (a: number) => a + 1));
console.log(mapWithFor(['1', '2', '3'], (a: string) => 'pre' + a));

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//forEach

//1.
let number6 = [1, 2, 3, 4, 5];

number6.forEach(function(item) {
    console.log(item);  //1. 2. 3. 4. 5.
});

//2.
let number7 = [1, 2, 3, 4, 5];

number7.forEach(function(item) {
    console.log(item * item);  //1. 4. 9. 16. 25.
});

//3.
let words = ['apple', 'banana', 'cherry'];

words.forEach(function(item) {
    console.log(item.length);  //5. 6. 6.
});

words.forEach(function(item) {
    console.log(item.toUpperCase()); //APPLE. BANANA. CHERRY.
});

//4.
let number8 = [1, 2, 3, 4, 5];
let addValue = 10;

number8.forEach(function(item) {
    console.log(item + addValue);  //11. 12. 13. 14. 15.
});

//5.
let array5 = [10, 20, 30, 40, 50];
array5.forEach((element, index,) => console.log(`Element ${element} at index ${index}`));
//Element 10 at index 0
//Element 20 at index 1
//Element 30 at index 2
//Element 40 at index 3
//Element 50 at index 4

//6.
let array6 = [{name: 'John', age: 30}, {name: 'Jane', age: 25}, {name: 'Jim', age: 35}];
array6.forEach(obj => console.log(`Name is ${obj.name}, age is ${obj.age}`));
// Name is John, age is 30
// Name is Jane, age is 25
// Name is Jim, age is 35

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//reduce
// 1. 計算數組中所有數字的總和
let number9 = [1, 2, 3, 4, 5];
let sum9 = number9.reduce((total, num) => total + num, 0);
console.log(sum9);  //15

// 2.
let word2 = ['Hello', 'World', 'Reduce'];
let sentence2 = word2.reduce((total, word) => total + ' ' + word, ''); // 初始值（在這裡是 ''）是累積器在第一次調用回調函數時的值。如果沒有提供初始值，則會使用數組的第一個元素作為初始值，並從數組的第二個元素開始迭代。
console.log(sentence2);  // ' Hello World Reduce'

let word3 = ['Hello', 'World', 'Reduce'];
let sentence3 = word3.reduce((total, word) => total + ' ' + word,); //你沒有提供 reduce 函數的初始值。因此，reduce 函數會使用數組的第一個元素作為初始值，並從數組的第二個元素開始迭代。
console.log(sentence3);  // 'Hello World Reduce'

// 3. 計算數組中每個元素出現的次數
let name2 = ['Alice', 'Bob', 'Alice', 'Charlie', 'Bob'];
let count2 = name2.reduce((total: { [key: string]: number }, name) => {
    total[name] = (total[name] || 0) + 1;
    return total;
}, {});
console.log(count2);  // { Alice: 2, Bob: 2, Charlie: 1 }

// 4. 找出數組中的最大值
let number10 = [1, 2, 3, 4, 5];
let max0 = number10.reduce((max, num) => Math.max(max, num), number10[0]);
console.log(max0);  // 5

// 5. 將多數組轉換為一組
let array7 = [[1, 2], [3, 4], [5, 6]];
let flat = array7.reduce((total, arr) => total.concat(arr), []);//陣列的第一個元素是 [1, 2]，這是一個陣列不是一個有效的累積器,所以初始值需要設為空陣列 []
console.log(flat);  //[1, 2, 3, 4, 5, 6]

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// //Vec2 class (有x、y 及方法 len) 
// // Vec3 calss (有 x、y、z及方法len) 
// // Vec3繼承Vec2

// class Vec2 {
//     constructor(public x: number, public y: number) {}

//     len(): number {
//         return Math.sqrt(this.x * this.x + this.y * this.y);
//     }
// }

// class Vec3 extends Vec2 {
//     constructor(x: number, y: number, public z: number) {
//         super(x, y);
//     }

//     len(): number {
//         let len2 = super.len();
//         return Math.sqrt(len2 * len2 + this.z * this.z);
//     }
// }

// Vec2(1, 2).len();
// console.log(Vec3(1, 2, 3).len());

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// //Vec2 與 Vec3繼承abstract class VecX

// abstract class VecX {
//     constructor(public x: number, public y: number) {}

//     abstract len(): number;
// }

// class vVes2 extends VecX {
//     constructor(x: number, y: number) {
//         super(x, y);
//     }

//     len(): number {
//         return Math.sqrt(this.x * this.x + this.y * this.y);
//     }
// }

// class vVec3 extends VecX {
//     constructor(x: number, y: number, public z: number) {
//         super(x, y);
//     }

//     len(): number {
//         let len2 = super.len();
//         return Math.sqrt(len2 * len2 + this.z * this.z);
//     }
// }

// VesX(1, 2).len();
// console.log(Vec2(1, 2).len());
// console.log(Vec3(1, 2, 3).len());

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//使用打包工具將.ts包成一.js檔