const MongoClient = require('mongodb').MongoClient;

function __connectDB(callback) {
    var url = "mongodb://localhost:27017/shuoshuo";


    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log(123)
        }
        callback(err, db);
    })
}

module.exports.insertOne = function (collectionNmae, json, callback) {

    __connectDB(function (err, db) {
        db.collection(collectionNmae).insertOne(json, function (err, result) {
            callback(err, result);
            db.close();
        })
    })
}

module.exports.find = function (collectionName, json, c, d) {
    if (arguments.length == 3) {
        var callback = c;
        var skip = 0;
        var limit = 0;

    } else if (arguments.length == 4) {
        var callback = d;
        var args = c;
        var skip = args.page * args.pageSize || 0;
        var limit = args.page || 0;
        var sort = args.sort || {};
    } else {
        throw new Error("find参数错误");
        return;
    }

    __connectDB(function (err, db) {
        if (err) {
            console.log(err);
            return;
        }
        let cursor = db.collection(collectionName).find(json).skip(skip).limit(limit).sort(sort);
        let result = [];
        cursor.each((err, doc) => {
            if (err) {
                callback("出现错误", null);
                return;
            }
            if (doc != null) {
                result.push(doc)
            } else {
                callback(null, result);
                db.close();
            }
        })
    })
}
module.exports.delete = function (collectionName, json, callback) {
    __connectDB(function (err, db) {
        db.collection(collectionName).deleteMany(json, function (err, result) {
            callback(err, result);
        })
    })
}
module.exports.updata = function (collectionName, json, callback) {
    __connectDB(function (err, db) {
        db.collection(collectionName).updataMany(json1, json2, function (err, result) {
            callback(err, result)
        })
    })
}
module.exports.count = function (collectionName, json, callback) {
    __connectDB(function (err, db) {
        db.collection(collectionName).find(json).count((err, count) => {
            callback(err, count);
        });

    })
}