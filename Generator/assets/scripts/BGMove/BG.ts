const { ccclass, property } = cc._decorator;
@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Boolean)
    bgH: boolean = false;
    @property(Number)
    speed: number = 100;
    update(dt: number) {
        let arr = this.node.children
        let len = arr.length
        let p = this.bgH ? 'x' : 'y'
        for (let i = 0; i < len; i++) {
            //移動
            let node = arr[i]
            node[p] += this.speed * dt;
            //如果背景超出畫面
            if (node[p] > 300) {
                //背景Y軸就要+上2倍自身的長度,一致最上層,才能循環移動
                node[p] -= 300 * 2;
            }
        }
    }
}