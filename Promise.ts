// //閉包 - Closure
// function callMethod(newMoney){
//     let money = newMoney || 1000;
//     return function(price){
//         money = money - price;
//         return money;
//     }
// }
// let updateMyMoney = callMethod(1000);
// let updateMyMoney2 = callMethod(1000000);
// updateMyMoney(100); //900
// updateMyMoney2(100); //999900

// //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// /*Promise - 是一種用於非同步操作的物件
// 當非同步操作成功時，我們會調用 resolve 方法，並將結果作為參數傳遞。
// 當非同步操作失敗時，我們會調用 reject 方法，並將錯誤訊息或物件作為參數傳遞。

// Promise三種狀態：
// pending：初始狀態，既不是成功，也不是失敗狀態。
// fulfilled：表示操作成功完成。
// rejected：表示操作失敗。

// 當一個 Promise 物件被創建時，它的狀態是 pending。
// 當 resolve 函數被調用時，Promise 的狀態變為 fulfilled。
// 當 reject 函數被調用時，Promise 的狀態變為 rejected。
// ***不能讓Promise一直處於pending狀態，很耗記憶體，預期一定要有值，要麼成功，要麼失敗
// */

function pp2(dur: number, resOrRej: "res" | "rej"): Promise<unknown> {
    return new Promise((resolve, reject): void => {
        console.log("create p", dur);
        setTimeout(() => {
            console.log("resolve p", dur);
            if (resOrRej == "res") {
                resolve(dur);
            } else {
                reject(dur);
            }
        }, dur * 1000);
    });
}

(async(): Promise<void> => {
    try {   // 圖片按照一定的順序加載，並且在每張圖片加載完成後才開始加載下一張圖片
        await pp2(1.5, "res"),
        await pp2(1, "res"),
        await pp2(2, "res"),
        await pp2(1, "res"),
        await pp2(2, "res")
    } catch (err) {
        console.error(err);
    }
})()

//***Promise.all 用法
// (async(): Promise<void> => {
//     try {
//         await Promise.all([  //Promise.all 來同時執行所有的 pp5 函數調用。這意味著所有的圖片將會同時開始加載，並且當所有圖片都加載完成時，Promise.all 返回的 promise 才會解析。如果任何一個 pp5 函數調用拋出錯誤，Promise.all 返回的 promise 會立即拒絕，並且不會等待其他的 pp5 函數調用。
//             pp2(1.5, "res"),
//             pp2(1, "res"),
//             pp2(2, "res"),
//             pp2(1, "res"),
//             pp2(2, "res")
//         ]);
//     } catch (err) {
//         console.error(err);
//     }
// })() //這裡的 () 就是用來呼叫這個異步函數的。如果你移除它，則函數將不會被執行，只會被定義。
    //是一個立即調用的函數表達式（IIFE，Immediately Invoked Function Expression）。這種模式用於立即執行一個函數。

//範例
function loadImage(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = url;
    });
}

function pp5(dur: number, url: string): Promise<unknown> {
    return new Promise((resolve, reject): void => {
        console.log("Start loading image", url);
        setTimeout(() => {
            loadImage(url)
                .then(() => {  //.then() 是 Promise 物件的一個方法，用於指定當 Promise 成功解析（也就是完成）時要執行的回調函數。
                    console.log("Image loaded", url);
                    resolve(dur);
                })
                .catch(reject); //.catch() 是 Promise 物件的一個方法，用於指定當 Promise 被拒絕（也就是失敗）時要執行的回調函數。
        }, dur * 1000);
    });
}

(async(): Promise<void> => {
    try {
        await pp5(1, "image1.jpg");
        await pp5(2, "image2.jpg");
        await pp5(3, "image3.jpg");
        await pp5(4, "image4.jpg");
    } catch (err) {
        console.error(err);
    }
})()


// //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// //實現resPromise，包裝setTimeout，時間到resolve

function resPromise(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

resPromise(2000).then(() => {
    console.log('Promise resolved after 2 seconds');
});

// //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//實現rejPromise，包裝setTimeout，時間reject

function rejPromise(ms: number): Promise<void> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('Promise rejected after ' + ms + ' milliseconds'));
        }, ms);
    });
}

