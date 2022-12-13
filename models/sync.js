const Customer = require('./ur');
const booking = require('./bookings');
const driver = require('./driver');
const locations = require('./locations');
const cabDetails = require('./cabDetails');
const { fillAndStroke } = require('pdfkit');


Customer.sync({alter:true});
driver.sync({alter:true});
locations.sync({alter:true});
booking.sync({alter:true});
cabDetails.sync({alter:true})