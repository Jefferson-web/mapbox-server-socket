import { Marker } from "./Marker";

export class Map{

    private markers: { [key: string] : Marker } = {
        '1': {
            id: '1',
            nombre: 'Jefferson',
            lng: -75.75512993582937,
            lat: 45.349977429009954,
            color: "#dd8ffe"
        },
        '2': {
            id: '2',
            nombre: 'Brayan',
            lng: -75.74195645527508,
            lat: 45.351584045823756,
            color: "#dd8ffe"
        },
        '3': {
            id: '3',
            nombre: 'Nataly',
            lng: -75.75900589557777,
            lat:  45.34794635758547,
            color: "#dd8ffe"
        }
    };

    constructor(){}

    getMarkers(){
        return this.markers;
    }

    deleteMarker(id: string){
        delete this.markers[id];
        return this.markers;
    }

    moveMarker(marker: Marker){
        this.markers[marker.id].lng = marker.lng;
        this.markers[marker.id].lat = marker.lat;
    }

}