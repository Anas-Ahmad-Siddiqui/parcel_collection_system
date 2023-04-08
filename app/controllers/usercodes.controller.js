const db = require("../models");
const Usercodes = db.usercode;

exports.create = (req, res) => {
    const userCode = new Usercodes({
        code: req.body.code,
        username: req.body.username
    })

    Usercodes.findOne({code: userCode.code})
        .then(data => {
            if (!data) {
                userCode.save(function (err, data) {
                    if (err) {
                        res.statusCode = 500;
                        return res.send({message: err.message});
                    }
                    return res.send({message: "Registered Successfully!"});
                });
            } else {
                res.statusCode = 203;
                return res.send({message: data.username});
            }
        }).catch(e => {
            res.statusCode = 500;
            return res.send({error: e.message})
        })
}

exports.delete = (req, res) => {
    Usercodes.deleteOne({code: req.body.code}).then(res.send({message: "Deleted record"}));
}

exports.get = (req, res) => {
    Usercodes.findOne({code: req.body.code})
        .then(data => {
            res.send(data);
        })
}