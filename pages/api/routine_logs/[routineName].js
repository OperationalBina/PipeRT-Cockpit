import { connectToDatabase, find } from "../../../utils/nedb"

export default async function handler(req, res) {
    const { routineName } = req.query
    const { db } = connectToDatabase()

    let exceptions = find(db.exceptions, {Source: routineName})
    let warnings = find(db.warnings, {Source: routineName})
    let infos = find(db.infos, {Source: routineName})
    let plogs = find(db.plogs, {Source: routineName})

    let logs = await Promise.all([exceptions, warnings, infos, plogs]);

    let result = {
      logs: [].concat.apply([], logs)
    }

    res.json(result)
}