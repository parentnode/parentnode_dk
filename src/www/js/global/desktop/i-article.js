
// Stardard article enabling
Util.Objects["article"] = new function() {
	this.init = function(article) {
		u.bug("article init:" + u.nodeId(article) + "," + u.qs("h1,h2,h3", article).innerHTML)



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
				image._image_src = "/images/" + image._id + "/" + (image._variant ? image._variant+"/" : "") + "540x." + image._format;
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
		if(article.geolocation && typeof(u.injectGeolocation) == "function") {

			u.injectGeolocation(article);

		}


		// INIT SHARING
		var hardlink = u.qs("dd.hardlink", article);
		article.hardlink = hardlink ? hardlink.innerHTML : false;
		if(article.hardlink && typeof(u.injectSharing) == "function") {

			// Correct scroll offset - callback
			article.shareInjected = function() {
				this.article_list.correctScroll(this, this.sharing);
			}
			u.injectSharing(article);

		}
	}
}
