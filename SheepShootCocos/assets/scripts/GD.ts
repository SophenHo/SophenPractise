
const {ccclass, property} = cc._decorator;

@ccclass("SheepGD")
export default class GD {

    @property(cc.Integer)//整數
    idx: number = 0;

    @property(cc.String)
    labelString: string = '';

    @property(cc.String)
    atlasFrameString: string = '';

    @property(cc.String)
    spriteFrameString: string = '';

    @property(cc.String)
    animationString: string = ''////

    // @property(cc.String)
    // frameName: string = '';

    
}
