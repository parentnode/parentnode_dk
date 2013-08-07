Util.Objects["scene"] = new function() {
	this.init = function(scene) {

		scene.cN = u.qs("#content");
		scene.cN.scene = scene;


		scene.ready = function() {
//			u.bug("scene ready:" + u.nodeId(this))
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

		scene.resized = function() {
//			u.bug("scene resized:" + u.nodeId(this));
		}

		scene.cleanup = function() {
//			u.bug("scene cleanup:" + u.nodeId(this));
		}

		scene.navigate = function() {
//			u.bug("scene navigate:" + u.nodeId(this));
		}

		scene.cN.page.hN.changeToNav();

				
		scene.ready();

	}
}
