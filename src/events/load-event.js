import { Types, EventFactory } from "@ellementul/uee-core"

export const MIME_TYPES = { image: "images/*" }

const type = Types.Object.Def({
    system: "Files",
    action: "Load",
    type: Types.Any.Def(Object.values(MIME_TYPES))
}, true)

export const event = EventFactory(type)
