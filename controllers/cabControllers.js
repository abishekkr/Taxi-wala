const path = require('path');
const ur_db = require('../models/ur')
const driver_db = require('../models/driver')
const locations = require('../models/locations')
const booking = require('../models/bookings')
const cabDetails = require('../models/cabDetails')
const { error, table } = require('console');
var cookieSession = require('cookie-session')
const fs = require('fs')
const express = require('express')
const { engine } = require('express-handlebars')
const cookieParser = require('cookie-parser');
var GeoPoint = require('geopoint');




var app = express();
app.set('view engine', 'handlebars');
app.engine('handlebars', engine());
app.use(express.static('public'))


app.use(cookieParser());
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}));


const Cryptr = require('cryptr');
const cryptr = new Cryptr('ReallySecretKey');

const PDFDocument = require('pdfkit');
const { use } = require('../routes/cab');
const bookings = require('../models/bookings');
const { where } = require('sequelize');
const doc = new PDFDocument;

generateOtp();






module.exports.home = (req, res, next) => {
    var loc = path.join(__dirname, 'templates', 'home.html');
    res.sendFile(loc);
}




//-------------------------------------------------//

module.exports.adminLogin = (req, res, next) => {
    var loc = path.join(__dirname, 'templates', 'adminLogin.html');
    res.sendFile(loc);
}
module.exports.adminLoginVerify = (req, res, next) => {
    let adminDetails = {
        email: "admin@experion.com",
        password: "thisisakr"
    }
    if (req.body.email == adminDetails.email && req.body.password == adminDetails.password) {
        res.cookie('adminId', cryptr.encrypt(adminDetails.email))
        res.redirect('/tw/adminHome')
    }
    else {
        res.redirect('/tw/adminLogin')
    }
}





module.exports.adminHome = (req, res, next) => {
    let adminId;
    if (req.get("cookie") != null) {
        let cookieArray = req.get("cookie").split(";");
        for (let i = 0; i < cookieArray.length; i++) {
            if (cookieArray[i].split("=")[0] == "adminId") {
                adminId = cookieArray[i].split("=")[1]
                break;
            }
        }
        adminId = cryptr.decrypt(adminId)
        if (adminId == 'admin@experion.com') {
            var loc = path.join(__dirname, 'templates', 'adminHome.html');
            res.sendFile(loc);
        }
        else {
            var loc = path.join(__dirname, 'templates', 'error.html');
            res.sendFile(loc);
        }
    }
    else {
        var loc = path.join(__dirname, 'templates', 'error.html');
        res.sendFile(loc);
    }
}





module.exports.adminLogout = (req, res, next) => {
    res.clearCookie('adminId');
    res.redirect('/tw/home');
}
//admin essentials above 👆
//--------------------------------------------------//
//admin customer handle below 👇

module.exports.adminCustomer = (req, res, next) => {
    let adminId;
    if (req.get("cookie") != null) {
        let cookieArray = req.get("cookie").split(";");
        for (let i = 0; i < cookieArray.length; i++) {
            if (cookieArray[i].split("=")[0] == "adminId") {
                adminId = cookieArray[i].split("=")[1]
                break;
            }
        }
        adminId = cryptr.decrypt(adminId)
        if (adminId == 'admin@experion.com') {
            ur_db.findAll().then((next) => {
                res.render('adminCustomerIndex', { data: next })
            })
        }
        else {
            var loc = path.join(__dirname, 'templates', 'error.html');
            res.sendFile(loc);
        }
    }
    else {
        var loc = path.join(__dirname, 'templates', 'error.html');
        res.sendFile(loc);
    }
}





module.exports.adminAddUr = (req, res, next) => {
    let adminId;
    if (req.get("cookie") != null) {
        let cookieArray = req.get("cookie").split(";");
        for (let i = 0; i < cookieArray.length; i++) {
            if (cookieArray[i].split("=")[0] == "adminId") {
                adminId = cookieArray[i].split("=")[1]
                break;
            }
        }
        adminId = cryptr.decrypt(adminId)
        if (adminId == 'admin@experion.com') {
            var loc = path.join(__dirname, 'templates', 'adminAddUr.html');
            res.sendFile(loc);
        }
        else {
            var loc = path.join(__dirname, 'templates', 'error.html');
            res.sendFile(loc);
        }
    }
    else {
        var loc = path.join(__dirname, 'templates', 'error.html');
        res.sendFile(loc);
    }

}
module.exports.adminAddUrPost = (req, res, next) => {
    ur_db.create({
        fname: req.body.fname,
        lname: req.body.lname,
        gender: req.body.gender,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        street: req.body.street,
        city: req.body.city,
        zipcode: req.body.zipcode,
        dob: req.body.dob,
        password: cryptr.encrypt(req.body.password),
        verificationCode: 'A'
    })
        .then((user) => {
            console.log("user added");
            res.redirect('/tw/adminCustomer');
        }).catch((err) => {
            console.log(err);
            res.redirect('/tw/adminAddUr')
        })
}





