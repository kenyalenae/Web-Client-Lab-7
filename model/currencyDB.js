var request = require('request');

var baseURL = 'http://api.fixer.io/latest';

function currencyRequest(callback, base, to) {

    process.nextTick(function() {   // This forces this call to wait until the current task
                                    //has finished, so it's doesn't block any other requests.
                                    //When it's done, it will use the callback to notify the caller that it's done.

        // TODO include your API key in the query parameters
        queryParam = { 'base': base,  'symbols': to };
        var APIKEY = '39117021ab5a9b1932629f3e967cd09c';
        if (type && type.toLowerCase() === 'random') {
            queryParam = { api_key : APIKEY,  date: randomDateString()  };
        }
        else {
            queryParam = { api_key : APIKEY};
        }

        //Use request module to request currency data from Fixer API
        //Must handle result in callback. Can't return data from an asychronous function.
        request( { uri: baseURL, qs: queryParam } , function(error, fixer_response, body) {

            if (!error && fixer_response.statusCode == 200){
                console.log("FIXER SAYS \n" + JSON.stringify(body));
                var fixerJSON = JSON.parse(body);   //Convert JSON text to a JavaScript object
                callback(null, fixerJSON);
            }

            else {
                //Log error info to console and use callback to send error with message.
                console.log("Error in JSON request: " + error);
                console.log(fixer_response);
                callback(Error("Error fetching data from the fixer service"));
            }
        });
    });
}

module.exports = currencyRequest;