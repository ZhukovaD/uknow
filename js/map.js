function initMap() {
    var uluru = {lat: 59.748976, lng: 30.607532};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        scrollwheel: false,
        center: uluru,
        gestureHandling: 'cooperative'
    });
    var contentString ='Офис UKnow: г.Колпино, ул. Труда, дом 9'
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    var image = 'img/icon-map-marker.svg';

    var castomMarker = new google.maps.Marker({
        position: uluru,
        map: map,
        icon: image,
        title:'ЛЯляля'
    });

    castomMarker.addListener('click', function() {
        infowindow.open(map, castomMarker);
    });

}
