import { connectToDatabase, count, find } from "../../../../utils/nedb"

export default async function handler(req, res) {
    const { routineName } = req.query
    const { db } = connectToDatabase()

    let exceptions = await count(db.exceptions, { source: routineName })
    let warnings = await count(db.warnings, { source: routineName })
    let infos = await count(db.infos, { source: routineName })
    let fpsList = await find(db.fps, { source: routineName })

    let logs = await Promise.all([exceptions, warnings, infos]);
    [exceptions, warnings, infos] = logs

    let result = {
        exceptions: exceptions,
        warnings: warnings,
        info: infos,
        avg_fps: fpsList[0] ? fpsList[0]["fps"] : "0"
    }

    res.json(result)
}
