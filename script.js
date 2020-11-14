
async function getTaxiCoord()
{
    let response = await axios.get("https://api.data.gov.sg/v1/transport/taxi-availability");
    // x.features[0].geometry.coordinates. Ask for the return of the coordinate.
    console.log(response.data.features[0].properties.taxi_count);
    return response.data.features[0].geometry.coordinates; 
    
}

async function addTaxiMarkers(map)
{
    let taxis = await getTaxiCoord();
    let cluster = L.markerClusterGroup();
    
    for (let t of taxis)
    {
        let coordinate = [t[1],t[0]];
        let taxisMarker = L.marker(coordinate);
        taxisMarker.addTo(cluster)
    }
    //add cluster to map
    cluster.addTo(map);
}

//insert lat and long of Singapore
let singapore = [1.29,103.85];
let map = L.map("map").setView(singapore, 12);

// go to mapbox.com if we want to apply for our token
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(map);


addTaxiMarkers(map);

 