u.bug_console_only = true;

Util.Objects["page"] = new function() {
	this.init = function(page) {

		//if(u.hc(page, "i:page")) {
			//alert("wop");
			// header reference
			page.hN = u.qs("#header");
			page.hN.service = u.qs(".servicenavigation", page.hN);

			// add logo to navigation
			page.logo = u.ie(page.hN, "div", {"class":"logo", "html":"parentNode"});
			u.ce(page.logo);
			page.logo.clicked = function(event) {
				location.href = '/';
			}

			// content reference
			page.cN = u.qs("#content", page);

			// navigation reference
			page.nN = u.qs("#navigation", page);
			page.nN.list = u.qs("ul", page.nN);
			page.nN = u.ie(page.hN, page.nN);

			// footer reference
			page.fN = u.qs("#footer");
			// move li to #header .servicenavigation
			page.fN.service = u.qs(".servicenavigation", page.fN);


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

				// forward scroll event to current scene
				if(page.cN && page.cN.scene && typeof(page.cN.scene.scrolled) == "function") {
					page.cN.scene.scrolled();
				}

			}



			// Page is ready - called from several places, evaluates when page is ready to be shown
			page.ready = function() {
//				u.bug("page ready")

				// page is ready to be shown - only initalize if not already shown
				if(!u.hc(this, "ready")) {

					// page is ready
					u.addClass(this, "ready");

					// set resize handler
					u.e.addEvent(window, "resize", page.resized);
					// set scroll handler
					u.e.addEvent(window, "scroll", page.scrolled);

					this.initNavigation();

					this.resized();
				}
			}

			// close navigation
			page.closeNav = function() {

				u.t.resetTimer(page.t_nav);

				var open_nodes = u.qsa(".open", page.hN);
				if(open_nodes) {
					var i, node;
					for(i = 0; node = open_nodes[i]; i++) {

						u.a.transition(node.submenu, "all 0.2s linear");
						u.a.setOpacity(node.submenu, 0);
						u.rc(node, "open");
					}
				}

				u.a.transition(page.hN, "all 0.2s ease-out");
				u.a.setHeight(page.hN, page.hN.org_height);

				this.open_nav = false;
			}

			// open/close controller
			page.navController = function(li) {
//				u.bug("navcontroller:" + u.nodeId(li) + "; " + (this.open_nav ? u.nodeId(this.open_nav) : ''))

				if(this.open_nav != li) {

					if(this.open_nav) {
						u.a.transition(this.open_nav.submenu, "all 0.2s linear");
						u.a.setOpacity(this.open_nav.submenu, 0);
						u.rc(this.open_nav, "open");
					}

					u.a.transition(page.hN, "all 0.3s ease-in-out");
					u.a.setHeight(page.hN, li.submenu.offsetHeight + page.hN.org_height);

					u.a.transition(li.submenu, "all 0.3s linear 0.3s");
					u.a.setOpacity(li.submenu, 1);

					u.ac(li, "open");
					this.open_nav = li;
				}
				else {
					this.closeNav();
				}
			}

			// initialize navigation elements
			page.initNavigation = function() {


				this.hN.org_height = this.hN.offsetHeight;

				var i, node;
				// enable submenus where relevant
				this.hN.nodes = u.qsa("h6", page.hN);
				for(i = 0; node = this.hN.nodes[i]; i++) {

					var li = node.parentNode;

					// get submenu and position it correctly
					li.submenu = u.qs("ul.subjects", li);
					li.submenu.li = li;

					// enable mouseover if mouse events are available
					if(u.e.event_pref == "mouse") {
						li._mousedover = function() {
//							u.bug("mouseover")

							u.t.resetTimer(page.t_nav);

							if(!u.hc(this, "open")) {
								page.navController(this);
							}
						}

						li._mousedout = function() {
//							u.bug("mouseout")
							page.t_nav = u.t.setTimer(this, page.closeNav, 500);
						}

						u.e.addEvent(li, "mouseover", li._mousedover);
						u.e.addEvent(li, "mouseout", li._mousedout);
					}

					u.e.click(li);
					li.clicked = function() {
						page.navController(this);
					}
				}


			}


			// ready to start page builing process
			page.ready();

		//}
	}
}

u.e.addDOMReadyEvent(u.init);

