var require = {
    baseUrl: "./Scripts",
    preserveLicenseComments: false,
    inlineJSON: false, //Turn off bundling API calls
    paths: {
        "text": "libs/require/text", //Automatically loaded when a text! dependency is used
        "json": "libs/require/json" //Depends on text plugin
    },
    shim: {
      
    },
    map: {
       
    },
    config: {
        text: {
            useXhr: function (url, protocol, hostname, port) {
                // allow cross-domain requests
                // remote server allows CORS
                return true;
            }
        }
    },
    onError: function(err) {
        switch (err.requireType) {
            case 'scripterror':
                console.error("RequireJS script error: " + err.message);
                break;

            case 'timeout':
                console.error("RequireJS timeout: " + err.message);
                break;

            default:
                console.error("Unknown RequireJS error: " + err.message);
        }

        throw err;
    }
}