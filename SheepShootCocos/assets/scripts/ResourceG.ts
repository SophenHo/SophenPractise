

const {ccclass, property} = cc._decorator;

let aaa: ResourceG = null;

// export function getAtlasFrame(key: string): cc.SpriteFrame{
//     for (let i = 0; i < aaa.atlasData.length; i++){
//         const atlas = aaa.atlasData[i];
//         let frame = atlas.getSpriteFrame(key);
//         if (frame){
//             return frame;
//         }
//     }
//     return null;
// }

export function getSpriteFrame2(key: string): cc.SpriteFrame{
    for (let i = 0; i < aaa.frameData.length; i++){
        const frameD = aaa.frameData[i];
        // let frame = frameD.name(key);
        if (frameD.name === key){
            return frameD;
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
export default class ResourceG extends cc.Component {

    @property([cc.SpriteAtlas])
    atlasData: cc.SpriteAtlas[] = [];

    @property([cc.SpriteFrame])
    frameData: cc.SpriteFrame[] = [];

    @property([cc.AnimationClip])
    aniData: cc.AnimationClip[] = [];

    protected onLoad () {
        aaa = this;
    }

    start () {

    }

    // update (dt) {}
}
