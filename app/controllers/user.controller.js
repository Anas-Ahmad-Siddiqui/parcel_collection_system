// const { mongoose } = require("../models");
const db = require("../models");
const User = db.user;

exports.create = (req,res) => {
    if(!req.body.username){
        res.statusCode = 400;
        return res.send({message: "Username cannot be empty!"});
    }
    if(!req.body.password){
        res.statusCode = 400;
        return res.send({message: "Password cannot be empty!"});
    }
    const user = new User({
        username: req.body.username,
        password : req.body.password,
        name: req.body.name,
        email: req.body.email,
        flat_no: req.body.flat_no
    });

    User.findOne({username: user.username})
        .then(
            data => {
                if(!data){
                    user
                        .save(function(err,data){
                            if(err){
                                res.statusCode = 500;
                                return res.send({message: err.message});
                            }
                            return res.send({message: "Registered Successfully!"});
                        });
                }
                else{
                    res.statusCode = 203;
                    return res.send({ message: "User already exists with username " + user.username});
                }
            }
        )
};

exports.update = (req, res) => {
    var data = {
        name: {type: String},
        email: {type: String},
        flat_no: {type: String}
    }
    User.findOneAndUpdate({username: req.body.username}, data)
        .then(res.send({message: "Updated Successfully"}))
}

exports.findAll = (req, res) => {
    const username = req.query.username;
    let condition = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {};

    User.find(condition)
        .then(data => {
            return res.send(data);
        })
        .catch(err => {
            res.statusCode = 500;
            return res.send({
                message:
                    err.message || "Some error occurred while retrieving users."
          });
        });
};

exports.signin = (req, res) => {
    User.findOne({username: req.body.username})
        .then(data => {
            if (!data) {
                res.statusCode = 203;
                return res.send({message: "Not found User with username "});
            }
            else{
                if(data.password === req.body.password){
                    res.statusCode = 200;
                    return res.send({message: "Found"});
                }
                else{
                    res.statusCode = 203;
                    return res.send({message: "User found but password incorrect"});
                }
            }
        })
        .catch(err => {
            res.statusCode = 500;
            return res.send({ message: err.message});
        });
};

exports.signOut = (req,res) => {
    User.findOneAndUpdate({username:req.body.username})
        .then(res.send({message: "Successfully signed out!"}))
        .catch(
            err => {
                res.statusCode = 500;
                return res.send({message: err.message});
            }
        );
};

exports.get = (req, res) => {
    User.findOne({username: req.body.username})
        .then(data => {
            res.send(data);
        })
}