module.exports.adminUrEdit = (req, res, next) => {
    let adminId;
    if (req.get("cookie") != null) {
        let cookieArray = req.get("cookie").split(";");
        for (let i = 0; i < cookieArray.length; i++) {
            if (cookieArray[i].split("=")[0] == "adminId") {
                adminId = cookieArray[i].split("=")[1]
                break;
            }
        }
        adminId = cryptr.decrypt(adminId)
        if (adminId == 'admin@experion.com') {
            var loc = path.join(__dirname, 'templates', 'adminAddUr.html');
            res.sendFile(loc);
        }
        else {
            var loc = path.join(__dirname, 'templates', 'error.html');
            res.sendFile(loc);
        }
    }
    else {
        var loc = path.join(__dirname, 'templates', 'error.html');
        res.sendFile(loc);
    }
}
module.exports.adminUrEditPost = (req, res, next) => {
    ur_db.update({
        fname: req.body.fname,
        lname: req.body.lname,
        gender: req.body.gender,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        street: req.body.street,
        city: req.body.city,
        zipcode: req.body.zipcode,
        dob: req.body.dob,
        password: req.body.password,
        verificationCode: 'A'
    }, {
        where: { id: req.params.id }
    }).then((next) => {
        res.redirect("/tw/adminCustomer")
    })

}





module.exports.adminUrDelete = (req, res, next) => {
    let adminId;
    if (req.get("cookie") != null) {
        let cookieArray = req.get("cookie").split(";");
        for (let i = 0; i < cookieArray.length; i++) {
            if (cookieArray[i].split("=")[0] == "adminId") {
                adminId = cookieArray[i].split("=")[1]
                break;
            }
        }
        adminId = cryptr.decrypt(adminId)
        if (adminId == 'admin@experion.com') {
            ur_db.destroy({
                where: { id: req.params.id }
            }).then((next) => {
                res.redirect("/tw/adminCustomer")
                console.log("The data of customer with id:" + req.params.id + " is deleted");
            })
        }
        else {
            var loc = path.join(__dirname, 'templates', 'error.html');
            res.sendFile(loc);
        }
    }
    else {
        var loc = path.join(__dirname, 'templates', 'error.html');
        res.sendFile(loc);
    }
}

//admin customer handling above ☝
//------------------------------------------------------//
//admin driver handling below 👇


module.exports.adminDriverIndex = (req, res, next) => {
    let adminId;
    if (req.get("cookie") != null) {
        let cookieArray = req.get("cookie").split(";");
        for (let i = 0; i < cookieArray.length; i++) {
            if (cookieArray[i].split("=")[0] == "adminId") {
                adminId = cookieArray[i].split("=")[1]
                break;
            }
        }
        adminId = cryptr.decrypt(adminId)
        if (adminId == 'admin@experion.com') {
            driver_db.findAll().then((next) => {
                res.render('adminDriverIndex', { data: next })
            })
        }
        else {
            var loc = path.join(__dirname, 'templates', 'error.html');
            res.sendFile(loc);
        }
    }
    else {
        var loc = path.join(__dirname, 'templates', 'error.html');
        res.sendFile(loc);
    }
}





