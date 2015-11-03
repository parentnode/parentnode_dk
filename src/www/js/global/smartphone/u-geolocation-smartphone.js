u.geolocation = function(node) {

	node.geolocation.node = node;
//	u.bug("node.geolocation:" + node.geolocation)

	var dd_longitude = u.qs("dd.longitude", node.geolocation);
	var dd_latitude = u.qs("dd.latitude", node.geolocation);

	if(dd_longitude && dd_latitude) {
		node.geo_longitude = parseFloat(dd_longitude.innerHTML);
		node.geo_latitude = parseFloat(dd_latitude.innerHTML);

		node.showMap = function() {

			if(!this.geomap) {

				var injection_point = u.ns(this.geolocation);
				this.geomap = u.ae(this, "div", {"class":"geomap"});
				if(injection_point) {
					this.insertBefore(this.geomap, injection_point);
				}
				else {
					this.appendChild(this.geomap);
				}

				var maps_url = "https://maps.googleapis.com/maps/api/js" + (u.gapi_key ? "?key="+u.gapi_key : "");
				var html = '<html><head>';
				html += '<style type="text/css">body {margin: 0;}#map {height: 100%;}</style>';
				html += '<script type="text/javascript" src="'+maps_url+'"></script>';
				html += '<script type="text/javascript">';
				html += 'var map, marker;';
				html += 'var initialize = function() {';
				html += '	window._map_loaded = true;';
				html += '	var mapOptions = {center: new google.maps.LatLng('+this.geo_latitude+', '+this.geo_longitude+'),zoom: 12, scrollwheel: false, draggable: false};';
				html += '	map = new google.maps.Map(document.getElementById("map"),mapOptions);';
				html += '	marker = new google.maps.Marker({position: new google.maps.LatLng('+this.geo_latitude+', '+this.geo_longitude+'), draggable:true});';
				html += '	marker.setMap(map);';
				html += '};';
				html += 'google.maps.event.addDomListener(window, "load", initialize);';
				html += '</script>';
				html += '</head><body><div id="map"></div></body></html>';

				this.mapsiframe = u.ae(this.geomap, "iframe");
				this.mapsiframe.doc = this.mapsiframe.contentDocument? this.mapsiframe.contentDocument: this.mapsiframe.contentWindow.document;
				this.mapsiframe.doc.open();
				this.mapsiframe.doc.write(html);
				this.mapsiframe.doc.close();
			}
		}
		node.geolocation.clicked = function() {
			this.node.showMap();
		}
		u.ce(node.geolocation);

		u.ac(node.geolocation, "active");
	}

}