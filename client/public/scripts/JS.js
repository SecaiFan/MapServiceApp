ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map('map', {
        center: [59.938, 30.3],
        zoom: 9
    }, {
        restrictMapArea: [
            [59.838,29.511],
            [60.056,30.829]
        ],
    });
    console.log(myMap);
}