module.exports.adminAddDriver = (req, res, next) => {
    let adminId;
    if (req.get("cookie") != null) {
        let cookieArray = req.get("cookie").split(";");
        for (let i = 0; i < cookieArray.length; i++) {
            if (cookieArray[i].split("=")[0] == "adminId") {
                adminId = cookieArray[i].split("=")[1]
                break;
            }
        }
        adminId = cryptr.decrypt(adminId)
        if (adminId == 'admin@experion.com') {
            var loc = path.join(__dirname, 'templates', 'adminAddDriver.html');
            res.sendFile(loc);
        }
        else {
            var loc = path.join(__dirname, 'templates', 'error.html');
            res.sendFile(loc);
        }
    }
    else {
        var loc = path.join(__dirname, 'templates', 'error.html');
        res.sendFile(loc);
    }
}
module.exports.adminAddDriverPost = (req, res, next) => {
    driver_db.create({
        fname: req.body.fname,
        lname: req.body.lname,
        gender: req.body.gender,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        street: req.body.street,
        city: req.body.city,
        zipcode: req.body.zipcode,
        dob: req.body.dob,
        licence: req.body.licence,
        password: cryptr.encrypt(req.body.password),
        verificationCode: 'A'
    })
        .then((user) => {
            console.log("user added");
            res.redirect('/tw/adminDriver');
        }).catch((err) => {
            console.log(err);
            res.redirect('/tw/adminAddDriver')
        })
}





module.exports.adminDriverEdit = (req, res, next) => {
    let adminId;
    if (req.get("cookie") != null) {
        let cookieArray = req.get("cookie").split(";");
        for (let i = 0; i < cookieArray.length; i++) {
            if (cookieArray[i].split("=")[0] == "adminId") {
                adminId = cookieArray[i].split("=")[1]
                break;
            }
        }
        adminId = cryptr.decrypt(adminId)
        if (adminId == 'admin@experion.com') {
            var loc = path.join(__dirname, 'templates', 'adminAddDriver.html');
            res.sendFile(loc);
        }
        else {
            var loc = path.join(__dirname, 'templates', 'error.html');
            res.sendFile(loc);
        }
    }
    else {
        var loc = path.join(__dirname, 'templates', 'error.html');
        res.sendFile(loc);
    }
}
module.exports.adminDriverEditPost = (req, res, next) => {
    driver_db.update({
        fname: req.body.fname,
        lname: req.body.lname,
        gender: req.body.gender,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        street: req.body.street,
        city: req.body.city,
        zipcode: req.body.zipcode,
        dob: req.body.dob,
        password: req.body.password,
        licence: req.body.licence,
        verificationCode: 'A'
    }, {
        where: { id: req.params.id }
    }).then((next) => {
        res.redirect("/tw/adminDriver")
    })
}





module.exports.adminDriverDelete = (req, res, next) => {
    let adminId;
    if (req.get("cookie") != null) {
        let cookieArray = req.get("cookie").split(";");
        for (let i = 0; i < cookieArray.length; i++) {
            if (cookieArray[i].split("=")[0] == "adminId") {
                adminId = cookieArray[i].split("=")[1]
                break;
            }
        }
        adminId = cryptr.decrypt(adminId)
        if (adminId == 'admin@experion.com') {
            driver_db.destroy({
                where: { id: req.params.id }
            }).then((next) => {
                res.redirect("/tw/adminDriver")
                console.log("The data of driver with id:" + req.params.id + " is deleted");
            })
        }
        else {
            var loc = path.join(__dirname, 'templates', 'error.html');
            res.sendFile(loc);
        }
    }
    else {
        var loc = path.join(__dirname, 'templates', 'error.html');
        res.sendFile(loc);
    }
}

//Admin driver handle above ☝
//------------------------------------------------//
//Admin cab handle below 👇

module.exports.adminCabIndex = (req, res, next) => {
    let adminId;
    if (req.get("cookie") != null) {
        let cookieArray = req.get("cookie").split(";");
        for (let i = 0; i < cookieArray.length; i++) {
            if (cookieArray[i].split("=")[0] == "adminId") {
                adminId = cookieArray[i].split("=")[1]
                break;
            }
        }
        adminId = cryptr.decrypt(adminId)
        if (adminId == 'admin@experion.com') {
            cabDetails.findAll().then((next) => {
                res.render('adminCabIndex', { data: next })
            })
        }
        else {
            var loc = path.join(__dirname, 'templates', 'error.html');
            res.sendFile(loc);
        }
    }
    else {
        var loc = path.join(__dirname, 'templates', 'error.html');
        res.sendFile(loc);
    }
}





