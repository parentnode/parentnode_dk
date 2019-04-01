Util.Objects["verify"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:", scene);


		scene.resized = function() {
//			u.bug("scene.resized:", this);
		}

		scene.scrolled = function() {
//			u.bug("scrolled:", this);
		}

		scene.ready = function() {
//			u.bug("scene.ready:", this);

			page.cN.scene = this;

			var verify_form = u.qs("form.verify_code", this);

			if(verify_form) {
				u.f.init(verify_form);
			}

			// Using the new verify form
			verify_form.submitted = function() {
				data = u.f.getParams(this);

				this.response = function(response) {
					// User is already verified
					if (u.qs(".scene.login", response)) {
						u.showScene(scene.replaceScene(response));
						u.h.navigate("/login", false, true);
					}
					// Verification success
					else if (u.qs(".scene.confirmed", response)) {
						// Update scene
						u.showScene(scene.replaceScene(response));

						// Update url
						u.h.navigate("/verify/receipt", false, true);
					}
					// Error
					else {
						// Remove past error from DOM
						if (this.error) {
							this.error.parentNode.removeChild(this.error);
						}
						
						// Append error to scene
						this.error = scene.showMessage(this, response);

						// Set inital state before animating
						u.ass(this.error, {
							transform:"translate3d(0, -20px, 0) rotate3d(-1, 0, 0, 90deg)",
							opacity:0
						});

						// Animate error
						u.a.transition(this.error, "all .6s ease");
						u.ass(this.error, {
							transform:"translate3d(0, 0, 0) rotate3d(0, 0, 0, 0deg)",
							opacity:1
						});
					}
				}

				// Post to "confirm"
				u.request(this, this.action, {"data":data, "method":"POST", "responseType":"document"});
			}

			// accept cookies?
			page.acceptCookies();

			u.showScene(this);

			page.resized();
		}

		scene.replaceScene = function(response) {
			var current_scene = u.qs(".scene", page);
			var new_scene = u.qs(".scene", response);
			page.cN.replaceChild(new_scene, current_scene); // Replace current scene with response scene

			return new_scene;
		}

		scene.showMessage = function(form, response) {
			// Get error message
			var new_error = (u.qs("p.errormessage", response) || u.qs("p.error", response));
			var current_error = (u.qs("p.errormessage", form) || u.qs("p.error", form));

			// Inject initial error
			if (!current_error) {
				u.ie(form, new_error);
			}
			// Update error
			else {
				form.replaceChild(new_error, current_error);
			}

			return new_error;
		}


		// scene is ready
		scene.ready();

	}

}
