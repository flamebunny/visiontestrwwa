webpackJsonp([4,10],{

/***/ 403:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(1),
    __webpack_require__(0),
    __webpack_require__(2),
    __webpack_require__(87),
    __webpack_require__(52),
    __webpack_require__(8),
    __webpack_require__(73),
    __webpack_require__(4),
    __webpack_require__(41),
    __webpack_require__(59),
    __webpack_require__(22),
    __webpack_require__(62),
    __webpack_require__(3),
    __webpack_require__(31),
    __webpack_require__(44)
], __WEBPACK_AMD_DEFINE_RESULT__ = function (ko, jQuery, _, lbs, deviceIdentificationService, preferencesService, locationProvider, msgBusService, checkInService, locationService, loggingService, lbsConfigService, nav, logon, apiService) {
    var checkinStates = {
        CheckIn: "CheckIn",
        NoGps: "NoGps",
        OutOfRange: "OutOfRange",
        Searching: "Searching",
        Done: "Done",
        Download: "Download",
        Update: "Update",
        NoLocation: "NoLocation"
    }
    var state = ko.observable(checkinStates.CheckIn);
    var _androidSettings = null;

    var tabAndTrackLines = ko.pureComputed(function() {
        switch (state()) {
            case checkinStates.NoGps:
                return [
                    'Sorry.',
                    'We have detected that your "Location Services" may be turned off. Please check your phone settings.'
                ];
            case checkinStates.OutOfRange:
                return [
                    'Sorry.',
                    'There are no participating race courses near your current location.'
                ];
            case checkinStates.NoLocation:
                return [
                    'Sorry.',
                    'We can not find your location. would you like to try again?'
                ];
            case checkinStates.Download:
            case checkinStates.Update:
                return [
                    'Unlike other betting providers, TABtouch helps fund the WA racing industry, when you CHECK IN at the track, every dollar you spend supports your local race club.',
                    'To Check In you need to update your TABtouch app.'
                ];
            case checkinStates.CheckIn:
            case checkinStates.Searching:
            case checkinStates.Done:
            default:
                return [
                    'Unlike other betting providers, TABtouch helps fund the WA racing industry, when you CHECK IN at the track, every dollar you spend supports your local race club.',
                    'Check In is available for TABtouch account holders only.'
                ];
        }
    });
    var showCheckIn = ko.pureComputed(function() {
        return state() === checkinStates.CheckIn;
    },this);
    var showCancel = ko.pureComputed(function () {
        return state() === checkinStates.NoGps || state() === checkinStates.OutOfRange;
    }, this);
    var showSearching = ko.pureComputed(function () {
        return state() === checkinStates.Searching;
    }, this);
    var showDone = ko.pureComputed(function () {
        return state() === checkinStates.Done;
    }, this);
    var showDownload = ko.pureComputed(function () {
        return state() === checkinStates.Download;
    }, this);
    var showUpdate = ko.pureComputed(function () {
        return state() === checkinStates.Update;
    }, this);
    var showTryAgain = ko.pureComputed(function () {
        return state() === checkinStates.NoLocation;
    }, this);
    var areAndroidSettingsFetched = ko.observable(false);
    var mobile = ko.computed(function() {
        if (_androidSettings) {
            if (deviceIdentificationService.isInAndroidApp()) {
                return {
                    OsName: 'Android',
                    UpdateLink: _androidSettings.ApkDownloadUrl,
                    Icon: "icon-sprite icon-black icon-android icon-double"
                }
            } else {
                return {                
                    OsName: 'iPhone',
                    UpdateLink: "https://itunes.apple.com/au/app/tabtouch/id472906558",
                    Icon: "icon-sprite icon-black icon-apple icon-double"
                }
            }
        } else {
            return {
                OsName: 'Unknown',
                UpdateLink: '#',
                Icon: ''
            }
        }
    });
    var participatingFences = ko.computed(function () {
        return _.chain(lbsConfigService.getFences())
            .map('Description')
            .sort()
            .value();
    });

    function populateAndroidSettings() {
        apiService.fetchJsonFromApi('/api/config/androidsettings').then(function(settings) {
            _androidSettings = settings;

            areAndroidSettingsFetched(true);
        });
    }

    function switchState(newState) {
        state(newState);
    }

    function initViewForMobileApp() {
        populateAndroidSettings();
        switchState(checkinStates.CheckIn);
    };

    function initViewForBrowserApp(reasons) {
        populateAndroidSettings();
        if (reasons.indexOf('Browser') > -1) {
            switchState(checkinStates.Download);
        }
        if (reasons.indexOf('Version') > -1) {
            switchState(checkinStates.Update);
        }
    };

    function showGpsError(gpsError) {
        var errorCode = Number(gpsError);
        if (errorCode === 1) {
            switchState(checkinStates.NoGps);
        } else if (errorCode === 2) {
            switchState(checkinStates.NoLocation);
        } else {
            switchState(checkinStates.OutOfRange);
        }
        //Analytics
        msgBusService.publish('lbs.checkin', 'error');
    }

    function initView() {
        populateAndroidSettings();
        deviceIdentificationService.isInMobileApp([{Value:'LocationServices',ErrorResponse:'Version'}],initViewForMobileApp, initViewForBrowserApp);
        lbs.initView();
    }

    function onGpsError(error) {
        msgBusService.unsubscribe('GPSERROR', onGpsError);
        msgBusService.unsubscribe('GPSSUCCESS', onGpsSucess);

        loggingService.logDebug('checkin-viewmodel.onGpsError - errors =' + JSON.stringify(error));

        locationProvider.stop();
        if (error !== null && error !== undefined) {
            return showGpsError(error.code);
        }

        return showGpsError();
    }

    function onGpsSucess() {
        msgBusService.unsubscribe('GPSERROR', onGpsError);
        msgBusService.unsubscribe('GPSSUCCESS', onGpsSucess);
        checkInService.checkin();
        var locationId = checkInService.checkedInLocationId();
        if (locationId !== undefined && locationId !== null && locationId !== '') {
            return nav.navChange('/#lbs/attheraces?code=GPS' + '&id=' + locationId);
        } else {
            return showGpsError();
        }
    }

    function onCheckIn() {
        var loggedOn = (jQuery('#LoggedOn').val() === 'True');
        if (loggedOn) {
            startCheckIn();
        } else {
            msgBusService.subscribe('lo.login', onLogonSuccess);
            msgBusService.subscribe('lo.fail', onLogonFail);
            logon.login();
        }
    }

    function onLogonSuccess() {
        msgBusService.unsubscribe('lo.login', onLogonSuccess);
        msgBusService.unsubscribe('lo.fail', onLogonFail);
        startCheckIn();
    }

    function onLogonFail() {
        msgBusService.unsubscribe('lo.login', onLogonSuccess);
        msgBusService.unsubscribe('lo.fail', onLogonFail);
        switchState(checkinStates.CheckIn);
    }

    function startCheckIn() {
        switchState(checkinStates.Searching);
        msgBusService.subscribe('GPSSUCCESS', onGpsSucess);
        msgBusService.subscribe('GPSERROR', onGpsError);
        locationProvider.start(function() {
            console.log("Pref disabled");
        }, function() {
            console.log("Feature inactive");
        });
    }

    function onCancel() {
        return nav.navChange('/#');
    }

    return {
        onCheckIn: onCheckIn,
        onCancel: onCancel,
        initView: initView,
        tabAndTrackLines: tabAndTrackLines,
        showCheckIn: showCheckIn,
        showSearching: showSearching,
        showDone: showDone,
        showDownload: showDownload,
        showUpdate: showUpdate,
        showTryAgain: showTryAgain,
        showCancel: showCancel,
        mobile: mobile,
        participatingFences: participatingFences,
        areAndroidSettingsFetched: areAndroidSettingsFetched
    }
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ })

});
//# sourceMappingURL=4_2f6d50ca74ce775c608a.bundle.map