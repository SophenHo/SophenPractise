

const {ccclass, property} = cc._decorator;

@ccclass
export default class xxx extends cc.Component {

    @property([cc.SpriteAtlas])
    atlasAll: cc.SpriteAtlas[] = [];

    @property(cc.SpriteAtlas)
    atlas: cc.SpriteAtlas = null;

    @property(cc.SpriteAtlas)
    atlas2: cc.SpriteAtlas = null;

    @property(cc.SpriteAtlas)
    atlas3: cc.SpriteAtlas = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
