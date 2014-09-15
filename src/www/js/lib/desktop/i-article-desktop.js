Util.Objects["articlelist"] = new function() {
	this.init = function(list) {

		list.popstate = ("onpopstate" in window);

		list.items = u.qsa(".item", list);

		list.scrolled = function() {

			var scroll_y = u.scrollY()
			var browser_h = u.browserH();
			var screen_middle = browser_h/2;

			var i, node, node_y, list_y;
			list_y = u.absY(this);
			// auto extend list
			if(this._prev && list_y + browser_h > scroll_y) {
				this.loadPrev();
			}
			else if(this._next && list_y + this.offsetHeight < scroll_y + (browser_h*2)) {
				this.loadNext();
			}


			for(i = 0; node = this.items[i]; i++) {

				node_y = u.absY(node);

//				u.bug("build Node:" + (abs_y - 200) + "<" + (scroll_y+browser_h) + " && " + (abs_y + 200) + ">" +  scroll_y);

				// auto load nodes
				if(!node._ready && node_y - 200 < scroll_y+browser_h && node_y + 200 > scroll_y) {
//					u.bug("init node:" + u.nodeId(node));
					u.o.article.init(node);
					node._ready = true;
				}
				
				if(this.popstate && node._ready && node.hardlink) {
					if(node_y <= scroll_y + screen_middle && node_y + node.offsetHeight > scroll_y + screen_middle) {
						history.replaceState({}, node.hardlink, node.hardlink);
//						u.bug("current url: " + node.hardlink)
					}
					
				}

			}
		}
		u.e.addWindowScrollEvent(list, list.scrolled);

		var next_link = u.qs(".pagination li.next a", list.parentNode);
		var prev_link = u.qs(".pagination li.previous a", list.parentNode);

		
		// dummy - should be references to pagination html
		list._prev = prev_link ? prev_link.href : false;
		list._next = next_link ? next_link.href : false;

		// extend list with prev items
		list.loadPrev = function() {
			if(this._prev) {
				u.bug("load prev function")
				
				// receive previous items
				this.response = function(response) {

					var items = u.qsa(".item", response);
					var i, node;
					for(i = items.length; i; i--) {
						node = u.ie(this, items[i-1]);
						u.bug("u.scrollY:" + u.scrollY())

						// correct scroll offset
						window.scrollTo(0, u.scrollY()+node.offsetHeight);
					}

					// more items available
					var prev_link = u.qs(".pagination li.previous a", response);
					this._prev = prev_link ? prev_link.href : false;

					this.items = u.qsa(".item", this);

				}
				u.request(this, this._prev);
				// do not attempt to load more while waiting for response
				this._prev = false;
			}
		
		}
		// extend list with next items
		list.loadNext = function() {
//			u.bug("load next function")
		
			if(this._next) {

				// receive previous items
				this.response = function(response) {

					var items = u.qsa(".item", response);
					var i;
					for(i = 0; i < items.length; i++) {
						u.ae(this, items[i]);
					}

					// more items available
					var next_link = u.qs(".pagination li.next a", response);
					this._next = next_link ? next_link.href : false;

					this.items = u.qsa(".item", this);
				}
				u.request(this, this._next);
				// do not attempt to load more while waiting for response
				this._next = false;
			}
		}

		// set initial scrolling
		if(list._prev) {

			list.content_y = u.absY(u.qs("h1"));
			list.start_y = u.absY(list.items[0]);
			window.scrollTo(0, list.start_y-list.content_y);
		}
		else if(u.scrollY()) {
			window.scrollTo(0, 0);
		}
		
		

		// initial load check
		list.scrolled();
	}


}

Util.Objects["article"] = new function() {
	this.init = function(article) {
//		u.bug("article init:" + u.nodeId(article))

		// look for a hardlink for this article
		var hardlink = u.qs("dd.hardlink a", article);
		article.hardlink = hardlink ? hardlink.href : false;

//		u.bug("article.hardlink:" + article.hardlink)

		// INIT IMAGES
		var i, image;
		article._images = u.qsa("div.image", article);
		for(i = 0; image = article._images[i]; i++) {

			image._id = u.cv(image, "image_id");
			image._format = u.cv(image, "format");
			image._variant = u.cv(image, "variant");

			// if image
			if(image._id && image._format) {

				// add image
				image._image_src = "/images/" + image._id + "/" + (image._variant ? image._variant+"/" : "") + image.offsetWidth + "x." + image._format;
				image._image = u.ie(image, "img");
				u.a.setOpacity(image, 0);
				image.loaded = function(queue) {

					// if image is off the top of the screen, correct scrolling to match new photo
					if(u.absY(this) < u.scrollY()) {
						window.scrollTo(0, u.scrollY()+queue[0].image.height)
					}

					this._image.src = queue[0].image.src;

					u.a.transition(this, "all 0.5s ease-in-out");
					u.a.setOpacity(this, 1);
				}
				u.preloader(image, [image._image_src]);
				// apply full-width option
				u.ce(image);
				image.clicked = function() {
					// go back to normal size
					if(u.hc(this, "fullsize")) {
						u.rc(this, "fullsize");
						this._image.src = this._image_src;
					}
					// switch to fullsize
					else {
						// full size image, might exceed autoconversion limit
						// test server response

						u.ac(this, "fullsize");

						// fullsize already defined and tested
						if(this._fullsize_src) {
							this._image.src = this._fullsize_src;
						}
						else {
							this._fullsize_width = 1300;
							this._fullsize_src = "/images/" + this._id + "/" + (this._variant ? this._variant+"/" : "") + this._fullsize_width + "x." + this._format;

							// valid response - set new src
							this.response = function() {
								this._image.src = this._fullsize_src;
							}
							// 404 - reduce size and try again
							this.responseError = function() {
								this._fullsize_width = this._fullsize_width-200;
								this._fullsize_src = "/images/" + this._id + "/" + (this._variant ? this._variant+"/" : "") + this._fullsize_width + "x." + this._format;
								u.request(this, this._fullsize_src);
							}
							u.request(this, this._fullsize_src);
						}
					}
				}

			}
		}


		// INIT GEOLOCATION MAP
		article.geolocation = u.qs("dl.geo", article);
		if(article.geolocation) {
			article.geolocation.article = article;
			u.bug("article.geolocation:" + article.geolocation)

			var dd_longitude = u.qs("dd.longitude", article.geolocation);
			var dd_latitude = u.qs("dd.latitude", article.geolocation);

			if(dd_longitude && dd_latitude) {
				article.geo_longitude = parseFloat(dd_longitude.innerHTML);
				article.geo_latitude = parseFloat(dd_latitude.innerHTML);

				article.showMap = function() {

					if(!this.geomap) {
						
						this.geomap = u.ae(this, "div", {"class":"geomap"});
						this.insertBefore(this.geomap, u.qs("dl.info", this));

						var maps_url = "https://maps.googleapis.com/maps/api/js" + (u.gapi_key ? "?key="+u.gapi_key : "");
						var html = '<html><head>';
						html += '<style type="text/css">body {margin: 0;}#map {height: 100%;}</style>';
						html += '<script type="text/javascript" src="'+maps_url+'"></script>';
						html += '<script type="text/javascript">';
						html += 'var map, marker;';
						html += 'var initialize = function() {';
						html += '	window._map_loaded = true;';
						html += '	var mapOptions = {center: new google.maps.LatLng('+this.geo_latitude+', '+this.geo_longitude+'),zoom: 12};';
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
				article.geolocation.clicked = function() {
					this.article.showMap();
				}
				u.ce(article.geolocation);

				u.ac(article.geolocation, "active");
			}

		}

	}
}
