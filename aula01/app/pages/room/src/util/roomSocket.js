import SocketBuilder from "../../../_shared/socket.js";
import { constants } from "../../../_shared/constants.js";

export default class RoomSocketBuilder extends  SocketBuilder{
    constructor({ socketUrl, namespace }) {
        super({ socketUrl, namespace });
        this.onRoomUpdated = () => {}
    }

    setOnRoomUpdated(fn) {
        this.onRoomUpdated = fn;
        return this;
    }

    build() {
        const socket = super.build();
        socket.on(constants.events.LOBBY_UPDATED, this.onRoomUpdated)
        return socket;
    }
}
