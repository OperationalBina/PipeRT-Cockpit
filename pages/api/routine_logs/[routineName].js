import { connectToDatabase, find } from "../../../utils/nedb"

export default async function handler(req, res) {
    const { routineName } = req.query
    const { db } = connectToDatabase()

    let exceptions = find(db.exceptions, {source: routineName})
    let warnings = find(db.warnings, {source: routineName})
    let infos = find(db.infos, {source: routineName})
    let plogs = find(db.pipe_infrastructures, { source: routineName });

    let logs = await Promise.all([exceptions, warnings, infos, plogs]);

    let result = {
      logs: [].concat.apply([], logs)
    }

    res.json(result)
}