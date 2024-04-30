


const { ccclass, property } = cc._decorator;



@ccclass('GD2')
export default class GD2 {

    @property(cc.Integer)//整數
    idx: number = 0;


    @property(cc.String)
    string: string = '';

    @property(cc.String)
    frameName: string = '';
}
    