module.exports.adminAddCab = (req, res, next) => {
    let adminId;
    if (req.get("cookie") != null) {
        let cookieArray = req.get("cookie").split(";");
        for (let i = 0; i < cookieArray.length; i++) {
            if (cookieArray[i].split("=")[0] == "adminId") {
                adminId = cookieArray[i].split("=")[1]
                break;
            }
        }
        adminId = cryptr.decrypt(adminId)
        if (adminId == 'admin@experion.com') {
            var loc = path.join(__dirname, 'templates', 'adminAddCab.html');
            res.sendFile(loc);
        }
        else {
            var loc = path.join(__dirname, 'templates', 'error.html');
            res.sendFile(loc);
        }
    }
    else {
        var loc = path.join(__dirname, 'templates', 'error.html');
        res.sendFile(loc);
    }

}
module.exports.adminAddCabPost = (req, res, next) => {
    cabDetails.create({
        model: req.body.model,
        driver_id: req.body.driver_id,
        price: req.body.price,
        numberPlate: req.body.numberPlate
    })
        .then((user) => {
            console.log("cab added");
            res.redirect('/tw/adminCab');
        }).catch((err) => {
            console.log(err);
            res.redirect('/tw/adminAddCab')
        })
}





module.exports.adminCabEdit = (req, res, next) => {
    let adminId;
    if (req.get("cookie") != null) {
        let cookieArray = req.get("cookie").split(";");
        for (let i = 0; i < cookieArray.length; i++) {
            if (cookieArray[i].split("=")[0] == "adminId") {
                adminId = cookieArray[i].split("=")[1]
                break;
            }
        }
        adminId = cryptr.decrypt(adminId)
        if (adminId == 'admin@experion.com') {
            var loc = path.join(__dirname, 'templates', 'adminAddCab.html');
            res.sendFile(loc);
        }
        else {
            var loc = path.join(__dirname, 'templates', 'error.html');
            res.sendFile(loc);
        }
    }
    else {
        var loc = path.join(__dirname, 'templates', 'error.html');
        res.sendFile(loc);
    }
}
module.exports.adminCabEditPost = (req, res, next) => {
    cabDetails.update({
        model: req.body.model,
        driver_id: req.body.driver_id,
        price: req.body.price
    }, {
        where: { id: req.params.id }
    }).then((next) => {
        res.redirect("/tw/adminCab")
    })
}





module.exports.adminCabDelete = (req, res, next) => {
    let adminId;
    if (req.get("cookie") != null) {
        let cookieArray = req.get("cookie").split(";");
        for (let i = 0; i < cookieArray.length; i++) {
            if (cookieArray[i].split("=")[0] == "adminId") {
                adminId = cookieArray[i].split("=")[1]
                break;
            }
        }
        adminId = cryptr.decrypt(adminId)
        if (adminId == 'admin@experion.com') {
            cabDetails.destroy({
                where: { id: req.params.id }
            }).then((next) => {
                res.redirect("/tw/adminCab")
                console.log("The data of Cab with id:" + req.params.id + " is deleted");
            })
        }
        else {
            var loc = path.join(__dirname, 'templates', 'error.html');
            res.sendFile(loc);
        }
    }
    else {
        var loc = path.join(__dirname, 'templates', 'error.html');
        res.sendFile(loc);
    }
}



module.exports.adminBookingIndex = (req, res, next) => {
    let adminEmail;
    if (req.get("cookie") != null) {
        let cookieArray = req.get("cookie").split(";");
        for (let i = 0; i < cookieArray.length; i++) {
            if (cookieArray[i].split("=")[0] == "adminId") {
                adminEmail = cookieArray[i].split("=")[1]
                break;
            }
        }
        adminEmail = cryptr.decrypt(adminEmail);
        if (adminEmail == 'admin@experion.com') {
            booking.findAll().then((result) => {
                console.log(result);
                res.render('adminBookingView', { data: result })
            })
        } else {
            var loc = path.join(__dirname, 'templates', 'error.html');
            res.sendFile(loc);
        }
    }
    else {
        var loc = path.join(__dirname, 'templates', 'error.html');
        res.sendFile(loc);
    }
}

// -------------------------------------------//
//Customer functions below👇

module.exports.ur = (req, res, next) => {
    var loc = path.join(__dirname, 'templates', 'ur.html');
    res.sendFile(loc);
}
module.exports.urAddOne = (req, res, next) => {
    ur_db.create({
        fname: req.body.fname,
        lname: req.body.lname,
        gender: req.body.gender,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        street: req.body.street,
        city: req.body.city,
        zipcode: req.body.zipcode,
        dob: req.body.dob,
        password: '',
        verificationCode: ''
    })
        .then((user) => {
            res.cookie('id', cryptr.encrypt(user.dataValues.id))
            res.redirect('/tw/urverify');
        })
        .catch((error) => {
            res.redirect('/tw/ur');
        })

}





