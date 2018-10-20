const fs = require('fs');
const path = require('path');

function err(data){
  let date = new Date();
  let dateStr = '' + date.getFullYear() + (date.getMonth() + 1);
  let fileName = dateStr + '.err.log';
  fs.appendFile(
    path.resolve(__dirname, '../../log/' + fileName), 
    date.toString() + ' ' + JSON.stringify(data) + '\n', 
    (err)=>{if(err) throw err;}
  );
}

module.exports = { err };
