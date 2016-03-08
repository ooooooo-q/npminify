var list = require('./list');
var fse = require('fs-extra')

module.exports = function(sourceDir, destDir, options){

  return list(sourceDir)
  .then(function(list){
    list.forEach(function(obj){
      var filePath = obj.id;
      var relativePath = filePath.replace(sourceDir, "");
      var destFilePath = destDir + relativePath;
      fse.copySync(filePath, destFilePath);
    })
  });
}