module.exports.urVerify = (req, res, next) => {
    let data = req.get("cookie").split("=")[1]
    data = cryptr.decrypt(data)
    console.log(data);
    let tempCode = generateOtp();
    console.log("The new code is " + tempCode);

    ur_db.update(
        { verificationCode: tempCode },
        { where: { id: data } }
    ).catch((error) => {
        res.redirect('http://localhost:3000/tw/error');
    })


    var loc = path.join(__dirname, 'templates', 'urVerify.html');
    res.sendFile(loc);
}
module.exports.urVerifyOne = (req, res, next) => {

    let data = req.get("cookie").split("=")[1]
    data = cryptr.decrypt(data)
    let userInput = req.body.otp;
    console.log(userInput);

    ur_db.findByPk(data).then((user) => {
        if (userInput == user.dataValues.verificationCode) {
            res.redirect('/tw/urpassword')
        }
        else {
            var loc = path.join(__dirname, 'templates', 'urVerify.html');
            res.sendFile(loc);
        }
    })


}





module.exports.urPassword = (req, res, next) => {
    var loc = path.join(__dirname, 'templates', 'Password.html');
    res.sendFile(loc);
}
module.exports.urSetPassword = (req, res, next) => {
    let data = req.get("cookie").split("=")[1]
    data = cryptr.decrypt(data)
    let userInput = req.body.rpassword;
    userInput = cryptr.encrypt(userInput)

    ur_db.update(
        { password: userInput },
        { where: { id: data } }
    ).then((user) => {
        res.clearCookie("id");
        res.redirect('/tw/urLogin')
    })
        .catch((error) => {
            res.redirect('/tw/error');
        })

}





module.exports.urLogin = (req, res, next) => {
    var loc = path.join(__dirname, 'templates', 'urLogin.html');
    res.sendFile(loc);
}
module.exports.urVerifyLogin = (req, res, next) => {
    ur_db.findOne({ where: { email: req.body.email } }).then((user) => {
        if (user != null) {
            if (cryptr.decrypt(user.dataValues.password) == req.body.password) {
                res.cookie('id', cryptr.encrypt(user.dataValues.id))
                res.redirect('/tw/urHome')
            }
            else {
                var loc = path.join(__dirname, 'templates', 'urLogin.html');
                res.sendFile(loc);
            }
        }
        else {
            var loc = path.join(__dirname, 'templates', 'urLogin.html');
            res.sendFile(loc);
        }
    }).catch((err) => {
        var loc = path.join(__dirname, 'templates', 'error.html');
        res.sendFile(loc);
    })

}




module.exports.urLogout = (req, res, next) => {
    res.clearCookie('id');
    res.redirect('/tw/home')
}





module.exports.urHome = (req, res, next) => {
    let id;
    if (req.get("cookie") != null) {
        let cookieArray = req.get("cookie").split(";");
        for (let i = 0; i < cookieArray.length; i++) {
            if (cookieArray[i].split("=")[0] == "id") {
                id = cookieArray[i].split("=")[1]
                break;
            }
        }
        id = cryptr.decrypt(id)
        if (id != null) {
            var loc = path.join(__dirname, 'templates', 'urHome.html');
            res.sendFile(loc);
        }
        else {
            var loc = path.join(__dirname, 'templates', 'error.html');
            res.sendFile(loc);
        }
    }
    else {
        var loc = path.join(__dirname, 'templates', 'error.html');
        res.sendFile(loc);
    }
}
module.exports.urHomePost = (req, res, next) => {

    let distance;
    let cabPrice;
    let driverId;
    let customerId;
    let cookieArray = req.get("cookie").split(";");

    for (let i = 0; i < cookieArray.length; i++) {
        if (cookieArray[i].split("=")[0] == "id") {
            customerId = cookieArray[i].split("=")[1]
            break;
        }
    }

    customerId = cryptr.decrypt(customerId)
    console.log(customerId);        
    cabDetails.findOne({ where: { model: req.body.carModel } }).then((cabDB) => {
        cabPrice = cabDB.dataValues.price;
    }).then(
        locations.findOne({ where: { from: req.body.from, to: req.body.to } }).then((locationDB) => {
            distance = locationDB.dataValues.distance;
        }).then(
            booking.create({
                pickup: req.body.from,
                dropoff: req.body.to,
                date: req.body.pdate,
                time: req.body.ptime,
                carModel: req.body.carModel,
                customerId: customerId,
                allotedDriverId: '1'
            }).then((user) => {

                res.cookie('booking_id', cryptr.encrypt(user.dataValues.id))
                booking.update(
                    { price: (cabPrice * distance), distance: distance, driver_id: driverId },
                    { where: { id: user.dataValues.id } }
                )
                res.redirect('/tw/bookingReview');
            }).catch((error) => {
                console.log("error");
                res.redirect('/tw/urHome');
            })
        )
    )

}





