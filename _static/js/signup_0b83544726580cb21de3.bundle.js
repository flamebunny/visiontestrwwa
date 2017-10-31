webpackJsonp([7,10],{

/***/ 108:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (ko, jQuery) {
    ko.bindingHandlers.jqMobiRefresh = {
        update : function(element, valueAccessor, allBindings){
            var $element = jQuery(element);

            var temp = valueAccessor();

            if(typeof temp == "string")
            {
                $element.on(temp, function(){
                    $element[allBindings().elementType]("refresh");
                })
            }
            else
            {
                var value = ko.utils.unwrapObservable(valueAccessor());

                if(value)
                {
                    $element[allBindings().elementType]("refresh");
                    valueAccessor()(false);
                }
            }
        }
    }
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 142:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6), __webpack_require__(0), __webpack_require__(24), __webpack_require__(55)], __WEBPACK_AMD_DEFINE_RESULT__ = function (amplify, $, viewModelLocator, analyticsService) {
    var Router = function () {
        // Force new object
        var self = this instanceof Router
            ? this
            : Object.create(Router.prototype);

        // Properties
        self.currentRoute = null;
        self.routes = {};

        // Binding Prototypes
        self.addRoute = self.addRoute.bind(self);
        self.getRoute = self.getRoute.bind(self);
        self.removeRoute = self.removeRoute.bind(self);
        self.clearRoutes = self.clearRoutes.bind(self);
        self.nextRoute = self.nextRoute.bind(self);
        self.previousRoute = self.previousRoute.bind(self);

        // Default Constructor
        var init = function () {
            analyticsService.start();
            amplify.subscribe("signup.next", function (data) {
                self.nextRoute(data);
            });

            amplify.subscribe("signup.previous", function () {
                self.previousRoute();
            });
        };
        init();
    };

    // Prototype Properties
    Router.prototype = function () {

        var routeList = new Array();

        var 
            addRoute = function (route) {
                route.viewModel = route.viewModel || route.route;
                var name = route.viewModel;
                this.routes[name] = route;
            },
            getRoute = function (name) {
                var route = this.routes[name];
                return route;
            },
            setCurrentRoute = function (name) {
                this.currentRoute = this.getRoute(name);
            },
            removeRoute = function (name) {
                if (typeof routes[name] !== "undefined") {
                    delete routes[name];
                }
            },
            clearRoutes = function () {
                this.hasPrevious(false);
                this.hasNext(false);
            },
            nextRoute = function (data) {
                var viewModel = viewModelLocator.findViewModel(this.currentRoute.viewModel);
                var self = this;
                var success = function (nextPage, options) {
                    if (typeof nextPage !== "undefined" && nextPage !== null) {
                        routeList.push(self.currentRoute.route);
                        amplify.publish('signup.leaving', { page: self.currentRoute.route });
                        self.setCurrentRoute(nextPage);
                        var routeUrl = self.currentRoute.route;
                        $.mobile.changePage("#" + routeUrl, { transition: "slide", reverse: false, changeHash: false });
                        var newViewModel = viewModelLocator.findViewModel(self.currentRoute.viewModel);
                        newViewModel && newViewModel.activate && newViewModel.activate(options);
                        amplify.publish('signup.navigate', nextPage);
                    }
                };
                viewModel.deActivate(success, data);
            },
            previousRoute = function () {
                var previousPage = routeList.pop();
                this.setCurrentRoute(previousPage);
                var routeUrl = this.currentRoute.route;
                $.mobile.changePage("#" + routeUrl, { transition: "slidefade", reverse: true, changeHash: false });
                var viewModel = viewModelLocator.findViewModel(this.currentRoute.viewModel);
                viewModel && viewModel.activate && viewModel.activate();
            },
            start = function () {
                if (typeof this.currentRoute !== "undefined") {
                    var viewModel = viewModelLocator.findViewModel(this.currentRoute.viewModel);
                    $.mobile.changePage("#" + this.currentRoute.route, { transition: "slide", reverse: false, changeHash: false });
                    viewModel.activate && viewModel.activate();
                    routeList.push(this.currentRoute.route);
                }
            };
        return {
            addRoute: addRoute,
            getRoute: getRoute,
            setCurrentRoute: setCurrentRoute,
            removeRoute: removeRoute,
            clearRoutes: clearRoutes,
            nextRoute: nextRoute,
            previousRoute: previousRoute,
            start: start
        };
    } ();

    //Note: This module exports a function. That means that you, the developer, can create multiple instances.
    //If you wish to create a singleton, you should export an object instead of a function.

    return new Router();
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 143:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(_) {

    return function (viewModel, fieldNamePrefix) {
        fieldNamePrefix = fieldNamePrefix || "";
        return _(viewModel)
            .chain()
                .map(function(observable, key) {
                     return {
                         fieldName: key,
                         observable: observable,
                         errorFn: observable.error || (!!observable.pendingValue && observable.pendingValue.error)
                     };
                })
                .filter(function(x) { return !!x.observable.isValid && !!x.errorFn && !x.observable.isValid() })
                .map(function (x) { return { feildName: fieldNamePrefix +  x.fieldName, errorMessage: x.errorFn() }; })
            .value();
    }
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 144:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(0), __webpack_require__(39), __webpack_require__(38), __webpack_require__(226), __webpack_require__(225), __webpack_require__(108)], __WEBPACK_AMD_DEFINE_RESULT__ = function (ko, jquery, moment, validation, validDate, minimumAge) {
    var ComboBoxDate = function (options) {
        // Force new object
        var self = this instanceof ComboBoxDate
            ? this
            : Object.create(ComboBoxDate.prototype);

        // Configurational Settings
        var configOptions = options || {
            enableMinimumAge: true,
            minimumAgeLimit: 18
        };

        //Properties
        self.enabled = ko.observable(true);
        self.month = ko.observable();
        self.year = ko.observable();
        self.day = ko.observable();
        self.dayIsStale = ko.observable(false);

        self.date = ko.computed(function () {
            var day = self.day(),
                month = self.month() - 1,
                year = self.year();
            return new Date(year, month, day);
        }, self);

        self.numberOfDays = ko.computed(function () {
            if (self.year() && self.month()) {
                var newDaysInMonth = new Date(self.year(), self.month(), 0).getDate();
                if (self.day() && self.day() > newDaysInMonth) {
                    self.day(newDaysInMonth);
                    self.dayIsStale(true);
                }
            }

            return newDaysInMonth;
        });

        self.refreshSelectMenu = function () {
            jQuery(this).selectmenu("refresh");
        };

        // Validation
        self.day.extend({
            required: {
                params: true,
                onlyIf: function () { return (self.enabled() === true); }
            }
        });

        self.month.extend({
            required: {
                params: true,
                onlyIf: function () { return (self.enabled() === true); }
            }
        });

        self.year.extend({
            required: {
                params: true,
                onlyIf: function () { return (self.enabled() === true); }
            }
        });

        self.date.extend({
            required: {
                params: true,
                onlyIf: function () { return (self.enabled() === true); }
            },
            validDate: {
                params: {
                    day: function () {
                        return self.day();
                    },
                    month: function () {
                        return self.month();
                    },
                    year: function () {
                        return self.year();
                    }
                },
                onlyIf: function () { return (self.enabled() === true); }
            }
        });
        self.isMinimumAge = ko.computed(function () {
            var date = self.date();
            if (configOptions.enableMinimumAge === true && self.date.isValid() === true) {
                var now = moment();
                var ageValue = moment(date);
                return (now.diff(ageValue, 'years', true) >= configOptions.minimumAgeLimit);
            }
            return null;
        }, self);
        self.isMinimumAge.extend({
            mustEqual: {
                params: true,
                message: "You don't meet the minimum age requirements.",
                onlyIf: function () { return (configOptions.enableMinimumAge === true); }
            }
        });

        // Binding Prototypes
        self.reset = self.reset.bind(self);

        // Default Constructor
        var init = function () {
            self.reset();
            ko.validatedObservable(self);
        };
        init();

    };

    // Prototype Properties
    ComboBoxDate.prototype = function () {
        var reset = function () {
            this.enabled(true);
            this.day(null);
            this.month(null);
            this.year(null);
        };
        return {
            reset: reset
        };
    } ();
    //Note: This module exports a function. That means that you, the developer, can create multiple instances.
    //If you wish to create a singleton, you should export an object instead of a function.

    return ComboBoxDate;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 145:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿/**
 * AMD version of the Recaptcha library. Inserts itself into window namespace and returns itself at end.
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
    var RecaptchaTemplates = {}; RecaptchaTemplates.VertHtml = '<table id="recaptcha_table" class="recaptchatable" > <tr> <td colspan="6" class=\'recaptcha_r1_c1\'></td> </tr> <tr> <td class=\'recaptcha_r2_c1\'></td> <td colspan="4" class=\'recaptcha_image_cell\'><div id="recaptcha_image"></div></td> <td class=\'recaptcha_r2_c2\'></td> </tr> <tr> <td rowspan="6" class=\'recaptcha_r3_c1\'></td> <td colspan="4" class=\'recaptcha_r3_c2\'></td> <td rowspan="6" class=\'recaptcha_r3_c3\'></td> </tr> <tr> <td rowspan="3" class=\'recaptcha_r4_c1\' height="49"> <div class="recaptcha_input_area"> <input name="recaptcha_response_field" id="recaptcha_response_field" type="text" autocorrect="off" autocapitalize="off" placeholder="" /> <span id="recaptcha_privacy" class="recaptcha_only_if_privacy"></span> </div> </td> <td rowspan="4" class=\'recaptcha_r4_c2\'></td> <td><a id=\'recaptcha_reload_btn\'><img id=\'recaptcha_reload\' width="25" height="17" /></a></td> <td rowspan="4" class=\'recaptcha_r4_c4\'></td> </tr> <tr> <td><a id=\'recaptcha_switch_audio_btn\' class="recaptcha_only_if_image"><img id=\'recaptcha_switch_audio\' width="25" height="16" alt="" /></a><a id=\'recaptcha_switch_img_btn\' class="recaptcha_only_if_audio"><img id=\'recaptcha_switch_img\' width="25" height="16" alt=""/></a></td> </tr> <tr> <td><a id=\'recaptcha_whatsthis_btn\'><img id=\'recaptcha_whatsthis\' width="25" height="16" /></a></td> </tr> <tr> <td class=\'recaptcha_r7_c1\'></td> <td class=\'recaptcha_r8_c1\'></td> </tr> </table> '; RecaptchaTemplates.CleanCss = ".recaptchatable td img{display:block}.recaptchatable .recaptcha_image_cell center img{height:57px}.recaptchatable .recaptcha_image_cell center{height:57px}.recaptchatable .recaptcha_image_cell{background-color:white;height:57px;padding:7px!important}.recaptchatable,#recaptcha_area tr,#recaptcha_area td,#recaptcha_area th{margin:0!important;border:0!important;border-collapse:collapse!important;vertical-align:middle!important}.recaptchatable *{margin:0;padding:0;border:0;color:black;position:static;top:auto;left:auto;right:auto;bottom:auto}.recaptchatable #recaptcha_image{margin:auto;border:1px solid #dfdfdf!important}.recaptchatable a img{border:0}.recaptchatable a,.recaptchatable a:hover{cursor:pointer;outline:none;border:0!important;padding:0!important;text-decoration:none;color:blue;background:none!important;font-weight:normal}.recaptcha_input_area{position:relative!important;background:none!important}.recaptchatable label.recaptcha_input_area_text{border:1px solid #dfdfdf!important;margin:0!important;padding:0!important;position:static!important;top:auto!important;left:auto!important;right:auto!important;bottom:auto!important}.recaptcha_theme_red label.recaptcha_input_area_text,.recaptcha_theme_white label.recaptcha_input_area_text{color:black!important}.recaptcha_theme_blackglass label.recaptcha_input_area_text{color:white!important}.recaptchatable #recaptcha_response_field{font-size:11pt}.recaptcha_theme_blackglass #recaptcha_response_field,.recaptcha_theme_white #recaptcha_response_field{border:1px solid gray}.recaptcha_theme_red #recaptcha_response_field{border:1px solid #cca940}.recaptcha_audio_cant_hear_link{font-size:7pt;color:black}.recaptchatable{line-height:1em;border:1px solid #dfdfdf!important}.recaptcha_error_text{color:red}.recaptcha_only_if_privacy{float:right;text-align:right;margin-right:7px}"; RecaptchaTemplates.CleanHtml = '<table id="recaptcha_table" class="recaptchatable"> <tr height="73"> <td class=\'recaptcha_image_cell\' width="302"><center><div id="recaptcha_image"></div></center></td> <td style="padding: 10px 7px 7px 7px;"> <a id=\'recaptcha_reload_btn\'><img id=\'recaptcha_reload\' width="25" height="18" alt="" /></a> <a id=\'recaptcha_switch_audio_btn\' class="recaptcha_only_if_image"><img id=\'recaptcha_switch_audio\' width="25" height="15" alt="" /></a><a id=\'recaptcha_switch_img_btn\' class="recaptcha_only_if_audio"><img id=\'recaptcha_switch_img\' width="25" height="15" alt=""/></a> <a id=\'recaptcha_whatsthis_btn\'><img id=\'recaptcha_whatsthis\' width="25" height="16" /></a> </td> <td style="padding: 18px 7px 18px 7px;"> <img id=\'recaptcha_logo\' alt="" width="71" height="36" /> </td> </tr> <tr> <td style="padding-left: 7px;"> <div class="recaptcha_input_area" style="padding-top: 2px; padding-bottom: 7px;"> <input style="border: 1px solid #3c3c3c; width: 302px;" name="recaptcha_response_field" id="recaptcha_response_field" type="text" /> </div> </td> <td colspan=2><span id="recaptcha_privacy" class="recaptcha_only_if_privacy"></span></td> </tr> </table> '; RecaptchaTemplates.ContextHtml = '<table id="recaptcha_table" class="recaptchatable"> <tr> <td colspan="6" class=\'recaptcha_r1_c1\'></td> </tr> <tr> <td class=\'recaptcha_r2_c1\'></td> <td colspan="4" class=\'recaptcha_image_cell\'><div id="recaptcha_image"></div></td> <td class=\'recaptcha_r2_c2\'></td> </tr> <tr> <td rowspan="6" class=\'recaptcha_r3_c1\'></td> <td colspan="4" class=\'recaptcha_r3_c2\'></td> <td rowspan="6" class=\'recaptcha_r3_c3\'></td> </tr> <tr> <td rowspan="3" class=\'recaptcha_r4_c1\' height="49"> <div class="recaptcha_input_area"> <label for="recaptcha_response_field" class="recaptcha_input_area_text"><span id="recaptcha_instructions_context" class="recaptcha_only_if_image recaptcha_only_if_no_incorrect_sol"></span><span id="recaptcha_instructions_audio" class="recaptcha_only_if_no_incorrect_sol recaptcha_only_if_audio"></span><span id="recaptcha_instructions_error" class="recaptcha_only_if_incorrect_sol"></span></label><br/> <input name="recaptcha_response_field" id="recaptcha_response_field" type="text" /> </div> </td> <td rowspan="4" class=\'recaptcha_r4_c2\'></td> <td><a id=\'recaptcha_reload_btn\'><img id=\'recaptcha_reload\' width="25" height="17" /></a></td> <td rowspan="4" class=\'recaptcha_r4_c4\'></td> </tr> <tr> <td><a id=\'recaptcha_switch_audio_btn\' class="recaptcha_only_if_image"><img id=\'recaptcha_switch_audio\' width="25" height="16" alt="" /></a><a id=\'recaptcha_switch_img_btn\' class="recaptcha_only_if_audio"><img id=\'recaptcha_switch_img\' width="25" height="16" alt=""/></a></td> </tr> <tr> <td><a id=\'recaptcha_whatsthis_btn\'><img id=\'recaptcha_whatsthis\' width="25" height="16" /></a></td> </tr> <tr> <td class=\'recaptcha_r7_c1\'></td> <td class=\'recaptcha_r8_c1\'></td> </tr> </table> '; RecaptchaTemplates.VertCss = ".recaptchatable td img{display:block}.recaptchatable .recaptcha_r1_c1{background:url('IMGROOT/sprite.png') 0 -63px no-repeat;width:318px;height:9px}.recaptchatable .recaptcha_r2_c1{background:url('IMGROOT/sprite.png') -18px 0 no-repeat;width:9px;height:57px}.recaptchatable .recaptcha_r2_c2{background:url('IMGROOT/sprite.png') -27px 0 no-repeat;width:9px;height:57px}.recaptchatable .recaptcha_r3_c1{background:url('IMGROOT/sprite.png') 0 0 no-repeat;width:9px;height:63px}.recaptchatable .recaptcha_r3_c2{background:url('IMGROOT/sprite.png') -18px -57px no-repeat;width:300px;height:6px}.recaptchatable .recaptcha_r3_c3{background:url('IMGROOT/sprite.png') -9px 0 no-repeat;width:9px;height:63px}.recaptchatable .recaptcha_r4_c1{background:url('IMGROOT/sprite.png') -43px 0 no-repeat;width:171px;height:49px}.recaptchatable .recaptcha_r4_c2{background:url('IMGROOT/sprite.png') -36px 0 no-repeat;width:7px;height:57px}.recaptchatable .recaptcha_r4_c4{background:url('IMGROOT/sprite.png') -214px 0 no-repeat;width:97px;height:57px}.recaptchatable .recaptcha_r7_c1{background:url('IMGROOT/sprite.png') -43px -49px no-repeat;width:171px;height:8px}.recaptchatable .recaptcha_r8_c1{background:url('IMGROOT/sprite.png') -43px -49px no-repeat;width:25px;height:8px}.recaptchatable .recaptcha_image_cell center img{height:57px}.recaptchatable .recaptcha_image_cell center{height:57px}.recaptchatable .recaptcha_image_cell{background-color:white;height:57px}#recaptcha_area,#recaptcha_table{width:318px!important}.recaptchatable,#recaptcha_area tr,#recaptcha_area td,#recaptcha_area th{margin:0!important;border:0!important;padding:0!important;border-collapse:collapse!important;vertical-align:middle!important}.recaptchatable *{margin:0;padding:0;border:0;font-family:helvetica,sans-serif;font-size:8pt;color:black;position:static;top:auto;left:auto;right:auto;bottom:auto}.recaptchatable #recaptcha_image{margin:auto}.recaptchatable img{border:0!important;margin:0!important;padding:0!important}.recaptchatable a,.recaptchatable a:hover{cursor:pointer;outline:none;border:0!important;padding:0!important;text-decoration:none;color:blue;background:none!important;font-weight:normal}.recaptcha_input_area{position:relative!important;width:153px!important;height:45px!important;margin-left:7px!important;margin-right:7px!important;background:none!important}.recaptchatable label.recaptcha_input_area_text{margin:0!important;padding:0!important;position:static!important;top:auto!important;left:auto!important;right:auto!important;bottom:auto!important;background:none!important;height:auto!important;width:auto!important}.recaptcha_theme_red label.recaptcha_input_area_text,.recaptcha_theme_white label.recaptcha_input_area_text{color:black!important}.recaptcha_theme_blackglass label.recaptcha_input_area_text{color:white!important}.recaptchatable #recaptcha_response_field{width:153px!important;position:relative!important;bottom:7px!important;padding:0!important;margin:15px 0 0 0!important;font-size:10pt}.recaptcha_theme_blackglass #recaptcha_response_field,.recaptcha_theme_white #recaptcha_response_field{border:1px solid gray}.recaptcha_theme_red #recaptcha_response_field{border:1px solid #cca940}.recaptcha_audio_cant_hear_link{font-size:7pt;color:black}#recaptcha_instructions_error{color:red!important}.recaptcha_only_if_privacy{float:right;text-align:right}"; var RecaptchaStr_en = { visual_challenge: "Get a visual challenge", audio_challenge: "Get an audio challenge", refresh_btn: "Get a new challenge", instructions_visual: "Type the two words:", instructions_context: "Type the words in the boxes:", instructions_audio: "Type what you hear:", help_btn: "Help", play_again: "Play sound again", cant_hear_this: "Download sound as MP3", incorrect_try_again: "Incorrect. Try again.", image_alt_text: "reCAPTCHA challenge image", privacy_and_terms: "Privacy & Terms" }, RecaptchaStr_af = {
        visual_challenge: "Kry 'n visuele verifi\u00ebring",
        audio_challenge: "Kry 'n klankverifi\u00ebring", refresh_btn: "Kry 'n nuwe verifi\u00ebring", instructions_visual: "Tik die twee woorde:", instructions_context: "Tik die woorde in die kassies:", instructions_audio: "Tik wat jy hoor:", help_btn: "Hulp", play_again: "Speel geluid weer", cant_hear_this: "Laai die klank af as MP3", incorrect_try_again: "Verkeerd. Probeer weer.", image_alt_text: "reCAPTCHA-uitdagingprent", privacy_and_terms: "Privaatheid en bepalings"
    }, RecaptchaStr_am = {
        visual_challenge: "\u12e8\u12a5\u12ed\u1273 \u1270\u130b\u1323\u121a \u12a0\u130d\u129d",
        audio_challenge: "\u120c\u120b \u12a0\u12f2\u1235 \u12e8\u12f5\u121d\u133d \u1325\u12eb\u1244 \u12ed\u1245\u1228\u1265", refresh_btn: "\u120c\u120b \u12a0\u12f2\u1235 \u1325\u12eb\u1244 \u12ed\u1245\u1228\u1265", instructions_visual: "\u12a5\u1295\u12da\u1205\u1295 \u1201\u1208\u1275 \u1243\u120b\u1275 \u1270\u12ed\u1265 \u1366", instructions_context: "\u1260\u1233\u1325\u1296\u1279 \u12cd\u1235\u1325 \u1243\u120b\u1276\u1279\u1295 \u1270\u12ed\u1265\u1366", instructions_audio: "\u12e8\u121d\u1275\u1230\u121b\u12cd\u1295 \u1270\u12ed\u1265\u1361-",
        help_btn: "\u12a5\u1308\u12db", play_again: "\u12f5\u121d\u1339\u1295 \u12a5\u1295\u12f0\u1308\u1293 \u12a0\u132b\u12cd\u1275", cant_hear_this: "\u12f5\u121d\u1339\u1295 \u1260MP3 \u1245\u122d\u133d \u12a0\u12cd\u122d\u12f5", incorrect_try_again: "\u1275\u12ad\u12ad\u120d \u12a0\u12ed\u12f0\u1208\u121d\u1362 \u12a5\u1295\u12f0\u1308\u1293 \u121e\u12ad\u122d\u1362", image_alt_text: "reCAPTCHA \u121d\u1235\u120d \u130d\u1320\u121d", privacy_and_terms: "\u130d\u120b\u12ca\u1290\u1275 \u12a5\u1293 \u12cd\u120d"
    },
    RecaptchaStr_ar = {
        visual_challenge: "\u0627\u0644\u062d\u0635\u0648\u0644 \u0639\u0644\u0649 \u062a\u062d\u062f\u064d \u0645\u0631\u0626\u064a", audio_challenge: "\u0627\u0644\u062d\u0635\u0648\u0644 \u0639\u0644\u0649 \u062a\u062d\u062f\u064d \u0635\u0648\u062a\u064a", refresh_btn: "\u0627\u0644\u062d\u0635\u0648\u0644 \u0639\u0644\u0649 \u062a\u062d\u062f\u064d \u062c\u062f\u064a\u062f", instructions_visual: "\u0627\u0643\u062a\u0628 \u0627\u0644\u0643\u0644\u0645\u062a\u064a\u0646:", instructions_context: "\u0627\u0643\u062a\u0628 \u0627\u0644\u0643\u0644\u0645\u0627\u062a \u0641\u064a \u0627\u0644\u0645\u0631\u0628\u0639\u0627\u062a:",
        instructions_audio: "\u0627\u0643\u062a\u0628 \u0645\u0627 \u062a\u0633\u0645\u0639\u0647:", help_btn: "\u0645\u0633\u0627\u0639\u062f\u0629", play_again: "\u062a\u0634\u063a\u064a\u0644 \u0627\u0644\u0635\u0648\u062a \u0645\u0631\u0629 \u0623\u062e\u0631\u0649", cant_hear_this: "\u062a\u0646\u0632\u064a\u0644 \u0627\u0644\u0635\u0648\u062a \u0628\u062a\u0646\u0633\u064a\u0642 MP3", incorrect_try_again: "\u063a\u064a\u0631 \u0635\u062d\u064a\u062d. \u0623\u0639\u062f \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629.",
        image_alt_text: "\u0635\u0648\u0631\u0629 \u0627\u0644\u062a\u062d\u062f\u064a \u0645\u0646 reCAPTCHA", privacy_and_terms: "\u0627\u0644\u062e\u0635\u0648\u0635\u064a\u0629 \u0648\u0627\u0644\u0628\u0646\u0648\u062f"
    }, RecaptchaStr_bg = {
        visual_challenge: "\u041f\u043e\u043b\u0443\u0447\u0430\u0432\u0430\u043d\u0435 \u043d\u0430 \u0432\u0438\u0437\u0443\u0430\u043b\u043d\u0430 \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0430", audio_challenge: "\u0417\u0430\u0440\u0435\u0436\u0434\u0430\u043d\u0435 \u043d\u0430 \u0430\u0443\u0434\u0438\u043e\u0442\u0435\u0441\u0442",
        refresh_btn: "\u0417\u0430\u0440\u0435\u0436\u0434\u0430\u043d\u0435 \u043d\u0430 \u043d\u043e\u0432 \u0442\u0435\u0441\u0442", instructions_visual: "\u0412\u044a\u0432\u0435\u0434\u0435\u0442\u0435 \u0434\u0432\u0435\u0442\u0435 \u0434\u0443\u043c\u0438:", instructions_context: "\u0412\u044a\u0432\u0435\u0434\u0435\u0442\u0435 \u0434\u0443\u043c\u0438\u0442\u0435:", instructions_audio: "\u0412\u044a\u0432\u0435\u0434\u0435\u0442\u0435 \u0447\u0443\u0442\u043e\u0442\u043e:", help_btn: "\u041f\u043e\u043c\u043e\u0449",
        play_again: "\u041f\u043e\u0432\u0442\u043e\u0440\u043d\u043e \u043f\u0443\u0441\u043a\u0430\u043d\u0435 \u043d\u0430 \u0437\u0432\u0443\u043a\u0430", cant_hear_this: "\u0418\u0437\u0442\u0435\u0433\u043b\u044f\u043d\u0435 \u043d\u0430 \u0437\u0432\u0443\u043a\u0430 \u0432\u044a\u0432 \u0444\u043e\u0440\u043c\u0430\u0442 MP3", incorrect_try_again: "\u041d\u0435\u043f\u0440\u0430\u0432\u0438\u043b\u043d\u043e. \u041e\u043f\u0438\u0442\u0430\u0439\u0442\u0435 \u043e\u0442\u043d\u043e\u0432\u043e.", image_alt_text: "\u0418\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435 \u043d\u0430 \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0430\u0442\u0430 \u0441 reCAPTCHA",
        privacy_and_terms: "\u041f\u043e\u0432\u0435\u0440\u0438\u0442\u0435\u043b\u043d\u043e\u0441\u0442 \u0438 \u041e\u0431\u0449\u0438 \u0443\u0441\u043b\u043e\u0432\u0438\u044f"
    }, RecaptchaStr_bn = {
        visual_challenge: "\u098f\u0995\u099f\u09bf \u09a6\u09c3\u09b6\u09cd\u09af\u09ae\u09be\u09a8 \u09aa\u09cd\u09b0\u09a4\u09bf\u09a6\u09cd\u09ac\u09a8\u09cd\u09a6\u09cd\u09ac\u09bf\u09a4\u09be \u09aa\u09be\u09a8", audio_challenge: "\u098f\u0995\u099f\u09bf \u0985\u09a1\u09bf\u0993 \u09aa\u09cd\u09b0\u09a4\u09bf\u09a6\u09cd\u09ac\u09a8\u09cd\u09a6\u09cd\u09ac\u09bf\u09a4\u09be  \u09aa\u09be\u09a8",
        refresh_btn: "\u098f\u0995\u099f\u09bf \u09a8\u09a4\u09c1\u09a8 \u09aa\u09cd\u09b0\u09a4\u09bf\u09a6\u09cd\u09ac\u09a8\u09cd\u09a6\u09cd\u09ac\u09bf\u09a4\u09be  \u09aa\u09be\u09a8", instructions_visual: "\u09b6\u09ac\u09cd\u09a6 \u09a6\u09c1\u099f\u09bf \u09b2\u09bf\u0996\u09c1\u09a8:", instructions_context: "\u09ac\u09be\u0995\u09cd\u09b8\u09c7 \u09b6\u09ac\u09cd\u09a6\u0997\u09c1\u09b2\u09bf \u099f\u09be\u0987\u09aa \u0995\u09b0\u09c1\u09a8:", instructions_audio: "\u0986\u09aa\u09a8\u09bf \u09af\u09be \u09b6\u09c1\u09a8\u099b\u09c7\u09a8 \u09a4\u09be \u09b2\u09bf\u0996\u09c1\u09a8:",
        help_btn: "\u09b8\u09b9\u09be\u09df\u09a4\u09be", play_again: "\u0986\u09ac\u09be\u09b0 \u09b8\u09be\u0989\u09a8\u09cd\u09a1 \u09aa\u09cd\u09b2\u09c7 \u0995\u09b0\u09c1\u09a8", cant_hear_this: "MP3 \u09b0\u09c2\u09aa\u09c7 \u09b6\u09ac\u09cd\u09a6 \u09a1\u09be\u0989\u09a8\u09b2\u09cb\u09a1 \u0995\u09b0\u09c1\u09a8", incorrect_try_again: "\u09ac\u09c7\u09a0\u09bf\u0995\u09f7 \u0986\u09ac\u09be\u09b0 \u099a\u09c7\u09b7\u09cd\u099f\u09be \u0995\u09b0\u09c1\u09a8\u09f7", image_alt_text: "reCAPTCHA \u099a\u09cd\u09af\u09be\u09b2\u09c7\u099e\u09cd\u099c \u099a\u09bf\u09a4\u09cd\u09b0",
        privacy_and_terms: "\u0997\u09cb\u09aa\u09a8\u09c0\u09af\u09bc\u09a4\u09be \u0993 \u09b6\u09b0\u09cd\u09a4\u09be\u09ac\u09b2\u09c0"
    }, RecaptchaStr_ca = {
        visual_challenge: "Obt\u00e9n un repte visual", audio_challenge: "Obteniu una pista sonora", refresh_btn: "Obteniu una pista nova", instructions_visual: "Escriviu les dues paraules:", instructions_context: "Escriviu les paraules dels quadres:", instructions_audio: "Escriviu el que escolteu:", help_btn: "Ajuda", play_again: "Torna a reproduir el so", cant_hear_this: "Baixa el so com a MP3",
        incorrect_try_again: "No \u00e9s correcte. Torna-ho a provar.", image_alt_text: "Imatge del repte de reCAPTCHA", privacy_and_terms: "Privadesa i condicions"
    }, RecaptchaStr_cs = {
        visual_challenge: "Zobrazit vizu\u00e1ln\u00ed podobu v\u00fdrazu", audio_challenge: "P\u0159ehr\u00e1t zvukovou podobu v\u00fdrazu", refresh_btn: "Zobrazit nov\u00fd v\u00fdraz", instructions_visual: "Zadejte dv\u011b slova:", instructions_context: "Zadejte slova uveden\u00e1 v pol\u00edch:", instructions_audio: "Napi\u0161te, co jste sly\u0161eli:",
        help_btn: "N\u00e1pov\u011bda", play_again: "Znovu p\u0159ehr\u00e1t zvuk", cant_hear_this: "St\u00e1hnout zvuk ve form\u00e1tu MP3", incorrect_try_again: "\u0160patn\u011b. Zkuste to znovu.", image_alt_text: "Obr\u00e1zek reCAPTCHA", privacy_and_terms: "Ochrana soukrom\u00ed a smluvn\u00ed podm\u00ednky"
    }, RecaptchaStr_da = {
        visual_challenge: "Hent en visuel udfordring", audio_challenge: "Hent en lydudfordring", refresh_btn: "Hent en ny udfordring", instructions_visual: "Indtast de to ord:", instructions_context: "Indtast ordene i felterne:",
        instructions_audio: "Indtast det, du h\u00f8rer:", help_btn: "Hj\u00e6lp", play_again: "Afspil lyden igen", cant_hear_this: "Download lyd som MP3", incorrect_try_again: "Forkert. Pr\u00f8v igen.", image_alt_text: "reCAPTCHA-udfordringsbillede", privacy_and_terms: "Privatliv og vilk\u00e5r"
    }, RecaptchaStr_de = {
        visual_challenge: "Captcha abrufen", audio_challenge: "Audio-Captcha abrufen", refresh_btn: "Neues Captcha abrufen", instructions_visual: "Geben Sie die 2 W\u00f6rter ein:", instructions_context: "Worte aus den Feldern eingeben:",
        instructions_audio: "Geben Sie das Geh\u00f6rte ein:", help_btn: "Hilfe", play_again: "Wort erneut abspielen", cant_hear_this: "Wort als MP3 herunterladen", incorrect_try_again: "Falsch. Bitte versuchen Sie es erneut.", image_alt_text: "reCAPTCHA-Bild", privacy_and_terms: "Datenschutzerkl\u00e4rung & Nutzungsbedingungen"
    }, RecaptchaStr_el = {
        visual_challenge: "\u039f\u03c0\u03c4\u03b9\u03ba\u03ae \u03c0\u03c1\u03cc\u03ba\u03bb\u03b7\u03c3\u03b7", audio_challenge: "\u0397\u03c7\u03b7\u03c4\u03b9\u03ba\u03ae \u03c0\u03c1\u03cc\u03ba\u03bb\u03b7\u03c3\u03b7",
        refresh_btn: "\u039d\u03ad\u03b1 \u03c0\u03c1\u03cc\u03ba\u03bb\u03b7\u03c3\u03b7", instructions_visual: "\u03a0\u03bb\u03b7\u03ba\u03c4\u03c1\u03bf\u03bb. \u03c4\u03b9\u03c2 \u03bb\u03ad\u03be\u03b5\u03b9\u03c2:", instructions_context: "\u03a0\u03bb\u03b7\u03ba\u03c4\u03c1\u03bf\u03bb. \u03c4\u03b9\u03c2 \u03bb\u03ad\u03be\u03b5\u03b9\u03c2:", instructions_audio: "\u03a0\u03bb\u03b7\u03ba\u03c4\u03c1\u03bf\u03bb\u03bf\u03b3\u03ae\u03c3\u03c4\u03b5 \u03cc\u03c4\u03b9 \u03b1\u03ba\u03bf\u03cd\u03c4\u03b5:",
        help_btn: "\u0392\u03bf\u03ae\u03b8\u03b5\u03b9\u03b1", play_again: "\u0391\u03bd\u03b1\u03c0\u03b1\u03c1\u03b1\u03b3\u03c9\u03b3\u03ae \u03ae\u03c7\u03bf\u03c5 \u03be\u03b1\u03bd\u03ac", cant_hear_this: "\u039b\u03ae\u03c8\u03b7 \u03ae\u03c7\u03bf\u03c5 \u03c9\u03c2 \u039c\u03a13", incorrect_try_again: "\u039b\u03ac\u03b8\u03bf\u03c2. \u0394\u03bf\u03ba\u03b9\u03bc\u03ac\u03c3\u03c4\u03b5 \u03be\u03b1\u03bd\u03ac.", image_alt_text: "\u0395\u03b9\u03ba\u03cc\u03bd\u03b1 \u03c0\u03c1\u03cc\u03ba\u03bb\u03b7\u03c3\u03b7\u03c2 reCAPTCHA",
        privacy_and_terms: "\u0391\u03c0\u03cc\u03c1\u03c1\u03b7\u03c4\u03bf \u03ba\u03b1\u03b9 \u03cc\u03c1\u03bf\u03b9"
    }, RecaptchaStr_es = {
        visual_challenge: "Obtener una pista visual", audio_challenge: "Obtener una pista sonora", refresh_btn: "Obtener una pista nueva", instructions_visual: "Escribe las dos palabras:", instructions_context: "Escribe las palabras de los cuadros:", instructions_audio: "Escribe lo que oigas:", help_btn: "Ayuda", play_again: "Volver a reproducir el sonido", cant_hear_this: "Descargar el sonido en MP3",
        incorrect_try_again: "Incorrecto. Vu\u00e9lvelo a intentar.", image_alt_text: "Pista de imagen reCAPTCHA", privacy_and_terms: "Privacidad y condiciones"
    }, RecaptchaStr_es_419 = {
        visual_challenge: "Enfrentar un desaf\u00edo visual", audio_challenge: "Enfrentar un desaf\u00edo de audio", refresh_btn: "Enfrentar un nuevo desaf\u00edo", instructions_visual: "Escribe las dos palabras:", instructions_context: "Escribe las palabras de los cuadros:", instructions_audio: "Escribe lo que escuchas:", help_btn: "Ayuda", play_again: "Reproducir sonido de nuevo",
        cant_hear_this: "Descargar sonido en formato MP3", incorrect_try_again: "Incorrecto. Vuelve a intentarlo.", image_alt_text: "Imagen del desaf\u00edo de la reCAPTCHA", privacy_and_terms: "Privacidad y condiciones"
    }, RecaptchaStr_et = {
        visual_challenge: "Kuva kuvap\u00f5hine robotil\u00f5ks", audio_challenge: "Kuva helip\u00f5hine robotil\u00f5ks", refresh_btn: "Kuva uus robotil\u00f5ks", instructions_visual: "Tippige kaks s\u00f5na.", instructions_context: "Tippige kastides olevad s\u00f5nad.", instructions_audio: "Tippige, mida kuulete.",
        help_btn: "Abi", play_again: "Esita heli uuesti", cant_hear_this: "Laadi heli alla MP3-vormingus", incorrect_try_again: "Vale. Proovige uuesti.", image_alt_text: "reCAPTCHA robotil\u00f5ksu kujutis", privacy_and_terms: "Privaatsus ja tingimused"
    }, RecaptchaStr_eu = {
        visual_challenge: "Eskuratu ikusizko erronka", audio_challenge: "Eskuratu audio-erronka", refresh_btn: "Eskuratu erronka berria", instructions_visual: "Idatzi bi hitzak:", instructions_context: "Idatzi koadroetako hitzak:", instructions_audio: "Idatzi entzuten duzuna:",
        help_btn: "Laguntza", play_again: "Erreproduzitu soinua berriro", cant_hear_this: "Deskargatu soinua MP3 gisa", incorrect_try_again: "Ez da zuzena. Saiatu berriro.", image_alt_text: "reCAPTCHA erronkaren irudia", privacy_and_terms: "Pribatutasuna eta baldintzak"
    }, RecaptchaStr_fa = {
        visual_challenge: "\u062f\u0631\u06cc\u0627\u0641\u062a \u06cc\u06a9 \u0645\u0639\u0645\u0627\u06cc \u062f\u06cc\u062f\u0627\u0631\u06cc", audio_challenge: "\u062f\u0631\u06cc\u0627\u0641\u062a \u06cc\u06a9 \u0645\u0639\u0645\u0627\u06cc \u0635\u0648\u062a\u06cc",
        refresh_btn: "\u062f\u0631\u06cc\u0627\u0641\u062a \u06cc\u06a9 \u0645\u0639\u0645\u0627\u06cc \u062c\u062f\u06cc\u062f", instructions_visual: "\u0627\u06cc\u0646 \u062f\u0648 \u06a9\u0644\u0645\u0647 \u0631\u0627 \u062a\u0627\u06cc\u067e \u06a9\u0646\u06cc\u062f:", instructions_context: "\u0648\u0627\u0698\u0647\u200c\u0647\u0627\u06cc \u0645\u0648\u062c\u0648\u062f \u062f\u0631 \u06a9\u0627\u062f\u0631\u0647\u0627 \u0631\u0627 \u062a\u0627\u06cc\u067e \u06a9\u0646\u06cc\u062f:", instructions_audio: "\u0622\u0646\u0686\u0647 \u0631\u0627 \u06a9\u0647 \u0645\u06cc\u200c\u0634\u0646\u0648\u06cc\u062f \u062a\u0627\u06cc\u067e \u06a9\u0646\u06cc\u062f:",
        help_btn: "\u0631\u0627\u0647\u0646\u0645\u0627\u06cc\u06cc", play_again: "\u067e\u062e\u0634 \u0645\u062c\u062f\u062f \u0635\u062f\u0627", cant_hear_this: "\u062f\u0627\u0646\u0644\u0648\u062f \u0635\u062f\u0627 \u0628\u0647 \u0635\u0648\u0631\u062a MP3", incorrect_try_again: "\u0646\u0627\u062f\u0631\u0633\u062a. \u062f\u0648\u0628\u0627\u0631\u0647 \u0627\u0645\u062a\u062d\u0627\u0646 \u06a9\u0646\u06cc\u062f.", image_alt_text: "\u062a\u0635\u0648\u06cc\u0631 \u0686\u0627\u0644\u0634\u06cc reCAPTCHA", privacy_and_terms: "\u062d\u0631\u06cc\u0645 \u062e\u0635\u0648\u0635\u06cc \u0648 \u0634\u0631\u0627\u06cc\u0637"
    },
    RecaptchaStr_fi = { visual_challenge: "Kuvavahvistus", audio_challenge: "\u00c4\u00e4nivahvistus", refresh_btn: "Uusi kuva", instructions_visual: "Kirjoita n\u00e4kem\u00e4si kaksi sanaa", instructions_context: "Kirjoita n\u00e4kem\u00e4si sanat:", instructions_audio: "Kirjoita kuulemasi:", help_btn: "Ohje", play_again: "Toista \u00e4\u00e4ni uudelleen", cant_hear_this: "Lataa \u00e4\u00e4ni MP3-tiedostona", incorrect_try_again: "V\u00e4\u00e4rin. Yrit\u00e4 uudelleen.", image_alt_text: "reCAPTCHA-kuva", privacy_and_terms: "Tietosuoja ja k\u00e4ytt\u00f6ehdot" },
    RecaptchaStr_fil = {
        visual_challenge: "Kumuha ng pagsubok na visual", audio_challenge: "Kumuha ng pagsubok na audio", refresh_btn: "Kumuha ng bagong pagsubok", instructions_visual: "I-type ang dalawang mga salita:", instructions_context: "I-type ang mga salita sa mga kahon:", instructions_audio: "I-type ang iyong narinig", help_btn: "Tulong", play_again: "I-play muli ang tunog", cant_hear_this: "I-download ang tunog bilang MP3", incorrect_try_again: "Hindi wasto. Muling subukan.", image_alt_text: "larawang panghamon ng reCAPTCHA",
        privacy_and_terms: "Privacy at Mga Tuntunin"
    }, RecaptchaStr_fr = { visual_challenge: "Test visuel", audio_challenge: "Test audio", refresh_btn: "Nouveau test", instructions_visual: "Saisissez les deux mots :", instructions_context: "Saisissez les mots ci-dessus :", instructions_audio: "Qu'entendez-vous ?", help_btn: "Aide", play_again: "R\u00e9\u00e9couter", cant_hear_this: "T\u00e9l\u00e9charger l'audio au format MP3", incorrect_try_again: "Incorrect. Veuillez r\u00e9essayer.", image_alt_text: "Image reCAPTCHA", privacy_and_terms: "Confidentialit\u00e9 et conditions d'utilisation" },
    RecaptchaStr_fr_ca = {
        visual_challenge: "Obtenir un test visuel", audio_challenge: "Obtenir un test audio", refresh_btn: "Obtenir un nouveau test", instructions_visual: "Tapez les deux mots\u00a0:", instructions_context: "Tapez les mots dans les bo\u00eetes de texte\u00a0:", instructions_audio: "Tapez ce que vous entendez\u00a0:", help_btn: "Aide", play_again: "Jouer le son de nouveau", cant_hear_this: "T\u00e9l\u00e9charger le son en format MP3", incorrect_try_again: "Erreur, essayez \u00e0 nouveau", image_alt_text: "Image reCAPTCHA",
        privacy_and_terms: "Confidentialit\u00e9 et conditions d'utilisation"
    }, RecaptchaStr_gl = {
        visual_challenge: "Obter unha proba visual", audio_challenge: "Obter unha proba de audio", refresh_btn: "Obter unha proba nova", instructions_visual: "Escribe as d\u00faas palabras:", instructions_context: "Escribe as palabras nas caixas:", instructions_audio: "Escribe o que escoitas:", help_btn: "Axuda", play_again: "Reproducir o son de novo", cant_hear_this: "Descargar son como MP3", incorrect_try_again: "Incorrecto. T\u00e9ntao de novo.",
        image_alt_text: "Imaxe de proba de reCAPTCHA", privacy_and_terms: "Privacidade e termos"
    }, RecaptchaStr_gu = {
        visual_challenge: "\u0a8f\u0a95 \u0aa6\u0ac3\u0ab6\u0acd\u0aaf\u0abe\u0aa4\u0acd\u0aae\u0a95 \u0aaa\u0aa1\u0a95\u0abe\u0ab0 \u0aae\u0ac7\u0ab3\u0ab5\u0acb", audio_challenge: "\u0a8f\u0a95 \u0a91\u0aa1\u0abf\u0a93 \u0aaa\u0aa1\u0a95\u0abe\u0ab0 \u0aae\u0ac7\u0ab3\u0ab5\u0acb", refresh_btn: "\u0a8f\u0a95 \u0aa8\u0ab5\u0acb \u0aaa\u0aa1\u0a95\u0abe\u0ab0 \u0aae\u0ac7\u0ab3\u0ab5\u0acb", instructions_visual: "\u0aac\u0ac7 \u0ab6\u0aac\u0acd\u0aa6 \u0ab2\u0a96\u0acb:",
        instructions_context: "\u0aac\u0ac9\u0a95\u0acd\u0ab8\u0aae\u0abe\u0a82 \u0ab6\u0aac\u0acd\u0aa6\u0acb \u0ab2\u0a96\u0acb:", instructions_audio: "\u0aa4\u0aae\u0ac7 \u0a9c\u0ac7 \u0ab8\u0abe\u0a82\u0aad\u0ab3\u0acb \u0a9b\u0acb \u0aa4\u0ac7 \u0ab2\u0a96\u0acb:", help_btn: "\u0ab8\u0ab9\u0abe\u0aaf", play_again: "\u0aa7\u0acd\u0ab5\u0aa8\u0abf \u0aab\u0ab0\u0ac0\u0aa5\u0ac0 \u0a9a\u0ab2\u0abe\u0ab5\u0acb", cant_hear_this: "MP3 \u0aa4\u0ab0\u0ac0\u0a95\u0ac7 \u0aa7\u0acd\u0ab5\u0aa8\u0abf\u0aa8\u0ac7 \u0aa1\u0abe\u0a89\u0aa8\u0ab2\u0acb\u0aa1 \u0a95\u0ab0\u0acb",
        incorrect_try_again: "\u0a96\u0acb\u0a9f\u0ac1\u0a82. \u0aab\u0ab0\u0ac0 \u0aaa\u0acd\u0ab0\u0aaf\u0abe\u0ab8 \u0a95\u0ab0\u0acb.", image_alt_text: "reCAPTCHA \u0aaa\u0aa1\u0a95\u0abe\u0ab0 \u0a9b\u0aac\u0ac0", privacy_and_terms: "\u0a97\u0acb\u0aaa\u0aa8\u0ac0\u0aaf\u0aa4\u0abe \u0a85\u0aa8\u0ac7 \u0ab6\u0ab0\u0aa4\u0acb"
    }, RecaptchaStr_hi = {
        visual_challenge: "\u0915\u094b\u0908 \u0935\u093f\u091c\u0941\u0905\u0932 \u091a\u0941\u0928\u094c\u0924\u0940 \u0932\u0947\u0902", audio_challenge: "\u0915\u094b\u0908 \u0911\u0921\u093f\u092f\u094b \u091a\u0941\u0928\u094c\u0924\u0940 \u0932\u0947\u0902",
        refresh_btn: "\u0915\u094b\u0908 \u0928\u0908 \u091a\u0941\u0928\u094c\u0924\u0940 \u0932\u0947\u0902", instructions_visual: "\u0926\u094b \u0936\u092c\u094d\u200d\u0926 \u0932\u093f\u0916\u0947\u0902:", instructions_context: "\u0936\u092c\u094d\u200d\u0926\u094b\u0902 \u0915\u094b \u092c\u0949\u0915\u094d\u200d\u0938 \u092e\u0947\u0902 \u0932\u093f\u0916\u0947\u0902:", instructions_audio: "\u091c\u094b \u0906\u092a \u0938\u0941\u0928 \u0930\u0939\u0947 \u0939\u0948\u0902 \u0909\u0938\u0947 \u0932\u093f\u0916\u0947\u0902:",
        help_btn: "\u0938\u0939\u093e\u092f\u0924\u093e", play_again: "\u0927\u094d\u200d\u0935\u0928\u093f \u092a\u0941\u0928: \u091a\u0932\u093e\u090f\u0902", cant_hear_this: "\u0927\u094d\u200d\u0935\u0928\u093f \u0915\u094b MP3 \u0915\u0947 \u0930\u0942\u092a \u092e\u0947\u0902 \u0921\u093e\u0909\u0928\u0932\u094b\u0921 \u0915\u0930\u0947\u0902", incorrect_try_again: "\u0917\u0932\u0924. \u092a\u0941\u0928: \u092a\u094d\u0930\u092f\u093e\u0938 \u0915\u0930\u0947\u0902.", image_alt_text: "reCAPTCHA \u091a\u0941\u0928\u094c\u0924\u0940 \u091a\u093f\u0924\u094d\u0930",
        privacy_and_terms: "\u0917\u094b\u092a\u0928\u0940\u092f\u0924\u093e \u0914\u0930 \u0936\u0930\u094d\u0924\u0947\u0902"
    }, RecaptchaStr_hr = {
        visual_challenge: "Dohvati vizualni upit", audio_challenge: "Dohvati zvu\u010dni upit", refresh_btn: "Dohvati novi upit", instructions_visual: "Upi\u0161ite obje rije\u010di:", instructions_context: "Upi\u0161ite rije\u010di u okvire:", instructions_audio: "Upi\u0161ite \u0161to \u010dujete:", help_btn: "Pomo\u0107", play_again: "Ponovi zvuk", cant_hear_this: "Preuzmi zvuk u MP3 formatu",
        incorrect_try_again: "Nije to\u010dno. Poku\u0161ajte ponovno.", image_alt_text: "Slikovni izazov reCAPTCHA", privacy_and_terms: "Privatnost i odredbe"
    }, RecaptchaStr_hu = {
        visual_challenge: "Vizu\u00e1lis kih\u00edv\u00e1s k\u00e9r\u00e9se", audio_challenge: "Hangkih\u00edv\u00e1s k\u00e9r\u00e9se", refresh_btn: "\u00daj kih\u00edv\u00e1s k\u00e9r\u00e9se", instructions_visual: "Adja meg a k\u00e9t sz\u00f3t:", instructions_context: "\u00cdrja be a szavakat a mez\u0151kbe:", instructions_audio: "\u00cdrja le, amit hall:",
        help_btn: "S\u00fag\u00f3", play_again: "Hang ism\u00e9telt lej\u00e1tsz\u00e1sa", cant_hear_this: "Hang let\u00f6lt\u00e9se MP3 form\u00e1tumban", incorrect_try_again: "Hib\u00e1s. Pr\u00f3b\u00e1lkozzon \u00fajra.", image_alt_text: "reCAPTCHA ellen\u0151rz\u0151 k\u00e9p", privacy_and_terms: "Adatv\u00e9delem \u00e9s Szerz\u0151d\u00e9si Felt\u00e9telek"
    }, RecaptchaStr_hy = {
        visual_challenge: "\u054d\u057f\u0561\u0576\u0561\u056c \u057f\u0565\u057d\u0578\u0572\u0561\u056f\u0561\u0576 \u056d\u0576\u0564\u056b\u0580",
        audio_challenge: "\u054d\u057f\u0561\u0576\u0561\u056c \u0571\u0561\u0575\u0576\u0561\u0575\u056b\u0576 \u056d\u0576\u0564\u056b\u0580", refresh_btn: "\u054d\u057f\u0561\u0576\u0561\u056c \u0576\u0578\u0580 \u056d\u0576\u0564\u056b\u0580", instructions_visual: "\u0544\u0578\u0582\u057f\u0584\u0561\u0563\u0580\u0565\u0584 \u0561\u0575\u057d \u0565\u0580\u056f\u0578\u0582 \u0562\u0561\u057c\u0565\u0580\u0568\u055d", instructions_context: "\u0544\u0578\u0582\u057f\u0584\u0561\u0563\u0580\u0565\u0584 \u0562\u0561\u057c\u0565\u0580\u0568 \u057f\u0578\u0582\u0583\u0565\u0580\u0578\u0582\u0574\u055d",
        instructions_audio: "\u0544\u0578\u0582\u057f\u0584\u0561\u0563\u0580\u0565\u0584 \u0561\u0575\u0576, \u056b\u0576\u0579 \u056c\u057d\u0578\u0582\u0574 \u0565\u0584\u055d", help_btn: "\u0555\u0563\u0576\u0578\u0582\u0569\u0575\u0578\u0582\u0576", play_again: "\u0546\u057e\u0561\u0563\u0561\u0580\u056f\u0565\u056c \u0571\u0561\u0575\u0576\u0568 \u056f\u0580\u056f\u056b\u0576", cant_hear_this: "\u0532\u0565\u057c\u0576\u0565\u056c \u0571\u0561\u0575\u0576\u0568 \u0578\u0580\u057a\u0565\u057d MP3", incorrect_try_again: "\u054d\u056d\u0561\u056c \u0567: \u0553\u0578\u0580\u0571\u0565\u0584 \u056f\u0580\u056f\u056b\u0576:",
        image_alt_text: "", privacy_and_terms: "\u0533\u0561\u0572\u057f\u0576\u056b\u0578\u0582\u0569\u0575\u0561\u0576 & \u057a\u0561\u0575\u0574\u0561\u0576\u0576\u0565\u0580"
    }, RecaptchaStr_id = {
        visual_challenge: "Dapatkan kata pengujian berbentuk visual", audio_challenge: "Dapatkan kata pengujian berbentuk audio", refresh_btn: "Dapatkan kata pengujian baru", instructions_visual: "Ketik dua kata ini:", instructions_context: "Ketik kata di dalam kotak:", instructions_audio: "Ketik yang Anda dengar:", help_btn: "Bantuan",
        play_again: "Putar suara sekali lagi", cant_hear_this: "Unduh suara sebagai MP3", incorrect_try_again: "Salah. Coba lagi.", image_alt_text: "Gambar tantangan reCAPTCHA", privacy_and_terms: "Privasi & Persyaratan"
    }, RecaptchaStr_is = {
        visual_challenge: "F\u00e1 a\u00f0gangspr\u00f3f sem mynd", audio_challenge: "F\u00e1 a\u00f0gangspr\u00f3f sem hlj\u00f3\u00f0skr\u00e1", refresh_btn: "F\u00e1 n\u00fdtt a\u00f0gangspr\u00f3f", instructions_visual: "Sl\u00e1\u00f0u inn \u00feessi tv\u00f6 or\u00f0:", instructions_context: "Sl\u00e1\u00f0u or\u00f0in inn \u00ed reitina:",
        instructions_audio: "Sl\u00e1\u00f0u inn \u00fea\u00f0 sem \u00fe\u00fa heyrir:", help_btn: "Hj\u00e1lp", play_again: "Spila hlj\u00f3\u00f0 aftur", cant_hear_this: "S\u00e6kja hlj\u00f3\u00f0 sem MP3", incorrect_try_again: "Rangt. Reyndu aftur.", image_alt_text: "mynd reCAPTCHA a\u00f0gangspr\u00f3fs", privacy_and_terms: "Pers\u00f3nuvernd og skilm\u00e1lar"
    }, RecaptchaStr_it = {
        visual_challenge: "Verifica visiva", audio_challenge: "Verifica audio", refresh_btn: "Nuova verifica", instructions_visual: "Digita le due parole:",
        instructions_context: "Digita le parole nelle caselle:", instructions_audio: "Digita ci\u00f2 che senti:", help_btn: "Guida", play_again: "Riproduci di nuovo audio", cant_hear_this: "Scarica audio in MP3", incorrect_try_again: "Sbagliato. Riprova.", image_alt_text: "Immagine di verifica reCAPTCHA", privacy_and_terms: "Privacy e Termini"
    }, RecaptchaStr_iw = {
        visual_challenge: "\u05e7\u05d1\u05dc \u05d0\u05ea\u05d2\u05e8 \u05d7\u05d6\u05d5\u05ea\u05d9", audio_challenge: "\u05e7\u05d1\u05dc \u05d0\u05ea\u05d2\u05e8 \u05e9\u05de\u05e2",
        refresh_btn: "\u05e7\u05d1\u05dc \u05d0\u05ea\u05d2\u05e8 \u05d7\u05d3\u05e9", instructions_visual: "\u05d4\u05e7\u05dc\u05d3 \u05d0\u05ea \u05e9\u05ea\u05d9 \u05d4\u05de\u05d9\u05dc\u05d9\u05dd:", instructions_context: "\u05d4\u05e7\u05dc\u05d3 \u05d0\u05ea \u05d4\u05de\u05d9\u05dc\u05d9\u05dd \u05d1\u05ea\u05d9\u05d1\u05d5\u05ea:", instructions_audio: "\u05d4\u05e7\u05dc\u05d3 \u05d0\u05ea \u05de\u05d4 \u05e9\u05d0\u05ea\u05d4 \u05e9\u05d5\u05de\u05e2:", help_btn: "\u05e2\u05d6\u05e8\u05d4", play_again: "\u05d4\u05e4\u05e2\u05dc \u05e9\u05d5\u05d1 \u05d0\u05ea \u05d4\u05e9\u05de\u05e2",
        cant_hear_this: "\u05d4\u05d5\u05e8\u05d3 \u05e9\u05de\u05e2 \u05db-3MP", incorrect_try_again: "\u05e9\u05d2\u05d5\u05d9. \u05e0\u05e1\u05d4 \u05e9\u05d5\u05d1.", image_alt_text: "\u05ea\u05de\u05d5\u05e0\u05ea \u05d0\u05ea\u05d2\u05e8 \u05e9\u05dc reCAPTCHA", privacy_and_terms: "\u05e4\u05e8\u05d8\u05d9\u05d5\u05ea \u05d5\u05ea\u05e0\u05d0\u05d9\u05dd"
    }, RecaptchaStr_ja = {
        visual_challenge: "\u753b\u50cf\u3067\u78ba\u8a8d\u3057\u307e\u3059", audio_challenge: "\u97f3\u58f0\u3067\u78ba\u8a8d\u3057\u307e\u3059",
        refresh_btn: "\u5225\u306e\u5358\u8a9e\u3067\u3084\u308a\u76f4\u3057\u307e\u3059", instructions_visual: "2 \u3064\u306e\u5358\u8a9e\u3092\u5165\u529b\u3057\u307e\u3059:", instructions_context: "\u30dc\u30c3\u30af\u30b9\u5185\u306e\u5358\u8a9e\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044:", instructions_audio: "\u805e\u3053\u3048\u305f\u5358\u8a9e\u3092\u5165\u529b\u3057\u307e\u3059:", help_btn: "\u30d8\u30eb\u30d7", play_again: "\u3082\u3046\u4e00\u5ea6\u805e\u304f", cant_hear_this: "MP3 \u3067\u97f3\u58f0\u3092\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9",
        incorrect_try_again: "\u6b63\u3057\u304f\u3042\u308a\u307e\u305b\u3093\u3002\u3082\u3046\u4e00\u5ea6\u3084\u308a\u76f4\u3057\u3066\u304f\u3060\u3055\u3044\u3002", image_alt_text: "reCAPTCHA \u78ba\u8a8d\u7528\u753b\u50cf", privacy_and_terms: "\u30d7\u30e9\u30a4\u30d0\u30b7\u30fc\u3068\u5229\u7528\u898f\u7d04"
    }, RecaptchaStr_kn = {
        visual_challenge: "\u0ca6\u0cc3\u0cb6\u0ccd\u0caf \u0cb8\u0cb5\u0cbe\u0cb2\u0cca\u0c82\u0ca6\u0ca8\u0ccd\u0ca8\u0cc1 \u0cb8\u0ccd\u0cb5\u0cc0\u0c95\u0cb0\u0cbf\u0cb8\u0cbf", audio_challenge: "\u0c86\u0ca1\u0cbf\u0caf\u0ccb \u0cb8\u0cb5\u0cbe\u0cb2\u0cca\u0c82\u0ca6\u0ca8\u0ccd\u0ca8\u0cc1 \u0cb8\u0ccd\u0cb5\u0cc0\u0c95\u0cb0\u0cbf\u0cb8\u0cbf",
        refresh_btn: "\u0cb9\u0cca\u0cb8 \u0cb8\u0cb5\u0cbe\u0cb2\u0cca\u0c82\u0ca6\u0ca8\u0ccd\u0ca8\u0cc1 \u0caa\u0ca1\u0cc6\u0caf\u0cbf\u0cb0\u0cbf", instructions_visual: "\u0c8e\u0cb0\u0ca1\u0cc1 \u0caa\u0ca6\u0c97\u0cb3\u0ca8\u0ccd\u0ca8\u0cc1 \u0c9f\u0cc8\u0caa\u0ccd \u0cae\u0cbe\u0ca1\u0cbf:", instructions_context: "\u0cac\u0cbe\u0c95\u0ccd\u0cb8\u0ccd\u200c\u0ca8\u0cb2\u0ccd\u0cb2\u0cbf \u0caa\u0ca6\u0c97\u0cb3\u0ca8\u0ccd\u0ca8\u0cc1 \u0c9f\u0cc8\u0caa\u0ccd\u200c \u0cae\u0cbe\u0ca1\u0cbf:", instructions_audio: "\u0ca8\u0cbf\u0cae\u0c97\u0cc6 \u0c95\u0cc7\u0cb3\u0cbf\u0cb8\u0cc1\u0cb5\u0cc1\u0ca6\u0ca8\u0ccd\u0ca8\u0cc1 \u0c9f\u0cc8\u0caa\u0ccd\u200c \u0cae\u0cbe\u0ca1\u0cbf:",
        help_btn: "\u0cb8\u0cb9\u0cbe\u0caf", play_again: "\u0ca7\u0ccd\u0cb5\u0ca8\u0cbf\u0caf\u0ca8\u0ccd\u0ca8\u0cc1 \u0cae\u0ca4\u0ccd\u0ca4\u0cc6 \u0caa\u0ccd\u0cb2\u0cc7 \u0cae\u0cbe\u0ca1\u0cbf", cant_hear_this: "\u0ca7\u0ccd\u0cb5\u0ca8\u0cbf\u0caf\u0ca8\u0ccd\u0ca8\u0cc1 MP3 \u0cb0\u0cc2\u0caa\u0ca6\u0cb2\u0ccd\u0cb2\u0cbf \u0ca1\u0ccc\u0ca8\u0ccd\u200c\u0cb2\u0ccb\u0ca1\u0ccd \u0cae\u0cbe\u0ca1\u0cbf", incorrect_try_again: "\u0ca4\u0caa\u0ccd\u0caa\u0cbe\u0c97\u0cbf\u0ca6\u0cc6. \u0cae\u0ca4\u0ccd\u0ca4\u0cca\u0cae\u0ccd\u0cae\u0cc6 \u0caa\u0ccd\u0cb0\u0caf\u0ca4\u0ccd\u0ca8\u0cbf\u0cb8\u0cbf.",
        image_alt_text: "reCAPTCHA \u0cb8\u0cb5\u0cbe\u0cb2\u0cc1 \u0c9a\u0cbf\u0ca4\u0ccd\u0cb0", privacy_and_terms: "\u0c97\u0ccc\u0caa\u0ccd\u0caf\u0ca4\u0cc6 \u0cae\u0ca4\u0ccd\u0ca4\u0cc1 \u0ca8\u0cbf\u0caf\u0cae\u0c97\u0cb3\u0cc1"
    }, RecaptchaStr_ko = {
        visual_challenge: "\uadf8\ub9bc\uc73c\ub85c \ubcf4\uc548\ubb38\uc790 \ubc1b\uae30", audio_challenge: "\uc74c\uc131\uc73c\ub85c \ubcf4\uc548\ubb38\uc790 \ubc1b\uae30", refresh_btn: "\ubcf4\uc548\ubb38\uc790 \uc0c8\ub85c \ubc1b\uae30", instructions_visual: "\ub450 \ub2e8\uc5b4 \uc785\ub825:",
        instructions_context: "\uc785\ub825\ub780\uc5d0 \ub2e8\uc5b4 \uc785\ub825:", instructions_audio: "\uc74c\uc131 \ubcf4\uc548\ubb38\uc790 \uc785\ub825:", help_btn: "\ub3c4\uc6c0\ub9d0", play_again: "\uc74c\uc131 \ub2e4\uc2dc \ub4e3\uae30", cant_hear_this: "\uc74c\uc131\uc744 MP3\ub85c \ub2e4\uc6b4\ub85c\ub4dc", incorrect_try_again: "\ud2c0\ub838\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \uc2dc\ub3c4\ud574 \uc8fc\uc138\uc694.", image_alt_text: "reCAPTCHA \ubcf4\uc548\ubb38\uc790 \uc774\ubbf8\uc9c0", privacy_and_terms: "\uac1c\uc778\uc815\ubcf4 \ubcf4\ud638 \ubc0f \uc57d\uad00"
    },
    RecaptchaStr_lt = {
        visual_challenge: "Gauti vaizdin\u012f atpa\u017einimo test\u0105", audio_challenge: "Gauti garso atpa\u017einimo test\u0105", refresh_btn: "Gauti nauj\u0105 atpa\u017einimo test\u0105", instructions_visual: "\u012eveskite du \u017eod\u017eius:", instructions_context: "\u012eveskite \u017eod\u017eius laukeliuose:", instructions_audio: "\u012eveskite tai, k\u0105 girdite:", help_btn: "Pagalba", play_again: "Dar kart\u0105 paleisti gars\u0105", cant_hear_this: "Atsisi\u0173sti gars\u0105 kaip MP3",
        incorrect_try_again: "Neteisingai. Bandykite dar kart\u0105.", image_alt_text: "Testo \u201ereCAPTCHA\u201c vaizdas", privacy_and_terms: "Privatumas ir s\u0105lygos"
    }, RecaptchaStr_lv = {
        visual_challenge: "Sa\u0146emt vizu\u0101lu izaicin\u0101jumu", audio_challenge: "Sa\u0146emt audio izaicin\u0101jumu", refresh_btn: "Sa\u0146emt jaunu izaicin\u0101jumu", instructions_visual: "Ierakstiet divus v\u0101rdus:", instructions_context: "Ierakstiet v\u0101rdus lodzi\u0146os:", instructions_audio: "Ierakstiet dzirdamo:", help_btn: "Pal\u012bdz\u012bba",
        play_again: "V\u0113lreiz atska\u0146ot ska\u0146u", cant_hear_this: "Lejupiel\u0101d\u0113t ska\u0146u MP3\u00a0form\u0101t\u0101", incorrect_try_again: "Nepareizi. M\u0113\u0123iniet v\u0113lreiz.", image_alt_text: "reCAPTCHA izaicin\u0101juma att\u0113ls", privacy_and_terms: "Konfidencialit\u0101te un noteikumi"
    }, RecaptchaStr_ml = {
        visual_challenge: "\u0d12\u0d30\u0d41 \u0d26\u0d43\u0d36\u0d4d\u0d2f \u0d1a\u0d32\u0d1e\u0d4d\u0d1a\u0d4d \u0d28\u0d47\u0d1f\u0d41\u0d15", audio_challenge: "\u0d12\u0d30\u0d41 \u0d13\u0d21\u0d3f\u0d2f\u0d4b \u0d1a\u0d32\u0d1e\u0d4d\u0d1a\u0d4d \u0d28\u0d47\u0d1f\u0d41\u0d15",
        refresh_btn: "\u0d12\u0d30\u0d41 \u0d2a\u0d41\u0d24\u0d3f\u0d2f \u0d1a\u0d32\u0d1e\u0d4d\u0d1a\u0d4d \u0d28\u0d47\u0d1f\u0d41\u0d15", instructions_visual: "\u0d30\u0d23\u0d4d\u0d1f\u0d4d \u0d2a\u0d26\u0d19\u0d4d\u0d19\u0d7e \u0d1f\u0d48\u0d2a\u0d4d\u0d2a\u0d4d \u0d1a\u0d46\u0d2f\u0d4d\u0d2f\u0d41\u0d15:", instructions_context: "\u0d2c\u0d4b\u0d15\u0d4d\u200c\u0d38\u0d41\u0d15\u0d33\u0d3f\u0d32\u0d46 \u0d2a\u0d26\u0d19\u0d4d\u0d19\u0d7e \u0d1f\u0d48\u0d2a\u0d4d\u0d2a\u0d41\u0d1a\u0d46\u0d2f\u0d4d\u0d2f\u0d41\u0d15:",
        instructions_audio: "\u0d15\u0d47\u0d7e\u0d15\u0d4d\u0d15\u0d41\u0d28\u0d4d\u0d28\u0d24\u0d4d \u0d1f\u0d48\u0d2a\u0d4d\u0d2a\u0d4d \u0d1a\u0d46\u0d2f\u0d4d\u0d2f\u0d42:", help_btn: "\u0d38\u0d39\u0d3e\u0d2f\u0d02", play_again: "\u0d36\u0d2c\u0d4d\u200c\u0d26\u0d02 \u0d35\u0d40\u0d23\u0d4d\u0d1f\u0d41\u0d02 \u0d2a\u0d4d\u0d32\u0d47 \u0d1a\u0d46\u0d2f\u0d4d\u0d2f\u0d41\u0d15", cant_hear_this: "\u0d36\u0d2c\u0d4d\u200c\u0d26\u0d02 MP3 \u0d06\u0d2f\u0d3f \u0d21\u0d57\u0d7a\u0d32\u0d4b\u0d21\u0d4d \u0d1a\u0d46\u0d2f\u0d4d\u0d2f\u0d41\u0d15",
        incorrect_try_again: "\u0d24\u0d46\u0d31\u0d4d\u0d31\u0d3e\u0d23\u0d4d. \u0d35\u0d40\u0d23\u0d4d\u0d1f\u0d41\u0d02 \u0d36\u0d4d\u0d30\u0d2e\u0d3f\u0d15\u0d4d\u0d15\u0d41\u0d15.", image_alt_text: "reCAPTCHA \u0d1a\u0d32\u0d1e\u0d4d\u0d1a\u0d4d \u0d07\u0d2e\u0d47\u0d1c\u0d4d", privacy_and_terms: "\u0d38\u0d4d\u0d35\u0d15\u0d3e\u0d30\u0d4d\u0d2f\u0d24\u0d2f\u0d41\u0d02 \u0d28\u0d3f\u0d2c\u0d28\u0d4d\u0d27\u0d28\u0d15\u0d33\u0d41\u0d02"
    }, RecaptchaStr_mr = {
        visual_challenge: "\u0926\u0943\u0936\u094d\u200d\u092f\u092e\u093e\u0928 \u0906\u0935\u094d\u0939\u093e\u0928 \u092a\u094d\u0930\u093e\u092a\u094d\u0924 \u0915\u0930\u093e",
        audio_challenge: "\u0911\u0921\u0940\u0913 \u0906\u0935\u094d\u0939\u093e\u0928 \u092a\u094d\u0930\u093e\u092a\u094d\u0924 \u0915\u0930\u093e", refresh_btn: "\u090f\u0915 \u0928\u0935\u0940\u0928 \u0906\u0935\u094d\u0939\u093e\u0928 \u092a\u094d\u0930\u093e\u092a\u094d\u0924 \u0915\u0930\u093e", instructions_visual: "\u0926\u094b\u0928 \u0936\u092c\u094d\u0926 \u091f\u093e\u0907\u092a \u0915\u0930\u093e:", instructions_context: "\u092c\u0949\u0915\u094d\u200d\u0938\u0947\u0938\u092e\u0927\u0940\u0932 \u0936\u092c\u094d\u200d\u0926 \u091f\u093e\u0907\u092a \u0915\u0930\u093e:",
        instructions_audio: "\u0906\u092a\u0932\u094d\u092f\u093e\u0932\u093e \u091c\u0947 \u0910\u0915\u0942 \u092f\u0947\u0908\u0932 \u0924\u0947 \u091f\u093e\u0907\u092a \u0915\u0930\u093e:", help_btn: "\u092e\u0926\u0924", play_again: "\u0927\u094d\u200d\u0935\u0928\u0940 \u092a\u0941\u0928\u094d\u0939\u093e \u092a\u094d\u200d\u0932\u0947 \u0915\u0930\u093e", cant_hear_this: "MP3 \u0930\u0941\u092a\u093e\u0924 \u0927\u094d\u200d\u0935\u0928\u0940 \u0921\u093e\u0909\u0928\u0932\u094b\u0921 \u0915\u0930\u093e",
        incorrect_try_again: "\u0905\u092f\u094b\u0917\u094d\u200d\u092f. \u092a\u0941\u0928\u094d\u200d\u0939\u093e \u092a\u094d\u0930\u092f\u0924\u094d\u200d\u0928 \u0915\u0930\u093e.", image_alt_text: "reCAPTCHA \u0906\u0935\u094d\u200d\u0939\u093e\u0928 \u092a\u094d\u0930\u0924\u093f\u092e\u093e", privacy_and_terms: "\u0917\u094b\u092a\u0928\u0940\u092f\u0924\u093e \u0906\u0923\u093f \u0905\u091f\u0940"
    }, RecaptchaStr_ms = {
        visual_challenge: "Dapatkan cabaran visual", audio_challenge: "Dapatkan cabaran audio", refresh_btn: "Dapatkan cabaran baru",
        instructions_visual: "Taip kedua-dua perkataan:", instructions_context: "Taip perkataan dalam kotak:", instructions_audio: "Taip apa yang didengari:", help_btn: "Bantuan", play_again: "Mainkan bunyi sekali lagi", cant_hear_this: "Muat turun bunyi sebagai MP3", incorrect_try_again: "Tidak betul. Cuba lagi.", image_alt_text: "Imej cabaran reCAPTCHA", privacy_and_terms: "Privasi & Syarat"
    }, RecaptchaStr_nl = {
        visual_challenge: "Een visuele uitdaging proberen", audio_challenge: "Een audio-uitdaging proberen", refresh_btn: "Een nieuwe uitdaging proberen",
        instructions_visual: "Typ de twee woorden:", instructions_context: "Typ de woorden in de vakken:", instructions_audio: "Typ wat u hoort:", help_btn: "Help", play_again: "Geluid opnieuw afspelen", cant_hear_this: "Geluid downloaden als MP3", incorrect_try_again: "Onjuist. Probeer het opnieuw.", image_alt_text: "reCAPTCHA-uitdagingsafbeelding", privacy_and_terms: "Privacy en voorwaarden"
    }, RecaptchaStr_no = {
        visual_challenge: "F\u00e5 en bildeutfordring", audio_challenge: "F\u00e5 en lydutfordring", refresh_btn: "F\u00e5 en ny utfordring",
        instructions_visual: "Skriv inn de to ordene:", instructions_context: "Skriv inn ordene i feltene:", instructions_audio: "Skriv inn det du h\u00f8rer:", help_btn: "Hjelp", play_again: "Spill av lyd p\u00e5 nytt", cant_hear_this: "Last ned lyd som MP3", incorrect_try_again: "Feil. Pr\u00f8v p\u00e5 nytt.", image_alt_text: "reCAPTCHA-utfordringsbilde", privacy_and_terms: "Personvern og vilk\u00e5r"
    }, RecaptchaStr_pl = {
        visual_challenge: "Poka\u017c podpowied\u017a wizualn\u0105", audio_challenge: "Odtw\u00f3rz podpowied\u017a d\u017awi\u0119kow\u0105",
        refresh_btn: "Nowa podpowied\u017a", instructions_visual: "Wpisz oba wyrazy:", instructions_context: "Wpisz s\u0142owa wy\u015bwietlane w polach:", instructions_audio: "Wpisz us\u0142yszane s\u0142owa:", help_btn: "Pomoc", play_again: "Odtw\u00f3rz d\u017awi\u0119k ponownie", cant_hear_this: "Pobierz d\u017awi\u0119k jako plik MP3", incorrect_try_again: "Nieprawid\u0142owo. Spr\u00f3buj ponownie.", image_alt_text: "Zadanie obrazkowe reCAPTCHA", privacy_and_terms: "Prywatno\u015b\u0107 i warunki"
    }, RecaptchaStr_pt = {
        visual_challenge: "Obter um desafio visual",
        audio_challenge: "Obter um desafio de \u00e1udio", refresh_btn: "Obter um novo desafio", instructions_visual: "Digite as duas palavras:", instructions_context: "Digite as palavras das caixas:", instructions_audio: "Digite o que voc\u00ea ouve:", help_btn: "Ajuda", play_again: "Reproduzir som novamente", cant_hear_this: "Fazer download do som no formato MP3", incorrect_try_again: "Incorreto. Tente novamente.", image_alt_text: "Imagem de desafio reCAPTCHA", privacy_and_terms: "Privacidade e Termos"
    }, RecaptchaStr_pt_pt =
    { visual_challenge: "Obter um desafio visual", audio_challenge: "Obter um desafio de \u00e1udio", refresh_btn: "Obter um novo desafio", instructions_visual: "Escreva as duas palavras:", instructions_context: "Escreva as palavras nas caixas:", instructions_audio: "Escreva o que ouvir:", help_btn: "Ajuda", play_again: "Reproduzir som novamente", cant_hear_this: "Transferir som como MP3", incorrect_try_again: "Incorreto. Tente novamente.", image_alt_text: "Imagem de teste reCAPTCHA", privacy_and_terms: "Privacidade e Termos de Utiliza\u00e7\u00e3o" },
    RecaptchaStr_ro = {
        visual_challenge: "Ob\u0163ine\u0163i un cod captcha vizual", audio_challenge: "Ob\u0163ine\u0163i un cod captcha audio", refresh_btn: "Ob\u0163ine\u0163i un nou cod captcha", instructions_visual: "Introduce\u0163i cele dou\u0103 cuvinte:", instructions_context: "Introduce\u0163i cuvintele \u00een casete:", instructions_audio: "Introduce\u0163i ceea ce auzi\u0163i:", help_btn: "Ajutor", play_again: "Reda\u0163i sunetul din nou", cant_hear_this: "Desc\u0103rca\u0163i fi\u015fierul audio ca MP3", incorrect_try_again: "Incorect. \u00cencerca\u0163i din nou.",
        image_alt_text: "Imagine de verificare reCAPTCHA", privacy_and_terms: "Confiden\u0163ialitate \u015fi termeni"
    }, RecaptchaStr_ru = {
        visual_challenge: "\u0412\u0438\u0437\u0443\u0430\u043b\u044c\u043d\u0430\u044f \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0430", audio_challenge: "\u0417\u0432\u0443\u043a\u043e\u0432\u0430\u044f \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0430", refresh_btn: "\u041e\u0431\u043d\u043e\u0432\u0438\u0442\u044c", instructions_visual: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u043e, \u0447\u0442\u043e \u0432\u0438\u0434\u0438\u0442\u0435:",
        instructions_context: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u043b\u043e\u0432\u0430:", instructions_audio: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u043e, \u0447\u0442\u043e \u0441\u043b\u044b\u0448\u0438\u0442\u0435:", help_btn: "\u0421\u043f\u0440\u0430\u0432\u043a\u0430", play_again: "\u041f\u0440\u043e\u0441\u043b\u0443\u0448\u0430\u0442\u044c \u0435\u0449\u0435 \u0440\u0430\u0437", cant_hear_this: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c MP3-\u0444\u0430\u0439\u043b",
        incorrect_try_again: "\u041d\u0435\u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u043e. \u041f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u0435 \u043f\u043e\u043f\u044b\u0442\u043a\u0443.", image_alt_text: "\u041f\u0440\u043e\u0432\u0435\u0440\u043a\u0430 \u043f\u043e \u0441\u043b\u043e\u0432\u0443 reCAPTCHA", privacy_and_terms: "\u041f\u0440\u0430\u0432\u0438\u043b\u0430 \u0438 \u043f\u0440\u0438\u043d\u0446\u0438\u043f\u044b"
    }, RecaptchaStr_sk = {
        visual_challenge: "Zobrazi\u0165 vizu\u00e1lnu podobu", audio_challenge: "Prehra\u0165 zvukov\u00fa podobu",
        refresh_btn: "Zobrazi\u0165 nov\u00fd v\u00fdraz", instructions_visual: "Zadajte tieto dve slov\u00e1:", instructions_context: "Zadajte slov\u00e1 v poliach:", instructions_audio: "Zadajte, \u010do po\u010dujete:", help_btn: "Pomocn\u00edk", play_again: "Znova prehra\u0165 zvuk", cant_hear_this: "Prevzia\u0165 zvuk v podobe s\u00faboru MP3", incorrect_try_again: "Nespr\u00e1vne. Sk\u00faste to znova.", image_alt_text: "Obr\u00e1zok zadania reCAPTCHA", privacy_and_terms: "Ochrana osobn\u00fdch \u00fadajov a Zmluvn\u00e9 podmienky"
    },
    RecaptchaStr_sl = { visual_challenge: "Vizualni preskus", audio_challenge: "Zvo\u010dni preskus", refresh_btn: "Nov preskus", instructions_visual: "Vnesite besedi:", instructions_context: "Vnesite besede v okvir\u010dkih:", instructions_audio: "Natipkajte, kaj sli\u0161ite:", help_btn: "Pomo\u010d", play_again: "Znova predvajaj zvok", cant_hear_this: "Prenesi zvok kot MP3", incorrect_try_again: "Napa\u010dno. Poskusite znova.", image_alt_text: "Slika izziva reCAPTCHA", privacy_and_terms: "Zasebnost in pogoji" }, RecaptchaStr_sr =
    {
        visual_challenge: "\u041f\u0440\u0438\u043c\u0438\u0442\u0435 \u0432\u0438\u0437\u0443\u0435\u043b\u043d\u0438 \u0443\u043f\u0438\u0442", audio_challenge: "\u041f\u0440\u0438\u043c\u0438\u0442\u0435 \u0430\u0443\u0434\u0438\u043e \u0443\u043f\u0438\u0442", refresh_btn: "\u041f\u0440\u0438\u043c\u0438\u0442\u0435 \u043d\u043e\u0432\u0438 \u0443\u043f\u0438\u0442", instructions_visual: "\u041e\u0442\u043a\u0443\u0446\u0430\u0458\u0442\u0435 \u0434\u0432\u0435 \u0440\u0435\u0447\u0438:", instructions_context: "\u0423\u043a\u0443\u0446\u0430\u0458\u0442\u0435 \u0440\u0435\u0447\u0438 \u0443 \u043f\u043e\u0459\u0430:",
        instructions_audio: "\u041e\u0442\u043a\u0443\u0446\u0430\u0458\u0442\u0435 \u043e\u043d\u043e \u0448\u0442\u043e \u0447\u0443\u0458\u0435\u0442\u0435:", help_btn: "\u041f\u043e\u043c\u043e\u045b", play_again: "\u041f\u043e\u043d\u043e\u0432\u043e \u043f\u0443\u0441\u0442\u0438 \u0437\u0432\u0443\u043a", cant_hear_this: "\u041f\u0440\u0435\u0443\u0437\u043c\u0438 \u0437\u0432\u0443\u043a \u043a\u0430\u043e MP3 \u0441\u043d\u0438\u043c\u0430\u043a", incorrect_try_again: "\u041d\u0435\u0442\u0430\u0447\u043d\u043e. \u041f\u043e\u043a\u0443\u0448\u0430\u0458\u0442\u0435 \u043f\u043e\u043d\u043e\u0432\u043e.",
        image_alt_text: "\u0421\u043b\u0438\u043a\u0430 reCAPTCHA \u043f\u0440\u043e\u0432\u0435\u0440\u0435", privacy_and_terms: "\u041f\u0440\u0438\u0432\u0430\u0442\u043d\u043e\u0441\u0442 \u0438 \u0443\u0441\u043b\u043e\u0432\u0438"
    }, RecaptchaStr_sv = {
        visual_challenge: "H\u00e4mta captcha i bildformat", audio_challenge: "H\u00e4mta captcha i ljudformat", refresh_btn: "H\u00e4mta ny captcha", instructions_visual: "Skriv b\u00e5da orden:", instructions_context: "Skriv orden i rutorna:", instructions_audio: "Skriv det du h\u00f6r:",
        help_btn: "Hj\u00e4lp", play_again: "Spela upp ljudet igen", cant_hear_this: "H\u00e4mta ljud som MP3", incorrect_try_again: "Fel. F\u00f6rs\u00f6k igen.", image_alt_text: "reCAPTCHA-bild", privacy_and_terms: "Sekretess och villkor"
    }, RecaptchaStr_sw = {
        visual_challenge: "Pata herufi za kusoma", audio_challenge: "Pata herufi za kusikiliza", refresh_btn: "Pata herufi mpya", instructions_visual: "Charaza maneno mawili unayoyaona:", instructions_context: "Charaza maneno katika masanduku:", instructions_audio: "Charaza unachosikia:",
        help_btn: "Usaidizi", play_again: "Cheza sauti tena", cant_hear_this: "Pakua sauti kama MP3", incorrect_try_again: "Sio sahihi. Jaribu tena.", image_alt_text: "picha ya changamoto ya reCAPTCHA", privacy_and_terms: "Faragha & Masharti"
    }, RecaptchaStr_ta = {
        visual_challenge: "\u0baa\u0bbe\u0bb0\u0bcd\u0bb5\u0bc8 \u0b9a\u0bc7\u0bb2\u0b9e\u0bcd\u0b9a\u0bc8\u0baa\u0bcd \u0baa\u0bc6\u0bb1\u0bc1\u0b95", audio_challenge: "\u0b86\u0b9f\u0bbf\u0baf\u0bcb \u0b9a\u0bc7\u0bb2\u0b9e\u0bcd\u0b9a\u0bc8\u0baa\u0bcd \u0baa\u0bc6\u0bb1\u0bc1\u0b95",
        refresh_btn: "\u0baa\u0bc1\u0ba4\u0bbf\u0baf \u0b9a\u0bc7\u0bb2\u0b9e\u0bcd\u0b9a\u0bc8\u0baa\u0bcd \u0baa\u0bc6\u0bb1\u0bc1\u0b95", instructions_visual: "\u0b9a\u0bca\u0bb1\u0bcd\u0b95\u0bb3\u0bc8 \u0b9f\u0bc8\u0baa\u0bcd \u0b9a\u0bc6\u0baf\u0bcd\u0b95:", instructions_context: "\u0baa\u0bc6\u0b9f\u0bcd\u0b9f\u0bbf\u0baf\u0bbf\u0bb2\u0bcd \u0b89\u0bb3\u0bcd\u0bb3 \u0b9a\u0bca\u0bb1\u0bcd\u0b95\u0bb3\u0bc8 \u0b89\u0bb3\u0bcd\u0bb3\u0bbf\u0b9f\u0bc1\u0b95:", instructions_audio: "\u0b95\u0bc7\u0b9f\u0bcd\u0baa\u0ba4\u0bc8 \u0b9f\u0bc8\u0baa\u0bcd \u0b9a\u0bc6\u0baf\u0bcd\u0b95:",
        help_btn: "\u0b89\u0ba4\u0bb5\u0bbf", play_again: "\u0b92\u0bb2\u0bbf\u0baf\u0bc8 \u0bae\u0bc0\u0ba3\u0bcd\u0b9f\u0bc1\u0bae\u0bcd \u0b87\u0baf\u0b95\u0bcd\u0b95\u0bc1", cant_hear_this: "\u0b92\u0bb2\u0bbf\u0baf\u0bc8 MP3 \u0b86\u0b95 \u0baa\u0ba4\u0bbf\u0bb5\u0bbf\u0bb1\u0b95\u0bcd\u0b95\u0bc1\u0b95", incorrect_try_again: "\u0ba4\u0bb5\u0bb1\u0bbe\u0ba9\u0ba4\u0bc1. \u0bae\u0bc0\u0ba3\u0bcd\u0b9f\u0bc1\u0bae\u0bcd \u0bae\u0bc1\u0baf\u0bb2\u0bb5\u0bc1\u0bae\u0bcd.", image_alt_text: "reCAPTCHA \u0b9a\u0bc7\u0bb2\u0b9e\u0bcd\u0b9a\u0bcd \u0baa\u0b9f\u0bae\u0bcd",
        privacy_and_terms: "\u0ba4\u0ba9\u0bbf\u0baf\u0bc1\u0bb0\u0bbf\u0bae\u0bc8 & \u0bb5\u0bbf\u0ba4\u0bbf\u0bae\u0bc1\u0bb1\u0bc8\u0b95\u0bb3\u0bcd"
    }, RecaptchaStr_te = {
        visual_challenge: "\u0c12\u0c15 \u0c26\u0c43\u0c36\u0c4d\u0c2f\u0c2e\u0c3e\u0c28 \u0c38\u0c35\u0c3e\u0c32\u0c41\u0c28\u0c41 \u0c38\u0c4d\u0c35\u0c40\u0c15\u0c30\u0c3f\u0c02\u0c1a\u0c02\u0c21\u0c3f", audio_challenge: "\u0c12\u0c15 \u0c06\u0c21\u0c3f\u0c2f\u0c4b \u0c38\u0c35\u0c3e\u0c32\u0c41\u0c28\u0c41 \u0c38\u0c4d\u0c35\u0c40\u0c15\u0c30\u0c3f\u0c02\u0c1a\u0c02\u0c21\u0c3f",
        refresh_btn: "\u0c15\u0c4d\u0c30\u0c4a\u0c24\u0c4d\u0c24 \u0c38\u0c35\u0c3e\u0c32\u0c41\u0c28\u0c41 \u0c38\u0c4d\u0c35\u0c40\u0c15\u0c30\u0c3f\u0c02\u0c1a\u0c02\u0c21\u0c3f", instructions_visual: "\u0c30\u0c46\u0c02\u0c21\u0c41 \u0c2a\u0c26\u0c3e\u0c32\u0c28\u0c41 \u0c1f\u0c48\u0c2a\u0c4d \u0c1a\u0c47\u0c2f\u0c02\u0c21\u0c3f:", instructions_context: "\u0c2a\u0c26\u0c3e\u0c32\u0c28\u0c41 \u0c2a\u0c46\u0c1f\u0c4d\u0c1f\u0c46\u0c32\u0c4d\u0c32\u0c4b \u0c1f\u0c48\u0c2a\u0c4d \u0c1a\u0c47\u0c2f\u0c02\u0c21\u0c3f:",
        instructions_audio: "\u0c2e\u0c40\u0c30\u0c41 \u0c35\u0c3f\u0c28\u0c4d\u0c28\u0c26\u0c3f \u0c1f\u0c48\u0c2a\u0c4d \u0c1a\u0c47\u0c2f\u0c02\u0c21\u0c3f:", help_btn: "\u0c38\u0c39\u0c3e\u0c2f\u0c02", play_again: "\u0c27\u0c4d\u0c35\u0c28\u0c3f\u0c28\u0c3f \u0c2e\u0c33\u0c4d\u0c32\u0c40 \u0c2a\u0c4d\u0c32\u0c47 \u0c1a\u0c47\u0c2f\u0c3f", cant_hear_this: "\u0c27\u0c4d\u0c35\u0c28\u0c3f\u0c28\u0c3f MP3 \u0c35\u0c32\u0c46 \u0c21\u0c4c\u0c28\u0c4d\u200c\u0c32\u0c4b\u0c21\u0c4d \u0c1a\u0c47\u0c2f\u0c3f", incorrect_try_again: "\u0c24\u0c2a\u0c4d\u0c2a\u0c41. \u0c2e\u0c33\u0c4d\u0c32\u0c40 \u0c2a\u0c4d\u0c30\u0c2f\u0c24\u0c4d\u0c28\u0c3f\u0c02\u0c1a\u0c02\u0c21\u0c3f.",
        image_alt_text: "reCAPTCHA \u0c38\u0c35\u0c3e\u0c32\u0c41 \u0c1a\u0c3f\u0c24\u0c4d\u0c30\u0c02", privacy_and_terms: "\u0c17\u0c4b\u0c2a\u0c4d\u0c2f\u0c24 & \u0c28\u0c3f\u0c2c\u0c02\u0c27\u0c28\u0c32\u0c41"
    }, RecaptchaStr_th = {
        visual_challenge: "\u0e23\u0e31\u0e1a\u0e04\u0e27\u0e32\u0e21\u0e17\u0e49\u0e32\u0e17\u0e32\u0e22\u0e14\u0e49\u0e32\u0e19\u0e20\u0e32\u0e1e", audio_challenge: "\u0e23\u0e31\u0e1a\u0e04\u0e27\u0e32\u0e21\u0e17\u0e49\u0e32\u0e17\u0e32\u0e22\u0e14\u0e49\u0e32\u0e19\u0e40\u0e2a\u0e35\u0e22\u0e07",
        refresh_btn: "\u0e23\u0e31\u0e1a\u0e04\u0e27\u0e32\u0e21\u0e17\u0e49\u0e32\u0e17\u0e32\u0e22\u0e43\u0e2b\u0e21\u0e48", instructions_visual: "\u0e1e\u0e34\u0e21\u0e1e\u0e4c\u0e04\u0e33\u0e2a\u0e2d\u0e07\u0e04\u0e33\u0e19\u0e31\u0e49\u0e19:", instructions_context: "\u0e1e\u0e34\u0e21\u0e1e\u0e4c\u0e04\u0e33\u0e19\u0e31\u0e49\u0e19\u0e43\u0e19\u0e0a\u0e48\u0e2d\u0e07\u0e19\u0e35\u0e49:", instructions_audio: "\u0e1e\u0e34\u0e21\u0e1e\u0e4c\u0e2a\u0e34\u0e48\u0e07\u0e17\u0e35\u0e48\u0e04\u0e38\u0e13\u0e44\u0e14\u0e49\u0e22\u0e34\u0e19:",
        help_btn: "\u0e04\u0e27\u0e32\u0e21\u0e0a\u0e48\u0e27\u0e22\u0e40\u0e2b\u0e25\u0e37\u0e2d", play_again: "\u0e40\u0e25\u0e48\u0e19\u0e40\u0e2a\u0e35\u0e22\u0e07\u0e2d\u0e35\u0e01\u0e04\u0e23\u0e31\u0e49\u0e07", cant_hear_this: "\u0e14\u0e32\u0e27\u0e42\u0e2b\u0e25\u0e14\u0e40\u0e2a\u0e35\u0e22\u0e07\u0e40\u0e1b\u0e47\u0e19 MP3", incorrect_try_again: "\u0e44\u0e21\u0e48\u0e16\u0e39\u0e01\u0e15\u0e49\u0e2d\u0e07 \u0e25\u0e2d\u0e07\u0e2d\u0e35\u0e01\u0e04\u0e23\u0e31\u0e49\u0e07", image_alt_text: "\u0e23\u0e2b\u0e31\u0e2a\u0e20\u0e32\u0e1e reCAPTCHA",
        privacy_and_terms: "\u0e19\u0e42\u0e22\u0e1a\u0e32\u0e22\u0e2a\u0e48\u0e27\u0e19\u0e1a\u0e38\u0e04\u0e04\u0e25\u0e41\u0e25\u0e30\u0e02\u0e49\u0e2d\u0e01\u0e33\u0e2b\u0e19\u0e14"
    }, RecaptchaStr_tr = {
        visual_challenge: "G\u00f6rsel sorgu al", audio_challenge: "Sesli sorgu al", refresh_btn: "Yeniden y\u00fckle", instructions_visual: "\u0130ki kelimeyi yaz\u0131n:", instructions_context: "Kutudaki kelimeleri yaz\u0131n:", instructions_audio: "Duydu\u011funuzu yaz\u0131n:", help_btn: "Yard\u0131m", play_again: "Sesi tekrar \u00e7al",
        cant_hear_this: "Sesi MP3 olarak indir", incorrect_try_again: "Yanl\u0131\u015f. Tekrar deneyin.", image_alt_text: "reCAPTCHA sorusu resmi", privacy_and_terms: "Gizlilik ve \u015eartlar"
    }, RecaptchaStr_uk = {
        visual_challenge: "\u041e\u0442\u0440\u0438\u043c\u0430\u0442\u0438 \u0432\u0456\u0437\u0443\u0430\u043b\u044c\u043d\u0438\u0439 \u0442\u0435\u043a\u0441\u0442", audio_challenge: "\u041e\u0442\u0440\u0438\u043c\u0430\u0442\u0438 \u0430\u0443\u0434\u0456\u043e\u0437\u0430\u043f\u0438\u0441", refresh_btn: "\u041e\u043d\u043e\u0432\u0438\u0442\u0438 \u0442\u0435\u043a\u0441\u0442",
        instructions_visual: "\u0412\u0432\u0435\u0434\u0456\u0442\u044c \u0434\u0432\u0430 \u0441\u043b\u043e\u0432\u0430:", instructions_context: "\u0412\u0432\u0435\u0434\u0456\u0442\u044c \u0441\u043b\u043e\u0432\u0430 \u0432 \u043f\u043e\u043b\u044f:", instructions_audio: "\u0412\u0432\u0435\u0434\u0456\u0442\u044c \u043f\u043e\u0447\u0443\u0442\u0435:", help_btn: "\u0414\u043e\u0432\u0456\u0434\u043a\u0430", play_again: "\u0412\u0456\u0434\u0442\u0432\u043e\u0440\u0438\u0442\u0438 \u0437\u0430\u043f\u0438\u0441 \u0449\u0435 \u0440\u0430\u0437",
        cant_hear_this: "\u0417\u0430\u0432\u0430\u043d\u0442\u0430\u0436\u0438\u0442\u0438 \u0437\u0430\u043f\u0438\u0441 \u044f\u043a MP3", incorrect_try_again: "\u041d\u0435\u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u043e. \u0421\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0449\u0435 \u0440\u0430\u0437.", image_alt_text: "\u0417\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u043d\u044f \u0437\u0430\u0432\u0434\u0430\u043d\u043d\u044f reCAPTCHA", privacy_and_terms: "\u041a\u043e\u043d\u0444\u0456\u0434\u0435\u043d\u0446\u0456\u0439\u043d\u0456\u0441\u0442\u044c \u0456 \u0443\u043c\u043e\u0432\u0438"
    },
    RecaptchaStr_ur = {
        visual_challenge: "\u0627\u06cc\u06a9 \u0645\u0631\u0626\u06cc \u0686\u06cc\u0644\u0646\u062c \u062d\u0627\u0635\u0644 \u06a9\u0631\u06cc\u06ba", audio_challenge: "\u0627\u06cc\u06a9 \u0622\u0688\u06cc\u0648 \u0686\u06cc\u0644\u0646\u062c \u062d\u0627\u0635\u0644 \u06a9\u0631\u06cc\u06ba", refresh_btn: "\u0627\u06cc\u06a9 \u0646\u06cc\u0627 \u0686\u06cc\u0644\u0646\u062c \u062d\u0627\u0635\u0644 \u06a9\u0631\u06cc\u06ba", instructions_visual: "\u062f\u0648 \u0627\u0644\u0641\u0627\u0638 \u0679\u0627\u0626\u067e \u06a9\u0631\u06cc\u06ba:",
        instructions_context: "\u0627\u0644\u0641\u0627\u0638 \u062e\u0627\u0646\u0648\u06ba \u0645\u06cc\u06ba \u0679\u0627\u0626\u067e \u06a9\u0631\u06cc\u06ba:", instructions_audio: "\u062c\u0648 \u0633\u0646\u0627\u0626\u06cc \u062f\u06cc\u062a\u0627 \u06c1\u06d2 \u0648\u06c1 \u0679\u0627\u0626\u067e \u06a9\u0631\u06cc\u06ba:", help_btn: "\u0645\u062f\u062f", play_again: "\u0622\u0648\u0627\u0632 \u062f\u0648\u0628\u0627\u0631\u06c1 \u0686\u0644\u0627\u0626\u06cc\u06ba", cant_hear_this: "\u0622\u0648\u0627\u0632 \u06a9\u0648 MP3 \u06a9\u06d2 \u0628\u0637\u0648\u0631 \u0688\u0627\u0624\u0646 \u0644\u0648\u0688 \u06a9\u0631\u06cc\u06ba",
        incorrect_try_again: "\u063a\u0644\u0637\u06d4 \u062f\u0648\u0628\u0627\u0631\u06c1 \u06a9\u0648\u0634\u0634 \u06a9\u0631\u06cc\u06ba\u06d4", image_alt_text: "reCAPTCHA \u0686\u06cc\u0644\u0646\u062c \u0648\u0627\u0644\u06cc \u0634\u0628\u06cc\u06c1", privacy_and_terms: "\u0631\u0627\u0632\u062f\u0627\u0631\u06cc \u0648 \u0634\u0631\u0627\u0626\u0637"
    }, RecaptchaStr_vi = {
        visual_challenge: "Nh\u1eadn th\u1eed th\u00e1ch h\u00ecnh \u1ea3nh", audio_challenge: "Nh\u1eadn th\u1eed th\u00e1ch \u00e2m thanh", refresh_btn: "Nh\u1eadn th\u1eed th\u00e1ch m\u1edbi",
        instructions_visual: "Nh\u1eadp hai t\u1eeb:", instructions_context: "Nh\u1eadp c\u00e1c t\u1eeb trong c\u00e1c \u00f4:", instructions_audio: "Nh\u1eadp n\u1ed9i dung b\u1ea1n nghe th\u1ea5y:", help_btn: "Tr\u1ee3 gi\u00fap", play_again: "Ph\u00e1t l\u1ea1i \u00e2m thanh", cant_hear_this: "T\u1ea3i \u00e2m thanh xu\u1ed1ng d\u01b0\u1edbi d\u1ea1ng MP3", incorrect_try_again: "Kh\u00f4ng ch\u00ednh x\u00e1c. H\u00e3y th\u1eed l\u1ea1i.", image_alt_text: "H\u00ecnh x\u00e1c th\u1ef1c reCAPTCHA", privacy_and_terms: "B\u1ea3o m\u1eadt v\u00e0 \u0111i\u1ec1u kho\u1ea3n"
    },
    RecaptchaStr_zh_cn = {
        visual_challenge: "\u6536\u5230\u4e00\u4e2a\u89c6\u9891\u9080\u8bf7", audio_challenge: "\u6362\u4e00\u7ec4\u97f3\u9891\u9a8c\u8bc1\u7801", refresh_btn: "\u6362\u4e00\u7ec4\u9a8c\u8bc1\u7801", instructions_visual: "\u8bf7\u952e\u5165\u8fd9\u4e24\u4e2a\u8bcd\uff1a", instructions_context: "\u952e\u5165\u6846\u4e2d\u663e\u793a\u7684\u5b57\u8bcd\uff1a", instructions_audio: "\u8bf7\u952e\u5165\u60a8\u542c\u5230\u7684\u5185\u5bb9\uff1a", help_btn: "\u5e2e\u52a9", play_again: "\u91cd\u65b0\u64ad\u653e",
        cant_hear_this: "\u4ee5 MP3 \u683c\u5f0f\u4e0b\u8f7d\u58f0\u97f3", incorrect_try_again: "\u4e0d\u6b63\u786e\uff0c\u8bf7\u91cd\u8bd5\u3002", image_alt_text: "reCAPTCHA \u9a8c\u8bc1\u56fe\u7247", privacy_and_terms: "\u9690\u79c1\u6743\u548c\u4f7f\u7528\u6761\u6b3e"
    }, RecaptchaStr_zh_hk = {
        visual_challenge: "\u56de\u7b54\u5716\u50cf\u9a57\u8b49\u554f\u984c", audio_challenge: "\u53d6\u5f97\u8a9e\u97f3\u9a57\u8b49\u554f\u984c", refresh_btn: "\u63db\u4e00\u500b\u9a57\u8b49\u554f\u984c", instructions_visual: "\u8acb\u8f38\u5165\u9019\u5169\u500b\u5b57\uff1a",
        instructions_context: "\u5728\u6846\u5167\u8f38\u5165\u5b57\u8a5e\uff1a", instructions_audio: "\u9375\u5165\u60a8\u6240\u807d\u5230\u7684\uff1a", help_btn: "\u8aaa\u660e", play_again: "\u518d\u6b21\u64ad\u653e\u8072\u97f3", cant_hear_this: "\u5c07\u8072\u97f3\u4e0b\u8f09\u70ba MP3", incorrect_try_again: "\u4e0d\u6b63\u78ba\uff0c\u518d\u8a66\u4e00\u6b21\u3002", image_alt_text: "reCAPTCHA \u9a57\u8b49\u6587\u5b57\u5716\u7247", privacy_and_terms: "\u79c1\u96b1\u6b0a\u8207\u689d\u6b3e"
    }, RecaptchaStr_zh_tw = {
        visual_challenge: "\u53d6\u5f97\u5716\u7247\u9a57\u8b49\u554f\u984c",
        audio_challenge: "\u53d6\u5f97\u8a9e\u97f3\u9a57\u8b49\u554f\u984c", refresh_btn: "\u53d6\u5f97\u65b0\u7684\u9a57\u8b49\u554f\u984c", instructions_visual: "\u8acb\u8f38\u5165\u4e0b\u5716\u4e2d\u7684\u5169\u500b\u5b57\uff1a", instructions_context: "\u8acb\u8f38\u5165\u65b9\u584a\u4e2d\u7684\u6587\u5b57\uff1a", instructions_audio: "\u8acb\u8f38\u5165\u8a9e\u97f3\u5167\u5bb9\uff1a", help_btn: "\u8aaa\u660e", play_again: "\u518d\u6b21\u64ad\u653e", cant_hear_this: "\u4ee5 MP3 \u683c\u5f0f\u4e0b\u8f09\u8072\u97f3", incorrect_try_again: "\u9a57\u8b49\u78bc\u6709\u8aa4\uff0c\u8acb\u518d\u8a66\u4e00\u6b21\u3002",
        image_alt_text: "reCAPTCHA \u9a57\u8b49\u6587\u5b57\u5716\u7247", privacy_and_terms: "\u96b1\u79c1\u6b0a\u8207\u689d\u6b3e"
    }, RecaptchaStr_zu = {
        visual_challenge: "Thola inselelo ebonakalayo", audio_challenge: "Thola inselelo yokulalelwayo", refresh_btn: "Thola inselelo entsha", instructions_visual: "Bhala lawa magama amabili:", instructions_context: "Bhala amagama asemabhokisini:", instructions_audio: "Bhala okuzwayo:", help_btn: "Usizo", play_again: "Phinda udlale okulalelwayo futhi", cant_hear_this: "Layisha umsindo njenge-MP3",
        incorrect_try_again: "Akulungile. Zama futhi.", image_alt_text: "umfanekiso oyinselelo we-reCAPTCHA", privacy_and_terms: "Okwangasese kanye nemigomo"
    }, RecaptchaLangMap = {
        en: RecaptchaStr_en, af: RecaptchaStr_af, am: RecaptchaStr_am, ar: RecaptchaStr_ar, "ar-EG": RecaptchaStr_ar, bg: RecaptchaStr_bg, bn: RecaptchaStr_bn, ca: RecaptchaStr_ca, cs: RecaptchaStr_cs, da: RecaptchaStr_da, de: RecaptchaStr_de, el: RecaptchaStr_el, "en-GB": RecaptchaStr_en, "en-US": RecaptchaStr_en, es: RecaptchaStr_es, "es-419": RecaptchaStr_es_419, "es-ES": RecaptchaStr_es,
        et: RecaptchaStr_et, eu: RecaptchaStr_eu, fa: RecaptchaStr_fa, fi: RecaptchaStr_fi, fil: RecaptchaStr_fil, fr: RecaptchaStr_fr, "fr-CA": RecaptchaStr_fr_ca, "fr-FR": RecaptchaStr_fr, gl: RecaptchaStr_gl, gu: RecaptchaStr_gu, hi: RecaptchaStr_hi, hr: RecaptchaStr_hr, hu: RecaptchaStr_hu, hy: RecaptchaStr_hy, id: RecaptchaStr_id, is: RecaptchaStr_is, it: RecaptchaStr_it, iw: RecaptchaStr_iw, ja: RecaptchaStr_ja, kn: RecaptchaStr_kn, ko: RecaptchaStr_ko, ln: RecaptchaStr_fr, lt: RecaptchaStr_lt, lv: RecaptchaStr_lv, ml: RecaptchaStr_ml, mr: RecaptchaStr_mr,
        ms: RecaptchaStr_ms, nl: RecaptchaStr_nl, no: RecaptchaStr_no, pl: RecaptchaStr_pl, pt: RecaptchaStr_pt, "pt-BR": RecaptchaStr_pt, "pt-PT": RecaptchaStr_pt_pt, ro: RecaptchaStr_ro, ru: RecaptchaStr_ru, sk: RecaptchaStr_sk, sl: RecaptchaStr_sl, sr: RecaptchaStr_sr, sv: RecaptchaStr_sv, sw: RecaptchaStr_sw, ta: RecaptchaStr_ta, te: RecaptchaStr_te, th: RecaptchaStr_th, tr: RecaptchaStr_tr, uk: RecaptchaStr_uk, ur: RecaptchaStr_ur, vi: RecaptchaStr_vi, "zh-CN": RecaptchaStr_zh_cn, "zh-HK": RecaptchaStr_zh_hk, "zh-TW": RecaptchaStr_zh_tw, zu: RecaptchaStr_zu,
        tl: RecaptchaStr_fil, he: RecaptchaStr_iw, "in": RecaptchaStr_id, mo: RecaptchaStr_ro, zh: RecaptchaStr_zh_cn
    }; var RecaptchaStr = RecaptchaStr_en, RecaptchaOptions, RecaptchaDefaultOptions = { tabindex: 0, theme: "red", callback: null, lang: null, custom_theme_widget: null, custom_translations: null, includeContext: !1 }, Recaptcha = {
        widget: null, timer_id: -1, style_set: !1, theme: null, type: "image", ajax_verify_cb: null, $: function(a) { return "string" == typeof a ? document.getElementById(a) : a }, attachEvent: function(a, b, c) { a && a.addEventListener ? a.addEventListener(b, c, !1) : a && a.attachEvent && a.attachEvent("on" + b, c) }, create: function(a, b, c) {
            Recaptcha.destroy();
            b && (Recaptcha.widget = Recaptcha.$(b)); Recaptcha._init_options(c); Recaptcha._call_challenge(a)
        }, destroy: function() { var a = Recaptcha.$("recaptcha_challenge_field"); a && a.parentNode.removeChild(a); -1 != Recaptcha.timer_id && clearInterval(Recaptcha.timer_id); Recaptcha.timer_id = -1; if (a = Recaptcha.$("recaptcha_image")) a.innerHTML = ""; Recaptcha.widget && ("custom" != Recaptcha.theme ? Recaptcha.widget.innerHTML = "" : Recaptcha.widget.style.display = "none", Recaptcha.widget = null) }, focus_response_field: function() {
            var a = Recaptcha.$("recaptcha_response_field");
            a.focus()
        }, get_challenge: function() { return "undefined" == typeof RecaptchaState ? null : RecaptchaState.challenge }, get_response: function() { var a = Recaptcha.$("recaptcha_response_field"); return !a ? null : a.value }, ajax_verify: function(a) { Recaptcha.ajax_verify_cb = a; a = Recaptcha.get_challenge() || ""; var b = Recaptcha.get_response() || ""; a = Recaptcha._get_api_server() + "/ajaxverify?c=" + encodeURIComponent(a) + "&response=" + encodeURIComponent(b); Recaptcha._add_script(a) }, _ajax_verify_callback: function(a) { Recaptcha.ajax_verify_cb(a) },
        _get_api_server: function() { var a = window.location.protocol, b; if ("undefined" != typeof _RecaptchaOverrideApiServer) b = _RecaptchaOverrideApiServer; else { if ("undefined" != typeof RecaptchaState && "string" == typeof RecaptchaState.server && 0 < RecaptchaState.server.length) return RecaptchaState.server.replace(/\/+$/, ""); b = "www.google.com/recaptcha/api" } return a + "//" + b }, _call_challenge: function(a) {
            a = Recaptcha._get_api_server() + "/challenge?k=" + a + "&ajax=1&cachestop=" + Math.random(); Recaptcha.getLang_() && (a += "&lang=" + Recaptcha.getLang_());
            "undefined" != typeof RecaptchaOptions.extra_challenge_params && (a += "&" + RecaptchaOptions.extra_challenge_params); RecaptchaOptions.includeContext && (a += "&includeContext=1"); Recaptcha._add_script(a)
        }, _add_script: function(a) { var b = document.createElement("script"); b.type = "text/javascript"; b.src = a; Recaptcha._get_script_area().appendChild(b) }, _get_script_area: function() { var a = document.getElementsByTagName("head"); return a = !a || 1 > a.length ? document.body : a[0] }, _hash_merge: function(a) {
            for (var b = {}, c = 0; c < a.length; c++) for (var d in a[c]) b[d] =
    a[c][d]; "context" == b.theme && (b.includeContext = !0); return b
        }, _init_options: function(a) { a = a || {}; RecaptchaOptions = Recaptcha._hash_merge([RecaptchaDefaultOptions, a]) }, challenge_callback: function() {
            var a = Recaptcha.widget; Recaptcha._reset_timer(); RecaptchaStr = Recaptcha._hash_merge([RecaptchaStr_en, RecaptchaLangMap[Recaptcha.getLang_()] || {}, RecaptchaOptions.custom_translations || {}]); window.addEventListener && window.addEventListener("unload", function(a) { Recaptcha.destroy() }, !1); Recaptcha._is_ie() && window.attachEvent &&
    window.attachEvent("onbeforeunload", function() { }); if (0 < navigator.userAgent.indexOf("KHTML")) { a = document.createElement("iframe"); a.src = "about:blank"; a.style.height = "0px"; a.style.width = "0px"; a.style.visibility = "hidden"; a.style.border = "none"; var b = document.createTextNode("This frame prevents back/forward cache problems in Safari."); a.appendChild(b); document.body.appendChild(a) } Recaptcha._finish_widget()
        }, _add_css: function(a) {
            if (-1 != navigator.appVersion.indexOf("MSIE 5")) document.write('<style type="text/css">' +
    a + "</style>"); else { var b = document.createElement("style"); b.type = "text/css"; b.styleSheet ? b.styleSheet.cssText = a : (a = document.createTextNode(a), b.appendChild(a)); Recaptcha._get_script_area().appendChild(b) }
        }, _set_style: function(a) { Recaptcha.style_set || (Recaptcha.style_set = !0, Recaptcha._add_css(a + "\n\n.recaptcha_is_showing_audio .recaptcha_only_if_image,.recaptcha_isnot_showing_audio .recaptcha_only_if_audio,.recaptcha_had_incorrect_sol .recaptcha_only_if_no_incorrect_sol,.recaptcha_nothad_incorrect_sol .recaptcha_only_if_incorrect_sol{display:none !important}")) },
        _init_builtin_theme: function() {
            var a = Recaptcha.$, b = Recaptcha._get_api_server(), c = b.length - 1; "/" == b[c] && (b = b.substring(0, c)); var c = RecaptchaTemplates.VertCss, d = RecaptchaTemplates.VertHtml, e = b + "/img/" + Recaptcha.theme, f = "gif", b = Recaptcha.theme; "clean" == b && (c = RecaptchaTemplates.CleanCss, d = RecaptchaTemplates.CleanHtml, f = "png"); "context" == b && (d = RecaptchaTemplates.ContextHtml); c = c.replace(/IMGROOT/g, e); Recaptcha._set_style(c); Recaptcha.widget.innerHTML = '<div id="recaptcha_area">' + d + "</div>"; c = Recaptcha.getLang_();
            a("recaptcha_privacy") && (null != c && "en" == c.substring(0, 2).toLowerCase() && null != RecaptchaStr.privacy_and_terms && 0 < RecaptchaStr.privacy_and_terms.length) && (c = document.createElement("a"), c.href = "http://www.google.com/intl/en/policies/", c.target = "_blank", c.innerHTML = RecaptchaStr.privacy_and_terms, a("recaptcha_privacy").appendChild(c)); c = function(b, c, d, h) { var g = a(b); g.src = e + "/" + c + "." + f; c = RecaptchaStr[d]; g.alt = c; b = a(b + "_btn"); b.title = c; Recaptcha.attachEvent(b, "click", h) }; c("recaptcha_reload", "refresh", "refresh_btn",
    Recaptcha.reload); c("recaptcha_switch_audio", "audio", "audio_challenge", function() { Recaptcha.switch_type("audio") }); c("recaptcha_switch_img", "text", "visual_challenge", function() { Recaptcha.switch_type("image") }); c("recaptcha_whatsthis", "help", "help_btn", Recaptcha.showhelp); "clean" == b && (a("recaptcha_logo").src = e + "/logo." + f); a("recaptcha_table").className = "recaptchatable recaptcha_theme_" + Recaptcha.theme; b = function(b, c) {
        var d = a(b); d && (RecaptchaState.rtl && "span" == d.tagName.toLowerCase() && (d.dir = "rtl"),
    d.appendChild(document.createTextNode(RecaptchaStr[c])))
    }; b("recaptcha_instructions_image", "instructions_visual"); b("recaptcha_instructions_context", "instructions_context"); b("recaptcha_instructions_audio", "instructions_audio"); b("recaptcha_instructions_error", "incorrect_try_again"); !a("recaptcha_instructions_image") && !a("recaptcha_instructions_audio") && (b = "audio" == Recaptcha.type ? RecaptchaStr.instructions_audio : RecaptchaStr.instructions_visual, b = b.replace(/:$/, ""), a("recaptcha_response_field").setAttribute("placeholder",
    b))
        }, _finish_widget: function() {
            var a = Recaptcha.$, b = RecaptchaOptions, c = b.theme, d = { blackglass: 1, clean: 1, context: 1, custom: 1, red: 1, white: 1 }; c in d || (c = "red"); Recaptcha.theme || (Recaptcha.theme = c); "custom" != Recaptcha.theme ? Recaptcha._init_builtin_theme() : Recaptcha._set_style(""); c = document.createElement("span"); c.id = "recaptcha_challenge_field_holder"; c.style.display = "none"; a("recaptcha_response_field").parentNode.insertBefore(c, a("recaptcha_response_field")); a("recaptcha_response_field").setAttribute("autocomplete",
    "off"); a("recaptcha_image").style.width = "300px"; a("recaptcha_image").style.height = "57px"; Recaptcha.should_focus = !1; Recaptcha._set_challenge(RecaptchaState.challenge, "image"); Recaptcha.updateTabIndexes_(); Recaptcha.widget && (Recaptcha.widget.style.display = ""); b.callback && b.callback()
        }, updateTabIndexes_: function() {
            var a = Recaptcha.$, b = RecaptchaOptions; b.tabindex && (b = b.tabindex, a("recaptcha_response_field").tabIndex = b++, "audio" == Recaptcha.type && a("recaptcha_audio_play_again") && (a("recaptcha_audio_play_again").tabIndex =
    b++, a("recaptcha_audio_download"), a("recaptcha_audio_download").tabIndex = b++), "custom" != Recaptcha.theme && (a("recaptcha_reload_btn").tabIndex = b++, a("recaptcha_switch_audio_btn").tabIndex = b++, a("recaptcha_switch_img_btn").tabIndex = b++, a("recaptcha_whatsthis_btn").tabIndex = b))
        }, switch_type: function(a) {
            Recaptcha.type = a; Recaptcha.reload("audio" == Recaptcha.type ? "a" : "v"); if ("custom" != Recaptcha.theme) {
                a = Recaptcha.$; var b = "audio" == Recaptcha.type ? RecaptchaStr.instructions_audio : RecaptchaStr.instructions_visual,
    b = b.replace(/:$/, ""); a("recaptcha_response_field").setAttribute("placeholder", b)
            }
        }, reload: function(a) {
            var b = RecaptchaOptions, c = RecaptchaState; "undefined" == typeof a && (a = "r"); c = Recaptcha._get_api_server() + "/reload?c=" + c.challenge + "&k=" + c.site + "&reason=" + a + "&type=" + Recaptcha.type; b.includeContext && (c += "&includeContext=1"); Recaptcha.getLang_() && (c += "&lang=" + Recaptcha.getLang_()); "undefined" != typeof b.extra_challenge_params && (c += "&" + b.extra_challenge_params); "audio" == Recaptcha.type && (c = b.audio_beta_12_08 ?
    c + "&audio_beta_12_08=1" : c + "&new_audio_default=1"); Recaptcha.should_focus = "t" != a; Recaptcha._add_script(c)
        }, finish_reload: function(a, b) { RecaptchaState.is_incorrect = !1; Recaptcha._set_challenge(a, b); Recaptcha.updateTabIndexes_() }, _set_challenge: function(a, b) {
            var c = Recaptcha.$, d = RecaptchaState; d.challenge = a; Recaptcha.type = b; c("recaptcha_challenge_field_holder").innerHTML = '<input type="hidden" name="recaptcha_challenge_field" id="recaptcha_challenge_field" value="' + d.challenge + '"/>'; if ("audio" == b) c("recaptcha_image").innerHTML =
    Recaptcha.getAudioCaptchaHtml(), Recaptcha._loop_playback(); else if ("image" == b) { var e = Recaptcha._get_api_server() + "/image?c=" + d.challenge; c("recaptcha_image").innerHTML = '<img style="display:block;" alt="' + RecaptchaStr.image_alt_text + '" height="57" width="300" src="' + e + '" />' } Recaptcha._css_toggle("recaptcha_had_incorrect_sol", "recaptcha_nothad_incorrect_sol", d.is_incorrect); Recaptcha._css_toggle("recaptcha_is_showing_audio", "recaptcha_isnot_showing_audio", "audio" == b); Recaptcha._clear_input(); Recaptcha.should_focus &&
    Recaptcha.focus_response_field(); Recaptcha._reset_timer()
        }, _reset_timer: function() { clearInterval(Recaptcha.timer_id); var a = Math.max(1E3 * (RecaptchaState.timeout - 60), 6E4); Recaptcha.timer_id = setInterval(function() { Recaptcha.reload("t") }, a); return a }, showhelp: function() { window.open(Recaptcha._get_help_link(), "recaptcha_popup", "width=460,height=580,location=no,menubar=no,status=no,toolbar=no,scrollbars=yes,resizable=yes") }, _clear_input: function() { Recaptcha.$("recaptcha_response_field").value = "" }, _displayerror: function(a) {
            var b =
    Recaptcha.$; b("recaptcha_image").innerHTML = ""; b("recaptcha_image").appendChild(document.createTextNode(a))
        }, reloaderror: function(a) { Recaptcha._displayerror(a) }, _is_ie: function() { return 0 < navigator.userAgent.indexOf("MSIE") && !window.opera }, _css_toggle: function(a, b, c) { var d = Recaptcha.widget; d || (d = document.body); var e = d.className, e = e.replace(RegExp("(^|\\s+)" + a + "(\\s+|$)"), " "), e = e.replace(RegExp("(^|\\s+)" + b + "(\\s+|$)"), " "), e = e + (" " + (c ? a : b)); d.className = e }, _get_help_link: function() {
            var a = Recaptcha._get_api_server().replace(/\/[a-zA-Z0-9]+\/?$/,
    "/help"), a = a + ("?c=" + RecaptchaState.challenge); Recaptcha.getLang_() && (a += "&hl=" + Recaptcha.getLang_()); return a
        }, playAgain: function() { Recaptcha.$("recaptcha_image").innerHTML = Recaptcha.getAudioCaptchaHtml(); Recaptcha._loop_playback() }, _loop_playback: function() { var a = Recaptcha.$("recaptcha_audio_play_again"); a && Recaptcha.attachEvent(a, "click", function() { Recaptcha.playAgain(); return !1 }) }, getAudioCaptchaHtml: function() {
            var a = Recaptcha._get_api_server() + "/audio.mp3?c=" + RecaptchaState.challenge; 0 == a.indexOf("https://") &&
    (a = "http://" + a.substring(8)); var b = Recaptcha._get_api_server() + "/img/audiocaptcha.swf?v2", b = Recaptcha._is_ie() ? '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="audiocaptcha" width="0" height="0" codebase="https://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab"><param name="movie" value="' + b + '" /><param name="quality" value="high" /><param name="bgcolor" value="#869ca7" /><param name="allowScriptAccess" value="always" /></object><br/>' : '<embed src="' + b + '" quality="high" bgcolor="#869ca7" width="0" height="0" name="audiocaptcha" align="middle" play="true" loop="false" quality="high" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer" /></embed>',
    c = ""; Recaptcha.checkFlashVer() && (c = "<br/>" + Recaptcha.getSpan_('<a id="recaptcha_audio_play_again" class="recaptcha_audio_cant_hear_link">' + RecaptchaStr.play_again + "</a>")); c += "<br/>" + Recaptcha.getSpan_('<a id="recaptcha_audio_download" class="recaptcha_audio_cant_hear_link" target="_blank" href="' + a + '">' + RecaptchaStr.cant_hear_this + "</a>"); return b + c
        }, getSpan_: function(a) { return "<span" + (RecaptchaState && RecaptchaState.rtl ? ' dir="rtl"' : "") + ">" + a + "</span>" }, gethttpwavurl: function() {
            if ("audio" != Recaptcha.type) return "";
            var a = Recaptcha._get_api_server() + "/image?c=" + RecaptchaState.challenge; 0 == a.indexOf("https://") && (a = "http://" + a.substring(8)); return a
        }, checkFlashVer: function() {
            var a = -1 != navigator.appVersion.indexOf("MSIE"), b = -1 != navigator.appVersion.toLowerCase().indexOf("win"), c = -1 != navigator.userAgent.indexOf("Opera"), d = -1; if (null != navigator.plugins && 0 < navigator.plugins.length) {
                if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) a = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "",
    a = navigator.plugins["Shockwave Flash" + a].description, a = a.split(" "), a = a[2].split("."), d = a[0]
            } else if (a && b && !c) try { var e = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"), f = e.GetVariable("$version"), d = f.split(" ")[1].split(",")[0] } catch (k) { } return 9 <= d
        }, getLang_: function() { return "undefined" != typeof RecaptchaState && RecaptchaState.lang ? RecaptchaState.lang : RecaptchaOptions.lang ? RecaptchaOptions.lang : null }
    };

    window.Recaptcha = Recaptcha;

    return window.Recaptcha;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(84)], __WEBPACK_AMD_DEFINE_RESULT__ = function (system) {
        var logger = {
            log: log,
            logError: logError,
            alert: alert
        };

        return logger;

        function log(message, data, source, showToast) {
            logIt(message, data, source, showToast, 'info');
        }

        function logError(message, data, source, showToast) {
            logIt(message, data, source, showToast, 'error');
        }

        function logIt(message, data, source, showToast, toastType) {
            source = source ? '[' + source + '] ' : '';
            if (data) {
                system.log(source, message, data);
            } else {
                system.log(source, message);
            }
            if (showToast) {
                if (toastType === 'error') {
                    toastr.error(message);
                } else {
                    toastr.info(message);
                }

            }

        }
        function alert(message) {
           window.alert(message);
            
        }
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 171:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(319)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($) {

    $(document).on("mobileinit", function () {
        $.mobile.ajaxEnabled = false;
        $.mobile.hashListeningEnabled = false;
        $.mobile.pushStateEnabled = false;
        $.mobile.linkBindingEnabled = false; //-- works properly with jqm 1.1.1 rc1

        $.mobile.defaultDialogTransition = "none";
        $.mobile.defaultPageTransition = "slidedown";
        $.mobile.page.prototype.options.degradeInputs.date = true;
        $.mobile.page.prototype.options.domCache = false;

        //enable flag to disable rendering
        // $.mobile.ignoreContentEnabled=true;
        $.mobile.pushStateEnabled = true;
        $.mobile.phonegapNavigationEnabled = true;

        // enable loading page+icon
        $.mobile.loader.prototype.options.text = "loading";
        $.mobile.loader.prototype.options.textVisible = false;
        $.mobile.loader.prototype.options.theme = "a";
        $.mobile.loader.prototype.options.html = "";
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 219:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (ko, jQuery) {
    ko.bindingHandlers.autocomplete = {
        init: function (element, valueAccessor, allBindings) {
            var tabKeyCode = 9;
            var observable = valueAccessor;
            var targetTextBoxId = allBindings().targetTextBoxId;
            var $element = jQuery(element).hide(), $targetTextBox = jQuery('#' + targetTextBoxId), $lastValidValue = jQuery("#actual-" + targetTextBoxId);
            var foreachBinding = allBindings().foreach, minChar = allBindings().minChar || 3, saveId = allBindings().selectedItemId;
            var selectedListClass = 'ui-btn-hover-c', selector = '.' + selectedListClass, upButtonClass = 'ui-btn-up-c';
            var existingAddressValue = "";

            $targetTextBox.on('keydown', function (e) {
                if (isUpOrDownArrows(e.keyCode) || (e.keyCode === tabKeyCode && $element.is(":visible"))) {
                    e.preventDefault(); // Prevent default up/down/tab key operation so they can be used for navigation and selection.
                }
            });

            $targetTextBox.on("keyup", function (e) {
                var newAddressValue = jQuery(this).val();

                if (isSelectItemKey(e.keyCode)) {
                    var $selectedLi = $element.children(selector);
                    if ($selectedLi.length > 0) {
                        selectValue(ko.dataFor($selectedLi.get(0)));
                    }
                }
                else if (isUpOrDownArrows(e.keyCode)) {
                    var isDownArrow = e.keyCode === 40;
                    navigateUpDown(isDownArrow);
                }
                    // Chrome on mobi is always passing 0 for keyCode.
                else if (newAddressValue !== existingAddressValue) {
                    getAutocompleteList(newAddressValue);
                }

                existingAddressValue = newAddressValue; // Store the address value for next time
            });

            $targetTextBox.change(function () {
                $targetTextBox.is(':focus') || $element.is(':visible') || resetTextBox();
            }).click(function (e) {
                $element.is(':visible') && e.stopPropagation();
            });

            $element.on("mouseenter", "li", function () {
                $element.children("li" + selector).removeClass(selectedListClass).addClass(upButtonClass);
            }).scroll(function () {
                $targetTextBox.focus();
            }).on("click", "a", function () {
                selectValue(ko.dataFor(this));
            });


            var isSelectItemKey = function (keyCode) { return keyCode === 13 || keyCode === 9 }
            var isUpOrDownArrows = function (keyCode) { return keyCode === 40 || keyCode === 38 };
            var isCharacterKey = function (keyCode) { return keyCode === 8 || (keyCode >= 48 && keyCode <= 90) || (keyCode >= 96 && keyCode <= 111) || keyCode >= 186 && keyCode <= 222; };
            var selectValue = function (data) {
                $targetTextBox.val(data.value);
                $lastValidValue.val(data.value).change();
                saveId && saveId(data.id);
                observable && observable()(data.value);
                clearList();
            };

            var clearList = function () {
                foreachBinding([]);
                $element.hide();
                $element.css("z-index", 0);
            };

            var resetTextBox = function () {
                $targetTextBox.val($lastValidValue.val());
            }

            var hideList = function () {
                clearList();
                resetTextBox();
            }

            var navigateUpDown = function (isDown) {
                var $currentItem = $element.children(selector);
                $currentItem.removeClass(selectedListClass).addClass(upButtonClass);
                var $nextItem = isDown ? ($currentItem.length > 0 && $currentItem.next().length > 0 ? $currentItem.next() : $element.children().first())
                    : ($currentItem.length > 0 && $currentItem.prev().length > 0 ? $currentItem.prev() : $element.children().last());

                if ($nextItem.length > 0) {
                    // Let jqueryMobile no we have focus on new element
                    $nextItem.trigger('mouseover');
                    $currentItem.trigger('mouseout');

                    var selectedItemTop = $nextItem.get(0).offsetTop;

                    if (0 >= selectedItemTop - $element.get(0).scrollTop) {
                        $element.get(0).scrollTop = selectedItemTop;
                    }
                    else if (($element.height()) < (selectedItemTop + $nextItem.height() - $element.get(0).scrollTop)) {
                        $element.get(0).scrollTop = selectedItemTop + $nextItem.height() - $element.height();
                    }
                }
            }

            var getAutocompleteList = function (value) {
                if (value && minChar <= value.length) {
                    allBindings().getItems({
                        success: function (items) {
                            if (items.length > 0) {
                                foreachBinding(items);
                                // Need to scroll the autocomplete menu before it will work on android default browsers.
                                $element.get(0).scrollTop = 1;
                                $element.children('li').first().addClass(selectedListClass);
                                $element.listview("refresh");
                                !$element.is(':visible') && jQuery('body').one('click', hideList);
                                $element.show();
                            }
                            else {
                                clearList();
                            }

                            $element.css("z-index", items.length > 0 ? 10000 : 0);
                        }
                    }, value);
                }
                else {
                    clearList();
                }
            }
        }
    }
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿/**
 * AMD module with legacy logging-related services that attach themselves to the window namespace.
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function(jQuery) {
    window.AjaxLoggingService = function(window, enabledEvents) {

        var _debugEnabled = enabledEvents.indexOf('Debug') != -1;
        var _infoEnabled = enabledEvents.indexOf('Info') != -1;
        var _exceptionEnabled = enabledEvents.indexOf('Exception') != -1;


        var _getTrackingId = function() {
            // reuse the betslip tracking id
            try {
                var store = new BetWalletStore();
                return store.get_visitor_tracking_id();
            } catch (e) {
                return null;
            }
        };

        var _logEvent = function(eventType, message, details) {
            var metaData = { WindowHref: window.location.href, TrackingId: _getTrackingId() };
            var requestData = { EventType: eventType, Message: message, Details: details, MetaData: metaData };
            if (eventType === 'Debug') {
                console.log(message);
            }
            jQuery.ajax({
                type: 'POST',
                url: 'api/javascriptlogging/logevent',
                data: requestData,
                mimeType: 'text/html'
            });
        };

        var logException = function(message, details) {
            if (_exceptionEnabled) {
                _logEvent('Exception', message, details);
            }
        };

        var logInfo = function(message, details) {
            if (_infoEnabled) {
                _logEvent('Info', message, details);
            }
        };

        var logDebug = function(message, details) {
            if (_debugEnabled) {
                _logEvent('Debug', message, details);
            }
        };

        return {
            logException: logException,
            logInfo: logInfo,
            logDebug: logDebug
        };

    };

    window.NullLoggingService = function(jQuery) {

        var logException = function(message, details) {
        };

        var logInfo = function(message, details) {
        };

        var logDebug = function(message, details) {
        };

        return {
            logException: logException,
            logInfo: logInfo,
            logDebug: logDebug
        };

    };

    window.LoggingService = function() {
        var config = window._LOGGING_SERVICE_CONFIG_;

        var loggingService = new NullLoggingService();

        if (config.FeatureEnabled) {
            loggingService = new AjaxLoggingService(window, config.EnabledLoggingEvents);
            (function() {
                var errorHandler = new ErrorHandler(window, loggingService);
                errorHandler.registerForWindowOnError();
            })();
        }

        return loggingService;
    }

    window.ErrorHandler = function(window, loggingService) {

        var oldOnError = null;

        var jsErrorHandler = function(errorMsg, url, lineNumber, colNumber, errorObj) {
            try {
                var details = { url: url, lineNumber: lineNumber, colNumber: colNumber, errorObj: errorObj };
                loggingService.logException(errorMsg, JSON.stringify(details));
            } catch (e) {
                // don't propagate exceptions fired from logging code
            }

            if (oldOnError) {
                return oldOnError(errorMsg, url, lineNumber, colNumber, errorObj);
            }

            return false;
        };

        var registerForWindowOnError = function() {
            oldOnError = window.onerror;
            window.onerror = jsErrorHandler;
        };

        return {
            registerForWindowOnError: registerForWindowOnError
        };
    };

    return new window.LoggingService;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 220:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (ko, jQuery) {
    ko.bindingHandlers.checkBox = {
        init: function(element, valueAccessor){
            jQuery(element).on("change", function(){
                valueAccessor()(jQuery(this).is(":checked"));
            });
        }
    };
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 222:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function(ko, jQuery){
    ko.bindingHandlers.fadeVisible = {
        init: function(element, valueAccessor) {
            var value = valueAccessor();
            jQuery(element).toggle(ko.unwrap(value));
        },
        update: function(element, valueAccessor) {
            var value = valueAccessor();
            ko.unwrap(value) ? jQuery(element).fadeIn() : jQuery(element).fadeOut();
        }
    };
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 223:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (ko, jQuery) {
    ko.bindingHandlers.validateOnBlur = {
        init: function(element, valueAccessor, allBindings){
            var $element = jQuery(element);

            $element.on("blur", function(){
                var observable = valueAccessor() || allBindings().value;
                // Slight delay as the error bubble will change layout and may stop click events going where they need to go.
                setTimeout(function(){
                    observable.isModified(true);
                }, 100);
            });
        }
    }
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 225:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(38)], __WEBPACK_AMD_DEFINE_RESULT__ = function (ko, validation) {
    ko.validation.rules['mustEqual'] = {
        validator: function (val, otherVal) {
            return val === otherVal;
        },
        message: 'The field must equal {0}'
    };
    ko.validation.registerExtenders();
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 226:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿/*
* Checks if a date is valid by comparing the day, month, year to see if the days are equal to date object
* Parameter: day: <A function to access the original day value>
*            month: <A function to access the original month value>
*            year: <A function to access the original year value>
* Example:
*
* viewModel = {
*    person: ko.observable({
*       day: ko.observable(),
*       month: ko.observable(),
*       year: ko.observable(),
*       date: ko.computed(function () {
*            var day = self.day(),
*                month = self.month() - 1,
*                year = self.year();
*            return new Date(year, month, day);
*        }).extend({          
*            validDate: {
*                day: function () {
*                    return self.day();
*                },
*                month: function () {
*                    return self.month();
*                },
*                year: function () {
*                    return self.year();
*                },
*            }
*        });
*    }
* }   
*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(38)], __WEBPACK_AMD_DEFINE_RESULT__ = function (ko, validation) {
    ko.validation.rules['validDate'] = {
        validator: function (val, options) {
            var validDate = false,
                day = options.day(),
                month = options.month(),
                year = options.year();
                if (val.getFullYear() == year && val.getMonth() + 1 == month && val.getDate() == day) {
                    validDate = true;
                }
            return validDate;
        },
        message: 'Please enter a valid date.'
    };
    ko.validation.registerExtenders();
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 227:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function(ko, jQuery) {
    ko.bindingHandlers.radio = {
        init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            //Allows you to change the properties of radio settings
            var currentValue = valueAccessor();
            jQuery(element).controlgroup(currentValue);
            jQuery(element).attr("data-role", "controlgroup");
            jQuery("input[type='radio']", element).on("checkboxradiocreate", function(event, ui) {
                //Sets the init to true to block updates
                jQuery(element).data("init", true);

                //Change value of observable
                jQuery(this).on("change", function() {
                    allBindingsAccessor().value((jQuery(this).val()));
                });
            });

        },
        update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var currentValue = allBindingsAccessor().value();
            var initialized = jQuery(element).data("init");
            if (initialized) {
                //Refresh all radios to false
                jQuery("input[type='radio']", element).prop("checked", false)
                        .checkboxradio("refresh");

                //Set current selected radio to true and refresh
                jQuery("input[type='radio'][value='" + currentValue + "']", element)
                        .prop("checked", true).checkboxradio("refresh");
            }
        }
    };
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 228:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(0), __webpack_require__(145)], __WEBPACK_AMD_DEFINE_RESULT__ = function (ko, jQuery, recaptcha) {
    ko.bindingHandlers.recaptcha = {
        init: function (element, valueAccessor) {
            var options = valueAccessor();

            var loadCallback = function () {
                if (typeof options.onBlur === "function") {
                    jQuery("input[name='recaptcha_response_field']", element).on("blur", options.onBlur);
                }
            };
            recaptcha.create("6LdX9ckSAAAAAH0kXvUR_mmoC9L_NUx9qsnq7n5r",
                element,
                {
                    theme: "clean",
                    callback: loadCallback
                });
        }
    };
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 229:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (ko, jQuery) {
ko.bindingHandlers.slider = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().sliderOptions || {};
        options.stop = function (event) {
            var observable = valueAccessor();
            observable(jQuery(event.target).val());
        }
        jQuery(element).slider(options);
    },
    update: function (element, valueAccessor, allBindingsAccessor) {
        var $element = jQuery(element);
        var value = ko.utils.unwrapObservable(valueAccessor());
        $element.val(value);
        $element.slider("enable");
        $element.slider("refresh");
    }}
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));



/***/ }),

/***/ 230:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (ko, jQuery) {
    ko.bindingHandlers.tap = {
        init : function(element, valueAccessor){
            var $element = jQuery(element);

            $element.on("tap", function(){
                valueAccessor()();
            })
        }
    }
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 231:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(38)], __WEBPACK_AMD_DEFINE_RESULT__ = function (ko, validation) {
    var lettersHyphenSpacesOnlyPattern = /^[-\sa-zA-Z]*$/;
    ko.validation.rules['lettersHyphenSpacesOnly'] = {
        validator: function (val, otherVal) {
            var lettersHyphenSpacesOnly = true;
            if (otherVal !== false) {
                lettersHyphenSpacesOnly = lettersHyphenSpacesOnlyPattern.test(val);
            }
            return lettersHyphenSpacesOnly;
        },
        message: 'This field only accepts letters or hyphens.'
    };
    ko.validation.registerExtenders();
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 232:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(38)], __WEBPACK_AMD_DEFINE_RESULT__ = function (ko, validation) {
    ko.validation.rules["maxConsecutiveCharacters"] = {
        validator: function(val){
            var regex = /(\d)\1\1/;
            return regex.exec(val) == null;
        },
        message: "Must not have same number more than twice in succession."
    };

    ko.validation.registerExtenders();
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (ko) {
    var ViewModelLocator = function () {
        // Force new object
        var self = this instanceof ViewModelLocator
        ? this
        : Object.create(ViewModelLocator.prototype);
        
        // Properties
        self.viewModels = {};
    };

    // Prototype Properties
    ViewModelLocator.prototype = function () {
        var
            registerViewModel = function (name, viewModel) {
                this.viewModels[name] = viewModel;
            },
            findViewModel = function (name) {
                return this.viewModels[name];
            },
            removeViewModel = function (name) {
                delete this.viewModels[name];
            },
            clear = function () {
                this.viewModels = {};
            };
        return {
            registerViewModel: registerViewModel,
            findViewModel: findViewModel,
            removeViewModel: removeViewModel,
            clear: clear
        };
    } ();

    //Note: This module exports a function. That means that you, the developer, can create multiple instances.
    //If you wish to create a singleton, you should export an object instead of a function.

    return new ViewModelLocator();
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 254:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1),
        __webpack_require__(24),
        __webpack_require__(66),
        __webpack_require__(266),
        __webpack_require__(275),
        __webpack_require__(272),
        __webpack_require__(267),
        __webpack_require__(264),
        __webpack_require__(261),
        __webpack_require__(268),
        __webpack_require__(262),
        __webpack_require__(265),
        __webpack_require__(270),
        __webpack_require__(263),
        __webpack_require__(269),
        __webpack_require__(271),
        __webpack_require__(258),
        __webpack_require__(273),
        __webpack_require__(259)
    ], __WEBPACK_AMD_DEFINE_RESULT__ = function (ko, viewModelLocator, footer, ErrorViewModel, WelcomeViewModel, PersonalDetailsViewModel, ExistingAccountViewModel, ContactDetailsViewModel, addressVerification, internationalAddress, ageVerification, driversLicense, medicare, australianPassport, internationalPassport, password, accountCreated, privacy, accountTermsConditions) {
        var binder = function () {
            var bind = function () {
                viewModelLocator.registerViewModel("accountTermsConditions", accountTermsConditions);
                viewModelLocator.registerViewModel("privacy", privacy);
                viewModelLocator.registerViewModel("footer", footer);
                viewModelLocator.registerViewModel("welcome", new WelcomeViewModel());
                viewModelLocator.registerViewModel("personalDetails", new PersonalDetailsViewModel());
                viewModelLocator.registerViewModel("contactDetails", new ContactDetailsViewModel());
                viewModelLocator.registerViewModel("addressVerification", addressVerification);
                viewModelLocator.registerViewModel("internationalAddress", internationalAddress);
                viewModelLocator.registerViewModel("existingAccount", new ExistingAccountViewModel());
                viewModelLocator.registerViewModel("error", new ErrorViewModel());
                viewModelLocator.registerViewModel("ageVerification", new ageVerification());
                viewModelLocator.registerViewModel("driversLicense", new driversLicense());
                viewModelLocator.registerViewModel("medicare", new medicare());
                viewModelLocator.registerViewModel("australianPassport", new australianPassport());
                viewModelLocator.registerViewModel("internationalPassport", new internationalPassport());
                viewModelLocator.registerViewModel("createPassword", password);
                viewModelLocator.registerViewModel("accountCreated", accountCreated);
                ko.applyBindings(viewModelLocator.viewModels);
            };
            return {
                bind: bind
            };

        } ();

        return binder;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 255:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(368), __webpack_require__(108)], __WEBPACK_AMD_DEFINE_RESULT__ = function(ko, _, template) {
    function noOp() {};

    function chainFn(f1, f2) {
        return function() {
            f1();
            f2();
        };
    }

    function nothing(observable, result) {
        return ko.pureComputed(function() {
            if (!observable()) {
                return result;
            }
            return null;
        });
    }

    var months = [
        { index: 1, name: "January" },
        { index: 2, name: "February" },
        { index: 3, name: "March" },
        { index: 4, name: "April" },
        { index: 5, name: "May" },
        { index: 6, name: "June" },
        { index: 7, name: "July" },
        { index: 8, name: "August" },
        { index: 9, name: "September" },
        { index: 10, name: "October" },
        { index: 11, name: "November" },
        { index: 12, name: "December" }
    ];


    var years = (function() {
        var currentYear = new Date().getFullYear();
        return _.range(currentYear, currentYear + 10);
    })();

    // Returns the number of day in a month for a given year, Note that `month` is 1 indexed for this function
    // unlike javascript date object
    function getDaysInMonth(month, year) {
        if (!month)
            return 31;

        if (!year)
            year = 2000; // It's a leap year

        // Day 0 gets the last day of the previous month
        // Since we treat month as 1 indexed, but `Date` treats it as 0,  we have already moved to the next month to counter
        // the effect of moving back a month since day is 0.
        return (new Date(year, month, 0)).getDate();
    }

    function viewModel(params) {
        var self = this;

        self.nothing = nothing;
        self.dispose = noOp;
        var dateComponents = params.dateComponents || {};
        self.showDays = typeof params.showDays == "function" ? params.showDays : ko.observable(true);
        self.selectedDay = dateComponents.day || ko.observable();
        self.selectedMonth = dateComponents.month || ko.observable().extend({ required: { params: true } });
        self.selectedYear = dateComponents.year || ko.observable(years[0]).extend({ required: { params: true } });
        self.dayIsStale = ko.observable(false);
        self.monthIsStale = ko.observable(false);

        self.yearOptions = ko.observable(years);

        self.monthOptions = ko.pureComputed(function() {
                if (!self.selectedYear()) {
                    return months;
                }

                var now = new Date();
                if (self.selectedYear() === now.getFullYear()) {
                    return _(months).filter(function(m) { return m.index > now.getMonth(); });
                };
                return months;
            }
        );

        self.dayOptions = ko.pureComputed(function() {
            var daysInMonth = getDaysInMonth(self.selectedMonth(), self.selectedYear());
            var now = new Date();
            var firstDayOfRange = 1;
            if (self.selectedMonth() && self.selectedMonth() - 1 === now.getMonth() && self.selectedYear() === now.getFullYear()) {
                firstDayOfRange = now.getDate();
            }

            return _.range(firstDayOfRange, daysInMonth + 1);
        });

        // Update the day to be within date range
        var sub = self.dayOptions.subscribe(function(days) {
            if (!!self.selectedDay()) {
                self.selectedDay(Math.max(self.selectedDay(), days[0]));
                self.selectedDay(Math.min(self.selectedDay(), days[days.length - 1]));

                self.dayIsStale(true);
            }
        });
        self.dispose = chainFn(self.dispose, sub.dispose);
        var sub2 = self.monthOptions.subscribe(function(months) {

            if (!!self.selectedMonth()) {
                var newMonth = Math.max(self.selectedMonth(), months[0].index);
                self.selectedMonth(newMonth);
                self.monthIsStale(true);
            }
        });
        self.dispose = chainFn(self.dispose, sub2.dispose);
    }

    ko.components.register("rwwa-date-selector", {
        viewModel: viewModel,
        template: template
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ }),

/***/ 256:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function(ko){
    //wrapper to an observable that requires accept/cancel
    ko.protectedObservable = function(initialValue) {
        //private variables
        var _actualValue = ko.observable(initialValue),
            _tempValue = ko.observable(initialValue);

        //computed observable that we will return
        var result = ko.computed({
            //always return the actual value
            read: function() {
               return _actualValue();
            },
            //stored in a temporary spot until commit
            write: function(newValue) {
                _tempValue(newValue);
            }
        });

        //if different, commit temp value
        result.commit = function() {
            if (_tempValue() !== _actualValue()) {
                _actualValue(_tempValue());
            }
        };

        //force subscribers to take original
        result.reset = function() {
            _actualValue.valueHasMutated();
            _tempValue(_actualValue());   //reset temp value
        };

        result.isModified = ko.computed({
            read: function(){
                return _tempValue() !== _actualValue();
            },
            write: function(a){
                _tempValue.isModified && _tempValue.isModified(a);
            }
        });

        result.isValid = function(){
          return !_tempValue.isValid || _tempValue.isValid();
        };

        result.extend = function(a){
            _tempValue.extend(a);

            return result;
        };

        result.validationContext = _tempValue;
        result.pendingValue = _tempValue;

        return result;
    };

}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 257:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(143), __webpack_require__(6), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (getErrors, amplify, _) {
    return function (modelGroup) {
        var combinedErrors = _(modelGroup).chain().map(getErrors).flatten().value();
        amplify.publish('signup.validationError', combinedErrors);
    }
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 258:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(0), __webpack_require__(6), __webpack_require__(24), __webpack_require__(27)], __WEBPACK_AMD_DEFINE_RESULT__ = function(ko, jQuery, amplify, viewModelLocator, cookies) {
    var accountCreated = function () {
        var self = this;

        self.accountNumber = ko.observable();
        self.noBetting = ko.observable();
        self.imageSource = ko.computed(function () {
            var source = "/Images/Signup/";
            if (self.noBetting()) {
                source += "step-two-not-done.png";
            } else {
                source += "step-two-done.png";
            }
            return source;
        }, self);

        self.activate = function() {
            var shell = __webpack_require__(26);
            var isVerified = shell.isVerified();
            self.noBetting(!isVerified);
            self.accountNumber(shell.bettingAccountNumber());
            amplify.publish('signup.leaving', { page: 'accountCreated' });
            amplify.publish('signup.data', { bettingAccountNumber: shell.bettingAccountNumber() });
            var footer = viewModelLocator.findViewModel("footer");
            footer.passwordStatusClass(footer.successClass);
            footer.showPreviousButton(false);
            footer.showNextButton(false);
        };

        self.startButtonText = ko.computed(function(){
            if(self.noBetting()){
                return "Browse";
            }
            else{
                return "Start Betting!";
            }
        });

        self.deActivate = function (success) {

        };

        self.navigateToHomeAndSetDepositModalCookie = function() {
            cookies.set("ShowDepositModal", true, { expires: 1, path: '/'});
            window.location.href = "/";
        };

        ko.validatedObservable(self);
    };

    return new accountCreated();
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 259:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function(ko){
    var AcccountTerms = function(){
        this.progressClass = ko.observable();
        this.activate = function(options){
            options.progressClassName && this.progressClass(options.progressClassName);
        }
    };

    return new AcccountTerms();
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(1), __webpack_require__(142), __webpack_require__(24), __webpack_require__(254)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($, ko, router, viewModelLocator, binder) {
    var Shell = function () {
        // Force new object
        var self = this instanceof Shell
            ? this
            : Object.create(Shell.prototype);

        var $loader = $(".ui-loader");

        self.applicationReferenceNumber = ko.observable();
        self.affiliateId = ko.observable();
        self.attempts = ko.observable();
        self.enquiryId = ko.observable();
        self.addressVerified = ko.observable();
        self.nameVerified = ko.observable();
        self.dateOfBirthVerified = ko.observable();
        self.bettingAccountNumber = ko.observable();
        self.rwwaRanking = ko.observable();
        self.nothingVerified = ko.computed(function () {
            var addressVerified = self.addressVerified(),
                nameVerified = self.nameVerified(),
                dateOfBirthVerified = self.dateOfBirthVerified(),
                nothingVerify = false;
            if (addressVerified === false && nameVerified === false && dateOfBirthVerified === false) {
                nothingVerify = true;
            }
            return nothingVerify;
        }, self);

        self.setLoaderForAgeVerify = function () {
            $loader.loader({ text: "Attempting to verify your age, this may take a few moments...", textVisible: true, theme: 'b' });
        };

        self.setLoaderForAccountCreation = function () {
            $loader.loader({ text: "We're just creating your account, this may take a few moments...", textVisible: true, theme: 'b' });
        };
        self.resetLoader = function() {
            $loader.loader({ text: "", textVisible: false, theme: 'a' });
        };
        self.maxAttempts = ko.computed(function () {
            var attempts = 3;
            if (self.nothingVerified() === true) {
                attempts = 2;
            }
            return attempts;
        }, self);

        // Binding Prototypes
        self.activate = self.activate.bind(self);
        self.incrementAttempts = self.incrementAttempts.bind(self);
        self.copyVerifyData = self.copyVerifyData.bind(self);
        self.isVerified = self.isVerified.bind(self);
        self.isOutOfAttempts = self.isOutOfAttempts.bind(self);
        self.showVerificationPopUp = self.showVerificationPopUp.bind(self);

        // Default Constructor
        var init = function () {
            self.applicationReferenceNumber(null);
            self.affiliateId(null);
            self.attempts(0);
            self.rwwaRanking(0);
            self.bettingAccountNumber(null);
            self.enquiryId(null);
            self.addressVerified(false);
            self.nameVerified(false);
            self.dateOfBirthVerified(false);
            var affiliateId = $("#AffiliateId").val();
            self.affiliateId(affiliateId);
        };
        init();
    };

    Shell.prototype = function () {
        var 
            createRoutes = function () {
                router.addRoute({
                    route: "welcome",
                    isDefault: true
                });
                router.addRoute({
                    route: "personalDetails",
                    viewModel: "personalDetails"
                });
                router.addRoute({
                    route: "contactDetails",
                    viewModel: "contactDetails"
                });
                router.addRoute({
                    route: "addressVerification"
                });
                router.addRoute({
                    route: "internationalAddress"
                });
                router.addRoute({
                    route: "existingAccount",
                    viewModel: "existingAccount"
                });
                router.addRoute({
                    route: "error",
                    viewModel: "error"
                });
                router.addRoute({
                    route: "privacy",
                    viewModel: "privacy"
                });
                router.addRoute({
                    route: "ageVerification"
                });
                router.addRoute({
                    route: "driversLicense"
                });
                router.addRoute({
                    route: "medicare"
                });
                router.addRoute({
                    route: "australianPassport"
                });
                router.addRoute({
                    route: "internationalPassport"
                });
                router.addRoute({
                    route: "createPassword"
                });
                router.addRoute({
                    route: "accountCreated"
                });
                router.addRoute({
                    route: "termsConditions"
                });
                router.addRoute({
                    route: "accountTermsConditions"
                })
            },
            createViewModels = function () {
                binder.bind();
            },
            incrementAttempts = function () {
                var attempt = this.attempts();
                attempt += 1;
                this.attempts(attempt);
            },
            copyVerifyData = function (data) {
                this.addressVerified(data.AddressVerified);
                this.nameVerified(data.NameVerified);
                this.enquiryId(data.EnquiryId);
                this.dateOfBirthVerified(data.DateOfBirthVerified);
                this.rwwaRanking(data.RwwaRanking);
            },
            isVerified = function () {
                return (this.rwwaRanking() >= 50);
            },
            isOutOfAttempts = function () {
                return (this.attempts() >= this.maxAttempts());
            },
            showVerificationPopUp = function () {
                var pageId = $.mobile.activePage.attr('id');
                $("#" + pageId).find('div.AgeVerificationError').popup('open');
            },
            activate = function () {
                createRoutes();
                createViewModels();
                router.setCurrentRoute("welcome");
                router.start();
            };
        return {
            activate: activate,
            incrementAttempts: incrementAttempts,
            copyVerifyData: copyVerifyData,
            isVerified: isVerified,
            isOutOfAttempts: isOutOfAttempts,
            showVerificationPopUp: showVerificationPopUp
        };
    } ();
    //Note: This module exports a function. That means that you, the developer, can create multiple instances.
    //If you wish to create a singleton, you should export an object instead of a function.

    return new Shell();
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 260:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(256)], __WEBPACK_AMD_DEFINE_RESULT__ = function (ko) {
    var Address = function (options) {
        var self = this;
        options = options || {};

        var alphaNumericRegex = '^(:?[a-zA-Z1-9][a-zA-Z0-9 \-\\\/]*)?$';

        self.isEditingManualAddress = ko.observable(false);
        self.unitNumber = ko.protectedObservable('').extend({ maxLength: 15, pattern: { message: "Only alphanumeric values allowed. Must not start with 0", params: alphaNumericRegex } });
        self.moniker = ko.observable(),
        self.autoAddressLine = ko.observable(),
        self.streetNumber = ko.protectedObservable().extend({ required: { onlyIf: self.isEditingManualAddress }, maxLength: 10, pattern: { message: "Only alphanumeric values allowed. Must not start with 0", params: alphaNumericRegex } });
        self.streetNameMaxLength = ko.observable(options.maxStreetNameLength || 32);
        self.streetName = ko.protectedObservable("").extend({ required: { onlyIf: self.isEditingManualAddress }, maxLength: self.streetNameMaxLength(), pattern: { message: "Only alphanumeric values allowed.", params: "^[A-Za-z0-9& '-]*[A-Za-z0-9& '-][A-Za-z0-9& '-]*$" } });
        self.streetType = ko.protectedObservable().extend({ required: { onlyIf: self.isEditingManualAddress }, maxLength: 20 });
        self.suburb = ko.protectedObservable().extend({ required: { onlyIf: self.isEditingManualAddress }, maxLength: 100 });
        self.hasManualAddressSet = ko.observable(false);

        self.commit = self.commit.bind(self);
        self.reset = self.reset.bind(self);

        self.addressLine = ko.computed({
            read: function () {
                if (self.hasManualAddressSet()) {
                    var part1 = this.unitNumber() ? this.unitNumber() + ' - ' : '';
                    return part1 + this.streetNumber() + ' ' + this.streetName() + ' ' + this.streetType() + ', ' + this.suburb();
                }
                else {
                    return self.autoAddressLine();
                }
            },
            write: function (value) {
                self.autoAddressLine(value);
            }
        }, self).extend({required:{onlyIf:function(){return !self.isEditingManualAddress()}} });

        ko.validatedObservable(self);
    };

    Address.prototype.commit = function() {
        this.unitNumber.commit();
        this.streetNumber.commit();
        this.streetName.commit();
        this.streetType.commit();
        this.suburb.commit();
        this.hasManualAddressSet(true);
    };

    Address.prototype.reset = function() {
        this.unitNumber.reset();
        this.streetNumber.reset();
        this.streetName.reset();
        this.streetType.reset();
        this.suburb.reset();
    };

    Address.prototype.getAddressDetails = function(){
        if(this.hasManualAddressSet())
        {
            return {
                UnitNumber : this.unitNumber(),
                StreetNumber : this.streetNumber(),
                StreetName : this.streetName(),
                StreetType : this.streetType(),
                SuburbStatePostCode : this.suburb()
            };
        } else{
            return { Moniker : this.moniker() };
        }
    }

    return Address;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1),
        __webpack_require__(0),
        __webpack_require__(24),
        __webpack_require__(34),
        __webpack_require__(260),
        __webpack_require__(53),
        __webpack_require__(66),
        __webpack_require__(35),
        __webpack_require__(257),  
        __webpack_require__(219),
        __webpack_require__(222),
        __webpack_require__(223),
        __webpack_require__(220)
       ], __WEBPACK_AMD_DEFINE_RESULT__ = function (ko, jQuery, viewModelLocator, dataContext, address, prospect, footer, publishErrors, publishErrorsGrouped) {
        var AddressVerification = function () {
            var self = this;

            self.currentAddress = ko.observable(new address({maxStreetNameLength:40}));
            self.previousAddress = ko.observable(new address());
            self.isInternational = ko.observable();
            self.manualAddress = ko.observable(self.currentAddress());
            self.filteredStreetTypes = ko.observableArray();
            self.filteredSuburbsStatePostcodes = ko.observableArray();
            self.filteredAddresses = ko.observableArray();
            self.isOnlyOneAddressRequired = ko.observable(true);
            self.selectedCountry = ko.observable();

            self.openManualForCurrentAddress = function () {
                self.manualAddress(self.currentAddress());
                self.openManualEditForm();
            };

            self.openManualForPreviousAddress = function () {
                self.manualAddress(self.previousAddress());
                self.openManualEditForm();
            };

            self.openManualEditForm = function () {
                self.manualAddress().streetName.isModified(false);
                self.manualAddress().streetNumber.isModified(false);
                self.manualAddress().streetType.isModified(false);
                self.manualAddress().suburb.isModified(false);
                self.manualAddress().isEditingManualAddress(true);
            };

            self.saveManualAddressEntry = function () {
                if (self.manualAddress().errors().length > 0) {
                    publishErrors(self.manualAddress());
                    self.manualAddress().errors.showAllMessages();
                }
                else {
                    self.manualAddress().commit();
                    self.manualAddress().isEditingManualAddress(false);
                }
            };

            self.cancelManualAddressEntry = function () {
                self.manualAddress().reset();
                self.manualAddress().isEditingManualAddress(false);
            };

            self.deActivate = function (navigate) {
                if (self.selectedCountry() == "International") {
                    navigate("internationalAddress");
                } else if (self.currentAddress().isValid() && (self.isOnlyOneAddressRequired() || self.previousAddress().isValid())) {
                    var shell = __webpack_require__(26);
                    var verifyModel = prospect(viewModelLocator.viewModels, shell, true);
                    shell.setLoaderForAgeVerify();
                    dataContext.verifyIdSignUp(
                    {
                        success: function (data) {
                            shell.resetLoader();
                            shell.copyVerifyData(data);
                            footer.aboutYouStatusClass(footer.successClass);
                            if (shell.isVerified() === true) {
                                footer.ageVerificationStatusClass(footer.successClass);
                                navigate("createPassword");
                            } else {
                                navigate("ageVerification");
                            }
                        },
                        error: function () {
                            shell.resetLoader();
                            navigate("error", { showLoginButton: false });
                        }
                    }, verifyModel);
                } else {
                    if (self.isOnlyOneAddressRequired()) {
                        publishErrorsGrouped({ "CurrentAddress ": self.currentAddress() });
                    } else {
                        publishErrorsGrouped({ "CurrentAddress ": self.currentAddress(), "Prior Address ": self.previousAddress() });
                    }
                    
                    self.currentAddress().errors.showAllMessages();
                    self.isOnlyOneAddressRequired() || self.previousAddress().errors.showAllMessages();
                }
            };

            self.getStreetTypes = function (callback, searchString) {
                dataContext.getStreetTypeList(callback, searchString);
            };
            self.getSuburbStatePostcodes = function (callback, searchString) {
                dataContext.getSuburbStatePostcodeList(callback, searchString);
            };
            self.getAddresses = function (callback, searchString) {
                dataContext.getAddresses(callback, searchString);
            };

            self.countrySelectionChanged = function () {
                if (self.selectedCountry() == "International") {
                    viewModelLocator.findViewModel("footer").next();
                }
            };

            self.activate = function () {
                self.currentAddress().errors.showAllMessages(false);
                self.previousAddress().errors.showAllMessages(false);
                self.selectedCountry("Australian");
                jQuery('#countrySelect').selectmenu("refresh");

                viewModelLocator.findViewModel("footer").showNextButton(true);
            };
        };

        return new AddressVerification();
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 262:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(227), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function (ko, r, amplify) {
    var AgeVerification = function (options) {
        var self = this instanceof AgeVerification
            ? this
            : Object.create(AgeVerification.prototype);
        var configOptions = options || {
            driverLicenseId: "DriversLicense",
            medicareCardId: "MedicareCard",
            australianPassportId: "AustralianPassport",
            internationalPassportId: "InternationalPassport",
            noneId: "None"
        };
        self.configOptions = configOptions;
        self.selectedAgeVerification = ko.observable(configOptions.driverLicenseId);
        self.showDriversLicense = ko.observable(true);
        self.showMedicare = ko.observable(true);
        self.showAustralianPassport = ko.observable(true);
        self.showInternationalPassport = ko.observable(true);
        
        self.isDriversLicenseSelected = ko.computed(function () {
            var showDriversLicense = false;
            if (self.selectedAgeVerification() === configOptions.driverLicenseId) {
                showDriversLicense = true;
            }
            return showDriversLicense;
        }, self);

        self.isMedicareSelected = ko.computed(function () {
            var showMedicare = false;
            if (self.selectedAgeVerification() === configOptions.medicareCardId) {
                showMedicare = true;
            }
            return showMedicare;
        }, self);

        self.isAustralianPassportSelected = ko.computed(function () {
            var showAustralianPassport = false;
            if (self.selectedAgeVerification() === configOptions.australianPassportId) {
                showAustralianPassport = true;
            }
            return showAustralianPassport;
        }, self);

        self.isInternationalPassportSelected = ko.computed(function () {
            var showInternationalPassport = false;
            if (self.selectedAgeVerification() === configOptions.internationalPassportId) {
                showInternationalPassport = true;
            }
            return showInternationalPassport;
        }, self);

        self.isNoneSelected = ko.computed(function () {
            var showNone = false;
            if (self.selectedAgeVerification() === configOptions.noneId) {
                showNone = true;
            }
            return showNone;
        }, self);
        
        // Binding Prototypes
        self.activate = self.activate.bind(self);
        self.deActivate = self.deActivate.bind(self);
    };

    // Prototype Properties
    AgeVerification.prototype = function () {
        var activate = function () {
            var shell = __webpack_require__(26);
            if (shell.nothingVerified() === true) {
                this.selectedAgeVerification(this.configOptions.driverLicenseId);
                this.showDriversLicense(true);
                this.showMedicare(true);
                this.showInternationalPassport(false);
            } else {
                this.selectedAgeVerification(this.configOptions.driverLicenseId);
                this.showDriversLicense(true);
                this.showMedicare(true);
                this.showInternationalPassport(true);
            }
        };

        var deActivate = function (success) {
            if (this.isDriversLicenseSelected() === true) {
                amplify.publish('signup.data', { ageVerificationMethod: 'driverslicence' });
                success("driversLicense");
            } else if (this.isAustralianPassportSelected() === true) {
                amplify.publish('signup.data', { ageVerificationMethod: 'australianpassport' });
                success("australianPassport");
            } else if (this.isInternationalPassportSelected() === true) {
                amplify.publish('signup.data', { ageVerificationMethod: 'internationalpassport' });
                success("internationalPassport");
            } else if (this.isMedicareSelected() === true) {
                amplify.publish('signup.data', { ageVerificationMethod: 'medicare' });
                success("medicare");
            } else {
                amplify.publish('signup.data', { ageVerificationMethod: 'none' });
                success("createPassword");
            }
        };
        return {
            activate: activate,
            deActivate: deActivate
        };
    } ();
    //Note: This module exports a function. That means that you, the developer, can create multiple instances.
    //If you wish to create a singleton, you should export an object instead of a function.

    return AgeVerification;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 263:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, __webpack_require__(1), __webpack_require__(53), __webpack_require__(65), __webpack_require__(34), __webpack_require__(24), __webpack_require__(35)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, ko, prospect, ageVerificationConsent, dataContext, viewModelLocator, publishErrors) {
    var australianPassport = function (options) {
        var self = this instanceof australianPassport
            ? this
            : Object.create(australianPassport.prototype);

        var configOptions = options || {
            australianId: "aus"
        };

        self.ageVerificationConsent = new ageVerificationConsent(ko);

        self.countryOfBirth = ko.observable(null).extend({
            required: true
        });

        self.isAustralianCountryOfBirth = ko.computed(function () {
            var showAustralianFields = false;
            var countryOfBirth = self.countryOfBirth();
            if (countryOfBirth && countryOfBirth.toLowerCase() === configOptions.australianId) {
                showAustralianFields = true;
            }
            return showAustralianFields;
        }, self);

        self.passportNumber = ko.observable(null).extend({
            required: true,
            maxLength: 15
        });

        self.birthSurname = ko.observable(null).extend({
            required: true,
            maxLength: 50,
            lettersHyphenSpacesOnly: {
                params: true
            }
        });

        self.citizenshipSurname = ko.observable(null).extend({
            required: {
                params: true,
                onlyIf: function () { return (!self.isAustralianCountryOfBirth()); }
            },
            maxLength: {
                params: 50,
                onlyIf: function () { return (!self.isAustralianCountryOfBirth()); }
            },
            lettersHyphenSpacesOnly: {
                params: true,
                onlyIf: function () { return (!self.isAustralianCountryOfBirth()); }
            }
        });

        self.citizenshipGivenName = ko.observable(null).extend({
            required: {
                params: true,
                onlyIf: function () { return (!self.isAustralianCountryOfBirth()); }
            },
            maxLength: {
                params: 50,
                onlyIf: function () { return (!self.isAustralianCountryOfBirth()); }
            },
            lettersHyphenSpacesOnly: {
                params: true,
                onlyIf: function () { return (!self.isAustralianCountryOfBirth()); }
            }
        });

        self.placeOfBirth = ko.observable(null).extend({
            required: true,
            maxLength: 50,
            lettersHyphenSpacesOnly: {
                params: true
            }
        });

        // Binding Prototypes
        self.activate = self.activate.bind(self);
        self.deActivate = self.deActivate.bind(self);

        //Bind validation with current object
        ko.validatedObservable(self);
    };

    // Prototype Properties
    australianPassport.prototype = function () {
        var activate = function () {
            this.errors.showAllMessages(false);
        };

        var deActivate = function (success) {
            if (this.isValid()) {
                var shell = __webpack_require__(26);
                var verifyModel = prospect(viewModelLocator.viewModels, shell);
                shell.setLoaderForAgeVerify();
                dataContext.verifyIdSignUp(
                    {
                        success: function (data) {
                            shell.resetLoader();
                            shell.copyVerifyData(data);
                            shell.incrementAttempts();
                            if (shell.isVerified() === true || shell.isOutOfAttempts() === true) {
                                success("createPassword");
                            } else {
                                shell.showVerificationPopUp();
                            }
                        },
                        error: function () {
                            shell.resetLoader();
                            success("error", { showLoginButton: false });
                        }
                    }, verifyModel);
            }
            else {
                publishErrors(this, this.ageVerificationConsent);
                this.errors.showAllMessages();
            }
        };
        return {
            activate: activate,
            deActivate: deActivate
        };
    } ();
    //Note: This module exports a function. That means that you, the developer, can create multiple instances.
    //If you wish to create a singleton, you should export an object instead of a function.

    return australianPassport;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 264:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(6), __webpack_require__(24), __webpack_require__(34), __webpack_require__(35)], __WEBPACK_AMD_DEFINE_RESULT__ = function(ko, amplify, viewModelLocator, dc, publishErrors) {
    var ContactDetails = function () {
        // Force new object
        var self = this instanceof ContactDetails
            ? this
            : Object.create(ContactDetails.prototype);
            
            // Properties
            self.email = ko.observable();
            self.mobileNumber = ko.observable();
            self.marketingSubscription = ko.observable(true);
            self.acceptTermsConditions = ko.observable();

            // Validation
            self.email.extend({
                required: true,
                maxLength: 50,
                email: true
            });

            self.mobileNumber.extend({
                required: true,
                pattern: {
                    message: 'Please enter valid Australian mobile number.',
                    params: '^0[0-9]{9}$'
                }
            });

            self.acceptTermsConditions.extend({
                equal: {
                    params: true,
                    message: "You must agree to the terms and conditions."
                }
            });


            // Binding Prototypes
            self.activate = self.activate.bind(self);
            self.deActivate = self.deActivate.bind(self);

            // Default Constructor
            var init = function () {
                self.email(null);
                self.mobileNumber(null);
                self.marketingSubscription(true);
                self.acceptTermsConditions(false);

                ko.validatedObservable(self);
            };
            init();

        };

        // Prototype Properties
        ContactDetails.prototype = function () {
            var termsAndConditionsClick = function(){
                amplify.publish("signup.next", { termsClick: true });
            }

            var privacyPolicyClick = function () {
                amplify.publish("signup.next", { privacyPolicy: true });
            }
            var activate = function () {
                this.errors.showAllMessages(false);
                var footer = viewModelLocator.findViewModel("footer");
                footer.showNextButton(true);
                footer.showPreviousButton(true);
            };

            var deActivate = function(success, data) {
                if (data.privacyPolicy)
                {
                    success('privacy');
                }else if (data.termsClick) {
                    success("accountTermsConditions");
                }
                else if(this.isValid())
                {
                    var shell = __webpack_require__(26);
                    var personalDetails = viewModelLocator.viewModels["personalDetails"];
                    var callbacks = {success:function(data){

                            shell.applicationReferenceNumber(data.ApplicationReferenceNumber);
                            amplify.publish('signup.data', { applicationReferenceNumber: data.ApplicationReferenceNumber });
                            success("addressVerification");
                        }, error:function(){
                            success("error", { showLoginButton: false});
                        }};
                    var accountDetails ={
                            FirstName: personalDetails.firstName(),
                            MiddleName: personalDetails.middleName(),
                            Surname: personalDetails.surname(),
                            DateOfBirth : personalDetails.dateOfBirthString(),
                            Email : this.email(),
                            MobileNumber : this.mobileNumber(),
                            MarketingOptIn : this.marketingSubscription()
                    };
                    amplify.publish('signup.data', { marketingOptIn: this.marketingSubscription()});
                    if(shell.applicationReferenceNumber())
                    {
                        accountDetails.ApplicationReferenceNumber = shell.applicationReferenceNumber();
                        dc.updateInternetProspect(callbacks, accountDetails);
                    }
                    else
                    {
                        dc.createInternetProspect(callbacks, accountDetails);
                    }
                }
                else {
                    publishErrors(this);
                    this.errors.showAllMessages();
                }
            };
            return {
                activate: activate,
                deActivate : deActivate,
                termsAndConditionsClick: termsAndConditionsClick,
                privacyPolicyClick: privacyPolicyClick
            };
        } ();
    
        //Note: This module exports a function. That means that you, the developer, can create multiple instances.
        //If you wish to create a singleton, you should export an object instead of a function.

        return ContactDetails;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 265:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, __webpack_require__(1), __webpack_require__(145), __webpack_require__(144), __webpack_require__(34), __webpack_require__(53), __webpack_require__(65), __webpack_require__(24), __webpack_require__(35), __webpack_require__(228)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, ko, Recaptcha, ComboBoxDate, dataContext, prospect, ageVerificationConsent, viewModelLocator, publishErrors) {
    var driversLicense = function (options) {
        // Force new object
        var self = this instanceof driversLicense
            ? this
            : Object.create(driversLicense.prototype);

        var configOptions = options || {
            newSouthWalesId: "NSW",
            westernAustraliaId: "WA",
            victoriaId: "VIC",
            southAustraliaId: "SA",
            tasmaniaId: "TAS",
            australianCapitalTerritoryId: "ACT",
            northernTerritoryId: "NT",
            queenslandId: "QLD"
        };

        self.ageVerificationConsent = new ageVerificationConsent(ko);
        
        self.state = ko.observable(null).extend({
            required: true
        });

        self.expiry = new ComboBoxDate({
            enableMinimumAge: false,
            minimumAgeLimit: 18,
        });
        self.expiry.enabled(false);
        
        self.captcha = {
            error: ko.observable(false),
            checkCaptchaEmpty: function () {
                var challenge,
                    response,
                    isEmpty = false;
                if (self.displayCaptcha()) {
                    challenge = Recaptcha.get_challenge();
                    response = Recaptcha.get_response();
                    if (challenge === null || response === null || !response) {
                        isEmpty = true;
                    }
                }
                self.captcha.error(isEmpty);
                return isEmpty;
            },
            getChallenge: function () {
                return Recaptcha.get_challenge();
            },
            getResponse: function () {
                return Recaptcha.get_response();
            }
        };


        self.displayCardNumber = ko.computed(function () {
            return false;
        }, self);

        self.displayExpiry = ko.computed(function () {
            return false;
        }, self);

        self.isInFuture = ko.computed(function () {
            return self.expiry.date() > new Date();
        });

        self.displayCaptcha = ko.computed(function () {
            return false;
        }, self);

        self.licenseNumber = ko.observable(null).extend({
            required: true,
            maxLength: 10
        });

        self.cardNumber = ko.observable(null);

        // Binding Prototypes
        self.activate = self.activate.bind(self);
        self.deActivate = self.deActivate.bind(self);

        //Bind validation with current object
        ko.validatedObservable(self);
    };

    // Prototype Properties
    driversLicense.prototype = function () {
        var activate = function () {
            this.errors.showAllMessages(false);
        };
        var deActivate = function (success) {
            if (this.isValid() === true && this.captcha.checkCaptchaEmpty() === false) {
                var shell = __webpack_require__(26);
                var verifyModel = prospect(viewModelLocator.viewModels, shell);
                shell.setLoaderForAgeVerify();
                dataContext.verifyIdSignUp(
                    {
                        success: function (data) {
                            shell.resetLoader();
                            shell.copyVerifyData(data);
                            shell.incrementAttempts();
                            if (shell.isVerified() === true || shell.isOutOfAttempts() === true) {
                                success("createPassword");
                            } else {
                                shell.showVerificationPopUp();
                            }
                        },
                        error: function () {
                            shell.resetLoader();
                            success("error", { showLoginButton: false });
                        }
                    }, verifyModel);
            }
            else {
                publishErrors(this, this.ageVerificationConsent);
                this.errors.showAllMessages();
            }
        };
        return {
            activate: activate,
            deActivate: deActivate
        };
    } ();

    //Note: This module exports a function. That means that you, the developer, can create multiple instances.
    //If you wish to create a singleton, you should export an object instead of a function.

    return driversLicense;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 266:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (ko) {
    var Error = function () {
        var self = (this === window) ? {} : this;
        self.errorMessage = ko.observable();
        self.showLoginButton = ko.observable(true);
    };

    // Prototype Properties
    Error.prototype = function () {
        var 
            activate = function (options) {
                options = options || {};
                this.showLoginButton(options.showLoginButton)
            },
            deActivate = function (navigate) {
            };
        return {
            activate: activate,
            deActivate: deActivate
        };
    } ();

    //Note: This module exports a function. That means that you, the developer, can create multiple instances.
    //If you wish to create a singleton, you should export an object instead of a function.

    return Error;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 267:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (ko) {
    var ExistingAccount = function () {
        var self = (this === window) ? {} : this;
        

    };
    // Prototype Properties
    ExistingAccount.prototype = function () {
        var 
            activate = function () {
                
            },
            deActivate = function (navigate) {
                
            };
        return {
            activate: activate,
            deActivate: deActivate
        };
    } ();
    //Note: This module exports a function. That means that you, the developer, can create multiple instances.
    //If you wish to create a singleton, you should export an object instead of a function.

    return ExistingAccount;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 268:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(24), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function(viewModelLocator, amplify){
  return {
        activate: function(){
        },
        loadTermsAndConditions : function(){
            amplify.publish("signup.next");
        },
        deActivate: function(navigate){
            navigate("accountTermsConditions", { progressClassName : 'progress-1' });
        }
    };
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 269:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, __webpack_require__(1), __webpack_require__(53), __webpack_require__(65), __webpack_require__(34), __webpack_require__(24), __webpack_require__(35)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, ko, prospect, ageVerificationConsent, dataContext, viewModelLocator, publishErrors) {
    var internationalPassport = function (options) {
        var self = this instanceof internationalPassport
            ? this
            : Object.create(internationalPassport.prototype);

        self.ageVerificationConsent = new ageVerificationConsent(ko);
        
        self.passportNumber = ko.observable(null).extend({
            required: true,
            maxLength: 15
        });

        self.country = ko.observable(null).extend({
            required: true,
            maxLength: 50,
            lettersHyphenSpacesOnly: {
                params: true
            }
        });

        // Binding Prototypes
        self.activate = self.activate.bind(self);
        self.deActivate = self.deActivate.bind(self);

        //Bind validation with current object
        ko.validatedObservable(self);
    };

    // Prototype Properties
    internationalPassport.prototype = function () {
        var activate = function () {
            this.errors.showAllMessages(false);
        };

        var deActivate = function (success) {
            if (this.isValid() === true) {
                var shell = __webpack_require__(26);
                var verifyModel = prospect(viewModelLocator.viewModels, shell);
                shell.setLoaderForAgeVerify();
                dataContext.verifyIdSignUp(
                    {
                        success: function (data) {
                            shell.resetLoader();
                            shell.copyVerifyData(data);
                            shell.incrementAttempts();
                            if (shell.isVerified() === true || shell.isOutOfAttempts() === true) {
                                success("createPassword");
                            } else {
                                shell.showVerificationPopUp();
                            }
                        },
                        error: function () {
                            shell.resetLoader();
                            success("error", { showLoginButton: false });
                        }
                    }, verifyModel);
            }
            else {
                publishErrors(this, this.ageVerificationConsent);
                this.errors.showAllMessages();
            }
        };
        return {
            activate: activate,
            deActivate: deActivate
        };
    } ();


    return internationalPassport;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * JavaScript Cookie v2.1.3
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader = false;
	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		registeredInModuleLoader = true;
	}
	if (true) {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				return (document.cookie = [
					key, '=', value,
					attributes.expires ? '; expires=' + attributes.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
					attributes.path ? '; path=' + attributes.path : '',
					attributes.domain ? '; domain=' + attributes.domain : '',
					attributes.secure ? '; secure' : ''
				].join(''));
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));


/***/ }),

/***/ 270:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, __webpack_require__(1), __webpack_require__(53), __webpack_require__(65), __webpack_require__(34), __webpack_require__(24), __webpack_require__(35), __webpack_require__(255), ], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, ko, prospect, ageVerificationConsent, dataContext, viewModelLocator, publishErrors) {
    var medicare = function (options) {
        var self = this instanceof medicare
            ? this
            : Object.create(medicare.prototype);

        self.ageVerificationConsent = new ageVerificationConsent(ko);

        self.cardNumber = ko.observable(null).extend({
            required: true,
            minLength: 10,
            maxLength: 10,
            digit: true
        });

        self.referenceNumber = ko.observable(null).extend({
            required: true,
            maxLength: {
                params: 1,
                message: "Please enter no more than 1 character"
            },
            digit: true
        });

        self.middleName = ko.observable(null).extend({
            required: false,
            maxLength: 100
        });


        self.shouldShowDay = ko.pureComputed(function() {
            return self.selectedCardColor() !== "Green";
        });

        self.date = {
            day: ko.observable(),
            month: ko.observable(),
            year: ko.observable(),
        };

        self.selectedCardColor = ko.observable(null).extend({ required: true });

        self.date.valid = ko.pureComputed(function() {
            return (!self.shouldShowDay() || !!self.date.day()) && !!self.date.month() && !!self.date.year() ? true : null;
        }).extend({
            required: true
        });

        self.cardColors = ko.observableArray(["Green", "Yellow", "Blue"]);
        self.getCardColorText = function(color) {
            return "My card is " + color.toLowerCase();
        }

        // Binding Prototypes
        self.activate = self.activate.bind(self);
        self.deActivate = self.deActivate.bind(self);

        //Bind validation with current object
        ko.validatedObservable(self);
    };

    // Prototype Properties
    medicare.prototype = function() {
        var activate = function() {
            this.errors.showAllMessages(false);
        };
        var deActivate = function(success) {
            if (this.isValid() === true) {
                var shell = __webpack_require__(26);
                var verifyModel = prospect(viewModelLocator.viewModels, shell);
                shell.setLoaderForAgeVerify();
                dataContext.verifyIdSignUp(
                {
                    success: function(data) {
                        shell.resetLoader();
                        shell.copyVerifyData(data);
                        shell.incrementAttempts();
                        if (shell.isVerified() === true || shell.isOutOfAttempts() === true) {
                            success("createPassword");
                        } else {
                            shell.showVerificationPopUp();
                        }
                    },
                    error: function() {
                        shell.resetLoader();
                        success("error", { showLoginButton: false });
                    }
                }, verifyModel);
            } else {
                publishErrors(this, this.ageVerificationConsent, { date: this.date.valid });
                this.errors.showAllMessages();
            }
        };
        return {
            activate: activate,
            deActivate: deActivate
        };
    }();
    //Note: This module exports a function. That means that you, the developer, can create multiple instances.
    //If you wish to create a singleton, you should export an object instead of a function.

    return medicare;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 271:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, __webpack_require__(1), __webpack_require__(34), __webpack_require__(6), __webpack_require__(66), __webpack_require__(35), __webpack_require__(232), __webpack_require__(230)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, ko, dc, amplify, footer, publishErrors) {
    var Password = function () {
        // Force new object
        var self = this instanceof Password
            ? this
            : Object.create(Password.prototype);

        self.password = ko.observable().extend(
            {
                required: true,
                pattern:
                    {
                        message: "Password must be 4-8 numeric values.",
                        params: "^[0-9]{4,8}$"
                    },
                maxConsecutiveCharacters: 3

            });

        self.confirmPassword = ko.observable().extend({ equal: { params: self.password, message: "The passwords must match."} });

        self.activate = function (options) {
            var shell = __webpack_require__(26);
            if (shell.isVerified()) {
                footer.ageVerificationStatusClass(footer.successClass);
            }
            else
            {
                footer.ageVerificationStatusClass(footer.errorClass);
            }
        };

        self.deActivate = function (success, options) {
            if (options.termsClicked) {
                success("accountTermsConditions", { progressClassName: 'progress-3' });
            } else if (self.isValid()) {
                var shell = __webpack_require__(26);
                var data = {
                    Password: self.password(),
                    ApplicationReferenceNumber: shell.applicationReferenceNumber()
                };
                shell.setLoaderForAccountCreation();
                dc.createBetAccount({
                    success: function (responseData) {
                        shell.bettingAccountNumber(responseData.BetAccountNumber);
                        var loginAccount = {
                            AccountNumber: shell.bettingAccountNumber(),
                            Password: self.password()
                        };
                        shell.setLoaderForAccountCreation();
                        dc.login({
                            success: function () {
                                shell.resetLoader();
                                success('accountCreated');
                            },
                            error: function () {
                                shell.resetLoader();
                                success('accountCreated');
                            }
                        }, loginAccount);
                    

                        
                    },
                    error: function () {
                        shell.resetLoader();
                        success("error", { showLoginButton: false });
                    }
                }, data);
            } else {
                publishErrors(self);
                self.errors.showAllMessages();
            }
        };

        ko.validatedObservable(self);
    };

    return new Password();
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 272:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(1), __webpack_require__(38), __webpack_require__(231), __webpack_require__(144), __webpack_require__(34), __webpack_require__(24), __webpack_require__(35)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($, ko, validation, lettersHyphenSpacesOnly, ComboBoxDate, dataContext, viewModelLocator, publishErrors) {
    var PersonalDetails = function () {
        // Force new object
        var self = this instanceof PersonalDetails
            ? this
            : Object.create(PersonalDetails.prototype);

        // Properties
        self.firstName = ko.observable();
        self.middleName = ko.observable();
        self.surname = ko.observable();
        self.dateOfBirth = new ComboBoxDate();
        self.deactivateAttempted = ko.observable(false);
        self.dateOfBirthString = function () {
            return this.dateOfBirth.date().toDateString();
        };

        // Validation
        self.firstName.extend({
            required: true,
            maxLength: 25,
            lettersHyphenSpacesOnly: {
                params: true
            }
        });

        self.middleName.extend({
            maxLength: 40,
            lettersHyphenSpacesOnly: {
                params: true
            }
        });

        self.surname.extend({
            required: true,
            maxLength: 30,
            lettersHyphenSpacesOnly: {
                params: true
            }
        });

        // Binding Prototypes
        self.activate = self.activate.bind(self);
        self.deActivate = self.deActivate.bind(self);

        // Default Constructor
        var init = function () {
            self.firstName(null);
            self.middleName(null);
            self.surname(null);
            ko.validatedObservable(self);
        };
        init();

    };

    // Prototype Properties
    PersonalDetails.prototype = function () {
        var 
            activate = function() {
                this.errors.showAllMessages(false);
                var footer = viewModelLocator.findViewModel("footer");
                footer.showNextButton(true);
                footer.showPreviousButton(true);
            },
            deActivate = function(navigate) {
                this.deactivateAttempted(true);
                if (!this.isValid()) {
                    publishErrors(this, this.dateOfBirth);
                    
                    this.errors.showAllMessages();
                } else {
                    dataContext.checkForDuplicates({
                            success: function(data) {
                               if (data.DuplicateExists === true) {
                                    navigate("existingAccount");
                                } else {
                                    navigate("contactDetails");
                                }
                            },
                            error: function(error) {
                                navigate("error", { showLoginButton: true });
                            }
                        }, {
                            Surname: this.surname(),
                            // Just get date string to avoid issues with timezone
                            DateOfBirth: this.dateOfBirth.date().toDateString()
                        });
                }
            };
        return {
            activate: activate,
            deActivate: deActivate
        };
    } ();

    //Note: This module exports a function. That means that you, the developer, can create multiple instances.
    //If you wish to create a singleton, you should export an object instead of a function.

    return PersonalDetails;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 273:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(66)], __WEBPACK_AMD_DEFINE_RESULT__ = function (ko, footer) {
    var Privacy = function () {
        // Force new object
        var self = this instanceof Privacy
            ? this
            : Object.create(Privacy.prototype);

    };
    // Prototype Properties
    Privacy.prototype = function () {
        var
            activate = function () {
                footer.showNextButton(false);
            };

            deActivate = function(){
                footer.showNextButton(true);
            }

            return {
                activate: activate
            };
    } ();
    //Note: This module exports a function. That means that you, the developer, can create multiple instances.
    //If you wish to create a singleton, you should export an object instead of a function.
    
    return new Privacy();
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 274:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function (ko, amplify) {
    var Slider = function (successfulSlide) {
        // Force new object
        var self = this instanceof Slider
            ? this
            : Object.create(Slider.prototype);

        // Properties
        self.sliderValue = ko.observable(0);
        self.enabled = ko.observable(true);
        self.isSlided = ko.computed(function () {
            var intValue = parseInt(self.sliderValue(), 10);
            var slided = (intValue === 100);
            if (slided === true && self.enabled() === true) {
                amplify.publish(successfulSlide, true);
            }
            return slided;
        }, self);

        // Binding Prototypes
        self.reset = self.reset.bind(self);
        self.setValue = self.setValue.bind(self);
        self.complete = self.complete.bind(self);
        
        return self;
    };

    // Prototype Properties
    Slider.prototype = function () {
        var 
            reset = function () {
                this.sliderValue(0);
            },
            setValue = function (newValue) {
                if (newValue >= 0 && newValue <= 100) {
                    this.sliderValue(newValue);
                }
            },
            complete = function () {
                this.sliderValue(100);
            };
        return {
            reset: reset,
            setValue: setValue,
            complete: complete
        };
    } ();
    //Note: This module exports a function. That means that you, the developer, can create multiple instances.
    //If you wish to create a singleton, you should export an object instead of a function.

    return Slider;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 275:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(274), __webpack_require__(24), __webpack_require__(229)], __WEBPACK_AMD_DEFINE_RESULT__ = function (ko, Slider, viewModelLocator) {
    var Welcome = function () {
        // Force new object
        var self = this instanceof Welcome
            ? this
            : Object.create(Welcome.prototype);

        // Properties
        self.slider = new Slider("signup.next");

        // Binding Prototypes
        self.activate = self.activate.bind(self);
        self.deActivate = self.deActivate.bind(self);
    };

    // Prototype Properties
    Welcome.prototype = function () {
        var 
            activate = function () {
                this.slider.reset();
                this.slider.enabled(true);
                var footer = viewModelLocator.findViewModel("footer");
                footer.showNextButton(false);
                footer.showPreviousButton(false);
            },
            deActivate = function (navigate) {
                this.slider.enabled(false);
                navigate("personalDetails");
            };
        return {
            activate: activate,
            deActivate: deActivate
        };
    } ();

    //Note: This module exports a function. That means that you, the developer, can create multiple instances.
    //If you wish to create a singleton, you should export an object instead of a function.

    return Welcome;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function (amplify) {
    var AnalyticsDataLayer = function () {

        this.history = new Array();

        this.data = {
            version: 1.19,
            content: { url: '' },
            user: { accountNumber: '', accountOperationType: '' },
            preferences: { cashBetting: '', debug: false },
            signUp: { applicationId: '', optIn: '', ageConfirmType: '', accountId: '', lastValidationError: null },
            bet: {
                id: '',
                productType: '',  /* single | multi | accumulator */
                construction: '', /* single | betslip */
                placementMethod: '', /* account | cash */
                isFirstBet: '',
                racing: { tote: { cost: 0, numberOfTickets: 0 }, fixed: { cost: 0, numberOfTickets: 0 } },
                sports: { tote: { cost: 0, numberOfTickets: 0 }, fixed: { cost: 0, numberOfTickets: 0 } },
                mixed: { fixed: { cost: 0, numberOfTickets: 0 } },
                specialOffers: []
            },
            deposit: { amount: 0 },
            specialOfferSelection: null
        };

        this.keys = {
            nav: 'nav-content-url',
            menu: 'nav-menu',
            login: 'login',
            logout: 'logout',
            cashPreferenceBaseKey: 'nav-cash-',
            //TODO: Remove
            cashOn: 'nav-cash-on',
            cashOff: 'nav-cash-off',
            //
            exitToBaseKey: 'nav-exit-',
            //TODO: Remove these keys once dev is complete
            exitToFacebook: 'nav-exit-facebook',
            exitToTwitter: 'nav-exit-twitter',
            exitToAndroid: 'nav-exit-android',
            exitToIos: 'nav-exit-ios',
            exitToWebsite: 'nav-exit-website',
            exitToAflHub: 'nav-exit-afl-hub',
            exitToAndroidInstructions: 'nav-android-installation-instructions',
            //End Todo
            signupBaseKey: 'signup-',
            signupBegin: 'signupinminutes',
            signupSliderActivated: 'slidetogetstarted',
            signupNameComplete: 'step1next',
            signupEmailComplete: 'step2next',
            signupAddressComplete: 'step3next',
            signupAgeValidationMethodConfirmed: 'step4next',
            signupPassportComplete: 'step5next',
            signupDriversLicenceComplete: 'step5next',
            signupPasswordComplete: 'step6next',
            signupComplete: 'step7next',
            signupValidationError: 'validation-error',

            betSelected: 'bet-selected',
            betAccountSelected: 'bet-account',
            betAccountReview: 'bet-account-review',
            betAccountProcessed: 'bet-account-processed',

            cashBetSelected: 'bet-cash',
            cashBetProcessed: 'bet-cash-processed',
            cashBetUndo: 'bet-cash-undo',
            cashBetRemoved: 'bet-cash-delete',
            cashCleared: 'bet-cash-delete-all',

            betslipBetAdded: 'bet-add',
            betslipBetRemoved: 'betslip-remove',
            betslipCleared: 'betslip-clear',
            betslipAccountSelected: 'bet-account',
            betslipAccountReview: 'bet-account-review',
            betslipAccountProcessed: 'bet-account-processed',
            betslipCashSelected: 'bet-cash',

            mysterySelected: 'bet-selected',
            mysteryAccountSelected: 'bet-account',
            mysteryReview: 'bet-account-review',
            mysteryReceipt: 'bet-account-processed',

            favNumbersSelected: 'bet-selected',
            favNumbersAccountSelected: 'bet-account',
            favNumbersAccountReview: 'bet-account-review',
            favNumbersAccountProcessed: 'bet-account-processed',

            tippingSelected: 'bet-selected',
            tippingAccountSelected: 'bet-account',
            tippingAccountReview: 'bet-account-review',
            tippingAccountProcessed: 'bet-account-processed',

            multiBetAdded: 'bet-add',
            multiBetRemoved: 'bet-remove',
            multiCleared: 'bet-clear',
            multiAccountSelected: 'bet-account',
            multiAccountReview: 'bet-account-review',
            multiAccountProcessed: 'bet-account-processed',

            accumulatorSelected: 'bet-selected',
            accumulatorAccountSelected: 'bet-account',
            accumulatorAccountReview: 'bet-account-review',
            accumulatorAccountProcessed: 'bet-account-processed',

            accountProcessed: 'account-interaction',

            depositBaseKey: 'deposit-',
            checkInBaseKey: 'lbs-checkin-',
            activityBaseKey: 'activity-'
        };

        this.getHistory = function () {
            if (this.data.preferences.debug) {
                return 'history : ' + this.history.length + ' items';
            } else {
                return 'history : debugging is off. Activate debugging to capture and display history';
            }
        };

        this.addToHistory = function (event, data) {
            if (this.data.preferences.debug) {
                var date = new Date();
                this.history.push({ timestamp: date, event: event, data: data });
            }
        };

        this.resetBetData = function () {
            this.data.bet.id = '';

            this.data.bet.racing.tote.numberOfTickets = 0;
            this.data.bet.racing.tote.cost = 0;
            this.data.bet.racing.fixed.numberOfTickets = 0;
            this.data.bet.racing.fixed.cost = 0;

            this.data.bet.sports.tote.numberOfTickets = 0;
            this.data.bet.sports.tote.cost = 0;
            this.data.bet.sports.fixed.numberOfTickets = 0;
            this.data.bet.sports.fixed.cost = 0;

            this.data.bet.mixed.fixed.numberOfTickets = 0;
            this.data.bet.mixed.fixed.cost = 0;

            this.data.bet.specialOffers = [];
        };

        this.saveTrackData = function () {
            amplify.store('AnalyticsDataLayer', this.data);
        };

        this.loadTrackData = function () {
            var localStorage = amplify.store('AnalyticsDataLayer');
            if (localStorage) {
                if (localStorage.version >= this.data.version) {
                    this.data = localStorage;
                }
            }
        };

        this.activateDebug = function () {
            this.data.preferences.debug = true;
            this.saveTrackData();
        };

        this.deactivateDebug = function () {
            this.data.preferences.debug = false;
            this.saveTrackData();
        };

        return {
            history: this.history,
            data: this.data,
            keys: this.keys,
            activateDebug: this.activateDebug,
            deactivateDebug: this.deactivateDebug,
            addToHistory: this.addToHistory,
            getHistory: this.getHistory,
            saveTrackData: this.saveTrackData,
            loadTrackData: this.loadTrackData,
            resetBetData: this.resetBetData
        };
    };

    return new AnalyticsDataLayer();
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(44)], __WEBPACK_AMD_DEFINE_RESULT__ = function (apiService) {
    var cachedPromise = null;
    var timeoutHandler = null;

    function getFeatures() {
        return cachedPromise || (cachedPromise = fetchFeatures());
    }

    function fetchFeatures() {
        return apiService.fetchJsonFromApi('/api/Feature/index')
            .then(function(activeFeatures) {
                resetCacheTimer();
                return activeFeatures;
            }, function(err) {
                clearCache();
                throw "API fetch call failed: " + err.message;
            });
    }

    function clearCache() {
        cachedPromise = null;
    }

    function clearRefreshTimeout() {
        clearTimeout(timeoutHandler);
    }

    function isActive(featureName) {
        return getFeatures()
            .then(function(result) {
                return result.indexOf(featureName) >= 0;
            });
    }

    function stopRefresh() {
        clearRefreshTimeout();
    }

    function resetCacheTimer() {
        var fiveMinutes = 5 * 60 * 1000;
        clearTimeout(timeoutHandler);
        timeoutHandler = setTimeout(clearCache, fiveMinutes);
    }

    return {
        isActive: isActive,
        clear: clearCache,
        stopRefresh: stopRefresh
    };
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 319:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*** IMPORTS FROM imports-loader ***/
(function() {

/*!
* jQuery Mobile 1.3.2
* Git HEAD hash: 528cf0e96940644ea644096bfeb913ed920ffaef <> Date: Fri Jul 19 2013 22:17:57 UTC
* http://jquerymobile.com
*
* Copyright 2010, 2013 jQuery Foundation, Inc. and other contributors
* Released under the MIT license.
* http://jquery.org/license
*
*/


(function ( root, doc, factory ) {
	if ( true ) {
		// AMD. Register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(0) ], __WEBPACK_AMD_DEFINE_RESULT__ = function ( $ ) {
			factory( $, root, doc );
			return $.mobile;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		// Browser globals
		factory( root.jQuery, root, doc );
	}
}( this, document, function ( jQuery, window, document, undefined ) {
(function( $ ) {
	$.mobile = {};
}( jQuery ));
(function( $, window, undefined ) {
	var nsNormalizeDict = {};

	// jQuery.mobile configurable options
	$.mobile = $.extend($.mobile, {

		// Version of the jQuery Mobile Framework
		version: "1.3.2",

		// Namespace used framework-wide for data-attrs. Default is no namespace
		ns: "",

		// Define the url parameter used for referencing widget-generated sub-pages.
		// Translates to to example.html&ui-page=subpageIdentifier
		// hash segment before &ui-page= is used to make Ajax request
		subPageUrlKey: "ui-page",

		// Class assigned to page currently in view, and during transitions
		activePageClass: "ui-page-active",

		// Class used for "active" button state, from CSS framework
		activeBtnClass: "ui-btn-active",

		// Class used for "focus" form element state, from CSS framework
		focusClass: "ui-focus",

		// Automatically handle clicks and form submissions through Ajax, when same-domain
		ajaxEnabled: true,

		// Automatically load and show pages based on location.hash
		hashListeningEnabled: true,

		// disable to prevent jquery from bothering with links
		linkBindingEnabled: true,

		// Set default page transition - 'none' for no transitions
		defaultPageTransition: "fade",

		// Set maximum window width for transitions to apply - 'false' for no limit
		maxTransitionWidth: false,

		// Minimum scroll distance that will be remembered when returning to a page
		minScrollBack: 250,

		// DEPRECATED: the following property is no longer in use, but defined until 2.0 to prevent conflicts
		touchOverflowEnabled: false,

		// Set default dialog transition - 'none' for no transitions
		defaultDialogTransition: "pop",

		// Error response message - appears when an Ajax page request fails
		pageLoadErrorMessage: "Error Loading Page",

		// For error messages, which theme does the box uses?
		pageLoadErrorMessageTheme: "e",

		// replace calls to window.history.back with phonegaps navigation helper
		// where it is provided on the window object
		phonegapNavigationEnabled: false,

		//automatically initialize the DOM when it's ready
		autoInitializePage: true,

		pushStateEnabled: true,

		// allows users to opt in to ignoring content by marking a parent element as
		// data-ignored
		ignoreContentEnabled: false,

		// turn of binding to the native orientationchange due to android orientation behavior
		orientationChangeEnabled: true,

		buttonMarkup: {
			hoverDelay: 200
		},

		// define the window and the document objects
		window: $( window ),
		document: $( document ),

		// TODO might be useful upstream in jquery itself ?
		keyCode: {
			ALT: 18,
			BACKSPACE: 8,
			CAPS_LOCK: 20,
			COMMA: 188,
			COMMAND: 91,
			COMMAND_LEFT: 91, // COMMAND
			COMMAND_RIGHT: 93,
			CONTROL: 17,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			INSERT: 45,
			LEFT: 37,
			MENU: 93, // COMMAND_RIGHT
			NUMPAD_ADD: 107,
			NUMPAD_DECIMAL: 110,
			NUMPAD_DIVIDE: 111,
			NUMPAD_ENTER: 108,
			NUMPAD_MULTIPLY: 106,
			NUMPAD_SUBTRACT: 109,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			PERIOD: 190,
			RIGHT: 39,
			SHIFT: 16,
			SPACE: 32,
			TAB: 9,
			UP: 38,
			WINDOWS: 91 // COMMAND
		},

		// Place to store various widget extensions
		behaviors: {},

		// Scroll page vertically: scroll to 0 to hide iOS address bar, or pass a Y value
		silentScroll: function( ypos ) {
			if ( $.type( ypos ) !== "number" ) {
				ypos = $.mobile.defaultHomeScroll;
			}

			// prevent scrollstart and scrollstop events
			$.event.special.scrollstart.enabled = false;

			setTimeout( function() {
				window.scrollTo( 0, ypos );
				$.mobile.document.trigger( "silentscroll", { x: 0, y: ypos });
			}, 20 );

			setTimeout( function() {
				$.event.special.scrollstart.enabled = true;
			}, 150 );
		},

		// Expose our cache for testing purposes.
		nsNormalizeDict: nsNormalizeDict,

		// Take a data attribute property, prepend the namespace
		// and then camel case the attribute string. Add the result
		// to our nsNormalizeDict so we don't have to do this again.
		nsNormalize: function( prop ) {
			if ( !prop ) {
				return;
			}

			return nsNormalizeDict[ prop ] || ( nsNormalizeDict[ prop ] = $.camelCase( $.mobile.ns + prop ) );
		},

		// Find the closest parent with a theme class on it. Note that
		// we are not using $.fn.closest() on purpose here because this
		// method gets called quite a bit and we need it to be as fast
		// as possible.
		getInheritedTheme: function( el, defaultTheme ) {
			var e = el[ 0 ],
				ltr = "",
				re = /ui-(bar|body|overlay)-([a-z])\b/,
				c, m;

			while ( e ) {
				c = e.className || "";
				if ( c && ( m = re.exec( c ) ) && ( ltr = m[ 2 ] ) ) {
					// We found a parent with a theme class
					// on it so bail from this loop.
					break;
				}

				e = e.parentNode;
			}

			// Return the theme letter we found, if none, return the
			// specified default.

			return ltr || defaultTheme || "a";
		},

		// TODO the following $ and $.fn extensions can/probably should be moved into jquery.mobile.core.helpers
		//
		// Find the closest javascript page element to gather settings data jsperf test
		// http://jsperf.com/single-complex-selector-vs-many-complex-selectors/edit
		// possibly naive, but it shows that the parsing overhead for *just* the page selector vs
		// the page and dialog selector is negligable. This could probably be speed up by
		// doing a similar parent node traversal to the one found in the inherited theme code above
		closestPageData: function( $target ) {
			return $target
				.closest( ':jqmData(role="page"), :jqmData(role="dialog")' )
				.data( "mobile-page" );
		},

		enhanceable: function( $set ) {
			return this.haveParents( $set, "enhance" );
		},

		hijackable: function( $set ) {
			return this.haveParents( $set, "ajax" );
		},

		haveParents: function( $set, attr ) {
			if ( !$.mobile.ignoreContentEnabled ) {
				return $set;
			}

			var count = $set.length,
				$newSet = $(),
				e, $element, excluded;

			for ( var i = 0; i < count; i++ ) {
				$element = $set.eq( i );
				excluded = false;
				e = $set[ i ];

				while ( e ) {
					var c = e.getAttribute ? e.getAttribute( "data-" + $.mobile.ns + attr ) : "";

					if ( c === "false" ) {
						excluded = true;
						break;
					}

					e = e.parentNode;
				}

				if ( !excluded ) {
					$newSet = $newSet.add( $element );
				}
			}

			return $newSet;
		},

		getScreenHeight: function() {
			// Native innerHeight returns more accurate value for this across platforms,
			// jQuery version is here as a normalized fallback for platforms like Symbian
			return window.innerHeight || $.mobile.window.height();
		}
	}, $.mobile );

	// Mobile version of data and removeData and hasData methods
	// ensures all data is set and retrieved using jQuery Mobile's data namespace
	$.fn.jqmData = function( prop, value ) {
		var result;
		if ( typeof prop !== "undefined" ) {
			if ( prop ) {
				prop = $.mobile.nsNormalize( prop );
			}

			// undefined is permitted as an explicit input for the second param
			// in this case it returns the value and does not set it to undefined
			if( arguments.length < 2 || value === undefined ){
				result = this.data( prop );
			} else {
				result = this.data( prop, value );
			}
		}
		return result;
	};

	$.jqmData = function( elem, prop, value ) {
		var result;
		if ( typeof prop !== "undefined" ) {
			result = $.data( elem, prop ? $.mobile.nsNormalize( prop ) : prop, value );
		}
		return result;
	};

	$.fn.jqmRemoveData = function( prop ) {
		return this.removeData( $.mobile.nsNormalize( prop ) );
	};

	$.jqmRemoveData = function( elem, prop ) {
		return $.removeData( elem, $.mobile.nsNormalize( prop ) );
	};

	$.fn.removeWithDependents = function() {
		$.removeWithDependents( this );
	};

	$.removeWithDependents = function( elem ) {
		var $elem = $( elem );

		( $elem.jqmData( 'dependents' ) || $() ).remove();
		$elem.remove();
	};

	$.fn.addDependents = function( newDependents ) {
		$.addDependents( $( this ), newDependents );
	};

	$.addDependents = function( elem, newDependents ) {
		var dependents = $( elem ).jqmData( 'dependents' ) || $();

		$( elem ).jqmData( 'dependents', $.merge( dependents, newDependents ) );
	};

	// note that this helper doesn't attempt to handle the callback
	// or setting of an html element's text, its only purpose is
	// to return the html encoded version of the text in all cases. (thus the name)
	$.fn.getEncodedText = function() {
		return $( "<div/>" ).text( $( this ).text() ).html();
	};

	// fluent helper function for the mobile namespaced equivalent
	$.fn.jqmEnhanceable = function() {
		return $.mobile.enhanceable( this );
	};

	$.fn.jqmHijackable = function() {
		return $.mobile.hijackable( this );
	};

	// Monkey-patching Sizzle to filter the :jqmData selector
	var oldFind = $.find,
		jqmDataRE = /:jqmData\(([^)]*)\)/g;

	$.find = function( selector, context, ret, extra ) {
		selector = selector.replace( jqmDataRE, "[data-" + ( $.mobile.ns || "" ) + "$1]" );

		return oldFind.call( this, selector, context, ret, extra );
	};

	$.extend( $.find, oldFind );

	$.find.matches = function( expr, set ) {
		return $.find( expr, null, null, set );
	};

	$.find.matchesSelector = function( node, expr ) {
		return $.find( expr, null, null, [ node ] ).length > 0;
	};
})( jQuery, this );


/*!
 * jQuery UI Widget v1.10.0pre - 2012-11-13 (ff055a0c353c3c8ce6e5bfa07ad7cb03e8885bc5)
 * http://jqueryui.com
 *
 * Copyright 2010, 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */
(function( $, undefined ) {

var uuid = 0,
	slice = Array.prototype.slice,
	_cleanData = $.cleanData;
$.cleanData = function( elems ) {
	for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
		try {
			$( elem ).triggerHandler( "remove" );
		// http://bugs.jquery.com/ticket/8235
		} catch( e ) {}
	}
	_cleanData( elems );
};

$.widget = function( name, base, prototype ) {
	var fullName, existingConstructor, constructor, basePrototype,
		namespace = name.split( "." )[ 0 ];

	name = name.split( "." )[ 1 ];
	fullName = namespace + "-" + name;

	if ( !prototype ) {
		prototype = base;
		base = $.Widget;
	}

	// create selector for plugin
	$.expr[ ":" ][ fullName.toLowerCase() ] = function( elem ) {
		return !!$.data( elem, fullName );
	};

	$[ namespace ] = $[ namespace ] || {};
	existingConstructor = $[ namespace ][ name ];
	constructor = $[ namespace ][ name ] = function( options, element ) {
		// allow instantiation without "new" keyword
		if ( !this._createWidget ) {
			return new constructor( options, element );
		}

		// allow instantiation without initializing for simple inheritance
		// must use "new" keyword (the code above always passes args)
		if ( arguments.length ) {
			this._createWidget( options, element );
		}
	};
	// extend with the existing constructor to carry over any static properties
	$.extend( constructor, existingConstructor, {
		version: prototype.version,
		// copy the object used to create the prototype in case we need to
		// redefine the widget later
		_proto: $.extend( {}, prototype ),
		// track widgets that inherit from this widget in case this widget is
		// redefined after a widget inherits from it
		_childConstructors: []
	});

	basePrototype = new base();
	// we need to make the options hash a property directly on the new instance
	// otherwise we'll modify the options hash on the prototype that we're
	// inheriting from
	basePrototype.options = $.widget.extend( {}, basePrototype.options );
	$.each( prototype, function( prop, value ) {
		if ( $.isFunction( value ) ) {
			prototype[ prop ] = (function() {
				var _super = function() {
						return base.prototype[ prop ].apply( this, arguments );
					},
					_superApply = function( args ) {
						return base.prototype[ prop ].apply( this, args );
					};
				return function() {
					var __super = this._super,
						__superApply = this._superApply,
						returnValue;

					this._super = _super;
					this._superApply = _superApply;

					returnValue = value.apply( this, arguments );

					this._super = __super;
					this._superApply = __superApply;

					return returnValue;
				};
			})();
		}
	});
	constructor.prototype = $.widget.extend( basePrototype, {
		// TODO: remove support for widgetEventPrefix
		// always use the name + a colon as the prefix, e.g., draggable:start
		// don't prefix for widgets that aren't DOM-based
		widgetEventPrefix: existingConstructor ? basePrototype.widgetEventPrefix : name
	}, prototype, {
		constructor: constructor,
		namespace: namespace,
		widgetName: name,
		widgetFullName: fullName
	});

	// If this widget is being redefined then we need to find all widgets that
	// are inheriting from it and redefine all of them so that they inherit from
	// the new version of this widget. We're essentially trying to replace one
	// level in the prototype chain.
	if ( existingConstructor ) {
		$.each( existingConstructor._childConstructors, function( i, child ) {
			var childPrototype = child.prototype;

			// redefine the child widget using the same prototype that was
			// originally used, but inherit from the new version of the base
			$.widget( childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto );
		});
		// remove the list of existing child constructors from the old constructor
		// so the old child constructors can be garbage collected
		delete existingConstructor._childConstructors;
	} else {
		base._childConstructors.push( constructor );
	}

	$.widget.bridge( name, constructor );
};

$.widget.extend = function( target ) {
	var input = slice.call( arguments, 1 ),
		inputIndex = 0,
		inputLength = input.length,
		key,
		value;
	for ( ; inputIndex < inputLength; inputIndex++ ) {
		for ( key in input[ inputIndex ] ) {
			value = input[ inputIndex ][ key ];
			if ( input[ inputIndex ].hasOwnProperty( key ) && value !== undefined ) {
				// Clone objects
				if ( $.isPlainObject( value ) ) {
					target[ key ] = $.isPlainObject( target[ key ] ) ?
						$.widget.extend( {}, target[ key ], value ) :
						// Don't extend strings, arrays, etc. with objects
						$.widget.extend( {}, value );
				// Copy everything else by reference
				} else {
					target[ key ] = value;
				}
			}
		}
	}
	return target;
};

$.widget.bridge = function( name, object ) {
	var fullName = object.prototype.widgetFullName || name;
	$.fn[ name ] = function( options ) {
		var isMethodCall = typeof options === "string",
			args = slice.call( arguments, 1 ),
			returnValue = this;

		// allow multiple hashes to be passed on init
		options = !isMethodCall && args.length ?
			$.widget.extend.apply( null, [ options ].concat(args) ) :
			options;

		if ( isMethodCall ) {
			this.each(function() {
				var methodValue,
					instance = $.data( this, fullName );
				if ( !instance ) {
					return $.error( "cannot call methods on " + name + " prior to initialization; " +
						"attempted to call method '" + options + "'" );
				}
				if ( !$.isFunction( instance[options] ) || options.charAt( 0 ) === "_" ) {
					return $.error( "no such method '" + options + "' for " + name + " widget instance" );
				}
				methodValue = instance[ options ].apply( instance, args );
				if ( methodValue !== instance && methodValue !== undefined ) {
					returnValue = methodValue && methodValue.jquery ?
						returnValue.pushStack( methodValue.get() ) :
						methodValue;
					return false;
				}
			});
		} else {
			this.each(function() {
				var instance = $.data( this, fullName );
				if ( instance ) {
					instance.option( options || {} )._init();
				} else {
					$.data( this, fullName, new object( options, this ) );
				}
			});
		}

		return returnValue;
	};
};

$.Widget = function( /* options, element */ ) {};
$.Widget._childConstructors = [];

$.Widget.prototype = {
	widgetName: "widget",
	widgetEventPrefix: "",
	defaultElement: "<div>",
	options: {
		disabled: false,

		// callbacks
		create: null
	},
	_createWidget: function( options, element ) {
		element = $( element || this.defaultElement || this )[ 0 ];
		this.element = $( element );
		this.uuid = uuid++;
		this.eventNamespace = "." + this.widgetName + this.uuid;
		this.options = $.widget.extend( {},
			this.options,
			this._getCreateOptions(),
			options );

		this.bindings = $();
		this.hoverable = $();
		this.focusable = $();

		if ( element !== this ) {
			$.data( element, this.widgetFullName, this );
			this._on( true, this.element, {
				remove: function( event ) {
					if ( event.target === element ) {
						this.destroy();
					}
				}
			});
			this.document = $( element.style ?
				// element within the document
				element.ownerDocument :
				// element is window or document
				element.document || element );
			this.window = $( this.document[0].defaultView || this.document[0].parentWindow );
		}

		this._create();
		this._trigger( "create", null, this._getCreateEventData() );
		this._init();
	},
	_getCreateOptions: $.noop,
	_getCreateEventData: $.noop,
	_create: $.noop,
	_init: $.noop,

	destroy: function() {
		this._destroy();
		// we can probably remove the unbind calls in 2.0
		// all event bindings should go through this._on()
		this.element
			.unbind( this.eventNamespace )
			// 1.9 BC for #7810
			// TODO remove dual storage
			.removeData( this.widgetName )
			.removeData( this.widgetFullName )
			// support: jquery <1.6.3
			// http://bugs.jquery.com/ticket/9413
			.removeData( $.camelCase( this.widgetFullName ) );
		this.widget()
			.unbind( this.eventNamespace )
			.removeAttr( "aria-disabled" )
			.removeClass(
				this.widgetFullName + "-disabled " +
				"ui-state-disabled" );

		// clean up events and states
		this.bindings.unbind( this.eventNamespace );
		this.hoverable.removeClass( "ui-state-hover" );
		this.focusable.removeClass( "ui-state-focus" );
	},
	_destroy: $.noop,

	widget: function() {
		return this.element;
	},

	option: function( key, value ) {
		var options = key,
			parts,
			curOption,
			i;

		if ( arguments.length === 0 ) {
			// don't return a reference to the internal hash
			return $.widget.extend( {}, this.options );
		}

		if ( typeof key === "string" ) {
			// handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
			options = {};
			parts = key.split( "." );
			key = parts.shift();
			if ( parts.length ) {
				curOption = options[ key ] = $.widget.extend( {}, this.options[ key ] );
				for ( i = 0; i < parts.length - 1; i++ ) {
					curOption[ parts[ i ] ] = curOption[ parts[ i ] ] || {};
					curOption = curOption[ parts[ i ] ];
				}
				key = parts.pop();
				if ( value === undefined ) {
					return curOption[ key ] === undefined ? null : curOption[ key ];
				}
				curOption[ key ] = value;
			} else {
				if ( value === undefined ) {
					return this.options[ key ] === undefined ? null : this.options[ key ];
				}
				options[ key ] = value;
			}
		}

		this._setOptions( options );

		return this;
	},
	_setOptions: function( options ) {
		var key;

		for ( key in options ) {
			this._setOption( key, options[ key ] );
		}

		return this;
	},
	_setOption: function( key, value ) {
		this.options[ key ] = value;

		if ( key === "disabled" ) {
			this.widget()
				.toggleClass( this.widgetFullName + "-disabled ui-state-disabled", !!value )
				.attr( "aria-disabled", value );
			this.hoverable.removeClass( "ui-state-hover" );
			this.focusable.removeClass( "ui-state-focus" );
		}

		return this;
	},

	enable: function() {
		return this._setOption( "disabled", false );
	},
	disable: function() {
		return this._setOption( "disabled", true );
	},

	_on: function( suppressDisabledCheck, element, handlers ) {
		var delegateElement,
			instance = this;

		// no suppressDisabledCheck flag, shuffle arguments
		if ( typeof suppressDisabledCheck !== "boolean" ) {
			handlers = element;
			element = suppressDisabledCheck;
			suppressDisabledCheck = false;
		}

		// no element argument, shuffle and use this.element
		if ( !handlers ) {
			handlers = element;
			element = this.element;
			delegateElement = this.widget();
		} else {
			// accept selectors, DOM elements
			element = delegateElement = $( element );
			this.bindings = this.bindings.add( element );
		}

		$.each( handlers, function( event, handler ) {
			function handlerProxy() {
				// allow widgets to customize the disabled handling
				// - disabled as an array instead of boolean
				// - disabled class as method for disabling individual parts
				if ( !suppressDisabledCheck &&
						( instance.options.disabled === true ||
							$( this ).hasClass( "ui-state-disabled" ) ) ) {
					return;
				}
				return ( typeof handler === "string" ? instance[ handler ] : handler )
					.apply( instance, arguments );
			}

			// copy the guid so direct unbinding works
			if ( typeof handler !== "string" ) {
				handlerProxy.guid = handler.guid =
					handler.guid || handlerProxy.guid || $.guid++;
			}

			var match = event.match( /^(\w+)\s*(.*)$/ ),
				eventName = match[1] + instance.eventNamespace,
				selector = match[2];
			if ( selector ) {
				delegateElement.delegate( selector, eventName, handlerProxy );
			} else {
				element.bind( eventName, handlerProxy );
			}
		});
	},

	_off: function( element, eventName ) {
		eventName = (eventName || "").split( " " ).join( this.eventNamespace + " " ) + this.eventNamespace;
		element.unbind( eventName ).undelegate( eventName );
	},

	_delay: function( handler, delay ) {
		function handlerProxy() {
			return ( typeof handler === "string" ? instance[ handler ] : handler )
				.apply( instance, arguments );
		}
		var instance = this;
		return setTimeout( handlerProxy, delay || 0 );
	},

	_hoverable: function( element ) {
		this.hoverable = this.hoverable.add( element );
		this._on( element, {
			mouseenter: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-hover" );
			},
			mouseleave: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-hover" );
			}
		});
	},

	_focusable: function( element ) {
		this.focusable = this.focusable.add( element );
		this._on( element, {
			focusin: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-focus" );
			},
			focusout: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-focus" );
			}
		});
	},

	_trigger: function( type, event, data ) {
		var prop, orig,
			callback = this.options[ type ];

		data = data || {};
		event = $.Event( event );
		event.type = ( type === this.widgetEventPrefix ?
			type :
			this.widgetEventPrefix + type ).toLowerCase();
		// the original event may come from any element
		// so we need to reset the target on the new event
		event.target = this.element[ 0 ];

		// copy original event properties over to the new event
		orig = event.originalEvent;
		if ( orig ) {
			for ( prop in orig ) {
				if ( !( prop in event ) ) {
					event[ prop ] = orig[ prop ];
				}
			}
		}

		this.element.trigger( event, data );
		return !( $.isFunction( callback ) &&
			callback.apply( this.element[0], [ event ].concat( data ) ) === false ||
			event.isDefaultPrevented() );
	}
};

$.each( { show: "fadeIn", hide: "fadeOut" }, function( method, defaultEffect ) {
	$.Widget.prototype[ "_" + method ] = function( element, options, callback ) {
		if ( typeof options === "string" ) {
			options = { effect: options };
		}
		var hasOptions,
			effectName = !options ?
				method :
				options === true || typeof options === "number" ?
					defaultEffect :
					options.effect || defaultEffect;
		options = options || {};
		if ( typeof options === "number" ) {
			options = { duration: options };
		}
		hasOptions = !$.isEmptyObject( options );
		options.complete = callback;
		if ( options.delay ) {
			element.delay( options.delay );
		}
		if ( hasOptions && $.effects && $.effects.effect[ effectName ] ) {
			element[ method ]( options );
		} else if ( effectName !== method && element[ effectName ] ) {
			element[ effectName ]( options.duration, options.easing, callback );
		} else {
			element.queue(function( next ) {
				$( this )[ method ]();
				if ( callback ) {
					callback.call( element[ 0 ] );
				}
				next();
			});
		}
	};
});

})( jQuery );

(function( $, undefined ) {

$.widget( "mobile.widget", {
	// decorate the parent _createWidget to trigger `widgetinit` for users
	// who wish to do post post `widgetcreate` alterations/additions
	//
	// TODO create a pull request for jquery ui to trigger this event
	// in the original _createWidget
	_createWidget: function() {
		$.Widget.prototype._createWidget.apply( this, arguments );
		this._trigger( 'init' );
	},

	_getCreateOptions: function() {

		var elem = this.element,
			options = {};

		$.each( this.options, function( option ) {

			var value = elem.jqmData( option.replace( /[A-Z]/g, function( c ) {
							return "-" + c.toLowerCase();
						})
					);

			if ( value !== undefined ) {
				options[ option ] = value;
			}
		});

		return options;
	},

	enhanceWithin: function( target, useKeepNative ) {
		this.enhance( $( this.options.initSelector, $( target )), useKeepNative );
	},

	enhance: function( targets, useKeepNative ) {
		var page, keepNative, $widgetElements = $( targets ), self = this;

		// if ignoreContentEnabled is set to true the framework should
		// only enhance the selected elements when they do NOT have a
		// parent with the data-namespace-ignore attribute
		$widgetElements = $.mobile.enhanceable( $widgetElements );

		if ( useKeepNative && $widgetElements.length ) {
			// TODO remove dependency on the page widget for the keepNative.
			// Currently the keepNative value is defined on the page prototype so
			// the method is as well
			page = $.mobile.closestPageData( $widgetElements );
			keepNative = ( page && page.keepNativeSelector()) || "";

			$widgetElements = $widgetElements.not( keepNative );
		}

		$widgetElements[ this.widgetName ]();
	},

	raise: function( msg ) {
		throw "Widget [" + this.widgetName + "]: " + msg;
	}
});

})( jQuery );


(function( $, window ) {
	// DEPRECATED
	// NOTE global mobile object settings
	$.extend( $.mobile, {
		// DEPRECATED Should the text be visble in the loading message?
		loadingMessageTextVisible: undefined,

		// DEPRECATED When the text is visible, what theme does the loading box use?
		loadingMessageTheme: undefined,

		// DEPRECATED default message setting
		loadingMessage: undefined,

		// DEPRECATED
		// Turn on/off page loading message. Theme doubles as an object argument
		// with the following shape: { theme: '', text: '', html: '', textVisible: '' }
		// NOTE that the $.mobile.loading* settings and params past the first are deprecated
		showPageLoadingMsg: function( theme, msgText, textonly ) {
			$.mobile.loading( 'show', theme, msgText, textonly );
		},

		// DEPRECATED
		hidePageLoadingMsg: function() {
			$.mobile.loading( 'hide' );
		},

		loading: function() {
			this.loaderWidget.loader.apply( this.loaderWidget, arguments );
		}
	});

	// TODO move loader class down into the widget settings
	var loaderClass = "ui-loader", $html = $( "html" ), $window = $.mobile.window;

	$.widget( "mobile.loader", {
		// NOTE if the global config settings are defined they will override these
		//      options
		options: {
			// the theme for the loading message
			theme: "a",

			// whether the text in the loading message is shown
			textVisible: false,

			// custom html for the inner content of the loading message
			html: "",

			// the text to be displayed when the popup is shown
			text: "loading"
		},

		defaultHtml: "<div class='" + loaderClass + "'>" +
			"<span class='ui-icon ui-icon-loading'></span>" +
			"<h1></h1>" +
			"</div>",

		// For non-fixed supportin browsers. Position at y center (if scrollTop supported), above the activeBtn (if defined), or just 100px from top
		fakeFixLoader: function() {
			var activeBtn = $( "." + $.mobile.activeBtnClass ).first();

			this.element
				.css({
					top: $.support.scrollTop && $window.scrollTop() + $window.height() / 2 ||
						activeBtn.length && activeBtn.offset().top || 100
				});
		},

		// check position of loader to see if it appears to be "fixed" to center
		// if not, use abs positioning
		checkLoaderPosition: function() {
			var offset = this.element.offset(),
				scrollTop = $window.scrollTop(),
				screenHeight = $.mobile.getScreenHeight();

			if ( offset.top < scrollTop || ( offset.top - scrollTop ) > screenHeight ) {
				this.element.addClass( "ui-loader-fakefix" );
				this.fakeFixLoader();
				$window
					.unbind( "scroll", this.checkLoaderPosition )
					.bind( "scroll", $.proxy( this.fakeFixLoader, this ) );
			}
		},

		resetHtml: function() {
			this.element.html( $( this.defaultHtml ).html() );
		},

		// Turn on/off page loading message. Theme doubles as an object argument
		// with the following shape: { theme: '', text: '', html: '', textVisible: '' }
		// NOTE that the $.mobile.loading* settings and params past the first are deprecated
		// TODO sweet jesus we need to break some of this out
		show: function( theme, msgText, textonly ) {
			var textVisible, message, $header, loadSettings;

			this.resetHtml();

			// use the prototype options so that people can set them globally at
			// mobile init. Consistency, it's what's for dinner
			if ( $.type(theme) === "object" ) {
				loadSettings = $.extend( {}, this.options, theme );

				// prefer object property from the param then the old theme setting
				theme = loadSettings.theme || $.mobile.loadingMessageTheme;
			} else {
				loadSettings = this.options;

				// here we prefer the them value passed as a string argument, then
				// we prefer the global option because we can't use undefined default
				// prototype options, then the prototype option
				theme = theme || $.mobile.loadingMessageTheme || loadSettings.theme;
			}

			// set the message text, prefer the param, then the settings object
			// then loading message
			message = msgText || $.mobile.loadingMessage || loadSettings.text;

			// prepare the dom
			$html.addClass( "ui-loading" );

			if ( $.mobile.loadingMessage !== false || loadSettings.html ) {
				// boolean values require a bit more work :P, supports object properties
				// and old settings
				if ( $.mobile.loadingMessageTextVisible !== undefined ) {
					textVisible = $.mobile.loadingMessageTextVisible;
				} else {
					textVisible = loadSettings.textVisible;
				}

				// add the proper css given the options (theme, text, etc)
				// Force text visibility if the second argument was supplied, or
				// if the text was explicitly set in the object args
				this.element.attr("class", loaderClass +
					" ui-corner-all ui-body-" + theme +
					" ui-loader-" + ( textVisible || msgText || theme.text ? "verbose" : "default" ) +
					( loadSettings.textonly || textonly ? " ui-loader-textonly" : "" ) );

				// TODO verify that jquery.fn.html is ok to use in both cases here
				//      this might be overly defensive in preventing unknowing xss
				// if the html attribute is defined on the loading settings, use that
				// otherwise use the fallbacks from above
				if ( loadSettings.html ) {
					this.element.html( loadSettings.html );
				} else {
					this.element.find( "h1" ).text( message );
				}

				// attach the loader to the DOM
				this.element.appendTo( $.mobile.pageContainer );

				// check that the loader is visible
				this.checkLoaderPosition();

				// on scroll check the loader position
				$window.bind( "scroll", $.proxy( this.checkLoaderPosition, this ) );
			}
		},

		hide: function() {
			$html.removeClass( "ui-loading" );

			if ( $.mobile.loadingMessage ) {
				this.element.removeClass( "ui-loader-fakefix" );
			}

			$.mobile.window.unbind( "scroll", this.fakeFixLoader );
			$.mobile.window.unbind( "scroll", this.checkLoaderPosition );
		}
	});

	$window.bind( 'pagecontainercreate', function() {
		$.mobile.loaderWidget = $.mobile.loaderWidget || $( $.mobile.loader.prototype.defaultHtml ).loader();
	});
})(jQuery, this);


// Script: jQuery hashchange event
// 
// *Version: 1.3, Last updated: 7/21/2010*
// 
// Project Home - http://benalman.com/projects/jquery-hashchange-plugin/
// GitHub       - http://github.com/cowboy/jquery-hashchange/
// Source       - http://github.com/cowboy/jquery-hashchange/raw/master/jquery.ba-hashchange.js
// (Minified)   - http://github.com/cowboy/jquery-hashchange/raw/master/jquery.ba-hashchange.min.js (0.8kb gzipped)
// 
// About: License
// 
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
// 
// About: Examples
// 
// These working examples, complete with fully commented code, illustrate a few
// ways in which this plugin can be used.
// 
// hashchange event - http://benalman.com/code/projects/jquery-hashchange/examples/hashchange/
// document.domain - http://benalman.com/code/projects/jquery-hashchange/examples/document_domain/
// 
// About: Support and Testing
// 
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
// 
// jQuery Versions - 1.2.6, 1.3.2, 1.4.1, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-4, Chrome 5-6, Safari 3.2-5,
//                   Opera 9.6-10.60, iPhone 3.1, Android 1.6-2.2, BlackBerry 4.6-5.
// Unit Tests      - http://benalman.com/code/projects/jquery-hashchange/unit/
// 
// About: Known issues
// 
// While this jQuery hashchange event implementation is quite stable and
// robust, there are a few unfortunate browser bugs surrounding expected
// hashchange event-based behaviors, independent of any JavaScript
// window.onhashchange abstraction. See the following examples for more
// information:
// 
// Chrome: Back Button - http://benalman.com/code/projects/jquery-hashchange/examples/bug-chrome-back-button/
// Firefox: Remote XMLHttpRequest - http://benalman.com/code/projects/jquery-hashchange/examples/bug-firefox-remote-xhr/
// WebKit: Back Button in an Iframe - http://benalman.com/code/projects/jquery-hashchange/examples/bug-webkit-hash-iframe/
// Safari: Back Button from a different domain - http://benalman.com/code/projects/jquery-hashchange/examples/bug-safari-back-from-diff-domain/
// 
// Also note that should a browser natively support the window.onhashchange 
// event, but not report that it does, the fallback polling loop will be used.
// 
// About: Release History
// 
// 1.3   - (7/21/2010) Reorganized IE6/7 Iframe code to make it more
//         "removable" for mobile-only development. Added IE6/7 document.title
//         support. Attempted to make Iframe as hidden as possible by using
//         techniques from http://www.paciellogroup.com/blog/?p=604. Added 
//         support for the "shortcut" format $(window).hashchange( fn ) and
//         $(window).hashchange() like jQuery provides for built-in events.
//         Renamed jQuery.hashchangeDelay to <jQuery.fn.hashchange.delay> and
//         lowered its default value to 50. Added <jQuery.fn.hashchange.domain>
//         and <jQuery.fn.hashchange.src> properties plus document-domain.html
//         file to address access denied issues when setting document.domain in
//         IE6/7.
// 1.2   - (2/11/2010) Fixed a bug where coming back to a page using this plugin
//         from a page on another domain would cause an error in Safari 4. Also,
//         IE6/7 Iframe is now inserted after the body (this actually works),
//         which prevents the page from scrolling when the event is first bound.
//         Event can also now be bound before DOM ready, but it won't be usable
//         before then in IE6/7.
// 1.1   - (1/21/2010) Incorporated document.documentMode test to fix IE8 bug
//         where browser version is incorrectly reported as 8.0, despite
//         inclusion of the X-UA-Compatible IE=EmulateIE7 meta tag.
// 1.0   - (1/9/2010) Initial Release. Broke out the jQuery BBQ event.special
//         window.onhashchange functionality into a separate plugin for users
//         who want just the basic event & back button support, without all the
//         extra awesomeness that BBQ provides. This plugin will be included as
//         part of jQuery BBQ, but also be available separately.

(function( $, window, undefined ) {
  // Reused string.
  var str_hashchange = 'hashchange',
    
    // Method / object references.
    doc = document,
    fake_onhashchange,
    special = $.event.special,
    
    // Does the browser support window.onhashchange? Note that IE8 running in
    // IE7 compatibility mode reports true for 'onhashchange' in window, even
    // though the event isn't supported, so also test document.documentMode.
    doc_mode = doc.documentMode,
    supports_onhashchange = 'on' + str_hashchange in window && ( doc_mode === undefined || doc_mode > 7 );
  
  // Get location.hash (or what you'd expect location.hash to be) sans any
  // leading #. Thanks for making this necessary, Firefox!
  function get_fragment( url ) {
    url = url || location.href;
    return '#' + url.replace( /^[^#]*#?(.*)$/, '$1' );
  };
  
  // Method: jQuery.fn.hashchange
  // 
  // Bind a handler to the window.onhashchange event or trigger all bound
  // window.onhashchange event handlers. This behavior is consistent with
  // jQuery's built-in event handlers.
  // 
  // Usage:
  // 
  // > jQuery(window).hashchange( [ handler ] );
  // 
  // Arguments:
  // 
  //  handler - (Function) Optional handler to be bound to the hashchange
  //    event. This is a "shortcut" for the more verbose form:
  //    jQuery(window).bind( 'hashchange', handler ). If handler is omitted,
  //    all bound window.onhashchange event handlers will be triggered. This
  //    is a shortcut for the more verbose
  //    jQuery(window).trigger( 'hashchange' ). These forms are described in
  //    the <hashchange event> section.
  // 
  // Returns:
  // 
  //  (jQuery) The initial jQuery collection of elements.
  
  // Allow the "shortcut" format $(elem).hashchange( fn ) for binding and
  // $(elem).hashchange() for triggering, like jQuery does for built-in events.
  $.fn[ str_hashchange ] = function( fn ) {
    return fn ? this.bind( str_hashchange, fn ) : this.trigger( str_hashchange );
  };
  
  // Property: jQuery.fn.hashchange.delay
  // 
  // The numeric interval (in milliseconds) at which the <hashchange event>
  // polling loop executes. Defaults to 50.
  
  // Property: jQuery.fn.hashchange.domain
  // 
  // If you're setting document.domain in your JavaScript, and you want hash
  // history to work in IE6/7, not only must this property be set, but you must
  // also set document.domain BEFORE jQuery is loaded into the page. This
  // property is only applicable if you are supporting IE6/7 (or IE8 operating
  // in "IE7 compatibility" mode).
  // 
  // In addition, the <jQuery.fn.hashchange.src> property must be set to the
  // path of the included "document-domain.html" file, which can be renamed or
  // modified if necessary (note that the document.domain specified must be the
  // same in both your main JavaScript as well as in this file).
  // 
  // Usage:
  // 
  // jQuery.fn.hashchange.domain = document.domain;
  
  // Property: jQuery.fn.hashchange.src
  // 
  // If, for some reason, you need to specify an Iframe src file (for example,
  // when setting document.domain as in <jQuery.fn.hashchange.domain>), you can
  // do so using this property. Note that when using this property, history
  // won't be recorded in IE6/7 until the Iframe src file loads. This property
  // is only applicable if you are supporting IE6/7 (or IE8 operating in "IE7
  // compatibility" mode).
  // 
  // Usage:
  // 
  // jQuery.fn.hashchange.src = 'path/to/file.html';
  
  $.fn[ str_hashchange ].delay = 50;
  /*
  $.fn[ str_hashchange ].domain = null;
  $.fn[ str_hashchange ].src = null;
  */
  
  // Event: hashchange event
  // 
  // Fired when location.hash changes. In browsers that support it, the native
  // HTML5 window.onhashchange event is used, otherwise a polling loop is
  // initialized, running every <jQuery.fn.hashchange.delay> milliseconds to
  // see if the hash has changed. In IE6/7 (and IE8 operating in "IE7
  // compatibility" mode), a hidden Iframe is created to allow the back button
  // and hash-based history to work.
  // 
  // Usage as described in <jQuery.fn.hashchange>:
  // 
  // > // Bind an event handler.
  // > jQuery(window).hashchange( function(e) {
  // >   var hash = location.hash;
  // >   ...
  // > });
  // > 
  // > // Manually trigger the event handler.
  // > jQuery(window).hashchange();
  // 
  // A more verbose usage that allows for event namespacing:
  // 
  // > // Bind an event handler.
  // > jQuery(window).bind( 'hashchange', function(e) {
  // >   var hash = location.hash;
  // >   ...
  // > });
  // > 
  // > // Manually trigger the event handler.
  // > jQuery(window).trigger( 'hashchange' );
  // 
  // Additional Notes:
  // 
  // * The polling loop and Iframe are not created until at least one handler
  //   is actually bound to the 'hashchange' event.
  // * If you need the bound handler(s) to execute immediately, in cases where
  //   a location.hash exists on page load, via bookmark or page refresh for
  //   example, use jQuery(window).hashchange() or the more verbose 
  //   jQuery(window).trigger( 'hashchange' ).
  // * The event can be bound before DOM ready, but since it won't be usable
  //   before then in IE6/7 (due to the necessary Iframe), recommended usage is
  //   to bind it inside a DOM ready handler.
  
  // Override existing $.event.special.hashchange methods (allowing this plugin
  // to be defined after jQuery BBQ in BBQ's source code).
  special[ str_hashchange ] = $.extend( special[ str_hashchange ], {
    
    // Called only when the first 'hashchange' event is bound to window.
    setup: function() {
      // If window.onhashchange is supported natively, there's nothing to do..
      if ( supports_onhashchange ) { return false; }
      
      // Otherwise, we need to create our own. And we don't want to call this
      // until the user binds to the event, just in case they never do, since it
      // will create a polling loop and possibly even a hidden Iframe.
      $( fake_onhashchange.start );
    },
    
    // Called only when the last 'hashchange' event is unbound from window.
    teardown: function() {
      // If window.onhashchange is supported natively, there's nothing to do..
      if ( supports_onhashchange ) { return false; }
      
      // Otherwise, we need to stop ours (if possible).
      $( fake_onhashchange.stop );
    }
    
  });
  
  // fake_onhashchange does all the work of triggering the window.onhashchange
  // event for browsers that don't natively support it, including creating a
  // polling loop to watch for hash changes and in IE 6/7 creating a hidden
  // Iframe to enable back and forward.
  fake_onhashchange = (function() {
    var self = {},
      timeout_id,
      
      // Remember the initial hash so it doesn't get triggered immediately.
      last_hash = get_fragment(),
      
      fn_retval = function( val ) { return val; },
      history_set = fn_retval,
      history_get = fn_retval;
    
    // Start the polling loop.
    self.start = function() {
      timeout_id || poll();
    };
    
    // Stop the polling loop.
    self.stop = function() {
      timeout_id && clearTimeout( timeout_id );
      timeout_id = undefined;
    };
    
    // This polling loop checks every $.fn.hashchange.delay milliseconds to see
    // if location.hash has changed, and triggers the 'hashchange' event on
    // window when necessary.
    function poll() {
      var hash = get_fragment(),
        history_hash = history_get( last_hash );
      
      if ( hash !== last_hash ) {
        history_set( last_hash = hash, history_hash );
        
        $(window).trigger( str_hashchange );
        
      } else if ( history_hash !== last_hash ) {
        location.href = location.href.replace( /#.*/, '' ) + history_hash;
      }
      
      timeout_id = setTimeout( poll, $.fn[ str_hashchange ].delay );
    };
    
    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    // vvvvvvvvvvvvvvvvvvv REMOVE IF NOT SUPPORTING IE6/7/8 vvvvvvvvvvvvvvvvvvv
    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    window.attachEvent && !window.addEventListener && !supports_onhashchange && (function() {
      // Not only do IE6/7 need the "magical" Iframe treatment, but so does IE8
      // when running in "IE7 compatibility" mode.
      
      var iframe,
        iframe_src;
      
      // When the event is bound and polling starts in IE 6/7, create a hidden
      // Iframe for history handling.
      self.start = function() {
        if ( !iframe ) {
          iframe_src = $.fn[ str_hashchange ].src;
          iframe_src = iframe_src && iframe_src + get_fragment();
          
          // Create hidden Iframe. Attempt to make Iframe as hidden as possible
          // by using techniques from http://www.paciellogroup.com/blog/?p=604.
          iframe = $('<iframe tabindex="-1" title="empty"/>').hide()
            
            // When Iframe has completely loaded, initialize the history and
            // start polling.
            .one( 'load', function() {
              iframe_src || history_set( get_fragment() );
              poll();
            })
            
            // Load Iframe src if specified, otherwise nothing.
            .attr( 'src', iframe_src || 'javascript:0' )
            
            // Append Iframe after the end of the body to prevent unnecessary
            // initial page scrolling (yes, this works).
            .insertAfter( 'body' )[0].contentWindow;
          
          // Whenever `document.title` changes, update the Iframe's title to
          // prettify the back/next history menu entries. Since IE sometimes
          // errors with "Unspecified error" the very first time this is set
          // (yes, very useful) wrap this with a try/catch block.
          doc.onpropertychange = function() {
            try {
              if ( event.propertyName === 'title' ) {
                iframe.document.title = doc.title;
              }
            } catch(e) {}
          };
          
        }
      };
      
      // Override the "stop" method since an IE6/7 Iframe was created. Even
      // if there are no longer any bound event handlers, the polling loop
      // is still necessary for back/next to work at all!
      self.stop = fn_retval;
      
      // Get history by looking at the hidden Iframe's location.hash.
      history_get = function() {
        return get_fragment( iframe.location.href );
      };
      
      // Set a new history item by opening and then closing the Iframe
      // document, *then* setting its location.hash. If document.domain has
      // been set, update that as well.
      history_set = function( hash, history_hash ) {
        var iframe_doc = iframe.document,
          domain = $.fn[ str_hashchange ].domain;
        
        if ( hash !== history_hash ) {
          // Update Iframe with any initial `document.title` that might be set.
          iframe_doc.title = doc.title;
          
          // Opening the Iframe's document after it has been closed is what
          // actually adds a history entry.
          iframe_doc.open();
          
          // Set document.domain for the Iframe document as well, if necessary.
          domain && iframe_doc.write( '<script>document.domain="' + domain + '"</script>' );
          
          iframe_doc.close();
          
          // Update the Iframe's hash, for great justice.
          iframe.location.hash = hash;
        }
      };
      
    })();
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // ^^^^^^^^^^^^^^^^^^^ REMOVE IF NOT SUPPORTING IE6/7/8 ^^^^^^^^^^^^^^^^^^^
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    
    return self;
  })();
  
})(jQuery,this);

(function( $, undefined ) {

	/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */
	window.matchMedia = window.matchMedia || (function( doc, undefined ) {

		

		var bool,
			docElem = doc.documentElement,
			refNode = docElem.firstElementChild || docElem.firstChild,
			// fakeBody required for <FF4 when executed in <head>
			fakeBody = doc.createElement( "body" ),
			div = doc.createElement( "div" );

		div.id = "mq-test-1";
		div.style.cssText = "position:absolute;top:-100em";
		fakeBody.style.background = "none";
		fakeBody.appendChild(div);

		return function(q){

			div.innerHTML = "&shy;<style media=\"" + q + "\"> #mq-test-1 { width: 42px; }</style>";

			docElem.insertBefore( fakeBody, refNode );
			bool = div.offsetWidth === 42;
			docElem.removeChild( fakeBody );

			return {
				matches: bool,
				media: q
			};

		};

	}( document ));

	// $.mobile.media uses matchMedia to return a boolean.
	$.mobile.media = function( q ) {
		return window.matchMedia( q ).matches;
	};

})(jQuery);

	(function( $, undefined ) {
		var support = {
			touch: "ontouchend" in document
		};

		$.mobile.support = $.mobile.support || {};
		$.extend( $.support, support );
		$.extend( $.mobile.support, support );
	}( jQuery ));

	(function( $, undefined ) {
		$.extend( $.support, {
			orientation: "orientation" in window && "onorientationchange" in window
		});
	}( jQuery ));

(function( $, undefined ) {

// thx Modernizr
function propExists( prop ) {
	var uc_prop = prop.charAt( 0 ).toUpperCase() + prop.substr( 1 ),
		props = ( prop + " " + vendors.join( uc_prop + " " ) + uc_prop ).split( " " );

	for ( var v in props ) {
		if ( fbCSS[ props[ v ] ] !== undefined ) {
			return true;
		}
	}
}

var fakeBody = $( "<body>" ).prependTo( "html" ),
	fbCSS = fakeBody[ 0 ].style,
	vendors = [ "Webkit", "Moz", "O" ],
	webos = "palmGetResource" in window, //only used to rule out scrollTop
	opera = window.opera,
	operamini = window.operamini && ({}).toString.call( window.operamini ) === "[object OperaMini]",
	bb = window.blackberry && !propExists( "-webkit-transform" ); //only used to rule out box shadow, as it's filled opaque on BB 5 and lower


function validStyle( prop, value, check_vend ) {
	var div = document.createElement( 'div' ),
		uc = function( txt ) {
			return txt.charAt( 0 ).toUpperCase() + txt.substr( 1 );
		},
		vend_pref = function( vend ) {
			if( vend === "" ) {
				return "";
			} else {
				return  "-" + vend.charAt( 0 ).toLowerCase() + vend.substr( 1 ) + "-";
			}
		},
		check_style = function( vend ) {
			var vend_prop = vend_pref( vend ) + prop + ": " + value + ";",
				uc_vend = uc( vend ),
				propStyle = uc_vend + ( uc_vend === "" ? prop : uc( prop ) );

			div.setAttribute( "style", vend_prop );

			if ( !!div.style[ propStyle ] ) {
				ret = true;
			}
		},
		check_vends = check_vend ? check_vend : vendors,
		ret;

	for( var i = 0; i < check_vends.length; i++ ) {
		check_style( check_vends[i] );
	}
	return !!ret;
}

function transform3dTest() {
	var mqProp = "transform-3d",
		// Because the `translate3d` test below throws false positives in Android:
		ret = $.mobile.media( "(-" + vendors.join( "-" + mqProp + "),(-" ) + "-" + mqProp + "),(" + mqProp + ")" );

	if( ret ) {
		return !!ret;
	}

	var el = document.createElement( "div" ),
		transforms = {
			// We’re omitting Opera for the time being; MS uses unprefixed.
			'MozTransform':'-moz-transform',
			'transform':'transform'
		};

	fakeBody.append( el );

	for ( var t in transforms ) {
		if( el.style[ t ] !== undefined ){
			el.style[ t ] = 'translate3d( 100px, 1px, 1px )';
			ret = window.getComputedStyle( el ).getPropertyValue( transforms[ t ] );
		}
	}
	return ( !!ret && ret !== "none" );
}

// Test for dynamic-updating base tag support ( allows us to avoid href,src attr rewriting )
function baseTagTest() {
	var fauxBase = location.protocol + "//" + location.host + location.pathname + "ui-dir/",
		base = $( "head base" ),
		fauxEle = null,
		href = "",
		link, rebase;

	if ( !base.length ) {
		base = fauxEle = $( "<base>", { "href": fauxBase }).appendTo( "head" );
	} else {
		href = base.attr( "href" );
	}

	link = $( "<a href='testurl' />" ).prependTo( fakeBody );
	rebase = link[ 0 ].href;
	base[ 0 ].href = href || location.pathname;

	if ( fauxEle ) {
		fauxEle.remove();
	}
	return rebase.indexOf( fauxBase ) === 0;
}

// Thanks Modernizr
function cssPointerEventsTest() {
	var element = document.createElement( 'x' ),
		documentElement = document.documentElement,
		getComputedStyle = window.getComputedStyle,
		supports;

	if ( !( 'pointerEvents' in element.style ) ) {
		return false;
	}

	element.style.pointerEvents = 'auto';
	element.style.pointerEvents = 'x';
	documentElement.appendChild( element );
	supports = getComputedStyle &&
	getComputedStyle( element, '' ).pointerEvents === 'auto';
	documentElement.removeChild( element );
	return !!supports;
}

function boundingRect() {
	var div = document.createElement( "div" );
	return typeof div.getBoundingClientRect !== "undefined";
}

// non-UA-based IE version check by James Padolsey, modified by jdalton - from http://gist.github.com/527683
// allows for inclusion of IE 6+, including Windows Mobile 7
$.extend( $.mobile, { browser: {} } );
$.mobile.browser.oldIE = (function() {
	var v = 3,
		div = document.createElement( "div" ),
		a = div.all || [];

	do {
		div.innerHTML = "<!--[if gt IE " + ( ++v ) + "]><br><![endif]-->";
	} while( a[0] );

	return v > 4 ? v : !v;
})();

function fixedPosition() {
	var w = window,
		ua = navigator.userAgent,
		platform = navigator.platform,
		// Rendering engine is Webkit, and capture major version
		wkmatch = ua.match( /AppleWebKit\/([0-9]+)/ ),
		wkversion = !!wkmatch && wkmatch[ 1 ],
		ffmatch = ua.match( /Fennec\/([0-9]+)/ ),
		ffversion = !!ffmatch && ffmatch[ 1 ],
		operammobilematch = ua.match( /Opera Mobi\/([0-9]+)/ ),
		omversion = !!operammobilematch && operammobilematch[ 1 ];

	if(
		// iOS 4.3 and older : Platform is iPhone/Pad/Touch and Webkit version is less than 534 (ios5)
		( ( platform.indexOf( "iPhone" ) > -1 || platform.indexOf( "iPad" ) > -1  || platform.indexOf( "iPod" ) > -1 ) && wkversion && wkversion < 534 ) ||
		// Opera Mini
		( w.operamini && ({}).toString.call( w.operamini ) === "[object OperaMini]" ) ||
		( operammobilematch && omversion < 7458 )	||
		//Android lte 2.1: Platform is Android and Webkit version is less than 533 (Android 2.2)
		( ua.indexOf( "Android" ) > -1 && wkversion && wkversion < 533 ) ||
		// Firefox Mobile before 6.0 -
		( ffversion && ffversion < 6 ) ||
		// WebOS less than 3
		( "palmGetResource" in window && wkversion && wkversion < 534 )	||
		// MeeGo
		( ua.indexOf( "MeeGo" ) > -1 && ua.indexOf( "NokiaBrowser/8.5.0" ) > -1 ) ) {
		return false;
	}

	return true;
}

$.extend( $.support, {
	cssTransitions: "WebKitTransitionEvent" in window ||
		validStyle( 'transition', 'height 100ms linear', [ "Webkit", "Moz", "" ] ) &&
		!$.mobile.browser.oldIE && !opera,

	// Note, Chrome for iOS has an extremely quirky implementation of popstate.
	// We've chosen to take the shortest path to a bug fix here for issue #5426
	// See the following link for information about the regex chosen
	// https://developers.google.com/chrome/mobile/docs/user-agent#chrome_for_ios_user-agent
	pushState: "pushState" in history &&
		"replaceState" in history &&
		// When running inside a FF iframe, calling replaceState causes an error
		!( window.navigator.userAgent.indexOf( "Firefox" ) >= 0 && window.top !== window ) &&
		( window.navigator.userAgent.search(/CriOS/) === -1 ),

	mediaquery: $.mobile.media( "only all" ),
	cssPseudoElement: !!propExists( "content" ),
	touchOverflow: !!propExists( "overflowScrolling" ),
	cssTransform3d: transform3dTest(),
	boxShadow: !!propExists( "boxShadow" ) && !bb,
	fixedPosition: fixedPosition(),
	scrollTop: ("pageXOffset" in window ||
		"scrollTop" in document.documentElement ||
		"scrollTop" in fakeBody[ 0 ]) && !webos && !operamini,

	dynamicBaseTag: baseTagTest(),
	cssPointerEvents: cssPointerEventsTest(),
	boundingRect: boundingRect()
});

fakeBody.remove();


// $.mobile.ajaxBlacklist is used to override ajaxEnabled on platforms that have known conflicts with hash history updates (BB5, Symbian)
// or that generally work better browsing in regular http for full page refreshes (Opera Mini)
// Note: This detection below is used as a last resort.
// We recommend only using these detection methods when all other more reliable/forward-looking approaches are not possible
var nokiaLTE7_3 = (function() {

	var ua = window.navigator.userAgent;

	//The following is an attempt to match Nokia browsers that are running Symbian/s60, with webkit, version 7.3 or older
	return ua.indexOf( "Nokia" ) > -1 &&
			( ua.indexOf( "Symbian/3" ) > -1 || ua.indexOf( "Series60/5" ) > -1 ) &&
			ua.indexOf( "AppleWebKit" ) > -1 &&
			ua.match( /(BrowserNG|NokiaBrowser)\/7\.[0-3]/ );
})();

// Support conditions that must be met in order to proceed
// default enhanced qualifications are media query support OR IE 7+

$.mobile.gradeA = function() {
	return ( $.support.mediaquery || $.mobile.browser.oldIE && $.mobile.browser.oldIE >= 7 ) && ( $.support.boundingRect || $.fn.jquery.match(/1\.[0-7+]\.[0-9+]?/) !== null );
};

$.mobile.ajaxBlacklist =
			// BlackBerry browsers, pre-webkit
			window.blackberry && !window.WebKitPoint ||
			// Opera Mini
			operamini ||
			// Symbian webkits pre 7.3
			nokiaLTE7_3;

// Lastly, this workaround is the only way we've found so far to get pre 7.3 Symbian webkit devices
// to render the stylesheets when they're referenced before this script, as we'd recommend doing.
// This simply reappends the CSS in place, which for some reason makes it apply
if ( nokiaLTE7_3 ) {
	$(function() {
		$( "head link[rel='stylesheet']" ).attr( "rel", "alternate stylesheet" ).attr( "rel", "stylesheet" );
	});
}

// For ruling out shadows via css
if ( !$.support.boxShadow ) {
	$( "html" ).addClass( "ui-mobile-nosupport-boxshadow" );
}

})( jQuery );


(function( $, undefined ) {
	var $win = $.mobile.window, self, history;

	$.event.special.navigate = self = {
		bound: false,

		pushStateEnabled: true,

		originalEventName: undefined,

		// If pushstate support is present and push state support is defined to
		// be true on the mobile namespace.
		isPushStateEnabled: function() {
			return $.support.pushState &&
				$.mobile.pushStateEnabled === true &&
				this.isHashChangeEnabled();
		},

		// !! assumes mobile namespace is present
		isHashChangeEnabled: function() {
			return $.mobile.hashListeningEnabled === true;
		},

		// TODO a lot of duplication between popstate and hashchange
		popstate: function( event ) {
			var newEvent = new $.Event( "navigate" ),
				beforeNavigate = new $.Event( "beforenavigate" ),
				state = event.originalEvent.state || {},
				href = location.href;

			$win.trigger( beforeNavigate );

			if( beforeNavigate.isDefaultPrevented() ){
				return;
			}

			if( event.historyState ){
				$.extend(state, event.historyState);
			}

			// Make sure the original event is tracked for the end
			// user to inspect incase they want to do something special
			newEvent.originalEvent = event;

			// NOTE we let the current stack unwind because any assignment to
			//      location.hash will stop the world and run this event handler. By
			//      doing this we create a similar behavior to hashchange on hash
			//      assignment
			setTimeout(function() {
				$win.trigger( newEvent, {
					state: state
				});
			}, 0);
		},

		hashchange: function( event, data ) {
			var newEvent = new $.Event( "navigate" ),
				beforeNavigate = new $.Event( "beforenavigate" );

			$win.trigger( beforeNavigate );

			if( beforeNavigate.isDefaultPrevented() ){
				return;
			}

			// Make sure the original event is tracked for the end
			// user to inspect incase they want to do something special
			newEvent.originalEvent = event;

			// Trigger the hashchange with state provided by the user
			// that altered the hash
			$win.trigger( newEvent, {
				// Users that want to fully normalize the two events
				// will need to do history management down the stack and
				// add the state to the event before this binding is fired
				// TODO consider allowing for the explicit addition of callbacks
				//      to be fired before this value is set to avoid event timing issues
				state: event.hashchangeState || {}
			});
		},

		// TODO We really only want to set this up once
		//      but I'm not clear if there's a beter way to achieve
		//      this with the jQuery special event structure
		setup: function( data, namespaces ) {
			if( self.bound ) {
				return;
			}

			self.bound = true;

			if( self.isPushStateEnabled() ) {
				self.originalEventName = "popstate";
				$win.bind( "popstate.navigate", self.popstate );
			} else if ( self.isHashChangeEnabled() ){
				self.originalEventName = "hashchange";
				$win.bind( "hashchange.navigate", self.hashchange );
			}
		}
	};
})( jQuery );



(function( $, undefined ) {
		var path, documentBase, $base, dialogHashKey = "&ui-state=dialog";

		$.mobile.path = path = {
			uiStateKey: "&ui-state",

			// This scary looking regular expression parses an absolute URL or its relative
			// variants (protocol, site, document, query, and hash), into the various
			// components (protocol, host, path, query, fragment, etc that make up the
			// URL as well as some other commonly used sub-parts. When used with RegExp.exec()
			// or String.match, it parses the URL into a results array that looks like this:
			//
			//     [0]: http://jblas:password@mycompany.com:8080/mail/inbox?msg=1234&type=unread#msg-content
			//     [1]: http://jblas:password@mycompany.com:8080/mail/inbox?msg=1234&type=unread
			//     [2]: http://jblas:password@mycompany.com:8080/mail/inbox
			//     [3]: http://jblas:password@mycompany.com:8080
			//     [4]: http:
			//     [5]: //
			//     [6]: jblas:password@mycompany.com:8080
			//     [7]: jblas:password
			//     [8]: jblas
			//     [9]: password
			//    [10]: mycompany.com:8080
			//    [11]: mycompany.com
			//    [12]: 8080
			//    [13]: /mail/inbox
			//    [14]: /mail/
			//    [15]: inbox
			//    [16]: ?msg=1234&type=unread
			//    [17]: #msg-content
			//
			urlParseRE: /^\s*(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/,

			// Abstraction to address xss (Issue #4787) by removing the authority in
			// browsers that auto	decode it. All references to location.href should be
			// replaced with a call to this method so that it can be dealt with properly here
			getLocation: function( url ) {
				var uri = url ? this.parseUrl( url ) : location,
					hash = this.parseUrl( url || location.href ).hash;

				// mimic the browser with an empty string when the hash is empty
				hash = hash === "#" ? "" : hash;

				// Make sure to parse the url or the location object for the hash because using location.hash
				// is autodecoded in firefox, the rest of the url should be from the object (location unless
				// we're testing) to avoid the inclusion of the authority
				return uri.protocol + "//" + uri.host + uri.pathname + uri.search + hash;
			},

			parseLocation: function() {
				return this.parseUrl( this.getLocation() );
			},

			//Parse a URL into a structure that allows easy access to
			//all of the URL components by name.
			parseUrl: function( url ) {
				// If we're passed an object, we'll assume that it is
				// a parsed url object and just return it back to the caller.
				if ( $.type( url ) === "object" ) {
					return url;
				}

				var matches = path.urlParseRE.exec( url || "" ) || [];

					// Create an object that allows the caller to access the sub-matches
					// by name. Note that IE returns an empty string instead of undefined,
					// like all other browsers do, so we normalize everything so its consistent
					// no matter what browser we're running on.
					return {
						href:         matches[  0 ] || "",
						hrefNoHash:   matches[  1 ] || "",
						hrefNoSearch: matches[  2 ] || "",
						domain:       matches[  3 ] || "",
						protocol:     matches[  4 ] || "",
						doubleSlash:  matches[  5 ] || "",
						authority:    matches[  6 ] || "",
						username:     matches[  8 ] || "",
						password:     matches[  9 ] || "",
						host:         matches[ 10 ] || "",
						hostname:     matches[ 11 ] || "",
						port:         matches[ 12 ] || "",
						pathname:     matches[ 13 ] || "",
						directory:    matches[ 14 ] || "",
						filename:     matches[ 15 ] || "",
						search:       matches[ 16 ] || "",
						hash:         matches[ 17 ] || ""
					};
			},

			//Turn relPath into an asbolute path. absPath is
			//an optional absolute path which describes what
			//relPath is relative to.
			makePathAbsolute: function( relPath, absPath ) {
				if ( relPath && relPath.charAt( 0 ) === "/" ) {
					return relPath;
				}

				relPath = relPath || "";
				absPath = absPath ? absPath.replace( /^\/|(\/[^\/]*|[^\/]+)$/g, "" ) : "";

				var absStack = absPath ? absPath.split( "/" ) : [],
					relStack = relPath.split( "/" );
				for ( var i = 0; i < relStack.length; i++ ) {
					var d = relStack[ i ];
					switch ( d ) {
						case ".":
							break;
						case "..":
							if ( absStack.length ) {
								absStack.pop();
							}
							break;
						default:
							absStack.push( d );
							break;
					}
				}
				return "/" + absStack.join( "/" );
			},

			//Returns true if both urls have the same domain.
			isSameDomain: function( absUrl1, absUrl2 ) {
				return path.parseUrl( absUrl1 ).domain === path.parseUrl( absUrl2 ).domain;
			},

			//Returns true for any relative variant.
			isRelativeUrl: function( url ) {
				// All relative Url variants have one thing in common, no protocol.
				return path.parseUrl( url ).protocol === "";
			},

			//Returns true for an absolute url.
			isAbsoluteUrl: function( url ) {
				return path.parseUrl( url ).protocol !== "";
			},

			//Turn the specified realtive URL into an absolute one. This function
			//can handle all relative variants (protocol, site, document, query, fragment).
			makeUrlAbsolute: function( relUrl, absUrl ) {
				if ( !path.isRelativeUrl( relUrl ) ) {
					return relUrl;
				}

				if ( absUrl === undefined ) {
					absUrl = this.documentBase;
				}

				var relObj = path.parseUrl( relUrl ),
					absObj = path.parseUrl( absUrl ),
					protocol = relObj.protocol || absObj.protocol,
					doubleSlash = relObj.protocol ? relObj.doubleSlash : ( relObj.doubleSlash || absObj.doubleSlash ),
					authority = relObj.authority || absObj.authority,
					hasPath = relObj.pathname !== "",
					pathname = path.makePathAbsolute( relObj.pathname || absObj.filename, absObj.pathname ),
					search = relObj.search || ( !hasPath && absObj.search ) || "",
					hash = relObj.hash;

				return protocol + doubleSlash + authority + pathname + search + hash;
			},

			//Add search (aka query) params to the specified url.
			addSearchParams: function( url, params ) {
				var u = path.parseUrl( url ),
					p = ( typeof params === "object" ) ? $.param( params ) : params,
					s = u.search || "?";
				return u.hrefNoSearch + s + ( s.charAt( s.length - 1 ) !== "?" ? "&" : "" ) + p + ( u.hash || "" );
			},

			convertUrlToDataUrl: function( absUrl ) {
				var u = path.parseUrl( absUrl );
				if ( path.isEmbeddedPage( u ) ) {
					// For embedded pages, remove the dialog hash key as in getFilePath(),
					// and remove otherwise the Data Url won't match the id of the embedded Page.
					return u.hash
						.split( dialogHashKey )[0]
						.replace( /^#/, "" )
						.replace( /\?.*$/, "" );
				} else if ( path.isSameDomain( u, this.documentBase ) ) {
					return u.hrefNoHash.replace( this.documentBase.domain, "" ).split( dialogHashKey )[0];
				}

				return window.decodeURIComponent(absUrl);
			},

			//get path from current hash, or from a file path
			get: function( newPath ) {
				if ( newPath === undefined ) {
					newPath = path.parseLocation().hash;
				}
				return path.stripHash( newPath ).replace( /[^\/]*\.[^\/*]+$/, '' );
			},

			//set location hash to path
			set: function( path ) {
				location.hash = path;
			},

			//test if a given url (string) is a path
			//NOTE might be exceptionally naive
			isPath: function( url ) {
				return ( /\// ).test( url );
			},

			//return a url path with the window's location protocol/hostname/pathname removed
			clean: function( url ) {
				return url.replace( this.documentBase.domain, "" );
			},

			//just return the url without an initial #
			stripHash: function( url ) {
				return url.replace( /^#/, "" );
			},

			stripQueryParams: function( url ) {
				return url.replace( /\?.*$/, "" );
			},

			//remove the preceding hash, any query params, and dialog notations
			cleanHash: function( hash ) {
				return path.stripHash( hash.replace( /\?.*$/, "" ).replace( dialogHashKey, "" ) );
			},

			isHashValid: function( hash ) {
				return ( /^#[^#]+$/ ).test( hash );
			},

			//check whether a url is referencing the same domain, or an external domain or different protocol
			//could be mailto, etc
			isExternal: function( url ) {
				var u = path.parseUrl( url );
				return u.protocol && u.domain !== this.documentUrl.domain ? true : false;
			},

			hasProtocol: function( url ) {
				return ( /^(:?\w+:)/ ).test( url );
			},

			isEmbeddedPage: function( url ) {
				var u = path.parseUrl( url );

				//if the path is absolute, then we need to compare the url against
				//both the this.documentUrl and the documentBase. The main reason for this
				//is that links embedded within external documents will refer to the
				//application document, whereas links embedded within the application
				//document will be resolved against the document base.
				if ( u.protocol !== "" ) {
					return ( !this.isPath(u.hash) && u.hash && ( u.hrefNoHash === this.documentUrl.hrefNoHash || ( this.documentBaseDiffers && u.hrefNoHash === this.documentBase.hrefNoHash ) ) );
				}
				return ( /^#/ ).test( u.href );
			},

			squash: function( url, resolutionUrl ) {
				var state, href, cleanedUrl, search, stateIndex,
					isPath = this.isPath( url ),
					uri = this.parseUrl( url ),
					preservedHash = uri.hash,
					uiState = "";

				// produce a url against which we can resole the provided path
				resolutionUrl = resolutionUrl || (path.isPath(url) ? path.getLocation() : path.getDocumentUrl());

				// If the url is anything but a simple string, remove any preceding hash
				// eg #foo/bar -> foo/bar
				//    #foo -> #foo
				cleanedUrl = isPath ? path.stripHash( url ) : url;

				// If the url is a full url with a hash check if the parsed hash is a path
				// if it is, strip the #, and use it otherwise continue without change
				cleanedUrl = path.isPath( uri.hash ) ? path.stripHash( uri.hash ) : cleanedUrl;

				// Split the UI State keys off the href
				stateIndex = cleanedUrl.indexOf( this.uiStateKey );

				// store the ui state keys for use
				if( stateIndex > -1 ){
					uiState = cleanedUrl.slice( stateIndex );
					cleanedUrl = cleanedUrl.slice( 0, stateIndex );
				}

				// make the cleanedUrl absolute relative to the resolution url
				href = path.makeUrlAbsolute( cleanedUrl, resolutionUrl );

				// grab the search from the resolved url since parsing from
				// the passed url may not yield the correct result
				search = this.parseUrl( href ).search;

				// TODO all this crap is terrible, clean it up
				if ( isPath ) {
					// reject the hash if it's a path or it's just a dialog key
					if( path.isPath( preservedHash ) || preservedHash.replace("#", "").indexOf( this.uiStateKey ) === 0) {
						preservedHash = "";
					}

					// Append the UI State keys where it exists and it's been removed
					// from the url
					if( uiState && preservedHash.indexOf( this.uiStateKey ) === -1){
						preservedHash += uiState;
					}

					// make sure that pound is on the front of the hash
					if( preservedHash.indexOf( "#" ) === -1 && preservedHash !== "" ){
						preservedHash = "#" + preservedHash;
					}

					// reconstruct each of the pieces with the new search string and hash
					href = path.parseUrl( href );
					href = href.protocol + "//" + href.host + href.pathname + search + preservedHash;
				} else {
					href += href.indexOf( "#" ) > -1 ? uiState : "#" + uiState;
				}

				return href;
			},

			isPreservableHash: function( hash ) {
				return hash.replace( "#", "" ).indexOf( this.uiStateKey ) === 0;
			}
		};

		path.documentUrl = path.parseLocation();

		$base = $( "head" ).find( "base" );

		path.documentBase = $base.length ?
			path.parseUrl( path.makeUrlAbsolute( $base.attr( "href" ), path.documentUrl.href ) ) :
			path.documentUrl;

		path.documentBaseDiffers = (path.documentUrl.hrefNoHash !== path.documentBase.hrefNoHash);

		//return the original document url
		path.getDocumentUrl = function( asParsedObject ) {
			return asParsedObject ? $.extend( {}, path.documentUrl ) : path.documentUrl.href;
		};

		//return the original document base url
		path.getDocumentBase = function( asParsedObject ) {
			return asParsedObject ? $.extend( {}, path.documentBase ) : path.documentBase.href;
		};
})( jQuery );



(function( $, undefined ) {
	var path = $.mobile.path;

	$.mobile.History = function( stack, index ) {
		this.stack = stack || [];
		this.activeIndex = index || 0;
	};

	$.extend($.mobile.History.prototype, {
		getActive: function() {
			return this.stack[ this.activeIndex ];
		},

		getLast: function() {
			return this.stack[ this.previousIndex ];
		},

		getNext: function() {
			return this.stack[ this.activeIndex + 1 ];
		},

		getPrev: function() {
			return this.stack[ this.activeIndex - 1 ];
		},

		// addNew is used whenever a new page is added
		add: function( url, data ){
			data = data || {};

			//if there's forward history, wipe it
			if ( this.getNext() ) {
				this.clearForward();
			}

			// if the hash is included in the data make sure the shape
			// is consistent for comparison
			if( data.hash && data.hash.indexOf( "#" ) === -1) {
				data.hash = "#" + data.hash;
			}

			data.url = url;
			this.stack.push( data );
			this.activeIndex = this.stack.length - 1;
		},

		//wipe urls ahead of active index
		clearForward: function() {
			this.stack = this.stack.slice( 0, this.activeIndex + 1 );
		},

		find: function( url, stack, earlyReturn ) {
			stack = stack || this.stack;

			var entry, i, length = stack.length, index;

			for ( i = 0; i < length; i++ ) {
				entry = stack[i];

				if ( decodeURIComponent(url) === decodeURIComponent(entry.url) ||
					decodeURIComponent(url) === decodeURIComponent(entry.hash) ) {
					index = i;

					if( earlyReturn ) {
						return index;
					}
				}
			}

			return index;
		},

		closest: function( url ) {
			var closest, a = this.activeIndex;

			// First, take the slice of the history stack before the current index and search
			// for a url match. If one is found, we'll avoid avoid looking through forward history
			// NOTE the preference for backward history movement is driven by the fact that
			//      most mobile browsers only have a dedicated back button, and users rarely use
			//      the forward button in desktop browser anyhow
			closest = this.find( url, this.stack.slice(0, a) );

			// If nothing was found in backward history check forward. The `true`
			// value passed as the third parameter causes the find method to break
			// on the first match in the forward history slice. The starting index
			// of the slice must then be added to the result to get the element index
			// in the original history stack :( :(
			//
			// TODO this is hyper confusing and should be cleaned up (ugh so bad)
			if( closest === undefined ) {
				closest = this.find( url, this.stack.slice(a), true );
				closest = closest === undefined ? closest : closest + a;
			}

			return closest;
		},

		direct: function( opts ) {
			var newActiveIndex = this.closest( opts.url ), a = this.activeIndex;

			// save new page index, null check to prevent falsey 0 result
			// record the previous index for reference
			if( newActiveIndex !== undefined ) {
				this.activeIndex = newActiveIndex;
				this.previousIndex = a;
			}

			// invoke callbacks where appropriate
			//
			// TODO this is also convoluted and confusing
			if ( newActiveIndex < a ) {
				( opts.present || opts.back || $.noop )( this.getActive(), 'back' );
			} else if ( newActiveIndex > a ) {
				( opts.present || opts.forward || $.noop )( this.getActive(), 'forward' );
			} else if ( newActiveIndex === undefined && opts.missing ){
				opts.missing( this.getActive() );
			}
		}
	});
})( jQuery );


(function( $, undefined ) {
	var path = $.mobile.path,
		initialHref = location.href;

	$.mobile.Navigator = function( history ) {
		this.history = history;
		this.ignoreInitialHashChange = true;

		$.mobile.window.bind({
			"popstate.history": $.proxy( this.popstate, this ),
			"hashchange.history": $.proxy( this.hashchange, this )
		});
	};

	$.extend($.mobile.Navigator.prototype, {
		squash: function( url, data ) {
			var state, href, hash = path.isPath(url) ? path.stripHash(url) : url;

			href = path.squash( url );

			// make sure to provide this information when it isn't explicitly set in the
			// data object that was passed to the squash method
			state = $.extend({
				hash: hash,
				url: href
			}, data);

			// replace the current url with the new href and store the state
			// Note that in some cases we might be replacing an url with the
			// same url. We do this anyways because we need to make sure that
			// all of our history entries have a state object associated with
			// them. This allows us to work around the case where $.mobile.back()
			// is called to transition from an external page to an embedded page.
			// In that particular case, a hashchange event is *NOT* generated by the browser.
			// Ensuring each history entry has a state object means that onPopState()
			// will always trigger our hashchange callback even when a hashchange event
			// is not fired.
			window.history.replaceState( state, state.title || document.title, href );

			return state;
		},

		hash: function( url, href ) {
			var parsed, loc, hash;

			// Grab the hash for recording. If the passed url is a path
			// we used the parsed version of the squashed url to reconstruct,
			// otherwise we assume it's a hash and store it directly
			parsed = path.parseUrl( url );
			loc = path.parseLocation();

			if( loc.pathname + loc.search === parsed.pathname + parsed.search ) {
				// If the pathname and search of the passed url is identical to the current loc
				// then we must use the hash. Otherwise there will be no event
				// eg, url = "/foo/bar?baz#bang", location.href = "http://example.com/foo/bar?baz"
				hash = parsed.hash ? parsed.hash : parsed.pathname + parsed.search;
			} else if ( path.isPath(url) ) {
				var resolved = path.parseUrl( href );
				// If the passed url is a path, make it domain relative and remove any trailing hash
				hash = resolved.pathname + resolved.search + (path.isPreservableHash( resolved.hash )? resolved.hash.replace( "#", "" ) : "");
			} else {
				hash = url;
			}

			return hash;
		},

		// TODO reconsider name
		go: function( url, data, noEvents ) {
			var state, href, hash, popstateEvent,
				isPopStateEvent = $.event.special.navigate.isPushStateEnabled();

			// Get the url as it would look squashed on to the current resolution url
			href = path.squash( url );

			// sort out what the hash sould be from the url
			hash = this.hash( url, href );

			// Here we prevent the next hash change or popstate event from doing any
			// history management. In the case of hashchange we don't swallow it
			// if there will be no hashchange fired (since that won't reset the value)
			// and will swallow the following hashchange
			if( noEvents && hash !== path.stripHash(path.parseLocation().hash) ) {
				this.preventNextHashChange = noEvents;
			}

			// IMPORTANT in the case where popstate is supported the event will be triggered
			//      directly, stopping further execution - ie, interupting the flow of this
			//      method call to fire bindings at this expression. Below the navigate method
			//      there is a binding to catch this event and stop its propagation.
			//
			//      We then trigger a new popstate event on the window with a null state
			//      so that the navigate events can conclude their work properly
			//
			// if the url is a path we want to preserve the query params that are available on
			// the current url.
			this.preventHashAssignPopState = true;
			window.location.hash = hash;

			// If popstate is enabled and the browser triggers `popstate` events when the hash
			// is set (this often happens immediately in browsers like Chrome), then the
			// this flag will be set to false already. If it's a browser that does not trigger
			// a `popstate` on hash assignement or `replaceState` then we need avoid the branch
			// that swallows the event created by the popstate generated by the hash assignment
			// At the time of this writing this happens with Opera 12 and some version of IE
			this.preventHashAssignPopState = false;

			state = $.extend({
				url: href,
				hash: hash,
				title: document.title
			}, data);

			if( isPopStateEvent ) {
				popstateEvent = new $.Event( "popstate" );
				popstateEvent.originalEvent = {
					type: "popstate",
					state: null
				};

				this.squash( url, state );

				// Trigger a new faux popstate event to replace the one that we
				// caught that was triggered by the hash setting above.
				if( !noEvents ) {
					this.ignorePopState = true;
					$.mobile.window.trigger( popstateEvent );
				}
			}

			// record the history entry so that the information can be included
			// in hashchange event driven navigate events in a similar fashion to
			// the state that's provided by popstate
			this.history.add( state.url, state );
		},


		// This binding is intended to catch the popstate events that are fired
		// when execution of the `$.navigate` method stops at window.location.hash = url;
		// and completely prevent them from propagating. The popstate event will then be
		// retriggered after execution resumes
		//
		// TODO grab the original event here and use it for the synthetic event in the
		//      second half of the navigate execution that will follow this binding
		popstate: function( event ) {
			var active, hash, state, closestIndex;

			// Partly to support our test suite which manually alters the support
			// value to test hashchange. Partly to prevent all around weirdness
			if( !$.event.special.navigate.isPushStateEnabled() ){
				return;
			}

			// If this is the popstate triggered by the actual alteration of the hash
			// prevent it completely. History is tracked manually
			if( this.preventHashAssignPopState ) {
				this.preventHashAssignPopState = false;
				event.stopImmediatePropagation();
				return;
			}

			// if this is the popstate triggered after the `replaceState` call in the go
			// method, then simply ignore it. The history entry has already been captured
			if( this.ignorePopState ) {
				this.ignorePopState = false;
				return;
			}

			// If there is no state, and the history stack length is one were
			// probably getting the page load popstate fired by browsers like chrome
			// avoid it and set the one time flag to false.
			// TODO: Do we really need all these conditions? Comparing location hrefs
			// should be sufficient.
			if( !event.originalEvent.state &&
				this.history.stack.length === 1 &&
				this.ignoreInitialHashChange ) {
				this.ignoreInitialHashChange = false;

				if ( location.href === initialHref ) {
					event.preventDefault();
					return;
				}
			}

			// account for direct manipulation of the hash. That is, we will receive a popstate
			// when the hash is changed by assignment, and it won't have a state associated. We
			// then need to squash the hash. See below for handling of hash assignment that
			// matches an existing history entry
			// TODO it might be better to only add to the history stack
			//      when the hash is adjacent to the active history entry
			hash = path.parseLocation().hash;
			if( !event.originalEvent.state && hash ) {
				// squash the hash that's been assigned on the URL with replaceState
				// also grab the resulting state object for storage
				state = this.squash( hash );

				// record the new hash as an additional history entry
				// to match the browser's treatment of hash assignment
				this.history.add( state.url, state );

				// pass the newly created state information
				// along with the event
				event.historyState = state;

				// do not alter history, we've added a new history entry
				// so we know where we are
				return;
			}

			// If all else fails this is a popstate that comes from the back or forward buttons
			// make sure to set the state of our history stack properly, and record the directionality
			this.history.direct({
				url: (event.originalEvent.state || {}).url || hash,

				// When the url is either forward or backward in history include the entry
				// as data on the event object for merging as data in the navigate event
				present: function( historyEntry, direction ) {
					// make sure to create a new object to pass down as the navigate event data
					event.historyState = $.extend({}, historyEntry);
					event.historyState.direction = direction;
				}
			});
		},

		// NOTE must bind before `navigate` special event hashchange binding otherwise the
		//      navigation data won't be attached to the hashchange event in time for those
		//      bindings to attach it to the `navigate` special event
		// TODO add a check here that `hashchange.navigate` is bound already otherwise it's
		//      broken (exception?)
		hashchange: function( event ) {
			var history, hash;

			// If hashchange listening is explicitly disabled or pushstate is supported
			// avoid making use of the hashchange handler.
			if(!$.event.special.navigate.isHashChangeEnabled() ||
				$.event.special.navigate.isPushStateEnabled() ) {
				return;
			}

			// On occasion explicitly want to prevent the next hash from propogating because we only
			// with to alter the url to represent the new state do so here
			if( this.preventNextHashChange ){
				this.preventNextHashChange = false;
				event.stopImmediatePropagation();
				return;
			}

			history = this.history;
			hash = path.parseLocation().hash;

			// If this is a hashchange caused by the back or forward button
			// make sure to set the state of our history stack properly
			this.history.direct({
				url: hash,

				// When the url is either forward or backward in history include the entry
				// as data on the event object for merging as data in the navigate event
				present: function( historyEntry, direction ) {
					// make sure to create a new object to pass down as the navigate event data
					event.hashchangeState = $.extend({}, historyEntry);
					event.hashchangeState.direction = direction;
				},

				// When we don't find a hash in our history clearly we're aiming to go there
				// record the entry as new for future traversal
				//
				// NOTE it's not entirely clear that this is the right thing to do given that we
				//      can't know the users intention. It might be better to explicitly _not_
				//      support location.hash assignment in preference to $.navigate calls
				// TODO first arg to add should be the href, but it causes issues in identifying
				//      embeded pages
				missing: function() {
					history.add( hash, {
						hash: hash,
						title: document.title
					});
				}
			});
		}
	});
})( jQuery );



(function( $, undefined ) {
	// TODO consider queueing navigation activity until previous activities have completed
	//      so that end users don't have to think about it. Punting for now
	// TODO !! move the event bindings into callbacks on the navigate event
	$.mobile.navigate = function( url, data, noEvents ) {
		$.mobile.navigate.navigator.go( url, data, noEvents );
	};

	// expose the history on the navigate method in anticipation of full integration with
	// existing navigation functionalty that is tightly coupled to the history information
	$.mobile.navigate.history = new $.mobile.History();

	// instantiate an instance of the navigator for use within the $.navigate method
	$.mobile.navigate.navigator = new $.mobile.Navigator( $.mobile.navigate.history );

	var loc = $.mobile.path.parseLocation();
	$.mobile.navigate.history.add( loc.href, {hash: loc.hash} );
})( jQuery );


// This plugin is an experiment for abstracting away the touch and mouse
// events so that developers don't have to worry about which method of input
// the device their document is loaded on supports.
//
// The idea here is to allow the developer to register listeners for the
// basic mouse events, such as mousedown, mousemove, mouseup, and click,
// and the plugin will take care of registering the correct listeners
// behind the scenes to invoke the listener at the fastest possible time
// for that device, while still retaining the order of event firing in
// the traditional mouse environment, should multiple handlers be registered
// on the same element for different events.
//
// The current version exposes the following virtual events to jQuery bind methods:
// "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel"

(function( $, window, document, undefined ) {

var dataPropertyName = "virtualMouseBindings",
	touchTargetPropertyName = "virtualTouchID",
	virtualEventNames = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split( " " ),
	touchEventProps = "clientX clientY pageX pageY screenX screenY".split( " " ),
	mouseHookProps = $.event.mouseHooks ? $.event.mouseHooks.props : [],
	mouseEventProps = $.event.props.concat( mouseHookProps ),
	activeDocHandlers = {},
	resetTimerID = 0,
	startX = 0,
	startY = 0,
	didScroll = false,
	clickBlockList = [],
	blockMouseTriggers = false,
	blockTouchTriggers = false,
	eventCaptureSupported = "addEventListener" in document,
	$document = $( document ),
	nextTouchID = 1,
	lastTouchID = 0, threshold;

$.vmouse = {
	moveDistanceThreshold: 10,
	clickDistanceThreshold: 10,
	resetTimerDuration: 1500
};

function getNativeEvent( event ) {

	while ( event && typeof event.originalEvent !== "undefined" ) {
		event = event.originalEvent;
	}
	return event;
}

function createVirtualEvent( event, eventType ) {

	var t = event.type,
		oe, props, ne, prop, ct, touch, i, j, len;

	event = $.Event( event );
	event.type = eventType;

	oe = event.originalEvent;
	props = $.event.props;

	// addresses separation of $.event.props in to $.event.mouseHook.props and Issue 3280
	// https://github.com/jquery/jquery-mobile/issues/3280
	if ( t.search( /^(mouse|click)/ ) > -1 ) {
		props = mouseEventProps;
	}

	// copy original event properties over to the new event
	// this would happen if we could call $.event.fix instead of $.Event
	// but we don't have a way to force an event to be fixed multiple times
	if ( oe ) {
		for ( i = props.length, prop; i; ) {
			prop = props[ --i ];
			event[ prop ] = oe[ prop ];
		}
	}

	// make sure that if the mouse and click virtual events are generated
	// without a .which one is defined
	if ( t.search(/mouse(down|up)|click/) > -1 && !event.which ) {
		event.which = 1;
	}

	if ( t.search(/^touch/) !== -1 ) {
		ne = getNativeEvent( oe );
		t = ne.touches;
		ct = ne.changedTouches;
		touch = ( t && t.length ) ? t[0] : ( ( ct && ct.length ) ? ct[ 0 ] : undefined );

		if ( touch ) {
			for ( j = 0, len = touchEventProps.length; j < len; j++) {
				prop = touchEventProps[ j ];
				event[ prop ] = touch[ prop ];
			}
		}
	}

	return event;
}

function getVirtualBindingFlags( element ) {

	var flags = {},
		b, k;

	while ( element ) {

		b = $.data( element, dataPropertyName );

		for (  k in b ) {
			if ( b[ k ] ) {
				flags[ k ] = flags.hasVirtualBinding = true;
			}
		}
		element = element.parentNode;
	}
	return flags;
}

function getClosestElementWithVirtualBinding( element, eventType ) {
	var b;
	while ( element ) {

		b = $.data( element, dataPropertyName );

		if ( b && ( !eventType || b[ eventType ] ) ) {
			return element;
		}
		element = element.parentNode;
	}
	return null;
}

function enableTouchBindings() {
	blockTouchTriggers = false;
}

function disableTouchBindings() {
	blockTouchTriggers = true;
}

function enableMouseBindings() {
	lastTouchID = 0;
	clickBlockList.length = 0;
	blockMouseTriggers = false;

	// When mouse bindings are enabled, our
	// touch bindings are disabled.
	disableTouchBindings();
}

function disableMouseBindings() {
	// When mouse bindings are disabled, our
	// touch bindings are enabled.
	enableTouchBindings();
}

function startResetTimer() {
	clearResetTimer();
	resetTimerID = setTimeout( function() {
		resetTimerID = 0;
		enableMouseBindings();
	}, $.vmouse.resetTimerDuration );
}

function clearResetTimer() {
	if ( resetTimerID ) {
		clearTimeout( resetTimerID );
		resetTimerID = 0;
	}
}

function triggerVirtualEvent( eventType, event, flags ) {
	var ve;

	if ( ( flags && flags[ eventType ] ) ||
				( !flags && getClosestElementWithVirtualBinding( event.target, eventType ) ) ) {

		ve = createVirtualEvent( event, eventType );

		$( event.target).trigger( ve );
	}

	return ve;
}

function mouseEventCallback( event ) {
	var touchID = $.data( event.target, touchTargetPropertyName );

	if ( !blockMouseTriggers && ( !lastTouchID || lastTouchID !== touchID ) ) {
		var ve = triggerVirtualEvent( "v" + event.type, event );
		if ( ve ) {
			if ( ve.isDefaultPrevented() ) {
				event.preventDefault();
			}
			if ( ve.isPropagationStopped() ) {
				event.stopPropagation();
			}
			if ( ve.isImmediatePropagationStopped() ) {
				event.stopImmediatePropagation();
			}
		}
	}
}

function handleTouchStart( event ) {

	var touches = getNativeEvent( event ).touches,
		target, flags;

	if ( touches && touches.length === 1 ) {

		target = event.target;
		flags = getVirtualBindingFlags( target );

		if ( flags.hasVirtualBinding ) {

			lastTouchID = nextTouchID++;
			$.data( target, touchTargetPropertyName, lastTouchID );

			clearResetTimer();

			disableMouseBindings();
			didScroll = false;

			var t = getNativeEvent( event ).touches[ 0 ];
			startX = t.pageX;
			startY = t.pageY;

			triggerVirtualEvent( "vmouseover", event, flags );
			triggerVirtualEvent( "vmousedown", event, flags );
		}
	}
}

function handleScroll( event ) {
	if ( blockTouchTriggers ) {
		return;
	}

	if ( !didScroll ) {
		triggerVirtualEvent( "vmousecancel", event, getVirtualBindingFlags( event.target ) );
	}

	didScroll = true;
	startResetTimer();
}

function handleTouchMove( event ) {
	if ( blockTouchTriggers ) {
		return;
	}

	var t = getNativeEvent( event ).touches[ 0 ],
		didCancel = didScroll,
		moveThreshold = $.vmouse.moveDistanceThreshold,
		flags = getVirtualBindingFlags( event.target );

		didScroll = didScroll ||
			( Math.abs( t.pageX - startX ) > moveThreshold ||
				Math.abs( t.pageY - startY ) > moveThreshold );


	if ( didScroll && !didCancel ) {
		triggerVirtualEvent( "vmousecancel", event, flags );
	}

	triggerVirtualEvent( "vmousemove", event, flags );
	startResetTimer();
}

function handleTouchEnd( event ) {
	if ( blockTouchTriggers ) {
		return;
	}

	disableTouchBindings();

	var flags = getVirtualBindingFlags( event.target ),
		t;
	triggerVirtualEvent( "vmouseup", event, flags );

	if ( !didScroll ) {
		var ve = triggerVirtualEvent( "vclick", event, flags );
		if ( ve && ve.isDefaultPrevented() ) {
			// The target of the mouse events that follow the touchend
			// event don't necessarily match the target used during the
			// touch. This means we need to rely on coordinates for blocking
			// any click that is generated.
			t = getNativeEvent( event ).changedTouches[ 0 ];
			clickBlockList.push({
				touchID: lastTouchID,
				x: t.clientX,
				y: t.clientY
			});

			// Prevent any mouse events that follow from triggering
			// virtual event notifications.
			blockMouseTriggers = true;
		}
	}
	triggerVirtualEvent( "vmouseout", event, flags);
	didScroll = false;

	startResetTimer();
}

function hasVirtualBindings( ele ) {
	var bindings = $.data( ele, dataPropertyName ),
		k;

	if ( bindings ) {
		for ( k in bindings ) {
			if ( bindings[ k ] ) {
				return true;
			}
		}
	}
	return false;
}

function dummyMouseHandler() {}

function getSpecialEventObject( eventType ) {
	var realType = eventType.substr( 1 );

	return {
		setup: function( data, namespace ) {
			// If this is the first virtual mouse binding for this element,
			// add a bindings object to its data.

			if ( !hasVirtualBindings( this ) ) {
				$.data( this, dataPropertyName, {} );
			}

			// If setup is called, we know it is the first binding for this
			// eventType, so initialize the count for the eventType to zero.
			var bindings = $.data( this, dataPropertyName );
			bindings[ eventType ] = true;

			// If this is the first virtual mouse event for this type,
			// register a global handler on the document.

			activeDocHandlers[ eventType ] = ( activeDocHandlers[ eventType ] || 0 ) + 1;

			if ( activeDocHandlers[ eventType ] === 1 ) {
				$document.bind( realType, mouseEventCallback );
			}

			// Some browsers, like Opera Mini, won't dispatch mouse/click events
			// for elements unless they actually have handlers registered on them.
			// To get around this, we register dummy handlers on the elements.

			$( this ).bind( realType, dummyMouseHandler );

			// For now, if event capture is not supported, we rely on mouse handlers.
			if ( eventCaptureSupported ) {
				// If this is the first virtual mouse binding for the document,
				// register our touchstart handler on the document.

				activeDocHandlers[ "touchstart" ] = ( activeDocHandlers[ "touchstart" ] || 0) + 1;

				if ( activeDocHandlers[ "touchstart" ] === 1 ) {
					$document.bind( "touchstart", handleTouchStart )
						.bind( "touchend", handleTouchEnd )

						// On touch platforms, touching the screen and then dragging your finger
						// causes the window content to scroll after some distance threshold is
						// exceeded. On these platforms, a scroll prevents a click event from being
						// dispatched, and on some platforms, even the touchend is suppressed. To
						// mimic the suppression of the click event, we need to watch for a scroll
						// event. Unfortunately, some platforms like iOS don't dispatch scroll
						// events until *AFTER* the user lifts their finger (touchend). This means
						// we need to watch both scroll and touchmove events to figure out whether
						// or not a scroll happenens before the touchend event is fired.

						.bind( "touchmove", handleTouchMove )
						.bind( "scroll", handleScroll );
				}
			}
		},

		teardown: function( data, namespace ) {
			// If this is the last virtual binding for this eventType,
			// remove its global handler from the document.

			--activeDocHandlers[ eventType ];

			if ( !activeDocHandlers[ eventType ] ) {
				$document.unbind( realType, mouseEventCallback );
			}

			if ( eventCaptureSupported ) {
				// If this is the last virtual mouse binding in existence,
				// remove our document touchstart listener.

				--activeDocHandlers[ "touchstart" ];

				if ( !activeDocHandlers[ "touchstart" ] ) {
					$document.unbind( "touchstart", handleTouchStart )
						.unbind( "touchmove", handleTouchMove )
						.unbind( "touchend", handleTouchEnd )
						.unbind( "scroll", handleScroll );
				}
			}

			var $this = $( this ),
				bindings = $.data( this, dataPropertyName );

			// teardown may be called when an element was
			// removed from the DOM. If this is the case,
			// jQuery core may have already stripped the element
			// of any data bindings so we need to check it before
			// using it.
			if ( bindings ) {
				bindings[ eventType ] = false;
			}

			// Unregister the dummy event handler.

			$this.unbind( realType, dummyMouseHandler );

			// If this is the last virtual mouse binding on the
			// element, remove the binding data from the element.

			if ( !hasVirtualBindings( this ) ) {
				$this.removeData( dataPropertyName );
			}
		}
	};
}

// Expose our custom events to the jQuery bind/unbind mechanism.

for ( var i = 0; i < virtualEventNames.length; i++ ) {
	$.event.special[ virtualEventNames[ i ] ] = getSpecialEventObject( virtualEventNames[ i ] );
}

// Add a capture click handler to block clicks.
// Note that we require event capture support for this so if the device
// doesn't support it, we punt for now and rely solely on mouse events.
if ( eventCaptureSupported ) {
	document.addEventListener( "click", function( e ) {
		var cnt = clickBlockList.length,
			target = e.target,
			x, y, ele, i, o, touchID;

		if ( cnt ) {
			x = e.clientX;
			y = e.clientY;
			threshold = $.vmouse.clickDistanceThreshold;

			// The idea here is to run through the clickBlockList to see if
			// the current click event is in the proximity of one of our
			// vclick events that had preventDefault() called on it. If we find
			// one, then we block the click.
			//
			// Why do we have to rely on proximity?
			//
			// Because the target of the touch event that triggered the vclick
			// can be different from the target of the click event synthesized
			// by the browser. The target of a mouse/click event that is syntehsized
			// from a touch event seems to be implementation specific. For example,
			// some browsers will fire mouse/click events for a link that is near
			// a touch event, even though the target of the touchstart/touchend event
			// says the user touched outside the link. Also, it seems that with most
			// browsers, the target of the mouse/click event is not calculated until the
			// time it is dispatched, so if you replace an element that you touched
			// with another element, the target of the mouse/click will be the new
			// element underneath that point.
			//
			// Aside from proximity, we also check to see if the target and any
			// of its ancestors were the ones that blocked a click. This is necessary
			// because of the strange mouse/click target calculation done in the
			// Android 2.1 browser, where if you click on an element, and there is a
			// mouse/click handler on one of its ancestors, the target will be the
			// innermost child of the touched element, even if that child is no where
			// near the point of touch.

			ele = target;

			while ( ele ) {
				for ( i = 0; i < cnt; i++ ) {
					o = clickBlockList[ i ];
					touchID = 0;

					if ( ( ele === target && Math.abs( o.x - x ) < threshold && Math.abs( o.y - y ) < threshold ) ||
								$.data( ele, touchTargetPropertyName ) === o.touchID ) {
						// XXX: We may want to consider removing matches from the block list
						//      instead of waiting for the reset timer to fire.
						e.preventDefault();
						e.stopPropagation();
						return;
					}
				}
				ele = ele.parentNode;
			}
		}
	}, true);
}
})( jQuery, window, document );


(function( $, window, undefined ) {
	var $document = $( document );

	// add new event shortcuts
	$.each( ( "touchstart touchmove touchend " +
		"tap taphold " +
		"swipe swipeleft swiperight " +
		"scrollstart scrollstop" ).split( " " ), function( i, name ) {

		$.fn[ name ] = function( fn ) {
			return fn ? this.bind( name, fn ) : this.trigger( name );
		};

		// jQuery < 1.8
		if ( $.attrFn ) {
			$.attrFn[ name ] = true;
		}
	});

	var supportTouch = $.mobile.support.touch,
		scrollEvent = "touchmove scroll",
		touchStartEvent = supportTouch ? "touchstart" : "mousedown",
		touchStopEvent = supportTouch ? "touchend" : "mouseup",
		touchMoveEvent = supportTouch ? "touchmove" : "mousemove";

	function triggerCustomEvent( obj, eventType, event ) {
		var originalType = event.type;
		event.type = eventType;
		$.event.dispatch.call( obj, event );
		event.type = originalType;
	}

	// also handles scrollstop
	$.event.special.scrollstart = {

		enabled: true,

		setup: function() {

			var thisObject = this,
				$this = $( thisObject ),
				scrolling,
				timer;

			function trigger( event, state ) {
				scrolling = state;
				triggerCustomEvent( thisObject, scrolling ? "scrollstart" : "scrollstop", event );
			}

			// iPhone triggers scroll after a small delay; use touchmove instead
			$this.bind( scrollEvent, function( event ) {

				if ( !$.event.special.scrollstart.enabled ) {
					return;
				}

				if ( !scrolling ) {
					trigger( event, true );
				}

				clearTimeout( timer );
				timer = setTimeout( function() {
					trigger( event, false );
				}, 50 );
			});
		}
	};

	// also handles taphold
	$.event.special.tap = {
		tapholdThreshold: 750,

		setup: function() {
			var thisObject = this,
				$this = $( thisObject );

			$this.bind( "vmousedown", function( event ) {

				if ( event.which && event.which !== 1 ) {
					return false;
				}

				var origTarget = event.target,
					origEvent = event.originalEvent,
					timer;

				function clearTapTimer() {
					clearTimeout( timer );
				}

				function clearTapHandlers() {
					clearTapTimer();

					$this.unbind( "vclick", clickHandler )
						.unbind( "vmouseup", clearTapTimer );
					$document.unbind( "vmousecancel", clearTapHandlers );
				}

				function clickHandler( event ) {
					clearTapHandlers();

					// ONLY trigger a 'tap' event if the start target is
					// the same as the stop target.
					if ( origTarget === event.target ) {
						triggerCustomEvent( thisObject, "tap", event );
					}
				}

				$this.bind( "vmouseup", clearTapTimer )
					.bind( "vclick", clickHandler );
				$document.bind( "vmousecancel", clearTapHandlers );

				timer = setTimeout( function() {
					triggerCustomEvent( thisObject, "taphold", $.Event( "taphold", { target: origTarget } ) );
				}, $.event.special.tap.tapholdThreshold );
			});
		}
	};

	// also handles swipeleft, swiperight
	$.event.special.swipe = {
		scrollSupressionThreshold: 30, // More than this horizontal displacement, and we will suppress scrolling.

		durationThreshold: 1000, // More time than this, and it isn't a swipe.

		horizontalDistanceThreshold: 30,  // Swipe horizontal displacement must be more than this.

		verticalDistanceThreshold: 75,  // Swipe vertical displacement must be less than this.

		start: function( event ) {
			var data = event.originalEvent.touches ?
					event.originalEvent.touches[ 0 ] : event;
			return {
						time: ( new Date() ).getTime(),
						coords: [ data.pageX, data.pageY ],
						origin: $( event.target )
					};
		},

		stop: function( event ) {
			var data = event.originalEvent.touches ?
					event.originalEvent.touches[ 0 ] : event;
			return {
						time: ( new Date() ).getTime(),
						coords: [ data.pageX, data.pageY ]
					};
		},

		handleSwipe: function( start, stop ) {
			if ( stop.time - start.time < $.event.special.swipe.durationThreshold &&
				Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) > $.event.special.swipe.horizontalDistanceThreshold &&
				Math.abs( start.coords[ 1 ] - stop.coords[ 1 ] ) < $.event.special.swipe.verticalDistanceThreshold ) {

				start.origin.trigger( "swipe" )
					.trigger( start.coords[0] > stop.coords[ 0 ] ? "swipeleft" : "swiperight" );
			}
		},

		setup: function() {
			var thisObject = this,
				$this = $( thisObject );

			$this.bind( touchStartEvent, function( event ) {
				var start = $.event.special.swipe.start( event ),
					stop;

				function moveHandler( event ) {
					if ( !start ) {
						return;
					}

					stop = $.event.special.swipe.stop( event );

					// prevent scrolling
					if ( Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) > $.event.special.swipe.scrollSupressionThreshold ) {
						event.preventDefault();
					}
				}

				$this.bind( touchMoveEvent, moveHandler )
					.one( touchStopEvent, function() {
						$this.unbind( touchMoveEvent, moveHandler );

						if ( start && stop ) {
							$.event.special.swipe.handleSwipe( start, stop );
						}
						start = stop = undefined;
					});
			});
		}
	};
	$.each({
		scrollstop: "scrollstart",
		taphold: "tap",
		swipeleft: "swipe",
		swiperight: "swipe"
	}, function( event, sourceEvent ) {

		$.event.special[ event ] = {
			setup: function() {
				$( this ).bind( sourceEvent, $.noop );
			}
		};
	});

})( jQuery, this );


	// throttled resize event
	(function( $ ) {
		$.event.special.throttledresize = {
			setup: function() {
				$( this ).bind( "resize", handler );
			},
			teardown: function() {
				$( this ).unbind( "resize", handler );
			}
		};

		var throttle = 250,
			handler = function() {
				curr = ( new Date() ).getTime();
				diff = curr - lastCall;

				if ( diff >= throttle ) {

					lastCall = curr;
					$( this ).trigger( "throttledresize" );

				} else {

					if ( heldCall ) {
						clearTimeout( heldCall );
					}

					// Promise a held call will still execute
					heldCall = setTimeout( handler, throttle - diff );
				}
			},
			lastCall = 0,
			heldCall,
			curr,
			diff;
	})( jQuery );

(function( $, window ) {
	var win = $( window ),
		event_name = "orientationchange",
		special_event,
		get_orientation,
		last_orientation,
		initial_orientation_is_landscape,
		initial_orientation_is_default,
		portrait_map = { "0": true, "180": true };

	// It seems that some device/browser vendors use window.orientation values 0 and 180 to
	// denote the "default" orientation. For iOS devices, and most other smart-phones tested,
	// the default orientation is always "portrait", but in some Android and RIM based tablets,
	// the default orientation is "landscape". The following code attempts to use the window
	// dimensions to figure out what the current orientation is, and then makes adjustments
	// to the to the portrait_map if necessary, so that we can properly decode the
	// window.orientation value whenever get_orientation() is called.
	//
	// Note that we used to use a media query to figure out what the orientation the browser
	// thinks it is in:
	//
	//     initial_orientation_is_landscape = $.mobile.media("all and (orientation: landscape)");
	//
	// but there was an iPhone/iPod Touch bug beginning with iOS 4.2, up through iOS 5.1,
	// where the browser *ALWAYS* applied the landscape media query. This bug does not
	// happen on iPad.

	if ( $.support.orientation ) {

		// Check the window width and height to figure out what the current orientation
		// of the device is at this moment. Note that we've initialized the portrait map
		// values to 0 and 180, *AND* we purposely check for landscape so that if we guess
		// wrong, , we default to the assumption that portrait is the default orientation.
		// We use a threshold check below because on some platforms like iOS, the iPhone
		// form-factor can report a larger width than height if the user turns on the
		// developer console. The actual threshold value is somewhat arbitrary, we just
		// need to make sure it is large enough to exclude the developer console case.

		var ww = window.innerWidth || win.width(),
			wh = window.innerHeight || win.height(),
			landscape_threshold = 50;

		initial_orientation_is_landscape = ww > wh && ( ww - wh ) > landscape_threshold;


		// Now check to see if the current window.orientation is 0 or 180.
		initial_orientation_is_default = portrait_map[ window.orientation ];

		// If the initial orientation is landscape, but window.orientation reports 0 or 180, *OR*
		// if the initial orientation is portrait, but window.orientation reports 90 or -90, we
		// need to flip our portrait_map values because landscape is the default orientation for
		// this device/browser.
		if ( ( initial_orientation_is_landscape && initial_orientation_is_default ) || ( !initial_orientation_is_landscape && !initial_orientation_is_default ) ) {
			portrait_map = { "-90": true, "90": true };
		}
	}

	$.event.special.orientationchange = $.extend( {}, $.event.special.orientationchange, {
		setup: function() {
			// If the event is supported natively, return false so that jQuery
			// will bind to the event using DOM methods.
			if ( $.support.orientation && !$.event.special.orientationchange.disabled ) {
				return false;
			}

			// Get the current orientation to avoid initial double-triggering.
			last_orientation = get_orientation();

			// Because the orientationchange event doesn't exist, simulate the
			// event by testing window dimensions on resize.
			win.bind( "throttledresize", handler );
		},
		teardown: function() {
			// If the event is not supported natively, return false so that
			// jQuery will unbind the event using DOM methods.
			if ( $.support.orientation && !$.event.special.orientationchange.disabled ) {
				return false;
			}

			// Because the orientationchange event doesn't exist, unbind the
			// resize event handler.
			win.unbind( "throttledresize", handler );
		},
		add: function( handleObj ) {
			// Save a reference to the bound event handler.
			var old_handler = handleObj.handler;


			handleObj.handler = function( event ) {
				// Modify event object, adding the .orientation property.
				event.orientation = get_orientation();

				// Call the originally-bound event handler and return its result.
				return old_handler.apply( this, arguments );
			};
		}
	});

	// If the event is not supported natively, this handler will be bound to
	// the window resize event to simulate the orientationchange event.
	function handler() {
		// Get the current orientation.
		var orientation = get_orientation();

		if ( orientation !== last_orientation ) {
			// The orientation has changed, so trigger the orientationchange event.
			last_orientation = orientation;
			win.trigger( event_name );
		}
	}

	// Get the current page orientation. This method is exposed publicly, should it
	// be needed, as jQuery.event.special.orientationchange.orientation()
	$.event.special.orientationchange.orientation = get_orientation = function() {
		var isPortrait = true, elem = document.documentElement;

		// prefer window orientation to the calculation based on screensize as
		// the actual screen resize takes place before or after the orientation change event
		// has been fired depending on implementation (eg android 2.3 is before, iphone after).
		// More testing is required to determine if a more reliable method of determining the new screensize
		// is possible when orientationchange is fired. (eg, use media queries + element + opacity)
		if ( $.support.orientation ) {
			// if the window orientation registers as 0 or 180 degrees report
			// portrait, otherwise landscape
			isPortrait = portrait_map[ window.orientation ];
		} else {
			isPortrait = elem && elem.clientWidth / elem.clientHeight < 1.1;
		}

		return isPortrait ? "portrait" : "landscape";
	};

	$.fn[ event_name ] = function( fn ) {
		return fn ? this.bind( event_name, fn ) : this.trigger( event_name );
	};

	// jQuery < 1.8
	if ( $.attrFn ) {
		$.attrFn[ event_name ] = true;
	}

}( jQuery, this ));



(function( $, undefined ) {

$.widget( "mobile.page", $.mobile.widget, {
	options: {
		theme: "c",
		domCache: false,
		keepNativeDefault: ":jqmData(role='none'), :jqmData(role='nojs')"
	},

	_create: function() {
		// if false is returned by the callbacks do not create the page
		if ( this._trigger( "beforecreate" ) === false ) {
			return false;
		}

		this.element
			.attr( "tabindex", "0" )
			.addClass( "ui-page ui-body-" + this.options.theme );

		this._on( this.element, {
			pagebeforehide: "removeContainerBackground",
			pagebeforeshow: "_handlePageBeforeShow"
		});
	},

	_handlePageBeforeShow: function( e ) {
		this.setContainerBackground();
	},

	removeContainerBackground: function() {
		$.mobile.pageContainer.removeClass( "ui-overlay-" + $.mobile.getInheritedTheme( this.element.parent() ) );
	},

	// set the page container background to the page theme
	setContainerBackground: function( theme ) {
		if ( this.options.theme ) {
			$.mobile.pageContainer.addClass( "ui-overlay-" + ( theme || this.options.theme ) );
		}
	},

	keepNativeSelector: function() {
		var options = this.options,
			keepNativeDefined = options.keepNative && $.trim( options.keepNative );

		if ( keepNativeDefined && options.keepNative !== options.keepNativeDefault ) {
			return [options.keepNative, options.keepNativeDefault].join( ", " );
		}

		return options.keepNativeDefault;
	}
});
})( jQuery );

(function( $, window, undefined ) {

var createHandler = function( sequential ) {

	// Default to sequential
	if ( sequential === undefined ) {
		sequential = true;
	}

	return function( name, reverse, $to, $from ) {

		var deferred = new $.Deferred(),
			reverseClass = reverse ? " reverse" : "",
			active	= $.mobile.urlHistory.getActive(),
			toScroll = active.lastScroll || $.mobile.defaultHomeScroll,
			screenHeight = $.mobile.getScreenHeight(),
			maxTransitionOverride = $.mobile.maxTransitionWidth !== false && $.mobile.window.width() > $.mobile.maxTransitionWidth,
			none = !$.support.cssTransitions || maxTransitionOverride || !name || name === "none" || Math.max( $.mobile.window.scrollTop(), toScroll ) > $.mobile.getMaxScrollForTransition(),
			toPreClass = " ui-page-pre-in",
			toggleViewportClass = function() {
				$.mobile.pageContainer.toggleClass( "ui-mobile-viewport-transitioning viewport-" + name );
			},
			scrollPage = function() {
				// By using scrollTo instead of silentScroll, we can keep things better in order
				// Just to be precautios, disable scrollstart listening like silentScroll would
				$.event.special.scrollstart.enabled = false;

				window.scrollTo( 0, toScroll );

				// reenable scrollstart listening like silentScroll would
				setTimeout( function() {
					$.event.special.scrollstart.enabled = true;
				}, 150 );
			},
			cleanFrom = function() {
				$from
					.removeClass( $.mobile.activePageClass + " out in reverse " + name )
					.height( "" );
			},
			startOut = function() {
				// if it's not sequential, call the doneOut transition to start the TO page animating in simultaneously
				if ( !sequential ) {
					doneOut();
				}
				else {
					$from.animationComplete( doneOut );
				}

				// Set the from page's height and start it transitioning out
				// Note: setting an explicit height helps eliminate tiling in the transitions
				$from
					.height( screenHeight + $.mobile.window.scrollTop() )
					.addClass( name + " out" + reverseClass );
			},

			doneOut = function() {

				if ( $from && sequential ) {
					cleanFrom();
				}

				startIn();
			},

			startIn = function() {

				// Prevent flickering in phonegap container: see comments at #4024 regarding iOS
				$to.css( "z-index", -10 );

				$to.addClass( $.mobile.activePageClass + toPreClass );

				// Send focus to page as it is now display: block
				$.mobile.focusPage( $to );

				// Set to page height
				$to.height( screenHeight + toScroll );

				scrollPage();

				// Restores visibility of the new page: added together with $to.css( "z-index", -10 );
				$to.css( "z-index", "" );

				if ( !none ) {
					$to.animationComplete( doneIn );
				}

				$to
					.removeClass( toPreClass )
					.addClass( name + " in" + reverseClass );

				if ( none ) {
					doneIn();
				}

			},

			doneIn = function() {

				if ( !sequential ) {

					if ( $from ) {
						cleanFrom();
					}
				}

				$to
					.removeClass( "out in reverse " + name )
					.height( "" );

				toggleViewportClass();

				// In some browsers (iOS5), 3D transitions block the ability to scroll to the desired location during transition
				// This ensures we jump to that spot after the fact, if we aren't there already.
				if ( $.mobile.window.scrollTop() !== toScroll ) {
					scrollPage();
				}

				deferred.resolve( name, reverse, $to, $from, true );
			};

		toggleViewportClass();

		if ( $from && !none ) {
			startOut();
		}
		else {
			doneOut();
		}

		return deferred.promise();
	};
};

// generate the handlers from the above
var sequentialHandler = createHandler(),
	simultaneousHandler = createHandler( false ),
	defaultGetMaxScrollForTransition = function() {
		return $.mobile.getScreenHeight() * 3;
	};

// Make our transition handler the public default.
$.mobile.defaultTransitionHandler = sequentialHandler;

//transition handler dictionary for 3rd party transitions
$.mobile.transitionHandlers = {
	"default": $.mobile.defaultTransitionHandler,
	"sequential": sequentialHandler,
	"simultaneous": simultaneousHandler
};

$.mobile.transitionFallbacks = {};

// If transition is defined, check if css 3D transforms are supported, and if not, if a fallback is specified
$.mobile._maybeDegradeTransition = function( transition ) {
		if ( transition && !$.support.cssTransform3d && $.mobile.transitionFallbacks[ transition ] ) {
			transition = $.mobile.transitionFallbacks[ transition ];
		}

		return transition;
};

// Set the getMaxScrollForTransition to default if no implementation was set by user
$.mobile.getMaxScrollForTransition = $.mobile.getMaxScrollForTransition || defaultGetMaxScrollForTransition;
})( jQuery, this );

(function( $, undefined ) {

	//define vars for interal use
	var $window = $.mobile.window,
		$html = $( 'html' ),
		$head = $( 'head' ),

		// NOTE: path extensions dependent on core attributes. Moved here to remove deps from
		//       $.mobile.path definition
		path = $.extend($.mobile.path, {

			//return the substring of a filepath before the sub-page key, for making a server request
			getFilePath: function( path ) {
				var splitkey = '&' + $.mobile.subPageUrlKey;
				return path && path.split( splitkey )[0].split( dialogHashKey )[0];
			},

			//check if the specified url refers to the first page in the main application document.
			isFirstPageUrl: function( url ) {
				// We only deal with absolute paths.
				var u = path.parseUrl( path.makeUrlAbsolute( url, this.documentBase ) ),

					// Does the url have the same path as the document?
					samePath = u.hrefNoHash === this.documentUrl.hrefNoHash || ( this.documentBaseDiffers && u.hrefNoHash === this.documentBase.hrefNoHash ),

					// Get the first page element.
					fp = $.mobile.firstPage,

					// Get the id of the first page element if it has one.
					fpId = fp && fp[0] ? fp[0].id : undefined;

				// The url refers to the first page if the path matches the document and
				// it either has no hash value, or the hash is exactly equal to the id of the
				// first page element.
				return samePath && ( !u.hash || u.hash === "#" || ( fpId && u.hash.replace( /^#/, "" ) === fpId ) );
			},

			// Some embedded browsers, like the web view in Phone Gap, allow cross-domain XHR
			// requests if the document doing the request was loaded via the file:// protocol.
			// This is usually to allow the application to "phone home" and fetch app specific
			// data. We normally let the browser handle external/cross-domain urls, but if the
			// allowCrossDomainPages option is true, we will allow cross-domain http/https
			// requests to go through our page loading logic.
			isPermittedCrossDomainRequest: function( docUrl, reqUrl ) {
				return $.mobile.allowCrossDomainPages &&
					docUrl.protocol === "file:" &&
					reqUrl.search( /^https?:/ ) !== -1;
			}
		}),

		// used to track last vclicked element to make sure its value is added to form data
		$lastVClicked = null,

		//will be defined when a link is clicked and given an active class
		$activeClickedLink = null,

		// resolved on domready
		domreadyDeferred = $.Deferred(),

		//urlHistory is purely here to make guesses at whether the back or forward button was clicked
		//and provide an appropriate transition
		urlHistory = $.mobile.navigate.history,

		//define first selector to receive focus when a page is shown
		focusable = "[tabindex],a,button:visible,select:visible,input",

		//queue to hold simultanious page transitions
		pageTransitionQueue = [],

		//indicates whether or not page is in process of transitioning
		isPageTransitioning = false,

		//nonsense hash change key for dialogs, so they create a history entry
		dialogHashKey = "&ui-state=dialog",

		//existing base tag?
		$base = $head.children( "base" ),

		//tuck away the original document URL minus any fragment.
		documentUrl = path.documentUrl,

		//if the document has an embedded base tag, documentBase is set to its
		//initial value. If a base tag does not exist, then we default to the documentUrl.
		documentBase = path.documentBase,

		//cache the comparison once.
		documentBaseDiffers = path.documentBaseDiffers,

		getScreenHeight = $.mobile.getScreenHeight;

		//base element management, defined depending on dynamic base tag support
		var base = $.support.dynamicBaseTag ? {

			//define base element, for use in routing asset urls that are referenced in Ajax-requested markup
			element: ( $base.length ? $base : $( "<base>", { href: documentBase.hrefNoHash } ).prependTo( $head ) ),

			//set the generated BASE element's href attribute to a new page's base path
			set: function( href ) {
				href = path.parseUrl(href).hrefNoHash;
				base.element.attr( "href", path.makeUrlAbsolute( href, documentBase ) );
			},

			//set the generated BASE element's href attribute to a new page's base path
			reset: function() {
				base.element.attr( "href", documentBase.hrefNoSearch );
			}

		} : undefined;


	//return the original document url
	$.mobile.getDocumentUrl = path.getDocumentUrl;

	//return the original document base url
	$.mobile.getDocumentBase = path.getDocumentBase;

	/* internal utility functions */

	// NOTE Issue #4950 Android phonegap doesn't navigate back properly
	//      when a full page refresh has taken place. It appears that hashchange
	//      and replacestate history alterations work fine but we need to support
	//      both forms of history traversal in our code that uses backward history
	//      movement
	$.mobile.back = function() {
		var nav = window.navigator;

		// if the setting is on and the navigator object is
		// available use the phonegap navigation capability
		if( this.phonegapNavigationEnabled &&
			nav &&
			nav.app &&
			nav.app.backHistory ){
			nav.app.backHistory();
		} else {
			window.history.back();
		}
	};

	//direct focus to the page title, or otherwise first focusable element
	$.mobile.focusPage = function ( page ) {
		var autofocus = page.find( "[autofocus]" ),
			pageTitle = page.find( ".ui-title:eq(0)" );

		if ( autofocus.length ) {
			autofocus.focus();
			return;
		}

		if ( pageTitle.length ) {
			pageTitle.focus();
		} else{
			page.focus();
		}
	};

	//remove active classes after page transition or error
	function removeActiveLinkClass( forceRemoval ) {
		if ( !!$activeClickedLink && ( !$activeClickedLink.closest( "." + $.mobile.activePageClass ).length || forceRemoval ) ) {
			$activeClickedLink.removeClass( $.mobile.activeBtnClass );
		}
		$activeClickedLink = null;
	}

	function releasePageTransitionLock() {
		isPageTransitioning = false;
		if ( pageTransitionQueue.length > 0 ) {
			$.mobile.changePage.apply( null, pageTransitionQueue.pop() );
		}
	}

	// Save the last scroll distance per page, before it is hidden
	var setLastScrollEnabled = true,
		setLastScroll, delayedSetLastScroll;

	setLastScroll = function() {
		// this barrier prevents setting the scroll value based on the browser
		// scrolling the window based on a hashchange
		if ( !setLastScrollEnabled ) {
			return;
		}

		var active = $.mobile.urlHistory.getActive();

		if ( active ) {
			var lastScroll = $window.scrollTop();

			// Set active page's lastScroll prop.
			// If the location we're scrolling to is less than minScrollBack, let it go.
			active.lastScroll = lastScroll < $.mobile.minScrollBack ? $.mobile.defaultHomeScroll : lastScroll;
		}
	};

	// bind to scrollstop to gather scroll position. The delay allows for the hashchange
	// event to fire and disable scroll recording in the case where the browser scrolls
	// to the hash targets location (sometimes the top of the page). once pagechange fires
	// getLastScroll is again permitted to operate
	delayedSetLastScroll = function() {
		setTimeout( setLastScroll, 100 );
	};

	// disable an scroll setting when a hashchange has been fired, this only works
	// because the recording of the scroll position is delayed for 100ms after
	// the browser might have changed the position because of the hashchange
	$window.bind( $.support.pushState ? "popstate" : "hashchange", function() {
		setLastScrollEnabled = false;
	});

	// handle initial hashchange from chrome :(
	$window.one( $.support.pushState ? "popstate" : "hashchange", function() {
		setLastScrollEnabled = true;
	});

	// wait until the mobile page container has been determined to bind to pagechange
	$window.one( "pagecontainercreate", function() {
		// once the page has changed, re-enable the scroll recording
		$.mobile.pageContainer.bind( "pagechange", function() {

			setLastScrollEnabled = true;

			// remove any binding that previously existed on the get scroll
			// which may or may not be different than the scroll element determined for
			// this page previously
			$window.unbind( "scrollstop", delayedSetLastScroll );

			// determine and bind to the current scoll element which may be the window
			// or in the case of touch overflow the element with touch overflow
			$window.bind( "scrollstop", delayedSetLastScroll );
		});
	});

	// bind to scrollstop for the first page as "pagechange" won't be fired in that case
	$window.bind( "scrollstop", delayedSetLastScroll );

	// No-op implementation of transition degradation
	$.mobile._maybeDegradeTransition = $.mobile._maybeDegradeTransition || function( transition ) {
		return transition;
	};

	//function for transitioning between two existing pages
	function transitionPages( toPage, fromPage, transition, reverse ) {
		if ( fromPage ) {
			//trigger before show/hide events
			fromPage.data( "mobile-page" )._trigger( "beforehide", null, { nextPage: toPage } );
		}

		toPage.data( "mobile-page" )._trigger( "beforeshow", null, { prevPage: fromPage || $( "" ) } );

		//clear page loader
		$.mobile.hidePageLoadingMsg();

		transition = $.mobile._maybeDegradeTransition( transition );

		//find the transition handler for the specified transition. If there
		//isn't one in our transitionHandlers dictionary, use the default one.
		//call the handler immediately to kick-off the transition.
		var th = $.mobile.transitionHandlers[ transition || "default" ] || $.mobile.defaultTransitionHandler,
			promise = th( transition, reverse, toPage, fromPage );

		promise.done(function() {
			//trigger show/hide events
			if ( fromPage ) {
				fromPage.data( "mobile-page" )._trigger( "hide", null, { nextPage: toPage } );
			}

			//trigger pageshow, define prevPage as either fromPage or empty jQuery obj
			toPage.data( "mobile-page" )._trigger( "show", null, { prevPage: fromPage || $( "" ) } );
		});

		return promise;
	}

	//simply set the active page's minimum height to screen height, depending on orientation
	$.mobile.resetActivePageHeight = function resetActivePageHeight( height ) {
		var aPage = $( "." + $.mobile.activePageClass ),
			aPagePadT = parseFloat( aPage.css( "padding-top" ) ),
			aPagePadB = parseFloat( aPage.css( "padding-bottom" ) ),
			aPageBorderT = parseFloat( aPage.css( "border-top-width" ) ),
			aPageBorderB = parseFloat( aPage.css( "border-bottom-width" ) );

		height = ( typeof height === "number" )? height : getScreenHeight();
		
		aPage.css( "min-height", height - aPagePadT - aPagePadB - aPageBorderT - aPageBorderB );
	};

	//shared page enhancements
	function enhancePage( $page, role ) {
		// If a role was specified, make sure the data-role attribute
		// on the page element is in sync.
		if ( role ) {
			$page.attr( "data-" + $.mobile.ns + "role", role );
		}

		//run page plugin
		$page.page();
	}

	// determine the current base url
	function findBaseWithDefault() {
		var closestBase = ( $.mobile.activePage && getClosestBaseUrl( $.mobile.activePage ) );
		return closestBase || documentBase.hrefNoHash;
	}

	/* exposed $.mobile methods */

	//animation complete callback
	$.fn.animationComplete = function( callback ) {
		if ( $.support.cssTransitions ) {
			return $( this ).one( 'webkitAnimationEnd animationend', callback );
		}
		else{
			// defer execution for consistency between webkit/non webkit
			setTimeout( callback, 0 );
			return $( this );
		}
	};

	//expose path object on $.mobile
	$.mobile.path = path;

	//expose base object on $.mobile
	$.mobile.base = base;

	//history stack
	$.mobile.urlHistory = urlHistory;

	$.mobile.dialogHashKey = dialogHashKey;

	//enable cross-domain page support
	$.mobile.allowCrossDomainPages = false;

	$.mobile._bindPageRemove = function() {
		var page = $( this );

		// when dom caching is not enabled or the page is embedded bind to remove the page on hide
		if ( !page.data( "mobile-page" ).options.domCache &&
			page.is( ":jqmData(external-page='true')" ) ) {

			page.bind( 'pagehide.remove', function( e ) {
				var $this = $( this ),
					prEvent = new $.Event( "pageremove" );

				$this.trigger( prEvent );

				if ( !prEvent.isDefaultPrevented() ) {
					$this.removeWithDependents();
				}
			});
		}
	};

	// Load a page into the DOM.
	$.mobile.loadPage = function( url, options ) {
		// This function uses deferred notifications to let callers
		// know when the page is done loading, or if an error has occurred.
		var deferred = $.Deferred(),

			// The default loadPage options with overrides specified by
			// the caller.
			settings = $.extend( {}, $.mobile.loadPage.defaults, options ),

			// The DOM element for the page after it has been loaded.
			page = null,

			// If the reloadPage option is true, and the page is already
			// in the DOM, dupCachedPage will be set to the page element
			// so that it can be removed after the new version of the
			// page is loaded off the network.
			dupCachedPage = null,

			// The absolute version of the URL passed into the function. This
			// version of the URL may contain dialog/subpage params in it.
			absUrl = path.makeUrlAbsolute( url, findBaseWithDefault() );

		// If the caller provided data, and we're using "get" request,
		// append the data to the URL.
		if ( settings.data && settings.type === "get" ) {
			absUrl = path.addSearchParams( absUrl, settings.data );
			settings.data = undefined;
		}

		// If the caller is using a "post" request, reloadPage must be true
		if ( settings.data && settings.type === "post" ) {
			settings.reloadPage = true;
		}

		// The absolute version of the URL minus any dialog/subpage params.
		// In otherwords the real URL of the page to be loaded.
		var fileUrl = path.getFilePath( absUrl ),

			// The version of the Url actually stored in the data-url attribute of
			// the page. For embedded pages, it is just the id of the page. For pages
			// within the same domain as the document base, it is the site relative
			// path. For cross-domain pages (Phone Gap only) the entire absolute Url
			// used to load the page.
			dataUrl = path.convertUrlToDataUrl( absUrl );

		// Make sure we have a pageContainer to work with.
		settings.pageContainer = settings.pageContainer || $.mobile.pageContainer;

		// Check to see if the page already exists in the DOM.
		// NOTE do _not_ use the :jqmData psuedo selector because parenthesis
		//      are a valid url char and it breaks on the first occurence
		page = settings.pageContainer.children( "[data-" + $.mobile.ns +"url='" + dataUrl + "']" );

		// If we failed to find the page, check to see if the url is a
		// reference to an embedded page. If so, it may have been dynamically
		// injected by a developer, in which case it would be lacking a data-url
		// attribute and in need of enhancement.
		if ( page.length === 0 && dataUrl && !path.isPath( dataUrl ) ) {
			page = settings.pageContainer.children( "#" + dataUrl )
				.attr( "data-" + $.mobile.ns + "url", dataUrl )
				.jqmData( "url", dataUrl );
		}

		
		// If we failed to find a page in the DOM, check the URL to see if it
		// refers to the first page in the application. If it isn't a reference
		// to the first page and refers to non-existent embedded page, error out.
		if ( page.length === 0 ) {
			if ( $.mobile.firstPage && path.isFirstPageUrl( fileUrl ) ) {
				// Check to make sure our cached-first-page is actually
				// in the DOM. Some user deployed apps are pruning the first
				// page from the DOM for various reasons, we check for this
				// case here because we don't want a first-page with an id
				// falling through to the non-existent embedded page error
				// case. If the first-page is not in the DOM, then we let
				// things fall through to the ajax loading code below so
				// that it gets reloaded.
				if ( $.mobile.firstPage.parent().length ) {
					page = $( $.mobile.firstPage );
				}
			} else if ( path.isEmbeddedPage( fileUrl )  ) {
				deferred.reject( absUrl, options );
				return deferred.promise();
			}
		}
		
		// If the page we are interested in is already in the DOM,
		// and the caller did not indicate that we should force a
		// reload of the file, we are done. Otherwise, track the
		// existing page as a duplicated.
		if ( page.length ) {
			if ( !settings.reloadPage ) {
				enhancePage( page, settings.role );
				deferred.resolve( absUrl, options, page );
				//if we are reloading the page make sure we update the base if its not a prefetch 
				if( base && !options.prefetch ){
					base.set(url);
				}
				return deferred.promise();
			}
			dupCachedPage = page;
		}
		var mpc = settings.pageContainer,
			pblEvent = new $.Event( "pagebeforeload" ),
			triggerData = { url: url, absUrl: absUrl, dataUrl: dataUrl, deferred: deferred, options: settings };

		// Let listeners know we're about to load a page.
		mpc.trigger( pblEvent, triggerData );

		// If the default behavior is prevented, stop here!
		if ( pblEvent.isDefaultPrevented() ) {
			return deferred.promise();
		}

		if ( settings.showLoadMsg ) {

			// This configurable timeout allows cached pages a brief delay to load without showing a message
			var loadMsgDelay = setTimeout(function() {
					$.mobile.showPageLoadingMsg();
				}, settings.loadMsgDelay ),

				// Shared logic for clearing timeout and removing message.
				hideMsg = function() {

					// Stop message show timer
					clearTimeout( loadMsgDelay );

					// Hide loading message
					$.mobile.hidePageLoadingMsg();
				};
		}
		// Reset base to the default document base.
		// only reset if we are not prefetching
		if ( base && ( typeof options === "undefined" || typeof options.prefetch === "undefined" ) ) {
			base.reset();
		}

		if ( !( $.mobile.allowCrossDomainPages || path.isSameDomain( documentUrl, absUrl ) ) ) {
			deferred.reject( absUrl, options );
		} else {
			// Load the new page.
			$.ajax({
				url: fileUrl,
				type: settings.type,
				data: settings.data,
				contentType: settings.contentType,
				dataType: "html",
				success: function( html, textStatus, xhr ) {
					//pre-parse html to check for a data-url,
					//use it as the new fileUrl, base path, etc
					var all = $( "<div></div>" ),

						//page title regexp
						newPageTitle = html.match( /<title[^>]*>([^<]*)/ ) && RegExp.$1,

						// TODO handle dialogs again
						pageElemRegex = new RegExp( "(<[^>]+\\bdata-" + $.mobile.ns + "role=[\"']?page[\"']?[^>]*>)" ),
						dataUrlRegex = new RegExp( "\\bdata-" + $.mobile.ns + "url=[\"']?([^\"'>]*)[\"']?" );


					// data-url must be provided for the base tag so resource requests can be directed to the
					// correct url. loading into a temprorary element makes these requests immediately
					if ( pageElemRegex.test( html ) &&
							RegExp.$1 &&
							dataUrlRegex.test( RegExp.$1 ) &&
							RegExp.$1 ) {
						url = fileUrl = path.getFilePath( $( "<div>" + RegExp.$1 + "</div>" ).text() );
					}
					//dont update the base tag if we are prefetching
					if ( base && ( typeof options === "undefined" || typeof options.prefetch === "undefined" )) {
						base.set( fileUrl );
					}

					//workaround to allow scripts to execute when included in page divs
					all.get( 0 ).innerHTML = html;
					page = all.find( ":jqmData(role='page'), :jqmData(role='dialog')" ).first();

					//if page elem couldn't be found, create one and insert the body element's contents
					if ( !page.length ) {
						page = $( "<div data-" + $.mobile.ns + "role='page'>" + ( html.split( /<\/?body[^>]*>/gmi )[1] || "" ) + "</div>" );
					}

					if ( newPageTitle && !page.jqmData( "title" ) ) {
						if ( ~newPageTitle.indexOf( "&" ) ) {
							newPageTitle = $( "<div>" + newPageTitle + "</div>" ).text();
						}
						page.jqmData( "title", newPageTitle );
					}

					//rewrite src and href attrs to use a base url
					if ( !$.support.dynamicBaseTag ) {
						var newPath = path.get( fileUrl );
						page.find( "[src], link[href], a[rel='external'], :jqmData(ajax='false'), a[target]" ).each(function() {
							var thisAttr = $( this ).is( '[href]' ) ? 'href' :
									$( this ).is( '[src]' ) ? 'src' : 'action',
								thisUrl = $( this ).attr( thisAttr );

							// XXX_jblas: We need to fix this so that it removes the document
							//            base URL, and then prepends with the new page URL.
							//if full path exists and is same, chop it - helps IE out
							thisUrl = thisUrl.replace( location.protocol + '//' + location.host + location.pathname, '' );

							if ( !/^(\w+:|#|\/)/.test( thisUrl ) ) {
								$( this ).attr( thisAttr, newPath + thisUrl );
							}
						});
					}

					//append to page and enhance
					// TODO taging a page with external to make sure that embedded pages aren't removed
					//      by the various page handling code is bad. Having page handling code in many
					//      places is bad. Solutions post 1.0
					page
						.attr( "data-" + $.mobile.ns + "url", path.convertUrlToDataUrl( fileUrl ) )
						.attr( "data-" + $.mobile.ns + "external-page", true )
						.appendTo( settings.pageContainer );

					// wait for page creation to leverage options defined on widget
					page.one( 'pagecreate', $.mobile._bindPageRemove );

					enhancePage( page, settings.role );

					// Enhancing the page may result in new dialogs/sub pages being inserted
					// into the DOM. If the original absUrl refers to a sub-page, that is the
					// real page we are interested in.
					if ( absUrl.indexOf( "&" + $.mobile.subPageUrlKey ) > -1 ) {
						page = settings.pageContainer.children( "[data-" + $.mobile.ns +"url='" + dataUrl + "']" );
					}

					// Remove loading message.
					if ( settings.showLoadMsg ) {
						hideMsg();
					}

					// Add the page reference and xhr to our triggerData.
					triggerData.xhr = xhr;
					triggerData.textStatus = textStatus;
					triggerData.page = page;

					// Let listeners know the page loaded successfully.
					settings.pageContainer.trigger( "pageload", triggerData );

					deferred.resolve( absUrl, options, page, dupCachedPage );
				},
				error: function( xhr, textStatus, errorThrown ) {
					//set base back to current path
					if ( base ) {
						base.set( path.get() );
					}

					// Add error info to our triggerData.
					triggerData.xhr = xhr;
					triggerData.textStatus = textStatus;
					triggerData.errorThrown = errorThrown;

					var plfEvent = new $.Event( "pageloadfailed" );

					// Let listeners know the page load failed.
					settings.pageContainer.trigger( plfEvent, triggerData );

					// If the default behavior is prevented, stop here!
					// Note that it is the responsibility of the listener/handler
					// that called preventDefault(), to resolve/reject the
					// deferred object within the triggerData.
					if ( plfEvent.isDefaultPrevented() ) {
						return;
					}

					// Remove loading message.
					if ( settings.showLoadMsg ) {

						// Remove loading message.
						hideMsg();

						// show error message
						$.mobile.showPageLoadingMsg( $.mobile.pageLoadErrorMessageTheme, $.mobile.pageLoadErrorMessage, true );

						// hide after delay
						setTimeout( $.mobile.hidePageLoadingMsg, 1500 );
					}

					deferred.reject( absUrl, options );
				}
			});
		}

		return deferred.promise();
	};

	$.mobile.loadPage.defaults = {
		type: "get",
		data: undefined,
		reloadPage: false,
		role: undefined, // By default we rely on the role defined by the @data-role attribute.
		showLoadMsg: false,
		pageContainer: undefined,
		loadMsgDelay: 50 // This delay allows loads that pull from browser cache to occur without showing the loading message.
	};

	// Show a specific page in the page container.
	$.mobile.changePage = function( toPage, options ) {
		// If we are in the midst of a transition, queue the current request.
		// We'll call changePage() once we're done with the current transition to
		// service the request.
		if ( isPageTransitioning ) {
			pageTransitionQueue.unshift( arguments );
			return;
		}

		var settings = $.extend( {}, $.mobile.changePage.defaults, options ), isToPageString;

		// Make sure we have a pageContainer to work with.
		settings.pageContainer = settings.pageContainer || $.mobile.pageContainer;

		// Make sure we have a fromPage.
		settings.fromPage = settings.fromPage || $.mobile.activePage;

		isToPageString = (typeof toPage === "string");

		var mpc = settings.pageContainer,
			pbcEvent = new $.Event( "pagebeforechange" ),
			triggerData = { toPage: toPage, options: settings };

		// NOTE: preserve the original target as the dataUrl value will be simplified
		//       eg, removing ui-state, and removing query params from the hash
		//       this is so that users who want to use query params have access to them
		//       in the event bindings for the page life cycle See issue #5085
		if ( isToPageString ) {
			// if the toPage is a string simply convert it
			triggerData.absUrl = path.makeUrlAbsolute( toPage, findBaseWithDefault() );
		} else {
			// if the toPage is a jQuery object grab the absolute url stored
			// in the loadPage callback where it exists
			triggerData.absUrl = toPage.data( 'absUrl' );
		}

		// Let listeners know we're about to change the current page.
		mpc.trigger( pbcEvent, triggerData );

		// If the default behavior is prevented, stop here!
		if ( pbcEvent.isDefaultPrevented() ) {
			return;
		}

		// We allow "pagebeforechange" observers to modify the toPage in the trigger
		// data to allow for redirects. Make sure our toPage is updated.
		//
		// We also need to re-evaluate whether it is a string, because an object can
		// also be replaced by a string

		toPage = triggerData.toPage;
		isToPageString = (typeof toPage === "string");

		// Set the isPageTransitioning flag to prevent any requests from
		// entering this method while we are in the midst of loading a page
		// or transitioning.
		isPageTransitioning = true;

		// If the caller passed us a url, call loadPage()
		// to make sure it is loaded into the DOM. We'll listen
		// to the promise object it returns so we know when
		// it is done loading or if an error ocurred.
		if ( isToPageString ) {
			// preserve the original target as the dataUrl value will be simplified
			// eg, removing ui-state, and removing query params from the hash
			// this is so that users who want to use query params have access to them
			// in the event bindings for the page life cycle See issue #5085
			settings.target = toPage;

			$.mobile.loadPage( toPage, settings )
				.done(function( url, options, newPage, dupCachedPage ) {
					isPageTransitioning = false;
					options.duplicateCachedPage = dupCachedPage;

					// store the original absolute url so that it can be provided
					// to events in the triggerData of the subsequent changePage call
					newPage.data( 'absUrl', triggerData.absUrl );
					$.mobile.changePage( newPage, options );
				})
				.fail(function( url, options ) {

					//clear out the active button state
					removeActiveLinkClass( true );

					//release transition lock so navigation is free again
					releasePageTransitionLock();
					settings.pageContainer.trigger( "pagechangefailed", triggerData );
				});
			return;
		}

		// If we are going to the first-page of the application, we need to make
		// sure settings.dataUrl is set to the application document url. This allows
		// us to avoid generating a document url with an id hash in the case where the
		// first-page of the document has an id attribute specified.
		if ( toPage[ 0 ] === $.mobile.firstPage[ 0 ] && !settings.dataUrl ) {
			settings.dataUrl = documentUrl.hrefNoHash;
		}

		// The caller passed us a real page DOM element. Update our
		// internal state and then trigger a transition to the page.
		var fromPage = settings.fromPage,
			url = ( settings.dataUrl && path.convertUrlToDataUrl( settings.dataUrl ) ) || toPage.jqmData( "url" ),
			// The pageUrl var is usually the same as url, except when url is obscured as a dialog url. pageUrl always contains the file path
			pageUrl = url,
			fileUrl = path.getFilePath( url ),
			active = urlHistory.getActive(),
			activeIsInitialPage = urlHistory.activeIndex === 0,
			historyDir = 0,
			pageTitle = document.title,
			isDialog = settings.role === "dialog" || toPage.jqmData( "role" ) === "dialog";


		// By default, we prevent changePage requests when the fromPage and toPage
		// are the same element, but folks that generate content manually/dynamically
		// and reuse pages want to be able to transition to the same page. To allow
		// this, they will need to change the default value of allowSamePageTransition
		// to true, *OR*, pass it in as an option when they manually call changePage().
		// It should be noted that our default transition animations assume that the
		// formPage and toPage are different elements, so they may behave unexpectedly.
		// It is up to the developer that turns on the allowSamePageTransitiona option
		// to either turn off transition animations, or make sure that an appropriate
		// animation transition is used.
		if ( fromPage && fromPage[0] === toPage[0] && !settings.allowSamePageTransition ) {
			isPageTransitioning = false;
			mpc.trigger( "pagechange", triggerData );

			// Even if there is no page change to be done, we should keep the urlHistory in sync with the hash changes
			if ( settings.fromHashChange ) {
				urlHistory.direct({ url: url });
			}

			return;
		}

		// We need to make sure the page we are given has already been enhanced.
		enhancePage( toPage, settings.role );

		// If the changePage request was sent from a hashChange event, check to see if the
		// page is already within the urlHistory stack. If so, we'll assume the user hit
		// the forward/back button and will try to match the transition accordingly.
		if ( settings.fromHashChange ) {
			historyDir = options.direction === "back" ? -1 : 1;
		}

		// Kill the keyboard.
		// XXX_jblas: We need to stop crawling the entire document to kill focus. Instead,
		//            we should be tracking focus with a delegate() handler so we already have
		//            the element in hand at this point.
		// Wrap this in a try/catch block since IE9 throw "Unspecified error" if document.activeElement
		// is undefined when we are in an IFrame.
		try {
			if ( document.activeElement && document.activeElement.nodeName.toLowerCase() !== 'body' ) {
				$( document.activeElement ).blur();
			} else {
				$( "input:focus, textarea:focus, select:focus" ).blur();
			}
		} catch( e ) {}

		// Record whether we are at a place in history where a dialog used to be - if so, do not add a new history entry and do not change the hash either
		var alreadyThere = false;

		// If we're displaying the page as a dialog, we don't want the url
		// for the dialog content to be used in the hash. Instead, we want
		// to append the dialogHashKey to the url of the current page.
		if ( isDialog && active ) {
			// on the initial page load active.url is undefined and in that case should
			// be an empty string. Moving the undefined -> empty string back into
			// urlHistory.addNew seemed imprudent given undefined better represents
			// the url state

			// If we are at a place in history that once belonged to a dialog, reuse
			// this state without adding to urlHistory and without modifying the hash.
			// However, if a dialog is already displayed at this point, and we're
			// about to display another dialog, then we must add another hash and
			// history entry on top so that one may navigate back to the original dialog
			if ( active.url &&
				active.url.indexOf( dialogHashKey ) > -1 &&
				$.mobile.activePage &&
				!$.mobile.activePage.is( ".ui-dialog" ) &&
				urlHistory.activeIndex > 0 ) {
				settings.changeHash = false;
				alreadyThere = true;
			}

			// Normally, we tack on a dialog hash key, but if this is the location of a stale dialog,
			// we reuse the URL from the entry
			url = ( active.url || "" );

			// account for absolute urls instead of just relative urls use as hashes
			if( !alreadyThere && url.indexOf("#") > -1 ) {
				url += dialogHashKey;
			} else {
				url += "#" + dialogHashKey;
			}

			// tack on another dialogHashKey if this is the same as the initial hash
			// this makes sure that a history entry is created for this dialog
			if ( urlHistory.activeIndex === 0 && url === urlHistory.initialDst ) {
				url += dialogHashKey;
			}
		}

		// if title element wasn't found, try the page div data attr too
		// If this is a deep-link or a reload ( active === undefined ) then just use pageTitle
		var newPageTitle = ( !active )? pageTitle : toPage.jqmData( "title" ) || toPage.children( ":jqmData(role='header')" ).find( ".ui-title" ).text();
		if ( !!newPageTitle && pageTitle === document.title ) {
			pageTitle = newPageTitle;
		}
		if ( !toPage.jqmData( "title" ) ) {
			toPage.jqmData( "title", pageTitle );
		}

		// Make sure we have a transition defined.
		settings.transition = settings.transition ||
			( ( historyDir && !activeIsInitialPage ) ? active.transition : undefined ) ||
			( isDialog ? $.mobile.defaultDialogTransition : $.mobile.defaultPageTransition );

		//add page to history stack if it's not back or forward
		if ( !historyDir && alreadyThere ) {
			urlHistory.getActive().pageUrl = pageUrl;
		}

		// Set the location hash.
		if ( url && !settings.fromHashChange ) {
			var params;

			// rebuilding the hash here since we loose it earlier on
			// TODO preserve the originally passed in path
			if( !path.isPath( url ) && url.indexOf( "#" ) < 0 ) {
				url = "#" + url;
			}

			// TODO the property names here are just silly
			params = {
				transition: settings.transition,
				title: pageTitle,
				pageUrl: pageUrl,
				role: settings.role
			};

			if ( settings.changeHash !== false && $.mobile.hashListeningEnabled ) {
				$.mobile.navigate( url, params, true);
			} else if ( toPage[ 0 ] !== $.mobile.firstPage[ 0 ] ) {
				$.mobile.navigate.history.add( url, params );
			}
		}

		//set page title
		document.title = pageTitle;

		//set "toPage" as activePage
		$.mobile.activePage = toPage;

		// If we're navigating back in the URL history, set reverse accordingly.
		settings.reverse = settings.reverse || historyDir < 0;

		transitionPages( toPage, fromPage, settings.transition, settings.reverse )
			.done(function( name, reverse, $to, $from, alreadyFocused ) {
				removeActiveLinkClass();

				//if there's a duplicateCachedPage, remove it from the DOM now that it's hidden
				if ( settings.duplicateCachedPage ) {
					settings.duplicateCachedPage.remove();
				}

				// Send focus to the newly shown page. Moved from promise .done binding in transitionPages
				// itself to avoid ie bug that reports offsetWidth as > 0 (core check for visibility)
				// despite visibility: hidden addresses issue #2965
				// https://github.com/jquery/jquery-mobile/issues/2965
				if ( !alreadyFocused ) {
					$.mobile.focusPage( toPage );
				}

				releasePageTransitionLock();
				mpc.trigger( "pagechange", triggerData );
			});
	};

	$.mobile.changePage.defaults = {
		transition: undefined,
		reverse: false,
		changeHash: true,
		fromHashChange: false,
		role: undefined, // By default we rely on the role defined by the @data-role attribute.
		duplicateCachedPage: undefined,
		pageContainer: undefined,
		showLoadMsg: true, //loading message shows by default when pages are being fetched during changePage
		dataUrl: undefined,
		fromPage: undefined,
		allowSamePageTransition: false
	};

/* Event Bindings - hashchange, submit, and click */
	function findClosestLink( ele )
	{
		while ( ele ) {
			// Look for the closest element with a nodeName of "a".
			// Note that we are checking if we have a valid nodeName
			// before attempting to access it. This is because the
			// node we get called with could have originated from within
			// an embedded SVG document where some symbol instance elements
			// don't have nodeName defined on them, or strings are of type
			// SVGAnimatedString.
			if ( ( typeof ele.nodeName === "string" ) && ele.nodeName.toLowerCase() === "a" ) {
				break;
			}
			ele = ele.parentNode;
		}
		return ele;
	}

	// The base URL for any given element depends on the page it resides in.
	function getClosestBaseUrl( ele )
	{
		// Find the closest page and extract out its url.
		var url = $( ele ).closest( ".ui-page" ).jqmData( "url" ),
			base = documentBase.hrefNoHash;

		if ( !url || !path.isPath( url ) ) {
			url = base;
		}

		return path.makeUrlAbsolute( url, base);
	}

	//The following event bindings should be bound after mobileinit has been triggered
	//the following deferred is resolved in the init file
	$.mobile.navreadyDeferred = $.Deferred();
	$.mobile._registerInternalEvents = function() {
		var getAjaxFormData = function( $form, calculateOnly ) {
			var url, ret = true, formData, vclickedName, method;
			
			if ( !$.mobile.ajaxEnabled ||
					// test that the form is, itself, ajax false
					$form.is( ":jqmData(ajax='false')" ) ||
					// test that $.mobile.ignoreContentEnabled is set and
					// the form or one of it's parents is ajax=false
					!$form.jqmHijackable().length ||
					$form.attr( "target" ) ) {
				return false;
			}

			url = $form.attr( "action" );
			method = ( $form.attr( "method" ) || "get" ).toLowerCase();

			// If no action is specified, browsers default to using the
			// URL of the document containing the form. Since we dynamically
			// pull in pages from external documents, the form should submit
			// to the URL for the source document of the page containing
			// the form.
			if ( !url ) {
				// Get the @data-url for the page containing the form.
				url = getClosestBaseUrl( $form );

				// NOTE: If the method is "get", we need to strip off the query string
				// because it will get replaced with the new form data. See issue #5710.
				if ( method === "get" ) {
					url = path.parseUrl( url ).hrefNoSearch;
				}

				if ( url === documentBase.hrefNoHash ) {
					// The url we got back matches the document base,
					// which means the page must be an internal/embedded page,
					// so default to using the actual document url as a browser
					// would.
					url = documentUrl.hrefNoSearch;
				}
			}

			url = path.makeUrlAbsolute(  url, getClosestBaseUrl( $form ) );

			if ( ( path.isExternal( url ) && !path.isPermittedCrossDomainRequest( documentUrl, url ) ) ) {
				return false;
			}

			if ( !calculateOnly ) {
				formData = $form.serializeArray();

				if ( $lastVClicked && $lastVClicked[ 0 ].form === $form[ 0 ] ) {
					vclickedName = $lastVClicked.attr( "name" );
					if ( vclickedName ) {
						// Make sure the last clicked element is included in the form
						$.each( formData, function( key, value ) {
							if ( value.name === vclickedName ) {
								// Unset vclickedName - we've found it in the serialized data already
								vclickedName = "";
								return false;
							}
						});
						if ( vclickedName ) {
							formData.push( { name: vclickedName, value: $lastVClicked.attr( "value" ) } );
						}
					}
				}

				ret = {
					url: url,
					options: {
						type:		method,
						data:		$.param( formData ),
						transition:	$form.jqmData( "transition" ),
						reverse:	$form.jqmData( "direction" ) === "reverse",
						reloadPage:	true
					}
				};
			}

			return ret;
		};

		//bind to form submit events, handle with Ajax
		$.mobile.document.delegate( "form", "submit", function( event ) {
			var formData = getAjaxFormData( $( this ) );

			if ( formData ) {
				$.mobile.changePage( formData.url, formData.options );
				event.preventDefault();
			}
		});

		//add active state on vclick
		$.mobile.document.bind( "vclick", function( event ) {
			var $btn, btnEls, target = event.target, needClosest = false;
			// if this isn't a left click we don't care. Its important to note
			// that when the virtual event is generated it will create the which attr
			if ( event.which > 1 || !$.mobile.linkBindingEnabled ) {
				return;
			}

			// Record that this element was clicked, in case we need it for correct
			// form submission during the "submit" handler above
			$lastVClicked = $( target );

			// Try to find a target element to which the active class will be applied
			if ( $.data( target, "mobile-button" ) ) {
				// If the form will not be submitted via AJAX, do not add active class
				if ( !getAjaxFormData( $( target ).closest( "form" ), true ) ) {
					return;
				}
				// We will apply the active state to this button widget - the parent
				// of the input that was clicked will have the associated data
				if ( target.parentNode ) {
					target = target.parentNode;
				}
			} else {
				target = findClosestLink( target );
				if ( !( target && path.parseUrl( target.getAttribute( "href" ) || "#" ).hash !== "#" ) ) {
					return;
				}

				// TODO teach $.mobile.hijackable to operate on raw dom elements so the
				// link wrapping can be avoided
				if ( !$( target ).jqmHijackable().length ) {
					return;
				}
			}

			// Avoid calling .closest by using the data set during .buttonMarkup()
			// List items have the button data in the parent of the element clicked
			if ( !!~target.className.indexOf( "ui-link-inherit" ) ) {
				if ( target.parentNode ) {
					btnEls = $.data( target.parentNode, "buttonElements" );
				}
			// Otherwise, look for the data on the target itself
			} else {
				btnEls = $.data( target, "buttonElements" );
			}
			// If found, grab the button's outer element
			if ( btnEls ) {
				target = btnEls.outer;
			} else {
				needClosest = true;
			}

			$btn = $( target );
			// If the outer element wasn't found by the our heuristics, use .closest()
			if ( needClosest ) {
				$btn = $btn.closest( ".ui-btn" );
			}

			if ( $btn.length > 0 && !$btn.hasClass( "ui-disabled" ) ) {
				removeActiveLinkClass( true );
				$activeClickedLink = $btn;
				$activeClickedLink.addClass( $.mobile.activeBtnClass );
			}
		});

		// click routing - direct to HTTP or Ajax, accordingly
		$.mobile.document.bind( "click", function( event ) {
			if ( !$.mobile.linkBindingEnabled || event.isDefaultPrevented() ) {
				return;
			}

			var link = findClosestLink( event.target ), $link = $( link ), httpCleanup;

			// If there is no link associated with the click or its not a left
			// click we want to ignore the click
			// TODO teach $.mobile.hijackable to operate on raw dom elements so the link wrapping
			// can be avoided
			if ( !link || event.which > 1 || !$link.jqmHijackable().length ) {
				return;
			}

			//remove active link class if external (then it won't be there if you come back)
			httpCleanup = function() {
				window.setTimeout(function() { removeActiveLinkClass( true ); }, 200 );
			};

			//if there's a data-rel=back attr, go back in history
			if ( $link.is( ":jqmData(rel='back')" ) ) {
				$.mobile.back();
				return false;
			}

			var baseUrl = getClosestBaseUrl( $link ),

				//get href, if defined, otherwise default to empty hash
				href = path.makeUrlAbsolute( $link.attr( "href" ) || "#", baseUrl );

			//if ajax is disabled, exit early
			if ( !$.mobile.ajaxEnabled && !path.isEmbeddedPage( href ) ) {
				httpCleanup();
				//use default click handling
				return;
			}

			// XXX_jblas: Ideally links to application pages should be specified as
			//            an url to the application document with a hash that is either
			//            the site relative path or id to the page. But some of the
			//            internal code that dynamically generates sub-pages for nested
			//            lists and select dialogs, just write a hash in the link they
			//            create. This means the actual URL path is based on whatever
			//            the current value of the base tag is at the time this code
			//            is called. For now we are just assuming that any url with a
			//            hash in it is an application page reference.
			if ( href.search( "#" ) !== -1 ) {
				href = href.replace( /[^#]*#/, "" );
				if ( !href ) {
					//link was an empty hash meant purely
					//for interaction, so we ignore it.
					event.preventDefault();
					return;
				} else if ( path.isPath( href ) ) {
					//we have apath so make it the href we want to load.
					href = path.makeUrlAbsolute( href, baseUrl );
				} else {
					//we have a simple id so use the documentUrl as its base.
					href = path.makeUrlAbsolute( "#" + href, documentUrl.hrefNoHash );
				}
			}

				// Should we handle this link, or let the browser deal with it?
			var useDefaultUrlHandling = $link.is( "[rel='external']" ) || $link.is( ":jqmData(ajax='false')" ) || $link.is( "[target]" ),

				// Some embedded browsers, like the web view in Phone Gap, allow cross-domain XHR
				// requests if the document doing the request was loaded via the file:// protocol.
				// This is usually to allow the application to "phone home" and fetch app specific
				// data. We normally let the browser handle external/cross-domain urls, but if the
				// allowCrossDomainPages option is true, we will allow cross-domain http/https
				// requests to go through our page loading logic.

				//check for protocol or rel and its not an embedded page
				//TODO overlap in logic from isExternal, rel=external check should be
				//     moved into more comprehensive isExternalLink
				isExternal = useDefaultUrlHandling || ( path.isExternal( href ) && !path.isPermittedCrossDomainRequest( documentUrl, href ) );

			if ( isExternal ) {
				httpCleanup();
				//use default click handling
				return;
			}

			//use ajax
			var transition = $link.jqmData( "transition" ),
				reverse = $link.jqmData( "direction" ) === "reverse" ||
							// deprecated - remove by 1.0
							$link.jqmData( "back" ),

				//this may need to be more specific as we use data-rel more
				role = $link.attr( "data-" + $.mobile.ns + "rel" ) || undefined;

			$.mobile.changePage( href, { transition: transition, reverse: reverse, role: role, link: $link } );
			event.preventDefault();
		});

		//prefetch pages when anchors with data-prefetch are encountered
		$.mobile.document.delegate( ".ui-page", "pageshow.prefetch", function() {
			var urls = [];
			$( this ).find( "a:jqmData(prefetch)" ).each(function() {
				var $link = $( this ),
					url = $link.attr( "href" );

				if ( url && $.inArray( url, urls ) === -1 ) {
					urls.push( url );

					$.mobile.loadPage( url, { role: $link.attr( "data-" + $.mobile.ns + "rel" ),prefetch: true } );
				}
			});
		});

		$.mobile._handleHashChange = function( url, data ) {
			//find first page via hash
			var to = path.stripHash(url),
				//transition is false if it's the first page, undefined otherwise (and may be overridden by default)
				transition = $.mobile.urlHistory.stack.length === 0 ? "none" : undefined,

				// default options for the changPage calls made after examining the current state
				// of the page and the hash, NOTE that the transition is derived from the previous
				// history entry
				changePageOptions = {
					changeHash: false,
					fromHashChange: true,
					reverse: data.direction === "back"
				};

			$.extend( changePageOptions, data, {
				transition: (urlHistory.getLast() || {}).transition || transition
			});

			// special case for dialogs
			if ( urlHistory.activeIndex > 0 && to.indexOf( dialogHashKey ) > -1 && urlHistory.initialDst !== to ) {

				// If current active page is not a dialog skip the dialog and continue
				// in the same direction
				if ( $.mobile.activePage && !$.mobile.activePage.is( ".ui-dialog" ) ) {
					//determine if we're heading forward or backward and continue accordingly past
					//the current dialog
					if( data.direction === "back" ) {
						$.mobile.back();
					} else {
						window.history.forward();
					}

					// prevent changePage call
					return;
				} else {
					// if the current active page is a dialog and we're navigating
					// to a dialog use the dialog objected saved in the stack
					to = data.pageUrl;
					var active = $.mobile.urlHistory.getActive();

					// make sure to set the role, transition and reversal
					// as most of this is lost by the domCache cleaning
					$.extend( changePageOptions, {
						role: active.role,
						transition: active.transition,
						reverse: data.direction === "back"
					});
				}
			}

			//if to is defined, load it
			if ( to ) {
				// At this point, 'to' can be one of 3 things, a cached page element from
				// a history stack entry, an id, or site-relative/absolute URL. If 'to' is
				// an id, we need to resolve it against the documentBase, not the location.href,
				// since the hashchange could've been the result of a forward/backward navigation
				// that crosses from an external page/dialog to an internal page/dialog.
				to = !path.isPath( to ) ? ( path.makeUrlAbsolute( '#' + to, documentBase ) ) : to;

				// If we're about to go to an initial URL that contains a reference to a non-existent
				// internal page, go to the first page instead. We know that the initial hash refers to a
				// non-existent page, because the initial hash did not end up in the initial urlHistory entry
				if ( to === path.makeUrlAbsolute( '#' + urlHistory.initialDst, documentBase ) &&
					urlHistory.stack.length && urlHistory.stack[0].url !== urlHistory.initialDst.replace( dialogHashKey, "" ) ) {
					to = $.mobile.firstPage;
				}

				$.mobile.changePage( to, changePageOptions );
			}	else {

				//there's no hash, go to the first page in the dom
				$.mobile.changePage( $.mobile.firstPage, changePageOptions );
			}
		};

		// TODO roll the logic here into the handleHashChange method
		$window.bind( "navigate", function( e, data ) {
			var url;

			if ( e.originalEvent && e.originalEvent.isDefaultPrevented() ) {
				return;
			}

			url = $.event.special.navigate.originalEventName.indexOf( "hashchange" ) > -1 ? data.state.hash : data.state.url;

			if( !url ) {
				url = $.mobile.path.parseLocation().hash;
			}

			if( !url || url === "#" || url.indexOf( "#" + $.mobile.path.uiStateKey ) === 0 ){
				url = location.href;
			}

			$.mobile._handleHashChange( url, data.state );
		});

		//set page min-heights to be device specific
		$.mobile.document.bind( "pageshow", $.mobile.resetActivePageHeight );
		$.mobile.window.bind( "throttledresize", $.mobile.resetActivePageHeight );

	};//navreadyDeferred done callback

	$( function() { domreadyDeferred.resolve(); } );

	$.when( domreadyDeferred, $.mobile.navreadyDeferred ).done( function() { $.mobile._registerInternalEvents(); } );
})( jQuery );

/*
* fallback transition for flip in non-3D supporting browsers (which tend to handle complex transitions poorly in general
*/

(function( $, window, undefined ) {

$.mobile.transitionFallbacks.flip = "fade";

})( jQuery, this );
/*
* fallback transition for flow in non-3D supporting browsers (which tend to handle complex transitions poorly in general
*/

(function( $, window, undefined ) {

$.mobile.transitionFallbacks.flow = "fade";

})( jQuery, this );
/*
* fallback transition for pop in non-3D supporting browsers (which tend to handle complex transitions poorly in general
*/

(function( $, window, undefined ) {

$.mobile.transitionFallbacks.pop = "fade";

})( jQuery, this );
/*
* fallback transition for slide in non-3D supporting browsers (which tend to handle complex transitions poorly in general
*/

(function( $, window, undefined ) {

// Use the simultaneous transitions handler for slide transitions
$.mobile.transitionHandlers.slide = $.mobile.transitionHandlers.simultaneous;

// Set the slide transitions's fallback to "fade"
$.mobile.transitionFallbacks.slide = "fade";

})( jQuery, this );
/*
* fallback transition for slidedown in non-3D supporting browsers (which tend to handle complex transitions poorly in general
*/

(function( $, window, undefined ) {

$.mobile.transitionFallbacks.slidedown = "fade";

})( jQuery, this );
/*
* fallback transition for slidefade in non-3D supporting browsers (which tend to handle complex transitions poorly in general
*/

(function( $, window, undefined ) {

// Set the slide transitions's fallback to "fade"
$.mobile.transitionFallbacks.slidefade = "fade";

})( jQuery, this );
/*
* fallback transition for slideup in non-3D supporting browsers (which tend to handle complex transitions poorly in general
*/

(function( $, window, undefined ) {

$.mobile.transitionFallbacks.slideup = "fade";

})( jQuery, this );
/*
* fallback transition for turn in non-3D supporting browsers (which tend to handle complex transitions poorly in general
*/

(function( $, window, undefined ) {

$.mobile.transitionFallbacks.turn = "fade";

})( jQuery, this );

(function( $, undefined ) {

$.mobile.page.prototype.options.degradeInputs = {
	color: false,
	date: false,
	datetime: false,
	"datetime-local": false,
	email: false,
	month: false,
	number: false,
	range: "number",
	search: "text",
	tel: false,
	time: false,
	url: false,
	week: false
};


//auto self-init widgets
$.mobile.document.bind( "pagecreate create", function( e ) {

	var page = $.mobile.closestPageData( $( e.target ) ), options;

	if ( !page ) {
		return;
	}

	options = page.options;

	// degrade inputs to avoid poorly implemented native functionality
	$( e.target ).find( "input" ).not( page.keepNativeSelector() ).each(function() {
		var $this = $( this ),
			type = this.getAttribute( "type" ),
			optType = options.degradeInputs[ type ] || "text";

		if ( options.degradeInputs[ type ] ) {
			var html = $( "<div>" ).html( $this.clone() ).html(),
				// In IE browsers, the type sometimes doesn't exist in the cloned markup, so we replace the closing tag instead
				hasType = html.indexOf( " type=" ) > -1,
				findstr = hasType ? /\s+type=["']?\w+['"]?/ : /\/?>/,
				repstr = " type=\"" + optType + "\" data-" + $.mobile.ns + "type=\"" + type + "\"" + ( hasType ? "" : ">" );

			$this.replaceWith( html.replace( findstr, repstr ) );
		}
	});

});

})( jQuery );

(function( $, window, undefined ) {

$.widget( "mobile.dialog", $.mobile.widget, {
	options: {
		closeBtn: "left",
		closeBtnText: "Close",
		overlayTheme: "a",
		corners: true,
		initSelector: ":jqmData(role='dialog')"
	},

	// Override the theme set by the page plugin on pageshow
	_handlePageBeforeShow: function() {
		this._isCloseable = true;
		if ( this.options.overlayTheme ) {
			this.element
				.page( "removeContainerBackground" )
				.page( "setContainerBackground", this.options.overlayTheme );
		}
	},

	_handlePageBeforeHide: function() {
		this._isCloseable = false;
	},

	_create: function() {
		var self = this,
			$el = this.element,
			cornerClass = !!this.options.corners ? " ui-corner-all" : "",
			dialogWrap = $( "<div/>", {
					"role" : "dialog",
					"class" : "ui-dialog-contain ui-overlay-shadow" + cornerClass
				});

		$el.addClass( "ui-dialog ui-overlay-" + this.options.overlayTheme );

		// Class the markup for dialog styling
		// Set aria role
		$el.wrapInner( dialogWrap );

		/* bind events
			- clicks and submits should use the closing transition that the dialog opened with
				unless a data-transition is specified on the link/form
			- if the click was on the close button, or the link has a data-rel="back" it'll go back in history naturally
		*/
		$el.bind( "vclick submit", function( event ) {
			var $target = $( event.target ).closest( event.type === "vclick" ? "a" : "form" ),
				active;

			if ( $target.length && !$target.jqmData( "transition" ) ) {

				active = $.mobile.urlHistory.getActive() || {};

				$target.attr( "data-" + $.mobile.ns + "transition", ( active.transition || $.mobile.defaultDialogTransition ) )
					.attr( "data-" + $.mobile.ns + "direction", "reverse" );
			}
		});

		this._on( $el, {
			pagebeforeshow: "_handlePageBeforeShow",
			pagebeforehide: "_handlePageBeforeHide"
		});

		$.extend( this, {
			_createComplete: false
		});

		this._setCloseBtn( this.options.closeBtn );
	},

	_setCloseBtn: function( value ) {
		var self = this, btn, location;

		if ( this._headerCloseButton ) {
			this._headerCloseButton.remove();
			this._headerCloseButton = null;
		}
		if ( value !== "none" ) {
			// Sanitize value
			location = ( value === "left" ? "left" : "right" );
			btn = $( "<a href='#' class='ui-btn-" + location + "' data-" + $.mobile.ns + "icon='delete' data-" + $.mobile.ns + "iconpos='notext'>"+ this.options.closeBtnText + "</a>" );
			this.element.children().find( ":jqmData(role='header')" ).first().prepend( btn );
			if ( this._createComplete && $.fn.buttonMarkup ) {
				btn.buttonMarkup();
			}
			this._createComplete = true;

			// this must be an anonymous function so that select menu dialogs can replace
			// the close method. This is a change from previously just defining data-rel=back
			// on the button and letting nav handle it
			//
			// Use click rather than vclick in order to prevent the possibility of unintentionally
			// reopening the dialog if the dialog opening item was directly under the close button.
			btn.bind( "click", function() {
				self.close();
			});

			this._headerCloseButton = btn;
		}
	},

	_setOption: function( key, value ) {
		if ( key === "closeBtn" ) {
			this._setCloseBtn( value );
		}
		this._super( key, value );
	},

	// Close method goes back in history
	close: function() {
		var idx, dst, hist = $.mobile.navigate.history;

		if ( this._isCloseable ) {
			this._isCloseable = false;
			// If the hash listening is enabled and there is at least one preceding history
			// entry it's ok to go back. Initial pages with the dialog hash state are an example
			// where the stack check is necessary
			if ( $.mobile.hashListeningEnabled && hist.activeIndex > 0 ) {
				$.mobile.back();
			} else {
				idx = Math.max( 0, hist.activeIndex - 1 );
				dst = hist.stack[ idx ].pageUrl || hist.stack[ idx ].url;
				hist.previousIndex = hist.activeIndex;
				hist.activeIndex = idx;
				if ( !$.mobile.path.isPath( dst ) ) {
					dst = $.mobile.path.makeUrlAbsolute( "#" + dst );
				}

				$.mobile.changePage( dst, { direction: "back", changeHash: false, fromHashChange: true } );
			}
		}
	}
});

//auto self-init widgets
$.mobile.document.delegate( $.mobile.dialog.prototype.options.initSelector, "pagecreate", function() {
	$.mobile.dialog.prototype.enhance( this );
});

})( jQuery, this );

(function( $, undefined ) {

$.mobile.page.prototype.options.backBtnText  = "Back";
$.mobile.page.prototype.options.addBackBtn   = false;
$.mobile.page.prototype.options.backBtnTheme = null;
$.mobile.page.prototype.options.headerTheme  = "a";
$.mobile.page.prototype.options.footerTheme  = "a";
$.mobile.page.prototype.options.contentTheme = null;

// NOTE bind used to force this binding to run before the buttonMarkup binding
//      which expects .ui-footer top be applied in its gigantic selector
// TODO remove the buttonMarkup giant selector and move it to the various modules
//      on which it depends
$.mobile.document.bind( "pagecreate", function( e ) {
	var $page = $( e.target ),
		o = $page.data( "mobile-page" ).options,
		pageRole = $page.jqmData( "role" ),
		pageTheme = o.theme;

	$( ":jqmData(role='header'), :jqmData(role='footer'), :jqmData(role='content')", $page )
		.jqmEnhanceable()
		.each(function() {

		var $this = $( this ),
			role = $this.jqmData( "role" ),
			theme = $this.jqmData( "theme" ),
			contentTheme = theme || o.contentTheme || ( pageRole === "dialog" && pageTheme ),
			$headeranchors,
			leftbtn,
			rightbtn,
			backBtn;

		$this.addClass( "ui-" + role );

		//apply theming and markup modifications to page,header,content,footer
		if ( role === "header" || role === "footer" ) {

			var thisTheme = theme || ( role === "header" ? o.headerTheme : o.footerTheme ) || pageTheme;

			$this
				//add theme class
				.addClass( "ui-bar-" + thisTheme )
				// Add ARIA role
				.attr( "role", role === "header" ? "banner" : "contentinfo" );

			if ( role === "header") {
				// Right,left buttons
				$headeranchors	= $this.children( "a, button" );
				leftbtn	= $headeranchors.hasClass( "ui-btn-left" );
				rightbtn = $headeranchors.hasClass( "ui-btn-right" );

				leftbtn = leftbtn || $headeranchors.eq( 0 ).not( ".ui-btn-right" ).addClass( "ui-btn-left" ).length;

				rightbtn = rightbtn || $headeranchors.eq( 1 ).addClass( "ui-btn-right" ).length;
			}

			// Auto-add back btn on pages beyond first view
			if ( o.addBackBtn &&
				role === "header" &&
				$( ".ui-page" ).length > 1 &&
				$page.jqmData( "url" ) !== $.mobile.path.stripHash( location.hash ) &&
				!leftbtn ) {

				backBtn = $( "<a href='javascript:void(0);' class='ui-btn-left' data-"+ $.mobile.ns +"rel='back' data-"+ $.mobile.ns +"icon='arrow-l'>"+ o.backBtnText +"</a>" )
					// If theme is provided, override default inheritance
					.attr( "data-"+ $.mobile.ns +"theme", o.backBtnTheme || thisTheme )
					.prependTo( $this );
			}

			// Page title
			$this.children( "h1, h2, h3, h4, h5, h6" )
				.addClass( "ui-title" )
				// Regardless of h element number in src, it becomes h1 for the enhanced page
				.attr({
					"role": "heading",
					"aria-level": "1"
				});

		} else if ( role === "content" ) {
			if ( contentTheme ) {
				$this.addClass( "ui-body-" + ( contentTheme ) );
			}

			// Add ARIA role
			$this.attr( "role", "main" );
		}
	});
});

})( jQuery );

(function( $, undefined ) {

// This function calls getAttribute, which should be safe for data-* attributes
var getAttrFixed = function( e, key ) {
	var value = e.getAttribute( key );

	return value === "true" ? true :
		value === "false" ? false :
		value === null ? undefined : value;
};

$.fn.buttonMarkup = function( options ) {
	var $workingSet = this,
		nsKey = "data-" + $.mobile.ns,
		key;

	// Enforce options to be of type string
	options = ( options && ( $.type( options ) === "object" ) )? options : {};
	for ( var i = 0; i < $workingSet.length; i++ ) {
		var el = $workingSet.eq( i ),
			e = el[ 0 ],
			o = $.extend( {}, $.fn.buttonMarkup.defaults, {
				icon:       options.icon       !== undefined ? options.icon       : getAttrFixed( e, nsKey + "icon" ),
				iconpos:    options.iconpos    !== undefined ? options.iconpos    : getAttrFixed( e, nsKey + "iconpos" ),
				theme:      options.theme      !== undefined ? options.theme      : getAttrFixed( e, nsKey + "theme" ) || $.mobile.getInheritedTheme( el, "c" ),
				inline:     options.inline     !== undefined ? options.inline     : getAttrFixed( e, nsKey + "inline" ),
				shadow:     options.shadow     !== undefined ? options.shadow     : getAttrFixed( e, nsKey + "shadow" ),
				corners:    options.corners    !== undefined ? options.corners    : getAttrFixed( e, nsKey + "corners" ),
				iconshadow: options.iconshadow !== undefined ? options.iconshadow : getAttrFixed( e, nsKey + "iconshadow" ),
				mini:       options.mini       !== undefined ? options.mini       : getAttrFixed( e, nsKey + "mini" )
			}, options ),

			// Classes Defined
			innerClass = "ui-btn-inner",
			textClass = "ui-btn-text",
			buttonClass, iconClass,
			hover = false,
			state = "up",
			// Button inner markup
			buttonInner,
			buttonText,
			buttonIcon,
			buttonElements;

		for ( key in o ) {
			if ( o[ key ] === undefined || o[ key ] === null ) {
				el.removeAttr( nsKey + key );
			} else {
				e.setAttribute( nsKey + key, o[ key ] );
			}
		}

		// Check if this element is already enhanced
		buttonElements = $.data( ( ( e.tagName === "INPUT" || e.tagName === "BUTTON" ) ? e.parentNode : e ), "buttonElements" );

		if ( buttonElements ) {
			e = buttonElements.outer;
			el = $( e );
			buttonInner = buttonElements.inner;
			buttonText = buttonElements.text;
			// We will recreate this icon below
			$( buttonElements.icon ).remove();
			buttonElements.icon = null;
			hover = buttonElements.hover;
			state = buttonElements.state;
		}
		else {
			buttonInner = document.createElement( o.wrapperEls );
			buttonText = document.createElement( o.wrapperEls );
		}
		buttonIcon = o.icon ? document.createElement( "span" ) : null;

		if ( attachEvents && !buttonElements ) {
			attachEvents();
		}

		// if not, try to find closest theme container
		if ( !o.theme ) {
			o.theme = $.mobile.getInheritedTheme( el, "c" );
		}

		buttonClass = "ui-btn ";
		buttonClass += ( hover ? "ui-btn-hover-" + o.theme : "" );
		buttonClass += ( state ? " ui-btn-" + state + "-" + o.theme : "" );
		buttonClass += o.shadow ? " ui-shadow" : "";
		buttonClass += o.corners ? " ui-btn-corner-all" : "";

		if ( o.mini !== undefined ) {
			// Used to control styling in headers/footers, where buttons default to `mini` style.
			buttonClass += o.mini === true ? " ui-mini" : " ui-fullsize";
		}

		if ( o.inline !== undefined ) {
			// Used to control styling in headers/footers, where buttons default to `inline` style.
			buttonClass += o.inline === true ? " ui-btn-inline" : " ui-btn-block";
		}

		if ( o.icon ) {
			o.icon = "ui-icon-" + o.icon;
			o.iconpos = o.iconpos || "left";

			iconClass = "ui-icon " + o.icon;

			if ( o.iconshadow ) {
				iconClass += " ui-icon-shadow";
			}
		}

		if ( o.iconpos ) {
			buttonClass += " ui-btn-icon-" + o.iconpos;

			if ( o.iconpos === "notext" && !el.attr( "title" ) ) {
				el.attr( "title", el.getEncodedText() );
			}
		}

		if ( buttonElements ) {
			el.removeClass( buttonElements.bcls || "" );
		}
		el.removeClass( "ui-link" ).addClass( buttonClass );

		buttonInner.className = innerClass;
		buttonText.className = textClass;
		if ( !buttonElements ) {
			buttonInner.appendChild( buttonText );
		}
		if ( buttonIcon ) {
			buttonIcon.className = iconClass;
			if ( !( buttonElements && buttonElements.icon ) ) {
				buttonIcon.innerHTML = "&#160;";
				buttonInner.appendChild( buttonIcon );
			}
		}

		while ( e.firstChild && !buttonElements ) {
			buttonText.appendChild( e.firstChild );
		}

		if ( !buttonElements ) {
			e.appendChild( buttonInner );
		}

		// Assign a structure containing the elements of this button to the elements of this button. This
		// will allow us to recognize this as an already-enhanced button in future calls to buttonMarkup().
		buttonElements = {
			hover : hover,
			state : state,
			bcls  : buttonClass,
			outer : e,
			inner : buttonInner,
			text  : buttonText,
			icon  : buttonIcon
		};

		$.data( e,           'buttonElements', buttonElements );
		$.data( buttonInner, 'buttonElements', buttonElements );
		$.data( buttonText,  'buttonElements', buttonElements );
		if ( buttonIcon ) {
			$.data( buttonIcon, 'buttonElements', buttonElements );
		}
	}

	return this;
};

$.fn.buttonMarkup.defaults = {
	corners: true,
	shadow: true,
	iconshadow: true,
	wrapperEls: "span"
};

function closestEnabledButton( element ) {
    var cname;

    while ( element ) {
		// Note that we check for typeof className below because the element we
		// handed could be in an SVG DOM where className on SVG elements is defined to
		// be of a different type (SVGAnimatedString). We only operate on HTML DOM
		// elements, so we look for plain "string".
        cname = ( typeof element.className === 'string' ) && ( element.className + ' ' );
        if ( cname && cname.indexOf( "ui-btn " ) > -1 && cname.indexOf( "ui-disabled " ) < 0 ) {
            break;
        }

        element = element.parentNode;
    }

    return element;
}

function updateButtonClass( $btn, classToRemove, classToAdd, hover, state ) {
	var buttonElements = $.data( $btn[ 0 ], "buttonElements" );
	$btn.removeClass( classToRemove ).addClass( classToAdd );
	if ( buttonElements ) {
		buttonElements.bcls = $( document.createElement( "div" ) )
			.addClass( buttonElements.bcls + " " + classToAdd )
			.removeClass( classToRemove )
			.attr( "class" );
		if ( hover !== undefined ) {
			buttonElements.hover = hover;
		}
		buttonElements.state = state;
	}
}

var attachEvents = function() {
	var hoverDelay = $.mobile.buttonMarkup.hoverDelay, hov, foc;

	$.mobile.document.bind( {
		"vmousedown vmousecancel vmouseup vmouseover vmouseout focus blur scrollstart": function( event ) {
			var theme,
				$btn = $( closestEnabledButton( event.target ) ),
				isTouchEvent = event.originalEvent && /^touch/.test( event.originalEvent.type ),
				evt = event.type;

			if ( $btn.length ) {
				theme = $btn.attr( "data-" + $.mobile.ns + "theme" );

				if ( evt === "vmousedown" ) {
					if ( isTouchEvent ) {
						// Use a short delay to determine if the user is scrolling before highlighting
						hov = setTimeout( function() {
							updateButtonClass( $btn, "ui-btn-up-" + theme, "ui-btn-down-" + theme, undefined, "down" );
						}, hoverDelay );
					} else {
						updateButtonClass( $btn, "ui-btn-up-" + theme, "ui-btn-down-" + theme, undefined, "down" );
					}
				} else if ( evt === "vmousecancel" || evt === "vmouseup" ) {
					updateButtonClass( $btn, "ui-btn-down-" + theme, "ui-btn-up-" + theme, undefined, "up" );
				} else if ( evt === "vmouseover" || evt === "focus" ) {
					if ( isTouchEvent ) {
						// Use a short delay to determine if the user is scrolling before highlighting
						foc = setTimeout( function() {
							updateButtonClass( $btn, "ui-btn-up-" + theme, "ui-btn-hover-" + theme, true, "" );
						}, hoverDelay );
					} else {
						updateButtonClass( $btn, "ui-btn-up-" + theme, "ui-btn-hover-" + theme, true, "" );
					}
				} else if ( evt === "vmouseout" || evt === "blur" || evt === "scrollstart" ) {
					updateButtonClass( $btn, "ui-btn-hover-" + theme  + " ui-btn-down-" + theme, "ui-btn-up-" + theme, false, "up" );
					if ( hov ) {
						clearTimeout( hov );
					}
					if ( foc ) {
						clearTimeout( foc );
					}
				}
			}
		},
		"focusin focus": function( event ) {
			$( closestEnabledButton( event.target ) ).addClass( $.mobile.focusClass );
		},
		"focusout blur": function( event ) {
			$( closestEnabledButton( event.target ) ).removeClass( $.mobile.focusClass );
		}
	});

	attachEvents = null;
};

//links in bars, or those with  data-role become buttons
//auto self-init widgets
$.mobile.document.bind( "pagecreate create", function( e ) {

	$( ":jqmData(role='button'), .ui-bar > a, .ui-header > a, .ui-footer > a, .ui-bar > :jqmData(role='controlgroup') > a", e.target )
		.jqmEnhanceable()
		.not( "button, input, .ui-btn, :jqmData(role='none'), :jqmData(role='nojs')" )
		.buttonMarkup();
});

})( jQuery );


(function( $, undefined ) {

$.widget( "mobile.collapsible", $.mobile.widget, {
	options: {
		expandCueText: " click to expand contents",
		collapseCueText: " click to collapse contents",
		collapsed: true,
		heading: "h1,h2,h3,h4,h5,h6,legend",
		collapsedIcon: "plus",
		expandedIcon: "minus",
		iconpos: "left",
		theme: null,
		contentTheme: null,
		inset: true,
		corners: true,
		mini: false,
		initSelector: ":jqmData(role='collapsible')"
	},
	_create: function() {

		var $el = this.element,
			o = this.options,
			collapsible = $el.addClass( "ui-collapsible" ),
			collapsibleHeading = $el.children( o.heading ).first(),
			collapsibleContent = collapsible.wrapInner( "<div class='ui-collapsible-content'></div>" ).children( ".ui-collapsible-content" ),
			collapsibleSet = $el.closest( ":jqmData(role='collapsible-set')" ).addClass( "ui-collapsible-set" ),
			collapsibleClasses = "";

		// Replace collapsibleHeading if it's a legend
		if ( collapsibleHeading.is( "legend" ) ) {
			collapsibleHeading = $( "<div role='heading'>"+ collapsibleHeading.html() +"</div>" ).insertBefore( collapsibleHeading );
			collapsibleHeading.next().remove();
		}

		// If we are in a collapsible set
		if ( collapsibleSet.length ) {
			// Inherit the theme from collapsible-set
			if ( !o.theme ) {
				o.theme = collapsibleSet.jqmData( "theme" ) || $.mobile.getInheritedTheme( collapsibleSet, "c" );
			}
			// Inherit the content-theme from collapsible-set
			if ( !o.contentTheme ) {
				o.contentTheme = collapsibleSet.jqmData( "content-theme" );
			}

			// Get the preference for collapsed icon in the set, but override with data- attribute on the individual collapsible
			o.collapsedIcon = $el.jqmData( "collapsed-icon" ) || collapsibleSet.jqmData( "collapsed-icon" ) || o.collapsedIcon;

			// Get the preference for expanded icon in the set, but override with data- attribute on the individual collapsible
			o.expandedIcon = $el.jqmData( "expanded-icon" ) || collapsibleSet.jqmData( "expanded-icon" ) || o.expandedIcon;

			// Gets the preference icon position in the set, but override with data- attribute on the individual collapsible
			o.iconpos = $el.jqmData( "iconpos" ) || collapsibleSet.jqmData( "iconpos" ) || o.iconpos;

			// Inherit the preference for inset from collapsible-set or set the default value to ensure equalty within a set
			if ( collapsibleSet.jqmData( "inset" ) !== undefined ) {
				o.inset = collapsibleSet.jqmData( "inset" );
			} else {
				o.inset = true;
			}
			// Set corners for individual collapsibles to false when in a collapsible-set
			o.corners = false;
			// Gets the preference for mini in the set
			if ( !o.mini ) {
				o.mini = collapsibleSet.jqmData( "mini" );
			}
		} else {
			// get inherited theme if not a set and no theme has been set
			if ( !o.theme ) {
				o.theme = $.mobile.getInheritedTheme( $el, "c" );
			}
		}

		if ( !!o.inset ) {
			collapsibleClasses += " ui-collapsible-inset";
			if ( !!o.corners ) {
				collapsibleClasses += " ui-corner-all" ;
			}
		}
		if ( o.contentTheme ) {
			collapsibleClasses += " ui-collapsible-themed-content";
			collapsibleContent.addClass( "ui-body-" + o.contentTheme );
		}
		if ( collapsibleClasses !== "" ) {
			collapsible.addClass( collapsibleClasses );
		}
		
		collapsibleHeading
			//drop heading in before content
			.insertBefore( collapsibleContent )
			//modify markup & attributes
			.addClass( "ui-collapsible-heading" )
			.append( "<span class='ui-collapsible-heading-status'></span>" )
			.wrapInner( "<a href='#' class='ui-collapsible-heading-toggle'></a>" )
			.find( "a" )
				.first()
				.buttonMarkup({
					shadow: false,
					corners: false,
					iconpos: o.iconpos,
					icon: o.collapsedIcon,
					mini: o.mini,
					theme: o.theme
				});

		//events
		collapsible
			.bind( "expand collapse", function( event ) {
				if ( !event.isDefaultPrevented() ) {
					var $this = $( this ),
						isCollapse = ( event.type === "collapse" );

					event.preventDefault();

					collapsibleHeading
						.toggleClass( "ui-collapsible-heading-collapsed", isCollapse )
						.find( ".ui-collapsible-heading-status" )
							.text( isCollapse ? o.expandCueText : o.collapseCueText )
						.end()
						.find( ".ui-icon" )
							.toggleClass( "ui-icon-" + o.expandedIcon, !isCollapse )
							// logic or cause same icon for expanded/collapsed state would remove the ui-icon-class
							.toggleClass( "ui-icon-" + o.collapsedIcon, ( isCollapse || o.expandedIcon === o.collapsedIcon ) )
						.end()
						.find( "a" ).first().removeClass( $.mobile.activeBtnClass );

					$this.toggleClass( "ui-collapsible-collapsed", isCollapse );
					collapsibleContent.toggleClass( "ui-collapsible-content-collapsed", isCollapse ).attr( "aria-hidden", isCollapse );

					collapsibleContent.trigger( "updatelayout" );
				}
			})
			.trigger( o.collapsed ? "collapse" : "expand" );

		collapsibleHeading
			.bind( "tap", function( event ) {
				collapsibleHeading.find( "a" ).first().addClass( $.mobile.activeBtnClass );
			})
			.bind( "click", function( event ) {

				var type = collapsibleHeading.is( ".ui-collapsible-heading-collapsed" ) ? "expand" : "collapse";

				collapsible.trigger( type );

				event.preventDefault();
				event.stopPropagation();
			});
	}
});

//auto self-init widgets
$.mobile.document.bind( "pagecreate create", function( e ) {
	$.mobile.collapsible.prototype.enhanceWithin( e.target );
});

})( jQuery );

(function( $, undefined ) {

$.mobile.behaviors.addFirstLastClasses = {
	_getVisibles: function( $els, create ) {
		var visibles;

		if ( create ) {
			visibles = $els.not( ".ui-screen-hidden" );
		} else {
			visibles = $els.filter( ":visible" );
			if ( visibles.length === 0 ) {
				visibles = $els.not( ".ui-screen-hidden" );
			}
		}

		return visibles;
	},

	_addFirstLastClasses: function( $els, $visibles, create ) {
		$els.removeClass( "ui-first-child ui-last-child" );
		$visibles.eq( 0 ).addClass( "ui-first-child" ).end().last().addClass( "ui-last-child" );
		if ( !create ) {
			this.element.trigger( "updatelayout" );
		}
	}
};

})( jQuery );

(function( $, undefined ) {

$.widget( "mobile.collapsibleset", $.mobile.widget, $.extend( {
	options: {
		initSelector: ":jqmData(role='collapsible-set')"
	},
	_create: function() {
		var $el = this.element.addClass( "ui-collapsible-set" ),
			o = this.options;

		// Inherit the theme from collapsible-set
		if ( !o.theme ) {
			o.theme = $.mobile.getInheritedTheme( $el, "c" );
		}
		// Inherit the content-theme from collapsible-set
		if ( !o.contentTheme ) {
			o.contentTheme = $el.jqmData( "content-theme" );
		}
		// Inherit the corner styling from collapsible-set
		if ( !o.corners ) {
			o.corners = $el.jqmData( "corners" );
		}
		
		if ( $el.jqmData( "inset" ) !== undefined ) {
			o.inset = $el.jqmData( "inset" );
		}
		o.inset = o.inset !== undefined ? o.inset : true;
		o.corners = o.corners !== undefined ? o.corners : true;
		
		if ( !!o.corners && !!o.inset ) {
			$el.addClass( "ui-corner-all" );
		}

		// Initialize the collapsible set if it's not already initialized
		if ( !$el.jqmData( "collapsiblebound" ) ) {
			$el
				.jqmData( "collapsiblebound", true )
				.bind( "expand", function( event ) {
					var closestCollapsible = $( event.target )
						.closest( ".ui-collapsible" );
					if ( closestCollapsible.parent().is( ":jqmData(role='collapsible-set')" ) ) {
						closestCollapsible
							.siblings( ".ui-collapsible" )
							.trigger( "collapse" );
					}
				});
		}
	},

	_init: function() {
		var $el = this.element,
			collapsiblesInSet = $el.children( ":jqmData(role='collapsible')" ),
			expanded = collapsiblesInSet.filter( ":jqmData(collapsed='false')" );
		this._refresh( "true" );

		// Because the corners are handled by the collapsible itself and the default state is collapsed
		// That was causing https://github.com/jquery/jquery-mobile/issues/4116
		expanded.trigger( "expand" );
	},

	_refresh: function( create ) {
		var collapsiblesInSet = this.element.children( ":jqmData(role='collapsible')" );

		$.mobile.collapsible.prototype.enhance( collapsiblesInSet.not( ".ui-collapsible" ) );

		this._addFirstLastClasses( collapsiblesInSet, this._getVisibles( collapsiblesInSet, create ), create );
	},

	refresh: function() {
		this._refresh( false );
	}
}, $.mobile.behaviors.addFirstLastClasses ) );

//auto self-init widgets
$.mobile.document.bind( "pagecreate create", function( e ) {
	$.mobile.collapsibleset.prototype.enhanceWithin( e.target );
});

})( jQuery );

(function( $, undefined ) {

// filter function removes whitespace between label and form element so we can use inline-block (nodeType 3 = text)
$.fn.fieldcontain = function( options ) {
	return this
		.addClass( "ui-field-contain ui-body ui-br" )
		.contents().filter( function() {
			return ( this.nodeType === 3 && !/\S/.test( this.nodeValue ) );
		}).remove();
};

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ) {
	$( ":jqmData(role='fieldcontain')", e.target ).jqmEnhanceable().fieldcontain();
});

})( jQuery );

(function( $, undefined ) {

$.fn.grid = function( options ) {
	return this.each(function() {

		var $this = $( this ),
			o = $.extend({
				grid: null
			}, options ),
			$kids = $this.children(),
			gridCols = { solo:1, a:2, b:3, c:4, d:5 },
			grid = o.grid,
			iterator;

			if ( !grid ) {
				if ( $kids.length <= 5 ) {
					for ( var letter in gridCols ) {
						if ( gridCols[ letter ] === $kids.length ) {
							grid = letter;
						}
					}
				} else {
					grid = "a";
					$this.addClass( "ui-grid-duo" );
				}
			}
			iterator = gridCols[grid];

		$this.addClass( "ui-grid-" + grid );

		$kids.filter( ":nth-child(" + iterator + "n+1)" ).addClass( "ui-block-a" );

		if ( iterator > 1 ) {
			$kids.filter( ":nth-child(" + iterator + "n+2)" ).addClass( "ui-block-b" );
		}
		if ( iterator > 2 ) {
			$kids.filter( ":nth-child(" + iterator + "n+3)" ).addClass( "ui-block-c" );
		}
		if ( iterator > 3 ) {
			$kids.filter( ":nth-child(" + iterator + "n+4)" ).addClass( "ui-block-d" );
		}
		if ( iterator > 4 ) {
			$kids.filter( ":nth-child(" + iterator + "n+5)" ).addClass( "ui-block-e" );
		}
	});
};
})( jQuery );

(function( $, undefined ) {

$.widget( "mobile.navbar", $.mobile.widget, {
	options: {
		iconpos: "top",
		grid: null,
		initSelector: ":jqmData(role='navbar')"
	},

	_create: function() {

		var $navbar = this.element,
			$navbtns = $navbar.find( "a" ),
			iconpos = $navbtns.filter( ":jqmData(icon)" ).length ?
									this.options.iconpos : undefined;

		$navbar.addClass( "ui-navbar ui-mini" )
			.attr( "role", "navigation" )
			.find( "ul" )
			.jqmEnhanceable()
			.grid({ grid: this.options.grid });

		$navbtns.buttonMarkup({
			corners:	false,
			shadow:		false,
			inline:     true,
			iconpos:	iconpos
		});

		$navbar.delegate( "a", "vclick", function( event ) {
			// ui-btn-inner is returned as target
			var target = $( event.target ).is( "a" ) ? $( this ) : $( this ).parent( "a" );
			
			if ( !target.is( ".ui-disabled, .ui-btn-active" ) ) {
				$navbtns.removeClass( $.mobile.activeBtnClass );
				$( this ).addClass( $.mobile.activeBtnClass );
				
				// The code below is a workaround to fix #1181
				var activeBtn = $( this );
				
				$( document ).one( "pagehide", function() {
					activeBtn.removeClass( $.mobile.activeBtnClass );
				});
			}
		});

		// Buttons in the navbar with ui-state-persist class should regain their active state before page show
		$navbar.closest( ".ui-page" ).bind( "pagebeforeshow", function() {
			$navbtns.filter( ".ui-state-persist" ).addClass( $.mobile.activeBtnClass );
		});
	}
});

//auto self-init widgets
$.mobile.document.bind( "pagecreate create", function( e ) {
	$.mobile.navbar.prototype.enhanceWithin( e.target );
});

})( jQuery );

(function( $, undefined ) {

//Keeps track of the number of lists per page UID
//This allows support for multiple nested list in the same page
//https://github.com/jquery/jquery-mobile/issues/1617
var listCountPerPage = {};

$.widget( "mobile.listview", $.mobile.widget, $.extend( {

	options: {
		theme: null,
		countTheme: "c",
		headerTheme: "b",
		dividerTheme: "b",
		icon: "arrow-r",
		splitIcon: "arrow-r",
		splitTheme: "b",
		corners: true,
		shadow: true,
		inset: false,
		initSelector: ":jqmData(role='listview')"
	},

	_create: function() {
		var t = this,
			listviewClasses = "";

		listviewClasses += t.options.inset ? " ui-listview-inset" : "";

		if ( !!t.options.inset ) {
			listviewClasses += t.options.corners ? " ui-corner-all" : "";
			listviewClasses += t.options.shadow ? " ui-shadow" : "";
		}

		// create listview markup
		t.element.addClass(function( i, orig ) {
			return orig + " ui-listview" + listviewClasses;
		});

		t.refresh( true );
	},

	// This is a generic utility method for finding the first
	// node with a given nodeName. It uses basic DOM traversal
	// to be fast and is meant to be a substitute for simple
	// $.fn.closest() and $.fn.children() calls on a single
	// element. Note that callers must pass both the lowerCase
	// and upperCase version of the nodeName they are looking for.
	// The main reason for this is that this function will be
	// called many times and we want to avoid having to lowercase
	// the nodeName from the element every time to ensure we have
	// a match. Note that this function lives here for now, but may
	// be moved into $.mobile if other components need a similar method.
	_findFirstElementByTagName: function( ele, nextProp, lcName, ucName ) {
		var dict = {};
		dict[ lcName ] = dict[ ucName ] = true;
		while ( ele ) {
			if ( dict[ ele.nodeName ] ) {
				return ele;
			}
			ele = ele[ nextProp ];
		}
		return null;
	},
	_getChildrenByTagName: function( ele, lcName, ucName ) {
		var results = [],
			dict = {};
		dict[ lcName ] = dict[ ucName ] = true;
		ele = ele.firstChild;
		while ( ele ) {
			if ( dict[ ele.nodeName ] ) {
				results.push( ele );
			}
			ele = ele.nextSibling;
		}
		return $( results );
	},

	_addThumbClasses: function( containers ) {
		var i, img, len = containers.length;
		for ( i = 0; i < len; i++ ) {
			img = $( this._findFirstElementByTagName( containers[ i ].firstChild, "nextSibling", "img", "IMG" ) );
			if ( img.length ) {
				img.addClass( "ui-li-thumb" );
				$( this._findFirstElementByTagName( img[ 0 ].parentNode, "parentNode", "li", "LI" ) ).addClass( img.is( ".ui-li-icon" ) ? "ui-li-has-icon" : "ui-li-has-thumb" );
			}
		}
	},

	refresh: function( create ) {
		this.parentPage = this.element.closest( ".ui-page" );
		this._createSubPages();

		var o = this.options,
			$list = this.element,
			self = this,
			dividertheme = $list.jqmData( "dividertheme" ) || o.dividerTheme,
			listsplittheme = $list.jqmData( "splittheme" ),
			listspliticon = $list.jqmData( "spliticon" ),
			listicon = $list.jqmData( "icon" ),
			li = this._getChildrenByTagName( $list[ 0 ], "li", "LI" ),
			ol = !!$.nodeName( $list[ 0 ], "ol" ),
			jsCount = !$.support.cssPseudoElement,
			start = $list.attr( "start" ),
			itemClassDict = {},
			item, itemClass, itemTheme,
			a, last, splittheme, counter, startCount, newStartCount, countParent, icon, imgParents, img, linkIcon;

		if ( ol && jsCount ) {
			$list.find( ".ui-li-dec" ).remove();
		}

		if ( ol ) {
			// Check if a start attribute has been set while taking a value of 0 into account
			if ( start || start === 0 ) {
				if ( !jsCount ) {
					startCount = parseInt( start , 10 ) - 1;
					$list.css( "counter-reset", "listnumbering " + startCount );
				} else {
					counter = parseInt( start , 10 );
				}
			} else if ( jsCount ) {
					counter = 1;
			}
		}

		if ( !o.theme ) {
			o.theme = $.mobile.getInheritedTheme( this.element, "c" );
		}

		for ( var pos = 0, numli = li.length; pos < numli; pos++ ) {
			item = li.eq( pos );
			itemClass = "ui-li";

			// If we're creating the element, we update it regardless
			if ( create || !item.hasClass( "ui-li" ) ) {
				itemTheme = item.jqmData( "theme" ) || o.theme;
				a = this._getChildrenByTagName( item[ 0 ], "a", "A" );
				var isDivider = ( item.jqmData( "role" ) === "list-divider" );

				if ( a.length && !isDivider ) {
					icon = item.jqmData( "icon" );

					item.buttonMarkup({
						wrapperEls: "div",
						shadow: false,
						corners: false,
						iconpos: "right",
						icon: a.length > 1 || icon === false ? false : icon || listicon || o.icon,
						theme: itemTheme
					});

					if ( ( icon !== false ) && ( a.length === 1 ) ) {
						item.addClass( "ui-li-has-arrow" );
					}

					a.first().removeClass( "ui-link" ).addClass( "ui-link-inherit" );

					if ( a.length > 1 ) {
						itemClass += " ui-li-has-alt";

						last = a.last();
						splittheme = listsplittheme || last.jqmData( "theme" ) || o.splitTheme;
						linkIcon = last.jqmData( "icon" );

						last.appendTo( item )
							.attr( "title", $.trim(last.getEncodedText()) )
							.addClass( "ui-li-link-alt" )
							.empty()
							.buttonMarkup({
								shadow: false,
								corners: false,
								theme: itemTheme,
								icon: false,
								iconpos: "notext"
							})
							.find( ".ui-btn-inner" )
								.append(
									$( document.createElement( "span" ) ).buttonMarkup({
										shadow: true,
										corners: true,
										theme: splittheme,
										iconpos: "notext",
										// link icon overrides list item icon overrides ul element overrides options
										icon: linkIcon || icon || listspliticon || o.splitIcon
									})
								);
					}
				} else if ( isDivider ) {

					itemClass += " ui-li-divider ui-bar-" + ( item.jqmData( "theme" ) || dividertheme );
					item.attr( "role", "heading" );

					if ( ol ) {
						//reset counter when a divider heading is encountered
						if ( start || start === 0 ) {
							if ( !jsCount ) {
								newStartCount = parseInt( start , 10 ) - 1;
								item.css( "counter-reset", "listnumbering " + newStartCount );
							} else {
								counter = parseInt( start , 10 );
							}
						} else if ( jsCount ) {
								counter = 1;
						}
					}

				} else {
					itemClass += " ui-li-static ui-btn-up-" + itemTheme;
				}
			}

			if ( ol && jsCount && itemClass.indexOf( "ui-li-divider" ) < 0 ) {
				countParent = itemClass.indexOf( "ui-li-static" ) > 0 ? item : item.find( ".ui-link-inherit" );

				countParent.addClass( "ui-li-jsnumbering" )
					.prepend( "<span class='ui-li-dec'>" + ( counter++ ) + ". </span>" );
			}

			// Instead of setting item class directly on the list item and its
			// btn-inner at this point in time, push the item into a dictionary
			// that tells us what class to set on it so we can do this after this
			// processing loop is finished.

			if ( !itemClassDict[ itemClass ] ) {
				itemClassDict[ itemClass ] = [];
			}

			itemClassDict[ itemClass ].push( item[ 0 ] );
		}

		// Set the appropriate listview item classes on each list item
		// and their btn-inner elements. The main reason we didn't do this
		// in the for-loop above is because we can eliminate per-item function overhead
		// by calling addClass() and children() once or twice afterwards. This
		// can give us a significant boost on platforms like WP7.5.

		for ( itemClass in itemClassDict ) {
			$( itemClassDict[ itemClass ] ).addClass( itemClass ).children( ".ui-btn-inner" ).addClass( itemClass );
		}

		$list.find( "h1, h2, h3, h4, h5, h6" ).addClass( "ui-li-heading" )
			.end()

			.find( "p, dl" ).addClass( "ui-li-desc" )
			.end()

			.find( ".ui-li-aside" ).each(function() {
					var $this = $( this );
					$this.prependTo( $this.parent() ); //shift aside to front for css float
				})
			.end()

			.find( ".ui-li-count" ).each(function() {
					$( this ).closest( "li" ).addClass( "ui-li-has-count" );
				}).addClass( "ui-btn-up-" + ( $list.jqmData( "counttheme" ) || this.options.countTheme) + " ui-btn-corner-all" );

		// The idea here is to look at the first image in the list item
		// itself, and any .ui-link-inherit element it may contain, so we
		// can place the appropriate classes on the image and list item.
		// Note that we used to use something like:
		//
		//    li.find(">img:eq(0), .ui-link-inherit>img:eq(0)").each( ... );
		//
		// But executing a find() like that on Windows Phone 7.5 took a
		// really long time. Walking things manually with the code below
		// allows the 400 listview item page to load in about 3 seconds as
		// opposed to 30 seconds.

		this._addThumbClasses( li );
		this._addThumbClasses( $list.find( ".ui-link-inherit" ) );

		this._addFirstLastClasses( li, this._getVisibles( li, create ), create );
		// autodividers binds to this to redraw dividers after the listview refresh
		this._trigger( "afterrefresh" );
	},

	//create a string for ID/subpage url creation
	_idStringEscape: function( str ) {
		return str.replace(/[^a-zA-Z0-9]/g, '-');
	},

	_createSubPages: function() {
		var parentList = this.element,
			parentPage = parentList.closest( ".ui-page" ),
			parentUrl = parentPage.jqmData( "url" ),
			parentId = parentUrl || parentPage[ 0 ][ $.expando ],
			parentListId = parentList.attr( "id" ),
			o = this.options,
			dns = "data-" + $.mobile.ns,
			self = this,
			persistentFooterID = parentPage.find( ":jqmData(role='footer')" ).jqmData( "id" ),
			hasSubPages;

		if ( typeof listCountPerPage[ parentId ] === "undefined" ) {
			listCountPerPage[ parentId ] = -1;
		}

		parentListId = parentListId || ++listCountPerPage[ parentId ];

		$( parentList.find( "li>ul, li>ol" ).toArray().reverse() ).each(function( i ) {
			var self = this,
				list = $( this ),
				listId = list.attr( "id" ) || parentListId + "-" + i,
				parent = list.parent(),
				nodeElsFull = $( list.prevAll().toArray().reverse() ),
				nodeEls = nodeElsFull.length ? nodeElsFull : $( "<span>" + $.trim(parent.contents()[ 0 ].nodeValue) + "</span>" ),
				title = nodeEls.first().getEncodedText(),//url limits to first 30 chars of text
				id = ( parentUrl || "" ) + "&" + $.mobile.subPageUrlKey + "=" + listId,
				theme = list.jqmData( "theme" ) || o.theme,
				countTheme = list.jqmData( "counttheme" ) || parentList.jqmData( "counttheme" ) || o.countTheme,
				newPage, anchor;

			//define hasSubPages for use in later removal
			hasSubPages = true;

			newPage = list.detach()
						.wrap( "<div " + dns + "role='page' " + dns + "url='" + id + "' " + dns + "theme='" + theme + "' " + dns + "count-theme='" + countTheme + "'><div " + dns + "role='content'></div></div>" )
						.parent()
							.before( "<div " + dns + "role='header' " + dns + "theme='" + o.headerTheme + "'><div class='ui-title'>" + title + "</div></div>" )
							.after( persistentFooterID ? $( "<div " + dns + "role='footer' " + dns + "id='"+ persistentFooterID +"'>" ) : "" )
							.parent()
								.appendTo( $.mobile.pageContainer );

			newPage.page();

			anchor = parent.find( 'a:first' );

			if ( !anchor.length ) {
				anchor = $( "<a/>" ).html( nodeEls || title ).prependTo( parent.empty() );
			}

			anchor.attr( "href", "#" + id );

		}).listview();

		// on pagehide, remove any nested pages along with the parent page, as long as they aren't active
		// and aren't embedded
		if ( hasSubPages &&
			parentPage.is( ":jqmData(external-page='true')" ) &&
			parentPage.data( "mobile-page" ).options.domCache === false ) {

			var newRemove = function( e, ui ) {
				var nextPage = ui.nextPage, npURL,
					prEvent = new $.Event( "pageremove" );

				if ( ui.nextPage ) {
					npURL = nextPage.jqmData( "url" );
					if ( npURL.indexOf( parentUrl + "&" + $.mobile.subPageUrlKey ) !== 0 ) {
						self.childPages().remove();
						parentPage.trigger( prEvent );
						if ( !prEvent.isDefaultPrevented() ) {
							parentPage.removeWithDependents();
						}
					}
				}
			};

			// unbind the original page remove and replace with our specialized version
			parentPage
				.unbind( "pagehide.remove" )
				.bind( "pagehide.remove", newRemove);
		}
	},

	// TODO sort out a better way to track sub pages of the listview this is brittle
	childPages: function() {
		var parentUrl = this.parentPage.jqmData( "url" );

		return $( ":jqmData(url^='"+  parentUrl + "&" + $.mobile.subPageUrlKey + "')" );
	}
}, $.mobile.behaviors.addFirstLastClasses ) );

//auto self-init widgets
$.mobile.document.bind( "pagecreate create", function( e ) {
	$.mobile.listview.prototype.enhanceWithin( e.target );
});

})( jQuery );

(function( $ ) {
	var	meta = $( "meta[name=viewport]" ),
		initialContent = meta.attr( "content" ),
		disabledZoom = initialContent + ",maximum-scale=1, user-scalable=no",
		enabledZoom = initialContent + ",maximum-scale=10, user-scalable=yes",
		disabledInitially = /(user-scalable[\s]*=[\s]*no)|(maximum-scale[\s]*=[\s]*1)[$,\s]/.test( initialContent );

	$.mobile.zoom = $.extend( {}, {
		enabled: !disabledInitially,
		locked: false,
		disable: function( lock ) {
			if ( !disabledInitially && !$.mobile.zoom.locked ) {
				meta.attr( "content", disabledZoom );
				$.mobile.zoom.enabled = false;
				$.mobile.zoom.locked = lock || false;
			}
		},
		enable: function( unlock ) {
			if ( !disabledInitially && ( !$.mobile.zoom.locked || unlock === true ) ) {
				meta.attr( "content", enabledZoom );
				$.mobile.zoom.enabled = true;
				$.mobile.zoom.locked = false;
			}
		},
		restore: function() {
			if ( !disabledInitially ) {
				meta.attr( "content", initialContent );
				$.mobile.zoom.enabled = true;
			}
		}
	});

}( jQuery ));

(function( $, undefined ) {

$.widget( "mobile.textinput", $.mobile.widget, {
	options: {
		theme: null,
		mini: false,
		// This option defaults to true on iOS devices.
		preventFocusZoom: /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1,
		initSelector: "input[type='text'], input[type='search'], :jqmData(type='search'), input[type='number'], :jqmData(type='number'), input[type='password'], input[type='email'], input[type='url'], input[type='tel'], textarea, input[type='time'], input[type='date'], input[type='month'], input[type='week'], input[type='datetime'], input[type='datetime-local'], input[type='color'], input:not([type]), input[type='file']",
		clearBtn: false,
		clearSearchButtonText: null, //deprecating for 1.3...
		clearBtnText: "clear text",
		disabled: false
	},

	_create: function() {

		var self = this,
			input = this.element,
			o = this.options,
			theme = o.theme || $.mobile.getInheritedTheme( this.element, "c" ),
			themeclass  = " ui-body-" + theme,
			miniclass = o.mini ? " ui-mini" : "",
			isSearch = input.is( "[type='search'], :jqmData(type='search')" ),
			focusedEl,
			clearbtn,
			clearBtnText = o.clearSearchButtonText || o.clearBtnText,
			clearBtnBlacklist = input.is( "textarea, :jqmData(type='range')" ),
			inputNeedsClearBtn = !!o.clearBtn && !clearBtnBlacklist,
			inputNeedsWrap = input.is( "input" ) && !input.is( ":jqmData(type='range')" );

		function toggleClear() {
			setTimeout( function() {
				clearbtn.toggleClass( "ui-input-clear-hidden", !input.val() );
			}, 0 );
		}

		$( "label[for='" + input.attr( "id" ) + "']" ).addClass( "ui-input-text" );

		focusedEl = input.addClass( "ui-input-text ui-body-"+ theme );

		// XXX: Temporary workaround for issue 785 (Apple bug 8910589).
		//      Turn off autocorrect and autocomplete on non-iOS 5 devices
		//      since the popup they use can't be dismissed by the user. Note
		//      that we test for the presence of the feature by looking for
		//      the autocorrect property on the input element. We currently
		//      have no test for iOS 5 or newer so we're temporarily using
		//      the touchOverflow support flag for jQM 1.0. Yes, I feel dirty. - jblas
		if ( typeof input[0].autocorrect !== "undefined" && !$.support.touchOverflow ) {
			// Set the attribute instead of the property just in case there
			// is code that attempts to make modifications via HTML.
			input[0].setAttribute( "autocorrect", "off" );
			input[0].setAttribute( "autocomplete", "off" );
		}

		//"search" and "text" input widgets
		if ( isSearch ) {
			focusedEl = input.wrap( "<div class='ui-input-search ui-shadow-inset ui-btn-corner-all ui-btn-shadow ui-icon-searchfield" + themeclass + miniclass + "'></div>" ).parent();
		} else if ( inputNeedsWrap ) {
			focusedEl = input.wrap( "<div class='ui-input-text ui-shadow-inset ui-corner-all ui-btn-shadow" + themeclass + miniclass + "'></div>" ).parent();
		}

		if( inputNeedsClearBtn || isSearch ) {
			clearbtn = $( "<a href='#' class='ui-input-clear' title='" + clearBtnText + "'>" + clearBtnText + "</a>" )
				.bind( "click", function( event ) {
					input
						.val( "" )
						.focus()
						.trigger( "change" );
					clearbtn.addClass( "ui-input-clear-hidden" );
					event.preventDefault();
				})
				.appendTo( focusedEl )
				.buttonMarkup({
					icon: "delete",
					iconpos: "notext",
					corners: true,
					shadow: true,
					mini: o.mini
				});
				
			if ( !isSearch ) {
				focusedEl.addClass( "ui-input-has-clear" );
			}

			toggleClear();

			input.bind( "paste cut keyup input focus change blur", toggleClear );
		}
		else if ( !inputNeedsWrap && !isSearch ) {
			input.addClass( "ui-corner-all ui-shadow-inset" + themeclass + miniclass );
		}

		input.focus(function() {
				// In many situations, iOS will zoom into the input upon tap, this prevents that from happening
				if ( o.preventFocusZoom ) {
					$.mobile.zoom.disable( true );
				}			
				focusedEl.addClass( $.mobile.focusClass );
			})
			.blur(function() {
				focusedEl.removeClass( $.mobile.focusClass );
				if ( o.preventFocusZoom ) {
					$.mobile.zoom.enable( true );
				}				
			});

		// Autogrow
		if ( input.is( "textarea" ) ) {
			var extraLineHeight = 15,
				keyupTimeoutBuffer = 100,
				keyupTimeout;

			this._keyup = function() {
				var scrollHeight = input[ 0 ].scrollHeight,
					clientHeight = input[ 0 ].clientHeight;

				if ( clientHeight < scrollHeight ) {
					var paddingTop = parseFloat( input.css( "padding-top" ) ),
						paddingBottom = parseFloat( input.css( "padding-bottom" ) ),
						paddingHeight = paddingTop + paddingBottom;
					
					input.height( scrollHeight - paddingHeight + extraLineHeight );
				}
			};

			input.on( "keyup change input paste", function() {
				clearTimeout( keyupTimeout );
				keyupTimeout = setTimeout( self._keyup, keyupTimeoutBuffer );
			});

			// binding to pagechange here ensures that for pages loaded via
			// ajax the height is recalculated without user input
			this._on( true, $.mobile.document, { "pagechange": "_keyup" });

			// Issue 509: the browser is not providing scrollHeight properly until the styles load
			if ( $.trim( input.val() ) ) {
				// bind to the window load to make sure the height is calculated based on BOTH
				// the DOM and CSS
				this._on( true, $.mobile.window, {"load": "_keyup"});
			}
		}
		if ( input.attr( "disabled" ) ) {
			this.disable();
		}
	},

	disable: function() {
		var $el,
			isSearch = this.element.is( "[type='search'], :jqmData(type='search')" ),
			inputNeedsWrap = this.element.is( "input" ) && !this.element.is( ":jqmData(type='range')" ),
			parentNeedsDisabled = this.element.attr( "disabled", true )	&& ( inputNeedsWrap || isSearch );
			
		if ( parentNeedsDisabled ) {
			$el = this.element.parent();
		} else {
			$el = this.element;
		}
		$el.addClass( "ui-disabled" );
		return this._setOption( "disabled", true );
	},

	enable: function() {
		var $el,
			isSearch = this.element.is( "[type='search'], :jqmData(type='search')" ),
			inputNeedsWrap = this.element.is( "input" ) && !this.element.is( ":jqmData(type='range')" ),
			parentNeedsEnabled = this.element.attr( "disabled", false )	&& ( inputNeedsWrap || isSearch );

		if ( parentNeedsEnabled ) {
			$el = this.element.parent();
		} else {
			$el = this.element;
		}
		$el.removeClass( "ui-disabled" );
		return this._setOption( "disabled", false );
	}
});

//auto self-init widgets
$.mobile.document.bind( "pagecreate create", function( e ) {
	$.mobile.textinput.prototype.enhanceWithin( e.target, true );
});

})( jQuery );

(function( $, undefined ) {

$.mobile.listview.prototype.options.filter = false;
$.mobile.listview.prototype.options.filterPlaceholder = "Filter items...";
$.mobile.listview.prototype.options.filterTheme = "c";
$.mobile.listview.prototype.options.filterReveal = false;
// TODO rename callback/deprecate and default to the item itself as the first argument
var defaultFilterCallback = function( text, searchValue, item ) {
		return text.toString().toLowerCase().indexOf( searchValue ) === -1;
	};

$.mobile.listview.prototype.options.filterCallback = defaultFilterCallback;

$.mobile.document.delegate( "ul, ol", "listviewcreate", function() {
	var list = $( this ),
		listview = list.data( "mobile-listview" );

	if ( !listview || !listview.options.filter ) {
		return;
	}

	if ( listview.options.filterReveal ) {
		list.children().addClass( "ui-screen-hidden" );
	}

	var wrapper = $( "<form>", {
			"class": "ui-listview-filter ui-bar-" + listview.options.filterTheme,
			"role": "search"
		}).submit( function( e ) {
			e.preventDefault();
			search.blur();
		}),
		onKeyUp = function( e ) {
			var $this = $( this ),
				val = this.value.toLowerCase(),
				listItems = null,
				li = list.children(),
				lastval = $this.jqmData( "lastval" ) + "",
				childItems = false,
				itemtext = "",
				item,
				// Check if a custom filter callback applies
				isCustomFilterCallback = listview.options.filterCallback !== defaultFilterCallback;

			if ( lastval && lastval === val ) {
				// Execute the handler only once per value change
				return;
			}

			listview._trigger( "beforefilter", "beforefilter", { input: this } );

			// Change val as lastval for next execution
			$this.jqmData( "lastval" , val );
			if ( isCustomFilterCallback || val.length < lastval.length || val.indexOf( lastval ) !== 0 ) {

				// Custom filter callback applies or removed chars or pasted something totally different, check all items
				listItems = list.children();
			} else {

				// Only chars added, not removed, only use visible subset
				listItems = list.children( ":not(.ui-screen-hidden)" );

				if ( !listItems.length && listview.options.filterReveal ) {
					listItems = list.children( ".ui-screen-hidden" );
				}
			}

			if ( val ) {

				// This handles hiding regular rows without the text we search for
				// and any list dividers without regular rows shown under it

				for ( var i = listItems.length - 1; i >= 0; i-- ) {
					item = $( listItems[ i ] );
					itemtext = item.jqmData( "filtertext" ) || item.text();

					if ( item.is( "li:jqmData(role=list-divider)" ) ) {

						item.toggleClass( "ui-filter-hidequeue" , !childItems );

						// New bucket!
						childItems = false;

					} else if ( listview.options.filterCallback( itemtext, val, item ) ) {

						//mark to be hidden
						item.toggleClass( "ui-filter-hidequeue" , true );
					} else {

						// There's a shown item in the bucket
						childItems = true;
					}
				}

				// Show items, not marked to be hidden
				listItems
					.filter( ":not(.ui-filter-hidequeue)" )
					.toggleClass( "ui-screen-hidden", false );

				// Hide items, marked to be hidden
				listItems
					.filter( ".ui-filter-hidequeue" )
					.toggleClass( "ui-screen-hidden", true )
					.toggleClass( "ui-filter-hidequeue", false );

			} else {

				//filtervalue is empty => show all
				listItems.toggleClass( "ui-screen-hidden", !!listview.options.filterReveal );
			}
			listview._addFirstLastClasses( li, listview._getVisibles( li, false ), false );
		},
		search = $( "<input>", {
			placeholder: listview.options.filterPlaceholder
		})
		.attr( "data-" + $.mobile.ns + "type", "search" )
		.jqmData( "lastval", "" )
		.bind( "keyup change input", onKeyUp )
		.appendTo( wrapper )
		.textinput();

	if ( listview.options.inset ) {
		wrapper.addClass( "ui-listview-filter-inset" );
	}

	wrapper.bind( "submit", function() {
		return false;
	})
	.insertBefore( list );
});

})( jQuery );

(function( $, undefined ) {

$.mobile.listview.prototype.options.autodividers = false;
$.mobile.listview.prototype.options.autodividersSelector = function( elt ) {
	// look for the text in the given element
	var text = $.trim( elt.text() ) || null;

	if ( !text ) {
		return null;
	}

	// create the text for the divider (first uppercased letter)
	text = text.slice( 0, 1 ).toUpperCase();

	return text;
};

$.mobile.document.delegate( "ul,ol", "listviewcreate", function() {

	var list = $( this ),
			listview = list.data( "mobile-listview" );

	if ( !listview || !listview.options.autodividers ) {
		return;
	}

	var replaceDividers = function () {
		list.find( "li:jqmData(role='list-divider')" ).remove();

		var lis = list.find( 'li' ),
			lastDividerText = null, li, dividerText;

		for ( var i = 0; i < lis.length ; i++ ) {
			li = lis[i];
			dividerText = listview.options.autodividersSelector( $( li ) );

			if ( dividerText && lastDividerText !== dividerText ) {
				var divider = document.createElement( 'li' );
				divider.appendChild( document.createTextNode( dividerText ) );
				divider.setAttribute( 'data-' + $.mobile.ns + 'role', 'list-divider' );
				li.parentNode.insertBefore( divider, li );
			}

			lastDividerText = dividerText;
		}
	};

	var afterListviewRefresh = function () {
		list.unbind( 'listviewafterrefresh', afterListviewRefresh );
		replaceDividers();
		listview.refresh();
		list.bind( 'listviewafterrefresh', afterListviewRefresh );
	};

	afterListviewRefresh();
});

})( jQuery );

(function( $, undefined ) {

$( document ).bind( "pagecreate create", function( e ) {
	$( ":jqmData(role='nojs')", e.target ).addClass( "ui-nojs" );
	
});

})( jQuery );

(function( $, undefined ) {

$.mobile.behaviors.formReset = {
	_handleFormReset: function() {
		this._on( this.element.closest( "form" ), {
			reset: function() {
				this._delay( "_reset" );
			}
		});
	}
};

})( jQuery );

/*
* "checkboxradio" plugin
*/

(function( $, undefined ) {

$.widget( "mobile.checkboxradio", $.mobile.widget, $.extend( {
	options: {
		theme: null,
		mini: false,
		initSelector: "input[type='checkbox'],input[type='radio']"
	},
	_create: function() {
		var self = this,
			input = this.element,
			o = this.options,
			inheritAttr = function( input, dataAttr ) {
				return input.jqmData( dataAttr ) || input.closest( "form, fieldset" ).jqmData( dataAttr );
			},
			// NOTE: Windows Phone could not find the label through a selector
			// filter works though.
			parentLabel = $( input ).closest( "label" ),
			label = parentLabel.length ? parentLabel : $( input ).closest( "form, fieldset, :jqmData(role='page'), :jqmData(role='dialog')" ).find( "label" ).filter( "[for='" + input[0].id + "']" ).first(),
			inputtype = input[0].type,
			mini = inheritAttr( input, "mini" ) || o.mini,
			checkedState = inputtype + "-on",
			uncheckedState = inputtype + "-off",
			iconpos = inheritAttr( input, "iconpos" ),
			checkedClass = "ui-" + checkedState,
			uncheckedClass = "ui-" + uncheckedState;

		if ( inputtype !== "checkbox" && inputtype !== "radio" ) {
			return;
		}

		// Expose for other methods
		$.extend( this, {
			label: label,
			inputtype: inputtype,
			checkedClass: checkedClass,
			uncheckedClass: uncheckedClass,
			checkedicon: checkedState,
			uncheckedicon: uncheckedState
		});

		// If there's no selected theme check the data attr
		if ( !o.theme ) {
			o.theme = $.mobile.getInheritedTheme( this.element, "c" );
		}

		label.buttonMarkup({
			theme: o.theme,
			icon: uncheckedState,
			shadow: false,
			mini: mini,
			iconpos: iconpos
		});

		// Wrap the input + label in a div
		var wrapper = document.createElement('div');
		wrapper.className = 'ui-' + inputtype;

		input.add( label ).wrapAll( wrapper );

		label.bind({
			vmouseover: function( event ) {
				if ( $( this ).parent().is( ".ui-disabled" ) ) {
					event.stopPropagation();
				}
			},

			vclick: function( event ) {
				if ( input.is( ":disabled" ) ) {
					event.preventDefault();
					return;
				}

				self._cacheVals();

				input.prop( "checked", inputtype === "radio" && true || !input.prop( "checked" ) );

				// trigger click handler's bound directly to the input as a substitute for
				// how label clicks behave normally in the browsers
				// TODO: it would be nice to let the browser's handle the clicks and pass them
				//       through to the associate input. we can swallow that click at the parent
				//       wrapper element level
				input.triggerHandler( 'click' );

				// Input set for common radio buttons will contain all the radio
				// buttons, but will not for checkboxes. clearing the checked status
				// of other radios ensures the active button state is applied properly
				self._getInputSet().not( input ).prop( "checked", false );

				self._updateAll();
				return false;
			}
		});

		input
			.bind({
				vmousedown: function() {
					self._cacheVals();
				},

				vclick: function() {
					var $this = $( this );

					// Adds checked attribute to checked input when keyboard is used
					if ( $this.is( ":checked" ) ) {

						$this.prop( "checked", true);
						self._getInputSet().not( $this ).prop( "checked", false );
					} else {

						$this.prop( "checked", false );
					}

					self._updateAll();
				},

				focus: function() {
					label.addClass( $.mobile.focusClass );
				},

				blur: function() {
					label.removeClass( $.mobile.focusClass );
				}
			});

		this._handleFormReset();
		this.refresh();
	},

	_cacheVals: function() {
		this._getInputSet().each(function() {
			$( this ).jqmData( "cacheVal", this.checked );
		});
	},

	//returns either a set of radios with the same name attribute, or a single checkbox
	_getInputSet: function() {
		if ( this.inputtype === "checkbox" ) {
			return this.element;
		}

		return this.element.closest( "form, :jqmData(role='page'), :jqmData(role='dialog')" )
			.find( "input[name='" + this.element[0].name + "'][type='" + this.inputtype + "']" );
	},

	_updateAll: function() {
		var self = this;

		this._getInputSet().each(function() {
			var $this = $( this );

			if ( this.checked || self.inputtype === "checkbox" ) {
				$this.trigger( "change" );
			}
		})
		.checkboxradio( "refresh" );
	},

	_reset: function() {
		this.refresh();
	},

	refresh: function() {
		var input = this.element[ 0 ],
			active = " " + $.mobile.activeBtnClass,
			checkedClass = this.checkedClass + ( this.element.parents( ".ui-controlgroup-horizontal" ).length ? active : "" ),
			label = this.label;

		if ( input.checked ) {
			label.removeClass( this.uncheckedClass + active ).addClass( checkedClass ).buttonMarkup( { icon: this.checkedicon } );
		} else {
			label.removeClass( checkedClass ).addClass( this.uncheckedClass ).buttonMarkup( { icon: this.uncheckedicon } );
		}

		if ( input.disabled ) {
			this.disable();
		} else {
			this.enable();
		}
	},

	disable: function() {
		this.element.prop( "disabled", true ).parent().addClass( "ui-disabled" );
	},

	enable: function() {
		this.element.prop( "disabled", false ).parent().removeClass( "ui-disabled" );
	}
}, $.mobile.behaviors.formReset ) );

//auto self-init widgets
$.mobile.document.bind( "pagecreate create", function( e ) {
	$.mobile.checkboxradio.prototype.enhanceWithin( e.target, true );
});

})( jQuery );

(function( $, undefined ) {

$.widget( "mobile.button", $.mobile.widget, {
	options: {
		theme: null,
		icon: null,
		iconpos: null,
		corners: true,
		shadow: true,
		iconshadow: true,
		inline: null,
		mini: null,
		initSelector: "button, [type='button'], [type='submit'], [type='reset']"
	},
	_create: function() {
		var $el = this.element,
			$button,
			// create a copy of this.options we can pass to buttonMarkup
			o = ( function( tdo ) {
				var key, ret = {};

				for ( key in tdo ) {
					if ( tdo[ key ] !== null && key !== "initSelector" ) {
						ret[ key ] = tdo[ key ];
					}
				}

				return ret;
			} )( this.options ),
			classes = "",
			$buttonPlaceholder;

		// if this is a link, check if it's been enhanced and, if not, use the right function
		if ( $el[ 0 ].tagName === "A" ) {
			if ( !$el.hasClass( "ui-btn" ) ) {
				$el.buttonMarkup();
			}
			return;
		}

		// get the inherited theme
		// TODO centralize for all widgets
		if ( !this.options.theme ) {
			this.options.theme = $.mobile.getInheritedTheme( this.element, "c" );
		}

		// TODO: Post 1.1--once we have time to test thoroughly--any classes manually applied to the original element should be carried over to the enhanced element, with an `-enhanced` suffix. See https://github.com/jquery/jquery-mobile/issues/3577
		/* if ( $el[0].className.length ) {
			classes = $el[0].className;
		} */
		if ( !!~$el[0].className.indexOf( "ui-btn-left" ) ) {
			classes = "ui-btn-left";
		}

		if (  !!~$el[0].className.indexOf( "ui-btn-right" ) ) {
			classes = "ui-btn-right";
		}

		if (  $el.attr( "type" ) === "submit" || $el.attr( "type" ) === "reset" ) {
			if ( classes ) {
				classes += " ui-submit";
			} else {
				classes = "ui-submit";
			}
		}
		$( "label[for='" + $el.attr( "id" ) + "']" ).addClass( "ui-submit" );

		// Add ARIA role
		this.button = $( "<div></div>" )
			[ $el.html() ? "html" : "text" ]( $el.html() || $el.val() )
			.insertBefore( $el )
			.buttonMarkup( o )
			.addClass( classes )
			.append( $el.addClass( "ui-btn-hidden" ) );

        $button = this.button;

		$el.bind({
			focus: function() {
				$button.addClass( $.mobile.focusClass );
			},

			blur: function() {
				$button.removeClass( $.mobile.focusClass );
			}
		});

		this.refresh();
	},

	_setOption: function( key, value ) {
		var op = {};

		op[ key ] = value;
		if ( key !== "initSelector" ) {
			this.button.buttonMarkup( op );
			// Record the option change in the options and in the DOM data-* attributes
			this.element.attr( "data-" + ( $.mobile.ns || "" ) + ( key.replace( /([A-Z])/, "-$1" ).toLowerCase() ), value );
		}
		this._super( "_setOption", key, value );
	},

	enable: function() {
		this.element.attr( "disabled", false );
		this.button.removeClass( "ui-disabled" ).attr( "aria-disabled", false );
		return this._setOption( "disabled", false );
	},

	disable: function() {
		this.element.attr( "disabled", true );
		this.button.addClass( "ui-disabled" ).attr( "aria-disabled", true );
		return this._setOption( "disabled", true );
	},

	refresh: function() {
		var $el = this.element;

		if ( $el.prop("disabled") ) {
			this.disable();
		} else {
			this.enable();
		}

		// Grab the button's text element from its implementation-independent data item
		$( this.button.data( 'buttonElements' ).text )[ $el.html() ? "html" : "text" ]( $el.html() || $el.val() );
	}
});

//auto self-init widgets
$.mobile.document.bind( "pagecreate create", function( e ) {
	$.mobile.button.prototype.enhanceWithin( e.target, true );
});

})( jQuery );

(function( $, undefined ) {

$.widget( "mobile.slider", $.mobile.widget, $.extend( {
	widgetEventPrefix: "slide",

	options: {
		theme: null,
		trackTheme: null,
		disabled: false,
		initSelector: "input[type='range'], :jqmData(type='range'), :jqmData(role='slider')",
		mini: false,
		highlight: false
	},

	_create: function() {

		// TODO: Each of these should have comments explain what they're for
		var self = this,
			control = this.element,
			parentTheme = $.mobile.getInheritedTheme( control, "c" ),
			theme = this.options.theme || parentTheme,
			trackTheme = this.options.trackTheme || parentTheme,
			cType = control[ 0 ].nodeName.toLowerCase(),
			isSelect = this.isToggleSwitch = cType === "select",
			isRangeslider = control.parent().is( ":jqmData(role='rangeslider')" ),
			selectClass = ( this.isToggleSwitch ) ? "ui-slider-switch" : "",
			controlID = control.attr( "id" ),
			$label = $( "[for='" + controlID + "']" ),
			labelID = $label.attr( "id" ) || controlID + "-label",
			label = $label.attr( "id", labelID ),
			min = !this.isToggleSwitch ? parseFloat( control.attr( "min" ) ) : 0,
			max =  !this.isToggleSwitch ? parseFloat( control.attr( "max" ) ) : control.find( "option" ).length-1,
			step = window.parseFloat( control.attr( "step" ) || 1 ),
			miniClass = ( this.options.mini || control.jqmData( "mini" ) ) ? " ui-mini" : "",
			domHandle = document.createElement( "a" ),
			handle = $( domHandle ),
			domSlider = document.createElement( "div" ),
			slider = $( domSlider ),
			valuebg = this.options.highlight && !this.isToggleSwitch ? (function() {
				var bg = document.createElement( "div" );
				bg.className = "ui-slider-bg " + $.mobile.activeBtnClass + " ui-btn-corner-all";
				return $( bg ).prependTo( slider );
			})() : false,
			options,
			wrapper;
			
		domHandle.setAttribute( "href", "#" );
		domSlider.setAttribute( "role", "application" );
		domSlider.className = [this.isToggleSwitch ? "ui-slider " : "ui-slider-track ",selectClass," ui-btn-down-",trackTheme," ui-btn-corner-all", miniClass].join( "" );
		domHandle.className = "ui-slider-handle";
		domSlider.appendChild( domHandle );

		handle.buttonMarkup({ corners: true, theme: theme, shadow: true })
				.attr({
					"role": "slider",
					"aria-valuemin": min,
					"aria-valuemax": max,
					"aria-valuenow": this._value(),
					"aria-valuetext": this._value(),
					"title": this._value(),
					"aria-labelledby": labelID
				});

		$.extend( this, {
			slider: slider,
			handle: handle,
			type: cType,
			step: step,
			max: max,
			min: min,
			valuebg: valuebg,
			isRangeslider: isRangeslider,
			dragging: false,
			beforeStart: null,
			userModified: false,
			mouseMoved: false
		});

		if ( this.isToggleSwitch ) {
			wrapper = document.createElement( "div" );
			wrapper.className = "ui-slider-inneroffset";

			for ( var j = 0, length = domSlider.childNodes.length; j < length; j++ ) {
				wrapper.appendChild( domSlider.childNodes[j] );
			}

			domSlider.appendChild( wrapper );

			// slider.wrapInner( "<div class='ui-slider-inneroffset'></div>" );

			// make the handle move with a smooth transition
			handle.addClass( "ui-slider-handle-snapping" );

			options = control.find( "option" );

			for ( var i = 0, optionsCount = options.length; i < optionsCount; i++ ) {
				var side = !i ? "b" : "a",
					sliderTheme = !i ? " ui-btn-down-" + trackTheme : ( " " + $.mobile.activeBtnClass ),
					sliderLabel = document.createElement( "div" ),
					sliderImg = document.createElement( "span" );

				sliderImg.className = ["ui-slider-label ui-slider-label-", side, sliderTheme, " ui-btn-corner-all"].join( "" );
				sliderImg.setAttribute( "role", "img" );
				sliderImg.appendChild( document.createTextNode( options[i].innerHTML ) );
				$( sliderImg ).prependTo( slider );
			}

			self._labels = $( ".ui-slider-label", slider );

		}

		label.addClass( "ui-slider" );
		
		// monitor the input for updated values
		control.addClass( this.isToggleSwitch ? "ui-slider-switch" : "ui-slider-input" );

		this._on( control, {
			"change": "_controlChange",
			"keyup": "_controlKeyup",
			"blur": "_controlBlur",
			"vmouseup": "_controlVMouseUp"
		});

		slider.bind( "vmousedown", $.proxy( this._sliderVMouseDown, this ) )
			.bind( "vclick", false );

		// We have to instantiate a new function object for the unbind to work properly
		// since the method itself is defined in the prototype (causing it to unbind everything)
		this._on( document, { "vmousemove": "_preventDocumentDrag" });
		this._on( slider.add( document ), { "vmouseup": "_sliderVMouseUp" });

		slider.insertAfter( control );

		// wrap in a div for styling purposes
		if ( !this.isToggleSwitch && !isRangeslider ) {
			wrapper = this.options.mini ? "<div class='ui-slider ui-mini'>" : "<div class='ui-slider'>";
			
			control.add( slider ).wrapAll( wrapper );
		}

		// Only add focus class to toggle switch, sliders get it automatically from ui-btn
		if ( this.isToggleSwitch ) {
			this.handle.bind({
				focus: function() {
					slider.addClass( $.mobile.focusClass );
				},

				blur: function() {
					slider.removeClass( $.mobile.focusClass );
				}
			});
		}

		// bind the handle event callbacks and set the context to the widget instance
		this._on( this.handle, {
			"vmousedown": "_handleVMouseDown",
			"keydown": "_handleKeydown",
			"keyup": "_handleKeyup"
		});

		this.handle.bind( "vclick", false );

		this._handleFormReset();

		this.refresh( undefined, undefined, true );
	},

	_controlChange: function( event ) {
		// if the user dragged the handle, the "change" event was triggered from inside refresh(); don't call refresh() again
		if ( this._trigger( "controlchange", event ) === false ) {
			return false;
		}
		if ( !this.mouseMoved ) {
			this.refresh( this._value(), true );
		}
	},

	_controlKeyup: function( event ) { // necessary?
		this.refresh( this._value(), true, true );
	},

	_controlBlur: function( event ) {
		this.refresh( this._value(), true );
	},

	// it appears the clicking the up and down buttons in chrome on
	// range/number inputs doesn't trigger a change until the field is
	// blurred. Here we check thif the value has changed and refresh
	_controlVMouseUp: function( event ) {
		this._checkedRefresh();
	},

	// NOTE force focus on handle
	_handleVMouseDown: function( event ) {
		this.handle.focus();
	},

	_handleKeydown: function( event ) {
		var index = this._value();
		if ( this.options.disabled ) {
			return;
		}

		// In all cases prevent the default and mark the handle as active
		switch ( event.keyCode ) {
			case $.mobile.keyCode.HOME:
			case $.mobile.keyCode.END:
			case $.mobile.keyCode.PAGE_UP:
			case $.mobile.keyCode.PAGE_DOWN:
			case $.mobile.keyCode.UP:
			case $.mobile.keyCode.RIGHT:
			case $.mobile.keyCode.DOWN:
			case $.mobile.keyCode.LEFT:
				event.preventDefault();

				if ( !this._keySliding ) {
					this._keySliding = true;
					this.handle.addClass( "ui-state-active" );
				}

				break;
		}

		// move the slider according to the keypress
		switch ( event.keyCode ) {
			case $.mobile.keyCode.HOME:
				this.refresh( this.min );
				break;
			case $.mobile.keyCode.END:
				this.refresh( this.max );
				break;
			case $.mobile.keyCode.PAGE_UP:
			case $.mobile.keyCode.UP:
			case $.mobile.keyCode.RIGHT:
				this.refresh( index + this.step );
				break;
			case $.mobile.keyCode.PAGE_DOWN:
			case $.mobile.keyCode.DOWN:
			case $.mobile.keyCode.LEFT:
				this.refresh( index - this.step );
				break;
		}
	}, // remove active mark

	_handleKeyup: function( event ) {
		if ( this._keySliding ) {
			this._keySliding = false;
			this.handle.removeClass( "ui-state-active" );
		}
	},

	_sliderVMouseDown: function( event ) {
		// NOTE: we don't do this in refresh because we still want to
		//       support programmatic alteration of disabled inputs
		if ( this.options.disabled || !( event.which === 1 || event.which === 0 || event.which === undefined ) ) {
			return false;
		}
		if ( this._trigger( "beforestart", event ) === false ) {
			return false;
		}
		this.dragging = true;
		this.userModified = false;
		this.mouseMoved = false;

		if ( this.isToggleSwitch ) {
			this.beforeStart = this.element[0].selectedIndex;
		}

		
		this.refresh( event );
		this._trigger( "start" );
		return false;
	},

	_sliderVMouseUp: function() {
		if ( this.dragging ) {
			this.dragging = false;

			if ( this.isToggleSwitch ) {
				// make the handle move with a smooth transition
				this.handle.addClass( "ui-slider-handle-snapping" );

				if ( this.mouseMoved ) {
					// this is a drag, change the value only if user dragged enough
					if ( this.userModified ) {
						this.refresh( this.beforeStart === 0 ? 1 : 0 );
					} else {
						this.refresh( this.beforeStart );
					}
				} else {
					// this is just a click, change the value
					this.refresh( this.beforeStart === 0 ? 1 : 0 );
				}
			}

			this.mouseMoved = false;
			this._trigger( "stop" );
			return false;
		}
	},

	_preventDocumentDrag: function( event ) {
			// NOTE: we don't do this in refresh because we still want to
			//       support programmatic alteration of disabled inputs
			if ( this._trigger( "drag", event ) === false) {
				return false;
			}
			if ( this.dragging && !this.options.disabled ) {
				
				// this.mouseMoved must be updated before refresh() because it will be used in the control "change" event
				this.mouseMoved = true;

				if ( this.isToggleSwitch ) {
					// make the handle move in sync with the mouse
					this.handle.removeClass( "ui-slider-handle-snapping" );
				}
				
				this.refresh( event );

				// only after refresh() you can calculate this.userModified
				this.userModified = this.beforeStart !== this.element[0].selectedIndex;
				return false;
			}
		},

	_checkedRefresh: function() {
		if ( this.value !== this._value() ) {
			this.refresh( this._value() );
		}
	},

	_value: function() {
		return  this.isToggleSwitch ? this.element[0].selectedIndex : parseFloat( this.element.val() ) ;
	},


	_reset: function() {
		this.refresh( undefined, false, true );
	},

	refresh: function( val, isfromControl, preventInputUpdate ) {
		// NOTE: we don't return here because we want to support programmatic
		//       alteration of the input value, which should still update the slider
		
		var self = this,
			parentTheme = $.mobile.getInheritedTheme( this.element, "c" ),
			theme = this.options.theme || parentTheme,
			trackTheme = this.options.trackTheme || parentTheme,
			left, width, data, tol;

		self.slider[0].className = [ this.isToggleSwitch ? "ui-slider ui-slider-switch" : "ui-slider-track"," ui-btn-down-" + trackTheme,' ui-btn-corner-all', ( this.options.mini ) ? " ui-mini":""].join( "" );
		if ( this.options.disabled || this.element.attr( "disabled" ) ) {
			this.disable();
		}

		// set the stored value for comparison later
		this.value = this._value();
		if ( this.options.highlight && !this.isToggleSwitch && this.slider.find( ".ui-slider-bg" ).length === 0 ) {
			this.valuebg = (function() {
				var bg = document.createElement( "div" );
				bg.className = "ui-slider-bg " + $.mobile.activeBtnClass + " ui-btn-corner-all";
				return $( bg ).prependTo( self.slider );
			})();
		}
		this.handle.buttonMarkup({ corners: true, theme: theme, shadow: true });

		var pxStep, percent,
			control = this.element,
			isInput = !this.isToggleSwitch,
			optionElements = isInput ? [] : control.find( "option" ),
			min =  isInput ? parseFloat( control.attr( "min" ) ) : 0,
			max = isInput ? parseFloat( control.attr( "max" ) ) : optionElements.length - 1,
			step = ( isInput && parseFloat( control.attr( "step" ) ) > 0 ) ? parseFloat( control.attr( "step" ) ) : 1;
			
		if ( typeof val === "object" ) {
			data = val;
			// a slight tolerance helped get to the ends of the slider
			tol = 8;

			left = this.slider.offset().left;
			width = this.slider.width();
			pxStep = width/((max-min)/step);
			if ( !this.dragging ||
					data.pageX < left - tol ||
					data.pageX > left + width + tol ) {
				return;
			}
			if ( pxStep > 1 ) {
				percent = ( ( data.pageX - left ) / width ) * 100;
			} else {
				percent = Math.round( ( ( data.pageX - left ) / width ) * 100 );
			}
		} else {
			if ( val == null ) {
				val = isInput ? parseFloat( control.val() || 0 ) : control[0].selectedIndex;
			}
			percent = ( parseFloat( val ) - min ) / ( max - min ) * 100;
		}

		if ( isNaN( percent ) ) {
			return;
		}

		var newval = ( percent / 100 ) * ( max - min ) + min;

		//from jQuery UI slider, the following source will round to the nearest step
		var valModStep = ( newval - min ) % step;
		var alignValue = newval - valModStep;

		if ( Math.abs( valModStep ) * 2 >= step ) {
			alignValue += ( valModStep > 0 ) ? step : ( -step );
		}

		var percentPerStep = 100/((max-min)/step);
		// Since JavaScript has problems with large floats, round
		// the final value to 5 digits after the decimal point (see jQueryUI: #4124)
		newval = parseFloat( alignValue.toFixed(5) );

		if ( typeof pxStep === "undefined" ) {
			pxStep = width / ( (max-min) / step );
		}
		if ( pxStep > 1 && isInput ) {
			percent = ( newval - min ) * percentPerStep * ( 1 / step );
		}
		if ( percent < 0 ) {
			percent = 0;
		}

		if ( percent > 100 ) {
			percent = 100;
		}

		if ( newval < min ) {
			newval = min;
		}

		if ( newval > max ) {
			newval = max;
		}

		this.handle.css( "left", percent + "%" );

		this.handle[0].setAttribute( "aria-valuenow", isInput ? newval : optionElements.eq( newval ).attr( "value" ) );

		this.handle[0].setAttribute( "aria-valuetext", isInput ? newval : optionElements.eq( newval ).getEncodedText() );

		this.handle[0].setAttribute( "title", isInput ? newval : optionElements.eq( newval ).getEncodedText() );

		if ( this.valuebg ) {
			this.valuebg.css( "width", percent + "%" );
		}

		// drag the label widths
		if ( this._labels ) {
			var handlePercent = this.handle.width() / this.slider.width() * 100,
				aPercent = percent && handlePercent + ( 100 - handlePercent ) * percent / 100,
				bPercent = percent === 100 ? 0 : Math.min( handlePercent + 100 - aPercent, 100 );

			this._labels.each(function() {
				var ab = $( this ).is( ".ui-slider-label-a" );
				$( this ).width( ( ab ? aPercent : bPercent  ) + "%" );
			});
		}

		if ( !preventInputUpdate ) {
			var valueChanged = false;

			// update control"s value
			if ( isInput ) {
				valueChanged = control.val() !== newval;
				control.val( newval );
			} else {
				valueChanged = control[ 0 ].selectedIndex !== newval;
				control[ 0 ].selectedIndex = newval;
			}
			if ( this._trigger( "beforechange", val ) === false) {
					return false;
			}
			if ( !isfromControl && valueChanged ) {
				control.trigger( "change" );
			}
		}
	},

	enable: function() {
		this.element.attr( "disabled", false );
		this.slider.removeClass( "ui-disabled" ).attr( "aria-disabled", false );
		return this._setOption( "disabled", false );
	},

	disable: function() {
		this.element.attr( "disabled", true );
		this.slider.addClass( "ui-disabled" ).attr( "aria-disabled", true );
		return this._setOption( "disabled", true );
	}

}, $.mobile.behaviors.formReset ) );

//auto self-init widgets
$.mobile.document.bind( "pagecreate create", function( e ) {
	$.mobile.slider.prototype.enhanceWithin( e.target, true );
});

})( jQuery );

(function( $, undefined ) {
	$.widget( "mobile.rangeslider", $.mobile.widget, {

		options: {
			theme: null,
			trackTheme: null,
			disabled: false,
			initSelector: ":jqmData(role='rangeslider')",
			mini: false,
			highlight: true
		},

		_create: function() {
			var secondLabel,
			$el = this.element,
			elClass = this.options.mini ? "ui-rangeslider ui-mini" : "ui-rangeslider",
			_inputFirst = $el.find( "input" ).first(),
			_inputLast = $el.find( "input" ).last(),
			label = $el.find( "label" ).first(),
			_sliderFirst = $.data( _inputFirst.get(0), "mobileSlider" ).slider,
			_sliderLast = $.data( _inputLast.get(0), "mobileSlider" ).slider,
			firstHandle = $.data( _inputFirst.get(0), "mobileSlider" ).handle,
			_sliders = $( "<div class=\"ui-rangeslider-sliders\" />" ).appendTo( $el );
			
			if ( $el.find( "label" ).length > 1 ) {
				secondLabel = $el.find( "label" ).last().hide();
			}

			_inputFirst.addClass( "ui-rangeslider-first" );
			_inputLast.addClass( "ui-rangeslider-last" );
			$el.addClass( elClass );
			
			_sliderFirst.appendTo( _sliders );
			_sliderLast.appendTo( _sliders );
			label.prependTo( $el );
			firstHandle.prependTo( _sliderLast );

			$.extend( this, {
				_inputFirst: _inputFirst,
				_inputLast: _inputLast,
				_sliderFirst: _sliderFirst,
				_sliderLast: _sliderLast,
				_targetVal: null,
				_sliderTarget: false,
				_sliders: _sliders,
				_proxy: false
			});
			
			this.refresh();
			this._on( this.element.find( "input.ui-slider-input" ), {
				"slidebeforestart": "_slidebeforestart",
				"slidestop": "_slidestop",
				"slidedrag": "_slidedrag",
				"slidebeforechange": "_change",
				"blur": "_change",
				"keyup": "_change"
			});
			this._on({
				"mousedown":"_change"
			});
			this._on( this.element.closest( "form" ), {
				"reset":"_handleReset"
			});
			this._on( firstHandle, {
				"vmousedown": "_dragFirstHandle"
			});
		},
		_handleReset: function(){
			var self = this;
			//we must wait for the stack to unwind before updateing other wise sliders will not have updated yet
			setTimeout( function(){
				self._updateHighlight();
			},0);
		},

		_dragFirstHandle: function( event ) {
			//if the first handle is dragged send the event to the first slider
			$.data( this._inputFirst.get(0), "mobileSlider" ).dragging = true;
			$.data( this._inputFirst.get(0), "mobileSlider" ).refresh( event );
			return false;
		},

		_slidedrag: function( event ) {
			var first = $( event.target ).is( this._inputFirst ),
				otherSlider = ( first ) ? this._inputLast : this._inputFirst;

			this._sliderTarget = false;
			//if the drag was initiated on an extreme and the other handle is focused send the events to
			//the closest handle
			if ( ( this._proxy === "first" && first ) || ( this._proxy === "last" && !first ) ) {
				$.data( otherSlider.get(0), "mobileSlider" ).dragging = true;
				$.data( otherSlider.get(0), "mobileSlider" ).refresh( event );
				return false;
			}
		},

		_slidestop: function( event ) {
			var first = $( event.target ).is( this._inputFirst );
			
			this._proxy = false;
			//this stops dragging of the handle and brings the active track to the front 
			//this makes clicks on the track go the the last handle used
			this.element.find( "input" ).trigger( "vmouseup" );
			this._sliderFirst.css( "z-index", first ? 1 : "" );
		},

		_slidebeforestart: function( event ) {
			this._sliderTarget = false;
			//if the track is the target remember this and the original value
			if ( $( event.originalEvent.target ).hasClass( "ui-slider-track" ) ) {
				this._sliderTarget = true;
				this._targetVal = $( event.target ).val();
			}
		},

		_setOption: function( options ) {
			this._superApply( options );
			this.refresh();
		},

		refresh: function() {
			var $el = this.element,
				o = this.options;

			$el.find( "input" ).slider({
				theme: o.theme,
				trackTheme: o.trackTheme,
				disabled: o.disabled,
				mini: o.mini,
				highlight: o.highlight
			}).slider( "refresh" );
			this._updateHighlight();
		},

		_change: function( event ) {
			if ( event.type === "keyup" ) {
				this._updateHighlight();
				return false;
			}

			var self = this,
				min = parseFloat( this._inputFirst.val(), 10 ),
				max = parseFloat( this._inputLast.val(), 10 ),
				first = $( event.target ).hasClass( "ui-rangeslider-first" ),
				thisSlider = first ? this._inputFirst : this._inputLast,
				otherSlider = first ? this._inputLast : this._inputFirst;
			
			
			if( ( this._inputFirst.val() > this._inputLast.val() && event.type === "mousedown" && !$(event.target).hasClass("ui-slider-handle")) ){
				thisSlider.blur();
			} else if( event.type === "mousedown" ){
				return;
			}
			if ( min > max && !this._sliderTarget ) {
				//this prevents min from being greater then max
				thisSlider.val( first ? max: min ).slider( "refresh" );
				this._trigger( "normalize" );
			} else if ( min > max ) {
				//this makes it so clicks on the target on either extreme go to the closest handle
				thisSlider.val( this._targetVal ).slider( "refresh" );

				//You must wait for the stack to unwind so first slider is updated before updating second
				setTimeout( function() {
					otherSlider.val( first ? min: max ).slider( "refresh" );
					$.data( otherSlider.get(0), "mobileSlider" ).handle.focus();
					self._sliderFirst.css( "z-index", first ? "" : 1 );
					self._trigger( "normalize" );
				}, 0 );
				this._proxy = ( first ) ? "first" : "last";
			}
			//fixes issue where when both _sliders are at min they cannot be adjusted
			if ( min === max ) {
				$.data( thisSlider.get(0), "mobileSlider" ).handle.css( "z-index", 1 );
				$.data( otherSlider.get(0), "mobileSlider" ).handle.css( "z-index", 0 );
			} else {
				$.data( otherSlider.get(0), "mobileSlider" ).handle.css( "z-index", "" );
				$.data( thisSlider.get(0), "mobileSlider" ).handle.css( "z-index", "" );
			}
			
			this._updateHighlight();
			
			if ( min >= max ) {
				return false;
			}
		},

		_updateHighlight: function() {
			var min = parseInt( $.data( this._inputFirst.get(0), "mobileSlider" ).handle.get(0).style.left, 10 ),
				max = parseInt( $.data( this._inputLast.get(0), "mobileSlider" ).handle.get(0).style.left, 10 ),
				width = (max - min);

			this.element.find( ".ui-slider-bg" ).css({
				"margin-left": min + "%",
				"width": width + "%"
			});
		},

		_destroy: function() {
			this.element.removeClass( "ui-rangeslider ui-mini" ).find( "label" ).show();
			this._inputFirst.after( this._sliderFirst );
			this._inputLast.after( this._sliderLast );
			this._sliders.remove();
			this.element.find( "input" ).removeClass( "ui-rangeslider-first ui-rangeslider-last" ).slider( "destroy" );
		}

	});

$.widget( "mobile.rangeslider", $.mobile.rangeslider, $.mobile.behaviors.formReset );

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ) {
	$.mobile.rangeslider.prototype.enhanceWithin( e.target, true );
});

})( jQuery );

(function( $, undefined ) {

$.widget( "mobile.selectmenu", $.mobile.widget, $.extend( {
	options: {
		theme: null,
		disabled: false,
		icon: "arrow-d",
		iconpos: "right",
		inline: false,
		corners: true,
		shadow: true,
		iconshadow: true,
		overlayTheme: "a",
		dividerTheme: "b",
		hidePlaceholderMenuItems: true,
		closeText: "Close",
		nativeMenu: true,
		// This option defaults to true on iOS devices.
		preventFocusZoom: /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1,
		initSelector: "select:not( :jqmData(role='slider') )",
		mini: false
	},

	_button: function() {
		return $( "<div/>" );
	},

	_setDisabled: function( value ) {
		this.element.attr( "disabled", value );
		this.button.attr( "aria-disabled", value );
		return this._setOption( "disabled", value );
	},

	_focusButton : function() {
		var self = this;

		setTimeout( function() {
			self.button.focus();
		}, 40);
	},

	_selectOptions: function() {
		return this.select.find( "option" );
	},

	// setup items that are generally necessary for select menu extension
	_preExtension: function() {
		var classes = "";
		// TODO: Post 1.1--once we have time to test thoroughly--any classes manually applied to the original element should be carried over to the enhanced element, with an `-enhanced` suffix. See https://github.com/jquery/jquery-mobile/issues/3577
		/* if ( $el[0].className.length ) {
			classes = $el[0].className;
		} */
		if ( !!~this.element[0].className.indexOf( "ui-btn-left" ) ) {
			classes = " ui-btn-left";
		}

		if (  !!~this.element[0].className.indexOf( "ui-btn-right" ) ) {
			classes = " ui-btn-right";
		}

		this.select = this.element.removeClass( "ui-btn-left ui-btn-right" ).wrap( "<div class='ui-select" + classes + "'>" );
		this.selectID  = this.select.attr( "id" );
		this.label = $( "label[for='"+ this.selectID +"']" ).addClass( "ui-select" );
		this.isMultiple = this.select[ 0 ].multiple;
		if ( !this.options.theme ) {
			this.options.theme = $.mobile.getInheritedTheme( this.select, "c" );
		}
	},

	_destroy: function() {
		var wrapper = this.element.parents( ".ui-select" );
		if ( wrapper.length > 0 ) {
			if ( wrapper.is( ".ui-btn-left, .ui-btn-right" ) ) {
				this.element.addClass( wrapper.is( ".ui-btn-left" ) ? "ui-btn-left" : "ui-btn-right" );
			}
			this.element.insertAfter( wrapper );
			wrapper.remove();
		}
	},

	_create: function() {
		this._preExtension();

		// Allows for extension of the native select for custom selects and other plugins
		// see select.custom for example extension
		// TODO explore plugin registration
		this._trigger( "beforeCreate" );

		this.button = this._button();

		var self = this,

			options = this.options,

			inline = options.inline || this.select.jqmData( "inline" ),
			mini = options.mini || this.select.jqmData( "mini" ),
			iconpos = options.icon ? ( options.iconpos || this.select.jqmData( "iconpos" ) ) : false,

			// IE throws an exception at options.item() function when
			// there is no selected item
			// select first in this case
			selectedIndex = this.select[ 0 ].selectedIndex === -1 ? 0 : this.select[ 0 ].selectedIndex,

			// TODO values buttonId and menuId are undefined here
			button = this.button
				.insertBefore( this.select )
				.buttonMarkup( {
					theme: options.theme,
					icon: options.icon,
					iconpos: iconpos,
					inline: inline,
					corners: options.corners,
					shadow: options.shadow,
					iconshadow: options.iconshadow,
					mini: mini
				});

		this.setButtonText();

		// Opera does not properly support opacity on select elements
		// In Mini, it hides the element, but not its text
		// On the desktop,it seems to do the opposite
		// for these reasons, using the nativeMenu option results in a full native select in Opera
		if ( options.nativeMenu && window.opera && window.opera.version ) {
			button.addClass( "ui-select-nativeonly" );
		}

		// Add counter for multi selects
		if ( this.isMultiple ) {
			this.buttonCount = $( "<span>" )
				.addClass( "ui-li-count ui-btn-up-c ui-btn-corner-all" )
				.hide()
				.appendTo( button.addClass('ui-li-has-count') );
		}

		// Disable if specified
		if ( options.disabled || this.element.attr('disabled')) {
			this.disable();
		}

		// Events on native select
		this.select.change(function() {
			self.refresh();
			
			if ( !!options.nativeMenu ) {
				this.blur();
			}
		});

		this._handleFormReset();

		this.build();
	},

	build: function() {
		var self = this;

		this.select
			.appendTo( self.button )
			.bind( "vmousedown", function() {
				// Add active class to button
				self.button.addClass( $.mobile.activeBtnClass );
			})
			.bind( "focus", function() {
				self.button.addClass( $.mobile.focusClass );
			})
			.bind( "blur", function() {
				self.button.removeClass( $.mobile.focusClass );
			})
			.bind( "focus vmouseover", function() {
				self.button.trigger( "vmouseover" );
			})
			.bind( "vmousemove", function() {
				// Remove active class on scroll/touchmove
				self.button.removeClass( $.mobile.activeBtnClass );
			})
			.bind( "change blur vmouseout", function() {
				self.button.trigger( "vmouseout" )
					.removeClass( $.mobile.activeBtnClass );
			})
			.bind( "change blur", function() {
				self.button.removeClass( "ui-btn-down-" + self.options.theme );
			});

		// In many situations, iOS will zoom into the select upon tap, this prevents that from happening
		self.button.bind( "vmousedown", function() {
			if ( self.options.preventFocusZoom ) {
					$.mobile.zoom.disable( true );
			}
		});
		self.label.bind( "click focus", function() {
			if ( self.options.preventFocusZoom ) {
					$.mobile.zoom.disable( true );
			}
		});
		self.select.bind( "focus", function() {
			if ( self.options.preventFocusZoom ) {
					$.mobile.zoom.disable( true );
			}
		});
		self.button.bind( "mouseup", function() {
			if ( self.options.preventFocusZoom ) {				
				setTimeout(function() {
					$.mobile.zoom.enable( true );
				}, 0 );
			}
		});
		self.select.bind( "blur", function() {
			if ( self.options.preventFocusZoom ) {				
				$.mobile.zoom.enable( true );
			}
		});

	},

	selected: function() {
		return this._selectOptions().filter( ":selected" );
	},

	selectedIndices: function() {
		var self = this;

		return this.selected().map(function() {
			return self._selectOptions().index( this );
		}).get();
	},

	setButtonText: function() {
		var self = this,
			selected = this.selected(),
			text = this.placeholder,
			span = $( document.createElement( "span" ) );

		this.button.find( ".ui-btn-text" ).html(function() {
			if ( selected.length ) {
				text = selected.map(function() {
					return $( this ).text();
				}).get().join( ", " );
			} else {
				text = self.placeholder;
			}

			// TODO possibly aggregate multiple select option classes
			return span.text( text )
				.addClass( self.select.attr( "class" ) )
				.addClass( selected.attr( "class" ) );
		});
	},

	setButtonCount: function() {
		var selected = this.selected();

		// multiple count inside button
		if ( this.isMultiple ) {
			this.buttonCount[ selected.length > 1 ? "show" : "hide" ]().text( selected.length );
		}
	},

	_reset: function() {
		this.refresh();
	},

	refresh: function() {
		this.setButtonText();
		this.setButtonCount();
	},

	// open and close preserved in native selects
	// to simplify users code when looping over selects
	open: $.noop,
	close: $.noop,

	disable: function() {
		this._setDisabled( true );
		this.button.addClass( "ui-disabled" );
	},

	enable: function() {
		this._setDisabled( false );
		this.button.removeClass( "ui-disabled" );
	}
}, $.mobile.behaviors.formReset ) );

//auto self-init widgets
$.mobile.document.bind( "pagecreate create", function( e ) {
	$.mobile.selectmenu.prototype.enhanceWithin( e.target, true );
});
})( jQuery );

(function( $, undefined ) {

function fitSegmentInsideSegment( winSize, segSize, offset, desired ) {
	var ret = desired;

	if ( winSize < segSize ) {
		// Center segment if it's bigger than the window
		ret = offset + ( winSize - segSize ) / 2;
	} else {
		// Otherwise center it at the desired coordinate while keeping it completely inside the window
		ret = Math.min( Math.max( offset, desired - segSize / 2 ), offset + winSize - segSize );
	}

	return ret;
}

function windowCoords() {
	var $win = $.mobile.window;

	return {
		x: $win.scrollLeft(),
		y: $win.scrollTop(),
		cx: ( window.innerWidth || $win.width() ),
		cy: ( window.innerHeight || $win.height() )
	};
}

$.widget( "mobile.popup", $.mobile.widget, {
	options: {
		theme: null,
		overlayTheme: null,
		shadow: true,
		corners: true,
		transition: "none",
		positionTo: "origin",
		tolerance: null,
		initSelector: ":jqmData(role='popup')",
		closeLinkSelector: "a:jqmData(rel='back')",
		closeLinkEvents: "click.popup",
		navigateEvents: "navigate.popup",
		closeEvents: "navigate.popup pagebeforechange.popup",
		dismissible: true,

		// NOTE Windows Phone 7 has a scroll position caching issue that
		//      requires us to disable popup history management by default
		//      https://github.com/jquery/jquery-mobile/issues/4784
		//
		// NOTE this option is modified in _create!
		history: !$.mobile.browser.oldIE
	},

	_eatEventAndClose: function( e ) {
		e.preventDefault();
		e.stopImmediatePropagation();
		if ( this.options.dismissible ) {
			this.close();
		}
		return false;
	},

	// Make sure the screen size is increased beyond the page height if the popup's causes the document to increase in height
	_resizeScreen: function() {
		var popupHeight = this._ui.container.outerHeight( true );

		this._ui.screen.removeAttr( "style" );
		if ( popupHeight > this._ui.screen.height() ) {
			this._ui.screen.height( popupHeight );
		}
	},

	_handleWindowKeyUp: function( e ) {
		if ( this._isOpen && e.keyCode === $.mobile.keyCode.ESCAPE ) {
			return this._eatEventAndClose( e );
		}
	},

	_expectResizeEvent: function() {
		var winCoords = windowCoords();

		if ( this._resizeData ) {
			if ( winCoords.x === this._resizeData.winCoords.x &&
				winCoords.y === this._resizeData.winCoords.y &&
				winCoords.cx === this._resizeData.winCoords.cx &&
				winCoords.cy === this._resizeData.winCoords.cy ) {
				// timeout not refreshed
				return false;
			} else {
				// clear existing timeout - it will be refreshed below
				clearTimeout( this._resizeData.timeoutId );
			}
		}

		this._resizeData = {
			timeoutId: setTimeout( $.proxy( this, "_resizeTimeout" ), 200 ),
			winCoords: winCoords
		};

		return true;
	},

	_resizeTimeout: function() {
		if ( this._isOpen ) {
			if ( !this._expectResizeEvent() ) {
				if ( this._ui.container.hasClass( "ui-popup-hidden" ) ) {
					// effectively rapid-open the popup while leaving the screen intact
					this._ui.container.removeClass( "ui-popup-hidden" );
					this.reposition( { positionTo: "window" } );
					this._ignoreResizeEvents();
				}

				this._resizeScreen();
				this._resizeData = null;
				this._orientationchangeInProgress = false;
			}
		} else {
			this._resizeData = null;
			this._orientationchangeInProgress = false;
		}
	},

	_ignoreResizeEvents: function() {
		var self = this;

		if ( this._ignoreResizeTo ) {
			clearTimeout( this._ignoreResizeTo );
		}
		this._ignoreResizeTo = setTimeout( function() { self._ignoreResizeTo = 0; }, 1000 );
	},

	_handleWindowResize: function( e ) {
		if ( this._isOpen && this._ignoreResizeTo === 0 ) {
			if ( ( this._expectResizeEvent() || this._orientationchangeInProgress ) &&
				!this._ui.container.hasClass( "ui-popup-hidden" ) ) {
				// effectively rapid-close the popup while leaving the screen intact
				this._ui.container
					.addClass( "ui-popup-hidden" )
					.removeAttr( "style" );
			}
		}
	},

	_handleWindowOrientationchange: function( e ) {
		if ( !this._orientationchangeInProgress && this._isOpen && this._ignoreResizeTo === 0 ) {
			this._expectResizeEvent();
			this._orientationchangeInProgress = true;
		}
	},

	// When the popup is open, attempting to focus on an element that is not a
	// child of the popup will redirect focus to the popup
	_handleDocumentFocusIn: function( e ) {
		var tgt = e.target, $tgt, ui = this._ui;

		if ( !this._isOpen ) {
			return;
		}

		if ( tgt !== ui.container[ 0 ] ) {
			$tgt = $( e.target );
			if ( 0 === $tgt.parents().filter( ui.container[ 0 ] ).length ) {
				$( document.activeElement ).one( "focus", function( e ) {
					$tgt.blur();
				});
				ui.focusElement.focus();
				e.preventDefault();
				e.stopImmediatePropagation();
				return false;
			} else if ( ui.focusElement[ 0 ] === ui.container[ 0 ] ) {
				ui.focusElement = $tgt;
			}
		}

		this._ignoreResizeEvents();
	},

	_create: function() {
		var ui = {
				screen: $( "<div class='ui-screen-hidden ui-popup-screen'></div>" ),
				placeholder: $( "<div style='display: none;'><!-- placeholder --></div>" ),
				container: $( "<div class='ui-popup-container ui-popup-hidden'></div>" )
			},
			thisPage = this.element.closest( ".ui-page" ),
			myId = this.element.attr( "id" ),
			o = this.options,
			key, value;

		// We need to adjust the history option to be false if there's no AJAX nav.
		// We can't do it in the option declarations because those are run before
		// it is determined whether there shall be AJAX nav.
		o.history = o.history && $.mobile.ajaxEnabled && $.mobile.hashListeningEnabled;

		if ( thisPage.length === 0 ) {
			thisPage = $( "body" );
		}

		// define the container for navigation event bindings
		// TODO this would be nice at the the mobile widget level
		o.container = o.container || $.mobile.pageContainer || thisPage;

		// Apply the proto
		thisPage.append( ui.screen );
		ui.container.insertAfter( ui.screen );
		// Leave a placeholder where the element used to be
		ui.placeholder.insertAfter( this.element );
		if ( myId ) {
			ui.screen.attr( "id", myId + "-screen" );
			ui.container.attr( "id", myId + "-popup" );
			ui.placeholder.html( "<!-- placeholder for " + myId + " -->" );
		}
		ui.container.append( this.element );
		ui.focusElement = ui.container;

		// Add class to popup element
		this.element.addClass( "ui-popup" );

		// Define instance variables
		$.extend( this, {
			_scrollTop: 0,
			_page: thisPage,
			_ui: ui,
			_fallbackTransition: "",
			_currentTransition: false,
			_prereqs: null,
			_isOpen: false,
			_tolerance: null,
			_resizeData: null,
			_ignoreResizeTo: 0,
			_orientationchangeInProgress: false
		});

		// This duplicates the code from the various option setters below for
		// better performance. It must be kept in sync with those setters.
		this._applyTheme( this.element, o.theme, "body" );
		this._applyTheme( this._ui.screen, o.overlayTheme, "overlay" );
		this._applyTransition( o.transition );
		this.element
			.toggleClass( "ui-overlay-shadow", o.shadow )
			.toggleClass( "ui-corner-all", o.corners );
		this._setTolerance( o.tolerance );

		ui.screen.bind( "vclick", $.proxy( this, "_eatEventAndClose" ) );

		this._on( $.mobile.window, {
			orientationchange: $.proxy( this, "_handleWindowOrientationchange" ),
			resize: $.proxy( this, "_handleWindowResize" ),
			keyup: $.proxy( this, "_handleWindowKeyUp" )
		});
		this._on( $.mobile.document, {
			focusin: $.proxy( this, "_handleDocumentFocusIn" )
		});
	},

	_applyTheme: function( dst, theme, prefix ) {
		var classes = ( dst.attr( "class" ) || "").split( " " ),
			alreadyAdded = true,
			currentTheme = null,
			matches,
			themeStr = String( theme );

		while ( classes.length > 0 ) {
			currentTheme = classes.pop();
			matches = ( new RegExp( "^ui-" + prefix + "-([a-z])$" ) ).exec( currentTheme );
			if ( matches && matches.length > 1 ) {
				currentTheme = matches[ 1 ];
				break;
			} else {
				currentTheme = null;
			}
		}

		if ( theme !== currentTheme ) {
			dst.removeClass( "ui-" + prefix + "-" + currentTheme );
			if ( ! ( theme === null || theme === "none" ) ) {
				dst.addClass( "ui-" + prefix + "-" + themeStr );
			}
		}
	},

	_setTheme: function( value ) {
		this._applyTheme( this.element, value, "body" );
	},

	_setOverlayTheme: function( value ) {
		this._applyTheme( this._ui.screen, value, "overlay" );

		if ( this._isOpen ) {
			this._ui.screen.addClass( "in" );
		}
	},

	_setShadow: function( value ) {
		this.element.toggleClass( "ui-overlay-shadow", value );
	},

	_setCorners: function( value ) {
		this.element.toggleClass( "ui-corner-all", value );
	},

	_applyTransition: function( value ) {
		this._ui.container.removeClass( this._fallbackTransition );
		if ( value && value !== "none" ) {
			this._fallbackTransition = $.mobile._maybeDegradeTransition( value );
			if ( this._fallbackTransition === "none" ) {
				this._fallbackTransition = "";
			}
			this._ui.container.addClass( this._fallbackTransition );
		}
	},

	_setTransition: function( value ) {
		if ( !this._currentTransition ) {
			this._applyTransition( value );
		}
	},

	_setTolerance: function( value ) {
		var tol = { t: 30, r: 15, b: 30, l: 15 };

		if ( value !== undefined ) {
			var ar = String( value ).split( "," );

			$.each( ar, function( idx, val ) { ar[ idx ] = parseInt( val, 10 ); } );

			switch( ar.length ) {
				// All values are to be the same
				case 1:
					if ( !isNaN( ar[ 0 ] ) ) {
						tol.t = tol.r = tol.b = tol.l = ar[ 0 ];
					}
					break;

				// The first value denotes top/bottom tolerance, and the second value denotes left/right tolerance
				case 2:
					if ( !isNaN( ar[ 0 ] ) ) {
						tol.t = tol.b = ar[ 0 ];
					}
					if ( !isNaN( ar[ 1 ] ) ) {
						tol.l = tol.r = ar[ 1 ];
					}
					break;

				// The array contains values in the order top, right, bottom, left
				case 4:
					if ( !isNaN( ar[ 0 ] ) ) {
						tol.t = ar[ 0 ];
					}
					if ( !isNaN( ar[ 1 ] ) ) {
						tol.r = ar[ 1 ];
					}
					if ( !isNaN( ar[ 2 ] ) ) {
						tol.b = ar[ 2 ];
					}
					if ( !isNaN( ar[ 3 ] ) ) {
						tol.l = ar[ 3 ];
					}
					break;

				default:
					break;
			}
		}

		this._tolerance = tol;
	},

	_setOption: function( key, value ) {
		var setter = "_set" + key.charAt( 0 ).toUpperCase() + key.slice( 1 );

		if ( this[ setter ] !== undefined ) {
			this[ setter ]( value );
		}

		this._super( key, value );
	},

	// Try and center the overlay over the given coordinates
	_placementCoords: function( desired ) {
		// rectangle within which the popup must fit
		var
			winCoords = windowCoords(),
			rc = {
				x: this._tolerance.l,
				y: winCoords.y + this._tolerance.t,
				cx: winCoords.cx - this._tolerance.l - this._tolerance.r,
				cy: winCoords.cy - this._tolerance.t - this._tolerance.b
			},
			menuSize, ret;

		// Clamp the width of the menu before grabbing its size
		this._ui.container.css( "max-width", rc.cx );
		menuSize = {
			cx: this._ui.container.outerWidth( true ),
			cy: this._ui.container.outerHeight( true )
		};

		// Center the menu over the desired coordinates, while not going outside
		// the window tolerances. This will center wrt. the window if the popup is too large.
		ret = {
			x: fitSegmentInsideSegment( rc.cx, menuSize.cx, rc.x, desired.x ),
			y: fitSegmentInsideSegment( rc.cy, menuSize.cy, rc.y, desired.y )
		};

		// Make sure the top of the menu is visible
		ret.y = Math.max( 0, ret.y );

		// If the height of the menu is smaller than the height of the document
		// align the bottom with the bottom of the document

		// fix for $.mobile.document.height() bug in core 1.7.2.
		var docEl = document.documentElement, docBody = document.body,
			docHeight = Math.max( docEl.clientHeight, docBody.scrollHeight, docBody.offsetHeight, docEl.scrollHeight, docEl.offsetHeight );

		ret.y -= Math.min( ret.y, Math.max( 0, ret.y + menuSize.cy - docHeight ) );

		return { left: ret.x, top: ret.y };
	},

	_createPrereqs: function( screenPrereq, containerPrereq, whenDone ) {
		var self = this, prereqs;

		// It is important to maintain both the local variable prereqs and self._prereqs. The local variable remains in
		// the closure of the functions which call the callbacks passed in. The comparison between the local variable and
		// self._prereqs is necessary, because once a function has been passed to .animationComplete() it will be called
		// next time an animation completes, even if that's not the animation whose end the function was supposed to catch
		// (for example, if an abort happens during the opening animation, the .animationComplete handler is not called for
		// that animation anymore, but the handler remains attached, so it is called the next time the popup is opened
		// - making it stale. Comparing the local variable prereqs to the widget-level variable self._prereqs ensures that
		// callbacks triggered by a stale .animationComplete will be ignored.

		prereqs = {
			screen: $.Deferred(),
			container: $.Deferred()
		};

		prereqs.screen.then( function() {
			if ( prereqs === self._prereqs ) {
				screenPrereq();
			}
		});

		prereqs.container.then( function() {
			if ( prereqs === self._prereqs ) {
				containerPrereq();
			}
		});

		$.when( prereqs.screen, prereqs.container ).done( function() {
			if ( prereqs === self._prereqs ) {
				self._prereqs = null;
				whenDone();
			}
		});

		self._prereqs = prereqs;
	},

	_animate: function( args ) {
		// NOTE before removing the default animation of the screen
		//      this had an animate callback that would resolve the deferred
		//      now the deferred is resolved immediately
		// TODO remove the dependency on the screen deferred
		this._ui.screen
			.removeClass( args.classToRemove )
			.addClass( args.screenClassToAdd );

		args.prereqs.screen.resolve();

		if ( args.transition && args.transition !== "none" ) {
			if ( args.applyTransition ) {
				this._applyTransition( args.transition );
			}
			if ( this._fallbackTransition ) {
				this._ui.container
					.animationComplete( $.proxy( args.prereqs.container, "resolve" ) )
					.addClass( args.containerClassToAdd )
					.removeClass( args.classToRemove );
				return;
			}
		}
		this._ui.container.removeClass( args.classToRemove );
		args.prereqs.container.resolve();
	},

	// The desired coordinates passed in will be returned untouched if no reference element can be identified via
	// desiredPosition.positionTo. Nevertheless, this function ensures that its return value always contains valid
	// x and y coordinates by specifying the center middle of the window if the coordinates are absent.
	// options: { x: coordinate, y: coordinate, positionTo: string: "origin", "window", or jQuery selector
	_desiredCoords: function( o ) {
		var dst = null, offset, winCoords = windowCoords(), x = o.x, y = o.y, pTo = o.positionTo;

		// Establish which element will serve as the reference
		if ( pTo && pTo !== "origin" ) {
			if ( pTo === "window" ) {
				x = winCoords.cx / 2 + winCoords.x;
				y = winCoords.cy / 2 + winCoords.y;
			} else {
				try {
					dst = $( pTo );
				} catch( e ) {
					dst = null;
				}
				if ( dst ) {
					dst.filter( ":visible" );
					if ( dst.length === 0 ) {
						dst = null;
					}
				}
			}
		}

		// If an element was found, center over it
		if ( dst ) {
			offset = dst.offset();
			x = offset.left + dst.outerWidth() / 2;
			y = offset.top + dst.outerHeight() / 2;
		}

		// Make sure x and y are valid numbers - center over the window
		if ( $.type( x ) !== "number" || isNaN( x ) ) {
			x = winCoords.cx / 2 + winCoords.x;
		}
		if ( $.type( y ) !== "number" || isNaN( y ) ) {
			y = winCoords.cy / 2 + winCoords.y;
		}

		return { x: x, y: y };
	},

	_reposition: function( o ) {
		// We only care about position-related parameters for repositioning
		o = { x: o.x, y: o.y, positionTo: o.positionTo };
		this._trigger( "beforeposition", undefined, o );
		this._ui.container.offset( this._placementCoords( this._desiredCoords( o ) ) );
	},

	reposition: function( o ) {
		if ( this._isOpen ) {
			this._reposition( o );
		}
	},

	_openPrereqsComplete: function() {
		this._ui.container.addClass( "ui-popup-active" );
		this._isOpen = true;
		this._resizeScreen();
		this._ui.container.attr( "tabindex", "0" ).focus();
		this._ignoreResizeEvents();
		this._trigger( "afteropen" );
	},

	_open: function( options ) {
		var o = $.extend( {}, this.options, options ),
			// TODO move blacklist to private method
			androidBlacklist = ( function() {
				var w = window,
					ua = navigator.userAgent,
					// Rendering engine is Webkit, and capture major version
					wkmatch = ua.match( /AppleWebKit\/([0-9\.]+)/ ),
					wkversion = !!wkmatch && wkmatch[ 1 ],
					androidmatch = ua.match( /Android (\d+(?:\.\d+))/ ),
					andversion = !!androidmatch && androidmatch[ 1 ],
					chromematch = ua.indexOf( "Chrome" ) > -1;

				// Platform is Android, WebKit version is greater than 534.13 ( Android 3.2.1 ) and not Chrome.
				if( androidmatch !== null && andversion === "4.0" && wkversion && wkversion > 534.13 && !chromematch ) {
					return true;
				}
				return false;
			}());

		// Count down to triggering "popupafteropen" - we have two prerequisites:
		// 1. The popup window animation completes (container())
		// 2. The screen opacity animation completes (screen())
		this._createPrereqs(
			$.noop,
			$.noop,
			$.proxy( this, "_openPrereqsComplete" ) );

		this._currentTransition = o.transition;
		this._applyTransition( o.transition );

		if ( !this.options.theme ) {
			this._setTheme( this._page.jqmData( "theme" ) || $.mobile.getInheritedTheme( this._page, "c" ) );
		}

		this._ui.screen.removeClass( "ui-screen-hidden" );
		this._ui.container.removeClass( "ui-popup-hidden" );

		// Give applications a chance to modify the contents of the container before it appears
		this._reposition( o );

		if ( this.options.overlayTheme && androidBlacklist ) {
			/* TODO:
			The native browser on Android 4.0.X ("Ice Cream Sandwich") suffers from an issue where the popup overlay appears to be z-indexed
			above the popup itself when certain other styles exist on the same page -- namely, any element set to `position: fixed` and certain
			types of input. These issues are reminiscent of previously uncovered bugs in older versions of Android's native browser:
			https://github.com/scottjehl/Device-Bugs/issues/3

			This fix closes the following bugs ( I use "closes" with reluctance, and stress that this issue should be revisited as soon as possible ):

			https://github.com/jquery/jquery-mobile/issues/4816
			https://github.com/jquery/jquery-mobile/issues/4844
			https://github.com/jquery/jquery-mobile/issues/4874
			*/

			// TODO sort out why this._page isn't working
			this.element.closest( ".ui-page" ).addClass( "ui-popup-open" );
		}
		this._animate({
			additionalCondition: true,
			transition: o.transition,
			classToRemove: "",
			screenClassToAdd: "in",
			containerClassToAdd: "in",
			applyTransition: false,
			prereqs: this._prereqs
		});
	},

	_closePrereqScreen: function() {
		this._ui.screen
			.removeClass( "out" )
			.addClass( "ui-screen-hidden" );
	},

	_closePrereqContainer: function() {
		this._ui.container
			.removeClass( "reverse out" )
			.addClass( "ui-popup-hidden" )
			.removeAttr( "style" );
	},

	_closePrereqsDone: function() {
		var container = this._ui.container;

		container.removeAttr( "tabindex" );

		// remove the global mutex for popups
		$.mobile.popup.active = undefined;

		// Blur elements inside the container, including the container
		$( ":focus", container[ 0 ] ).add( container[ 0 ] ).blur();

		// alert users that the popup is closed
		this._trigger( "afterclose" );
	},

	_close: function( immediate ) {
		this._ui.container.removeClass( "ui-popup-active" );
		this._page.removeClass( "ui-popup-open" );

		this._isOpen = false;

		// Count down to triggering "popupafterclose" - we have two prerequisites:
		// 1. The popup window reverse animation completes (container())
		// 2. The screen opacity animation completes (screen())
		this._createPrereqs(
			$.proxy( this, "_closePrereqScreen" ),
			$.proxy( this, "_closePrereqContainer" ),
			$.proxy( this, "_closePrereqsDone" ) );

		this._animate( {
			additionalCondition: this._ui.screen.hasClass( "in" ),
			transition: ( immediate ? "none" : ( this._currentTransition ) ),
			classToRemove: "in",
			screenClassToAdd: "out",
			containerClassToAdd: "reverse out",
			applyTransition: true,
			prereqs: this._prereqs
		});
	},

	_unenhance: function() {
		// Put the element back to where the placeholder was and remove the "ui-popup" class
		this._setTheme( "none" );
		this.element
			// Cannot directly insertAfter() - we need to detach() first, because
			// insertAfter() will do nothing if the payload div was not attached
			// to the DOM at the time the widget was created, and so the payload
			// will remain inside the container even after we call insertAfter().
			// If that happens and we remove the container a few lines below, we
			// will cause an infinite recursion - #5244
			.detach()
			.insertAfter( this._ui.placeholder )
			.removeClass( "ui-popup ui-overlay-shadow ui-corner-all" );
		this._ui.screen.remove();
		this._ui.container.remove();
		this._ui.placeholder.remove();
	},

	_destroy: function() {
		if ( $.mobile.popup.active === this ) {
			this.element.one( "popupafterclose", $.proxy( this, "_unenhance" ) );
			this.close();
		} else {
			this._unenhance();
		}
	},

	_closePopup: function( e, data ) {
		var parsedDst, toUrl, o = this.options, immediate = false;

		// restore location on screen
		window.scrollTo( 0, this._scrollTop );

		if ( e && e.type === "pagebeforechange" && data ) {
			// Determine whether we need to rapid-close the popup, or whether we can
			// take the time to run the closing transition
			if ( typeof data.toPage === "string" ) {
				parsedDst = data.toPage;
			} else {
				parsedDst = data.toPage.jqmData( "url" );
			}
			parsedDst = $.mobile.path.parseUrl( parsedDst );
			toUrl = parsedDst.pathname + parsedDst.search + parsedDst.hash;

			if ( this._myUrl !== $.mobile.path.makeUrlAbsolute( toUrl ) ) {
				// Going to a different page - close immediately
				immediate = true;
			} else {
				e.preventDefault();
			}
		}

		// remove nav bindings
		o.container.unbind( o.closeEvents );
		// unbind click handlers added when history is disabled
		this.element.undelegate( o.closeLinkSelector, o.closeLinkEvents );

		this._close( immediate );
	},

	// any navigation event after a popup is opened should close the popup
	// NOTE the pagebeforechange is bound to catch navigation events that don't
	//      alter the url (eg, dialogs from popups)
	_bindContainerClose: function() {
		this.options.container
			.one( this.options.closeEvents, $.proxy( this, "_closePopup" ) );
	},

	// TODO no clear deliniation of what should be here and
	// what should be in _open. Seems to be "visual" vs "history" for now
	open: function( options ) {
		var self = this, opts = this.options, url, hashkey, activePage, currentIsDialog, hasHash, urlHistory;

		// make sure open is idempotent
		if( $.mobile.popup.active ) {
			return;
		}

		// set the global popup mutex
		$.mobile.popup.active = this;
		this._scrollTop = $.mobile.window.scrollTop();

		// if history alteration is disabled close on navigate events
		// and leave the url as is
		if( !( opts.history ) ) {
			self._open( options );
			self._bindContainerClose();

			// When histoy is disabled we have to grab the data-rel
			// back link clicks so we can close the popup instead of
			// relying on history to do it for us
			self.element
				.delegate( opts.closeLinkSelector, opts.closeLinkEvents, function( e ) {
					self.close();
					e.preventDefault();
				});

			return;
		}

		// cache some values for min/readability
		urlHistory = $.mobile.urlHistory;
		hashkey = $.mobile.dialogHashKey;
		activePage = $.mobile.activePage;
		currentIsDialog = activePage.is( ".ui-dialog" );
		this._myUrl = url = urlHistory.getActive().url;
		hasHash = ( url.indexOf( hashkey ) > -1 ) && !currentIsDialog && ( urlHistory.activeIndex > 0 );

		if ( hasHash ) {
			self._open( options );
			self._bindContainerClose();
			return;
		}

		// if the current url has no dialog hash key proceed as normal
		// otherwise, if the page is a dialog simply tack on the hash key
		if ( url.indexOf( hashkey ) === -1 && !currentIsDialog ){
			url = url + (url.indexOf( "#" ) > -1 ? hashkey : "#" + hashkey);
		} else {
			url = $.mobile.path.parseLocation().hash + hashkey;
		}

		// Tack on an extra hashkey if this is the first page and we've just reconstructed the initial hash
		if ( urlHistory.activeIndex === 0 && url === urlHistory.initialDst ) {
			url += hashkey;
		}

		// swallow the the initial navigation event, and bind for the next
		$(window).one( "beforenavigate", function( e ) {
			e.preventDefault();
			self._open( options );
			self._bindContainerClose();
		});

		this.urlAltered = true;
		$.mobile.navigate( url, {role: "dialog"} );
	},

	close: function() {
		// make sure close is idempotent
		if( $.mobile.popup.active !== this ) {
			return;
		}

		this._scrollTop = $.mobile.window.scrollTop();

		if( this.options.history && this.urlAltered ) {
			$.mobile.back();
			this.urlAltered = false;
		} else {
			// simulate the nav bindings having fired
			this._closePopup();
		}
	}
});


// TODO this can be moved inside the widget
$.mobile.popup.handleLink = function( $link ) {
	var closestPage = $link.closest( ":jqmData(role='page')" ),
		scope = ( ( closestPage.length === 0 ) ? $( "body" ) : closestPage ),
		// NOTE make sure to get only the hash, ie7 (wp7) return the absolute href
		//      in this case ruining the element selection
		popup = $( $.mobile.path.parseUrl($link.attr( "href" )).hash, scope[0] ),
		offset;

	if ( popup.data( "mobile-popup" ) ) {
		offset = $link.offset();
		popup.popup( "open", {
			x: offset.left + $link.outerWidth() / 2,
			y: offset.top + $link.outerHeight() / 2,
			transition: $link.jqmData( "transition" ),
			positionTo: $link.jqmData( "position-to" )
		});
	}

	//remove after delay
	setTimeout( function() {
		// Check if we are in a listview
		var $parent = $link.parent().parent();
		if ($parent.hasClass("ui-li")) {
			$link = $parent.parent();
		}
		$link.removeClass( $.mobile.activeBtnClass );
	}, 300 );
};

// TODO move inside _create
$.mobile.document.bind( "pagebeforechange", function( e, data ) {
	if ( data.options.role === "popup" ) {
		$.mobile.popup.handleLink( data.options.link );
		e.preventDefault();
	}
});

$.mobile.document.bind( "pagecreate create", function( e )  {
	$.mobile.popup.prototype.enhanceWithin( e.target, true );
});

})( jQuery );

/*
* custom "selectmenu" plugin
*/

(function( $, undefined ) {
	var extendSelect = function( widget ) {

		var select = widget.select,
			origDestroy = widget._destroy,
			selectID  = widget.selectID,
			prefix = ( selectID ? selectID : ( ( $.mobile.ns || "" ) + "uuid-" + widget.uuid ) ),
			popupID = prefix + "-listbox",
			dialogID = prefix + "-dialog",
			label = widget.label,
			thisPage = widget.select.closest( ".ui-page" ),
			selectOptions = widget._selectOptions(),
			isMultiple = widget.isMultiple = widget.select[ 0 ].multiple,
			buttonId = selectID + "-button",
			menuId = selectID + "-menu",
			menuPage = $( "<div data-" + $.mobile.ns + "role='dialog' id='" + dialogID + "' data-" +$.mobile.ns + "theme='"+ widget.options.theme +"' data-" +$.mobile.ns + "overlay-theme='"+ widget.options.overlayTheme +"'>" +
				"<div data-" + $.mobile.ns + "role='header'>" +
				"<div class='ui-title'>" + label.getEncodedText() + "</div>"+
				"</div>"+
				"<div data-" + $.mobile.ns + "role='content'></div>"+
				"</div>" ),

			listbox =  $( "<div id='" + popupID + "' class='ui-selectmenu'>" ).insertAfter( widget.select ).popup( { theme: widget.options.overlayTheme } ),

			list = $( "<ul>", {
				"class": "ui-selectmenu-list",
				"id": menuId,
				"role": "listbox",
				"aria-labelledby": buttonId
				}).attr( "data-" + $.mobile.ns + "theme", widget.options.theme )
					.attr( "data-" + $.mobile.ns + "divider-theme", widget.options.dividerTheme )
					.appendTo( listbox ),


			header = $( "<div>", {
				"class": "ui-header ui-bar-" + widget.options.theme
			}).prependTo( listbox ),

			headerTitle = $( "<h1>", {
				"class": "ui-title"
			}).appendTo( header ),

			menuPageContent,
			menuPageClose,
			headerClose;

		if ( widget.isMultiple ) {
			headerClose = $( "<a>", {
				"text": widget.options.closeText,
				"href": "#",
				"class": "ui-btn-left"
			}).attr( "data-" + $.mobile.ns + "iconpos", "notext" ).attr( "data-" + $.mobile.ns + "icon", "delete" ).appendTo( header ).buttonMarkup();
		}

		$.extend( widget, {
			select: widget.select,
			selectID: selectID,
			buttonId: buttonId,
			menuId: menuId,
			popupID: popupID,
			dialogID: dialogID,
			thisPage: thisPage,
			menuPage: menuPage,
			label: label,
			selectOptions: selectOptions,
			isMultiple: isMultiple,
			theme: widget.options.theme,
			listbox: listbox,
			list: list,
			header: header,
			headerTitle: headerTitle,
			headerClose: headerClose,
			menuPageContent: menuPageContent,
			menuPageClose: menuPageClose,
			placeholder: "",

			build: function() {
				var self = this,
					escapeId = function( id ) {
						return id.replace( /([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g, "\\$1" );
					};

				// Create list from select, update state
				self.refresh();

				if ( self._origTabIndex === undefined ) {
					// Map undefined to false, because self._origTabIndex === undefined
					// indicates that we have not yet checked whether the select has
					// originally had a tabindex attribute, whereas false indicates that
					// we have checked the select for such an attribute, and have found
					// none present.
					self._origTabIndex = ( self.select[ 0 ].getAttribute( "tabindex" ) === null ) ? false : self.select.attr( "tabindex" );
				}
				self.select.attr( "tabindex", "-1" ).focus(function() {
					$( this ).blur();
					self.button.focus();
				});

				// Button events
				self.button.bind( "vclick keydown" , function( event ) {
					if ( self.options.disabled || self.isOpen ) {
						return;
					}

					if (event.type === "vclick" ||
							event.keyCode && (event.keyCode === $.mobile.keyCode.ENTER ||
																event.keyCode === $.mobile.keyCode.SPACE)) {

						self._decideFormat();
						if ( self.menuType === "overlay" ) {
							self.button.attr( "href", "#" + escapeId( self.popupID ) ).attr( "data-" + ( $.mobile.ns || "" ) + "rel", "popup" );
						} else {
							self.button.attr( "href", "#" + escapeId( self.dialogID ) ).attr( "data-" + ( $.mobile.ns || "" ) + "rel", "dialog" );
						}
						self.isOpen = true;
						// Do not prevent default, so the navigation may have a chance to actually open the chosen format
					}
				});

				// Events for list items
				self.list.attr( "role", "listbox" )
					.bind( "focusin", function( e ) {
						$( e.target )
							.attr( "tabindex", "0" )
							.trigger( "vmouseover" );

					})
					.bind( "focusout", function( e ) {
						$( e.target )
							.attr( "tabindex", "-1" )
							.trigger( "vmouseout" );
					})
					.delegate( "li:not(.ui-disabled, .ui-li-divider)", "click", function( event ) {

						// index of option tag to be selected
						var oldIndex = self.select[ 0 ].selectedIndex,
							newIndex = self.list.find( "li:not(.ui-li-divider)" ).index( this ),
							option = self._selectOptions().eq( newIndex )[ 0 ];

						// toggle selected status on the tag for multi selects
						option.selected = self.isMultiple ? !option.selected : true;

						// toggle checkbox class for multiple selects
						if ( self.isMultiple ) {
							$( this ).find( ".ui-icon" )
								.toggleClass( "ui-icon-checkbox-on", option.selected )
								.toggleClass( "ui-icon-checkbox-off", !option.selected );
						}

						// trigger change if value changed
						if ( self.isMultiple || oldIndex !== newIndex ) {
							self.select.trigger( "change" );
						}

						// hide custom select for single selects only - otherwise focus clicked item
						// We need to grab the clicked item the hard way, because the list may have been rebuilt
						if ( self.isMultiple ) {
							self.list.find( "li:not(.ui-li-divider)" ).eq( newIndex )
								.addClass( "ui-btn-down-" + widget.options.theme ).find( "a" ).first().focus();
						}
						else {
							self.close();
						}

						event.preventDefault();
					})
					.keydown(function( event ) {  //keyboard events for menu items
						var target = $( event.target ),
							li = target.closest( "li" ),
							prev, next;

						// switch logic based on which key was pressed
						switch ( event.keyCode ) {
							// up or left arrow keys
						case 38:
							prev = li.prev().not( ".ui-selectmenu-placeholder" );

							if ( prev.is( ".ui-li-divider" ) ) {
								prev = prev.prev();
							}

							// if there's a previous option, focus it
							if ( prev.length ) {
								target
									.blur()
									.attr( "tabindex", "-1" );

								prev.addClass( "ui-btn-down-" + widget.options.theme ).find( "a" ).first().focus();
							}

							return false;
							// down or right arrow keys
						case 40:
							next = li.next();

							if ( next.is( ".ui-li-divider" ) ) {
								next = next.next();
							}

							// if there's a next option, focus it
							if ( next.length ) {
								target
									.blur()
									.attr( "tabindex", "-1" );

								next.addClass( "ui-btn-down-" + widget.options.theme ).find( "a" ).first().focus();
							}

							return false;
							// If enter or space is pressed, trigger click
						case 13:
						case 32:
							target.trigger( "click" );

							return false;
						}
					});

				// button refocus ensures proper height calculation
				// by removing the inline style and ensuring page inclusion
				self.menuPage.bind( "pagehide", function() {
					// TODO centralize page removal binding / handling in the page plugin.
					// Suggestion from @jblas to do refcounting
					//
					// TODO extremely confusing dependency on the open method where the pagehide.remove
					// bindings are stripped to prevent the parent page from disappearing. The way
					// we're keeping pages in the DOM right now sucks
					//
					// rebind the page remove that was unbound in the open function
					// to allow for the parent page removal from actions other than the use
					// of a dialog sized custom select
					//
					// doing this here provides for the back button on the custom select dialog
					$.mobile._bindPageRemove.call( self.thisPage );
				});

				// Events on the popup
				self.listbox.bind( "popupafterclose", function( event ) {
					self.close();
				});

				// Close button on small overlays
				if ( self.isMultiple ) {
					self.headerClose.click(function() {
						if ( self.menuType === "overlay" ) {
							self.close();
							return false;
						}
					});
				}

				// track this dependency so that when the parent page
				// is removed on pagehide it will also remove the menupage
				self.thisPage.addDependents( this.menuPage );
			},

			_isRebuildRequired: function() {
				var list = this.list.find( "li" ),
					options = this._selectOptions();

				// TODO exceedingly naive method to determine difference
				// ignores value changes etc in favor of a forcedRebuild
				// from the user in the refresh method
				return options.text() !== list.text();
			},

			selected: function() {
				return this._selectOptions().filter( ":selected:not( :jqmData(placeholder='true') )" );
			},

			refresh: function( forceRebuild , foo ) {
				var self = this,
				select = this.element,
				isMultiple = this.isMultiple,
				indicies;

				if (  forceRebuild || this._isRebuildRequired() ) {
					self._buildList();
				}

				indicies = this.selectedIndices();

				self.setButtonText();
				self.setButtonCount();

				self.list.find( "li:not(.ui-li-divider)" )
					.removeClass( $.mobile.activeBtnClass )
					.attr( "aria-selected", false )
					.each(function( i ) {

						if ( $.inArray( i, indicies ) > -1 ) {
							var item = $( this );

							// Aria selected attr
							item.attr( "aria-selected", true );

							// Multiple selects: add the "on" checkbox state to the icon
							if ( self.isMultiple ) {
								item.find( ".ui-icon" ).removeClass( "ui-icon-checkbox-off" ).addClass( "ui-icon-checkbox-on" );
							} else {
								if ( item.is( ".ui-selectmenu-placeholder" ) ) {
									item.next().addClass( $.mobile.activeBtnClass );
								} else {
									item.addClass( $.mobile.activeBtnClass );
								}
							}
						}
					});
			},

			close: function() {
				if ( this.options.disabled || !this.isOpen ) {
					return;
				}

				var self = this;

				if ( self.menuType === "page" ) {
					self.menuPage.dialog( "close" );
					self.list.appendTo( self.listbox );
				} else {
					self.listbox.popup( "close" );
				}

				self._focusButton();
				// allow the dialog to be closed again
				self.isOpen = false;
			},

			open: function() {
				this.button.click();
			},

			_decideFormat: function() {
				var self = this,
					$window = $.mobile.window,
					selfListParent = self.list.parent(),
					menuHeight = selfListParent.outerHeight(),
					menuWidth = selfListParent.outerWidth(),
					activePage = $( "." + $.mobile.activePageClass ),
					scrollTop = $window.scrollTop(),
					btnOffset = self.button.offset().top,
					screenHeight = $window.height(),
					screenWidth = $window.width();

				function focusMenuItem() {
					var selector = self.list.find( "." + $.mobile.activeBtnClass + " a" );
					if ( selector.length === 0 ) {
						selector = self.list.find( "li.ui-btn:not( :jqmData(placeholder='true') ) a" );
					}
					selector.first().focus().closest( "li" ).addClass( "ui-btn-down-" + widget.options.theme );
				}

				if ( menuHeight > screenHeight - 80 || !$.support.scrollTop ) {

					self.menuPage.appendTo( $.mobile.pageContainer ).page();
					self.menuPageContent = menuPage.find( ".ui-content" );
					self.menuPageClose = menuPage.find( ".ui-header a" );

					// prevent the parent page from being removed from the DOM,
					// otherwise the results of selecting a list item in the dialog
					// fall into a black hole
					self.thisPage.unbind( "pagehide.remove" );

					//for WebOS/Opera Mini (set lastscroll using button offset)
					if ( scrollTop === 0 && btnOffset > screenHeight ) {
						self.thisPage.one( "pagehide", function() {
							$( this ).jqmData( "lastScroll", btnOffset );
						});
					}

					self.menuPage
						.one( "pageshow", function() {
							focusMenuItem();
						})
						.one( "pagehide", function() {
							self.close();
						});

					self.menuType = "page";
					self.menuPageContent.append( self.list );
					self.menuPage.find("div .ui-title").text(self.label.text());
				} else {
					self.menuType = "overlay";

					self.listbox.one( "popupafteropen", focusMenuItem );
				}
			},

			_buildList: function() {
				var self = this,
					o = this.options,
					placeholder = this.placeholder,
					needPlaceholder = true,
					optgroups = [],
					lis = [],
					dataIcon = self.isMultiple ? "checkbox-off" : "false";

				self.list.empty().filter( ".ui-listview" ).listview( "destroy" );

				var $options = self.select.find( "option" ),
					numOptions = $options.length,
					select = this.select[ 0 ],
					dataPrefix = 'data-' + $.mobile.ns,
					dataIndexAttr = dataPrefix + 'option-index',
					dataIconAttr = dataPrefix + 'icon',
					dataRoleAttr = dataPrefix + 'role',
					dataPlaceholderAttr = dataPrefix + 'placeholder',
					fragment = document.createDocumentFragment(),
					isPlaceholderItem = false,
					optGroup;

				for (var i = 0; i < numOptions;i++, isPlaceholderItem = false) {
					var option = $options[i],
						$option = $( option ),
						parent = option.parentNode,
						text = $option.text(),
						anchor  = document.createElement( 'a' ),
						classes = [];

					anchor.setAttribute( 'href', '#' );
					anchor.appendChild( document.createTextNode( text ) );

					// Are we inside an optgroup?
					if ( parent !== select && parent.nodeName.toLowerCase() === "optgroup" ) {
						var optLabel = parent.getAttribute( 'label' );
						if ( optLabel !== optGroup ) {
							var divider = document.createElement( 'li' );
							divider.setAttribute( dataRoleAttr, 'list-divider' );
							divider.setAttribute( 'role', 'option' );
							divider.setAttribute( 'tabindex', '-1' );
							divider.appendChild( document.createTextNode( optLabel ) );
							fragment.appendChild( divider );
							optGroup = optLabel;
						}
					}

					if ( needPlaceholder && ( !option.getAttribute( "value" ) || text.length === 0 || $option.jqmData( "placeholder" ) ) ) {
						needPlaceholder = false;
						isPlaceholderItem = true;

						// If we have identified a placeholder, record the fact that it was
						// us who have added the placeholder to the option and mark it
						// retroactively in the select as well
						if ( null === option.getAttribute( dataPlaceholderAttr ) ) {
							this._removePlaceholderAttr = true;
						}
						option.setAttribute( dataPlaceholderAttr, true );
						if ( o.hidePlaceholderMenuItems ) {
							classes.push( "ui-selectmenu-placeholder" );
						}
						if ( placeholder !== text ) {
							placeholder = self.placeholder = text;
						}
					}

					var item = document.createElement('li');
					if ( option.disabled ) {
						classes.push( "ui-disabled" );
						item.setAttribute('aria-disabled',true);
					}
					item.setAttribute( dataIndexAttr,i );
					item.setAttribute( dataIconAttr, dataIcon );
					if ( isPlaceholderItem ) {
						item.setAttribute( dataPlaceholderAttr, true );
					}
					item.className = classes.join( " " );
					item.setAttribute( 'role', 'option' );
					anchor.setAttribute( 'tabindex', '-1' );
					item.appendChild( anchor );
					fragment.appendChild( item );
				}

				self.list[0].appendChild( fragment );

				// Hide header if it's not a multiselect and there's no placeholder
				if ( !this.isMultiple && !placeholder.length ) {
					this.header.hide();
				} else {
					this.headerTitle.text( this.placeholder );
				}

				// Now populated, create listview
				self.list.listview();
			},

			_button: function() {
				return $( "<a>", {
					"href": "#",
					"role": "button",
					// TODO value is undefined at creation
					"id": this.buttonId,
					"aria-haspopup": "true",

					// TODO value is undefined at creation
					"aria-owns": this.menuId
				});
			},

			_destroy: function() {
				this.close();

				// Restore the tabindex attribute to its original value
				if ( this._origTabIndex !== undefined ) {
					if ( this._origTabIndex !== false ) {
						this.select.attr( "tabindex", this._origTabIndex );
					} else {
						this.select.removeAttr( "tabindex" );
					}
				}

				// Remove the placeholder attribute if we were the ones to add it
				if ( this._removePlaceholderAttr ) {
					this._selectOptions().removeAttr( "data-" + $.mobile.ns + "placeholder" );
				}

				// Remove the popup
				this.listbox.remove();

				// Remove the dialog
				this.menuPage.remove();

				// Chain up
				origDestroy.apply( this, arguments );
			}
		});
	};

	// issue #3894 - core doesn't trigger events on disabled delegates
	$.mobile.document.bind( "selectmenubeforecreate", function( event ) {
		var selectmenuWidget = $( event.target ).data( "mobile-selectmenu" );

		if ( !selectmenuWidget.options.nativeMenu &&
				selectmenuWidget.element.parents( ":jqmData(role='popup')" ).length === 0 ) {
			extendSelect( selectmenuWidget );
		}
	});
})( jQuery );

(function( $, undefined ) {

	$.widget( "mobile.controlgroup", $.mobile.widget, $.extend( {
		options: {
			shadow: false,
			corners: true,
			excludeInvisible: true,
			type: "vertical",
			mini: false,
			initSelector: ":jqmData(role='controlgroup')"
		},

		_create: function() {
			var $el = this.element,
				ui = {
					inner: $( "<div class='ui-controlgroup-controls'></div>" ),
					legend: $( "<div role='heading' class='ui-controlgroup-label'></div>" )
				},
				grouplegend = $el.children( "legend" ),
				self = this;

			// Apply the proto
			$el.wrapInner( ui.inner );
			if ( grouplegend.length ) {
				ui.legend.append( grouplegend ).insertBefore( $el.children( 0 ) );
			}
			$el.addClass( "ui-corner-all ui-controlgroup" );

			$.extend( this, {
				_initialRefresh: true
			});

			$.each( this.options, function( key, value ) {
				// Cause initial options to be applied by their handler by temporarily setting the option to undefined
				// - the handler then sets it to the initial value
				self.options[ key ] = undefined;
				self._setOption( key, value, true );
			});
		},

		_init: function() {
			this.refresh();
		},

		_setOption: function( key, value ) {
			var setter = "_set" + key.charAt( 0 ).toUpperCase() + key.slice( 1 );

			if ( this[ setter ] !== undefined ) {
				this[ setter ]( value );
			}

			this._super( key, value );
			this.element.attr( "data-" + ( $.mobile.ns || "" ) + ( key.replace( /([A-Z])/, "-$1" ).toLowerCase() ), value );
		},

		_setType: function( value ) {
			this.element
				.removeClass( "ui-controlgroup-horizontal ui-controlgroup-vertical" )
				.addClass( "ui-controlgroup-" + value );
			this.refresh();
		},

		_setCorners: function( value ) {
			this.element.toggleClass( "ui-corner-all", value );
		},

		_setShadow: function( value ) {
			this.element.toggleClass( "ui-shadow", value );
		},

		_setMini: function( value ) {
			this.element.toggleClass( "ui-mini", value );
		},

		container: function() {
			return this.element.children( ".ui-controlgroup-controls" );
		},

		refresh: function() {
			var els = this.element.find( ".ui-btn" ).not( ".ui-slider-handle" ),
				create = this._initialRefresh;
			if ( $.mobile.checkboxradio ) {
				this.element.find( ":mobile-checkboxradio" ).checkboxradio( "refresh" );
			}
			this._addFirstLastClasses( els, this.options.excludeInvisible ? this._getVisibles( els, create ) : els, create );
			this._initialRefresh = false;
		}
	}, $.mobile.behaviors.addFirstLastClasses ) );

	// TODO: Implement a mechanism to allow widgets to become enhanced in the
	// correct order when their correct enhancement depends on other widgets in
	// the page being correctly enhanced already.
	//
	// For now, we wait until dom-ready to attach the controlgroup's enhancement
	// hook, because by that time, all the other widgets' enhancement hooks should
	// already be in place, ensuring that all widgets that need to be grouped will
	// already have been enhanced by the time the controlgroup is created.
	$( function() {
		$.mobile.document.bind( "pagecreate create", function( e )  {
			$.mobile.controlgroup.prototype.enhanceWithin( e.target, true );
		});
	});
})(jQuery);

(function( $, undefined ) {

$( document ).bind( "pagecreate create", function( e ) {

	//links within content areas, tests included with page
	$( e.target )
		.find( "a" )
		.jqmEnhanceable()
		.filter( ":jqmData(rel='popup')[href][href!='']" )
		.each( function() {
			// Accessibility info for popups
			var e = this,
				href = $( this ).attr( "href" ),
				idref = href.substring( 1 );

			e.setAttribute( "aria-haspopup", true );
			e.setAttribute( "aria-owns", idref );
			e.setAttribute( "aria-expanded", false );
			$( document )
				.on( "popupafteropen", href, function() {
					e.setAttribute( "aria-expanded", true );
				})
				.on( "popupafterclose", href, function() {
					e.setAttribute( "aria-expanded", false );
				});
		})
		.end()
		.not( ".ui-btn, .ui-link-inherit, :jqmData(role='none'), :jqmData(role='nojs')" )
		.addClass( "ui-link" );

});

})( jQuery );


(function( $, undefined ) {


	$.widget( "mobile.fixedtoolbar", $.mobile.widget, {
		options: {
			visibleOnPageShow: true,
			disablePageZoom: true,
			transition: "slide", //can be none, fade, slide (slide maps to slideup or slidedown)
			fullscreen: false,
			tapToggle: true,
			tapToggleBlacklist: "a, button, input, select, textarea, .ui-header-fixed, .ui-footer-fixed, .ui-popup, .ui-panel, .ui-panel-dismiss-open",
			hideDuringFocus: "input, textarea, select",
			updatePagePadding: true,
			trackPersistentToolbars: true,

			// Browser detection! Weeee, here we go...
			// Unfortunately, position:fixed is costly, not to mention probably impossible, to feature-detect accurately.
			// Some tests exist, but they currently return false results in critical devices and browsers, which could lead to a broken experience.
			// Testing fixed positioning is also pretty obtrusive to page load, requiring injected elements and scrolling the window
			// The following function serves to rule out some popular browsers with known fixed-positioning issues
			// This is a plugin option like any other, so feel free to improve or overwrite it
			supportBlacklist: function() {
				return !$.support.fixedPosition;
			},
			initSelector: ":jqmData(position='fixed')"
		},

		_create: function() {

			var self = this,
				o = self.options,
				$el = self.element,
				tbtype = $el.is( ":jqmData(role='header')" ) ? "header" : "footer",
				$page = $el.closest( ".ui-page" );

			// Feature detecting support for
			if ( o.supportBlacklist() ) {
				self.destroy();
				return;
			}

			$el.addClass( "ui-"+ tbtype +"-fixed" );

			// "fullscreen" overlay positioning
			if ( o.fullscreen ) {
				$el.addClass( "ui-"+ tbtype +"-fullscreen" );
				$page.addClass( "ui-page-" + tbtype + "-fullscreen" );
			}
			// If not fullscreen, add class to page to set top or bottom padding
			else{
				$page.addClass( "ui-page-" + tbtype + "-fixed" );
			}

			$.extend( this, {
				_thisPage: null
			});

			self._addTransitionClass();
			self._bindPageEvents();
			self._bindToggleHandlers();
		},

		_addTransitionClass: function() {
			var tclass = this.options.transition;

			if ( tclass && tclass !== "none" ) {
				// use appropriate slide for header or footer
				if ( tclass === "slide" ) {
					tclass = this.element.is( ".ui-header" ) ? "slidedown" : "slideup";
				}

				this.element.addClass( tclass );
			}
		},

		_bindPageEvents: function() {
			this._thisPage = this.element.closest( ".ui-page" );
			//page event bindings
			// Fixed toolbars require page zoom to be disabled, otherwise usability issues crop up
			// This method is meant to disable zoom while a fixed-positioned toolbar page is visible
			this._on( this._thisPage, {
				"pagebeforeshow": "_handlePageBeforeShow",
				"webkitAnimationStart":"_handleAnimationStart",
				"animationstart":"_handleAnimationStart",
				"updatelayout": "_handleAnimationStart",
				"pageshow": "_handlePageShow",
				"pagebeforehide": "_handlePageBeforeHide"
			});
		},

		_handlePageBeforeShow: function() {
			var o = this.options;
			if ( o.disablePageZoom ) {
				$.mobile.zoom.disable( true );
			}
			if ( !o.visibleOnPageShow ) {
				this.hide( true );
			}
		},

		_handleAnimationStart: function() {
			if ( this.options.updatePagePadding ) {
				this.updatePagePadding( this._thisPage );
			}
		},

		_handlePageShow: function() {
			this.updatePagePadding( this._thisPage );
			if ( this.options.updatePagePadding ) {
				this._on( $.mobile.window, { "throttledresize": "updatePagePadding" } );
			}
		},

		_handlePageBeforeHide: function( e, ui ) {
			var o = this.options;

			if ( o.disablePageZoom ) {
				$.mobile.zoom.enable( true );
			}
			if ( o.updatePagePadding ) {
				this._off( $.mobile.window, "throttledresize" );
			}

			if ( o.trackPersistentToolbars ) {
				var thisFooter = $( ".ui-footer-fixed:jqmData(id)", this._thisPage ),
					thisHeader = $( ".ui-header-fixed:jqmData(id)", this._thisPage ),
					nextFooter = thisFooter.length && ui.nextPage && $( ".ui-footer-fixed:jqmData(id='" + thisFooter.jqmData( "id" ) + "')", ui.nextPage ) || $(),
					nextHeader = thisHeader.length && ui.nextPage && $( ".ui-header-fixed:jqmData(id='" + thisHeader.jqmData( "id" ) + "')", ui.nextPage ) || $();

				if ( nextFooter.length || nextHeader.length ) {

					nextFooter.add( nextHeader ).appendTo( $.mobile.pageContainer );

					ui.nextPage.one( "pageshow", function() {
						nextHeader.prependTo( this );
						nextFooter.appendTo( this );
					});
				}
			}
		},

		_visible: true,

		// This will set the content element's top or bottom padding equal to the toolbar's height
		updatePagePadding: function( tbPage ) {
			var $el = this.element,
				header = $el.is( ".ui-header" ),
				pos = parseFloat( $el.css( header ? "top" : "bottom" ) );

			// This behavior only applies to "fixed", not "fullscreen"
			if ( this.options.fullscreen ) { return; }

			// tbPage argument can be a Page object or an event, if coming from throttled resize. 
			tbPage = ( tbPage && tbPage.type === undefined && tbPage ) || this._thisPage || $el.closest( ".ui-page" );
			$( tbPage ).css( "padding-" + ( header ? "top" : "bottom" ), $el.outerHeight() + pos );
		},

		_useTransition: function( notransition ) {
			var $win = $.mobile.window,
				$el = this.element,
				scroll = $win.scrollTop(),
				elHeight = $el.height(),
				pHeight = $el.closest( ".ui-page" ).height(),
				viewportHeight = $.mobile.getScreenHeight(),
				tbtype = $el.is( ":jqmData(role='header')" ) ? "header" : "footer";

			return !notransition &&
				( this.options.transition && this.options.transition !== "none" &&
				(
					( tbtype === "header" && !this.options.fullscreen && scroll > elHeight ) ||
					( tbtype === "footer" && !this.options.fullscreen && scroll + viewportHeight < pHeight - elHeight )
				) || this.options.fullscreen
				);
		},

		show: function( notransition ) {
			var hideClass = "ui-fixed-hidden",
				$el = this.element;

			if ( this._useTransition( notransition ) ) {
				$el
					.removeClass( "out " + hideClass )
					.addClass( "in" )
					.animationComplete(function () {
						$el.removeClass('in');
					});
			}
			else {
				$el.removeClass( hideClass );
			}
			this._visible = true;
		},

		hide: function( notransition ) {
			var hideClass = "ui-fixed-hidden",
				$el = this.element,
				// if it's a slide transition, our new transitions need the reverse class as well to slide outward
				outclass = "out" + ( this.options.transition === "slide" ? " reverse" : "" );

			if( this._useTransition( notransition ) ) {
				$el
					.addClass( outclass )
					.removeClass( "in" )
					.animationComplete(function() {
						$el.addClass( hideClass ).removeClass( outclass );
					});
			}
			else {
				$el.addClass( hideClass ).removeClass( outclass );
			}
			this._visible = false;
		},

		toggle: function() {
			this[ this._visible ? "hide" : "show" ]();
		},

		_bindToggleHandlers: function() {
			var self = this,
				o = self.options,
				$el = self.element,
				delayShow, delayHide,
				isVisible = true;

			// tap toggle
			$el.closest( ".ui-page" )
				.bind( "vclick", function( e ) {
					if ( o.tapToggle && !$( e.target ).closest( o.tapToggleBlacklist ).length ) {
						self.toggle();
					}
				})
				.bind( "focusin focusout", function( e ) {
					//this hides the toolbars on a keyboard pop to give more screen room and prevent ios bug which 
					//positions fixed toolbars in the middle of the screen on pop if the input is near the top or
					//bottom of the screen addresses issues #4410 Footer navbar moves up when clicking on a textbox in an Android environment
					//and issue #4113 Header and footer change their position after keyboard popup - iOS
					//and issue #4410 Footer navbar moves up when clicking on a textbox in an Android environment
					if ( screen.width < 1025 && $( e.target ).is( o.hideDuringFocus ) && !$( e.target ).closest( ".ui-header-fixed, .ui-footer-fixed" ).length ) {
						//Fix for issue #4724 Moving through form in Mobile Safari with "Next" and "Previous" system 
						//controls causes fixed position, tap-toggle false Header to reveal itself
						// isVisible instead of self._visible because the focusin and focusout events fire twice at the same time
						// Also use a delay for hiding the toolbars because on Android native browser focusin is direclty followed
						// by a focusout when a native selects opens and the other way around when it closes.
						if ( e.type === "focusout" && !isVisible ) {
							isVisible = true;
							//wait for the stack to unwind and see if we have jumped to another input
							clearTimeout( delayHide );
							delayShow = setTimeout( function() {
								self.show();
							}, 0 ); 
						} else if ( e.type === "focusin" && !!isVisible ) {
							//if we have jumped to another input clear the time out to cancel the show.
							clearTimeout( delayShow );
							isVisible = false;
							delayHide = setTimeout( function() {
								self.hide();
							}, 0 ); 
						}
					}
				});
		},

		_destroy: function() {
			var $el = this.element,
				header = $el.is( ".ui-header" );

			$el.closest( ".ui-page" ).css( "padding-" + ( header ? "top" : "bottom" ), "" );
			$el.removeClass( "ui-header-fixed ui-footer-fixed ui-header-fullscreen ui-footer-fullscreen in out fade slidedown slideup ui-fixed-hidden" );
			$el.closest( ".ui-page" ).removeClass( "ui-page-header-fixed ui-page-footer-fixed ui-page-header-fullscreen ui-page-footer-fullscreen" );
		}

	});

	//auto self-init widgets
	$.mobile.document
		.bind( "pagecreate create", function( e ) {

			// DEPRECATED in 1.1: support for data-fullscreen=true|false on the page element.
			// This line ensures it still works, but we recommend moving the attribute to the toolbars themselves.
			if ( $( e.target ).jqmData( "fullscreen" ) ) {
				$( $.mobile.fixedtoolbar.prototype.options.initSelector, e.target ).not( ":jqmData(fullscreen)" ).jqmData( "fullscreen", true );
			}

			$.mobile.fixedtoolbar.prototype.enhanceWithin( e.target );
		});

})( jQuery );

(function( $, undefined ) {
	$.widget( "mobile.fixedtoolbar", $.mobile.fixedtoolbar, {

			_create: function() {
				this._super();
				this._workarounds();
			},

			//check the browser and version and run needed workarounds
			_workarounds: function() {
				var ua = navigator.userAgent,
				platform = navigator.platform,
				// Rendering engine is Webkit, and capture major version
				wkmatch = ua.match( /AppleWebKit\/([0-9]+)/ ),
				wkversion = !!wkmatch && wkmatch[ 1 ],
				os = null,
				self = this;
				//set the os we are working in if it dosent match one with workarounds return
				if( platform.indexOf( "iPhone" ) > -1 || platform.indexOf( "iPad" ) > -1  || platform.indexOf( "iPod" ) > -1 ){
					os = "ios";
				} else if( ua.indexOf( "Android" ) > -1 ){
					os = "android";
				} else {
					return;
				}
				//check os version if it dosent match one with workarounds return
				if( os === "ios" ) {
					//iOS  workarounds
					self._bindScrollWorkaround();
				} else if( os === "android" && wkversion && wkversion < 534 ) {
					//Android 2.3 run all Android 2.3 workaround
					self._bindScrollWorkaround();
					self._bindListThumbWorkaround();
				} else {
					return;
				}
			},

			//Utility class for checking header and footer positions relative to viewport
			_viewportOffset: function() {
				var $el = this.element,
					header = $el.is( ".ui-header" ),
					offset = Math.abs($el.offset().top - $.mobile.window.scrollTop());
				if( !header ) {
					offset = Math.round(offset - $.mobile.window.height() + $el.outerHeight())-60;
				}
				return offset;
			},

			//bind events for _triggerRedraw() function 
			_bindScrollWorkaround: function() {
				var self = this;
				//bind to scrollstop and check if the toolbars are correctly positioned
				this._on( $.mobile.window, { scrollstop: function() {
					var viewportOffset = self._viewportOffset();
					//check if the header is visible and if its in the right place
					if( viewportOffset > 2 && self._visible) {
						self._triggerRedraw();
					}
				}});
			},

			//this addresses issue #4250 Persistent footer instability in v1.1 with long select lists in Android 2.3.3
			//and issue #3748 Android 2.x: Page transitions broken when fixed toolbars used
			//the absolutely positioned thumbnail in a list view causes problems with fixed position buttons above in a nav bar
			//setting the li's to -webkit-transform:translate3d(0,0,0); solves this problem to avoide potential issues in other
			//platforms we scope this with the class ui-android-2x-fix
			_bindListThumbWorkaround: function() {
				this.element.closest(".ui-page").addClass( "ui-android-2x-fixed" );
			},
			//this addresses issues #4337 Fixed header problem after scrolling content on iOS and Android
			//and device bugs project issue #1 Form elements can lose click hit area in position: fixed containers.
			//this also addresses not on fixed toolbars page in docs
			//adding 1px of padding to the bottom then removing it causes a "redraw"
			//which positions the toolbars correctly (they will always be visually correct) 
			_triggerRedraw: function() {
				var paddingBottom = parseFloat( $( ".ui-page-active" ).css( "padding-bottom" ) );
				//trigger page redraw to fix incorrectly positioned fixed elements
				$( ".ui-page-active" ).css( "padding-bottom", ( paddingBottom + 1 ) +"px" );
				//if the padding is reset with out a timeout the reposition will not occure.
				//this is independant of JQM the browser seems to need the time to react.
				setTimeout( function() {
					$( ".ui-page-active" ).css( "padding-bottom", paddingBottom + "px" );
				}, 0 );
			},

			destroy: function() {
				this._super();
				//Remove the class we added to the page previously in android 2.x 
				this.element.closest(".ui-page-active").removeClass( "ui-android-2x-fix" );
			}
	});

	})( jQuery );

(function( $, undefined ) {

$.widget( "mobile.panel", $.mobile.widget, {
	options: {
		classes: {
			panel: "ui-panel",
			panelOpen: "ui-panel-open",
			panelClosed: "ui-panel-closed",
			panelFixed: "ui-panel-fixed",
			panelInner: "ui-panel-inner",
			modal: "ui-panel-dismiss",
			modalOpen: "ui-panel-dismiss-open",
			pagePanel: "ui-page-panel",
			pagePanelOpen: "ui-page-panel-open",
			contentWrap: "ui-panel-content-wrap",
			contentWrapOpen: "ui-panel-content-wrap-open",
			contentWrapClosed: "ui-panel-content-wrap-closed",
			contentFixedToolbar: "ui-panel-content-fixed-toolbar",
			contentFixedToolbarOpen: "ui-panel-content-fixed-toolbar-open",
			contentFixedToolbarClosed: "ui-panel-content-fixed-toolbar-closed",
			animate: "ui-panel-animate"
		},
		animate: true,
		theme: "c",
		position: "left",
		dismissible: true,
		display: "reveal", //accepts reveal, push, overlay
		initSelector: ":jqmData(role='panel')",
		swipeClose: true,
		positionFixed: false
	},

	_panelID: null,
	_closeLink: null,
	_page: null,
	_modal: null,
	_panelInner: null,
	_wrapper: null,
	_fixedToolbar: null,

	_create: function() {
		var self = this,
			$el = self.element,
			page = $el.closest( ":jqmData(role='page')" ),
			_getPageTheme = function() {
				var $theme = $.data( page[0], "mobilePage" ).options.theme,
				$pageThemeClass = "ui-body-" + $theme;
				return $pageThemeClass;
			},
			_getPanelInner = function() {
				var $panelInner = $el.find( "." + self.options.classes.panelInner );
				if ( $panelInner.length === 0 ) {
					$panelInner = $el.children().wrapAll( '<div class="' + self.options.classes.panelInner + '" />' ).parent();
				}
				return $panelInner;
			},
			_getWrapper = function() {
				var $wrapper = page.find( "." + self.options.classes.contentWrap );
				if ( $wrapper.length === 0 ) {
					$wrapper = page.children( ".ui-header:not(:jqmData(position='fixed')), .ui-content:not(:jqmData(role='popup')), .ui-footer:not(:jqmData(position='fixed'))" ).wrapAll( '<div class="' + self.options.classes.contentWrap + ' ' + _getPageTheme() + '" />' ).parent();
					if ( $.support.cssTransform3d && !!self.options.animate ) {
						$wrapper.addClass( self.options.classes.animate );
					}
				}
				return $wrapper;
			},
			_getFixedToolbar = function() {
				var $fixedToolbar = page.find( "." + self.options.classes.contentFixedToolbar );
				if ( $fixedToolbar.length === 0 ) {
					$fixedToolbar = page.find( ".ui-header:jqmData(position='fixed'), .ui-footer:jqmData(position='fixed')" ).addClass( self.options.classes.contentFixedToolbar );
					if ( $.support.cssTransform3d && !!self.options.animate ) {
						$fixedToolbar.addClass( self.options.classes.animate );
					}
				}
				return $fixedToolbar;
			};

		// expose some private props to other methods
		$.extend( this, {
			_panelID: $el.attr( "id" ),
			_closeLink: $el.find( ":jqmData(rel='close')" ),
			_page: $el.closest( ":jqmData(role='page')" ),
			_pageTheme: _getPageTheme(),
			_panelInner: _getPanelInner(),
			_wrapper: _getWrapper(),
			_fixedToolbar: _getFixedToolbar()
		});
		
		self._addPanelClasses();
		self._wrapper.addClass( this.options.classes.contentWrapClosed );
		self._fixedToolbar.addClass( this.options.classes.contentFixedToolbarClosed );
		// add class to page so we can set "overflow-x: hidden;" for it to fix Android zoom issue
		self._page.addClass( self.options.classes.pagePanel );
		
		// if animating, add the class to do so
		if ( $.support.cssTransform3d && !!self.options.animate ) {
			this.element.addClass( self.options.classes.animate );
		}
		
		self._bindUpdateLayout();
		self._bindCloseEvents();
		self._bindLinkListeners();
		self._bindPageEvents();

		if ( !!self.options.dismissible ) {
			self._createModal();
		}

		self._bindSwipeEvents();
	},

	_createModal: function( options ) {
		var self = this;
		
		self._modal = $( "<div class='" + self.options.classes.modal + "' data-panelid='" + self._panelID + "'></div>" )
			.on( "mousedown", function() {
				self.close();
			})
			.appendTo( this._page );
	},

	_getPosDisplayClasses: function( prefix ) {
		return prefix + "-position-" + this.options.position + " " + prefix + "-display-" + this.options.display;
	},

	_getPanelClasses: function() {
		var panelClasses = this.options.classes.panel +
			" " + this._getPosDisplayClasses( this.options.classes.panel ) +
			" " + this.options.classes.panelClosed;

		if ( this.options.theme ) {
			panelClasses += " ui-body-" + this.options.theme;
		}
		if ( !!this.options.positionFixed ) {
			panelClasses += " " + this.options.classes.panelFixed;
		}
		return panelClasses;
	},

	_addPanelClasses: function() {
		this.element.addClass( this._getPanelClasses() );
	},

	_bindCloseEvents: function() {
		var self = this;
		
		self._closeLink.on( "click.panel" , function( e ) {
			e.preventDefault();
			self.close();
			return false;
		});
		self.element.on( "click.panel" , "a:jqmData(ajax='false')", function( e ) {
			self.close();
		});		
	},

	_positionPanel: function() {
		var self = this,
			panelInnerHeight = self._panelInner.outerHeight(),
			expand = panelInnerHeight > $.mobile.getScreenHeight();

		if ( expand || !self.options.positionFixed ) {
			if ( expand ) {
				self._unfixPanel();
				$.mobile.resetActivePageHeight( panelInnerHeight );
			}
			self._scrollIntoView( panelInnerHeight );
		} else {
			self._fixPanel();
		}
	},

	_scrollIntoView: function( panelInnerHeight ) {
		if ( panelInnerHeight < $( window ).scrollTop() ) {
			window.scrollTo( 0, 0 );
		}	
	},

	_bindFixListener: function() {
		this._on( $( window ), { "throttledresize": "_positionPanel" });
	},

	_unbindFixListener: function() {
		this._off( $( window ), "throttledresize" );
	},

	_unfixPanel: function() {
		if ( !!this.options.positionFixed && $.support.fixedPosition ) {
			this.element.removeClass( this.options.classes.panelFixed );
		}
	},

	_fixPanel: function() {
		if ( !!this.options.positionFixed && $.support.fixedPosition ) {
			this.element.addClass( this.options.classes.panelFixed );
		}
	},
	
	_bindUpdateLayout: function() {
		var self = this;
		
		self.element.on( "updatelayout", function( e ) {
			if ( self._open ) {
				self._positionPanel();
			}
		});
	},

	_bindLinkListeners: function() {
		var self = this;

		self._page.on( "click.panel" , "a", function( e ) {
			if ( this.href.split( "#" )[ 1 ] === self._panelID && self._panelID !== undefined ) {
				e.preventDefault();
				var $link = $( this ),
					$parent;
				if ( ! $link.hasClass( "ui-link" ) ) {
					// Check if we are in a listview
					$parent = $link.parent().parent();
					if ( $parent.hasClass( "ui-li" ) ) {
						$link = $parent.parent();
					}
					$link.addClass( $.mobile.activeBtnClass );
					self.element.one( "panelopen panelclose", function() {
						$link.removeClass( $.mobile.activeBtnClass );
					});
				}
				self.toggle();
				return false;
			}
		});
	},
	
	_bindSwipeEvents: function() {
		var self = this,
			area = self._modal ? self.element.add( self._modal ) : self.element;
		
		// on swipe, close the panel
		if( !!self.options.swipeClose ) {
			if ( self.options.position === "left" ) {
				area.on( "swipeleft.panel", function( e ) {
					self.close();
				});
			} else {
				area.on( "swiperight.panel", function( e ) {
					self.close();
				});
			}
		}
	},

	_bindPageEvents: function() {
		var self = this;
			
		self._page
			// Close the panel if another panel on the page opens
			.on( "panelbeforeopen", function( e ) {
				if ( self._open && e.target !== self.element[ 0 ] ) {
					self.close();
				}
			})
			// clean up open panels after page hide
			.on( "pagehide", function( e ) {
				if ( self._open ) {
					self.close( true );
				}
			})
			// on escape, close? might need to have a target check too...
			.on( "keyup.panel", function( e ) {
				if ( e.keyCode === 27 && self._open ) {
					self.close();
				}
			});
	},

	// state storage of open or closed
	_open: false,

	_contentWrapOpenClasses: null,
	_fixedToolbarOpenClasses: null,
	_modalOpenClasses: null,

	open: function( immediate ) {
		if ( !this._open ) {
			var self = this,
				o = self.options,
				_openPanel = function() {
					self._page.off( "panelclose" );
					self._page.jqmData( "panel", "open" );
					
					if ( !immediate && $.support.cssTransform3d && !!o.animate ) {
						self.element.add( self._wrapper ).on( self._transitionEndEvents, complete );
					} else {
						setTimeout( complete, 0 );
					}
					
					if ( self.options.theme && self.options.display !== "overlay" ) {
						self._page
							.removeClass( self._pageTheme )
							.addClass( "ui-body-" + self.options.theme );
					}
					
					self.element.removeClass( o.classes.panelClosed ).addClass( o.classes.panelOpen );
					
					self._positionPanel();
					
					// Fix for IE7 min-height bug
					if ( self.options.theme && self.options.display !== "overlay" ) {
						self._wrapper.css( "min-height", self._page.css( "min-height" ) );
					}
					
					self._contentWrapOpenClasses = self._getPosDisplayClasses( o.classes.contentWrap );
					self._wrapper
						.removeClass( o.classes.contentWrapClosed )
						.addClass( self._contentWrapOpenClasses + " " + o.classes.contentWrapOpen );
						
					self._fixedToolbarOpenClasses = self._getPosDisplayClasses( o.classes.contentFixedToolbar );
					self._fixedToolbar
						.removeClass( o.classes.contentFixedToolbarClosed )
						.addClass( self._fixedToolbarOpenClasses + " " + o.classes.contentFixedToolbarOpen );
						
					self._modalOpenClasses = self._getPosDisplayClasses( o.classes.modal ) + " " + o.classes.modalOpen;
					if ( self._modal ) {
						self._modal.addClass( self._modalOpenClasses );
					}
				},
				complete = function() {
					self.element.add( self._wrapper ).off( self._transitionEndEvents, complete );

					self._page.addClass( o.classes.pagePanelOpen );
					
					self._bindFixListener();
					
					self._trigger( "open" );
				};

			if ( this.element.closest( ".ui-page-active" ).length < 0 ) {
				immediate = true;
			}
			
			self._trigger( "beforeopen" );
			
			if ( self._page.jqmData('panel') === "open" ) {
				self._page.on( "panelclose", function() {
					_openPanel();
				});
			} else {
				_openPanel();
			}
			
			self._open = true;
		}
	},

	close: function( immediate ) {
		if ( this._open ) {
			var o = this.options,
				self = this,
				_closePanel = function() {
					if ( !immediate && $.support.cssTransform3d && !!o.animate ) {
						self.element.add( self._wrapper ).on( self._transitionEndEvents, complete );
					} else {
						setTimeout( complete, 0 );
					}
					
					self._page.removeClass( o.classes.pagePanelOpen );
					self.element.removeClass( o.classes.panelOpen );
					self._wrapper.removeClass( o.classes.contentWrapOpen );
					self._fixedToolbar.removeClass( o.classes.contentFixedToolbarOpen );
					
					if ( self._modal ) {
						self._modal.removeClass( self._modalOpenClasses );
					}
				},
				complete = function() {
					if ( self.options.theme && self.options.display !== "overlay" ) {
						self._page.removeClass( "ui-body-" + self.options.theme ).addClass( self._pageTheme );
						// reset fix for IE7 min-height bug
						self._wrapper.css( "min-height", "" );
					}
					self.element.add( self._wrapper ).off( self._transitionEndEvents, complete );
					self.element.addClass( o.classes.panelClosed );
					
					self._wrapper
						.removeClass( self._contentWrapOpenClasses )
						.addClass( o.classes.contentWrapClosed );
						
					self._fixedToolbar
						.removeClass( self._fixedToolbarOpenClasses )
						.addClass( o.classes.contentFixedToolbarClosed );
						
					self._fixPanel();
					self._unbindFixListener();
					$.mobile.resetActivePageHeight();
					
					self._page.jqmRemoveData( "panel" );
					self._trigger( "close" );
				};
				
			if ( this.element.closest( ".ui-page-active" ).length < 0 ) {
				immediate = true;
			}
			self._trigger( "beforeclose" );

			_closePanel();

			self._open = false;
		}
	},
	
	toggle: function( options ) {
		this[ this._open ? "close" : "open" ]();
	},

	_transitionEndEvents: "webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd",

	_destroy: function() {
		var classes = this.options.classes,
			theme = this.options.theme,
			hasOtherSiblingPanels = this.element.siblings( "." + classes.panel ).length;

		// create
		if ( !hasOtherSiblingPanels ) {
			this._wrapper.children().unwrap();
			this._page.find( "a" ).unbind( "panelopen panelclose" );
			this._page.removeClass( classes.pagePanel );
			if ( this._open ) {
				this._page.jqmRemoveData( "panel" );
				this._page.removeClass( classes.pagePanelOpen );
				if ( theme ) {
					this._page.removeClass( "ui-body-" + theme ).addClass( this._pageTheme );
				}
				$.mobile.resetActivePageHeight();
			}
		} else if ( this._open ) {
			this._wrapper.removeClass( classes.contentWrapOpen );
			this._fixedToolbar.removeClass( classes.contentFixedToolbarOpen );
			this._page.jqmRemoveData( "panel" );
			this._page.removeClass( classes.pagePanelOpen );
			if ( theme ) {
				this._page.removeClass( "ui-body-" + theme ).addClass( this._pageTheme );
			}
		}
		
		this._panelInner.children().unwrap();

		this.element.removeClass( [ this._getPanelClasses(), classes.panelAnimate ].join( " " ) )
			.off( "swipeleft.panel swiperight.panel" )
			.off( "panelbeforeopen" )
			.off( "panelhide" )
			.off( "keyup.panel" )
			.off( "updatelayout" );

		this._closeLink.off( "click.panel" );

		if ( this._modal ) {
			this._modal.remove();
		}

		// open and close
		this.element.off( this._transitionEndEvents )
			.removeClass( [ classes.panelUnfixed, classes.panelClosed, classes.panelOpen ].join( " " ) );
	}
});

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ) {
	$.mobile.panel.prototype.enhanceWithin( e.target );
});

})( jQuery );

(function( $, undefined ) {

$.widget( "mobile.table", $.mobile.widget, {

		options: {
			classes: {
				table: "ui-table"
			},
			initSelector: ":jqmData(role='table')"
		},

		_create: function() {
			var self = this;
			self.refresh( true );
		},

		refresh: function (create) {
			var self = this,
				trs = this.element.find( "thead tr" );

			if ( create ) {
				this.element.addClass( this.options.classes.table );
			}

			// Expose headers and allHeaders properties on the widget
			// headers references the THs within the first TR in the table
			self.headers = this.element.find( "tr:eq(0)" ).children();

			// allHeaders references headers, plus all THs in the thead, which may include several rows, or not
			self.allHeaders = self.headers.add( trs.children() );

			trs.each(function(){

				var coltally = 0;

				$( this ).children().each(function( i ){

					var span = parseInt( $( this ).attr( "colspan" ), 10 ),
						sel = ":nth-child(" + ( coltally + 1 ) + ")";
					$( this )
						.jqmData( "colstart", coltally + 1 );

					if( span ){
						for( var j = 0; j < span - 1; j++ ){
							coltally++;
							sel += ", :nth-child(" + ( coltally + 1 ) + ")";
						}
					}

					if ( create === undefined ) {
						$(this).jqmData("cells", "");
					}
					// Store "cells" data on header as a reference to all cells in the same column as this TH
					$( this )
						.jqmData( "cells", self.element.find( "tr" ).not( trs.eq(0) ).not( this ).children( sel ) );

					coltally++;

				});

			});

			// update table modes
			if ( create === undefined ) {
				this.element.trigger( 'refresh' );
			}
	}

});

//auto self-init widgets
$.mobile.document.bind( "pagecreate create", function( e ) {
	$.mobile.table.prototype.enhanceWithin( e.target );
});

})( jQuery );


(function( $, undefined ) {

$.mobile.table.prototype.options.mode = "columntoggle";

$.mobile.table.prototype.options.columnBtnTheme = null;

$.mobile.table.prototype.options.columnPopupTheme = null;

$.mobile.table.prototype.options.columnBtnText = "Columns...";

$.mobile.table.prototype.options.classes = $.extend(
	$.mobile.table.prototype.options.classes,
	{
		popup: "ui-table-columntoggle-popup",
		columnBtn: "ui-table-columntoggle-btn",
		priorityPrefix: "ui-table-priority-",
		columnToggleTable: "ui-table-columntoggle"
	}
);

$.mobile.document.delegate( ":jqmData(role='table')", "tablecreate refresh", function( e ) {
	
	var $table = $( this ),
		self = $table.data( "mobile-table" ),
		event = e.type,
		o = self.options,
		ns = $.mobile.ns,
		id = ( $table.attr( "id" ) || o.classes.popup ) + "-popup", /* TODO BETTER FALLBACK ID HERE */
		$menuButton,
		$popup,
		$menu,
		$switchboard;

	if ( o.mode !== "columntoggle" ) {
		return;
	}

	if ( event !== "refresh" ) {
		self.element.addClass( o.classes.columnToggleTable );
	
		$menuButton = $( "<a href='#" + id + "' class='" + o.classes.columnBtn + "' data-" + ns + "rel='popup' data-" + ns + "mini='true'>" + o.columnBtnText + "</a>" ),
		$popup = $( "<div data-" + ns + "role='popup' data-" + ns + "role='fieldcontain' class='" + o.classes.popup + "' id='" + id + "'></div>"),
		$menu = $("<fieldset data-" + ns + "role='controlgroup'></fieldset>");
	}
	
	// create the hide/show toggles
	self.headers.not( "td" ).each(function( i ) {

		var priority = $( this ).jqmData( "priority" ),
			$cells = $( this ).add( $( this ).jqmData( "cells" ) );

		if ( priority ) {

			$cells.addClass( o.classes.priorityPrefix + priority );

			if ( event !== "refresh" ) {
				$("<label><input type='checkbox' checked />" + $( this ).text() + "</label>" )
					.appendTo( $menu )
					.children( 0 )
					.jqmData( "cells", $cells )
					.checkboxradio({
						theme: o.columnPopupTheme
					});
			} else {
				$( '#' + id + ' fieldset div:eq(' + i +')').find('input').jqmData( 'cells', $cells );
			}
		}
	});
	
	if ( event !== "refresh" ) {
		$menu.appendTo( $popup );
	}

	// bind change event listeners to inputs - TODO: move to a private method?
	if ( $menu === undefined ) {
		$switchboard = $('#' + id + ' fieldset');
	} else {
		$switchboard = $menu;
	}

	if ( event !== "refresh" ) {
		$switchboard.on( "change", "input", function( e ){
			if( this.checked ){
				$( this ).jqmData( "cells" ).removeClass( "ui-table-cell-hidden" ).addClass( "ui-table-cell-visible" );
			} else {
				$( this ).jqmData( "cells" ).removeClass( "ui-table-cell-visible" ).addClass( "ui-table-cell-hidden" );
			}
		});

		$menuButton
			.insertBefore( $table )
			.buttonMarkup({
				theme: o.columnBtnTheme
			});

		$popup
			.insertBefore( $table )
			.popup();
	}

	// refresh method
	self.update = function(){
		$switchboard.find( "input" ).each( function(){
			if (this.checked) {
				this.checked = $( this ).jqmData( "cells" ).eq(0).css( "display" ) === "table-cell";
				if (event === "refresh") {
					$( this ).jqmData( "cells" ).addClass('ui-table-cell-visible');
				}
			} else {
				$( this ).jqmData( "cells" ).addClass('ui-table-cell-hidden');
			}
			$( this ).checkboxradio( "refresh" );
		});
	};

	$.mobile.window.on( "throttledresize", self.update );

	self.update();

});

})( jQuery );

(function( $, undefined ) {

$.mobile.table.prototype.options.mode = "reflow";

$.mobile.table.prototype.options.classes = $.extend(
	$.mobile.table.prototype.options.classes,
	{
		reflowTable: "ui-table-reflow",
		cellLabels: "ui-table-cell-label"
	}
);

$.mobile.document.delegate( ":jqmData(role='table')", "tablecreate refresh", function( e ) {

	var $table = $( this ),
		event = e.type,
		self = $table.data( "mobile-table" ),
		o = self.options;

	// If it's not reflow mode, return here.
	if( o.mode !== "reflow" ){
		return;
	}

	if ( event !== "refresh" ) {
		self.element.addClass( o.classes.reflowTable );
	}

	// get headers in reverse order so that top-level headers are appended last
	var reverseHeaders =  $( self.allHeaders.get().reverse() );

	// create the hide/show toggles
	reverseHeaders.each(function( i ){
		var $cells = $( this ).jqmData( "cells" ),
			colstart = $( this ).jqmData( "colstart" ),
			hierarchyClass = $cells.not( this ).filter( "thead th" ).length && " ui-table-cell-label-top",
			text = $(this).text();

			if( text !== ""  ){

				if( hierarchyClass ){
					var iteration = parseInt( $( this ).attr( "colspan" ), 10 ),
						filter = "";

					if( iteration ){
						filter = "td:nth-child("+ iteration +"n + " + ( colstart ) +")";
					}
					$cells.filter( filter ).prepend( "<b class='" + o.classes.cellLabels + hierarchyClass + "'>" + text + "</b>"  );
				}
				else {
					$cells.prepend( "<b class='" + o.classes.cellLabels + "'>" + text + "</b>"  );
				}

			}
	});

});

})( jQuery );

(function( $, window ) {

	$.mobile.iosorientationfixEnabled = true;

	// This fix addresses an iOS bug, so return early if the UA claims it's something else.
	var ua = navigator.userAgent;
	if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && /OS [1-5]_[0-9_]* like Mac OS X/i.test( ua ) && ua.indexOf( "AppleWebKit" ) > -1 ) ){
		$.mobile.iosorientationfixEnabled = false;
		return;
	}

	var zoom = $.mobile.zoom,
		evt, x, y, z, aig;

	function checkTilt( e ) {
		evt = e.originalEvent;
		aig = evt.accelerationIncludingGravity;

		x = Math.abs( aig.x );
		y = Math.abs( aig.y );
		z = Math.abs( aig.z );

		// If portrait orientation and in one of the danger zones
		if ( !window.orientation && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ) {
				if ( zoom.enabled ) {
					zoom.disable();
				}
		}	else if ( !zoom.enabled ) {
				zoom.enable();
		}
	}

	$.mobile.document.on( "mobileinit", function(){
		if( $.mobile.iosorientationfixEnabled ){
			$.mobile.window
				.bind( "orientationchange.iosorientationfix", zoom.enable )
				.bind( "devicemotion.iosorientationfix", checkTilt );
		}
	});

}( jQuery, this ));

(function( $, window, undefined ) {
	var	$html = $( "html" ),
			$head = $( "head" ),
			$window = $.mobile.window;

	//remove initial build class (only present on first pageshow)
	function hideRenderingClass() {
		$html.removeClass( "ui-mobile-rendering" );
	}

	// trigger mobileinit event - useful hook for configuring $.mobile settings before they're used
	$( window.document ).trigger( "mobileinit" );

	// support conditions
	// if device support condition(s) aren't met, leave things as they are -> a basic, usable experience,
	// otherwise, proceed with the enhancements
	if ( !$.mobile.gradeA() ) {
		return;
	}

	// override ajaxEnabled on platforms that have known conflicts with hash history updates
	// or generally work better browsing in regular http for full page refreshes (BB5, Opera Mini)
	if ( $.mobile.ajaxBlacklist ) {
		$.mobile.ajaxEnabled = false;
	}

	// Add mobile, initial load "rendering" classes to docEl
	$html.addClass( "ui-mobile ui-mobile-rendering" );

	// This is a fallback. If anything goes wrong (JS errors, etc), or events don't fire,
	// this ensures the rendering class is removed after 5 seconds, so content is visible and accessible
	setTimeout( hideRenderingClass, 5000 );

	$.extend( $.mobile, {
		// find and enhance the pages in the dom and transition to the first page.
		initializePage: function() {
			// find present pages
			var path = $.mobile.path,
				$pages = $( ":jqmData(role='page'), :jqmData(role='dialog')" ),
				hash = path.stripHash( path.stripQueryParams(path.parseLocation().hash) ),
				hashPage = document.getElementById( hash );

			// if no pages are found, create one with body's inner html
			if ( !$pages.length ) {
				$pages = $( "body" ).wrapInner( "<div data-" + $.mobile.ns + "role='page'></div>" ).children( 0 );
			}

			// add dialogs, set data-url attrs
			$pages.each(function() {
				var $this = $( this );

				// unless the data url is already set set it to the pathname
				if ( !$this.jqmData( "url" ) ) {
					$this.attr( "data-" + $.mobile.ns + "url", $this.attr( "id" ) || location.pathname + location.search );
				}
			});

			// define first page in dom case one backs out to the directory root (not always the first page visited, but defined as fallback)
			$.mobile.firstPage = $pages.first();

			// define page container
			$.mobile.pageContainer = $.mobile.firstPage.parent().addClass( "ui-mobile-viewport" );

			// initialize navigation events now, after mobileinit has occurred and the page container
			// has been created but before the rest of the library is alerted to that fact
			$.mobile.navreadyDeferred.resolve();

			// alert listeners that the pagecontainer has been determined for binding
			// to events triggered on it
			$window.trigger( "pagecontainercreate" );

			// cue page loading message
			$.mobile.showPageLoadingMsg();

			//remove initial build class (only present on first pageshow)
			hideRenderingClass();

			// if hashchange listening is disabled, there's no hash deeplink,
			// the hash is not valid (contains more than one # or does not start with #)
			// or there is no page with that hash, change to the first page in the DOM
			// Remember, however, that the hash can also be a path!
			if ( ! ( $.mobile.hashListeningEnabled &&
				$.mobile.path.isHashValid( location.hash ) &&
				( $( hashPage ).is( ':jqmData(role="page")' ) ||
					$.mobile.path.isPath( hash ) ||
					hash === $.mobile.dialogHashKey ) ) ) {

				// Store the initial destination
				if ( $.mobile.path.isHashValid( location.hash ) ) {
					$.mobile.urlHistory.initialDst = hash.replace( "#", "" );
				}

				// make sure to set initial popstate state if it exists
				// so that navigation back to the initial page works properly
				if( $.event.special.navigate.isPushStateEnabled() ) {
					$.mobile.navigate.navigator.squash( path.parseLocation().href );
				}

				$.mobile.changePage( $.mobile.firstPage, {
					transition: "none",
					reverse: true,
					changeHash: false,
					fromHashChange: true
				});
			} else {
				// trigger hashchange or navigate to squash and record the correct
				// history entry for an initial hash path
				if( !$.event.special.navigate.isPushStateEnabled() ) {
					$window.trigger( "hashchange", [true] );
				} else {
					// TODO figure out how to simplify this interaction with the initial history entry
					// at the bottom js/navigate/navigate.js
					$.mobile.navigate.history.stack = [];
					$.mobile.navigate( $.mobile.path.isPath( location.hash ) ? location.hash : location.href );
				}
			}
		}
	});

	// check which scrollTop value should be used by scrolling to 1 immediately at domready
	// then check what the scroll top is. Android will report 0... others 1
	// note that this initial scroll won't hide the address bar. It's just for the check.
	$(function() {
		window.scrollTo( 0, 1 );

		// if defaultHomeScroll hasn't been set yet, see if scrollTop is 1
		// it should be 1 in most browsers, but android treats 1 as 0 (for hiding addr bar)
		// so if it's 1, use 0 from now on
		$.mobile.defaultHomeScroll = ( !$.support.scrollTop || $.mobile.window.scrollTop() === 1 ) ? 0 : 1;

		//dom-ready inits
		if ( $.mobile.autoInitializePage ) {
			$.mobile.initializePage();
		}

		// window load event
		// hide iOS browser chrome on load
		$window.load( $.mobile.silentScroll );

		if ( !$.support.cssPointerEvents ) {
			// IE and Opera don't support CSS pointer-events: none that we use to disable link-based buttons
			// by adding the 'ui-disabled' class to them. Using a JavaScript workaround for those browser.
			// https://github.com/jquery/jquery-mobile/issues/3558

			$.mobile.document.delegate( ".ui-disabled", "vclick",
				function( e ) {
					e.preventDefault();
					e.stopImmediatePropagation();
				}
			);
		}
	});
}( jQuery, this ));


}));

}.call(window));

/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(6), __webpack_require__(24)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($, amplify, viewModelLocator) {
    return (function () {
        var defineDecoders = function () {
            amplify.request.decoders.internetProspect = function (data, status, xhr, success, error) {
                if (status === "success" && data.IsSuccessful === true) {
                    success(data);
                } else {
                    error(data);
                }
            };

            amplify.request.decoders.verifyId = function (data, status, xhr, success, error) {
                if (status === "success" && data.FaultOccured !== true) {
                    success(data);
                } else {
                    error(data);
                }
            };

            amplify.request.decoders.verifyEmail = function (data, status, xhr, success, error) {
                if (status === "success" && data.Success === true && data.StatusCode === 0) {
                    // Email has been fully verified - continue
                    success();
                } else if (status === "success" && data.Success === false && (data.StatusCode === 0 || data.StatusCode === 5 || data.StatusCode === 100 || data.StatusCode === 999)) {
                    // There was an error/timeout with the service call but don't let that stop the user
                    success();
                } else if (status === "success" && data.Success === true && data.StatusCode !== 0) {
                    // Some message was returned from the service so decide what to do
                    //emailError(data);
                } else {
                    error();
                }
            };

            amplify.request.decoders.verifyPhone = function (data, status, xhr, success, error) {
                if (status === "success" && data.Success === true) {
                    // Email has been fully verified - continue
                    success();
                } else if (status === "success" && data.Success === false && data.StatusCode !== 1) {
                    // There was an error/timeout with the service call but don't let that stop the user
                    success();
                } else if (status === "success" && data.Success === false && data.StatusCode === 1) {
                    // Some message was returned from the service so decide what to do
                    //phoneError(data);
                } else {
                    error();
                }
            };
        },
            defineRequests = function () {
                amplify.request.define('verifyEmail', 'ajax', {
                    url: 'Api/email/EmailLookup/',
                    dataType: 'json',
                    decoder: "verifyEmail",
                    type: 'GET'
                }),
                amplify.request.define('verifyPhone', 'ajax', {
                    url: 'Api/phone/PhoneLookup/',
                    dataType: 'json',
                    decoder: "verifyPhone",
                    type: 'GET'
                }),
                amplify.request.define('getAddresses', 'ajax', {
                    url: '../Api/signup/GetAddressList/',
                    dataType: 'json',
                    timeout: 2000,
                    decoder: 'verifyId',
                    type: 'GET'
                }),
                amplify.request.define('checkForDuplicates', 'ajax', {
                    url: '/Api/SignUp/CheckForDuplicateAccount/',
                    dataType: 'json',
                    cache: true,
                    contentType: 'application/json',
                    type: 'POST'
                }),
                amplify.request.define('createInternetProspect', 'ajax', {
                    url: '/Api/SignUp/CreateInternetProspect',
                    dataType: 'json',
                    decoder: "internetProspect",
                    contentType: 'application/json',
                    type: 'POST'
                }),
                amplify.request.define('updateInternetProspect', 'ajax', {
                    url: '/Api/SignUp/UpdateInternetProspect/',
                    dataType: 'json',
                    decoder: "internetProspect",
                    contentType: 'application/json',
                    type: 'POST'
                });
                amplify.request.define('verifyIdSignUp', 'ajax', {
                    url: '/Api/SignUp/VerifyIdSignUp/',
                    dataType: 'json',
                    decoder: "internetProspect",
                    contentType: 'application/json',
                    type: 'POST'
                });
                amplify.request.define('getSuburbStatePostcodeList', 'ajax', {
                    url: '../Api/signup/GetSuburbStatePostcodeList/',
                    dataType: 'json',
                    decoder: 'verifyId',
                    type: 'GET'
                });
                amplify.request.define('getStreetTypeList', 'ajax', {
                    url: '../Api/signup/GetStreetTypeList/',
                    decoder: "verifyId",
                    dataType: 'json',
                    type: 'GET'
                });
                amplify.request.define('getFormattedAddress', 'ajax', {
                    url: 'Api/Address/GetFormattedAddress/',
                    dataType: 'json',
                    contentType: 'application/json',
                    type: 'POST'
                });
                amplify.request.define('createInteractiveAccount', 'ajax', {
                    url: '/Api/SignUp/CreateInteractiveAccount/',
                    dataType: 'json',
                    decoder: "internetProspect",
                    contentType: 'application/json',
                    type: 'POST'
                });
                amplify.request.define('login', 'ajax', {
                    url: '/logon/LogonWithRetries',
                    dataType: 'json',
                    contentType: 'application/json',
                    type: 'POST'
                });
            },
            verifyEmail = function (callbacks, email) {
                return amplify.request({
                    resourceId: 'verifyEmail',
                    data: { email: email },
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            verifyPhone = function (callbacks, phone) {
                return amplify.request({
                    resourceId: 'verifyPhone',
                    data: { phoneNumber: phone },
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            getAddresses = function (callbacks, searchString) {
                return amplify.request({
                    resourceId: 'getAddresses',
                    data: { searchString: searchString },
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            checkForDuplicates = function (callbacks, account) {
                var footer = viewModelLocator.findViewModel("footer");
                footer.enabledButtons(false);
                $.mobile.showPageLoadingMsg();
                return amplify.request({
                    resourceId: 'checkForDuplicates',
                    data: JSON.stringify(account),
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            createInternetProspect = function (callbacks, account) {
                var footer = viewModelLocator.findViewModel("footer");
                footer.enabledButtons(false);
                $.mobile.showPageLoadingMsg();
                return amplify.request({
                    resourceId: 'createInternetProspect',
                    data: JSON.stringify(account),
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            updateInternetProspect = function (callbacks, account) {
                var footer = viewModelLocator.findViewModel("footer");
                footer.enabledButtons(false);
                $.mobile.showPageLoadingMsg();
                return amplify.request({
                    resourceId: 'updateInternetProspect',
                    data: JSON.stringify(account),
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            verifyIdSignUp = function (callbacks, account) {
                var footer = viewModelLocator.findViewModel("footer");
                footer.enabledButtons(false);
                $.mobile.showPageLoadingMsg();
                return amplify.request({
                    resourceId: 'verifyIdSignUp',
                    data: JSON.stringify(account),
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            getSuburbStatePostcodeList = function (callbacks, searchString) {
                return amplify.request({
                    resourceId: 'getSuburbStatePostcodeList',
                    data: { searchString: searchString },
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            getStreetTypeList = function (callbacks, searchString) {
                return amplify.request({
                    resourceId: 'getStreetTypeList',
                    data: { searchString: searchString },
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            getFormattedAddress = function (callbacks, addressGuid) {
                return amplify.request({
                    resourceId: 'getFormattedAddress',
                    data: JSON.stringify({ "id": addressGuid }),
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            createBetAccount = function (callbacks, account) {
                var footer = viewModelLocator.findViewModel("footer");
                footer.enabledButtons(false);
                $.mobile.showPageLoadingMsg();
                return amplify.request({
                    resourceId: 'createInteractiveAccount',
                    data: JSON.stringify(account),
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            login = function (callbacks, account) {
                var footer = viewModelLocator.findViewModel("footer");
                footer.enabledButtons(false);
                $.mobile.showPageLoadingMsg();
                return amplify.request({
                    resourceId: 'login',
                    data: JSON.stringify(account),
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
        // Default Constructor
            init = function () {
                defineDecoders();
                defineRequests();
                amplify.subscribe("request.complete", function () {
                    var footer = viewModelLocator.findViewModel("footer");
                    $.mobile.hidePageLoadingMsg();
                    footer.enabledButtons(true);
                });
            };
        init();

        return {
            getAddresses: getAddresses,
            checkForDuplicates: checkForDuplicates,
            createInternetProspect: createInternetProspect,
            updateInternetProspect: updateInternetProspect,
            createBetAccount: createBetAccount,
            verifyIdSignUp: verifyIdSignUp,
            getFormattedAddress: getFormattedAddress,
            verifyEmail: verifyEmail,
            verifyPhone: verifyPhone,
            getSuburbStatePostcodeList: getSuburbStatePostcodeList,
            getStreetTypeList: getStreetTypeList,
            login: login
        };
    } ());


}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(143), __webpack_require__(6), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (getErrors, amplify, _) {
    return function (viewModel) {
        var errors = _(arguments).chain().map(function(viewModel) { return getErrors(viewModel); } ).flatten().value();
        amplify.publish('signup.validationError', errors);
    }
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 368:
/***/ (function(module, exports) {

module.exports = "\n    <fieldset data-role=\"controlgroup\" data-type=\"horizontal\">\n        \n        <div data-bind=\"validationElement: selectedDay, visible: showDays\">\n            <select id=\"selectmenu1\" name=\"\" data-bind=\"options: dayOptions, optionsCaption: nothing(selectedDay, 'DD'), value: selectedDay, elementType:'selectmenu', jqMobiRefresh:dayIsStale\"></select>\n        </div>\n        \n        <div data-bind=\"validationElement: selectedMonth\">\n            <select id=\"selectmenu2\" name=\"\" data-bind=\"options: monthOptions, optionsText: 'name', optionsValue: 'index', optionsCaption: nothing(selectedMonth, 'MMMM'), value: selectedMonth, elementType:'selectmenu', jqMobiRefresh:monthIsStale\"></select>\n        </div>\n\n        <div data-bind=\"validationElement: selectedYear\">\n            <select id=\"selectmenu3\" name=\"\" data-bind=\"options: yearOptions, optionsCaption: nothing(selectedYear, 'YYYY'), value: selectedYear, elementType:'selectmenu'\"></select>\n        </div>\n    </fieldset>\n\n"

/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

/*
===============================================================================
Author:     Eric M. Barnard - @ericmbarnard                                
License:    MIT (http://opensource.org/licenses/mit-license.php)           
                                                                               
Description: Validation Library for KnockoutJS                             
===============================================================================
*/

/*jshint
sub:true, 
curly: true,eqeqeq: true,
immed: true,
latedef: true,
newcap: true,
noarg: true,
sub: true,
undef: true,
boss: true,
eqnull: true,
browser: true
*/

/*globals
jQuery: false,
require: false,
exports: false,
define: false,
ko: false
*/

(function (factory) {
    // Module systems magic dance.

    if (true) {
        // CommonJS or Node: hard-coded dependency on "knockout"
        factory(__webpack_require__(1), exports);
    } else if (typeof define === "function" && define["amd"]) {
        // AMD anonymous module with hard-coded dependency on "knockout"
        define(["knockout", "exports"], factory);
    } else {
        // <script> tag: use the global `ko` object, attaching a `mapping` property
        factory(ko, ko.validation = {});
    }
} (function (ko, exports) {

    if (typeof (ko) === undefined) { throw 'Knockout is required, please ensure it is loaded before loading this validation plug-in'; }

    // create our namespace object
    var validation = exports;
    ko.validation = validation;

    var defaults = {
        registerExtenders: true,
        messagesOnModified: true,
        errorsAsTitle: true,            // enables/disables showing of errors as title attribute of the target element.
        errorsAsTitleOnModified: false, // shows the error when hovering the input field (decorateElement must be true)
        messageTemplate: null,
        insertMessages: true,           // automatically inserts validation messages as <span></span>
        parseInputAttributes: false,    // parses the HTML5 validation attribute from a form element and adds that to the object
        writeInputAttributes: false,    // adds HTML5 input validation attributes to form elements that ko observable's are bound to
        decorateElement: false,         // false to keep backward compatibility
        decorateElementOnModified: true, // true to keep backward compatibility
        errorClass: null,               // single class for error message and element
        errorElementClass: 'validationElement',  // class to decorate error element
        errorMessageClass: 'validationMessage',  // class to decorate error message
        grouping: {
            deep: false,        //by default grouping is shallow
            observable: true    //and using observables
        }
    };

    // make a copy  so we can use 'reset' later
    var configuration = ko.utils.extend({}, defaults);

    var html5Attributes = ['required', 'pattern', 'min', 'max', 'step'];
    var html5InputTypes = ['email', 'number', 'date'];

    var async = function (expr) {
        if (window.setImmediate) { window.setImmediate(expr); }
        else { window.setTimeout(expr, 0); }
    };

    //#region Utilities

    var utils = (function () {
        var seedId = new Date().getTime();

        var domData = {}; //hash of data objects that we reference from dom elements
        var domDataKey = '__ko_validation__';

        return {
            isArray: function (o) {
                return o.isArray || Object.prototype.toString.call(o) === '[object Array]';
            },
            isObject: function (o) {
                return o !== null && typeof o === 'object';
            },
            values: function (o) {
                var r = [];
                for (var i in o) {
                    if (o.hasOwnProperty(i)) {
                        r.push(o[i]);
                    }
                }
                return r;
            },
            getValue: function (o) {
                return (typeof o === 'function' ? o() : o);
            },
            hasAttribute: function (node, attr) {
                return node.getAttribute(attr) !== null;
            },
            getAttribute: function (element, attr) {
                return element.getAttribute(attr);
            },
            setAttribute: function (element, attr, value) {
                return element.setAttribute(attr, value);
            },
            isValidatable: function (o) {
                return o && o.rules && o.isValid && o.isModified;
            },
            insertAfter: function (node, newNode) {
                node.parentNode.insertBefore(newNode, node.nextSibling);
            },
            newId: function () {
                return seedId += 1;
            },
            getConfigOptions: function (element) {
                var options = utils.contextFor(element);

                return options || configuration;
            },
            setDomData: function (node, data) {
                var key = node[domDataKey];

                if (!key) {
                    node[domDataKey] = key = utils.newId();
                }

                domData[key] = data;
            },
            getDomData: function (node) {
                var key = node[domDataKey];

                if (!key) {
                    return undefined;
                }

                return domData[key];
            },
            contextFor: function (node) {
                switch (node.nodeType) {
                    case 1:
                    case 8:
                        var context = utils.getDomData(node);
                        if (context) { return context; }
                        if (node.parentNode) { return utils.contextFor(node.parentNode); }
                        break;
                }
                return undefined;
            },
            isEmptyVal: function (val) {
                if (val === undefined) {
                    return true;
                }
                if (val === null) {
                    return true;
                }
                if (val === "") {
                    return true;
                }
            },
            getOriginalElementTitle: function (element) {
                var savedOriginalTitle = utils.getAttribute(element, 'data-orig-title'),
                    currentTitle = element.title,
                    hasSavedOriginalTitle = utils.hasAttribute(element, 'data-orig-title');

                return hasSavedOriginalTitle ?
                    savedOriginalTitle : currentTitle;
            }
        };
    } ());

    //#endregion

    //#region Public API
    var api = (function () {

        var isInitialized = 0;

        return {
            utils: utils,

            //Call this on startup
            //any config can be overridden with the passed in options
            init: function (options, force) {
                //done run this multiple times if we don't really want to
                if (isInitialized > 0 && !force) {
                    return;
                }

                //becuase we will be accessing options properties it has to be an object at least
                options = options || {};
                //if specific error classes are not provided then apply generic errorClass
                //it has to be done on option so that options.errorClass can override default
                //errorElementClass and errorMessage class but not those provided in options
                options.errorElementClass = options.errorElementClass || options.errorClass || configuration.errorElementClass;
                options.errorMessageClass = options.errorMessageClass || options.errorClass || configuration.errorMessageClass;

                ko.utils.extend(configuration, options);

                if (configuration.registerExtenders) {
                    exports.registerExtenders();
                }

                isInitialized = 1;
            },
            // backwards compatability
            configure: function (options) { exports.init(options); },

            // resets the config back to its original state
            reset: function () { ko.utils.extend(configuration, defaults); },

            // recursivly walks a viewModel and creates an object that
            // provides validation information for the entire viewModel
            // obj -> the viewModel to walk
            // options -> {
            //      deep: false, // if true, will walk past the first level of viewModel properties
            //      observable: false // if true, returns a computed observable indicating if the viewModel is valid
            // }
            group: function group(obj, options) { // array of observables or viewModel
                options = ko.utils.extend(ko.utils.extend({}, configuration.grouping), options);

                var validatables = ko.observableArray([]),
                result = null,

                //anonymous, immediate function to traverse objects hierarchically
                //if !options.deep then it will stop on top level
                traverse = function traverse(obj, level) {
                    var objValues = [],
                        val = ko.utils.unwrapObservable(obj);

                    //default level value depends on deep option.
                    level = (level !== undefined ? level : options.deep ? 1 : -1);

                    // if object is observable then add it to the list
                    if (ko.isObservable(obj)) {

                        //make sure it is validatable object
                        if (!obj.isValid) { obj.extend({ validatable: true }); }
                        validatables.push(obj);
                    }

                    //get list of values either from array or object but ignore non-objects
                    if (val) {
                        if (utils.isArray(val)) {
                            objValues = val;
                        } else if (utils.isObject(val)) {
                            objValues = utils.values(val);
                        }
                    }

                    //process recurisvely if it is deep grouping
                    if (level !== 0) {
                        ko.utils.arrayForEach(objValues, function (observable) {

                            //but not falsy things and not HTML Elements
                            if (observable && !observable.nodeType) { traverse(observable, level + 1); }
                        });
                    }
                };

                //if using observables then traverse structure once and add observables
                if (options.observable) {

                    traverse(obj);

                    result = ko.computed(function () {
                        var errors = [];
                        ko.utils.arrayForEach(validatables(), function (observable) {
                            if (!observable.isValid()) {
                                errors.push(observable.error);
                            }
                        });
                        return errors;
                    });

                } else { //if not using observables then every call to error() should traverse the structure
                    result = function () {
                        var errors = [];
                        validatables([]); //clear validatables
                        traverse(obj); // and traverse tree again
                        ko.utils.arrayForEach(validatables(), function (observable) {
                            if (!observable.isValid()) {
                                errors.push(observable.error);
                            }
                        });
                        return errors;
                    };


                }

                result.showAllMessages = function (show) { // thanks @heliosPortal
                    if (show === undefined) {//default to true
                        show = true;
                    }

                    // ensure we have latest changes
                    result();

                    ko.utils.arrayForEach(validatables(), function (observable) {
                        observable.isModified(show);
                    });
                };

                obj.errors = result;
                obj.isValid = function () {
                    return obj.errors().length === 0;
                };
                obj.isAnyMessageShown = function () {
                    var invalidAndModifiedPresent = false;

                    // ensure we have latest changes
                    result();

                    ko.utils.arrayForEach(validatables(), function (observable) {
                        if (!observable.isValid() && observable.isModified()) {
                            invalidAndModifiedPresent = true;
                        }
                    });
                    return invalidAndModifiedPresent;
                };

                return result;
            },

            formatMessage: function (message, params) {
                if (typeof (message) === 'function') {
                    return message(params);
                }
                return message.replace(/\{0\}/gi, ko.utils.unwrapObservable(params));
            },

            // addRule:
            // This takes in a ko.observable and a Rule Context - which is just a rule name and params to supply to the validator
            // ie: ko.validation.addRule(myObservable, {
            //          rule: 'required',
            //          params: true
            //      });
            //
            addRule: function (observable, rule) {
                observable.extend({ validatable: true });

                //push a Rule Context to the observables local array of Rule Contexts
                observable.rules.push(rule);
                return observable;
            },

            // addAnonymousRule:
            // Anonymous Rules essentially have all the properties of a Rule, but are only specific for a certain property
            // and developers typically are wanting to add them on the fly or not register a rule with the 'ko.validation.rules' object
            //
            // Example:
            // var test = ko.observable('something').extend{(
            //      validation: {
            //          validator: function(val, someOtherVal){
            //              return true;
            //          },
            //          message: "Something must be really wrong!',
            //          params: true
            //      }
            //  )};
            addAnonymousRule: function (observable, ruleObj) {
                var ruleName = utils.newId();

                if (ruleObj['message'] === undefined) {
                    ruleObj['message'] = 'Error';
                }

                //Create an anonymous rule to reference
                exports.rules[ruleName] = ruleObj;

                //add the anonymous rule to the observable
                exports.addRule(observable, {
                    rule: ruleName,
                    params: ruleObj.params
                });
            },

            addExtender: function (ruleName) {
                ko.extenders[ruleName] = function (observable, params) {
                    //params can come in a few flavors
                    // 1. Just the params to be passed to the validator
                    // 2. An object containing the Message to be used and the Params to pass to the validator
                    // 3. A condition when the validation rule to be applied
                    //
                    // Example:
                    // var test = ko.observable(3).extend({
                    //      max: {
                    //          message: 'This special field has a Max of {0}',
                    //          params: 2,
                    //          onlyIf: function() {
                    //                      return specialField.IsVisible();
                    //                  }
                    //      }
                    //  )};
                    //
                    if (params.message || params.onlyIf) { //if it has a message or condition object, then its an object literal to use
                        return exports.addRule(observable, {
                            rule: ruleName,
                            message: params.message,
                            params: utils.isEmptyVal(params.params) ? true : params.params,
                            condition: params.onlyIf
                        });
                    } else {
                        return exports.addRule(observable, {
                            rule: ruleName,
                            params: params
                        });
                    }
                };
            },

            // loops through all ko.validation.rules and adds them as extenders to
            // ko.extenders
            registerExtenders: function () { // root extenders optional, use 'validation' extender if would cause conflicts
                if (configuration.registerExtenders) {
                    for (var ruleName in exports.rules) {
                        if (exports.rules.hasOwnProperty(ruleName)) {
                            if (!ko.extenders[ruleName]) {
                                exports.addExtender(ruleName);
                            }
                        }
                    }
                }
            },

            //creates a span next to the @element with the specified error class
            insertValidationMessage: function (element) {
                var span = document.createElement('SPAN');
                span.className = utils.getConfigOptions(element).errorMessageClass;
                utils.insertAfter(element, span);
                return span;
            },

            // if html-5 validation attributes have been specified, this parses
            // the attributes on @element
            parseInputValidationAttributes: function (element, valueAccessor) {
                ko.utils.arrayForEach(html5Attributes, function (attr) {
                    if (utils.hasAttribute(element, attr)) {
                        exports.addRule(valueAccessor(), {
                            rule: attr,
                            params: element.getAttribute(attr) || true
                        });
                    }
                });

                var currentType = element.getAttribute('type');
                ko.utils.arrayForEach(html5InputTypes, function (type) {
                    if (type === currentType) {
                        exports.addRule(valueAccessor(), {
                            rule: (type === 'date') ? 'dateISO' : type,
                            params: true
                        });
                    }
                });
            },

            // writes html5 validation attributes on the element passed in
            writeInputValidationAttributes: function (element, valueAccessor) {
                var observable = valueAccessor();

                if (!observable || !observable.rules) {
                    return;
                }

                var contexts = observable.rules(); // observable array

                // loop through the attributes and add the information needed
                ko.utils.arrayForEach(html5Attributes, function (attr) {
                    var params;
                    var ctx = ko.utils.arrayFirst(contexts, function (ctx) {
                        return ctx.rule.toLowerCase() === attr.toLowerCase();
                    });

                    if (!ctx) {
                        return;
                    }

                    params = ctx.params;

                    // we have to do some special things for the pattern validation
                    if (ctx.rule === "pattern") {
                        if (ctx.params instanceof RegExp) {
                            params = ctx.params.source; // we need the pure string representation of the RegExpr without the //gi stuff
                        }
                    }

                    // we have a rule matching a validation attribute at this point
                    // so lets add it to the element along with the params
                    element.setAttribute(attr, params);
                });

                contexts = null;
            },

            //take an existing binding handler and make it cause automatic validations
            makeBindingHandlerValidatable: function (handlerName) {
                var init = ko.bindingHandlers[handlerName].init;

                ko.bindingHandlers[handlerName].init = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

                    init(element, valueAccessor, allBindingsAccessor);

                    return ko.bindingHandlers['validationCore'].init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
                };
            }
        };
    } ());

    // expose api publicly
    ko.utils.extend(validation, api);
    //#endregion

    //#region Core Validation Rules

    //Validation Rules:
    // You can view and override messages or rules via:
    // ko.validation.rules[ruleName]
    //
    // To implement a custom Rule, simply use this template:
    // ko.validation.rules['<custom rule name>'] = {
    //      validator: function (val, param) {
    //          <custom logic>
    //          return <true or false>;
    //      },
    //      message: '<custom validation message>' //optionally you can also use a '{0}' to denote a placeholder that will be replaced with your 'param'
    // };
    //
    // Example:
    // ko.validation.rules['mustEqual'] = {
    //      validator: function( val, mustEqualVal ){
    //          return val === mustEqualVal;
    //      },
    //      message: 'This field must equal {0}'
    // };
    //
    validation.rules = {};
    validation.rules['required'] = {
        validator: function (val, required) {
            var stringTrimRegEx = /^\s+|\s+$/g,
                testVal;

            if (val === undefined || val === null) {
                return !required;
            }

            testVal = val;
            if (typeof (val) === "string") {
                testVal = val.replace(stringTrimRegEx, '');
            }

            if (!required) {// if they passed: { required: false }, then don't require this
                return true;
            }

            return ((testVal + '').length > 0);
        },
        message: 'This field is required.'
    };

    validation.rules['min'] = {
        validator: function (val, min) {
            return utils.isEmptyVal(val) || val >= min;
        },
        message: 'Please enter a value greater than or equal to {0}.'
    };

    validation.rules['max'] = {
        validator: function (val, max) {
            return utils.isEmptyVal(val) || val <= max;
        },
        message: 'Please enter a value less than or equal to {0}.'
    };

    validation.rules['minLength'] = {
        validator: function (val, minLength) {
            return utils.isEmptyVal(val) || val.length >= minLength;
        },
        message: 'Please enter at least {0} characters.'
    };

    validation.rules['maxLength'] = {
        validator: function (val, maxLength) {
            return utils.isEmptyVal(val) || val.length <= maxLength;
        },
        message: 'Please enter no more than {0} characters.'
    };

    validation.rules['pattern'] = {
        validator: function (val, regex) {
            return utils.isEmptyVal(val) || val.toString().match(regex) !== null;
        },
        message: 'Please check this value.'
    };

    validation.rules['step'] = {
        validator: function (val, step) {

            // in order to handle steps of .1 & .01 etc.. Modulus won't work
            // if the value is a decimal, so we have to correct for that
            if (utils.isEmptyVal(val) || step == 'any') return true;
            var dif = (val * 100) % (step * 100);
            return Math.abs(dif) < 0.00001 || Math.abs(1 - dif) < 0.00001;
        },
        message: 'The value must increment by {0}'
    };

    validation.rules['email'] = {
        validator: function (val, validate) {
            if (!validate) { return true; }

            //I think an empty email address is also a valid entry
            //if one want's to enforce entry it should be done with 'required: true'
            return utils.isEmptyVal(val) || (
            // jquery validate regex - thanks Scott Gonzalez
                validate && /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(val)
            );
        },
        message: 'Please enter a proper email address'
    };

    validation.rules['date'] = {
        validator: function (value, validate) {
            if (!validate) { return true; }
            return utils.isEmptyVal(value) || (validate && !/Invalid|NaN/.test(new Date(value)));
        },
        message: 'Please enter a proper date'
    };

    validation.rules['dateISO'] = {
        validator: function (value, validate) {
            if (!validate) { return true; }
            return utils.isEmptyVal(value) || (validate && /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(value));
        },
        message: 'Please enter a proper date'
    };

    validation.rules['number'] = {
        validator: function (value, validate) {
            if (!validate) { return true; }
            return utils.isEmptyVal(value) || (validate && /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value));
        },
        message: 'Please enter a number'
    };

    validation.rules['digit'] = {
        validator: function (value, validate) {
            if (!validate) { return true; }
            return utils.isEmptyVal(value) || (validate && /^\d+$/.test(value));
        },
        message: 'Please enter a digit'
    };

    validation.rules['phoneUS'] = {
        validator: function (phoneNumber, validate) {
            if (!validate) { return true; }
            if (typeof (phoneNumber) !== 'string') { return false; }
            if (utils.isEmptyVal(phoneNumber)) { return true; } // makes it optional, use 'required' rule if it should be required
            phoneNumber = phoneNumber.replace(/\s+/g, "");
            return validate && phoneNumber.length > 9 && phoneNumber.match(/^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
        },
        message: 'Please specify a valid phone number'
    };

    validation.rules['equal'] = {
        validator: function (val, params) {
            var otherValue = params;
            return val === utils.getValue(otherValue);
        },
        message: 'Values must equal'
    };

    validation.rules['notEqual'] = {
        validator: function (val, params) {
            var otherValue = params;
            return val !== utils.getValue(otherValue);
        },
        message: 'Please choose another value.'
    };

    //unique in collection
    // options are:
    //    collection: array or function returning (observable) array
    //              in which the value has to be unique
    //    valueAccessor: function that returns value from an object stored in collection
    //              if it is null the value is compared directly
    //    external: set to true when object you are validating is automatically updating collection
    validation.rules['unique'] = {
        validator: function (val, options) {
            var c = utils.getValue(options.collection),
                external = utils.getValue(options.externalValue),
                counter = 0;

            if (!val || !c) { return true; }

            ko.utils.arrayFilter(ko.utils.unwrapObservable(c), function (item) {
                if (val === (options.valueAccessor ? options.valueAccessor(item) : item)) { counter++; }
            });
            // if value is external even 1 same value in collection means the value is not unique
            return counter < (external !== undefined && val !== external ? 1 : 2);
        },
        message: 'Please make sure the value is unique.'
    };


    //now register all of these!
    (function () {
        validation.registerExtenders();
    } ());

    //#endregion

    //#region Knockout Binding Handlers

    // The core binding handler
    // this allows us to setup any value binding that internally always
    // performs the same functionality
    ko.bindingHandlers['validationCore'] = (function () {

        return {
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                var config = utils.getConfigOptions(element);

                // parse html5 input validation attributes, optional feature
                if (config.parseInputAttributes) {
                    async(function () { exports.parseInputValidationAttributes(element, valueAccessor); });
                }

                // if requested insert message element and apply bindings
                if (config.insertMessages && utils.isValidatable(valueAccessor())) {

                    // insert the <span></span>
                    var validationMessageElement = exports.insertValidationMessage(element);

                    // if we're told to use a template, make sure that gets rendered
                    if (config.messageTemplate) {
                        ko.renderTemplate(config.messageTemplate, { field: valueAccessor() }, null, validationMessageElement, 'replaceNode');
                    } else {
                        ko.applyBindingsToNode(validationMessageElement, { validationMessage: valueAccessor() });
                    }
                }

                // write the html5 attributes if indicated by the config
                if (config.writeInputAttributes && utils.isValidatable(valueAccessor())) {

                    exports.writeInputValidationAttributes(element, valueAccessor);
                }

                // if requested, add binding to decorate element
                if (config.decorateElement && utils.isValidatable(valueAccessor())) {
                    ko.applyBindingsToNode(element, { validationElement: valueAccessor() });
                }
            },

            update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                // hook for future extensibility
            }
        };

    } ());

    // override for KO's default 'value' and 'checked' bindings
    api.makeBindingHandlerValidatable("value");
    api.makeBindingHandlerValidatable("checked");


    ko.bindingHandlers['validationMessage'] = { // individual error message, if modified or post binding
        update: function (element, valueAccessor) {
            var obsv = valueAccessor(),
                config = utils.getConfigOptions(element),
                val = ko.utils.unwrapObservable(obsv),
                msg = null,
                isModified = false,
                isValid = false;

            obsv.extend({ validatable: true });

            isModified = obsv.isModified();
            isValid = obsv.isValid();

            // create a handler to correctly return an error message
            var errorMsgAccessor = function () {
                if (!config.messagesOnModified || isModified) {
                    return isValid ? null : obsv.error;
                } else {
                    return null;
                }
            };

            //toggle visibility on validation messages when validation hasn't been evaluated, or when the object isValid
            var visiblityAccessor = function () {
                return (!config.messagesOnModified || isModified) ? !isValid : false;
            };

            ko.bindingHandlers.text.update(element, errorMsgAccessor);
            ko.bindingHandlers.visible.update(element, visiblityAccessor);
        }
    };

    ko.bindingHandlers['validationElement'] = {
        update: function (element, valueAccessor) {
            var obsv = valueAccessor(),
                config = utils.getConfigOptions(element),
                val = ko.utils.unwrapObservable(obsv),
                msg = null,
                isModified = false,
                isValid = false;

            obsv.extend({ validatable: true });

            isModified = obsv.isModified();
            isValid = obsv.isValid();

            // create an evaluator function that will return something like:
            // css: { validationElement: true }
            var cssSettingsAccessor = function () {
                var css = {};

                var shouldShow = ((!config.decorateElementOnModified || isModified) ? !isValid : false);

                if (!config.decorateElement) { shouldShow = false; }

                // css: { validationElement: false }
                css[config.errorElementClass] = shouldShow;

                return css;
            };

            //add or remove class on the element;
            ko.bindingHandlers.css.update(element, cssSettingsAccessor);
            if (!config.errorsAsTitle) { return; }

            var origTitle = utils.getAttribute(element, 'data-orig-title'),
                elementTitle = element.title,
                titleIsErrorMsg = utils.getAttribute(element, 'data-orig-title') === "true";

            var errorMsgTitleAccessor = function () {
                if (!config.errorsAsTitleOnModified || isModified) {
                    if (!isValid) {
                        return { title: obsv.error, 'data-orig-title': utils.getOriginalElementTitle(element) };
                    } else {
                        return { title: utils.getOriginalElementTitle(element), 'data-orig-title': null };
                    }
                }
            };
            ko.bindingHandlers.attr.update(element, errorMsgTitleAccessor);
        }
    };

    // ValidationOptions:
    // This binding handler allows you to override the initial config by setting any of the options for a specific element or context of elements
    //
    // Example:
    // <div data-bind="validationOptions: { insertMessages: true, messageTemplate: 'customTemplate', errorMessageClass: 'mySpecialClass'}">
    //      <input type="text" data-bind="value: someValue"/>
    //      <input type="text" data-bind="value: someValue2"/>
    // </div>
    ko.bindingHandlers['validationOptions'] = (function () {
        return {
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                var options = ko.utils.unwrapObservable(valueAccessor());
                if (options) {
                    var newConfig = ko.utils.extend({}, configuration);
                    ko.utils.extend(newConfig, options);

                    //store the validation options on the node so we can retrieve it later
                    utils.setDomData(element, newConfig);
                }
            }
        };
    } ());
    //#endregion

    //#region Knockout Extenders

    // Validation Extender:
    // This is for creating custom validation logic on the fly
    // Example:
    // var test = ko.observable('something').extend{(
    //      validation: {
    //          validator: function(val, someOtherVal){
    //              return true;
    //          },
    //          message: "Something must be really wrong!',
    //          params: true
    //      }
    //  )};
    ko.extenders['validation'] = function (observable, rules) { // allow single rule or array
        ko.utils.arrayForEach(utils.isArray(rules) ? rules : [rules], function (rule) {
            // the 'rule' being passed in here has no name to identify a core Rule,
            // so we add it as an anonymous rule
            // If the developer is wanting to use a core Rule, but use a different message see the 'addExtender' logic for examples
            exports.addAnonymousRule(observable, rule);
        });
        return observable;
    };

    //This is the extender that makes a Knockout Observable also 'Validatable'
    //examples include:
    // 1. var test = ko.observable('something').extend({validatable: true});
    // this will ensure that the Observable object is setup properly to respond to rules
    //
    // 2. test.extend({validatable: false});
    // this will remove the validation properties from the Observable object should you need to do that.
    ko.extenders['validatable'] = function (observable, enable) {
        if (enable && !utils.isValidatable(observable)) {

            observable.error = ko.observable(null); // holds the error message, we only need one since we stop processing validators when one is invalid

            // observable.rules:
            // ObservableArray of Rule Contexts, where a Rule Context is simply the name of a rule and the params to supply to it
            //
            // Rule Context = { rule: '<rule name>', params: '<passed in params>', message: '<Override of default Message>' }
            observable.rules = ko.observableArray(); //holds the rule Contexts to use as part of validation

            //in case async validation is occuring
            observable.isValidating = ko.observable(false);

            //the true holder of whether the observable is valid or not
            observable.__valid__ = ko.observable(true);

            observable.isModified = ko.observable(false);

            // we use a computed here to ensure that anytime a dependency changes, the
            // validation logic evaluates
            var h_obsValidationTrigger = ko.computed(function () {
                var obs = observable(),
                    ruleContexts = observable.rules();

                exports.validateObservable(observable);

                return true;
            });

            // a semi-protected observable
            observable.isValid = ko.computed(function () {
                return observable.__valid__();
            });

            //manually set error state
            observable.setError = function (error) {
                observable.error(error);
                observable.__valid__(false);
            };

            //manually clear error state
            observable.clearError = function () {
                observable.error(null);
                observable.__valid__(true);
            };

            //subscribe to changes in the observable
            var h_change = observable.subscribe(function () {
                observable.isModified(true);
            });

            observable._disposeValidation = function () {
                //first dispose of the subscriptions
                observable.isValid.dispose();
                observable.rules.removeAll();
                observable.isModified._subscriptions['change'] = [];
                observable.isValidating._subscriptions['change'] = [];
                observable.__valid__._subscriptions['change'] = [];
                h_change.dispose();
                h_obsValidationTrigger.dispose();

                delete observable['rules'];
                delete observable['error'];
                delete observable['isValid'];
                delete observable['isValidating'];
                delete observable['__valid__'];
                delete observable['isModified'];
            };
        } else if (enable === false && utils.isValidatable(observable)) {

            if (observable._disposeValidation) {
                observable._disposeValidation();
            }
        }
        return observable;
    };

    function validateSync(observable, rule, ctx) {
        //Execute the validator and see if its valid
        if (!rule.validator(observable(), ctx.params === undefined ? true : ctx.params)) { // default param is true, eg. required = true

            //not valid, so format the error message and stick it in the 'error' variable
            observable.error(exports.formatMessage(ctx.message || rule.message, ctx.params));
            observable.__valid__(false);
            return false;
        } else {
            return true;
        }
    }

    function validateAsync(observable, rule, ctx) {
        observable.isValidating(true);

        var callBack = function (valObj) {
            var isValid = false,
                msg = '';

            if (!observable.__valid__()) {

                // since we're returning early, make sure we turn this off
                observable.isValidating(false);

                return; //if its already NOT valid, don't add to that
            }

            //we were handed back a complex object
            if (valObj['message']) {
                isValid = valObj.isValid;
                msg = valObj.message;
            } else {
                isValid = valObj;
            }

            if (!isValid) {
                //not valid, so format the error message and stick it in the 'error' variable
                observable.error(exports.formatMessage(msg || ctx.message || rule.message, ctx.params));
                observable.__valid__(isValid);
            }

            // tell it that we're done
            observable.isValidating(false);
        };

        //fire the validator and hand it the callback
        rule.validator(observable(), ctx.params || true, callBack);
    }

    validation.validateObservable = function (observable) {
        var i = 0,
            rule, // the rule validator to execute
            ctx, // the current Rule Context for the loop
            ruleContexts = observable.rules(), //cache for iterator
            len = ruleContexts.length; //cache for iterator

        for (; i < len; i++) {

            //get the Rule Context info to give to the core Rule
            ctx = ruleContexts[i];

            // checks an 'onlyIf' condition
            if (ctx.condition && !ctx.condition()) {
                continue;
            }

            //get the core Rule to use for validation
            rule = exports.rules[ctx.rule];

            if (rule['async'] || ctx['async']) {
                //run async validation
                validateAsync(observable, rule, ctx);

            } else {
                //run normal sync validation
                if (!validateSync(observable, rule, ctx)) {
                    return false; //break out of the loop
                }
            }
        }
        //finally if we got this far, make the observable valid again!
        observable.error(null);
        observable.__valid__(true);
        return true;
    };

    //#endregion

    //#region Validated Observable

    ko.validatedObservable = function (initialValue) {
        if (!exports.utils.isObject(initialValue)) { return ko.observable(initialValue).extend({ validatable: true }); }

        var obsv = ko.observable(initialValue);
        obsv.errors = exports.group(initialValue);
        obsv.isValid = ko.computed(function () {
            return obsv.errors().length === 0;
        });

        return obsv;
    };

    //#endregion

    //#region Localization

    //quick function to override rule messages
    validation.localize = function (msgTranslations) {

        var msg, rule;

        //loop the properties in the object and assign the msg to the rule
        for (rule in msgTranslations) {
            if (exports.rules.hasOwnProperty(rule)) {
                exports.rules[rule].message = msgTranslations[rule];
            }
        }
    };
    //#endregion

    //#region ApplyBindings Added Functionality
    ko.applyBindingsWithValidation = function (viewModel, rootNode, options) {
        var len = arguments.length,
            node, config;

        if (len > 2) { // all parameters were passed
            node = rootNode;
            config = options;
        } else if (len < 2) {
            node = document.body;
        } else { //have to figure out if they passed in a root node or options
            if (arguments[1].nodeType) { //its a node
                node = rootNode;
            } else {
                config = arguments[1];
            }
        }

        exports.init();

        if (config) { exports.utils.setDomData(node, config); }

        ko.applyBindings(viewModel, rootNode);
    };

    //override the original applyBindings so that we can ensure all new rules and what not are correctly registered
    var origApplyBindings = ko.applyBindings;
    ko.applyBindings = function (viewModel, rootNode) {

        exports.init();

        origApplyBindings(viewModel, rootNode);
    };

    //#endregion
}));

/***/ }),

/***/ 394:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(171),__webpack_require__(0), __webpack_require__(170), __webpack_require__(84), __webpack_require__(1), __webpack_require__(38), __webpack_require__(26), __webpack_require__(28), __webpack_require__(27)], __WEBPACK_AMD_DEFINE_RESULT__ = function (config, jQuery, logger, system, ko, validation, shell, analyticsDataLayer, cookies) {
    //Set up jQuery Mobile
    jQuery.mobile.hashListeningEnabled = false;
    jQuery.mobile.fixedtoolbar.prototype.options.hideDuringFocus = '';
    jQuery.mobile.ajaxEnabled = false;

    window.AnalyticsDataLayer = analyticsDataLayer;

    //Set up Knockout Validation
    ko.validation.configure({
        registerExtenders: true,
        messagesOnModified: true,
        insertMessages: false,
        decorateElement: true,
        errorElementClass: 'error',
        parseInputAttributes: true,
        messageTemplate: null,
        grouping: { deep: true, observable: true }
    });

    // Remove the class that hid the page div's while javascript was loading.
    jQuery('body').children('[data-role=page]').removeClass('hidden');

    //Fix footer issue for iOS
    var iPhoneApp = cookies.get('ipapp') != null;

    if (iPhoneApp) {
        jQuery('input, textarea').on('tap', function () {
            jQuery('[data-role="footer"]').css('position', 'absolute');
        });
    }

    jQuery(document).ready(shell.activate);
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿/**
 * Handles subscribing and publishing to various topics.
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6), __webpack_require__(5), __webpack_require__(22)], __WEBPACK_AMD_DEFINE_RESULT__ = function(amplify, common, loggingService) {
    //Assign events
    (function() {
        common.bindLiveEvent('click', '[data-msg-publish]', function(e) {
            var topic = this.dataset.msgPublish,
                data = this.dataset.msgData;

            try {
                data = JSON.parse(data);
            } catch (e) {
                //Assume a string
            }

            publish(topic, data);
        });
    })();

    return {
        publish: publish,
        subscribe: subscribe,
        unsubscribe: unsubscribe
    }

    function publish (topic, data) {
        amplify.publish(topic, data);
        loggingService.logDebug("MessageBusService.publish('" + topic + "')");
    };

    function subscribe (topic, func) {
        amplify.subscribe(topic, func);
        loggingService.logDebug("MessageBusService.subscribe('" + topic + "')");
    };

    function unsubscribe (topic, func) {
        amplify.unsubscribe(topic, func);
    }
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
    "use strict";

    function fetchFromApi(url) {
        console.log("ApiService.fetchFromApi", url);
        
        if ("fetch" in window) {
            return window.fetch(url).then(function(response) {
                if (!response.ok) {
                    throw new Error("Fetch failed. Error code: " + response.status);
                }

                return response;
            });
        } else {
            throw new Error("Fetch API is not supported");
        }
    }


    function fetchTextFromApi(url) {
        return fetchFromApi(url).then(function(response) {
            return response.text();
        });
    }


    function fetchViewFromApi(url) {
        return fetchFromApi(url);
    }


    function fetchJsonFromApi(url) {
        return fetchFromApi(url).then(function(response) {
            return response.json();
        });
    }


    function fetchXmlFromApi(url) {
        return fetchTextFromApi(url).then(function(bodyPromise) {
            bodyPromise.then(function(xmlStr) {
                if ("DOMParser" in window) {
                    return new window.DOMParser().parseFromString(xmlStr, "text/xml");
                } else {
                    throw new Error("No XML parser detected");
                }
            });
        });
    }


    function fetchXmlFromApiAsString(url) {
        return fetchXmlFromApi(url).then(function(xmlStr) {
            return xmlStr.firstChild.textContent;
        });
    }


    function fetchModuleFromApi(url) {
        return fetchTextFromApi(url).then(function(js) {
            return eval(js);
        });
    }


    function injectApiResponse(responseHtml) {
        var container = document.getElementById("main-container");

        if (container) {
            container.innerHTML = responseHtml;

            var nodes = container.querySelectorAll("script");

            [].forEach.call(nodes, function(node) {
                try {
                    eval(node.textContent);
                } catch (err) {
                    throw new Error("Script eval failed");
                }
            });
        } else {
            throw new Error("Main container does not exist");
        }
    }


    function publishToApi(url, data) {
        console.log("ApiService.publishToApi", url, data);
        
        if ("fetch" in window) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            return window.fetch(url, {
                headers: myHeaders,
                body: data
            });
        } else {
            throw new Error("Fetch API is not supported");
        }
    }


    return {
        fetchFromApi: fetchFromApi,
        fetchTextFromApi: fetchTextFromApi,
        fetchViewFromApi: fetchViewFromApi,
        fetchXmlFromApi: fetchXmlFromApi,
        fetchXmlFromApiAsString: fetchXmlFromApiAsString,
        fetchJsonFromApi: fetchJsonFromApi,
        fetchModuleFromApi: fetchModuleFromApi,
        injectApiResponse: injectApiResponse,
        publishToApi: publishToApi
    }
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Common legacy functions. It handles popups, binding events to elements and more.
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(63), __webpack_require__(22), __webpack_require__(27)], __WEBPACK_AMD_DEFINE_RESULT__ = function(jQuery, Base64, loggingService, cookies) {
    var self = this;

    var disabled = "disabled";
    var appCapabilityCookieName = "AppCapability";
    var timezoneOffsetCookieName = "TimezoneOffset";

    /**
     * Binds an event to a selector. This means any element inserted later (through AJAX or whatever) can trigger it.
     */
    function bindLiveEvent(eventType, elementQuerySelector, cb) {
        document.addEventListener(eventType, function(event) {
            var qs = document.querySelectorAll(elementQuerySelector);

            if (qs) {
                var el = event.target, index = -1;
                while (el && ((index = Array.prototype.indexOf.call(qs, el)) === -1)) {
                    el = el.parentElement;
                }

                if (index > -1) {
                    return cb.call(el, event);
                }
            }
        });
    }

    function hideURLbar() {
        window.scrollTo(0, 1);
        setLocalTime();
    }

    function showPopup(popupDiv) {
        //delay 50 milliseconds to allow background layout completed
        setTimeout(function() {
            jQuery('div .popup').hide(); // hide all other popups (especially any confirmation popup)
            var documentHeight = jQuery(document).height();
            popupDiv.css({ 'height': documentHeight }).fadeIn('fast');
            popupDiv.children('.overlay').animate({ opacity: 0.6 }, 'fast');

            var scrollTop = window.pageYOffset ? window.pageYOffset : ((document.body.parentElement) ? document.body.parentElement.scrollTop : 0);

            //Using a minimum scroll top to stop the close popup being over the 'log out' button.
            popupDiv.children('.window').css({ 'top': Math.max(scrollTop + 20, 40) });

            //Check if the height has changed due to showing the popup, and increase the overlay size accordingly
            var newHeight = (popupDiv.children('.window').height() + scrollTop + 100);
            if (newHeight > documentHeight) {
                popupDiv.children('.overlay').css({ 'height': newHeight });
            }
        }, 50);
    }

    //changes disable state for elements that use both a class and attribute

    function setDisableState(selector, enable) {
        if (enable) {
            selector.removeClass(disabled).removeAttr(disabled);
        } else {
            selector.addClass(disabled).prop(disabled, true);
        }
    }

    //KeyPress validation checks for input to numeric text boxes.
    //We do regex check even if the input type=number is supported, since we may not want decimal points or scientific notation
    //e is the keypress event, isInt is true for integer-only, false for decimal input

    function numericKeyPress(e, isInt) {
        var theEvent = e || window.event,
            key = theEvent.keyCode || theEvent.which,
            regex = isInt ? /[0-9]/ : /[0-9]|\./;

        //if it's the enter key or backspace, return to allow standard handling.
        //backspace check is only necessary for iPhone3
        if (key === 13 || key === 8) {
            return;
        }

        key = String.fromCharCode(key);
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            theEvent.preventDefault();
        }
    }

    function maxlengthKeyPress(s, e) {
        //if it's the enter key or backspace, return to allow standard handling.
        //backspace check is only necessary for iPhone3
        if (e.keyCode === 13 || e.keyCode === 8) {
            return true;
        }
        return s.value.length < jQuery(s).attr("maxlength");
    }

    //sets the alternating style for each 'li' element within the supplied selector

    function initDisplayListStyle(ul) {
        ul.each(function() { jQuery(this).children("li:even").addClass('alt'); });
    }

    //animated scroll to function

    function scrollTo(destination, duration) {
        var loc = destination.length ? destination.position().top : 0;
        jQuery('html:not(:animated),body:not(:animated)').animate({ scrollTop: loc }, duration);
    }

    //Forces the browser to redraw an element and its contents.
    //Certain browsers (mostly Android) do not redraw elements outside the visible window well. 
    //Calling this function on the parent of the elements should fix it.

    function redrawFix(element) {
        element.hide();
        var dummy = element.offset();
        element.show();
    }

    function slideToggle(slideElement) {
        if (slideElement.is(':hidden')) {
            slideElement.slideDown(500);
        } else {
            slideElement.slideUp(500);
        }
    }

    function initSlideToggleHandlers() {
        jQuery("h3.toggle").click(function() {
            jQuery(this).next('.info-expand').slideToggle();
            jQuery(this).toggleClass("open");
            scrollTo(jQuery(this), 500);
        });
    }

    function addWaterMark(id, text) {
        var textBox = jQuery('#' + id);
        var waterMarkClass = 'watermark-textbox';

        textBox.val(text).addClass(waterMarkClass);

        textBox.on('blur', function() {
            if (textBox.val().length === 0) {
                textBox.val(text);
                textBox.addClass(waterMarkClass);
            }
        });

        textBox.on('focus', function() {
            textBox.val('');
            textBox.removeClass(waterMarkClass);
        });
    }

    function getLocalTime(wordsToReplaceString, gmtDateInMilliseconds) {
        // 12:30,12345678 = replaces 12:30 with localised time in same format using gmt time in milliseconds 
        if (wordsToReplaceString.match(/^\d{2}:\d{2}/)) {
            if (gmtDate > 0) {
                var localTimeString = gmtDateInMilliseconds.toLocaleTimeString('en-au', { hour12: false });
                localTimeString = localTimeString.match(/\d+:\d+/); // Format: 23:00

                var text = jQuery(this).text();
                var newText = text.replace(wordsToReplaceString, localTimeString);
                return newText;
            }
        }

        // Tue, 09 Jan 2015 12:30,12345678 = replaces Tue 09 Jan 2015 12:30 with localised time in same format using gmt time in milliseconds 
        if (wordsToReplaceString.match(/^\w{3}, \d{2} \w{3} \d{4} \d{2}:\d{2}$/)) {
            var localTimeString = gmtDateInMilliseconds.toLocaleString('en-au',
                options = {
                    weekday: "short", day: "2-digit", month: "short", year: "numeric",
                    hour: "2-digit", minute: "2-digit", hour12: "false"
                });

            var hour = localTimeString.match(/\d+:/);
            if (hour != null) {
                if (hour.length == 1) {
                    if (hour[0].length == 2)
                        localTimeString = localTimeString.replace(/\d{1}:/, '0' + hour);
                }
            }

            var text = jQuery(this).text();
            var newText = text.replace(wordsToReplaceString, localTimeString.substr(0, 23));
            return newText;
        }

        return "";
    };

    function setLocalTime() {
        jQuery('[data-localtime]').each(function() {
            var attributeValue = jQuery(this).attr('data-localtime');
            if (attributeValue.indexOf('#') < 0) return;

            var parms = attributeValue.split('#');
            var wordsToReplace = parms[0];
            var gmtDate = new Date(parseInt(parms[1]));

            // 12:30,12345678 = replaces 12:30 with localised time in same format using gmt time in milliseconds 
            if (wordsToReplace.match(/^\d{2}:\d{2}/)) {
                if (gmtDate > 0) {
                    var localTimeString = gmtDate.toLocaleTimeString('en-au', { hour12: false });
                    localTimeString = localTimeString.match(/\d+:\d+/); // Format: 23:00

                    var text = jQuery(this).text();
                    var newText = text.replace(wordsToReplace, localTimeString);
                    jQuery(this).text(newText);
                }
            }

            // Tue, 09 Jan 2015 12:30,12345678 = replaces Tue 09 Jan 2015 12:30 with localised time in same format using gmt time in milliseconds 
            if (wordsToReplace.match(/^\w{3}, \d{2} \w{3} \d{4} \d{2}:\d{2}$/)) {
                var localTimeString = gmtDate.toLocaleString('en-au',
                    options = {
                        weekday: "short", day: "2-digit", month: "short", year: "numeric",
                        hour: "2-digit", minute: "2-digit", hour12: "false"
                    });

                var hour = localTimeString.match(/\d+:/);
                if (hour != null) {
                    if (hour.length == 1) {
                        if (hour[0].length == 2)
                            localTimeString = localTimeString.replace(/\d{1}:/, '0' + hour);
                    }
                }

                var text = jQuery(this).text();
                var newText = text.replace(wordsToReplace, localTimeString.substr(0, 23));
                jQuery(this).text(newText);
            }
        });
    }

    function hasAppCapability(capability) {
        if (!isCookieSet(appCapabilityCookieName)) {
            return false;
        }

        capability = capability.toLowerCase();
        var capabilityCookie = Base64.decode(cookieValue(appCapabilityCookieName));
        var capabilities = capabilityCookie.toLowerCase().split(',');
        var isCapable = capabilities.indexOf(capability) != -1;
        loggingService.logDebug('hasAppCapability => capability=' + capability + ' capabilities=[' + capabilities + '] isCapable=' + isCapable);
        return isCapable;
    }

    function hasExplicitTimezoneOffset() {
        return isCookieSet(timezoneOffsetCookieName);
    }

    function getExplicitTimezoneOffset() {
        if (hasExplicitTimezoneOffset() === false) {
            return 0;
        }

        return cookieValue(timezoneOffsetCookieName);
    }

    function isCookieSet(cookieName) {
        return cookieValue(cookieName) != undefined;
    }

    function cookieValue(cookieName) {
        var value = cookies.get(cookieName);
        return value;
    }

    return {
        hideURLbar: hideURLbar,
        showPopup: showPopup,
        setDisableState: setDisableState,
        numericKeyPress: numericKeyPress,
        initDisplayListStyle: initDisplayListStyle,
        scrollTo: scrollTo,
        redrawFix: redrawFix,
        slideToggle: slideToggle,
        initSlideToggleHandlers: initSlideToggleHandlers,
        addWaterMark: addWaterMark,
        maxlengthKeyPress: maxlengthKeyPress,
        getLocalTime: getLocalTime,
        setLocalTime: setLocalTime,
        hasAppCapability: hasAppCapability,
        hasExplicitTimezoneOffset: hasExplicitTimezoneOffset,
        getExplicitTimezoneOffset: getExplicitTimezoneOffset,
        bindLiveEvent: bindLiveEvent
    };
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, __webpack_require__(0), __webpack_require__(1), __webpack_require__(39)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, $, ko, moment) {
    var 
        prospect = function (viewModels, shell, skipAgeVerification) {
            var //Shell
                applicationReferenceNumber = null,
                affiliateId = null,
            //Personal Details
                firstName = null,
                middleName = null,
                surname = null,
                dateOfBirth = null,
            //Contact Details
                email = null,
                mobileNumber = null,
                specialOffers = null,
            //Address Details
                residentialAddress = null,

                previousAddress = null,
                ageVerification = ageVerificationMapper(viewModels, shell, skipAgeVerification);


            if (shell) {
                applicationReferenceNumber = shell.applicationReferenceNumber();
                affiliateId = shell.affiliateId();
            }

            if (viewModels.personalDetails) {
                firstName = viewModels.personalDetails.firstName();
                middleName = viewModels.personalDetails.middleName();
                surname = viewModels.personalDetails.surname();
                dateOfBirth = viewModels.personalDetails.dateOfBirthString();
            }

            if (viewModels.contactDetails) {
                email = viewModels.contactDetails.email();
                mobileNumber = viewModels.contactDetails.mobileNumber();
                specialOffers = viewModels.contactDetails.marketingSubscription();
            }

            if (viewModels.addressVerification) {
                residentialAddress = viewModels.addressVerification.currentAddress().getAddressDetails();
                previousAddress = viewModels.addressVerification.previousAddress().getAddressDetails();
            }

            //Public API
            return {
                ApplicationReferenceNumber: applicationReferenceNumber,
                FirstName: firstName,
                MiddleName: middleName,
                Surname: surname,
                DateOfBirth: dateOfBirth,
                Email: email,
                MobileNumber: mobileNumber,
                MarketingOptIn: specialOffers,
                ResidentialAddress: residentialAddress,
                PreviousAddress: previousAddress,
                AgeVerification: ageVerification
            };
        },
        ageVerificationMapper = function (viewModels, shell, skipAgeVerification) {
            var medicare = null,
                driversLicense = null,
                passport = null,
                none = false,
                attempt = null,
                enquiryId = null;
            if (!skipAgeVerification) {
                if (viewModels.ageVerification.isMedicareSelected()) {
                    medicare = {
                        CardNumber: viewModels.medicare.cardNumber(),
                        ReferenceNumber: viewModels.medicare.referenceNumber(),
                        MiddleName: viewModels.medicare.middleName(),
                        ExpiryDay: viewModels.medicare.date.day(),
                        ExpiryMonth: viewModels.medicare.date.month(),
                        ExpiryYear: viewModels.medicare.date.year(),
                        Color: viewModels.medicare.selectedCardColor()
                    };
                } else if (viewModels.ageVerification.isDriversLicenseSelected()) {
                    driversLicense = (function() {
                        var state = null,
                            licenseNumber = null,
                            cardNumber = null,
                            expiry = null,
                            challenge = null,
                            response = null;

                        state = viewModels.driversLicense.state();

                        licenseNumber = viewModels.driversLicense.licenseNumber();

                        if (viewModels.driversLicense.displayCardNumber()) {
                            cardNumber = viewModels.driversLicense.cardNumber();
                        }

                        if (viewModels.driversLicense.displayExpiry()) {
                            expiry = moment(viewModels.driversLicense.expiry.date()).format('YYYY/MM/DD');
                        }

                        if (viewModels.driversLicense.displayCaptcha()) {
                            challenge = viewModels.driversLicense.captcha.getChallenge();
                            response = viewModels.driversLicense.captcha.getResponse();
                        }

                        return {
                            State: state,
                            LicenseNumber: licenseNumber,
                            CardNumber: cardNumber,
                            Expiry: expiry,
                            Challenge: challenge,
                            Response: response
                        };
                    })();
                } else if (viewModels.ageVerification.isAustralianPassportSelected()) {
                    var australianPassport = (function() {
                        var passportNumber = viewModels.australianPassport.passportNumber(),
                            birthSurname = viewModels.australianPassport.birthSurname(),
                            placeOfBirth = viewModels.australianPassport.placeOfBirth(),
                            countryOfBirth = viewModels.australianPassport.countryOfBirth(),
                            citizenshipSurname = viewModels.australianPassport.citizenshipSurname(),
                            citizenshipGivenName = viewModels.australianPassport.citizenshipGivenName();

                        return {
                            PassportNumber: passportNumber,
                            BirthSurname: birthSurname,
                            PlaceOfBirth: placeOfBirth,
                            CountryOfBirth: countryOfBirth,
                            CitizenshipSurname: citizenshipSurname,
                            CitizenshipGivenName: citizenshipGivenName,
                            Country: 'AUS'
                        };
                    })();
                    passport = australianPassport;
                } else if (viewModels.ageVerification.isInternationalPassportSelected()) {
                    var internationalPassport = (function() {
                        var country = viewModels.internationalPassport.country(),
                            passportNumber = viewModels.internationalPassport.passportNumber();
                        return {
                            Country: country,
                            PassportNumber: passportNumber
                        };
                    })();
                    passport = internationalPassport;
                } else {
                    none = viewModels.ageVerification.isNoneSelected();
                }
            }
            if (shell) {
                enquiryId = shell.enquiryId();
                attempt = shell.attempts();
            }
            return {
                Medicare: medicare,
                Passport: passport,
                DriversLicense: driversLicense,
                None: none,
                Attempt: attempt,
                EnquiryId: enquiryId
            };
        };
    return prospect;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(61), __webpack_require__(4), __webpack_require__(22), __webpack_require__(28), __webpack_require__(30), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (adobeDTMService, msgBusService, loggingService, dataLayer, featureService, _) {
        var started = false;

        return {
            start: start,
            stop: stop
        };

        function trackError(error) {
            
        }

        function trackSignUp(event) {
            dataLayer.addToHistory("sign up step", event);
        }


        function start() {
            featureService.isActive('Analytics').then(function(active) {
                subscribeToAnalyticsEvents(started, active);
            });
        }

        function cleanseNumber(number) {
            if (typeof number == 'string') {
                number = number.replace('$', '');
            }
            return parseInt(number);
        }
        function cleanseCurrency(amount) {
            if (typeof amount == 'string') {
                amount = amount.replace('$', '');
            }
            return parseFloat(amount);
        }

        function subscribeToAnalyticsEvents(analyticsFeatureHasAlreadyStarted, analyticsIsAnActiveFeature) {

            if (!analyticsFeatureHasAlreadyStarted && analyticsIsAnActiveFeature) {
                dataLayer.loadTrackData();

                msgBusService.subscribe('nav.nav', function (url) {

                    if (url) {
                        dataLayer.data.content.url = url;
                        dataLayer.saveTrackData();
                        dataLayer.addToHistory("navigation", url);

                        adobeDTMService.trackNav();
                    }
                });

                msgBusService.subscribe('nav.resetback', function (url) {
                    if (url) {
                        dataLayer.data.content.url = url;
                        dataLayer.saveTrackData();
                        dataLayer.addToHistory("navigation", url);

                        adobeDTMService.trackNav();
                    }
                });

                msgBusService.subscribe('nav.menu', function(direction) {

                    dataLayer.addToHistory("menu", direction);
                    if (direction === "open") {
                        adobeDTMService.trackMenu(direction);

                    }
                });

                msgBusService.subscribe('preferences.cash', function(isOn) {
                    var state = isOn ? 'on' : 'off';
                    dataLayer.data.preferences.cashBetting = state;
                    dataLayer.saveTrackData();

                    dataLayer.addToHistory("preference", "cash preference is now " + state);
                    adobeDTMService.trackBetWithCashPreference(state);
                });

                msgBusService.subscribe('nav.exit', function(externalSite) {
                    dataLayer.addToHistory("site exit", externalSite);
                    adobeDTMService.trackExit(externalSite);
                });

                msgBusService.subscribe('lo.login', function(accountNumber) {
                    dataLayer.data.user.accountNumber = accountNumber;
                    dataLayer.saveTrackData();

                    dataLayer.addToHistory("authentication", "User " + accountNumber + " logged in");
                    adobeDTMService.trackLogin();
                });

                msgBusService.subscribe('lo.logout', function() {
                    dataLayer.data.user.accountNumber = '';
                    dataLayer.saveTrackData();

                    dataLayer.addToHistory("authentication", "User logged out");
                    adobeDTMService.trackLogout();
                });
                msgBusService.subscribe('account.processed', function (operationType) {
                    dataLayer.data.user.accountOperationType = operationType;
                    dataLayer.saveTrackData();

                    dataLayer.addToHistory("account", operationType);
                    adobeDTMService.trackAccount();
                });
                
                msgBusService.subscribe('account.deposit', function (data) {
                    //if (data.amount > 0) {
                        dataLayer.data.deposit.amount = data.amount;
                        dataLayer.saveTrackData();
                    //}

                    dataLayer.addToHistory("deposit", JSON.stringify(dataLayer.keys.depositBaseKey + data.step));
                    adobeDTMService.trackDeposit(data.step);
                });

                msgBusService.subscribe('lbs.checkin', function (checkInStep) {
                    dataLayer.addToHistory("checkin", JSON.stringify(dataLayer.keys.checkInBaseKey + checkInStep));
                    adobeDTMService.trackCheckIn(checkInStep);
                });

                msgBusService.subscribe('signup.leaving', function(data) {

                    var key = '';

                    
                    switch (data.page) {
                    case 'homepage':
                        key = dataLayer.keys.signupBegin;
                        break;
                    case 'menu':
                        key = dataLayer.keys.signupBegin;
                        break;
                    case 'welcome':
                        key = dataLayer.keys.signupSliderActivated;
                        break;
                    case 'personalDetails':
                        key = dataLayer.keys.signupNameComplete;
                        break;
                    case 'contactDetails':
                        key = dataLayer.keys.signupEmailComplete;
                        break;
                    case 'addressVerification':
                        key = dataLayer.keys.signupAddressComplete;
                        break;
                    case 'ageVerification':
                        key = dataLayer.keys.signupAgeValidationMethodConfirmed;
                        break;
                    case 'driversLicense':
                        key = dataLayer.keys.signupDriversLicenceComplete;
                        break;
                    case 'australianPassport':
                        key = dataLayer.keys.signupPassportComplete;
                        break;
                    case 'internationalPassport':
                        key = dataLayer.keys.signupPassportComplete;
                        break;
                    case 'createPassword':
                        key = dataLayer.keys.signupPasswordComplete;
                        break;
                    case 'accountCreated':
                        key = dataLayer.keys.signupComplete;
                        break;
                    default:
                        break;
                    }

                    dataLayer.addToHistory("signup", JSON.stringify(dataLayer.keys.signupBaseKey + key));
                    adobeDTMService.trackSignUp(key);
                });

                msgBusService.subscribe('signup.data', function(data) {
                    if (data.applicationReferenceNumber)
                        dataLayer.data.signUp.applicationId = data.applicationReferenceNumber;

                    if (data.marketingOptIn)
                        dataLayer.data.signUp.optIn = data.marketingOptIn;

                    if (data.ageVerificationMethod)
                        dataLayer.data.signUp.ageConfirmType = data.ageVerificationMethod;

                    if (data.bettingAccountNumber) {
                        dataLayer.data.user.accountNumber = data.bettingAccountNumber;
                        dataLayer.data.signUp.accountId = data.bettingAccountNumber;

                        dataLayer.saveTrackData();
                    }

                    dataLayer.addToHistory("signup data", JSON.stringify(data));
                });

                msgBusService.subscribe('signup.validationError', function (data) {
                    var key = dataLayer.keys.signupValidationError;
                    dataLayer.data.signUp.lastValidationError = _(data).map(function (x) { return x.feildName + ":" + x.errorMessage });
                    dataLayer.addToHistory("signup.validationError", JSON.stringify(data));
                    adobeDTMService.trackSignUp(key);
                });

                msgBusService.subscribe('error', trackError);

                msgBusService.subscribe('bet.single.selected', function(data) {
                    dataLayer.resetBetData();
                    
                    dataLayer.data.bet.productType = "single";
                    if (data.type == 'toteracing') {
                        dataLayer.data.bet.racing.tote.numberOfTickets = 1;
                    } else if (data.type == 'fobracing') {
                        dataLayer.data.bet.racing.fixed.numberOfTickets = 1;
                    } else if (data.type == 'fobsports') {
                        dataLayer.data.bet.sports.fixed.numberOfTickets = 1;
                    }

                    dataLayer.saveTrackData();
                    dataLayer.addToHistory('bet.single.selected', JSON.stringify(data));
                    adobeDTMService.trackBetSingleSelected();
                });
                msgBusService.subscribe('bet.single.review', function() {
                    dataLayer.addToHistory('bet.single.review', JSON.stringify({ mode: 'single' }));
                    adobeDTMService.trackBetSingleReview();
                });
                msgBusService.subscribe('bet.single.receipt', function (data) {                    
                    dataLayer.resetBetData();
                    dataLayer.data.bet.id = cleanseNumber(data.ticket);
                    dataLayer.data.bet.productType = "single";
                    dataLayer.data.bet.construction = 'single';
                    dataLayer.data.bet.placementMethod = 'account';

                    if (data.betType == 'toteracing') {
                        dataLayer.data.bet.racing.tote.numberOfTickets = 1;
                        dataLayer.data.bet.racing.tote.cost = cleanseCurrency(data.toteBetValue);
                    } else if (data.betType == 'fobracing') {
                        var winValue = (data.fobWinValue ? cleanseCurrency(data.fobWinValue) : 0);
                        var placeValue = (data.fobPlaceValue ? cleanseCurrency(data.fobPlaceValue) : 0);
                        dataLayer.data.bet.racing.fixed.numberOfTickets = 1;
                        dataLayer.data.bet.racing.fixed.cost = cleanseCurrency(winValue) + cleanseCurrency(placeValue);
                        if (data.specialOffer) {
                            dataLayer.data.bet.specialOffers = [data.specialOffer];
                        }
                    } else if (data.betType == 'fobsports') {
                        var winValue = (data.fobWinValue ? cleanseCurrency(data.fobWinValue) : 0);
                        var placeValue = (data.fobPlaceValue ? cleanseCurrency(data.fobPlaceValue) : 0);
                        dataLayer.data.bet.sports.fixed.numberOfTickets = 1;
                        dataLayer.data.bet.sports.fixed.cost = cleanseCurrency(winValue) + cleanseCurrency(placeValue);
                    }
                    dataLayer.saveTrackData();

                    dataLayer.addToHistory('bet.single.receipt', JSON.stringify(dataLayer.data.bet));
                    adobeDTMService.trackBetSingleReceipt();
                });

                msgBusService.subscribe('bet.betslip.add', function(betslip) {
                    var latestBet = betslip.Bets[0];
                    var betType = 'unknown';

                    if (latestBet.ModelType.indexOf('ToteRacing') != -1) {
                        betType = 'toteracing';
                    } else if (latestBet.ModelType.indexOf('ToteAllUpBet') != -1) {
                        betType = 'toteracing';
                    } else if (latestBet.ProductCode == "FobSports") {
                        betType = 'fobsports';
                    } else if (latestBet.ProductCode == "FobRacing") {
                        betType = 'fobracing';
                    }
                    
                    dataLayer.addToHistory('bet.betslip.add', JSON.stringify({ betType: betType }));
                    adobeDTMService.trackBetSlipAdd();
                });

                msgBusService.subscribe('bet.betslip.review', function(bets) {
                    dataLayer.resetBetData();
                    var numToteRacingBets = 0;
                    var costOfToteRacingBets = 0;
                    var numFixedRacingBets = 0;
                    var costOfFixedRacingBets = 0;
                    var numFixedSportsBets = 0;
                    var costOfFixedSportsBets = 0;

                    _.map(bets, function(bet) {
                        if (bet.ModelType.indexOf('ToteRacing') != -1) {
                            numToteRacingBets = numToteRacingBets + 1;
                            costOfToteRacingBets = costOfToteRacingBets + bet.ExpectedCost;
                        } else if (bet.ModelType.indexOf('ToteAllUpBet') != -1) {
                            numToteRacingBets = numToteRacingBets + 1;
                            costOfToteRacingBets = costOfToteRacingBets + bet.ExpectedCost;
                        } else if (bet.ProductCode == "FobSports") {
                            numFixedSportsBets = numFixedSportsBets + 1;
                            costOfFixedSportsBets = costOfFixedSportsBets + bet.ExpectedCost;
                        } else if (bet.ProductCode == "FobRacing") {
                            costOfFixedRacingBets = costOfFixedRacingBets + bet.ExpectedCost;
                            numFixedRacingBets = numFixedRacingBets + 1;
                        }
                    });

                    dataLayer.data.bet.racing.tote.numberOfTickets = numToteRacingBets;
                    dataLayer.data.bet.racing.tote.cost = costOfToteRacingBets;
                    dataLayer.data.bet.racing.fixed.numberOfTickets = numFixedRacingBets;
                    dataLayer.data.bet.racing.fixed.cost = costOfFixedRacingBets;
                    dataLayer.data.bet.sports.fixed.numberOfTickets = numFixedSportsBets;
                    dataLayer.data.bet.sports.fixed.cost = costOfFixedSportsBets;

                    dataLayer.data.bet.productType = 'single';
                    dataLayer.data.bet.construction = 'betslip';
                    dataLayer.data.bet.placementMethod = 'account';
                    dataLayer.saveTrackData();

                    dataLayer.addToHistory('bet.betslip.review', JSON.stringify({ productType: 'single' }));
                    adobeDTMService.trackBetSlipReview();
                });
                msgBusService.subscribe('bet.betslip.receipt', function(receipt) {
                    dataLayer.data.bet.id = cleanseNumber(receipt[0].TicketNumber);
                    dataLayer.saveTrackData();

                    dataLayer.addToHistory('bet.betslip.receipt', JSON.stringify(dataLayer.data.bet));
                    adobeDTMService.trackBetSlipReceipt();
                });

                msgBusService.subscribe('bet.betslip.cash.selected', function (productType) {
                    dataLayer.data.bet.productType = productType;
                    dataLayer.data.bet.construction = 'betslip';
                    dataLayer.data.bet.placementMethod = 'cash';
                    dataLayer.saveTrackData();

                    dataLayer.addToHistory('bet.betslip.cash.selected', JSON.stringify({ productType: productType }));
                    adobeDTMService.trackBetSlipCashSelected();
                });

                msgBusService.subscribe('bet.betslip.remove', function() {
                    dataLayer.addToHistory('bet.betslip.remove', '');
                    adobeDTMService.trackBetSlipClear();
                });

                msgBusService.subscribe('bet.betslip.clear', function() {
                    dataLayer.resetBetData();
                    dataLayer.addToHistory('bet.betslip.clear', '');
                    adobeDTMService.trackBetSlipClear();
                });

                msgBusService.subscribe('bet.betslip.allfailed', trackError);


                msgBusService.subscribe('bet.mystery.selected', function() {
                    dataLayer.saveTrackData();

                    dataLayer.addToHistory('bet.mystery.selected', JSON.stringify({ betType: 'toteracing' }));
                    adobeDTMService.trackMysterySelected();
                });
                msgBusService.subscribe('bet.mystery.review', function() {
                    dataLayer.data.bet.productType = 'single';
                    dataLayer.data.bet.construction = 'single';
                    dataLayer.data.bet.placementMethod = 'account';
                    dataLayer.saveTrackData();

                    dataLayer.addToHistory('bet.mystery.review', JSON.stringify({ productType: 'single' }));
                    adobeDTMService.trackMysteryReview();
                });
                msgBusService.subscribe('bet.mystery.receipt', function(receipt) {
                    dataLayer.resetBetData();
                    dataLayer.data.bet.id = cleanseNumber(receipt.tickets[0].ticketNumber);
                    dataLayer.data.bet.racing.tote.numberOfTickets = receipt.tickets.length;
                    dataLayer.data.bet.racing.tote.cost = cleanseCurrency(receipt.totalCost);
                    dataLayer.saveTrackData();

                    dataLayer.addToHistory('bet.mystery.receipt', JSON.stringify(dataLayer.data.bet));
                    adobeDTMService.trackMysteryReceipt();
                });

                msgBusService.subscribe('bet.favnumbers.selected', function() {

                    dataLayer.addToHistory('bet.favnumbers.selected', JSON.stringify({ betType: 'toteracing' }));
                    adobeDTMService.trackFavNumbersSelected();
                });
                msgBusService.subscribe('bet.favnumbers.review', function() {
                    dataLayer.data.bet.productType = 'single';
                    dataLayer.data.bet.construction = 'single';
                    dataLayer.data.bet.placementMethod = 'account';
                    dataLayer.saveTrackData();

                    dataLayer.addToHistory('bet.favnumbers.review', JSON.stringify({ productType: 'single' }));
                    adobeDTMService.trackFavNumbersReview();
                });
                msgBusService.subscribe('bet.favnumbers.receipt', function(receipt) {
                    dataLayer.resetBetData();
                    dataLayer.data.bet.id = cleanseNumber(receipt.tickets[0].ticketNumber);
                    dataLayer.data.bet.racing.tote.numberOfTickets = receipt.tickets.length;
                    dataLayer.data.bet.racing.tote.cost = cleanseCurrency(receipt.totalCost);
                    dataLayer.saveTrackData();

                    dataLayer.addToHistory('bet.favnumbers.receipt', JSON.stringify(dataLayer.data.bet));
                    adobeDTMService.trackFavNumbersReceipt();
                });

                msgBusService.subscribe('bet.tipping.selected', function() {
                    dataLayer.saveTrackData();

                    dataLayer.addToHistory('bet.tipping.selected', JSON.stringify({ betType: 'totesports' }));
                    adobeDTMService.trackTippingSelected();
                });
                msgBusService.subscribe('bet.tipping.review', function() {
                    dataLayer.data.bet.productType = 'single';
                    dataLayer.data.bet.construction = 'single';
                    dataLayer.data.bet.placementMethod = 'account';
                    dataLayer.saveTrackData();

                    dataLayer.addToHistory('bet.tipping.review', JSON.stringify({ productType: 'single' }));
                    adobeDTMService.trackTippingReview();
                });
                msgBusService.subscribe('bet.tipping.receipt', function(receipt) {
                    dataLayer.resetBetData();
                    dataLayer.data.bet.id = cleanseNumber(receipt.tickets[0].ticketNumber);
                    dataLayer.data.bet.sports.tote.numberOfTickets = receipt.tickets.length;
                    dataLayer.data.bet.sports.tote.cost = cleanseCurrency(receipt.totalCost);
                    dataLayer.saveTrackData();

                    dataLayer.addToHistory('bet.tipping.receipt', JSON.stringify(dataLayer.data.bet));
                    adobeDTMService.trackTippingReceipt();
                });


                msgBusService.subscribe('bet.multi.add', function() {

                    dataLayer.addToHistory('bet.multi.add', JSON.stringify({ betType: 'mixed' }));
                    adobeDTMService.trackMultiAdd();
                });
                msgBusService.subscribe('bet.multi.review', function() {
                    dataLayer.data.bet.productType = 'multi';
                    dataLayer.data.bet.construction = 'single';
                    dataLayer.data.bet.placementMethod = 'account';
                    dataLayer.saveTrackData();

                    dataLayer.addToHistory('bet.multi.review', JSON.stringify({ productType: 'multi' }));
                    adobeDTMService.trackMultiReview();
                });
                msgBusService.subscribe('bet.multi.receipt', function(receipt) {
                    dataLayer.resetBetData();
                    dataLayer.data.bet.id = cleanseNumber(receipt.ticketNumber);
                    dataLayer.data.bet.mixed.fixed.numberOfTickets = 1;
                    dataLayer.data.bet.mixed.fixed.cost = cleanseCurrency(receipt.totalCost);
                    dataLayer.saveTrackData();

                    dataLayer.addToHistory('bet.multi.receipt', JSON.stringify(dataLayer.data.bet));
                    adobeDTMService.trackMultiReceipt();
                });
                msgBusService.subscribe('bet.multi.remove', function() {
                    dataLayer.addToHistory('bet.multi.remove', '');
                    adobeDTMService.trackMultiRemove();
                });
                msgBusService.subscribe('bet.multi.clear', function() {
                    dataLayer.resetBetData();
                    dataLayer.addToHistory('bet.multi.clear', '');
                    adobeDTMService.trackMultiClear();
                });
                //bet.multi.convert
                msgBusService.subscribe('bet.accumulator.selected', function() {
                    dataLayer.addToHistory('bet.accumulator.selected', JSON.stringify({ betType: 'fobsports' }));
                    adobeDTMService.trackAccumulatorSelected();
                });
                msgBusService.subscribe('bet.accumulator.review', function() {
                    dataLayer.data.bet.productType = 'accumulator';
                    dataLayer.data.bet.construction = 'single';
                    dataLayer.data.bet.placementMethod = 'account';
                    dataLayer.saveTrackData();

                    dataLayer.addToHistory('bet.accumulator.review', JSON.stringify({ productType: 'accumulator' }));
                    adobeDTMService.trackAccumulatorReview();
                });
                msgBusService.subscribe('bet.accumulator.receipt', function(receipt) {
                    dataLayer.resetBetData();
                    dataLayer.data.bet.id = cleanseNumber(receipt.ticket);
                    dataLayer.data.bet.sports.fixed.numberOfTickets = 1;
                    dataLayer.data.bet.sports.fixed.cost = cleanseCurrency(receipt.cost);
                    dataLayer.saveTrackData();

                    dataLayer.addToHistory('bet.accumulator.receipt', JSON.stringify(receipt));
                    adobeDTMService.trackAccumulatorReceipt();
                });

                msgBusService.subscribe('bet.cash.selected', function (productType) {
                    dataLayer.data.bet.productType = productType;
                    dataLayer.data.bet.construction = 'single';
                    dataLayer.data.bet.placementMethod = 'cash';
                    dataLayer.saveTrackData();

                    dataLayer.addToHistory('bet.cash.selected', JSON.stringify({ productType: productType }));
                    adobeDTMService.trackCashSelected();
                });
                msgBusService.subscribe('bet.cash.receipt', function(receipt) {
                    
                    dataLayer.data.bet.id = cleanseNumber(receipt.ticket);

                    if (dataLayer.data.bet.productType === 'multi') {
                        dataLayer.resetBetData();
                        dataLayer.data.bet.id = cleanseNumber(receipt.ticket);
                        dataLayer.data.bet.mixed.fixed.numberOfTickets = 1;
                        dataLayer.data.bet.mixed.fixed.cost = cleanseCurrency(receipt.totalCost);                        
                    }

                    dataLayer.saveTrackData();

                    dataLayer.addToHistory('bet.cash.receipt', JSON.stringify(receipt));
                    adobeDTMService.trackCashReceipt();
                });
                msgBusService.subscribe('bet.cash.remove', function(data) {

                    dataLayer.data.bet.id = cleanseNumber(data.ticket);
                    dataLayer.addToHistory('bet.cash.remove', JSON.stringify(data));
                    adobeDTMService.trackCashRemove();
                });
                msgBusService.subscribe('bet.cash.clear', function() {
                    dataLayer.resetBetData();
                    dataLayer.addToHistory('bet.cash.clear', '');
                    adobeDTMService.trackCashClear();
                });

                msgBusService.subscribe('specialoffer.selected', function (data) {
                    dataLayer.addToHistory('specialoffer.selected', JSON.stringify(data));
                    dataLayer.data.specialOfferSelection = data.Title;
                    dataLayer.saveTrackData();
                });

                msgBusService.subscribe('specialoffer.cleared', function () {
                    dataLayer.addToHistory('specialoffer.cleared', '');
                    dataLayer.data.specialOfferSelection = null;
                    dataLayer.saveTrackData();
                });

                msgBusService.publish('analytics.started');
                msg = 'AnalyticsService - started';
                loggingService.logDebug(msg);
                started = true;
            } else {
                msg = 'AnalyticsService - already started';
                loggingService.logDebug(msg);
            }
        }

        function stop() {
        var msg = '';
        if (started) {
            msgBusService.unsubscribe('nav.nav', trackNav);
            msgBusService.unsubscribe('nav.exit', trackExit);
            msgBusService.unsubscribe('nav.menu', trackMenu);
            msgBusService.unsubscribe('preferences.cash', trackBetWithCashPreference);
            msgBusService.unsubscribe('lo.login', trackLogin);
            msgBusService.unsubscribe('lo.logout', trackLogout);
            msgBusService.unsubscribe('signup.navigate', trackSignUp);

            msg = 'AnalyticsService - stopped';
            loggingService.logDebug(msg);
            started = false;
        } else {
            msg = 'AnalyticsService - already stopped';
            loggingService.logDebug(msg);
        }
    }
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(22), __webpack_require__(28)], __WEBPACK_AMD_DEFINE_RESULT__ = function (loggingService, dataLayer) {

    return {
        trackNav: trackNav,
        trackLogin: trackLogin,
        trackBet: trackBet,
        trackBetSingleSelected: trackBetSingleSelected,
        trackBetSingleReview: trackBetSingleReview,
        trackBetSingleReceipt: trackBetSingleReceipt,
        trackBetSlipAdd: trackBetSlipAdd,
        trackBetSlipReview: trackBetSlipReview,
        trackBetSlipReceipt: trackBetSlipReceipt,
        trackBetSlipCashSelected: trackBetSlipCashSelected,
        trackBetSlipClear: trackBetSlipClear,
        trackBetSlipRemove: trackBetSlipRemove,
        trackMysterySelected: trackMysterySelected,
        trackMysteryReview: trackMysteryReview,
        trackMysteryReceipt: trackMysteryReceipt,
        trackFavNumbersSelected: trackFavNumbersSelected,
        trackFavNumbersReview: trackFavNumbersReview,
        trackFavNumbersReceipt: trackFavNumbersReceipt,
        trackTippingSelected: trackTippingSelected,
        trackTippingReview: trackTippingReview,
        trackTippingReceipt: trackTippingReceipt,
        trackLogout: trackLogout,
        trackExit: trackExit,
        trackMenu: trackMenu,
        trackBetWithCashPreference: trackBetWithCashPreference,
        trackSignUp: trackSignUp,
        trackMultiAdd: trackMultiAdd,
        trackMultiReview: trackMultiReview,
        trackMultiReceipt: trackMultiReceipt,
        trackMultiRemove: trackMultiRemove,
        trackMultiClear: trackMultiClear,
        trackAccumulatorSelected: trackAccumulatorSelected,
        trackAccumulatorReview: trackAccumulatorReview,
        trackAccumulatorReceipt: trackAccumulatorReceipt,
        trackCashSelected: trackCashSelected,
        trackCashReceipt: trackCashReceipt,
        trackCashRemove: trackCashRemove,
        trackCashClear: trackCashClear,
        trackAccount: trackAccount,
        trackDeposit: trackDeposit,
        trackCheckIn: trackCheckIn,
        trackActivity: trackActivity,
        trackKey: trackKey
    };

    function trackNav() {
        trackKey(dataLayer.keys.nav);
    }

    function trackBet() {
        trackKey(dataLayer.keys.betSelected);
    }
    function trackBetSingleSelected() {
        
        trackKey(dataLayer.keys.betSelected);
    }
    function trackBetSingleReview() {
        trackKey(dataLayer.keys.betAccountSelected);
        trackKey(dataLayer.keys.betAccountReview);
    }
    function trackBetSingleReceipt() {
        trackKey(dataLayer.keys.betAccountProcessed);
    }
    function trackBetSlipAdd() {
        trackKey(dataLayer.keys.betslipBetAdded);
    }
    function trackBetSlipReview() {
        trackKey(dataLayer.keys.betslipAccountSelected);
        trackKey(dataLayer.keys.betslipAccountReview);
    }
    function trackBetSlipReceipt() {
        trackKey(dataLayer.keys.betslipAccountProcessed);
    }
    function trackBetSlipCashSelected() {
        trackKey(dataLayer.keys.betslipCashSelected);
    }
    function trackBetSlipClear() {
        trackKey(dataLayer.keys.betslipCleared);
    }
    function trackBetSlipRemove() {
        trackKey(dataLayer.keys.betslipBetRemoved);
    }
    function trackMysterySelected() {
        trackKey(dataLayer.keys.mysterySelected);
    }
    function trackMysteryReview() {
        trackKey(dataLayer.keys.mysteryAccountSelected);
        trackKey(dataLayer.keys.mysteryReview);
    }
    function trackMysteryReceipt() {
        trackKey(dataLayer.keys.mysteryReceipt);
    }
    function trackFavNumbersSelected() {
        trackKey(dataLayer.keys.favNumbersSelected);
    }
    function trackFavNumbersReview() {
        trackKey(dataLayer.keys.favNumbersAccountSelected);
        trackKey(dataLayer.keys.favNumbersAccountReview);
    }
    function trackFavNumbersReceipt() {
        trackKey(dataLayer.keys.favNumbersAccountProcessed);
    }
    function trackTippingSelected() {
        trackKey(dataLayer.keys.tippingSelected);
    }
    function trackTippingReview() {
        trackKey(dataLayer.keys.tippingAccountSelected);
        trackKey(dataLayer.keys.tippingAccountReview);
    }
    function trackTippingReceipt() {
        trackKey(dataLayer.keys.tippingAccountProcessed);
    }
    function trackMultiAdd() {
        trackKey(dataLayer.keys.multiBetAdded);
    }
    function trackMultiReview() {
        trackKey(dataLayer.keys.multiAccountSelected);
        trackKey(dataLayer.keys.multiAccountReview);
    }
    function trackMultiReceipt() {
        trackKey(dataLayer.keys.multiAccountProcessed);
    }
    function trackMultiClear() {
        trackKey(dataLayer.keys.multiCleared);
    }
    function trackMultiRemove() {
        trackKey(dataLayer.keys.multiBetRemoved);
    }
    function trackAccumulatorSelected() {
        trackKey(dataLayer.keys.accumulatorSelected);
    }
    function trackAccumulatorReview() {
        trackKey(dataLayer.keys.accumulatorAccountSelected);
        trackKey(dataLayer.keys.accumulatorAccountReview);
    }
    function trackAccumulatorReceipt() {
        trackKey(dataLayer.keys.accumulatorAccountProcessed);
    }
    function trackCashSelected() {
        trackKey(dataLayer.keys.cashBetSelected);
    }
    function trackCashReceipt() {
        trackKey(dataLayer.keys.cashBetProcessed);
    }
    function trackCashRemove() {
        trackKey(dataLayer.keys.cashBetRemoved);
    }
    function trackCashClear() {
        trackKey(dataLayer.keys.cashCleared);
    }

    function trackLogin() {
        trackKey(dataLayer.keys.login);
    }
    function trackLogout() {
        trackKey(dataLayer.keys.logout);
    }
    function trackExit(externalSite) {
        trackKey(dataLayer.keys.exitToBaseKey + externalSite);
    }
    function trackMenu() {
        trackKey(dataLayer.keys.menu);
    }
    function trackBetWithCashPreference(state) {
        
        trackKey(dataLayer.keys.cashPreferenceBaseKey + state);
    }
    function trackSignUp(step) {
        trackKey(dataLayer.keys.signupBaseKey + step);
        
    }
    function trackAccount() {
        trackKey(dataLayer.keys.accountProcessed);
    }
    function trackDeposit(key) {
        trackKey(dataLayer.keys.depositBaseKey + key);
    }
    function trackCheckIn(key) {
        trackKey(dataLayer.keys.checkInBaseKey + key);
    }
    function trackActivity(key) {
        trackKey(dataLayer.keys.activityBaseKey + key);
    }
    function trackKey(key) {
        if (typeof _satellite !== 'undefined') {
            _satellite.track(key);
        }
    }
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/
var Base64 = {

    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
            this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
            this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },

    // public method for decoding
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

}

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
    return Base64;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, ko) {
    return function() {
        var self = this;
        
         self.consentProvided = ko.observable(false).extend({ equal: { params: true, message: "To continue you must allow your details provided to be verified by the issuer."} });
            
    };
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(6), __webpack_require__(142), __webpack_require__(24)], __WEBPACK_AMD_DEFINE_RESULT__ = function (ko, amplify, router, viewModelLocator) {
    var Footer = function () {
        // Force new object
        var self = this instanceof Footer
            ? this
            : Object.create(Footer.prototype);

        self.successClass = 'success';
        self.errorClass = 'error';
        // Properties
        self.enabledButtons = ko.observable(true);
        self.showNextButton = ko.observable(true);
        self.showPreviousButton = ko.observable(true);
        
        // Binding Prototypes
        self.next = self.next.bind(self);
        self.previous = self.previous.bind(self);
        self.setRoute = self.setRoute.bind(self);

        self.aboutYouStatusClass = ko.observable('');
        self.ageVerificationStatusClass = ko.observable('');
        self.passwordStatusClass = ko.observable('');
        
    };

    // Prototype Properties
    Footer.prototype = function () {
        var  
            next = function () {
                if (this.enabledButtons() === true) {
                    amplify.publish("signup.next", true);
                }
            },
            previous = function () {
                if (this.enabledButtons() === true) {
                    amplify.publish("signup.previous", true);
                }
            },
            setRoute = function (routeName) {
                router.setCurrentRoute(routeName);
            };
        return {
            next: next,
            previous: previous,
            setRoute: setRoute
        };
    } ();

    //Note: This module exports a function. That means that you, the developer, can create multiple instances.
    //If you wish to create a singleton, you should export an object instead of a function.

    return new Footer();
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($) {
        var system = function (options) {
            var self = (this === window) ? {} : this;
            var configOptions = options || {

            };

            var debugging = false;
            self.debug = function (isDebug) {
                if (isDebug) {
                    debugging = isDebug;
                }
                return debugging;
            };;
        };

        //Note: This module exports a function. That means that you, the developer, can create multiple instances.
        //If you wish to create a singleton, you should export an object instead of a function.

        return new system();
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ })

},[394]);
//# sourceMappingURL=signup_0b83544726580cb21de3.bundle.map