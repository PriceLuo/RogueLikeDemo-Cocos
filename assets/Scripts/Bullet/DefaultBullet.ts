import BulletBase from "../Base/BulletBase";
import Game from "../Game";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DefaultBullet extends BulletBase {
    public DefaultBulletInit(game: Game, moveDir: cc.Vec2) {
        super.BulletBaseInit(game, 10, moveDir, 10, 5);
    }
}
