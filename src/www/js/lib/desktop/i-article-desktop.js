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

//				u.bug("build Node:" + (node_y - 200) + "<" + (scroll_y+browser_h) + " && " + (node_y + 200) + ">" +  scroll_y);

				// auto load nodes
				if(!node._ready && (
					(
						node_y + node.offsetHeight > scroll_y && 
						node_y + node.offsetHeight < scroll_y+browser_h
					)
					 || 
					(
						node_y > scroll_y &&
						node_y < scroll_y+browser_h
					)
					 ||
					(
						node_y < scroll_y &&
						node_y + node.offsetHeight > scroll_y+browser_h
					)
				)) {
//					u.bug("init node:" + u.nodeId(node) + "::" + scroll_y + "," + node_y + "," + node.offsetHeight);
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
//				u.bug("load prev function")
				
				// receive previous items
				this.response = function(response) {

					var items = u.qsa(".item", response);
					var i, node;
					for(i = items.length; i; i--) {
						node = u.ie(this, items[i-1]);
//						u.bug("u.scrollY:" + u.scrollY())

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
				u.a.setOpacity(image, 0);
				image.loaded = function(queue) {

					u.ac(this, "loaded");

					this._image = u.ie(this, "img");
					this._image.src = queue[0].image.src;

//					u.bug("image loaded:" + queue[0].image.src)
					// if image is off the top of the screen, correct scrolling to match new photo
					if(u.absY(this) < u.scrollY() + (u.browserH()/2)) {
//						u.bug("image compensated:" + this.offsetHeight)
						window.scrollTo(0, u.scrollY()+this.offsetHeight)
					}


					u.a.transition(this, "all 0.5s ease-in-out");
					u.a.setOpacity(this, 1);
				}
				u.preloader(image, [image._image_src]);
				// apply full-width option
				u.ce(image);
				image.clicked = function() {
					// go back to normal size
					if(u.hc(this, "fullsize")) {

						u.a.transition(this._image, "all 0.3s ease-in-out");
						u.rc(this, "fullsize");
						this._image.src = this._image_src;
					}
					// switch to fullsize
					else {
						// full size image, might exceed autoconversion limit
						// test server response

						u.a.transition(this._image, "all 0.3s ease-in-out");
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
//			u.bug("article.geolocation:" + article.geolocation)

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


		// INIT SHARING
		if(article.hardlink) {

			// sharing wrapper
			article.sharing = u.ae(article, "div", {"class":"sharing"});

			if(u.absY(article.sharing) < u.scrollY()) {
				window.scrollTo(0, u.scrollY()+article.sharing.offsetHeight)
			}

			article.h3_share = u.ae(article.sharing, "h3", {"html":"Share"})
			article.p_share = u.ae(article.sharing, "p", {"html":article.hardlink})
			u.e.click(article.p_share);
			article.p_share.clicked = function() {
				u.selectText(this);
				// sel = window.getSelection();
				// range = document.createRange();
				// range.selectNodeContents(this);
				// sel.removeAllRanges();
				// sel.addRange(range);
			
				// range = document.body.createTextRange();
				// range.moveToElementText(this);
				// range.select();
			}

			// create base svg (base sharing icon)
			article.sharing.svg = u.svg({
				"node":article.sharing,
				"class":"sharing",
				"width":500,
				"height":200,
				"shapes":[
					{
						"type": "line",
						"class": "primary",
						"x1": 6,
						"y1": 100,
						"x2": 22,
						"y2": 100
					},
					{
						"type": "circle",
						"class": "primary",
						"cx": 6,
						"cy": 100,
						"r": 5
					},
					{
						"type": "circle",
						"class": "primary",
						"cx": 22,
						"cy": 100,
						"r": 3
					}
					// ,
					// {
					// 	"type": "rect",
					// 	"class": "primary",
					// 	"x": 70,
					// 	"y": 90,
					// 	"width": 300,
					// 	"height": 20
					// }
				]
			});


			// create counter for svg drawings, to limit number of possible drawings
			article.sharing.svg.drawings = 0;


			article.sharing.drawCircle = function(svg, cx, cy) {

				var circle = u.svgShape(svg, {
					"type": "circle",
					"cx": cx,
					"cy": cy,
					"r":  1,
				});
				circle.svg = svg;

				var new_radius = u.random(2, 5);
				circle.transitioned = svg._circle_transitioned;
				u.a.to(circle, "all linear 100ms", {"r":new_radius});
				
				return circle;
			}
			article.sharing.drawLine = function(svg, x1, y1, x2, y2) {
//				u.bug("scene.drawLine:" + x1 + ", " + y1);

				x2 = x2 ? x2 : (x1 + u.random(40, 60));

				if(!y2) {
					if(y1 < 100) {
						y2 = y1 + u.random(-60, 40);
					}
					else {
						y2 = y1 + u.random(-40, 60);
					}
				}

//					u.bug("x2:" + x2 + " , y2:" + y2)

				if(x2 < 490 && y2 > 10 && y2 < 190 && (x2 < 70 || x2 > 450 || (y2 < 80 && y1 < 80) || (y2 > 120 && y1 > 120))) {
					
					var line = u.svgShape(svg, {
						"type": "line",
						"x1": x1,
						"y1": y1,
						"x2": x1,
						"y2": y1
					});

					u.ie(svg, line);
					line.svg = svg;

//					u.bug("x2:" + x2 + " , y2:" + y2)

					line.transitioned = svg._line_transitioned;
					u.a.to(line, "all linear 150ms", {"x2": x2, "y2": y2});

					return line;
					
				}
				return false;
			}


			article.sharing.svg._line_transitioned = function() {
//				u.bug("line done:" + u.nodeId(this));

				this.transitioned = null;

				if(!this.svg.hide) {
					var key = u.randomString(4);
	//				u.bug("do circle:" + key)
					var cx = Number(this.getAttribute("x2"));
					var cy = Number(this.getAttribute("y2"));
					var circle = this.svg.node.drawCircle(this.svg, cx, cy);
					circle.id = key;
				}
			}
			article.sharing.svg._circle_transitioned = function() {
//				u.bug("circle done:" + u.nodeId(this));

//				u.bug("this.svg.drawings:" + this.svg.drawings)
				this.transitioned = null;

				if(!this.svg.hide) {

					this.svg.drawings++;
					if(this.svg.drawings < 50) {

						var x1 = Number(this.getAttribute("cx"));
						var y1 = Number(this.getAttribute("cy"));
						var r = Number(this.getAttribute("r"));
	//					u.bug("x1:" + x1 + " , y1:" + y1)


						var line, i;

	//					var key = u.randomString(4);
	//					u.bug("do line:" + u.randomString(4));

						if(r >= 5 && this.svg.drawings < 6) {

							line = this.svg.node.drawLine(this.svg, x1, y1, x1 + u.random(30, 60), y1 + u.random(-40, -60));
							line = this.svg.node.drawLine(this.svg, x1, y1, x1 + u.random(50, 60), y1 + u.random(-20, 20));
							line = this.svg.node.drawLine(this.svg, x1, y1, x1 + u.random(30, 60), y1 + u.random(40, 60));

						}
						else if(r >= 4) {

							line = this.svg.node.drawLine(this.svg, x1, y1, x1 + u.random(20, 70), y1 + u.random(-15, -40));
							line = this.svg.node.drawLine(this.svg, x1, y1, x1 + u.random(20, 70), y1 + u.random(15, 40));
						
						}
						else if(r >= 3 || this.svg.drawings%2 == 1) {


							line = this.svg.node.drawLine(this.svg, x1, y1, x1 + u.random(30, 60), y1 + u.random(-40, 40));
//							line = this.svg.node.drawLine(this.svg, x1, y1, x1 + u.random(30, 60), y1 + u.random(15, 40));

						}
						else {}
					}
				}
			}


			// create rect for mouseover
			article.sharing.button = u.svgShape(article.sharing.svg, {
				"type": "rect",
				"class": "share",
				"x": 0,
				"y": 80,
				"width": 40,
				"height": 40,
				"fill": "transparent"
			});

			article.sharing.button._x1 = 22;
			article.sharing.button._y1 = 100;
			article.sharing.button.sharing = article.sharing;
			article.sharing.button.over = function() {

				u.ac(this.sharing, "hover");

//				u.bug("base line:");
				this.sharing.drawLine(article.sharing.svg, this._x1, this._y1, u.random(this._x1, 70), this._y1 + u.random(-55, -40));
				this.sharing.drawLine(article.sharing.svg, this._x1, this._y1, u.random(70, 120), this._y1 + u.random(-20, -15));

				this.sharing.drawLine(article.sharing.svg, this._x1, this._y1, u.random(70, 120), this._y1 + u.random(15, 20));
				this.sharing.drawLine(article.sharing.svg, this._x1, this._y1, u.random(this._x1, 70), this._y1 + u.random(40, 55));

				// this.transitioned = svg_drawing._line_transitioned;
				// u.a.to(this, "all linear 50ms", {"x2":x2});
			}
			article.sharing.button.out = function() {
				var circles = u.qsa("circle:not(.primary)", this.sharing.svg);
				var lines = u.qsa("line:not(.primary)", this.sharing.svg);

				var line, circle, i;

				u.rc(this.sharing, "hover");

				this.sharing.svg.hide = true;
				this.sharing.svg.drawings = 0;

				for(i = 0; circle = circles[i]; i++) {
					circle.transitioned = function() {
						this.transitioned = null;
						this.svg.removeChild(this);
					}

					u.a.to(circle, "all linear 0.15s", {"r":0})
				}
				for(i = 0; line = lines[i]; i++) {

					x1 = Number(line.getAttribute("x1"));
					y1 = Number(line.getAttribute("y1"));
					x2 = Number(line.getAttribute("x2"));
					y2 = Number(line.getAttribute("y2"));

					new_x = x2 - ((x2-x1)/2);
					if(y1 < y2) {
						new_y = y2 - ((y2-y1)/2);
					}
					else {
						new_y = y1 - ((y1-y2)/2);
					}

//					u.bug(x1 + ", " + x2 + ":new_x:" + new_x + ", " + new_y);

					line.transitioned = function() {
						this.transitioned = null;
						this.svg.removeChild(this);
					}
					u.a.to(line, "all linear 0.25s", {"x1":new_x, "y1":new_y, "x2":new_x, "y2":new_y})

				}

				u.t.setTimer(this.sharing.svg, function() {this.hide = false;}, 250)

			}
			article.sharing.autohide = function() {
				u.t.resetTimer(this.button.t_hide);
				this.button.t_hide = u.t.setTimer(this.button, this.button.out, 500);
			}

			u.e.addEvent(article.sharing.button, "mouseover", article.sharing.button.over);
			u.e.addEvent(article.sharing, "mouseleave", article.sharing.autohide);

		}

		//
		// 	// Facebook
		// 	if(u.facebook_app_id) {
		// 		article.share_facebook = u.ae(article.sharing, "li", {"class":"facebook", "html":"Facebook"});
		// 		article.share_facebook.article = article;
		// 		u.ce(article.share_facebook);
		// 		article.share_facebook.clicked = function() {
		// 			var url = "https://www.facebook.com/dialog/feed?app_id="+u.facebook_app_id+"&display=popup";
		// 			url += "&link="+this.article.hardlink;
		// 			url += "&name="+encodeURIComponent(u.text(this.article.headline));
		// 			url += "&desc="+encodeURIComponent(u.text(u.qs(".description", this.article)).substring(0, 100));
		// 			url += "&redirect_uri="+this.article.hardlink;
		//
		// 			var image = u.qs("div.image img", this.article);
		// 			if(image) {
		// 				url += "&picture="+image.src;
		// 			}
		// 			window.open(url);
		// 		}
		// 	}
		//
		// 	// Twitter
		// 	article.share_twitter = u.ae(article.sharing, "li", {"class":"twitter", "html":"Twitter"});
		// 	article.share_twitter.article = article;
		// 	u.ce(article.share_twitter);
		// 	article.share_twitter.clicked = function() {
		// 		window.open("http://twitter.com/home?status=" + this.article.hardlink);
		// 	}
		//
		// 	// Email
		// 	article.share_email = u.ae(article.sharing, "li", {"class":"email", "html":"Email"});
		// 	article.share_email.article = article;
		// 	u.ce(article.share_email);
		// 	article.share_email.clicked = function() {
		// 		location.href = "mailto:?subject="+u.text(this.article.headline)+"&body=" + this.article.hardlink;
		// 	}
		//
		// }

	}
}
