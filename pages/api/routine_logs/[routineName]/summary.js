import { connectToDatabase, count } from "../../../../utils/nedb"

export default async function handler(req, res) {
    const { routineName } = req.query
    const { db } = connectToDatabase()

    let exceptions = await count(db.exceptions, { Source: routineName })
    let warnings = await count(db.warnings, { Source: routineName })
    let infos = await count(db.infos, { Source: routineName })

    let result = {
        exceptions: exceptions,
        warnings: warnings,
        info: infos,
        avg_fps: 1
    }

    res.json(result)
}
