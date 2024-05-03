
const {ccclass, property} = cc._decorator;

@ccclass("SheepGD")
export default class SheepGD {

    @property(cc.Integer)//整數
    idx: number = 0;

    @property(cc.String)
    string: string = ''

    // @property(cc.String)
    // frameName: string = '';

    
}
