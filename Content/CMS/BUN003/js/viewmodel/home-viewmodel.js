define(['knockout', 'LocationBasedServices/viewmodel/attheraces-viewmodel', 'CheckInService','underscore'], function (ko, attheraces, checkinService) {
    var stage = ko.observable(1);

    return {
        initView: initView,
        confirmRedeem: confirmRedeem,
        cancelRedeem: cancelRedeem,
        startRedeem: startRedeem,
        stage: stage
    }

    function hasNotRedeemedToday() {
        return !checkinService.wasRedeemedToday();
    }

    function updateDisplay() {
        if (hasNotRedeemedToday()) {
            stage(1);
        } else {
            stage(3);
        }
    }

    function startRedeem() {
        stage(2);
    }

    function cancelRedeem() {
        stage(1);
    }

    function confirmRedeem() {
        checkinService.redeem();
        updateDisplay();
    }

    function initView(maps) {
        attheraces.initView();
        updateDisplay();
    }
});