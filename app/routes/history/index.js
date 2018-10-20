const router = require('express').Router();
const { checkDeviceid } = require('../../db');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const historyPath = path.resolve(__dirname, '../../../player-history');
const historySuffix = '.mgcb.history';

router.route('/')
  .get(checkDeviceid, (req, res)=>{
    if(res.checkDeviceIdRst.deviceIdToCheck){
      if(res.checkDeviceIdRst.error){
        res.status(503).send('err: ' + res.checkDeviceIdRst.error + '\n');
      } else if(res.checkDeviceIdRst.inDb){
        const id = res.checkDeviceIdRst.id.toString();
        const md5Sum = crypto.createHash('md5').update(id).digest("hex");
        fs.readFile(path.resolve(historyPath, md5Sum+historySuffix), (err, data)=>{
          if(err){
            res.status(500).send('err: failed to read history file\n');
          } else{
            res.json(data.toString());
          }
        });
      } else{
        res.status(451).send('err: user is not added\n');
      }
    } else{
      res.status(422).send('err: device_id is required\n');
    }
  })
  .put(checkDeviceid, (req, res)=>{
    if(req.body['device_id'] && req.body['data']){
      if(res.checkDeviceIdRst.error){
        res.status(503).send('err: ' + res.checkDeviceIdRst.error + '\n');
      } else if(res.checkDeviceIdRst.inDb){
        const id = res.checkDeviceIdRst.id.toString();
        const md5Sum = crypto.createHash('md5').update(id).digest("hex");
        fs.writeFile(path.resolve(historyPath, md5Sum+historySuffix), JSON.stringify(req.body['data']), (err)=>{
          if(err){
            res.status(500).send('err: failed to save history file\n');
          } else{
            res.send('ok, history saved.\n');
          }
        });
      } else{
        res.status(451).send('err: user is not added\n');
      }
    } else{
      res.status(422).send('err: device_id and history data are both required\n');
    }
  });

module.exports = router;
