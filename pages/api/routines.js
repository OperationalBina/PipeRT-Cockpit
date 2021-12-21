import { connectToDatabase, find } from "../../utils/nedb"

export default async function handler(req, res) {
    const { db } = connectToDatabase()

    let docs = await find(db.routines, {});

    res.json(docs)
}
