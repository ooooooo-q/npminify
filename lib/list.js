var rollup = require('rollup');
var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');


module.exports = function(dir){

  var pjson = require(dir+"/package.json");
  var main = dir + "/"+(pjson.main || "index.js")

  var dependencies = Object.keys(pjson.dependencies).map(function(i,x){return i;});
  var devDependencies = Object.keys(pjson.devDependencies).map(function(i,x){return i;});
  var optionalDependencies = Object.keys(pjson.optionalDependencies).map(function(i,x){return i;});
  var skips = dependencies.concat(devDependencies).concat(optionalDependencies);

  return rollup.rollup({
    entry: main,
    plugins: [
      nodeResolve({
        main:true,
        preferBuiltins: true,
        skip: skips
      }),
      commonjs({include: dir +'/**'}),
    ]
  }).then( function ( bundle ) {
    return bundle.modules;
  });
}


