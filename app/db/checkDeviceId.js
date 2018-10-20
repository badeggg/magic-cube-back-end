const connection = require('./connection');
const url = require('url');
const log = require('../log');

function check(req, res, next){
  res.checkDeviceIdRst = {};
  var urlParts = url.parse(req.url, true);
  var deviceId = req.body['device_id'] || urlParts.query['device_id'];
  if(deviceId){
    res.checkDeviceIdRst.deviceIdToCheck = deviceId;
    connection.query(`SELECT device_id, id FROM user WHERE device_id='${deviceId}'`, (err, result)=>{
      if(err) {
        log.err(err);
        res.checkDeviceIdRst.error = 'db down'; next()
      };
      if(result && result.length > 0){
        res.checkDeviceIdRst.id = result[0].id;
        res.checkDeviceIdRst.inDb = true;
      } else{
        res.checkDeviceIdRst.inDb = false;
      }
      next();
    });
  } else{
    next();
  }
}

module.exports = check;
