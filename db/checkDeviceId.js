const connection = require('./connection');

function check(req, res, next){
  res.checkDeviceIdRst = {};
  if(req.body['device_id']){
    res.checkDeviceIdRst.deviceIdToCheck = req.body['device_id'];
    connection.query(`SELECT device_id, id FROM user WHERE device_id='${req.body.device_id}'`, (err, result)=>{
      if(err) {res.checkDeviceIdRst.error = 'db down'; next()};
      if(result.length > 0){
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
