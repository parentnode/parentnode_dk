Util.Objects["contact"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
			// u.bug("scene.resized:", this);
		}

		scene.scrolled = function() {
			// u.bug("scrolled:", this);
		}

		scene.ready = function() {
			// u.bug("scene.ready:", this);

			page.cN.scene = this;


			var nodes = u.qsa("li.item", scene);
			if(nodes) {

				var i, node, image;
				for(i = 0; i < nodes.length; i++) {
					node = nodes[i];

					// INIT IMAGE
					image = u.qs("div.image", node);

					if(image) {

						// remove link from caption
						image.caption = u.qs("p a", image);
						if(image.caption) {
							image.caption.removeAttribute("href");
						}

						// get image variables
						image._id = u.cv(image, "item_id");
						image._format = u.cv(image, "format");
						image._variant = u.cv(image, "variant");

						// if image
						if(image._id && image._format) {

							// add image
							image._image_src = "/images/" + image._id + "/" + (image._variant ? image._variant+"/" : "") + "500x." + image._format;
							u.ass(image, {
								// "height": image.wrapper_height,
								"opacity": 0
							});

							image.loaded = function(queue) {

								u.ac(this, "loaded");

								this._image = u.ie(this, "img");
								this._image.image = this;
								this._image.src = queue[0].image.src;


								u.a.transition(this, "all 0.5s ease-in-out");
								u.ass(this, {
									//"height": (this._image.offsetHeight + this.wrapper_height) +"px",
									"opacity": 1
								});
							}
							u.preloader(image, [image._image_src]);
						}
					}
				}
			}

			u.showScene(this);

		}

		// scene is ready
		scene.ready();

	}
}
