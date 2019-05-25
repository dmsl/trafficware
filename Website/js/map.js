// data structures
var file = { phpfile: "tilegisdata.php", typeOfFile: "php" };

// variables
var zoom = 12;
var lat = 35.1522437;
var lon = 33.3751678;
var mymap = new L.map('mapid', { zoomControl: false });
var minlat;
var minlon;
var maxlat;
var maxlon;
var cached_points = [];
var defaults_flag = 1;
var option = 1;
var data_array = [];
var points = [];
var last_lat = 0, last_lon = 0, cell_count = 0, last_cellid = 0, polygon, circle, spiderfy = false;


// markers
var markers = new L.FeatureGroup();
var pruneCluster = new PruneClusterForLeaflet();
var clustering_points = [];
var cluster = L.markerClusterGroup();

var serverIP = "10.16.30.133";
var chooseFun = 'cluster';

var popup = L.popup();

var blueIcon = L.icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]


});

var redIcon = L.icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]


});

var purpleIcon = L.icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]

});

var greyIcon = L.icon({

    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]

});
var greenIcon = L.icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]


});

var yellowIcon = L.icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]

});

var orangeIcon = L.icon({

    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]

});

var wigle_color = "default";


var layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    minZoom: 2,
    maxBounds: L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180)),
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

}).addTo(mymap);

new L.Control.Zoom({ position: 'topright' }).addTo(mymap);
mymap.setView([lat, lon], zoom);


function defaultLayer() {

    mymap.removeLayer(layer);

    layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 2,
        maxBounds: L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180)),
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

    }).addTo(mymap);
}

function classicLayer() {

    mymap.removeLayer(layer);

    layer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        maxZoom: 18,
        minZoom: 2,
        maxBounds: L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180)),
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1Ijoiamdlb3JnMDIiLCJhIjoiY2ptM292NjBnMW1zazNrbzV4dGlqNXVqYiJ9.kkorbmkTlF9J2JRFPDOu3w'
    }).addTo(mymap);

}

function satelliteLayer() {

    mymap.removeLayer(layer);

    layer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        maxZoom: 18,
        minZoom: 2,
        maxBounds: L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180)),
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.satellite',
        accessToken: 'pk.eyJ1Ijoiamdlb3JnMDIiLCJhIjoiY2ptM292NjBnMW1zazNrbzV4dGlqNXVqYiJ9.kkorbmkTlF9J2JRFPDOu3w'
    }).addTo(mymap);
}

function darkLayer() {

    mymap.removeLayer(layer);

    layer = L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token={accessToken}', {
        maxZoom: 18,
        minZoom: 2,
        maxBounds: L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180)),
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1Ijoiamdlb3JnMDIiLCJhIjoiY2ptM292NjBnMW1zazNrbzV4dGlqNXVqYiJ9.kkorbmkTlF9J2JRFPDOu3w'

    }).addTo(mymap);
}

function onMapClick(e) {

    var latlon = e.latlng;
    popup
        .setLatLng(latlon)
        .setContent("You clicked the map at " + latlon.toString())
        .openOn(mymap);

}

function clearPoints(fun) {

    markers.clearLayers();
    cluster.clearLayers();
    pruneCluster.RemoveMarkers();
    pruneCluster.ProcessView();
    // remove previous polylines and circles
    if (polygon != undefined)
        mymap.removeLayer(polygon);
    if (circle != undefined)
        mymap.removeLayer(circle);

    if (!(defaults_flag && (mymap.getZoom() == 14))) cached_points = [];


}


/** Calls the function to make an ajax call and fetch
 *  tiled data from the database.
 */
function fetchPointFromDatabase(data_type) {

    file.typeOfFile = "php";
    if (data_type == "opencellid") file.phpfile = "tilegisdata.php";
    else if (data_type == "wigle") file.phpfile = "wigle.php";
    else if (data_type == "cyprus_cell") file.phpfile = "cyprusCells.php";
    else if (data_type == "measurements") file.phpfile = "metrics.php";
    else if (data_type == "mls") file.phpfile = "mls.php";
    else {

        data_array.forEach(function (element) {
            if (element == "opencellid") {
                file.phpfile = "tilegisdata.php";
                option = 1;
            }
            else if (element == "wigle") {
                file.phpfile = "wigle.php";
                option = 3;
            }
            else if (element == "cyprus_cell") {
                file.phpfile = "cyprusCells.php";
                option = 5;
            }
            else if (element == "measurements") {
                file.phpfile = "metrics.php";
                option = 4;
            }
            else if (element == "mls") {
                file.phpfile = "mls.php";
                option = 2;
            }

            ajaxCall(executeQuery, option);
        });
    }

    if (data_type != "unchecked")
        ajaxCall(executeQuery, option);

}

