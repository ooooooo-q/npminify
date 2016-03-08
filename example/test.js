var npminify = require('../index.js');

var unpack = require('tar-pack').unpack
var pack = require('tar-pack').pack;
var write = require('fs').createWriteStream

var RegClient = require('npm-registry-client');
var client = new RegClient({});
var tarball = 'http://registry.npmjs.org/npm-registry-client/-/npm-registry-client-7.1.0.tgz';

var sourceDir = __dirname + '/source/';
var destDir = __dirname + '/dest/package_name';
var result = __dirname + '/distiled_tarball.tgz';

client.fetch(tarball, {}, function(err, res){

  if (err){
    console.error(err.stack)
    return;
  }

  res.pipe(unpack(sourceDir, function (err) {
    if (err){
      console.error(err.stack)
      return;
    }

    npminify.distil(sourceDir, destDir)
    .then(function(){
      pack(destDir)
      .pipe(write(result))
      .on('error', function (err) {
        console.error(err.stack)
      })
      .on('close', function () {
        console.log('done')
      })
    }).catch(function(err){
        console.error(err.stack)
    });
  }));
});  