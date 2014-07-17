/**
 * A client for Naver Search API on Node.js
 * Copyright(c) 2014 Michael Shim <imapp.help@gmail.com>
 * Source covered by the MIT License
 */

var request = require('request'),
    url = require('url'),
    _ = require('underscore'),
    qs = require('querystring'),
	parseString = require('xml2js').parseString;

var NaverSearch = function( options ) {

    if( !(this instanceof NaverSearch) ) return new NaverSearch( options );

    //Endpoint NaverSearch API REST GET
    this.endpoint = "http://openapi.naver.com/search";
    this.timeout = 15000;

    var defaults = {
    	// key
    	key : options.key,
        //target: blog,book,adult,news,encyc,movie,cafearticle,kin,errata,webkr,image,shop,doc
        target: "news",
        //display (10-100)
        display: 10,
        //start offset(1-1000) 
        start: 1, 
        //sort string:sim(by similarity), date(by date)
        sort: 'sim'
    };

    //merge options passed in with defaults
    this.options = _.extend(defaults, options);
}


NaverSearch.prototype.search = function(query, options, callback) {
 
     if(typeof callback != 'function') {

        throw "Erorr: Callback function required!"; 
        return;
     }

     var opts = this.options;

     if(options != null) {
        opts = _.extend(this.options, options);
     }

     var uri = this.endpoint + '?' +
     	'query=' + qs.escape(query) + '&' + qs.stringify(opts);

     request({

          uri: uri,
          method: "GET",
//          headers: {
//          },
          timeout: this.timeout
     }, function(error, response, body){

          if(!error && response.statusCode >= 200 && response.statusCode < 300) {

        	 parseString(body, function (err, result) {
                 var data = result;
                 callback( error, response, data );
        	 });        	  

          } else {
            callback(error, response, body); 
          }
     });
}

module.exports = NaverSearch