function changeTileData() {

    var north = mymap.getBounds().getNorth().toString();
    var south = mymap.getBounds().getSouth().toString();
    var east = mymap.getBounds().getEast().toString();
    var west = mymap.getBounds().getWest().toString();

    if (maxlat != north || minlat != south || maxlon != east || minlon != west) {

        maxlat = north;
        minlat = south;
        maxlon = east;
        minlon = west;

        if (defaults_flag && (mymap.getZoom() == 15)) clearPoints();

        if (data_array.length > 1)
            points = [];
        else if (data_array.length == 1)
            if (data_array[1] != "measurements")
                points = [];

        fetchPointFromDatabase("unchecked");
    }
}

function executeQuery(data, option) {
    var fields = ["radio", "mcc", "net", "area", "cell", "unit", "lon", "lat", "range", "samples", "changeable", "created", "updated", "averageSignal"];
    var dataArray;
    if (option == 5) dataArray = data.split("''''  , ;");
    else dataArray = data.split(", ;");
    dataArray.pop();

    wigle_color = 'default';
    var cellid = 0;
    var counter = 0;
    var cell_flag = false;
    dataArray.forEach(function (dataElement) {

        cell_flag = false;

        if (option == 5) dataElement = dataElement.split("''''  , ");
        else dataElement = dataElement.split(", ");
        var popup = '';
        var type = dataElement[0];
        lat = dataElement[6];
        lon = dataElement[7];

        // for opencellid data 
        if (option == 1) {

            lat = dataElement[7];
            lon = dataElement[6];

            popup = "<h1>OpenCellId Tower</h1><b>" + fields[0] + ":</b> " + dataElement[0] + ",<br /><b>" + fields[1] + ":</b> " + dataElement[1] + ",<br /><b>" +
                fields[2] + ":</b> " + dataElement[2] + ",<br /><b>" + fields[3] + ":</b> " + dataElement[3] + ",<br /><b>" +
                fields[4] + ":</b> " + dataElement[4] + ",<br /><b>" + fields[5] + ":</b> " + dataElement[5] + ",<br /><b>" +
                fields[6] + ":</b> " + dataElement[6] + ",<br /><b>" + fields[7] + ":</b> " + dataElement[7] + ",<br /><b>" +
                fields[8] + ":</b> " + dataElement[8] + ",<br /><b>" + fields[9] + ":</b> " + dataElement[9] + ",<br /><b>" +
                fields[13] + ":</b> " + dataElement[13] + "<br />";

            // for wiggle data
        } else if (option == 3) {

            type = dataElement[15];
            lat = dataElement[0];
            lon = dataElement[1];

            cell_flag = false;

            if (cellid != dataElement[13]) {
                switch (counter) {
                    case 0:
                        wigle_color = blueIcon;
                        break;
                    case 1:
                        wigle_color = redIcon;
                        break;
                    case 2:
                        wigle_color = purpleIcon;
                        break;
                    case 3:
                        wigle_color = greyIcon;
                        break;
                    case 4:
                        wigle_color = greenIcon;
                        break;
                    case 5:
                        wigle_color = yellowIcon;
                        break;
                    case 6:
                        wigle_color = orangeIcon;
                        break;

                }
                counter++;
                cellid = dataElement[13];
                cell_flag = true;
            }

            if (counter == 7) counter = 0;

            popup = "<h1>Wigle Tower</h1><b>Lat: </b>" + dataElement[0] + ",<br /><b>Lon: </b>" + dataElement[1] + ",<br /><b>SSID: </b>" + dataElement[2]
                + ",<br /><b>QOS: </b>" + dataElement[3] + ",<br /><br /><b>Transit: </b>" + dataElement[4]
                + ",<br /><b>First TIme: </b>" + dataElement[5] + ",<br /><b>Last Time: </b>" + dataElement[6]
                + ",<br /><b>Last Updated: </b>" + dataElement[7] + ",<br /><b>House Number: </b>" + dataElement[8]
                + ",<br /><b>Road: </b>" + dataElement[9] + ",<br /><b>City: </b>" + dataElement[10]
                + ",<br /><b>Region: </b>" + dataElement[11] + ",<br /><b>Country: </b>" + dataElement[12]
                + ",<br /><b>ID: </b>" + dataElement[13] + ",<br /><b>Attributes: </b>" + dataElement[14]
                + ",<br /><b>Gentype: </b>" + dataElement[15];

            type = dataElement[15];

            // for cyprus' cell data
        } else if (option == 5) {

            lat = dataElement[3];
            lon = dataElement[4];
            popup = "<h1>Cyprus' Cell Tower</h1><b>Code: </b>" + dataElement[0] + ",<br /><b>Name: </b>" + dataElement[1] + ",<br /><b>Address: </b>" + dataElement[2] +
                ",<br /><b>GSM: </b>" + dataElement[5] + ",<br /><b>DCS: </b>" + dataElement[6] + ",<br /><b>Antenna Height: </b>" + dataElement[7] +
                ",<br /><b>Services: </b>" + dataElement[8] + ",<br /><b>Site Installation: </b>" + dataElement[9] + ",<br /><b>Area: </b>" + dataElement[10] +
                ",<br /><b>Colocation: </b>" + dataElement[11] + ",<br /><b>Latitude: </b>" + dataElement[3] + ",<br /><b>Longitude: </b>" + dataElement[4];

            // for mls data
        } else if (option == 2) {

            lat = dataElement[7];
            lon = dataElement[6];
            popup = "<h1>MLS Tower</h1><b>Radio: </b>" + dataElement[0] + ",<br /><b>MCC: </b>" + dataElement[1] + ",<br /><b>Net: </b>" + dataElement[2] +
                ",<br /><b>Area: </b>" + dataElement[3] + ",<br /><b>Cell: </b>" + dataElement[4] + ",<br /><b>Unit: </b>" + dataElement[5] +
                ",<br /><b>Range: </b>" + dataElement[8] + ",<br /><b>Samples: </b>" + dataElement[9] + ",<br /><b>Changeable: </b>" + dataElement[10] +
                ",<br /><b>Created: </b>" + dataElement[11] + ",<br /><b>Updated: </b>" + dataElement[12] + ",<br /><b>Latitude: </b>" + dataElement[7] +
                ",<br /><b>Longitude: </b>" + dataElement[6];

            // for my measurements
        } else {

            lat = dataElement[1];
            lon = dataElement[2];

            popup = "<h1>My Measurements</h1>" +
                "<b>Timestamp: </b>" + dataElement[0] + ",<br /><b>Latitude: </b>" + dataElement[1] + ",<br /><b>Longtitude: </b>" + dataElement[2] + ",<br /><b>Type: </b>" + dataElement[3] +
                ",<br /><b>Signal: </b>" + dataElement[4] + ",<br /><b>Cellid: </b>" + dataElement[5] + ",<br /><b>Mnc: </b>" + dataElement[6] + ",<br /><b>Lac: </b>" + dataElement[7];

            if (cellid != dataElement[5]) {
                switch (counter) {
                    case 0:
                        wigle_color = blueIcon;
                        break;
                    case 1:
                        wigle_color = redIcon;
                        break;
                    case 2:
                        wigle_color = purpleIcon;
                        break;
                    case 3:
                        wigle_color = greyIcon;
                        break;
                    case 4:
                        wigle_color = greenIcon;
                        break;
                    case 5:
                        wigle_color = yellowIcon;
                        break;
                    case 6:
                        wigle_color = orangeIcon;
                        break;

                }
                counter++;
                cellid = dataElement[5];
                cell_flag = true;
            }


            if (counter == 7) counter = 0;

        }

        if (defaults_flag) {
            if (mymap.getZoom() <= 14 && defaults_flag != 2) {
                points.push({ lat, lon });
                chooseFun = 'heatmap';

            } else {
                points = [];
                if (option != 4) {
                    clusterPoints(lon, lat, type, popup);
                    chooseFun = 'cluster';
                }
                else {
                    clusterIdPoints(lon, lat, cell_flag, popup, type, cellid);
                    chooseFun = 'cluster_id';
                }

            }
        } else {
            switch (chooseFun) {
                case "classic":
                    clustering_points = [];
                    points = [];
                    classicPoints(lon, lat, type, popup);
                    break;
                case "heatmap":
                    clustering_points = [];
                    points.push({ lat, lon });
                    break;
                case "cluster":
                    clustering_points = [];
                    points = [];
                    clusterPoints(lon, lat, type, popup);
                    break;
                case "prune":
                    clustering_points = [];
                    points = [];
                    prunePoints(lon, lat, type, popup);
                    break;
                case "cluster_id":
                    points = [];
                    clusterIdPoints(lon, lat, cell_flag, popup, type, cellid);
                    break;

            }
        }
    }
    );

    if (chooseFun == 'prune') pruneCluster.ProcessView();
    else if (chooseFun == 'heatmap') heatmap(points);

}

