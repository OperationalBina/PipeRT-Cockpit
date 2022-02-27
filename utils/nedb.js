var Datastore = require('nedb')

let cachedDb = null

function connectToDatabase() {
  if (cachedDb) {
    return { db: cachedDb }
  }

  const db = {};

  db.debugs = new Datastore({ filename: 'debugs.db', autoload: true });
  db.infos = new Datastore({ filename: 'infos.db', autoload: true });
  db.warnings = new Datastore({ filename: 'warnings.db', autoload: true });
  db.exceptions = new Datastore({ filename: 'exceptions.db', autoload: true });
  db.routines = new Datastore({ filename: 'routines.db', autoload: true });
  db.pipe_infrastructures = new Datastore({ filename: 'pipe_infrastructures.db', autoload: true });
  db.errors = new Datastore({ filename: 'errors.db', autoload: true});
  db.events = new Datastore({filename: 'events.db', autoload: true})
  db.fps = new Datastore({filename: 'fps.db', autoload: true})

  cachedDb = db

  return { db }
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

function update(db, query, updateQuery) {
  return new Promise(function (resolve, reject) {
    db.update(query, updateQuery, {}, function (err, doc) {
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

function count(db, ...opt) {
  return new Promise(function (resolve, reject) {
    db.count(...opt, function (err, doc) {
      if (err) {
        reject(err)
      } else {
        resolve(doc)
      }
    })
  })
}

export { connectToDatabase, insert, find, count, update }