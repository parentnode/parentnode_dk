Util.Objects["wishes"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:" + u.nodeId(scene))


		scene.image_width = 250;


		scene.resized = function() {
//			u.bug("scene.resized:" + u.nodeId(this));


			// resize text nodes
			if(this.nodes.length) {
				var text_width = this.nodes[0].offsetWidth - this.image_width;
				for(i = 0; node = this.nodes[i]; i++) {
					u.as(node.text_mask, "width", text_width+"px", false);
				}
			}

			// refresh dom
			this.offsetHeight;
		}

		scene.scrolled = function() {
//			u.bug("scrolled")
		}

		scene.ready = function() {
//			u.bug("scene.ready:" + u.nodeId(this));

			page.cN.scene = this;

			this.nodes = u.qsa("li.item", this);
			if(this.nodes.length) {

				var text_width = this.nodes[0].offsetWidth - this.image_width;
				var i, node;
				for(i = 0; node = this.nodes[i]; i++) {

					node.item_id = u.cv(node, "id");
					node.image_format = u.cv(node, "format");
					node.image_variant = u.cv(node, "variant");

					// restructure content
					node.image_mask = u.ae(node, "div", {"class":"image"});
					node.text_mask = u.ae(node, "div", {"class":"text"});

					u.as(node.text_mask, "width", text_width+"px", false);
					if(node.image_format) {
						u.as(node.image_mask, "backgroundImage", "url(/images/"+node.item_id+"/"+node.image_variant+"/"+this.image_width+"x."+node.image_format+")");
					}
					// or fallback image
					else {
						u.as(node.image_mask, "backgroundImage", "url(/images/0/missing/"+this.image_width+"x.png)");
					}

					u.ae(node.text_mask, u.qs("h3", node));
					u.ae(node.text_mask, u.qs("dl", node));

					node._actions = u.qs("ul.actions", node);
					if(node._actions) {
						u.ae(node.text_mask, node._actions);
					}

					node._descriptions = u.qs("div.description", node);
					if(node._descriptions) {
						u.ae(node.text_mask, node._descriptions);
					}


					// initialize forms
					node.reserve_form = u.qs("li.reserve form", node);
					if(node.reserve_form) {
						u.f.init(node.reserve_form);
						node.bn_reserve = u.qs("input[type=submit]", node.reserve_form);
						node.bn_reserve.node = node;

						node.bn_reserve.over = function() {
							this.org_text = this.value;
							this.value = "Click to reserve";
						}
						node.bn_reserve.out = function() {
							this.value = this.org_text;
						}
						u.e.addEvent(node.bn_reserve, "mouseover", node.bn_reserve.over);
						u.e.addEvent(node.bn_reserve, "mouseout", node.bn_reserve.out);

						u.e.click(node.bn_reserve)
						node.bn_reserve.clicked = function(event) {
							u.e.kill(event);

							this.response = function(response) {
								if(response.cms_status == "success") {
									u.ac(this.node._actions, "reserved");
								}
								else {
	//								alert("server communication failed");
								}
							}
							u.request(this, this.form.action, {"method":this.form.method, "params":u.f.getParams(this.form)});
						}
					}


					node.unreserve_form = u.qs("li.unreserve form", node);
					if(node.unreserve_form) {
						u.f.init(node.unreserve_form);
						node.bn_unreserve = u.qs("input[type=submit]", node.unreserve_form);
						node.bn_unreserve.node = node;

						node.bn_unreserve.over = function() {
							this.org_text = this.value;
							this.value = "Click to make available";
						}
						node.bn_unreserve.out = function() {
							this.value = this.org_text;
						}
						u.e.addEvent(node.bn_unreserve, "mouseover", node.bn_unreserve.over);
						u.e.addEvent(node.bn_unreserve, "mouseout", node.bn_unreserve.out);

						u.e.click(node.bn_unreserve)
						node.bn_unreserve.clicked = function(event) {
							u.e.kill(event);

							this.response = function(response) {
								if(response.cms_status == "success") {
									u.rc(this.node._actions, "reserved");
								}
								else {
	//								alert("server communication failed");
								}
							}
							u.request(this, this.form.action, {"method":this.form.method, "params":u.f.getParams(this.form)});
						}
					}

				}
			}



			page.resized();
		}

		// scene is ready
		scene.ready();
	}
}