function clusterIdPoints(lon, lat, cellid_flag, popup, cell, cellid) {

    var marker;

    if ((cellid_flag) && (last_lat != 0 && last_lon != 0)) {

        marker = L.marker([last_lat, last_lon], { icon: wigle_color });
        marker.bindPopup("<b>Cellid: </b> " + last_cellid);

        clustering_points.push({ cellid: last_cellid, map_point: marker });

        marker.on('click', function (e) {

            var points = [];
            var cell_id;
            var latlon;
            var i;

            for (i = 0; i < clustering_points.length; i++) {
                if (e.latlng == clustering_points[i].map_point.getLatLng()) {
                    cell_id = clustering_points[i].cellid;
                    break;
                }
            }

            clustering_points.forEach(function (point) {
                if (cell_id == point.cellid) {
                    latlon = point.map_point.getLatLng();
                    points.push(latlon);
                }
            });

            // find outer-points (gift-wrapping algorithm)
            var lefterPoint;
            i = 0;
            points.forEach(function (point) {
                if (i == 0) lefterPoint = point;
                else if (lefterPoint > point) lefterPoint = point;
                i++;
            });

            var pointOnHull = lefterPoint;
            var endpoint;
            var wrappedPoints = [];
            i = 0;
            do {
                wrappedPoints[i] = pointOnHull;
                endpoint = points[0];
                for (var j = 1; j < points.length; j++)
                    if (endpoint == pointOnHull || points[j] < wrappedPoints[i])
                        endpoint = points[j];
                i++;
                pointOnHull = endpoint;
            } while (endpoint != wrappedPoints[0]);

            // remove previous polylines and circles
            if (polygon != undefined)
                mymap.removeLayer(polygon);
            if (circle != undefined)
                mymap.removeLayer(circle);

            // add the new ones
            polygon = L.polygon(wrappedPoints, { color: 'red' }).addTo(mymap);
            mymap.fitBounds(polygon.getBounds());

            // find distance of polygon
            var totalDistance = polygon.getBounds()._northEast.distanceTo(polygon.getBounds()._southWest);

            // radius = totalDistance / 2
            circle = L.circle(polygon.getBounds().getCenter(), totalDistance / 2).addTo(mymap);


        });

        last_lat = 0;
        last_lon = 0;
        last_cellid = cellid;
        markers.addLayer(marker);
        mymap.addLayer(markers);

    }

    if (!checkMarker(lat, lon)) {

        if (cell != null) {

            if (wigle_color == 'default') {

                if ((cell == "GSM") || (cell == '2G'))
                    marker = L.marker([lat, lon], { icon: greyIcon });


                else if ((cell == "UMTS") || (cell == '3G'))
                    marker = L.marker([lat, lon], { icon: redIcon });


                else if ((cell == "LTE") || (cell == 'LTE/4G'))
                    marker = L.marker([lat, lon], { icon: purpleIcon });

                else marker = L.marker([lat, lon]);
            } else marker = L.marker([lat, lon], { icon: wigle_color });

        } else marker = L.marker([lat, lon]);

        if (popup != null)
            marker.bindPopup(popup);

        clustering_points.push({ cellid: cellid, map_point: marker });
        cached_points.push({ on_map: 1, map_point: marker });
        if (last_lat == 0 && last_lon == 0) {
            last_lat = lat;
            last_lon = lon;
        }
    }


}