module.exports.bookCab = (req, res, next) => {

    let booking_id;
    if (req.get("cookie") != null) {
        let cookieArray = req.get("cookie").split(";");
        for (let i = 0; i < cookieArray.length; i++) {
            if (cookieArray[i].split("=")[0] == " booking_id") {
                booking_id = cookieArray[i].split("=")[1]
                break;
            }
        }
        booking_id = cryptr.decrypt(booking_id)
        console.log("booking id : " + booking_id);
        booking.findOne({ where: { id: booking_id } }).then((booking_details) => {
            res.render('bookingReview', booking_details);
        })
            .catch((err) => {
                var loc = path.join(__dirname, 'templates', 'error.html');
                res.sendFile(loc);
            })
    }
    else {
        var loc = path.join(__dirname, 'templates', 'error.html');
        res.sendFile(loc);
    }
}




module.exports.paynow = (req, res, next) => {
    let booking_id;
    if (req.get("cookie") != null) {
        let cookieArray = req.get("cookie").split(";");
        for (let i = 0; i < cookieArray.length; i++) {
            if (cookieArray[i].split("=")[0] == " booking_id") {
                booking_id = cookieArray[i].split("=")[1]
                break;
            }
        }
        booking_id = cryptr.decrypt(booking_id)
        console.log("booking id : " + booking_id);
        booking.findOne({ where: { id: booking_id } }).then((booking_details) => {
            res.render('payNow', booking_details);
        })
            .catch((err) => {
                var loc = path.join(__dirname, 'templates', 'error.html');
                res.sendFile(loc);
            })
    }
    else {
        var loc = path.join(__dirname, 'templates', 'error.html');
        res.sendFile(loc);
    }
}





module.exports.downloadPdf = (req, res, next) => {
    let booking_id;
    if (req.get("cookie") != null) {
        let cookieArray = req.get("cookie").split(";");
        for (let i = 0; i < cookieArray.length; i++) {
            if (cookieArray[i].split("=")[0] == " booking_id") {
                booking_id = cookieArray[i].split("=")[1]
                break;
            }
        }
        booking_id = cryptr.decrypt(booking_id)
        console.log(booking_id);
        if (booking_id != null) {
            booking.findOne({ where: { id: booking_id } }).then((next) => {
                // createInvoice(next, "bookingPdfs/"+booking_id+".pdf");
                res.clearCookie('booking_id');
                res.render('download', next);
            })
        }
        else {
            var loc = path.join(__dirname, 'templates', 'error.html');
            res.sendFile(loc);
        }
    }
    else {
        var loc = path.join(__dirname, 'templates', 'error.html');
        res.sendFile(loc);
    }

}





module.exports.urProfile = (req, res, next) => {
    let id;
    if (req.get("cookie") != null) {
        let cookieArray = req.get("cookie").split(";");
        for (let i = 0; i < cookieArray.length; i++) {
            if (cookieArray[i].split("=")[0] == "id") {
                id = cookieArray[i].split("=")[1]
                break;
            }
        }
        id = cryptr.decrypt(id);
        if (id != null) {
            ur_db.findOne({ where: { id: id } }).then((database) => {
                console.log(next);
                res.render('userProfile', database)
            })
        }
        else {
            var loc = path.join(__dirname, 'templates', 'error.html');
            res.sendFile(loc);
        }
    }
    else {
        var loc = path.join(__dirname, 'templates', 'error.html');
        res.sendFile(loc);
    }
}





