
import Dexie from "dexie"

export const db = new Dexie("myDatabase");
db.version(2).stores({
    friends: "++id, age"
})