var require = {
    baseUrl: "./Scripts",
    preserveLicenseComments: false,
    inlineJSON: false,
    paths: {
        "text": "libs/require/text", //Automatically loaded when a text! dependency is used
        "json": "libs/require/json", //Depends on text plugin


        //Third party libs
      
        "hammer": "libs/hammer/hammer"
    
    },
    shim: {
       
    },	
    map: {
       
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