module.exports.urProfileEdit = (req, res, next) => {
    let id;
    if (req.get("cookie") != null) {
        let cookieArray = req.get("cookie").split(";");
        for (let i = 0; i < cookieArray.length; i++) {
            if (cookieArray[i].split("=")[0] == "id") {
                id = cookieArray[i].split("=")[1]
                break;
            }
        }
        id = cryptr.decrypt(id);
        if (id != null) {
            var loc = path.join(__dirname, 'templates', 'adminAddUr.html');
            res.sendFile(loc);
        }
        else {
            var loc = path.join(__dirname, 'templates', 'error.html');
            res.sendFile(loc);
        }
    }
    else {
        var loc = path.join(__dirname, 'templates', 'error.html');
        res.sendFile(loc);
    }
}
module.exports.urProfileEditPost = (req, res, next) => {
    let id;
    if (req.get("cookie").split("=")[0] == "id") {
        id = req.get("cookie").split("=")[1]
    }
    id = cryptr.decrypt(id);
    ur_db.update({
        fname: req.body.fname,
        lname: req.body.lname,
        gender: req.body.gender,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        street: req.body.street,
        city: req.body.city,
        zipcode: req.body.zipcode,
        dob: req.body.dob,
        password: req.body.password,
        verificationCode: 'U'
    }, {
        where: { id: id }
    }).then((next) => {
        res.redirect("/tw/urProfile")
    }).catch((err) => {
        var loc = path.join(__dirname, 'templates', 'error.html');
        res.sendFile(loc);
    })

}





module.exports.urBookingView = (req, res, next) => {
    let id;
    if (req.get("cookie") != null) {
        let cookieArray = req.get("cookie").split(";");
        for (let i = 0; i < cookieArray.length; i++) {
            if (cookieArray[i].split("=")[0] == "id") {
                id = cookieArray[i].split("=")[1]
                break;
            }
        }
        id = cryptr.decrypt(id);
        console.log(id);
        booking.findAll({ where: { customerId: id } }).then((result) => {
            console.log(result);
            console.log("hello");
            res.render('urViewBooking', { data: result })
        }).catch((err) => {
            var loc = path.join(__dirname, 'templates', 'error.html');
            res.sendFile(loc);
        })
    }
    else {
        var loc = path.join(__dirname, 'templates', 'error.html');
        res.sendFile(loc);
    }
}





module.exports.urDownloadOlBooking = (req, res, next) => {
    let id;
    if (req.get("cookie") != null) {
        booking.findByPk(req.params.id).then((next) => {
            res.render('download', next);
        })
    }
    else {
        var loc = path.join(__dirname, 'templates', 'error.html');
        res.sendFile(loc);
    }
}
//driver reg | below this👇
//-----------------------------------------------------//



module.exports.driverReg = (req, res, next) => {
    var loc = path.join(__dirname, 'templates', 'driverReg.html');
    res.sendFile(loc);
}
module.exports.driverRegPost = (req, res, next) => {

    driver_db.create({
        fname: req.body.fname,
        lname: req.body.lname,
        gender: req.body.gender,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        street: req.body.street,
        city: req.body.city,
        zipcode: req.body.zipcode,
        dob: req.body.dob,
        rcBook: req.body.rc,
        licence: req.body.licence,
        password: '',
        verificationCode: ''
    })
        .then((user) => {
            res.cookie('id', cryptr.encrypt(user.dataValues.id))
            res.redirect('/tw/driverVerify');
        })
        .catch((error) => {

            res.redirect('/tw/driverReg');
        })

}




module.exports.driverVerify = (req, res, next) => {

    let data = req.get("cookie").split("=")[1]
    data = cryptr.decrypt(data)
    console.log(data);
    let tempCode = generateOtp();
    console.log("The new code is " + tempCode);

    driver_db.update(
        { verificationCode: tempCode },
        { where: { id: data } }
    ).catch((error) => {
        res.redirect('http://localhost:3000/tw/error');
    })


    var loc = path.join(__dirname, 'templates', 'driverVerify.html');
    res.sendFile(loc);
}
module.exports.driverVerifyOne = (req, res, next) => {

    let data = req.get("cookie").split("=")[1]
    data = cryptr.decrypt(data)
    let userInput = req.body.otp;
    console.log(userInput);

    driver_db.findByPk(data).then((user) => {
        if (userInput == user.dataValues.verificationCode) {
            res.redirect('/tw/driverPassword')
        }
        else {
            console.log("wrong");
        }
    })


}





