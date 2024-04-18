const {ccclass, property} = cc._decorator;

@ccclass
export default class BgControl1 extends cc.Component {
  
    start () {

    }

    update (dt) {
        //~~~背景移動~~~<<1>>
        //首先遍歷子物體(將兩個相同的背景子節點放置一個相同的父節點中)
       for(let bgNode of this.node.children){
        //移動
        bgNode.y -= 50 * dt;
        //如果背景超出畫面
        if(bgNode.y < -850){
            //背景Y軸就要+上2倍自身的長度,一致最上層,才能循環移動
            bgNode.y += 852 * 2;
        }

       }

    }
}
