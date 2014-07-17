# imnaver

A client wrapper for Naver Search OPEN API 

refer to http://developer.naver.com/wiki/pages/SrchAPI for more information

# Installation

```
$ npm install imnaver
```

# Usage
```

var naver = require('imnaver');
var b = NaverSearch({key:'your-api-key'});

b.search('INAPP', {target: 'news'}, function(error, response, body){

	if ( !error ) {
    	console.log(body.rss.channel.item[0].title) ;
    	console.log(body.rss.channel.item[0].description) ;
    }
	else
		console.log(error);
});

```

# GIT

https://github.com/INAPP-Mobile/imnaver.git

# License

MIT
