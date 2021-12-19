import { connectToDatabase, find } from "../../../utils/nedb"

export default async function handler(req, res) {
    const { routineName } = req.query
    const { db } = connectToDatabase()

    let exceptions = await find(db.exceptions, {Source: routineName})
    let warnings = await find(db.warnings, {Source: routineName})
    let infos = await find(db.infos, {Source: routineName})
    let plogs = await find(db.plogs, {Source: routineName})

    let result = {
      logs: [].concat(exceptions, warnings, infos, plogs)
    }

    res.json(result)
}
