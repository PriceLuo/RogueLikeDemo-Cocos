import PlayerIdle from "./AnimatorState/Player/PlayerIdel";
import PlayerMove from "./AnimatorState/Player/PlayerMove";
import EnemyBase from "./Base/EnemyBase";
import RoleBase from "./Base/RoleBase";
import WeaponBase from "./Base/WeaponBase";
import DefaultWeapon from "./DefaultWeapon";
import EnemyDetector from "./EnemyDetector";
import Game from "./Game";
import FSMManager from "./Manager/FSMManager";
import WeaponHolder from "./WeaponHolder";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Player extends RoleBase {
    @property(WeaponHolder)
    public weaponHolder: WeaponHolder = null;
    @property(EnemyDetector)
    public enemyDetector: EnemyDetector = null;
    public target: EnemyBase;

    protected onLoad(): void {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.OnKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.OnKeyUp, this);
    }

    public Init(game: Game) {
        super.Init(game);
        this.speed = 100;
        this.weaponHolder.WeaponHolderInit(this);
        this.enemyDetector.EnemyDetectorInit(this);
        this.animator = (<FSMManager>this.game.moudleManager.GetMoudle(FSMManager.name)).GetAnimator("PlayerAnimator");
        this.animator.AddState(PlayerIdle.name, new PlayerIdle(this));
        this.animator.AddState(PlayerMove.name, new PlayerMove(this));
        this.animator.ChangeState(PlayerIdle.name);
        let newDefaultWeapon = cc.instantiate(this.game.defaultWeaponPrefab);
        let defaultWeapon = newDefaultWeapon.getComponent(DefaultWeapon);
        defaultWeapon.DefaultWeaponInit(this.weaponHolder);
        this.weaponHolder.ChangeWeapon(defaultWeapon);
    }

    private OnKeyDown(event: cc.Event.EventKeyboard) {
        if (this.animator != null) this.animator.OnkeyDown(event);
    }
    private OnKeyUp(event: cc.Event.EventKeyboard) {
        if (this.animator != null) this.animator.OnkeyUp(event);
    }

    protected onDestroy(): void {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.OnKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.OnKeyUp, this);
    }

    protected update(dt: number): void {
        if (this.target) this.weaponHolder.TryFire();
    }
}