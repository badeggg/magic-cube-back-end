const router = require('express').Router();
const db = require('../../db');
const log = require('../../log');

router.post('/add', db.checkDeviceid, (req, res)=>{
  if(req.body['device_id']){
    if(res.checkDeviceIdRst.error){
      res.status(503).send('err: ' + res.checkDeviceIdRst.error + '\n');
    } else if(res.checkDeviceIdRst.inDb){
      res.send('already exist.\n');
    } else{
      db.connection.query(`INSERT INTO user (device_id) VALUES ('${req.body['device_id']}');`, (err, result)=>{
        if(err){
          log.err(err);
          res.status(503).send('db down\n')
        } else{
          res.send('ok saved.\n');
        }
      });
    }
  } else{
    res.status(422).send('err: device_id is required in json.\n');
  }
});

module.exports = router;