/** This function takes as paramters the function that will call the ajax cal
 *  and the type, if it is an ajax call for a php file or for a regular file.
 */
function ajaxCall(fun, option) {

    var url;
    var data;
    var datatype;

    url = file.phpfile;

    data = {
        minlon: minlon,
        minlat: minlat,
        maxlon: maxlon,
        maxlat: maxlat
    };
    datatype = "text";


    $(document).ready(function () {
        $.ajax({
            type: "GET",
            url: url,
            data: data,
            dataType: datatype,
            success: function (response) {
                fun(response, option);
            }
        });
    });

}

function checkMarker(lat, lon) {
    var exists = false;

    cached_points.forEach(function (point) {
        switch (chooseFun) {
            case "classic":
                if ((point.map_point.getLatLng().lat == lat) && (point.map_point.getLatLng().lng == lon)) {
                    exists = true;
                    return;
                }

                break;
            case "cluster":
                if ((point.lat == lat) && (point.lon == lon)) {
                    exists = true;
                    return;
                }

                break;
            case "prune":
                if ((point.position.lat == lat) && (point.position.lng == lon)) {
                    exists = true;
                    return;
                }
                break;
            case "cluster_id":
                if ((point.map_point.getLatLng().lat == lat) && (point.map_point.getLatLng().lng == lon)) {
                    exists = true;
                    return;
                }
                break;
        }
    });

    return exists;
}

