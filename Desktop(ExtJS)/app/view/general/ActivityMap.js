/**
 * A wrapper around a Google map. Use centerMap(latitude, longitude) to center
 * the map at the specified location.
 */
Ext.define('Pacemaker.view.general.ActivityMap', {
    extend: 'Ext.Component',
    xtype: 'activitymap',
    config: {
        store: null
    },

    padding: 8,
    margin: 10,
    layout: 'fit',

    latitude: 52.245915,
    longitude: -7.139788,

    applyStore: function(store) {
        if (Ext.isString(store)) {
            store = Ext.getStore(store);
        }
        return store;
    },

    updateStore: function(store) {
        if (store) {
            var me = this;
            this.getStore().on('datachanged', function(store) {
                me.setMarkers(store);
            }, me);
        }
    },

    renderMap: function() {
        var me = this;

        var cfg = {
            zoom: 15,
            center: new google.maps.LatLng(me.latitude, me.longitude),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDoubleClickZoom: true,
            draggableCursor: "crosshair"
        };
        me.map = new google.maps.Map(me.getEl().dom, cfg);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                me.map.setCenter(initialLocation);
            });
        }

        var service = new google.maps.DirectionsService();
        me.path = new google.maps.MVCArray();
        me.poly = new google.maps.Polyline({
            map: me.map,
            path: me.path,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        google.maps.event.addListener(me.map, "click", function(evt) {
            if (me.path.getLength() === 0) {
                me.path.push(evt.latLng);
                me.poly.setPath(me.path);
            } else {
                service.route({
                    origin: me.path.getAt(me.path.getLength() - 1),
                    destination: evt.latLng,
                    travelMode: google.maps.DirectionsTravelMode.WALKING
                }, function(result, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
                            me.path.push(result.routes[0].overview_path[i]);
                        }
                        me.fireEvent('pathPointAdded', me, evt.latLng);
                    }
                });
            }
        });

        //Additional methods for calculating route distance
        google.maps.LatLng.prototype.kmTo = function(a){
            var e = Math, ra = e.PI/180;
            var b = this.lat() * ra, c = a.lat() * ra, d = b - c;
            var g = this.lng() * ra - a.lng() * ra;
            var f = 2 * e.asin(e.sqrt(e.pow(e.sin(d/2), 2) + e.cos(b) * e.cos(c) * e.pow(e.sin(g/2), 2)));
            return f * 6378.137;
        };

        google.maps.Polyline.prototype.inKm = function(n){
            var a = this.getPath(n), len = a.getLength(), dist = 0;
            for(var i=0; i<len-1; i++){
              dist += a.getAt(i).kmTo(a.getAt(i+1));
            }
            return dist;
        };

    },

    centerMap: function(latitude, longitude) {
        // Save the latitude/longitude
        this.latitude = latitude;
        this.longitude = longitude;

        this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));
    },

    getPath: function() {
        return this.path;
    },

    setPath: function(pathPoints) {
        var newPath = new google.maps.MVCArray(),
            me = this;
        if(pathPoints){
            var first = true;
            // For each path point, push a new latLng onto the path array
            pathPoints.each(function(r) {
                if(first) me.centerMap(r.latitude, r.longitude);
                first = false;
                newPath.push(new google.maps.LatLng(r.latitude, r.longitude));
            });
        }
        this.path = newPath;
        this.poly.setPath(newPath);
    }
});