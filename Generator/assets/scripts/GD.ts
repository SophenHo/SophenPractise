


const { ccclass, property } = cc._decorator;



@ccclass('GD') // "GD" 的 Cocos Creator 類別
export default class GD {

    @property(cc.Integer)//整數
    idx: number = 0;

    @property(cc.SpriteFrame)
    frame: cc.SpriteFrame = null;

    @property(cc.String)
    string: string = ''

}
