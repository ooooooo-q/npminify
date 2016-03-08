var list = require('./list');
module.exports = function(sourceDir, destDir, options){

  return list(sourceDir)
  .then(function(list){
    // todo copy
    console.log(list) 

  });
}
