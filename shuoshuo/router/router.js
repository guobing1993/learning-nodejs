const formidable = require('formidable');
const db = require('../models/db');
const md5 = require('../models/md5');


module.exports.showIndex = function (req, res, next) {
    res.render('index')
}
module.exports.showRegist = function (req, res, next) {
    res.render('regist')
}
module.exports.doRegist = function (req, res, next) {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var username = fields.username;
        var password = fields.password;

        db.find("user", {
            username: username
        }, function (err, result) {

            if (err) {
                res.send(200, -3); /* 服务器错误 */
                return;
            }
            if (result.length != 0) {
                res.send(200, -1); /* 该用户名存在 */
                return;
            }
            password = md5(md5(password) + "guobing");

            db.insertOne("user", {
                username: username,
                password: password,
                avatar: 'moren.png'
            }, (err, result) => {
                if (err) {
                    res.send(200, -3);
                    return;
                }
                /* session */
                req.session.user = username;
                res.send(200, 1);
                return;
            })
        })
    })

}

module.exports.showLogin = function (req, res, next) {
    res.render('login')
}
module.exports.doLogin = function (req, res, next) {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var username = fields.username;
        var password = fields.password;

        db.find("user", {
            username: username
        }, function (err, result) {
            if (err) {
                res.send(200, -3);
                return;
            }
            if (result.length == 0) {
                res.send(200, -1);
                return;

            }

            password = md5(md5(password) + "guobing");

            if (password == result[0].password) {
                res.send(200, 1);
            } else {
                res.send(200, -2);

            }

        })
    })

}