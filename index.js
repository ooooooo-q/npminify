var rollup = require('rollup');
var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var uglify = require('rollup-plugin-uglify');

var dir = __dirname + "/node_modules/rollup";
var pjson = require(dir+"/package.json");
var main = dir + "/"+(pjson.main || "index.js")
main = dir + "/src/rollup.js"
var dependencies = Object.keys(pjson.dependencies).map(function(i,x){return i;});
var devDependencies = Object.keys(pjson.devDependencies).map(function(i,x){return i;});

rollup.rollup({
  entry: main,
  plugins: [
    nodeResolve({main:true, preferBuiltins: true, skip:dependencies.concat(devDependencies)}),
    commonjs({include: '**'}),
    // uglify()
  ]
}).then( function ( bundle ) {
  console.log(bundle)
  bundle.write({
    format: 'cjs',
    dest: 'bundle.js'
  });
}).then(function(){
  console.log("done")
}).catch(function(err){
  console.log(err);
});