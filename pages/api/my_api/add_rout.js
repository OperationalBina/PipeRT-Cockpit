import { connectToDatabase, insert } from "../../../utils/nedb"

var counter = 0

export default async function handler(req, res) {
    const { db } = connectToDatabase()

    let docs = await insert(db.routines, {error_level: Math.floor(Math.random() * 3), name: `Routine_Name_${counter}`});
    counter += 1
    res.json(docs)
}
