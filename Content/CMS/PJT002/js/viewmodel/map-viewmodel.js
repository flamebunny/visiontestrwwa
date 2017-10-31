define(['knockout', 'jquery', 'underscore', 'LocationBasedServices/viewmodel/attheraces-viewmodel', 'LocationService'], function (ko, $, _, viewModel) {
    var mapContainers = $('.map-container');
    var mapSwitcher = $('.map-options');
    var mapCollection = ko.observableArray([]);

    return {
        initView: initView,
        maps: mapCollection,
        showMap : updateMapContainers
    }

    function updateMapContainers(data, event) {
        _.each(mapCollection(), function (map) {
            var newMap = map();
            newMap.selected = (newMap.hash === data.hash);
            map(newMap);
        });
    }

    function initView(maps) {
        var obsMaps = [];

        viewModel.initView();

        _.each(maps, function(map) {
            obsMaps.push(ko.observable(map));
        });
        mapCollection(obsMaps);
    }
});