function classicPoints(lon, lat, cell, popup) {

    if (!checkMarker(lat, lon)) {
        var marker;

        if (cell != null) {

            if (wigle_color == 'default') {

                if ((cell == "GSM") || (cell == '2G'))
                    marker = L.marker([lat, lon], { icon: greyIcon });


                else if ((cell == "UMTS") || (cell == '3G'))
                    marker = L.marker([lat, lon], { icon: redIcon });


                else if ((cell == "LTE") || (cell == 'LTE/4G'))
                    marker = L.marker([lat, lon], { icon: purpleIcon });

                else marker = L.marker([lat, lon]);

            } else marker = L.marker([lat, lon], { icon: wigle_color });

        } else marker = L.marker([lat, lon]);

        if (popup != null)
            marker.bindPopup(popup);

        cached_points.push({ on_map: 1, map_point: marker });
        markers.addLayer(marker);
        mymap.addLayer(markers);
    }
}

function heatmap(points) {

    clearPoints("heatmap");

    points = points.map(function (p) {
        return [p.lat, p.lon, 0.5];
    });

    markers.addLayer(L.heatLayer(points, { radius: 25 }));
    mymap.addLayer(markers);

}

function clusterPoints(lon, lat, cell, popup) {

    if (!checkMarker(lat, lon)) {
        var cluster_point;

        if (cell != null) {

            if (wigle_color == 'default') {

                if ((cell == "GSM") || (cell == '2G'))
                    cluster_point = L.marker([lat, lon], { icon: greyIcon });


                else if ((cell == "UMTS") || (cell == '3G'))
                    cluster_point = L.marker([lat, lon], { icon: redIcon });


                else if ((cell == "LTE") || (cell == 'LTE/4G'))
                    cluster_point = L.marker([lat, lon], { icon: purpleIcon });

                else cluster_point = L.marker([lat, lon]);

            } else cluster_point = L.marker([lat, lon], { icon: wigle_color });

        } else cluster_point = L.marker([lat, lon]);

        if (popup != null)
            cluster_point.bindPopup(popup);

        cached_points.push({ lat, lon });
        cluster.addLayer(cluster_point);
        mymap.addLayer(cluster);
    }
}

function prunePoints(lon, lat, cell, popup) {

    if (!checkMarker(lat, lon)) {
        var prune_marker = new PruneCluster.Marker(lat, lon);

        if (cell != null) {

            if ((cell == "GSM") || (cell == '2G')) prune_marker.data.icon = greyIcon;

            else if ((cell == "UMTS") || (cell == '3G')) prune_marker.data.icon = redIcon;

            else if ((cell == "LTE") || (cell == 'LTE/4G')) prune_marker.data.icon = purpleIcon;

        }
        if (popup != null) prune_marker.data.popup = popup;
        cached_points.push(prune_marker);
        pruneCluster.RegisterMarker(prune_marker);
        mymap.addLayer(pruneCluster);
    }
}

function checkClusterIdVisible() {

    let clustering = document.getElementById("clustering");
    let wigle = document.getElementById("wigle");
    let mls = document.getElementById("mls");
    let opencellid = document.getElementById("opencellid");
    let cyprus_cell = document.getElementById("cyprus_cell");
    let measurements = document.getElementById("measurements");

    if (measurements.checked && !wigle.checked && !mls.checked && !opencellid.checked && !cyprus_cell.checked)
        clustering.style.visibility = "visible";
    else clustering.style.visibility = "hidden";

}


window.onload = pageLoad;

