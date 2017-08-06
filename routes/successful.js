/**
 * Created by dllo on 17/8/5.
 */
var express = require('express');
var mysql = require('mysql');
var handleError = require('./headleError');
var router = express.Router();


// 链接数据库需要的参数
var options = {
    host: 'localhost',
    part: 3306,
    user: 'root',
    password: ''
}
//创建连接
var connect = mysql.createConnection(options);
//建立连接
connect.connect(function (error) {
    handleError('连接', error);
});
//使用数据库
var useDBSQL = 'use city';
connect.query(useDBSQL, function (error) {
    handleError('使用数据库', error);
    console.log(error);
});

router.post('/', function (req, res) {
    var newUserName = req.body.username;
    var newPassWord = req.body.password;
    // console.log("现P" +newPassWord);
    // console.log("现N" +newUserName);
    //查询数据
    var selectSQL = 'select * from dl';
    connect.query(selectSQL, function (error, results) {
        var isSuccess = handleError('查询', error);
        // console.log(error);
        if (!isSuccess) {
            return;
        }
        // console.log(results);
        for (var i = 0; i < results.length; i++) {
            var username = results[i]['username'];
            var password = results[i]['password'];
            // console.log("原N" + username);
            // console.log("原P" + password);
            if (newUserName == username && newPassWord == password) {
                res.send('登陆成功');
            } else {
                res.send('用户名或密码错误');
            }
        }
    });
});
module.exports = router;