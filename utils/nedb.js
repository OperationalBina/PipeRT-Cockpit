var Datastore = require('nedb')

let cachedDb = null

function connectToDatabase() {
  if (cachedDb) {
    return { db: cachedDb }
  }

  var db = {};

  db.plogs = new Datastore();
  db.debugs = new Datastore();
  db.infos = new Datastore();
  db.warnings = new Datastore();
  db.exceptions = new Datastore();
  db.routines = new Datastore();

  setInitialData(db)

  cachedDb = db

  return { db }
}

function setInitialData(db) {
  insert(db.routines, [
    { error_level: 0, name: `InitialRoutine_1` },
    { error_level: 1, name: `InitialRoutine_2` },
    { error_level: 2, name: `InitialRoutine_3` }
  ]);

  const logs = [
    {
      Source: 'InitialRoutine_1',
      level: "Exception",
      data: "I really love using pipeRT, I really love using pipeRT, I really love using pipeRT, I really love using pipeRT, I really love using pipeRT",
    },
    {
      Source: 'InitialRoutine_1',
      level: "Exception",
      data: "I really love using pipeRT",
    },
    {
      Source: 'InitialRoutine_1',
      level: "Exception",
      data: "I really love using pipeRT",
    },
    {
      Source: 'InitialRoutine_1',
      level: "Warning",
      data: "I really love using pipeRT",
    },
    {
      Source: 'InitialRoutine_1',
      level: "Info",
      data: "I really love using pipeRT",
    },
    {
      Source: 'InitialRoutine_1',
      level: "Exception",
      data: 'Handled at stack lvl 0 \n \
      File "exc.py", line 17, in <module> \n \
        stack_lvl_1() \n \
      File "exc.py", line 13, in stack_lvl_1 \n \
        stack_lvl_2() \n \
      File "exc.py", line 9, in stack_lvl_2 \n \
        stack_lvl_3() \n \
      File "exc.py", line 5, in stack_lvl_3 \n\
        raise Exception("a1", "b2", "c3")',
    },
  ]

  const logs_by_level = logs.reduce(function (r, a) {
    let log_level = a.level.toLowerCase() + "s"
    r[log_level] = r[log_level] || [];
    r[log_level].push(a);
    return r;
  }, Object.create(null));

  for (const [log_level, logs] of Object.entries(logs_by_level)) {
    insert(db[log_level], logs)
  }

}

function insert(db, ...opt) {
  return new Promise(function (resolve, reject) {
    db.insert(opt, function (err, doc) {
      if (err) {
        reject(err)
      } else {
        resolve(doc)
      }
    })
  })
}

function find(db, ...opt) {
  return new Promise(function (resolve, reject) {
    db.find(...opt, function (err, doc) {
      if (err) {
        reject(err)
      } else {
        resolve(doc)
      }
    })
  })
}

export { connectToDatabase, insert, find }