import Attendee from "./entities/attendee.js";
import getTemplate from "./templates/attendeeTemplate.js";

const imgUser = document.getElementById('imgUser');
const roomTopic = document.getElementById('pTopic');
const gridSpeakers = document.getElementById('gridSpeakers');
const gridAttendees = document.getElementById('gridAttendees');

export default class View {
    static updateUserImage({ img, username }) {
        imgUser.src = img;
        imgUser.alt = username;
    }

    static updateRoomTopic({ topic }) {
        roomTopic.innerHTML = topic;
    }

    static updateAttendeesOnGrid(users) {
        users.forEach(item => View.addAttendeeOnGrid(item));
    }

    static _getExistingItemOnGrid({ id, baseElement = document }) {
        return baseElement.querySelector(`[id="${id}"]`);
    }

    static removeItemOnGrid(id) {
        const existingElement = View._getExistingItemOnGrid({ id });
        existingElement?.remove();
    }

    static addAttendeeOnGrid(item, removeFirst = false) {
        const attendee = new Attendee(item);
        const id = attendee.id;
        const htmlTemplate = getTemplate(attendee);
        const baseElement = attendee.isSpeaker ? gridSpeakers: gridAttendees;

        if(removeFirst) {
            View.removeItemOnGrid(id);
            baseElement.innerHTML += htmlTemplate;
            return;
        }

        const exitingItem = View._getExistingItemOnGrid({ id, baseElement });
        if(exitingItem) {
            exitingItem.innerHTML = htmlTemplate;
            return;
        }

        baseElement.innerHTML += htmlTemplate;
    }
}
