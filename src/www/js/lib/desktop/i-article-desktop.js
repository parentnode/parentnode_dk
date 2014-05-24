Util.Objects["article"] = new function() {
	this.init = function(article) {
		u.bug("article init:" + u.nodeId(article))
		


		article._images = u.qsa("div.image", article);

		var i, image;
		for(i = 0; image = article._images[i]; i++) {

			image._id = u.cv(image, "image_id");
			image._format = u.cv(image, "format");
			image._variant = u.cv(image, "variant");

			// if image
			if(image._id && image._format) {

				// add image
				image._image_src = "/images/" + image._id + "/" + (image._variant ? image._variant+"/" : "") + image.offsetWidth + "x." + image._format;
				image._image = u.ie(image, "img", {"src":image._image_src});

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

	}
}
