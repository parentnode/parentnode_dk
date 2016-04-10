// can be removed after updating to next version of Manipulator
u.bug_console_only = true;

Util.Objects["page"] = new function() {
	this.init = function(page) {

		window.page = page;

		// show parentnode comment in console
		u.bug_force = true;
		u.bug("think.dk is built using Manipulator, Janitor and Detector");
		u.bug("Visit http://parentnode.dk for more information");
		u.bug("Free lunch for new contributers ;-)");
		u.bug_force = false;


		// header reference
		page.hN = u.qs("#header");
		page.hN.service = u.qs(".servicenavigation", page.hN);
		u.e.drag(page.hN, page.hN);


		// add logo to navigation
		page.logo = u.ie(page.hN, "a", {"class":"logo", "html":u.eitherOr(u.site_name, "Frontpage")});
		page.logo.url = '/';


		// content reference
		page.cN = u.qs("#content", page);


		// navigation reference
		page.nN = u.qs("#navigation", page);
		page.nN = u.ie(page.hN, page.nN);


		// footer reference
		page.fN = u.qs("#footer");
		page.fN.service = u.qs(".servicenavigation", page.fN);


		// global resize handler 
		page.resized = function() {
//			u.bug("page resized")

			page.browser_h = u.browserH();
			page.browser_w = u.browserW();

			// adjust content height
			page.available_height = page.browser_h - page.hN.offsetHeight - page.fN.offsetHeight;

			u.as(page.cN, "min-height", "auto", false);
			if(page.available_height >= page.cN.offsetHeight) {
				u.as(page.cN, "min-height", page.available_height+"px", false);
			}

			// forward resize event to current scene
			if(page.cN && page.cN.scene && typeof(page.cN.scene.resized) == "function") {
				page.cN.scene.resized();
			}

		}

		// global scroll handler 
		page.scrolled = function() {

			// forward scroll event to current scene
			if(page.cN && page.cN.scene && typeof(page.cN.scene.scrolled) == "function") {
				page.cN.scene.scrolled();
			}

		}

		// global orientationchange handler
		page.orientationchanged = function() {

			// resize navigation if it is open
			if(u.hc(page.bn_nav, "open")) {
				u.as(page.hN, "height", window.innerHeight + "px");
			}

			// forward scroll event to current scene
			if(page.cN && page.cN.scene && typeof(page.cN.scene.orientationchanged) == "function") {
				page.cN.scene.orientationchanged();
			}
		}
		


		// Page is ready - called from several places, evaluates when page is ready to be shown
		page.ready = function() {
//			u.bug("page ready")

			// page is ready to be shown - only initalize if not already shown
			if(!this.is_ready) {

				// page is ready
				this.is_ready = true;

				// set resize handler
				u.e.addEvent(window, "resize", page.resized);
				// set scroll handler
				u.e.addEvent(window, "scroll", page.scrolled);
				// set orientation change handler
				u.e.addEvent(window, "orientationchange", page.orientationchanged);

				this.initNavigation();

				this.resized();

			}
		}

		// show accept cookies dialogue
		page.acceptCookies = function() {

			// show terms notification
			if(u.terms_version && !u.getCookie(u.terms_version)) {
				var terms = u.ie(page.cN, "div", {"class":"terms_notification"});
				u.ae(terms, "h3", {"html":"We love <br />cookies and privacy"});
				var bn_accept = u.ae(terms, "a", {"class":"accept", "html":"Accept"});
				bn_accept.terms = terms;
				u.ce(bn_accept);
				bn_accept.clicked = function() {
					this.terms.parentNode.removeChild(this.terms);
					u.saveCookie(u.terms_version, true, {"expiry":new Date(new Date().getTime()+(1000*60*60*24*365)).toGMTString()});
				}

				if(!location.href.match(/\/terms/)) {
					var bn_details = u.ae(terms, "a", {"class":"details", "html":"Details", "href":"/terms"});
					u.ce(bn_details, {"type":"link"});
				}

				// show terms/cookie approval
				u.a.transition(terms, "all 0.5s ease-in");
				u.ass(terms, {
					"opacity": 1
				});
			}

		}

		// initialize navigation elements
		page.initNavigation = function() {


			page.nN.list = u.qs("ul.navigation", page.nN);


			// create burger menu
			this.bn_nav = u.qs(".servicenavigation li.navigation", this.hN);
			u.ae(this.bn_nav, "div");
			u.ae(this.bn_nav, "div");
			u.ae(this.bn_nav, "div");

			// enable nav link
			u.ce(this.bn_nav);
			this.bn_nav.clicked = function(event) {

				// close navigation
				if(u.hc(this, "open")) {
					u.rc(this, "open");

					var i, node;
					// set hide animation for nav nodes
					for(i = 0; node = page.nN.nodes[i]; i++) {

						u.a.transition(node, "all 0.2s ease-in "+(i*100)+"ms");
						u.ass(node, {
							"opacity": 0,
							"transform":"translate(0, -30px)"
						});
					}

					// hide navigation when hidden
					page.hN.transitioned = function() {
						u.ass(page.nN, {
							"display": "none"
						});
					}

					// collapse header
					u.a.transition(page.hN, "all 0.3s ease-in "+(page.nN.nodes.length*100)+"ms");
					u.ass(page.hN, {
						"height": "60px"
					});

				}
				// open navigation
				else {
					u.ac(this, "open");

					var i, node;
					// set initial animation state for nav nodes
					for(i = 0; node = page.nN.nodes[i]; i++) {
						u.ass(node, {
							"opacity": 0,
							"transform":"translate(0, 30px)"
						});
					}

					// set animation for header
					u.a.transition(page.hN, "all 0.3s ease-in");
					u.ass(page.hN, {
						"height": window.innerHeight+"px",
					});
					u.ass(page.nN, {
						"display": "block"
					});

					// set animation for nav nodes
					for(i = 0; node = page.nN.nodes[i]; i++) {

						u.a.transition(node, "all 0.3s ease-in "+(100 + (i*100))+"ms");
						u.ass(node, {
							"opacity": 1,
							"transform":"translate(0, 0)"
						});
					}
				}

				// update drag coordinates
				page.nN.start_drag_y = (window.innerHeight - 100) - page.nN.offsetHeight;
				page.nN.end_drag_y = page.nN.offsetHeight;

			}
			// enable dragging on navigation
			u.e.drag(this.nN, [0, (window.innerHeight - 100) - this.nN.offsetHeight, this.hN.offsetWidth, this.nN.offsetHeight], {"strict":false, "elastica":200, "vertical_lock":true});


			// append footer servicenavigation to header servicenavigation
			if(page.fN.service) {
				nodes = u.qsa("li", page.fN.service);
				for(i = 0; node = nodes[i]; i++) {
					u.ae(page.nN.list, node);
				}
				page.fN.removeChild(page.fN.service);
			}

			// append header servicenavigation to header servicenavigation
			if(page.hN.service) {
				nodes = u.qsa("li:not(.navigation)", page.hN.service);
				for(i = 0; node = nodes[i]; i++) {
					u.ae(page.nN.list, node);
				}
			}

			var i, node, nodes;
			// enable animation on submenus and logo
			nodes = u.qsa("#navigation li,a.logo", page.hN);
			for(i = 0; node = nodes[i]; i++) {

				// build first living proof model of CEL clickableElementLink
				u.ce(node, {"type":"link"});

				// add over and out animation
				u.e.hover(node);
				node.over = function() {

					this.transitioned = function() {

						this.transitioned = function() {
							u.a.transition(this, "none");
						}

						u.a.transition(this, "all 0.1s ease-in-out");
						u.a.scale(this, 1.15);
					}

					u.a.transition(this, "all 0.1s ease-in-out");
					u.a.scale(this, 1.22);
				}
				node.out = function() {

					this.transitioned = function() {

						this.transitioned = function() {
							u.a.transition(this, "none");
						}

						u.a.transition(this, "all 0.1s ease-in-out");
						u.a.scale(this, 1);
					}

					u.a.transition(this, "all 0.1s ease-in-out");
					u.a.scale(this, 0.9);
				}

			}

			// get clean set of navigation nodes (for animation on open and close)
			page.nN.nodes = u.qsa("li", page.nN.list);

		}


		// ready to start page builing process
		page.ready();

	}
}

u.e.addDOMReadyEvent(u.init);

