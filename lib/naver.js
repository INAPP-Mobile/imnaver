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

var NaverSearch = function() {

    if( !(this instanceof NaverSearch) ) return new NaverSearch();

    //Endpoint NaverSearch API REST GET
    this.endpoint = "https://openapi.naver.com/v1/search/news.xml";
    this.timeout = 15000;

    var defaults = {
        //display (10-100)
        display: 10,
        //start offset(1-1000) 
        start: 1, 
        //sort string:sim(by similarity), date(by date)
        sort: 'sim'
    };

    this.options = defaults;
}

NaverSearch.prototype.search = function(query, options, callback) {
 
     if(typeof callback != 'function') {
        throw "Erorr: Callback function required!"; 
     }

     var opts = this.options;

     if(options) {
        opts = _.extend(this.options, options);
     }

     var uri = this.endpoint + '?' +
     	'query=' + qs.escape(query) + '&' + qs.stringify(opts);
//console.log('URI:::: '+uri);     
     
     request({
          uri: uri,
          method: "GET",
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/xml',
            'X-Naver-Client-Id': options.id,
            'X-Naver-Client-Secret': options.secret
          },
          timeout: this.timeout
     }, function(error, response, body){
          if(!error && response.statusCode >= 200 && response.statusCode < 300) {

        	 parseString(body, function (err, result) {
                 var data = result;
                 callback( error, response, data );
        	 });        	  

          } else {
        	  
//console.log('###error :::' + error);

            callback(error, response, body); 
          }
     });
}

module.exports = NaverSearch