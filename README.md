# npminify

To minify npm modules.


## Usage


```
var npminify = require('npminify');
npminify.distil(__dirname + '/source/package_name', __dirname + '/dist/package_name')
.then(function() { ... })
```

#### distill tarball

full source `/example/test.js`

```
var unpack = require('tar-pack').unpack
var pack = require('tar-pack').pack
var write = require('fs').createWriteStream

var sourceDir = __dirname + '/source/';
var destDir = __dirname + '/dest/package_name';
var result = __dirname + '/distiled_tarball.tgz';

tarballResponse.pipe(unpack(sourceDir,minify));  

var minify = function(){
  npminify.distil(sourceDir, destDir)
  .then(function(){  
    pack(destDir).pipe(write(result)));
  });
}
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





