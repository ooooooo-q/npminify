// var npminify = require('../index.js');

var RegClient = require('npm-registry-client')
var client = new RegClient({})
var uri = "https://registry.npmjs.org/npm-registry-client"
var params = {timeout: 1000}

client.get(uri, params, function (error, data, raw, res) {
	var last = data["dist-tags"]["latest"];
	var dist = data["versions"][last]["dist"];
	 console.log(dist);	

	client.fetch(dist.tarball, {}, function(err, res){
		// console.log(arguments);

		var unpack = require('tar-pack').unpack
		res.pipe(unpack(__dirname + '/package/', function (err) {
		    if (err) console.error(err.stack)
		    else console.log('done')
		  }))
	});
})