module.exports.driverPassword = (req, res, next) => {
    var loc = path.join(__dirname, 'templates', 'Password.html');
    res.sendFile(loc);
}
module.exports.driverSetPassword = (req, res, next) => {
    let data = req.get("cookie").split("=")[1]
    data = cryptr.decrypt(data)
    let userInput = req.body.rpassword;
    userInput = cryptr.encrypt(userInput)

    driver_db.update(
        { password: userInput },
        { where: { id: data } }
    ).then((user) => {
        res.clearCookie("id");
        res.redirect('/tw/driverLogin')
    })
        .catch((error) => {
            res.redirect('/tw/error');
        })

}





module.exports.driverLogin = (req, res, next) => {
    var loc = path.join(__dirname, 'templates', 'driverLogin.html');
    res.sendFile(loc);
}
module.exports.driverVerifyLogin = (req, res, next) => {
    driver_db.findOne({ where: { email: req.body.email } }).then((user) => {
        if (user != null) {
            if (cryptr.decrypt(user.dataValues.password) == req.body.password) {
                res.cookie('driver_id', cryptr.encrypt(user.dataValues.id))
                res.redirect('/tw/driverHome')
            }
            else {
                var loc = path.join(__dirname, 'templates', 'driverLogin.html');
                res.sendFile(loc);
            }
        }
    }).then((err) => {
        var loc = path.join(__dirname, 'templates', 'driverLogin.html');
        res.sendFile(loc);
    })

}





module.exports.driverLogout = (req, res, next) => {
    res.clearCookie("driver_id");
    res.redirect("/tw/home");
}





module.exports.driverHome = (req, res, next) => {
    let id;
    if (req.get("cookie") != null) {
        let cookieArray = req.get("cookie").split(";");
        for (let i = 0; i < cookieArray.length; i++) {
            if (cookieArray[i].split("=")[0] == "driver_id") {
                id = cookieArray[i].split("=")[1]
                break;
            }
        }
        id = cryptr.decrypt(id)
        console.log(id);
        if (id != null) {
            console.log("entered");
            driver_db.findByPk(id).then((next) => {
                res.render('driverProfile', next)
            }).catch((err) => {
                var loc = path.join(__dirname, 'templates', 'error.html');
                res.sendFile(loc);
            })
        }
        else if (id == null) {
            var loc = path.join(__dirname, 'templates', 'error.html');
            res.sendFile(loc);
        }
    }
    else {
        var loc = path.join(__dirname, 'templates', 'error.html');
        res.sendFile(loc);
    }
}





module.exports.driverProfileEdit = (req, res, next) => {
    let id;
    if (req.get("cookie").split("=")[0] == "driver_id") {
        id = req.get("cookie").split("=")[1]
    }
    id = cryptr.decrypt(id);
    if (id != null) {
        var loc = path.join(__dirname, 'templates', 'adminAddDriver.html');
        res.sendFile(loc);
    }
    else {
        var loc = path.join(__dirname, 'templates', 'error.html');
        res.sendFile(loc);
    }
}
module.exports.driverProfileEditPost = (req, res, next) => {
    let id;
    if (req.get("cookie").split("=")[0] == "driver_id") {
        id = req.get("cookie").split("=")[1]
    }
    id = cryptr.decrypt(id);
    driver_db.update({
        fname: req.body.fname,
        lname: req.body.lname,
        gender: req.body.gender,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        street: req.body.street,
        city: req.body.city,
        zipcode: req.body.zipcode,
        dob: req.body.dob,
        licence: req.body.licence,
        password: req.body.password,
    }, {
        where: { id: id }
    }).then((next) => {
        res.redirect("/tw/driverHome")
    })

}
//---------------------------------------------------//




module.exports.addLocation = (req, res, next) => {

    var loc = path.join(__dirname, 'templates', 'addLocation.html');
    res.sendFile(loc);
}
module.exports.addLocationPost = (req, res, next) => {
    locations.create({
        name: req.body.name,
        lat: req.body.latitude,
        long: req.body.longitude
    })
        .then((user) => {
            res.redirect('/tw/addlocation')
        })
}





module.exports.errorPage = (req, res, next) => {
    var loc = path.join(__dirname, 'templates', 'error.html');
    res.sendFile(loc);
}





function generateOtp() {
    var digits = '0123456789';
    let tempOtp = '';
    for (let i = 0; i < 4; i++) {
        tempOtp += digits[Math.floor(Math.random() * 10)];
    }
    return tempOtp;
}

