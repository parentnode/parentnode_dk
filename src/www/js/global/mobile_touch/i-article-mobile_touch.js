

Util.Objects["article"] = new function() {
	this.init = function(article) {
//		u.bug("article init:" + u.nodeId(article))

		// INIT IMAGES
		var i, image;
		article._images = u.qsa("div.image,div.media", article);
		for(i = 0; image = article._images[i]; i++) {

			image._id = u.cv(image, "item_id");
			image._format = u.cv(image, "format");
			image._variant = u.cv(image, "variant");

			// remove link
			u.ce(image);
			u.rc(image, "link");

			// if image
			if(image._id && image._format) {

				// add image
				image._image_src = "/images/" + image._id + "/" + (image._variant ? image._variant+"/" : "") + "480x." + image._format;
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

			}
		}


		// INIT GEOLOCATION MAP
		article.geolocation = u.qs("dl.geo", article);
		if(article.geolocation && typeof(u.injectGeolocation) == "function") {

			u.injectGeolocation(article);

		}

	}
}
