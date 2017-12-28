const fs = require('fs');
const path = require('path');
const imageInfo = require('image-info');


const target = path.join(process.env.localappdata, "\\Packages\\Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy\\LocalState\\Assets\\");
const src = path.join(process.env.userprofile, 'Pictures\\spotlight');

try {
  const s = fs.statSync(src);
  if (!s.isDirectory()) {
    fs.mkdirSync(src);
  }
} catch (error) {
  fs.mkdirSync(src);
}

const files = fs.readdirSync(target);

files.forEach(file => {

  const stats = fs.statSync(path.join(target, file));

  if (stats.isFile()) {

    fs.readFile(path.join(target, file), readFileCb(err, data))
  }
})

function readFileCb(err, data){

      const tempData = data.slice(0, 7);
      let filename;

      if (tempData.indexOf(Buffer.from('FFD8FF', "hex")) != -1) {

        filename = path.join(src, file + ".jpg");

      } else if (tempData.indexOf(Buffer.from('89504E47', 'hex')) != -1) {

        filename = path.join(src, file + ".png");
      }

      if (filename) {

        fs.writeFile(filename, data, writeFileCb(err));

      }

    }


    function writeFileCb(err){

          if (err) console.log(err);
          imageInfo(filename, (err, info) => {
            var wh=info.height/info.width;
            if(wh==1){
                fs.unlink(filename,(err)=>{
                    if(err){console.log(err)}
                })
            }
          })
        
    }