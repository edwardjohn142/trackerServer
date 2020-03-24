

var marker,map;

function initialize() {
    var myLatLng = new google.maps.LatLng( 50, 50 ),
        myOptions = {
            zoom: 4,
            center: myLatLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
            };
        map = new google.maps.Map( document.getElementById( 'googleMap' ), myOptions );
        marker = new google.maps.Marker( {position: myLatLng, map: map} );
    marker.setMap( map );
    // moveMarker( map, marker );
    
}

function moveMarker( latlng ) {
    
    //delayed so you can see it move

    
        marker.setPosition( new google.maps.LatLng( latlng.latitude,latlng.longitude) );
        map.panTo( new google.maps.LatLng( latlng.latitude,latlng.longitude) );
        


};
