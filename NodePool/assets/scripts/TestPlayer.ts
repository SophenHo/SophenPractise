const {ccclass, property} = cc._decorator;

// 2.2 DelaySprite 元件，start 後 1 秒 cc.Sprite 才設定元件上的 spriteFrame
@ccclass
export default class TestPlayer extends cc.Component {

    @property(cc.Sprite)
    sprite: cc.Sprite = null;

    @property()
    delayT:number = 0

    @property
    Speed:number = 20;

    @property
    mine: number = 0;
    
    @property
    max: number = 200;

    start () {
        //DelaySprite ，start 後 2 秒 cc.Sprite 才設定元件上的 spriteFrame
        let frame = this.sprite.spriteFrame
        this.sprite.spriteFrame = null
        this.scheduleOnce(()=>{
            this.sprite.spriteFrame = frame
        }, this.delayT)
    }

    update (dt) {
        //用＠property設定的值來控制移動的速度＆範圍
        this.node.x += this.Speed * dt;
        if(this.node.x >= this.max){
            this.node.x = this.mine;
        }
              
    }

}