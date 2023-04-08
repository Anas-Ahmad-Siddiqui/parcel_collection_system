const db = require("../models");
const Parcel = db.parcel;

exports.create = (req, res) => {
    Parcel.findOne({username: req.body.username})
        .then(data => {
            if (!data) {
                const parcel = new Parcel({
                    username: req.body.username,
                    dates: req.body.dates,
                    codes: req.body.codes
                })
                parcel
                    .save(function(err,data){
                        if(err){
                            res.statusCode = 500;
                            return res.send({message: err.message});
                        }
                        return res.send({message: "Registered Successfully!"});
                    });
            } else {
                let code = req.body.codes[0];
                let flag = false;
                let index = -1;
                let dateList = data.dates;
                for (let i = 0; i < dateList.length; i++) {
                    if (dateList[i].hasOwnProperty("_id")) {
                        delete dateList[i]["_id"];
                    }
                }
                let codeList = data.codes;
                for (let i = 0; i < codeList.length; i++) {
                    if (codeList[i].hasOwnProperty("_id")) {
                        delete codeList[i]["_id"];
                    }
                }

                for(let i = 0; i < codeList.length; i++){
                    if(codeList[i] == code){
                        flag = true
                        index = i
                    }
                }

                var mess = "";

                if(flag == true){
                    if(index === 0){
                        codeList.shift();
                        dateList.shift();
                        mess = "Succesffuly removed index 0";
                    }
                    else {
                        console.log("Removed index: " + index)
                        codeList.splice(index, index)
                        dateList.splice(index, index)
                        mess = "Successfully removed";
                    }
                }
                else{
                    codeList = codeList.concat(req.body.codes);
                    dateList = dateList.concat(req.body.dates);
                    mess = "Successfully Updated";
                }
                Parcel.findOneAndUpdate({username: req.body.username}, {dates: dateList, codes: codeList})
                    .then(() => {return res.send({message: mess})})
                    .catch(err => {
                        res.statusCode = 500;
                        return res.send({message: err.message});
                    })
            }
        })
        .catch(err => {return res.send({message: err.message})})
}

exports.get = (req, res) => {
    Parcel.findOne({username: req.body.username})
        .then(data => {
            res.send(data);
        })
}