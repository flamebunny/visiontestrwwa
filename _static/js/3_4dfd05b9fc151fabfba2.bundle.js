webpackJsonp([3,10],{

/***/ 404:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(60), __webpack_require__(22)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, kernel, log) {
    "use strict";

    var toteSelections = TOTESEL;

    var pyosStore = kernel.default.get("PyosStore");

    function toPropositionCode(propositionType) {
        switch (propositionType) {
        case "Odds":
            return "ODD";
        case "Evens":
            return "EVN";
        case "Outside":
            return "OS";
        case "Inside":
            return "IS";
        default:
            return null;
        }
    }

    function buildPreEnquirySelection() {
        var meetingDate = jQuery("#MeetingDate").val();
        var fixtureId = jQuery("#MeetingID").val();
        var raceNumber = jQuery("#Tabs_0__RaceNo").val();
        var starterNumber = jQuery("#selectedStarterNumber").val();
        var propositionCode = toPropositionCode(jQuery("#fobPropositionType").val());
        var propositionSeq = jQuery("#PropositionSequence").val();
        var isRacing = (meetingDate && fixtureId && raceNumber && (starterNumber || propositionCode));

        if (isRacing) {
            return {
                StarterNumber: starterNumber,
                RaceNumber: raceNumber,
                FixtureId: fixtureId.toUpperCase(),
                FixtureDateTime: meetingDate,
                PropositionCode: propositionCode
            };
        } else if (propositionSeq) {
            return {
                PropositionSeq: propositionSeq
            };
        }
        return null;
    }

    function buildPreEnquiryPriceDetails() {
        var fixedWinPrice = jQuery("#FixedWinPrice").val();
        var fixedPlacePrice = jQuery("#FixedPlacePrice").val();

        return { Win: { DollarReturn: fixedWinPrice }, Place: { DollarReturn: fixedPlacePrice } };
    }

    function buildPreEnquiryStake() {
        var returnType = jQuery("ul.win-or-place-selector input:checked").val();
        switch (returnType) {
            case "EachWay":
                return { Win: jQuery('#Investment,#Investment1').val(), Place: jQuery('#Investment,#Investment1').val() };
            default:
                return { Win: jQuery('#Investment,#Investment1').val(), Place: jQuery('#InvestmentPlace,#Investment2').val() };
        }
    }

    function clear() {
        log.logDebug("totePyos::clear");
        pyosStore.clear();
    }

    function clearErrorMessage() {
        log.logDebug("totePyos::clearErrorMessage");
        pyosStore.clearErrorMessage();
    }

    function setStake() {
        var stake = buildPreEnquiryStake();
        log.logDebug("totePyos::bet.single.stake: " + JSON.stringify(stake));
        pyosStore.setStake(stake);
    }

    function setupBetAmountSubscriptions() {
        jQuery('#Investment1,#Investment2,#Investment,#InvestmentPlace')
            .off('input.pyosSelect change.pyosSelect')
            .on('input.pyosSelect change.pyosSelect', function () {
                setStake();
            });

        jQuery('ul.win-or-place-selector input')
           .off('click.pyosSelect')
           .on('click.pyosSelect', function () {
               setStake();
           });
    }

    function initBetSelection() {

        setupBetAmountSubscriptions();

        if (toteSelections.isFixedOddsRacing() || toteSelections.isValidFixedoddsBet()) {

            var data = {
                betSelection: buildPreEnquirySelection(),
                priceDetails: buildPreEnquiryPriceDetails(),
                stake: buildPreEnquiryStake()
            };


            log.logDebug("totePyos::initBetSelection:" + JSON.stringify(data));

            pyosStore.setPriceDetails(data.priceDetails);
            pyosStore.setStake(data.stake);
            pyosStore.setBetSelection(data.betSelection);
            return pyosStore.enquireSpecialOffers();

        } else {
            clear();
            return Promise.resolve();
        }
    }

    function validate() {
        log.logDebug("totePyos::validate");

        return new Promise(function (resolve, reject) {
            if (pyosStore.validate()) {
                resolve();
            } else {
                reject();
            }
        });
    }

    return {
        clear: clear,
        initBetSelection: initBetSelection,
        clearErrorMessage: clearErrorMessage,
        validate: validate
    };
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ })

});
//# sourceMappingURL=3_4dfd05b9fc151fabfba2.bundle.map