import {constants} from "../../_shared/constants.js";
import Attendee from "./entities/attendee.js";

export default class RoomController {
    constructor({ socketBuilder, roomInfo, view }) {
        this.socketBuilder = socketBuilder;
        this.roomInfo = roomInfo;
        this.view = view;

        this.socket = {};
    }

    static async initialize(deps) {
        return new RoomController(deps)._initialize();
    }

    async _initialize() {
        this._setupViewEvents();
        this.socket = this._setupSocket();

        this.socket.emit(constants.events.JOIN_ROOM, this.roomInfo);
    }

    _setupViewEvents() {
        this.view.updateUserImage(this.roomInfo.user);
        this.view.updateRoomTopic(this.roomInfo.room);
    }

    _setupSocket() {
        return this.socketBuilder
            .setOnUserConnected(this.onUserConnected())
            .setOnUserDisconnected(this.onDisconnected())
            .setOnRoomUpdated(this.onRoomUpdated())
            .setOnUserProfileUpgrade(this.onUserProfileUpgrade())
            .build();
    }

    onUserProfileUpgrade() {
        return (data) => {
            const attendee = new Attendee(data);
            console.log('onUserProfileUpgrade', data);
            if(attendee.isSpeaker) {
                this.view.addAttendeeOnGrid(attendee, true);
            }
        }
    }

    onUserConnected() {
        return (user) => {
            console.log('user connected!', user);
            this.view.addAttendeeOnGrid(user);
        }
    }

    onDisconnected() {
        return (data) => {
            const attendee = new Attendee(data);

            console.log(`${attendee.username} disconnected!`);
            this.view.removeItemOnGrid(attendee.id);
        }
    }

    onRoomUpdated() {
        return (users) => {
            console.log('room list!', users);
            this.view.updateAttendeesOnGrid(users);
        }
    }
}
