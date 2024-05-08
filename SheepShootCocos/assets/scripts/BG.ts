const { ccclass, property } = cc._decorator;
@ccclass
export default class BG extends cc.Component {

    @property(cc.Boolean)
    bgXY: boolean = false;

    @property(cc.Float)
    speed: number = 100;

    update(dt: number) {

        let arr: cc.Node[] = this.node.children
        let p: string = this.bgXY ? 'x' : 'y'
        let pp: string = this.bgXY ? 'width' : 'height' //三元運算子

        for (let i = 0; i < arr.length; i++) {
            
            let node = arr[i]
            let size = node.getContentSize(); // 獲取節點大小
            node[p] -= this.speed * dt;
            //如果背景超出圖片本身
            if (node[p] < -size[pp]) {
                node[p] += size[pp] * 2;
            }
        }
    }

}