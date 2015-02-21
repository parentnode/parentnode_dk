// TODO: do not load images while scrolling is in process

// keep track of all hardlinks
// to be able to remove hardlink fragment



Util.Objects["articlelist"] = new function() {
	this.init = function(list) {

		// only set urls if browser supports popstate
		list.popstate = ("onpopstate" in window);

		// get all list items
		list.items = u.qsa(".item", list);

		// only continue if list has items
		if(list.items) {


			// let article node know about list to enable scroll correction and url handling
			var i, node;
			for(i = 0; node = list.items[i]; i++) {
				node.article_list = list;
			}


			// scroll handler
			// loads next/prev and initializes focused articles
			list.scrolled = function() {
				u.bug("list scrolled:" + u.scrollY());

				// reset article load-timer
				u.t.resetTimer(this.t_init);

				// get values for calculations
				this.scroll_y = u.scrollY();
				this.browser_h = u.browserH();
				this.screen_middle = this.browser_h/2;


				var i, node, node_y, list_y;
				list_y = u.absY(this);


				// auto extend list, when appropriate
				// load previous if list-top + browser-height is more than scrolloffset
				if(this._prev_url && list_y + this.browser_h > this.scroll_y) {
					this.loadPrev();
				}
				// load next if list-bottom is less than scrolloffset + 2 x browser-height
				else if(this._next_url && list_y + this.offsetHeight < this.scroll_y + (this.browser_h*2)) {
					this.loadNext();
				}

				// if article list is below screen middle and this is not a fresh page load
				// (on fresh page loads we want to maintain url)
				if(this.initial_scroll !== 0 && list_y > this.scroll_y + this.screen_middle) {

					// return to "root"-url if possible
					var root_link = this.getRootLink();
					if(root_link) {
						history.replaceState({}, root_link, root_link);

						// no current node, when returning to root url
						this.current_node = false;
					}
				}
				// adjust page url to current focused item
				else {

					// loop through all items
					for(i = 0; node = this.items[i]; i++) {

						// get position of node
						node_y = u.absY(node);

						// stop checking if node is below view (to avoid wasting resources)
						if(node_y > this.scroll_y + this.browser_h) {
							break;
						}

							// if node is in the middle of the screen, set url
						else if(node_y <= this.scroll_y + this.screen_middle && node_y + node.offsetHeight > this.scroll_y + this.screen_middle) {

							// remember current node
							this.current_node = node;

							// can only update url if data is available
							if(this.popstate && node._ready && node.hardlink) {
								history.replaceState({}, node.hardlink, node.hardlink);
							}
						}

					}

				}

				// only initialize new articles when scrolling stops with article in focus
				this.t_init = u.t.setTimer(this, this.initFocusedArticles, 500);
			}

			// initialize focues article
			list.initFocusedArticles = function() {
	//			u.bug("initFocusedArticles");

				var i, node, node_y;
				// loop through all items to find nodes within view
				for(i = 0; node = this.items[i]; i++) {

					// if node is not already loaded
					if(!node._ready) {

						// get y coordinate of item
						node_y = u.absY(node);

						// check first if node is below visible area
						// then we are past point of interest and don't need to waste resources
						if(node_y > this.scroll_y + this.browser_h) {
							break;
						}

						// if node is in visible area
						else if(
							// bottom of node is in view
							// if node-bottom is more than scroll position
							// and node-bottom is less than scroll position + browser height
							(
								node_y + node.offsetHeight > this.scroll_y && 
								node_y + node.offsetHeight < this.scroll_y + this.browser_h
							)
							 || 

							// top of node is in view
							// if node-top is more than scroll position
							// and node-top is less than scroll position + browser height
							(
								node_y > this.scroll_y &&
								node_y < this.scroll_y + this.browser_h
							)
							 ||

							// node is larger than view
							// if node-top is less than scroll position
							// and node-bottom is 
							(
								node_y < this.scroll_y &&
								node_y + node.offsetHeight > this.scroll_y + this.browser_h
							)
						) {
//							u.bug("init node:" + u.nodeId(node) + "::" + this.scroll_y + "," + node_y + "," + node.offsetHeight);
							u.o.article.init(node);
							node._ready = true;


							// repeat the scroll process to ensure url get set correctly
							this.scrolled();
						}
					}
				}
			}

			// keep track of all hardlinks to be able to know root
			list.all_hardlinks = [];
			// add hardlink to hardlink array
			list.addHardlink = function(hardlink) {
				if(this.all_hardlinks.indexOf(hardlink) == -1) {
					this.all_hardlinks.push(hardlink);
				}
			}
			// get root if it can be found in hardlinks array
			list.getRootLink = function() {
				if(this.all_hardlinks.indexOf(location.href) != -1) {
					// remove last fragment (should be sindex format)
					return location.href.replace(/\/[a-zA-Z0-9\-_]+$/, "");
				}
				return false;
			}

			// correct scroll postion after loading additional content
			// new_node is the inject node we need to compensate for
			// additional_offset is an optional compensation for margin etc.
			list.correctScroll = function(article_node, new_node, additional_offset) {
//				u.bug("correctScroll:" + (this.current_node ? u.qs("h2", this.current_node).innerHTML : "no current"))

				// only do anything if current_node is set
				if(this.current_node) {

					// optional additional offset
					additional_offset = additional_offset ? additional_offset : 0;

					// get postions for comparison
					var a_node_y = u.absY(article_node);
					var c_node_y = u.absY(this.current_node);

					// on compensate if article node is above current node
					if(a_node_y < c_node_y) {

						// if initial_scroll is 0, this is a fresh page load
						// adjust scrolling position to focus current node 
						if(this.initial_scroll === 0) {
							var current_scroll = u.absY(this) - 100;
							this.initial_scroll = false;
						}
						// use current scroll position in all other cases
						else {
							var current_scroll = u.scrollY();
						}

						// calculate the new scroll position
						var new_scroll_y = (current_scroll + (new_node.offsetHeight + additional_offset));
						window.scrollTo(0, new_scroll_y);
					}
				}
			}


			// look for next and previous links
			var next = u.qs(".pagination li.next a", list.parentNode);
			var prev = u.qs(".pagination li.previous a", list.parentNode);

			// do we have pagination links
			list._prev_url = prev ? prev.href : false;
			list._next_url = next ? next.href : false;

			// extend list with prev items
			list.loadPrev = function() {
				if(this._prev_url) {
	//				u.bug("load prev function")
				
					// receive previous items
					this.response = function(response) {

						// this.before_prev_load_scroll_y = u.scrollY();
						// this.before_prev_load_first_node = this.items[0];
						// this.before_prev_load_first_node.

						// insert result items
						var items = u.qsa(".item", response);
						var i, node;
						for(i = items.length; i; i--) {
							node = u.ie(this, items[i-1]);

							// let article node know about list to enable scroll correction
							node.article_list = this;

//							u.bug("should compensate:" + node.offsetHeight)


							this.correctScroll(node, node);
							// correct scroll offset because these items injected above current position
	//						window.scrollTo(0, u.scrollY()+node.offsetHeight);
						}

						// are more items available with the new load
						var prev = u.qs(".pagination li.previous a", response);
						this._prev_url = prev ? prev.href : false;

						// update the article list item scope
						this.items = u.qsa(".item", this);
					}
					u.request(this, this._prev_url);

					// do not attempt to load more while waiting for response
					this._prev_url = false;
				}
		
			}

			// extend list with next items
			list.loadNext = function() {
				if(this._next_url) {
	//				u.bug("load next function")

					// receive previous items
					this.response = function(response) {

						// append result items
						var items = u.qsa(".item", response);
						var i, node;
						for(i = 0; i < items.length; i++) {
							node = u.ae(this, items[i]);

							// let article node know about list to enable scroll correction
							node.article_list = this;
						}

						// are more items available with the new load
						var next = u.qs(".pagination li.next a", response);
						this._next_url = next ? next.href : false;

						// update the article list item scope
						this.items = u.qsa(".item", this);
					}
					u.request(this, this._next_url);

					// do not attempt to load more while waiting for response
					this._next_url = false;
				}
			}



			// DETECT INITIAL STATE (for dynamic load/scroll compensation)

			// if initial scroll exists this indicates a page refresh
			list.initial_scroll = u.scrollY();

//			u.bug("list.initial_scroll:" + list.initial_scroll)

			// find hardlinks to check for specific load
			list.current_node = false;
			var hardlink = u.qs("dd.hardlink a", list.items[0]);
			if(hardlink) {
				if(location.href == hardlink.href) {
					list.current_node = list.items[0];

//					u.bug("list.current_node:" + u.qs("h2", list.current_node).innerHTML )
				}
			}


			// adjust initial scrolling if we know current node
			// if no previous url exists or we inherited a scroll offset due to a page refresh with scroll offset
			// we need to compensate for this
			//
			// (if previous url exists it will be loaded automatically 
			// which will cause the scroll-offset to be updated automatically)
			if(list.current_node && (!list._prev_url || list.initial_scroll)) {

//				u.bug("one of those:" + u.absY(list.current_node))
				window.scrollTo(0, u.absY(list.current_node)-100);

				// correct initial scroll value to match
				list.initial_scroll = false;
			}


			// initial load prev/next check
			list.scrolled();


			// set specific scroll handler for list
			u.e.addWindowScrollEvent(list, list.scrolled);

		}
	}
}


