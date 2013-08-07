Util.Objects["productview"] = new function() {
	this.init = function(scene) {

		scene.cN = u.qs("#content");
		scene.cN.scene = scene;

		scene.ready = function() {
//			u.bug("scene ready:" + u.nodeId(this));

			if(this.cN.offsetHeight < this.offsetHeight) {
//			if(u.qsa("li.product", this).length == u.qsa("li.product.ready", this).length) {

//				u.bug("cN.oH:" + this.cN.offsetHeight + ", cN.oH-oH:" + (this.cN.offsetHeight - this.offsetHeight) + ", oH:" + this.offsetHeight + ":gcs:" + u.gcs(this, "height"));
//				u.a.setHeight(this, this.offsetHeight);
				// set drag on scene
				u.e.drag(this, [0, this.cN.offsetHeight - this.offsetHeight, this.offsetWidth, this.offsetHeight], {"show_bounds":false, "strict":false, "elastica":200});

				this.picked = function(event) {}
				this.moved = function(event) {
					if(this.current_yps < 0 && !u.hc(document.body, "standalone") && !u.qs(".desktop_wrapper")) {
						window.scrollTo(0, 0);
					}
				}
				this.dropped = function(event) {}


				u.ac(this.cN, "ready");
				this.cN.ready();


			}

		}
		scene.entered = function() {
//			u.bug("entered")

			if(this.sequencePlayer) {
				this.sequencePlayer.loaded = function() {
					u.rc(this, "loading");
				}

				this.sequencePlayer.ended = function() {
//					u.bug("ended")
					this.play();
				}
				u.ac(this.sequencePlayer, "loading");
				this.sequencePlayer.loadAndPlay(this.load_list, {"framerate":12});

				var carousel = u.ae(this.sequencePlayer, "div", {"class":"carousel"});
				carousel.sP = this.sequencePlayer;
				u.e.click(carousel);
				carousel.inputStarted = function(event) {
					this.sP.pause();
				}
				carousel.clicked = function(event) {
//					u.bug("clicked")
					this.sP.resume();
				}
				carousel.picked = function(event) {
//					u.bug("picked:" + this.sP._current_frame)
					this._is_dragging = 1;
				}
				carousel.moved = function(event) {
	//				u.bug("this._is_dragging:" + this._is_dragging);
					if(this._is_dragging) {
	//					u.bug(this.current_x +"-"+ this._is_dragging)

						if(this.current_x - this._is_dragging > 15) {

							this.sP.prev(true);
							this._is_dragging = this.current_x;
						}
						if(this.current_x - this._is_dragging < -15) {

							this.sP.next(true);
							this._is_dragging = this.current_x;
						}
					}

//					u.bug("moved:" + this.sP._current_frame);
				}
				carousel.dropped = function(event) {
					this._is_dragging = false;
					this.sP.resume();
				}

				u.e.swipe(carousel, carousel, {"horizontal_lock":true});
			}

		}
		

		scene.resized = function() {
//			u.bug("scene resized:" + u.nodeId(this));
		}

		scene.cleanup = function() {
//			u.bug("scene cleanup:" + u.nodeId(this));
		}

		scene.navigate = function() {
//			u.bug("scene navigate:" + u.nodeId(this));
		}


		var product = u.qs("div.product", scene);
		product.scene = scene;

		// correction order of elements
		var offer = u.qs(".offer", product);
		u.ie(product, offer);

		var h1 = u.qs("h1", product);
		u.ie(product, h1);

		var images = u.qs("div.images", product);
		u.ie(product, images);



		var form = u.qs("form", product);
		form.onsubmit = function() {return false;};

		product.bn_buy = u.qs(".actions li.buy", product);
		product.bn_buy.page = scene.cN.page;
		product.bn_buy.clicked = function(event) {
			u.e.kill(event);
			this.page.hN.addToCart();
		}
		u.ce(product.bn_buy);


		// click map button
		product.bn_map = u.qs(".map", product);
		product.bn_map.page = scene.cN.page;
		product.bn_map.clicked = function(event) {
			u.e.kill(event);

			alert("Thank you for viewing our demo.")
		}
		u.ce(product.bn_map);


		// callback for loding first image to set height
		images.scene = scene;
		images.loaded = function(queue) {
//			u.bug("load image:" + queue[0]._image.src)
			u.a.setHeight(this, queue[0]._image.height);

			// ready
			this.scene.ready();
		}

		// adding gallery if thumbs are available
		var gallery_index = u.qs("ul.thumbnails", images);
		if(gallery_index) {
			var i, node;

			// set navigation to back link
			scene.cN.page.hN.changeToBack();

			scene.gallery = u.o.gallery.init(gallery_index)
			scene.gallery.ready = function() {
				// show selected node (selectNode calls back to ready)
				// no value in hash? start at beginning
				if(u.h.getCleanUrl(location.href, 2) == u.h.getCleanUrl(location.href, 3)) {
					this.selectNode(0);
				}
				// use hash value
				else {
					var index = u.h.getCleanUrl(location.href).split("/")[3];
					this.selectNode(index);
				}
			}


			u.preloader(images, ["/images/"+u.cv(u.qs("li", images), "id")+"/"+images.offsetWidth+"x.jpg"]);
		}

		// or adding 3D view, if sequence is available
		var sequence_index = u.qs("ul.sequence", images);
		if(sequence_index) {
//			u.bug("add sequence")
			scene.sequencePlayer = u.sequencePlayer(images, {"framerate":24});

			// set navigation to back link
			scene.cN.page.hN.changeToNav();

			scene.load_list = [];
			var sqs = u.qsa("li", sequence_index);
			var sq, i;
			for(i = 0; sq = sqs[i]; i++) {
				scene.load_list.push("/images/" + u.cv(sq, "id") + "/" + images.offsetWidth + "x.png");
			}

			// Load sequence image to get height of sequence
			u.preloader(images, ["/images/"+u.cv(u.qs("li", images), "id")+"/"+images.offsetWidth+"x.png"]);
		}

	}
}