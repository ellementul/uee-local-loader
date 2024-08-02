import { MemberFactory } from "@ellementul/uee-core"
import { LocalLoaderMemberFactory, events } from "../src/index.js"

const room = new MemberFactory
room.makeRoom()

const loaderMember = new LocalLoaderMemberFactory
room.addMember(loaderMember)
room.subscribe(events.loaded, ({ type, fileName, file }) => {
    room.send(events.save, { type, fileName, file })
})

const button = document.createElement("button")
button.innerText = "Upload File"
document.body.append(button)

button.onclick = () => room.send(events.load)