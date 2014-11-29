u.bug_console_only = true;

Util.Objects["page"] = new function() {
	this.init = function(page) {

		//if(u.hc(page, "i:page")) {
			//alert("wop");


			// create a generel style rule
			page.style_tag = document.createElement("style");
			page.style_tag.setAttribute("media", "all")
			page.style_tag.setAttribute("type", "text/css")
			page.style_tag = u.ae(document.head, page.style_tag);



			// header reference
			page.hN = u.qs("#header");
			page.hN.service = u.qs(".servicenavigation", page.hN);


			// content reference
			page.cN = u.qs("#content", page);


			// navigation reference
			page.nN = u.qs("#navigation", page);
			page.nN = u.ie(page.hN, page.nN);


			// footer reference
			page.fN = u.qs("#footer");
			page.fN.service = u.qs(".servicenavigation", page.fN);


			page.fN.slogan = u.qs("p", page.fN);
			if(page.fN.slogan) {
				u.ce(page.fN.slogan);
				page.fN.slogan.clicked = function(event) {
					window.open("http://parentnode.dk");
				}
			}


			// LOGO
			// add logo to navigation
			page.logo = u.ie(page.hN, "a", {"class":"logo", "html":u.eitherOr(u.site_name, "Frontpage")});
			page.logo.url = '/';
			page.logo.font_size = parseInt(u.gcs(page.logo, "font-size"));
			page.logo.font_size_gap = page.logo.font_size-14;
			page.logo.top_offset = u.absY(page.nN) + parseInt(u.gcs(page.nN, "padding-top"));

			// create rule for logo
			page.style_tag.sheet.insertRule("#header a.logo {}", 0);
			page.logo.css_rule = page.style_tag.sheet.cssRules[0];



			// global resize handler 
			page.resized = function() {

				// adjust content height
				this.calc_height = u.browserH();
				this.calc_width = u.browserW();
				this.available_height = this.calc_height - page.hN.offsetHeight - page.fN.offsetHeight;

				u.as(page.cN, "height", "auto", false);
				if(this.available_height >= page.cN.offsetHeight) {
					u.as(page.cN, "height", this.available_height+"px", false);
				}

				if(this.calc_width > 1300) {
					u.ac(page, "fixed");
				}
				else {
					u.rc(page, "fixed");
				}


				// forward resize event to current scene
				if(page.cN && page.cN.scene) {

					if(typeof(page.cN.scene.resized) == "function") {
						page.cN.scene.resized();
					}

				}

			}

			// global scroll handler 
			page.scrolled = function() {

				page.scrolled_y = u.scrollY();

				// reduce logo
				if(page.scrolled_y < page.logo.top_offset) {

					page.logo.is_reduced = false;

					var reduce_font = (1-(page.logo.top_offset-page.scrolled_y)/page.logo.top_offset) * page.logo.font_size_gap;
					page.logo.css_rule.style.setProperty("font-size", (page.logo.font_size-reduce_font)+"px", "important");
				}
				// claim end state, once
				else if(!page.logo.is_reduced) {

					page.logo.is_reduced = true;
					page.logo.css_rule.style.setProperty("font-size", (page.logo.font_size-page.logo.font_size_gap)+"px", "important");
				}

				// reduce navigation
				if(page.nN.top_offset && page.scrolled_y < page.nN.top_offset) {

					page.nN.is_reduced = false;

					var factor = (1-(page.nN.top_offset-page.scrolled_y)/page.nN.top_offset);

					var reduce_font = factor * page.nN.font_size_gap;
					page.nN.list.css_rule.style.setProperty("font-size", (page.nN.font_size-reduce_font)+"px", "important");

					var reduce_top = factor * page.nN.top_offset_gap;
					page.nN.css_rule.style.setProperty("top", (page.nN.top_offset-reduce_top)+"px", "important");

				}
				// claim end state, once
				else if(page.nN.top_offset && !page.nN.is_reduced) {

					page.nN.is_reduced = true;

					page.nN.list.css_rule.style.setProperty("font-size", (page.nN.font_size-page.nN.font_size_gap)+"px", "important");
					page.nN.css_rule.style.setProperty("top", (page.nN.top_offset-page.nN.top_offset_gap)+"px", "important");
				}



				// forward scroll event to current scene
				if(page.cN && page.cN.scene && typeof(page.cN.scene.scrolled) == "function") {
					page.cN.scene.scrolled();
				}

			}



			// Page is ready - called from several places, evaluates when page is ready to be shown
			page.ready = function() {
//				u.bug("page ready")

				// page is ready to be shown - only initalize if not already shown
				if(!this.is_ready) {

					// page is ready
					this.is_ready = true;

					// set resize handler
					u.e.addEvent(window, "resize", page.resized);
					// set scroll handler
					u.e.addEvent(window, "scroll", page.scrolled);

					this.initNavigation();

					this.resized();

					// show terms notification
					if(!u.getCookie("terms_v1")) {
						// var terms = u.ie(document.body, "div", {"class":"terms_notification"});
						// u.ae(terms, "h3", {"html":"We love <br />cookies and privacy"});
						// var bn_accept = u.ae(terms, "a", {"class":"accept", "html":"Accept"});
						// bn_accept.terms = terms;
						// u.ce(bn_accept);
						// bn_accept.clicked = function() {
						// 	this.terms.parentNode.removeChild(this.terms);
						// 	u.saveCookie("terms_v1", true, {"expiry":new Date(new Date().getTime()+(1000*60*60*24*365)).toGMTString()});
						// }
						//
						// if(!location.href.match(/\/terms/)) {
						// 	var bn_details = u.ae(terms, "a", {"class":"details", "html":"Details"});
						// 	bn_details.url = "/terms";
						// 	u.ce(bn_details, {"type":"link"});
						// }
					}
				}
			}


			// initialize navigation elements
			page.initNavigation = function() {

				var i, node;

				page.nN.list = u.qs("ul", page.nN);
				page.nN.list.nodes = u.qsa("li", page.nN);

				if(page.nN.list.nodes.length) {
					// set reducing scope
					page.nN.font_size = parseInt(u.gcs(page.nN.list.nodes[1], "font-size"));
					page.nN.font_size_gap = page.nN.font_size-14;
					page.nN.top_offset = u.absY(page.nN) + parseInt(u.gcs(page.nN, "padding-top"));
					page.nN.top_offset_gap = page.nN.top_offset-10;

					// create rule for Navigation
					page.style_tag.sheet.insertRule("#navigation {}", 0);
					page.nN.css_rule = page.style_tag.sheet.cssRules[0];

					// create rule for Navigation nodes
					page.style_tag.sheet.insertRule("#navigation ul li {}", 0);
					page.nN.list.css_rule = page.style_tag.sheet.cssRules[0];
		//			u.bug("cssText:" + page.nN.css_rule.cssText + ", " + u.nodeId(page.nN));


					// enable navigation link animation where relevant
					this.hN.nodes = u.qsa("#navigation li,.servicenavigation li,a.logo", page.hN);
					for(i = 0; node = this.hN.nodes[i]; i++) {

						u.ce(node, {"type":"link"});

						node._mousedover = function() {

							this.transitioned = function() {

								this.transitioned = function() {
									this.transitioned = function() {
										u.a.transition(this, "none");
									}

									u.a.transition(this, "all 0.1s ease-in-out");
									u.a.scale(this, 1.2);
								}

								u.a.transition(this, "all 0.1s ease-in-out");
								u.a.scale(this, 1.15);
							}

							u.a.transition(this, "all 0.1s ease-in-out");
							u.a.scale(this, 1.22);
						}

						node._mousedout = function() {
							this.transitioned = function() {

								this.transitioned = function() {
									u.a.transition(this, "none");
								}

								u.a.transition(this, "all 0.1s ease-in");
								u.a.scale(this, 1);
							}

							u.a.transition(this, "all 0.1s ease-in");
							u.a.scale(this, 0.8);
						}

						// enable mouseover if mouse events are available
						if(u.e.event_pref == "mouse") {

							u.e.addEvent(node, "mouseover", node._mousedover);
							u.e.addEvent(node, "mouseout", node._mousedout);
						}
						// apply touchstart/end
						else {

							u.e.addStartEvent(node, node._mousedover);
							u.e.addEndEvent(node, node._mousedout);
						}
					}
				}

			}


			// ready to start page builing process
			page.ready();

		//}
	}
}

u.e.addDOMReadyEvent(u.init);

