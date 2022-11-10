import { constants } from "../../_shared/constants.js";
import RoomSocketBuilder from "./util/roomSocket.js";

const socketBuilder = new RoomSocketBuilder({
    socketUrl: constants.socketUrl,
    namespace: constants.socketNamespaces.room,
});

const socket = socketBuilder
    .setOnUserConnected((user) => console.log('user connected!', user))
    .setOnUserDisconnected((user) => console.log('user disconnected!', user))
    .setOnRoomUpdated((user) => console.log('room list!', user))
    .build();

const room = {
    id: '0001',
    topic: 'JS Expert éh noz'
}

const user = {
    img: 'https://cdn2.iconfinder.com/data/icons/avatars-60/5985/25-Researcher-512.png',
    username: 'Erick Wendel',
}

socket.emit(constants.events.JOIN_ROOM, {user, room });
