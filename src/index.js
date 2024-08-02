import { MemberFactory } from "@ellementul/uee-core"
import { event as loadEvent } from "./events/load-event.js"
import { event as loadedEvent } from "./events/loaded-event.js"
import { event as saveEvent } from "./events/save-event.js"

export const events = {
    load: loadEvent,
    loaded: loadedEvent,
    save: saveEvent
}

export class LocalLoaderMemberFactory extends MemberFactory {
    onConnectRoom() {
        this.subscribe(loadEvent, ({ type }) => {
            this.showOpenAssetPicker(type)
        })

        this.subscribe(saveEvent, ({ type, fileName, data }) => {
            this.saveFile(type, fileName, data)
        })
    }

    showOpenAssetPicker(type) {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = type
    
        input.addEventListener("change", () => {
            const file = input.files[0]

            if(file)
                this.readFile(type, file)
        })

        input.click()
    }

    readFile(type, file) {
        
        const reader = new FileReader()

        reader.addEventListener("load", async () => {
            const fileBuffer = reader.result
            this.send(loadedEvent, { type, fileName: file.name, data: new Uint8Array(fileBuffer) })
        })

        reader.readAsArrayBuffer(file)
    }

    saveFile(type, fileName, fileBuffer) {
        const tempLink = document.createElement("a");
      
        const taBlob = new Blob([fileBuffer.buffer], { type })
        const url = URL.createObjectURL(taBlob)
        console.log(url)
      
        tempLink.setAttribute('href', url)
        tempLink.setAttribute('download', fileName)
        tempLink.click()
      
        URL.revokeObjectURL(tempLink.href);
    }
}