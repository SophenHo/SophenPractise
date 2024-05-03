


const { ccclass, property } = cc._decorator;



@ccclass('GD3')
export default class GD3 {

    @property(cc.Integer)//整數
    idx: number = 0;


    @property(cc.String)
    string: string = '';

    
}
    