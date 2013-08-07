Util.Objects["productlist"] = new function() {
	this.init = function(scene) {

		scene.cN = u.qs("#content");
		scene.cN.scene = scene;


		scene.ready = function() {
//			u.bug("scene ready:" + u.qsa("li.product", this).length);


			if(u.qsa("li.product", this).length == u.qsa("li.product.ready", this).length) {
//				u.bug("scene and list is ready");

//				u.bug("cN.oH:" + this.cN.offsetHeight + ", cN.oH-oH:" + (this.cN.offsetHeight - this.offsetHeight) + ", oH:" + this.offsetHeight + ":gcs:" + u.gcs(this, "height"));

				if(this.cN.offsetHeight < this.offsetHeight) {
					// set drag on scene
					u.e.drag(this, [0, this.cN.offsetHeight - this.offsetHeight, this.offsetWidth, this.offsetHeight], {"show_bounds":false, "strict":false, "elastica":200});

					this.picked = function(event) {}
					this.moved = function(event) {
						if(this.current_yps < 0 && !u.hc(document.body, "standalone") && !u.qs(".desktop_wrapper")) {
							window.scrollTo(0, 0);
						}
					}
					this.dropped = function(event) {}
				}

				u.ac(this.cN, "ready");
				this.cN.ready();
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


		var i, product;
		var products = u.qsa("li.product", scene);
		if(products.length) {

			for(i = 0; product = products[i]; i++) {
//				u.bug("product:" + u.qs("h2", product).innerHTML)
				product.scene = scene;

				// manipulate dom
				var h2 = u.qs("h2", product);
				var desc = u.qs("div.description", product);
				var box = u.ie(product, "div", {"class":"box"});
				u.ae(box, h2);
				u.ae(box, desc);

				u.ce(product);
				product.clicked = function(event) {
					this.scene.transition_method = this.scene.cN.transitions.animateLeft;
					this.scene.cN.page.navigate(this.url, this.scene)
				}
				product.moved = function(event) {
					u.e.resetEvents(this);
				}

				product.loaded = function(queue) {
//					u.bug(u.nodeId(this, 1))
					u.as(this, "backgroundImage", "url("+queue[0]._image.src+")");
					u.as(this, "paddingTop", queue[0]._image.height+"px");
					u.ac(this, "ready");
				
//					u.bug("product height:" + this.offsetHeight + ", scene.h:" + this.scene.offsetHeight + ", gcs:" + u.gcs(this, "height"))
					this.scene.ready();
				}
				u.preloader(product, ["/images/"+u.cv(product, "id")+"/"+product.scene.cN.page.offsetWidth+"x.jpg"]);

			}

		}
		else {
			scene.ready();
		}


		scene.cN.page.hN.changeToNav();


		var scene_images = new Array();
		scene_images.push("/img/gx_loader.gif");

	}
}

