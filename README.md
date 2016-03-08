# npminify

To minify npm modules.


## Usage


```
var npminify = require('npminify');
npminify.distil(__dirname + '/source/package_name', __dirname + '/dist/package_name');
```

#### tarball distill with npm client.

```
var npminify = require('npminify');
var RegClient = require('npm-registry-client');
var unpack = require('tar-pack').unpack

var pack = require('tar-pack').unpack
var write = require('fs').createWriteStream

var client = new RegClient({});
var tarball = 'http://registry.npmjs.org/npm-registry-client/-/npm-registry-client-7.1.0.tgz';

var sourceDir = __dirname + '/source/';
var destDir = __dirname + '/dest/package_name';
var result = __dirname + 'distiled_tarball.tgz';

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
    });
  }));
});  
```



## API


### distil(sourceDir, destDir, options) 

To distil module. return `Promise<void>`


### list(path, options)

get the module files. return `Promise<Array<string>>`


## todo

- [ ] examples or tests
- [ ] uglify option
- [ ] bundle option
- [ ] skip options(license, package name, postinstall ..)
- [ ] detect dynamic require filenames





