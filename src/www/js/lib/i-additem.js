Util.Objects["additem"] = new function() {
	this.init = function(scene) {

		scene.cN = u.qs("#content");
		scene.cN.scene = scene;


		scene.ready = function() {
//			u.bug("scene ready:" + u.nodeId(this));

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

		scene.files = u.qsa("input[type=file]", scene);

		var i, file;
		for(i = 0; file = scene.files[i]; i++) {
			file.scene = scene
			file.changed = function() {
//				u.bug("file changed:" + u.nodeId(this) + "," + this.files + ", " + this.files[0].name)

				var reader = new FileReader();

				u.ac(this.form, "loading");
				reader.node = this;
				reader.onload = function(event) {
//					u.bug(this.node);

					u.a.setOpacity(this.node.scene.bn_upload, 1);
					u.rc(this.node.form, "loading");
					u.rc(this.node.form, "portrait");
					u.rc(this.node.form, "landscape");

					if(event.target.width / event.target.height < this.node.offsetWidth / this.node.offsetHeight) {
						u.ac(this.node.form, "landscape");
					}
					else {
						u.ac(this.node.form, "portrait");
					}

					u.as(this.node.form, "backgroundImage", "url("+event.target.result+")");
				}


			         // Read in the image file as a data URL.
				reader.readAsDataURL(this.files[0]);
   
			}
			u.e.addEvent(file, "change", file.changed);
			// file.onfocus = function() {u.bug("focus file input:" + u.nodeId(this))}
			// file.onblur = function() {u.bug("blur file input:" + u.nodeId(this))}
//			u.xInObject(file);
		}

		scene.bn_upload = u.qs(".actions .upload", scene);
		scene.bn_upload.page = page;
		u.a.setOpacity(scene.bn_upload, 0.5);
	
		scene.bn_upload.clicked = function(event) {
			u.e.kill(event);

			alert("Thank you for viewing our demo.")

			this.page.navigate("/", this);
		}
		u.ce(scene.bn_upload);


		scene.ready();

	}
}
