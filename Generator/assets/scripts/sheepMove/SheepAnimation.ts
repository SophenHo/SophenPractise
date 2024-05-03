

const {ccclass, property} = cc._decorator;

let aaa: SheepAnimation = null;

export function getSpriteFrame(key: string): cc.SpriteFrame{
    for (let i = 0; i < aaa.data.length; i++){
        const atlas = aaa.data[i];
        let frame = atlas.getSpriteFrame(key);
        if (frame){
            return frame;
        }
    }
    return null;
}
export function getAnimationClip(key: string): cc.AnimationClip{
    for (let i = 0; i < aaa.aniData.length; i++){
        const animation = aaa.aniData[i];
        if (animation.name === key){
            return animation;
        }
    }
    return null;
}

@ccclass
export default class SheepAnimation extends cc.Component {

    @property([cc.SpriteAtlas])
    data: cc.SpriteAtlas[] = [];

    @property([cc.AnimationClip])
    aniData: cc.AnimationClip[] = [];

    protected onLoad () {
        aaa = this;
    }

    start () {

    }

    // update (dt) {}
}