rejPromise(1000)
    .catch(error => console.log(error.message));

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/*Callback(移交控制權)
Promise 中的 resolve 和 reject 函數就是回調函數（Callback）
當你創建一個新的 Promise 時，你會提供一個執行器函數，這個函數接受兩個參數：resolve 和 reject，這兩個都是回調函數。
當異步操作成功時，你會調用 resolve 函數，並將結果作為參數傳遞；當異步操作失敗時，你會調用 reject 函數，並將錯誤作為參數傳遞。
*/


// Promise(未來值)
// Promise 是 JavaScript 中的一種內建對象，用於處理異步操作。
// 它代表一個將在未來完成或失敗的操作，並且可以返回其結果值。在這裡，"未來值"是指當 Promise 完成時將返回的值。

// let promise = new Promise((resolve, reject) => {
//     // 異步操作
//     if (/* 操作成功 */) {
//         resolve(value); // 將未來值傳遞給 resolve 函數
//     } else {
//         reject(error); // 如果操作失敗，將錯誤傳遞給 reject 函數
//     }
// });


// //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

let p = new Promise((resolve, reject) => {
    Math.random() > .5 ? resolve() : reject() // 三目運算符： 隨機數大於 0.5，則調用 resolve() 函數，否則調用 reject() 函數。
})

p.then(() => console.log("resolve"), () => console.log("reject")) //註冊了兩個回調函數，這兩個函數都是可選的，你可以只提供一個。如果你只關心解析情況，你可以只提供第一個函數。如果你只關心拒絕情況，你可以提供 null 或 undefined 作為第一個參數，然後提供第二個函數。

async function xxx(p) {
    await p;
}

// 在異步函數中使用 Promise.all
(async () => {
    try {
        await Promise.all([p, p])
    } catch (error) {
        console.error(error);
    }
})();

// //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// async function test(){
//     await resPromise(1);
//     console.log("1");
//     await Promise.all([resPromise(2), rejPromise(3)]);
//     console.log("4");
// }

// function pp3(dur: number, resOrRej: "res" | "rej"): Promise<unknown> {
//     return new Promise((resolve, reject): void => {
//         console.log("create p", dur);
//         setTimeout(() => {
//             console.log("resolve p", dur);
//             if (resOrRej == "rej") {
//                 reject(dur);
//             } else {
//                 resolve(dur);
//             }
//         }, dur * 1000);
//     });
// }

// (async(): Promise<void> => {
//     try {
//         await Promise.all([pp3(1.5, "res"), pp3(1, "res"), pp3(2, "res")]);
//         await pp3(1, "res");
//         await pp3(2, "rej");
//         await pp3(1, "res");
//         await pp3(2, "res");
//     } catch(e) {
//         console.log("catch", e);
//     }
// })();

// //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// //用try catch 包起來

function pp6(dur: number, resOrRej: "res" | "rej"): Promise<unknown> {
    return new Promise((resolve, reject): void => {
        console.log("create p", dur);
        setTimeout(() => {
            console.log("resolve p", dur);
            if (resOrRej == "rej") {
                reject(dur);
            } else {
                resolve(dur);
            }
        }, dur * 1000);
    });
}

// (async(): Promise<void> => {
//     try {
//         await pp6(1.5, "res");
//         await pp6(1, "res");
//         await pp6(2, "rej"); // resOrRej 參數被設置為 "rej"，這意味著該函式將拒絕，並且錯誤將被捕獲並輸出到控制台。因此，後面的兩個 pp6 函式不會被執行。
//         await pp6(1, "res");
//         await pp6(2, "res"); 
//     } catch(e) {
//         console.log("catch", e);
//     }
// })()

//如果希望所有的 pp6 函式都被執行，即使有一個拒絕，你可以將每個 pp6 函式的調用放在其自己的 try/catch 塊中修正如下

(async(): Promise<void> => {
    try {
        await pp6(1.5, "res");
    } catch(e) {
        console.log("catch", e);
    }
    try {
        await pp6(1, "res");
    } catch(e) {
        console.log("catch", e);
    }
    try {
        await pp6(2, "rej"); // 修正這裡
    } catch(e) {
        console.log("catch", e);
    }
    try {
        await pp6(1, "res");
    } catch(e) {
        console.log("catch", e);
    }
    try {
        await pp6(2, "res"); 
    } catch(e) {
        console.log("catch", e);
    }
})();
