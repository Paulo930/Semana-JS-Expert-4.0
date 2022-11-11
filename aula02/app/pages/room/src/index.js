import { constants } from "../../_shared/constants.js";
import RoomSocketBuilder from "./util/roomSocket.js";
import RoomController from "./controller.js";
import View from "./view.js";

const room = {
    id: '0001',
    topic: 'JS Expert éh noz'
}

const user = {
    img: 'https://cdn2.iconfinder.com/data/icons/avatars-60/5985/25-Researcher-512.png',
    username: 'Erick Wendel',
}

const roomInfo = { user, room };

const socketBuilder = new RoomSocketBuilder({
    socketUrl: constants.socketUrl,
    namespace: constants.socketNamespaces.room,
});

const dependencies = {
    view: View,
    socketBuilder,
    roomInfo
}

RoomController.initialize(dependencies);