function pageLoad() {

    // assign onclick for the layer buttons
    document.getElementById("default").onclick = defaultLayer;
    document.getElementById("classic_tile").onclick = classicLayer;
    document.getElementById("satellite").onclick = satelliteLayer;
    document.getElementById("dark").onclick = darkLayer;

    // assign onclick for the type of points on radio buttons
    document.getElementById("defaults").onclick = function () {
        clearPoints();
        defaults_flag = 1;
        fetchPointFromDatabase("unchecked");
    };

    document.getElementById("prune").onclick = function () {
        chooseFun = 'prune';
        clearPoints();
        defaults_flag = 0;
        fetchPointFromDatabase("unchecked");
    };
    document.getElementById("cluster").onclick = function () {
        chooseFun = 'cluster';
        clearPoints();
        defaults_flag = 0;
        fetchPointFromDatabase("unchecked");
    };
    document.getElementById("heatmap").onclick = function () {
        chooseFun = 'heatmap';
        clearPoints();
        defaults_flag = 0;
        fetchPointFromDatabase("unchecked");
    };

    document.getElementById("classic").onclick = function () {
        chooseFun = 'classic';
        clearPoints();
        defaults_flag = 0;
        fetchPointFromDatabase("unchecked");
    };

    document.getElementById("cluster_id").onclick = function () {
        chooseFun = 'cluster_id';
        clearPoints();
        defaults_flag = 2;
        fetchPointFromDatabase("unchecked");
    };

    // assign onclick for the type of data on checkboxes
    document.getElementById("opencellid").onclick = function () {

        checkClusterIdVisible();

        if (this.checked) {

            option = 1;
            data_array.push("opencellid");
            fetchPointFromDatabase("opencellid");
        }
        else {
            clearPoints();
            cached_points = [];
            points = [];
            data_array.splice(data_array.indexOf('opencellid'), 1);
            fetchPointFromDatabase("unchecked");
        }
    };

    document.getElementById("mls").onclick = function () {

        checkClusterIdVisible();

        if (this.checked) {
            option = 2;
            data_array.push("mls");
            fetchPointFromDatabase("mls");
        }
        else {
            clearPoints();
            cached_points = [];
            points = [];
            data_array.splice(data_array.indexOf('mls'), 1);
            fetchPointFromDatabase("unchecked");
        }

    };

    document.getElementById("wigle").onclick = function () {

        checkClusterIdVisible();

        if (this.checked) {
            option = 3;
            data_array.push("wigle");
            fetchPointFromDatabase("wigle");
        }
        else {
            clearPoints();
            cached_points = [];
            points = [];
            data_array.splice(data_array.indexOf('wigle'), 1);
            fetchPointFromDatabase("unchecked");
        }

    };

    document.getElementById("measurements").onclick = function () {

        checkClusterIdVisible();

        if (this.checked) {

            option = 4;
            data_array.push("measurements");
            fetchPointFromDatabase("measurements");
        }
        else {
            clearPoints();
            cached_points = [];
            points = [];
            data_array.splice(data_array.indexOf('measurements'), 1);
            fetchPointFromDatabase("unchecked");
            clustering.style.visibility = "hidden";
        }

    };

    document.getElementById("cyprus_cell").onclick = function () {

        checkClusterIdVisible();

        if (this.checked) {
            option = 5;
            data_array.push("cyprus_cell");
            fetchPointFromDatabase("cyprus_cell");
        }
        else {
            clearPoints();
            cached_points = [];
            points = [];
            data_array.splice(data_array.indexOf('cyprus_cell'), 1);
            fetchPointFromDatabase("unchecked");
        }

    };

    document.getElementById("clear").onclick = function () {

        $("#opencellid").prop("checked", false);
        $("#measurements").prop("checked", false);
        $("#mls").prop("checked", false);
        $("#cyprus_cell").prop("checked", false);
        $("#wigle").prop("checked", false);

        option = 0;
        clearPoints();
        cached_points = [];
        points = [];
        data_array = [];

        let clustering = document.getElementById("clustering");
        clustering.style.visibility = "hidden";


    };

    mymap.on('click', onMapClick);

    mymap.on('moveend', changeTileData);

    mymap.on('zoomend', changeTileData);

    // take bounds
    maxlat = mymap.getBounds().getNorth().toString();
    minlat = mymap.getBounds().getSouth().toString();
    maxlon = mymap.getBounds().getEast().toString();
    minlon = mymap.getBounds().getWest().toString();

    // load some data for the very first load
    document.getElementById("opencellid").checked = true;
    document.getElementById("defaults").checked = true;
    option = 1;
    data_array.push("opencellid");
    fetchPointFromDatabase("opencellid");
}