Util.Objects["article"] = new function() {
	this.init = function(article) {
//		u.bug("article init:" + u.nodeId(article) + "," + u.qs("h2", article).innerHTML)

		// look for a hardlink for this article
		var hardlink = u.qs("dd.hardlink a", article);
		article.hardlink = hardlink ? hardlink.href : false;

		if(article.article_list) {
			article.article_list.addHardlink(article.hardlink);
		}
//		u.bug("article.hardlink:" + article.hardlink)

		// INIT IMAGES
		var i, image;
		article._images = u.qsa("div.image,div.media", article);
		for(i = 0; image = article._images[i]; i++) {

			image.node = article;

			image._id = u.cv(image, "item_id");
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
					this._image.image = this;
					this._image.src = queue[0].image.src;

					if(this.node.article_list) {
						this.node.article_list.correctScroll(this.node, this, -10);
					}


					// apply full-width option
					u.ce(this._image);
					this._image.clicked = function() {
						// go back to normal size
						if(u.hc(this.image, "fullsize")) {

							u.a.transition(this, "all 0.3s ease-in-out");
							u.rc(this.image, "fullsize");
							this.src = this.image._image_src;
						}
						// switch to fullsize
						else {
							// full size image, might exceed autoconversion limit
							// test server response

							u.a.transition(this, "all 0.3s ease-in-out");
							u.ac(this.image, "fullsize");

							// fullsize already defined and tested
							if(this._fullsize_src) {
								this.src = this._fullsize_src;
							}
							else {
								this._fullsize_width = 1300;
								this._fullsize_src = "/images/" + this.image._id + "/" + (this.image._variant ? this.image._variant+"/" : "") + this._fullsize_width + "x." + this.image._format;

								// valid response - set new src
								this.response = function() {
									this.src = this._fullsize_src;
								}
								// 404 - reduce size and try again
								this.responseError = function() {
									this._fullsize_width = this._fullsize_width-200;
									this._fullsize_src = "/images/" + this._id + "/" + (this.image._variant ? this.image._variant+"/" : "") + this._fullsize_width + "x." + this.image._format;
									u.request(this, this._fullsize_src);
								}
								u.request(this, this._fullsize_src);
							}
						}
					}

					u.a.transition(this, "all 0.5s ease-in-out");
					u.a.setOpacity(this, 1);
				}
				u.preloader(image, [image._image_src]);
			}
		}


		// INIT GEOLOCATION MAP
		article.geolocation = u.qs("dl.geo", article);
		if(article.geolocation && !u.browser("IE", "<=9")) {
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
						html += '<style type="text/css">body {margin: 0;}#map {height: 200px; height: 200px;}</style>';
//						html += '<style type="text/css">body {margin: 0;}#map {height: 100%;}</style>';
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

			if(article.article_list) {
				article.article_list.correctScroll(article, article.sharing);
			}

			article.h3_share = u.ae(article.sharing, "h3", {"html":"Share"})
			article.p_share = u.ae(article.sharing, "p", {"html":article.hardlink})
			u.e.click(article.p_share);
			article.p_share.clicked = function() {
				u.selectText(this);
			}

			// create base svg (base sharing icon)
			article.sharing.svg = u.svg({
				"node":article.sharing,
				"class":"sharing",
				"width":500,
				"height":300,
				"shapes":[
					{
						"type": "line",
						"class": "primary",
						"x1": 6,
						"y1": 150,
						"x2": 22,
						"y2": 150
					},
					{
						"type": "circle",
						"class": "primary",
						"cx": 6,
						"cy": 150,
						"r": 5
					},
					{
						"type": "circle",
						"class": "primary",
						"cx": 22,
						"cy": 150,
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

				x2 = x2 ? x2 : (x1 + u.random(30, 50));

				if(!y2) {
					if(y1 < 150) {
						y2 = y1 + u.random(-50, 30);
					}
					else {
						y2 = y1 + u.random(-30, 50);
					}
				}

//					u.bug("x2:" + x2 + " , y2:" + y2)

				if(x2 < 490 && y2 > 10 && y2 < 290 && (x2 < 70 || x2 > 450 || (y2 < 130 && y1 < 130) || (y2 > 170 && y1 > 170))) {
					
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
				"y": 130,
				"width": 40,
				"height": 40,
				"fill": "transparent"
			});

			article.sharing.button._x1 = 22;
			article.sharing.button._y1 = 150;
			article.sharing.button.sharing = article.sharing;
			article.sharing.button.over = function() {

				u.t.resetTimer(this.t_hide);

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
	}
}
