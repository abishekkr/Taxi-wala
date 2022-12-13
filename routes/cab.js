const express = require('express');
const { getRoughCompassDirection } = require('geolib');
const { rotate } = require('pdfkit');
const cc =require('../controllers/cabControllers');
const router = express.Router();




router.get('/home',cc.home);

        //Admin below 👇
//************************************//
router.get('/adminLogin',cc.adminLogin);
router.post('/adminLogin',cc.adminLoginVerify);

router.get('/adminHome',cc.adminHome);

router.get('/adminLogout',cc.adminLogout);

    //Admin customer handling below 👇
//****************************************//
router.get('/adminCustomer',cc.adminCustomer);

router.get('/adminAddUr',cc.adminAddUr);
router.post('/adminAddUr',cc.adminAddUrPost);

router.get('/editUr/:id', cc.adminUrEdit);
router.post('/editUr/:id', cc.adminUrEditPost);

router.get('/deleteUr/:id', cc.adminUrDelete);

        //Admin driver handling below 👇
// ******************************************//
router.get('/adminDriver',cc.adminDriverIndex);

router.get('/adminAddDriver',cc.adminAddDriver);
router.post('/adminAddDriver',cc.adminAddDriverPost);

router.get('/editDriver/:id', cc.adminDriverEdit);
router.post('/editDriver/:id', cc.adminDriverEditPost);

router.get('/deleteDriver/:id', cc.adminDriverDelete);

        //Admin cab handling below👇
//**********************************************//
router.get('/adminCab',cc.adminCabIndex);

router.get('/adminAddCab',cc.adminAddCab);
router.post('/adminAddCab',cc.adminAddCabPost);

router.get('/editCab/:id', cc.adminCabEdit);
router.post('/editCab/:id', cc.adminCabEditPost);

router.get('/deleteCab/:id', cc.adminCabDelete);

        //Admin booking handling below👇
//**********************************************//
router.get('/adminBooking',cc.adminBookingIndex);

        //User access below 👇
//***************************************//
router.get('/ur',cc.ur);
router.post('/ur',cc.urAddOne);

router.get('/urverify',cc.urVerify);
router.post('/urverify',cc.urVerifyOne);

router.get('/urpassword',cc.urPassword);
router.post('/urpassword',cc.urSetPassword);
    
router.get('/error',cc.errorPage);

router.get('/urlogin',cc.urLogin);
router.post('/urlogin',cc.urVerifyLogin);

router.get('/urLogout',cc.urLogout);

router.get('/urHome',cc.urHome);
router.post('/urHome',cc.urHomePost);

router.get('/bookingReview',cc.bookCab);

router.get('/paynow',cc.paynow);

router.get('/downloadPdf',cc.downloadPdf);

router.get('/urProfile',cc.urProfile);

router.get('/urProfileEdit',cc.urProfileEdit);
router.post('/urProfileEdit',cc.urProfileEditPost);

router.get('/urBookingView',cc.urBookingView);

router.get('/urDownloadOlBooking/:id',cc.urDownloadOlBooking);

// -------------------------------------//

router.get('/driverReg',cc.driverReg)
router.post('/driverReg',cc.driverRegPost)

router.get('/driverVerify',cc.driverVerify);
router.post('/driverVerify',cc.driverVerifyOne);

router.get('/driverPassword',cc.driverPassword);
router.post('/driverPassword',cc.driverSetPassword);

router.get('/driverLogin',cc.driverLogin);
router.post('/driverLogin',cc.driverVerifyLogin);

router.get('/driverLogout',cc.driverLogout);

router.get('/driverHome',cc.driverHome);

router.get('/driverProfileEdit',cc.driverProfileEdit);
router.post('/driverProfileEdit',cc.driverProfileEditPost);

//------------------------------------------//
router.get('/addlocation',cc.addLocation);
router.post('/addlocation',cc.addLocationPost);

module.exports = router;
