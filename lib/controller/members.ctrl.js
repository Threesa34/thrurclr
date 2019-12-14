var nodemailer = require('nodemailer');
var connection = require('../config/connection');
module.exports = {

    ImportMemberDetails: function(req,res)
    {
        var sql = 'INSERT INTO `member_master`(`name`, `gender`, `roomno`, `building`, `street`, `locality`, `city`, `state`, `pincode`, `email`, `mobile1`, `mobile2`, `voteridno`, `createdby`) VALUES ';
        var ss = '';
        req.body.map(function(value){
            if(value.DTDS0 != undefined){value.DTDS0}else{value.DTDS0 = ""}
            if(value.DTDS1 != undefined){value.DTDS1}else{value.DTDS1 = ""}
            if(value.DTDS2 != undefined){value.DTDS2}else{value.DTDS2 = ""}
            if(value.DTDS3 != undefined){value.DTDS3}else{value.DTDS3 = ""}
            if(value.DTDS4 != undefined){value.DTDS4}else{value.DTDS4 = null}
            if(value.DTDS5 != undefined){value.DTDS5}else{value.DTDS5 = null}
            if(value.DTDS6 != undefined){value.DTDS6}else{value.DTDS6 = null}
            if(value.DTDS7 != undefined){value.DTDS7}else{value.DTDS7 = null}
            if(value.DTDS8 != undefined){value.DTDS8}else{value.DTDS8 = null}
            if(value.DTDS9 != undefined){value.DTDS9}else{value.DTDS9 = null}
            if(value.DTDS10 != undefined){value.DTDS10}else{value.DTDS10 = null}
            if(value.DTDS11 != undefined){value.DTDS11}else{value.DTDS11 = null}
            if(value.DTDS12 != undefined){value.DTDS12}else{value.DTDS12 = null}

            ss= ss+ '("'+value.DTDS0+'","'+value.DTDS1+'","'+value.DTDS3+'","'+value.DTDS4+'","'+value.DTDS5+'","'+value.DTDS6+'","'+value.DTDS7+'","'+value.DTDS8+'","'+value.DTDS9+'","'+value.DTDS12+'",'+value.DTDS10+','+value.DTDS11+',"'+value.DTDS2+'",'+req.decoded.logedinuser.id+'),';
        });
         ss = ss.substr(0, ss.length - 1);
       
        connection.acquire(function (err, con) {
            con.query(sql+ss,function(err,result)
            {
                if(err)
                    {
                        res.send({
                            status: 0,
                            type: "error",
                            title: "Oops!",
                            message: "Something went worng, Please try again letter"
                        });
                        con.release();
                    }
                    else
                    {
                        res.send({
                            status: 1,
                            type: "success",
                            title: "Done!",
                            message: "Record imported successfully"
                        });
                        con.release();
                    }
            });
        });
    },

    SaveMemberDetails: function(req,res)
    {
        if(req.body[0].id)
        {
            delete req.body[0].location;
            connection.acquire(function (err, con) {
                con.query("UPDATE `member_master` SET ? WHERE ID = ?",[req.body[0],req.body[0].id], function (err, result) {
                    if(err)
                    {
                        res.send({
                            status: 0,
                            type: "error",
                            title: "Oops!",
                            message: "Something went worng, Please try again letter"
                        });
                        con.release();
                    }
                    else
                    {
                        res.send({
                            status: 1,
                            type: "success",
                            title: "Done!",
                            message: "Record updated successfully"
                        });
                        con.release();
                    }
                });
            });
        }
        else
        {
            req.body[0].createdby = req.decoded.logedinuser.id;

            connection.acquire(function (err, con) {
                con.query("INSERT INTO `member_master` set ?",req.body[0], function (err, result) {
                    if(err)
                    {
                        res.send({
                            status: 0,
                            type: "error",
                            title: "Oops!",
                            message: "Something went worng, Please try again letter"
                        });
                        con.release();
                    }
                    else
                    {
                        res.send({
                            status: 1,
                            type: "success",
                            title: "Done!",
                            message: "Record inserted successfully"
                        });
                        con.release();
                    }
                });
            });
        }

    },
    ListMembers: function(req,res)
    {
        connection.acquire(function (err, con) {
            con.query("SELECT *,(CONCAT(member_master.roomno,', ',member_master.building,',  ',member_master.street,', ',member_master.locality,'.')) AS location FROM `member_master` ORDER BY id DESC", function (err, result) {
                if(err)
                {
                    res.send({status:0,message:"Something went wrong"});
                }
                else
                {
                    res.send(result);
                }
                con.release();
            });
        });
    },
};