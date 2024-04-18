"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ccclass, property } = cc._decorator;
let BulletPool = (() => {
    let _classDecorators = [ccclass];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = cc.Component;
    let _PoolName_decorators;
    let _PoolName_initializers = [];
    let _PoolName_extraInitializers = [];
    let _content_decorators;
    let _content_initializers = [];
    let _content_extraInitializers = [];
    let _bulletPrefab_decorators;
    let _bulletPrefab_initializers = [];
    let _bulletPrefab_extraInitializers = [];
    var BulletPool = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.PoolName = __runInitializers(this, _PoolName_initializers, ""); // 子彈池名
            this.content = (__runInitializers(this, _PoolName_extraInitializers), __runInitializers(this, _content_initializers, 10)); // 子彈池容量
            this.bulletPrefab = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _bulletPrefab_initializers, null)); // 子彈预制体
            this.bulletPool = (__runInitializers(this, _bulletPrefab_extraInitializers), null);
            // update (dt) {}
        }
        // onLoad () {}
        start() {
            this.bulletPool = new cc.NodePool(); //創建對象池
            for (let i = 0; i < this.content; i++) {
                let bullet = cc.instantiate(this.bulletPrefab); //實例化子彈預製體
                this.bulletPool.put(bullet); // 通過put接口放入對象池 
            }
            console.log(`對象池大小: ${this.bulletPool.size()}`); // 打印對象池大小
        }
        get_bullet() {
            let bullet = null;
            if (this.bulletPool.size() > 0) { //如果對象池中有可用的空閒對象就用get獲取對象（記得永遠要用size來判斷是否有可用的對象）
                bullet = this.bulletPool.get();
            }
            else {
                bullet = cc.instantiate(this.bulletPrefab);
            }
            console.log(`取出子彈後，對象池大小: ${this.bulletPool.size()}`); // 打印對象池大小
            return bullet;
        }
        ret_bullet(bullet) {
            this.bulletPool.put(bullet); // 通過put接口返回對象池
            console.log(`返回子彈後，對象池大小: ${this.bulletPool.size()}`); // 打印對象池大小
        }
    };
    __setFunctionName(_classThis, "BulletPool");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _PoolName_decorators = [property(cc.String)];
        _content_decorators = [property()];
        _bulletPrefab_decorators = [property(cc.Prefab)];
        __esDecorate(null, null, _PoolName_decorators, { kind: "field", name: "PoolName", static: false, private: false, access: { has: obj => "PoolName" in obj, get: obj => obj.PoolName, set: (obj, value) => { obj.PoolName = value; } }, metadata: _metadata }, _PoolName_initializers, _PoolName_extraInitializers);
        __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
        __esDecorate(null, null, _bulletPrefab_decorators, { kind: "field", name: "bulletPrefab", static: false, private: false, access: { has: obj => "bulletPrefab" in obj, get: obj => obj.bulletPrefab, set: (obj, value) => { obj.bulletPrefab = value; } }, metadata: _metadata }, _bulletPrefab_initializers, _bulletPrefab_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BulletPool = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BulletPool = _classThis;
})();
exports.default = BulletPool;