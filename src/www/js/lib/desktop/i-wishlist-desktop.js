Util.Objects["wishlist"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:" + u.nodeId(scene))
		
		scene.resized = function() {
//			u.bug("scene.resized:" + u.nodeId(this));

			// refresh dom
			//this.offsetHeight;
		}

		scene.scrolled = function() {
//			u.bug("scrolled:" + u.nodeId(this))

		}

		scene.ready = function() {
			page.cN.scene = this;
			page.resized();
		}

		// scene is ready
		scene.ready();
	}
}
			

Util.Objects["wishes"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:" + u.nodeId(scene))


		scene.image_width = 250;


		scene.resized = function() {
//			u.bug("scene.resized:" + u.nodeId(this));


			// resize text nodes
			var text_width = this.nodes[0].offsetWidth - this.image_width;
			for(i = 0; node = this.nodes[i]; i++) {
				u.as(node.text_mask, "width", text_width+"px", false);
			}

			// refresh dom
			this.offsetHeight;
		}

		scene.scrolled = function() {
//			u.bug("scrolled")
		}

		scene.ready = function() {
//			u.bug("scene.ready:" + u.nodeId(this));

			this.nodes = u.qsa("li.item", this);
			if(this.nodes.length) {

				var text_width = this.nodes[0].offsetWidth - this.image_width;
				var i, node;
				for(i = 0; node = this.nodes[i]; i++) {

					node.item_id = u.cv(node, "id");
					node.image_format = u.cv(node, "format");

					// restructure content
					node.image_mask = u.ae(node, "div", {"class":"image"});
					node.text_mask = u.ae(node, "div", {"class":"text"});

					u.as(node.text_mask, "width", text_width+"px", false);
					if(node.image_format) {
						u.as(node.image_mask, "backgroundImage", "url(/images/"+node.item_id+"/"+this.image_width+"x."+node.image_format+")");
					}
					// or fallback image
					else {
						u.as(node.image_mask, "backgroundImage", "url(/images/0/missing/"+this.image_width+"x.png)");
					}

					u.ae(node.text_mask, u.qs("h3", node));
					u.ae(node.text_mask, u.qs("dl", node));
					node.actions = u.ae(node.text_mask, u.qs("ul.actions", node));
					u.ae(node.text_mask, u.qs("div.description", node));


					// initialize forms
					node.reserve_form = u.qs("li.reserve form", node);
					u.f.init(node.reserve_form);
					node.bn_reserve = u.qs("input", node.reserve_form);
					node.bn_reserve.node = node;
					u.e.click(node.bn_reserve)
					node.bn_reserve.clicked = function(event) {
						u.e.kill(event);

						this.response = function(response) {
							if(response.cms_status == "success") {
								u.ac(this.node.actions, "reserved");
							}
							else {
//								alert("server communication failed");
							}
						}
						u.request(this, this.form.action, {"method":this.form.method});
					}

					node.unreserve_form = u.qs("li.unreserve form", node);
					u.f.init(node.unreserve_form);
					node.bn_unreserve = u.qs("input", node.unreserve_form);
					node.bn_unreserve.node = node;
					u.e.click(node.bn_unreserve)
					node.bn_unreserve.clicked = function(event) {
						u.e.kill(event);

						this.response = function(response) {
							if(response.cms_status == "success") {
								u.rc(this.node.actions, "reserved");
							}
							else {
//								alert("server communication failed");
							}
						}
						u.request(this, this.form.action, {"method":this.form.method});
					}
				}
			}


			page.cN.scene = this;
			page.resized();
		}

		// scene is ready
		scene.ready();
	}
}
