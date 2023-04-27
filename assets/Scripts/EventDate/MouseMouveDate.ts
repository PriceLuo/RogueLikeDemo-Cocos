import { EventDateBase } from "../Manager/EventManager";
export default class MouseMouveDate extends EventDateBase {
    constructor(sender: object, mousePos: cc.Vec2) {
        super(sender);
        this.MousePos = mousePos;
    }
    public MousePos: cc.Vec2;
}
