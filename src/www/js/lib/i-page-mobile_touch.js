u.bug_force = true;
//u.bug_console_only = true;

Util.Objects["page"] = new function() {
	this.init = function(page) {
//		u.bug("init page")


		if(u.hc(page, "i:page")) {

			// manual base initialization, remove i:page
			u.rc(page, "i:page");



			// header reference
			page.hN = u.qs("#header");
			page.hN.page = page;

			// content reference
			page.cN = u.qs("#content");
			page.cN.page = page;

			// navigation reference
			page.nN = u.qs("#navigation");
			page.nN.page = page;
			page.nN = u.ae(page.parentNode, page.nN);

			// footer reference
			page.fN = u.qs("#footer");
			page.fN.page = page;


			// Page is ready - called from several places, evaluates when page is ready to be shown
			page.ready = function() {

//				u.bug("page ready")

				if(!this.intro) {
//					u.bug("intro is done")


					this.initHeader();

					this.initNavigation();


					// in case content loads faster than page, call content ready controller (content ready does not execute until both content and page is ready)
					this.cN.ready();
				}


				// page is ready to be shown - only show if not already shown
				if(!u.hc(this, "ready")) {

					// maximize height
					if(!u.qs(".desktop_wrapper") && !u.hc(document.body, "standalone")) {
						this.resetHeight();
					}

					// page is ready
					u.addClass(this, "ready");

					u.as(this, "display", "block");
					u.a.transition(this, "none");
					u.a.setOpacity(this, 1);


					// recalculate content height
					this.resized();

					// enable ajax navigation
					u.navigation(page);

				}
			}


			// reset height to make adressbar disappear
			page.resetHeight = function() {
//				u.bug("reset height:" + u.gcs(this, "height"));

				window.scrollTo(0, 0);

				if(u.gcs(this, "height") != "4000px") {
					u.a.setHeight(this, 4000);

					window.scrollTo(0, 0);

					//this, 
					this.resetHeight();
//					this.t_reset_height = u.t.setTimer(this, this.resetHeight, 10);
				}
				else {
					var h = window.innerHeight;

					// set page and navigation height
//					u.bug(parseInt(u.gcs(document.body, "margin-top")) + ", " + u.gcs(document.body, "margin-top"));
//					u.a.setHeight(this, h - parseInt(u.gcs(document.body, "margin-top")));
//					u.a.setHeight(this.nN, h - parseInt(u.gcs(document.body, "margin-top")));
					u.a.setHeight(document.body, h);

					// if(u.qs(".bookmark")) {
					// 	u.a.setHeight(u.qs("div.bookmark"), h);
					// }
				}
//				u.bug("resat height:" + u.gcs(this, "height"));
			}

			// Content is ready - called from page.ready and scenes
			// performs scene transition
			page.cN.ready = function() {
//				u.bug("page.cN ready:" + this.page.intro + ", " + u.hc(this.page, "ready") + ", " + u.hc(this, "ready"));

				if(!this.page.intro && u.hc(this.page, "ready") && u.hc(this, "ready")) {
//					u.bug("page is actually ready:" + this.page);

//					u.as(this, "display", "block");
//					u.a.transition(this, "none");
//					u.a.setOpacity(this, 1);

					// more than one scene - perform scene transtition
					if(u.qsa(".scene", this).length > 1) {
//						u.bug("replace scenes")
//						u.bug("transition:" + u.nodeId(this.page) + "," + this.page.hash_node);

						var transition_method = this.page.hash_node && this.page.hash_node.transition_method ? this.page.hash_node.transition_method : this.transitions.fadeIn;

//						u.bug("transition_method:" + transition_method);
						transition_method();
					}
					// only one scene
					else {
//						u.bug("show scene")
						this.transitions.hard()
					}

				}
			}

			// Content loader
			page.cN.navigate = function(url) {
//				u.bug("navigation on content level")

				if(!u.qs(".desktop_wrapper") && !u.hc(document.body, "standalone")) {
					this.page.resetHeight();
				}

				// content received
				this.response = function(response) {
//					u.bug("navigate response:" + this.request_url + ", " + response.body_class)

					// set body class (keep standalone)
					u.setClass(document.body, response.body_class.replace("i:validdevice", "").trim() + (u.hc(document.body, "standalone") ? " standalone": ""));
					// set title
					document.title = response.head_title;
					this.page.hN.h1.update(u.qs(".scene h1", response) ? u.qs(".scene h1", response).innerHTML : "");

					// insert .scene in #content
					var new_scene = u.qs(".scene", response);
//					u.as(new_scene, "display", "none");
					u.a.translate(new_scene, this.offsetWidth, 0);
//					u.as(new_scene, "display", "block");

					u.ae(this, new_scene);

					// init content - will callback to ready when done
					u.init(this);

				}
				// request new content
				u.request(this, u.h.getCleanHash(url));
			}

			// clean up scenes after transitions
			// removes all scenes, execpt for the last one
			page.cN.cleanScenes = function() {
//				u.bug("clean scenes");
				while(u.qsa(".scene", this).length > 1) {
					var scene = u.qs(".scene", this);
					scene.parentNode.removeChild(scene);
				}
			}

			page.cN.transitions = new Object();
			page.cN.transitions.page = page;

			// transition scenes to the left
			page.cN.transitions.animateLeft = function() {
//				u.bug("animateLeft transition");

				var scenes = u.qsa(".scene", this.page.cN);

				u.a.transition(scenes[scenes.length-1], "none");
				u.a.translate(scenes[scenes.length-1], (this.page.offsetWidth), 0);
				u.a.setOpacity(scenes[scenes.length-1], 1);
				u.as(scenes[scenes.length-1], "display", "block");

				scenes[0].transitioned = function() {
//					u.bug("cancel animateLeft 0 - clean")
					this.transitioned = null;
					u.a.transition(this, "none");

					// clean up
					this.cN.cleanScenes();

					if(typeof(this.entered) == "function") {
						this.entered();
					}
				}
				scenes[scenes.length-1].transitioned = function() {
//					u.bug("cancel animateLeft N");

					this.transitioned = null;
					u.a.transition(this, "none");
				}

				if(scenes[0]._x != -(this.page.offsetWidth)) {
					u.a.transition(scenes[0], "all 0.3s ease-out");
					u.a.translate(scenes[0], -(this.page.offsetWidth), scenes[0]._y);
				}
				else {
					scenes[0].transitioned();
				}
				u.a.transition(scenes[scenes.length-1], "all 0.3s ease-out");
				u.a.translate(scenes[scenes.length-1], 0, 0);
			}

			// transition scenes to the right
			page.cN.transitions.animateRight = function() {
//				u.bug("animateRight transition:" + u.qsa(".scene", this.page.cN).length);

				var scenes = u.qsa(".scene", this.page.cN);

				u.a.transition(scenes[scenes.length-1], "none");
				u.a.translate(scenes[scenes.length-1], -(this.page.offsetWidth), 0);
				u.a.setOpacity(scenes[scenes.length-1], 1);
				u.as(scenes[scenes.length-1], "display", "block");

				scenes[0].transitioned = function() {
//					u.bug("cancel animateRight 0 - clean")
					this.transitioned = null;
					u.a.transition(this, "none");

					// clean up
					this.cN.cleanScenes();

					if(typeof(this.entered) == "function") {
						this.entered();
					}
				}
				scenes[scenes.length-1].transitioned = function() {
//					u.bug("cancel animateRight N");
					this.transitioned = null;
					u.a.transition(this, "none");

					// clean up
					this.cN.cleanScenes();
				}


				if(scenes[0]._x != (this.page.offsetWidth)) {
					u.a.transition(scenes[0], "all 0.3s ease-out");
					u.a.translate(scenes[0], (this.page.offsetWidth), scenes[0]._y);
				}
				else {
					scenes[0].transitioned();
				}

				u.a.transition(scenes[scenes.length-1], "all 0.3s ease-out");
				u.a.translate(scenes[scenes.length-1], 0, 0);
			}

			// drop in from top
			page.cN.transitions.pullUp = function() {
//				u.bug("pullUp transition");

				var scenes = u.qsa(".scene", this.page.cN);

				scenes[0].transitioned = function() {
//					u.bug("cancel pullUp 0 - clean")

					this.transitioned = null;
					u.a.transition(this, "none");

					// clean up
					this.cN.cleanScenes();

					if(typeof(this.cN.scene.entered) == "function") {
						this.cN.scene.entered();
					}
				}

				u.a.transition(scenes[0], "none");
				u.a.transition(scenes[scenes.length-1], "none");

				u.as(scenes[0], "zIndex", 10);
				u.as(scenes[scenes.length-1], "zIndex", 5);

				u.a.translate(scenes[scenes.length-1], 0, 0);
				u.a.setOpacity(scenes[scenes.length-1], 1);
				u.as(scenes[scenes.length-1], "display", "block");

				if(scenes[0]._x != -(scenes[0].offsetHeight)) {
					u.a.transition(scenes[0], "all 0.5s ease-out");
					u.a.translate(scenes[0], 0, -(scenes[0].offsetHeight));
				}
				else {
					scenes[0].transitioned();
				}
			}

			// drop in from top
			page.cN.transitions.dropDown = function() {
//				u.bug("dropDown transition")

				var scenes = u.qsa(".scene", this.page.cN);

				scenes[scenes.length-1].transitioned = function() {
//					u.bug("cancel dropDown N - clean")
					this.transitioned = null;
					u.a.transition(this, "none");

					// clean up
					this.cN.cleanScenes();

					if(typeof(this.entered) == "function") {
						this.entered();
					}
				}

				u.a.transition(scenes[0], "none");
				u.a.transition(scenes[scenes.length-1], "none");

				u.as(scenes[0], "zIndex", 5);
				u.as(scenes[scenes.length-1], "zIndex", 1);

				u.a.setOpacity(scenes[scenes.length-1], 1);
				u.as(scenes[scenes.length-1], "display", "block");
				u.a.translate(scenes[scenes.length-1], 0, -(scenes[scenes.length-1].offsetHeight));


				u.as(scenes[scenes.length-1], "zIndex", 10);

				if(scenes[scenes.length-1]._y != 0) {
					u.a.transition(scenes[scenes.length-1], "all 0.5s ease-out");
					u.a.translate(scenes[scenes.length-1], 0, 0);
				}
				else {
					scenes[scenes.length-1].transitioned();
				}
			}

			// fade in - static position
			page.cN.transitions.fadeIn = function() {
//				u.bug("fadeIn transition:" + u.qsa(".scene", this.page.cN).length)

				// cleanup + enter on transition
				var scene = u.qs(".scene", this.page.cN);
				scene.transitioned = function(event) {
//					u.bug("cancel dropDown 0 - clean")
					this.transitioned = null;
					u.a.transition(this, "none");

					this.cN.cleanScenes();

					// enter new scene
					var scene = u.qs(".scene", this.cN);
					scene.transitioned = function(event) {
//						u.bug("cancel fadeIn 0")
						this.transitioned = null;
						u.a.transition(this, "none");

						// clean up
						this.cN.cleanScenes();

						if(typeof(this.entered) == "function") {
							this.entered();
						}
					}

					u.a.transition(scene, "none");
					u.a.setOpacity(scene, 0);
					u.a.translate(scene, 0, 0);
					u.as(scene, "display", "block");

					u.a.transition(scene, "all 0.3s ease-out");
					u.a.setOpacity(scene, 1);
					
				}

				if(u.gcs(scene, "opacity") == 1) {
					u.a.transition(scene, "all 0.3s ease-out");
					u.a.setOpacity(scene, 0);
				}
				else {
					scene.transitioned();
				}
			}

			// no transition out - just show
			page.cN.transitions.hard = function() {
//				u.bug("hard transition");

				// clean up
				this.page.cN.cleanScenes();

				// enter new scene
				var scene = u.qs(".scene", this.page.cN);
				scene.transitioned = function(event) {
//					u.bug("cancel hard 0");
					this.transitioned = null;
					u.a.transition(this, "none");

					if(typeof(this.entered) == "function") {
						this.entered();
					}
				}

				u.a.transition(scene, "none");
				u.a.setOpacity(scene, 0);
				u.a.translate(scene, 0, 0);
				u.as(scene, "display", "block");

				u.a.transition(scene, "all 0.3s ease-out");
				u.a.setOpacity(scene, 1);
			}


			// create headline
			page.hN.h1 = u.ae(page.hN, "h1");
			page.hN.h1.update = function(new_text) {

				page.hN.h1._new_text = new_text;
				this.transitioned = function() {
					this.transitioned = null;
					u.a.transition(this, "none");

					this.innerHTML = this._new_text;

					this.transitioned = function() {
						this.transitioned = null;
						u.a.transition(this, "none");
					}
					u.a.transition(this, "all 0.2s ease-out");
					u.a.setOpacity(this, 1);

				}
				u.a.transition(this, "all 0.2s ease-out");
				u.a.setOpacity(this, 0);
			}

			// header elements
			page.hN.bn_nav = u.qs("li.navigation", this.hN);
			page.hN.bn_nav.page = page;
			page.hN.bn_nav.clicked = function(event) {
//					u.bug("bn_nav clicked")
				u.e.kill(event);

				this.page.transitioned = function() {
					this.transitioned = null;
					u.a.transition(this, "none");
				}

				if(!u.hc(this.page.nN, "open")) {
					u.a.transition(this.page, "all 0.3s ease-in-out");
					u.a.translate(this.page, this.page.offsetWidth - this.offsetWidth, 0)

					u.ac(this.page.nN, "open");
				}
				else {
					u.a.transition(this.page, "all 0.3s ease-in-out");
					u.a.translate(this.page, 0, 0)

					u.rc(this.page.nN, "open");
				}
			}
			u.ce(page.hN.bn_nav);

			page.hN.bn_back = u.ae(u.qs(".servicenavigation", this.hN), "li", {"class":"back"});
			page.hN.bn_back.page = page;
			page.hN.bn_back.clicked = function(event) {
//					u.bug("bn_nav clicked")
				this.transition_method = this.page.cN.transitions.animateRight;

//				u.xInObject(this.page._nav_history);
				this.page.navigate(this.page.historyBack(), this);
//				this.page.hN.changeToNav();

			}
			u.ce(page.hN.bn_back);

			// add cart to header
			page.hN.bn_cart = u.ae(u.qs(".servicenavigation", page.hN), u.qs(".cart", page.nN).cloneNode(true));
			page.hN.bn_cart.span = u.ae(page.hN.bn_cart, "span", {"class":"empty"});
			page.hN.bn_cart.page = page;
			page.hN.bn_cart.clicked = function(event) {
				u.e.kill(event);
//				u.bug("cart click:" + u.nodeId(this) + ", " + this.url, 2)

				if(u.h.getCleanHash(location.hash) != u.h.getCleanUrl(this.url)) {
					this.transition_method = this.page.cN.transitions.dropDown;
					this.page.navigate(this.url, this);
				}
				else {

					this.transition_method = this.page.cN.transitions.pullUp;
					this.page.navigate(this.page.historyBack(), this);
				}

			}
			u.ce(page.hN.bn_cart);


			// Init header 
			page.initHeader = function() {
//				u.bug("init header")

				// show header
// //				this.hN.transitioned = function() {
// 					this.transitioned = null;
// 					u.a.transition(this, "none");
// 
// 					u.ac(this, "ready");
// 				}
// 				u.a.transition(this.hN, "all 1.2s ease-out");
// 				u.a.setOpacity(this.hN, 1);
			}

			// Init navigation
			page.initNavigation = function() {
//				u.bug("init navigation");

				// show navigation
				u.as(this.nN, "display", "block");

				this.hN.updateCart();

				var i, node;
				var nodes = u.qsa("ul.store li,ul.partners li", this.nN);
				for(i = 0; node = nodes[i]; i++) {
					node.page = page;
					node.moved = function(event) {
						u.e.resetEvents(this);
					}

					node.clicked = function(event) {
						u.e.kill(event);
						this.page.navigate(this.url, this.page.nN);

						this.page.hN.bn_nav.clicked();
					}
					u.ce(node);
				}

				u.e.swipe(this.nN, this.nN);
				this.nN.swipedLeft = function() {
					this.page.hN.bn_nav.clicked();
				}
			}


			// add item to cart
			page.hN.addToCart = function() {
				var items = u.getCookie("cart");
				if(!isNaN(parseInt(items))) {
					items = parseInt(items) + 1;
				}
				else {
					items = 1;
				}
				this.bn_cart.span.innerHTML = items;
//				u.bug("update cart:" + items + "=>" + this.bn_cart.span.innerHTML);
				u.saveCookie("cart", this.bn_cart.span.innerHTML);

				u.rc(this.bn_cart.span, "empty");
			}

			// update cart with cookie value
			page.hN.updateCart = function() {
				var items = u.getCookie("cart");
//				u.bug("update cart:" + items);
				if(items && !isNaN(parseInt(items))) {
					this.bn_cart.span.innerHTML = parseInt(items);
					u.rc(this.bn_cart.span, "empty");
				}
				else {
					this.bn_cart.span.innerHTML = "";
					u.ac(this.bn_cart.span, "empty");
				}
			}

			// Change left top corner to back link
			page.hN.changeToBack = function() {
//				u.bug("changeToBack");
				// u.as(this.bn_back, "zIndex", 10);
				// u.as(this.bn_nav, "zIndex", 5);

				if(u.gcs(this.bn_back, "opacity") != 1) {

					this.bn_nav.transitioned = function() {
//						u.bug("bn_nav.transitioned");
						this.transitioned = null;
						u.a.transition(this, "none");
						u.as(this, "display", "none");


						u.a.transition(this.page.hN.bn_back, "none");
						u.a.setOpacity(this.page.hN.bn_back, 0);
						u.as(this.page.hN.bn_back, "display", "block");

						this.page.hN.bn_back.transitioned = function() {
							this.transitioned = null;
							u.a.transition(this, "none");
						}
						u.a.transition(this.page.hN.bn_back, "all 0.3s ease-in");
						u.a.setOpacity(this.page.hN.bn_back, 1);
					}

					if(u.gcs(this.bn_nav, "opacity") == 1) {

						u.a.transition(this.bn_nav, "all 0.1s ease-out");
						u.a.setOpacity(this.bn_nav, 0);

					}
					else {

						this.bn_nav.transitioned();

					}
				}
			}

			// change left top corner to nav link
			page.hN.changeToNav = function() {
//				u.bug("changeToNav");

				// u.as(this.bn_back, "zIndex", 5);
				// u.as(this.bn_nav, "zIndex", 10);

				if(u.gcs(this.bn_nav, "opacity") != 1) {

					this.bn_back.transitioned = function() {
//						u.bug("bn_back.transitioned");
						this.transitioned = null;
						u.a.transition(this, "none");
						u.as(this, "display", "none");

						u.a.transition(this.page.hN.bn_nav, "none");
						u.a.setOpacity(this.page.hN.bn_nav, 0);
						u.as(this.page.hN.bn_nav, "display", "block");

						this.page.hN.bn_nav.transitioned = function() {
							this.transitioned = null;
							u.a.transition(this, "none");
						}
						u.a.transition(this.page.hN.bn_nav, "all 0.3s ease-in");
						u.a.setOpacity(this.page.hN.bn_nav, 1);
					}

					if(u.gcs(this.bn_back, "opacity") == 1) {

						u.a.transition(this.bn_back, "all 0.1s ease-out");
						u.a.setOpacity(this.bn_back, 0);

					}
					else {

						this.bn_back.transitioned();

					}
				}
			}




			// global resize handler 
			page.resized = function() {
				var page = u.qs("#page");
//				u.bug("page resized: cN.oH:" + page.cN.offsetHeight + "," + (page.cN.scene ? ("sce.oH:" + page.cN.scene.offsetHeight + ":gcs-sce:" + u.gcs(page.cN.scene, "height")) : "no scene"));

// 				u.a.setHeight(this, h - parseInt(u.gcs(document.body, "margin-top")));
// //				u.a.setHeight(this.nN, h - parseInt(u.gcs(document.body, "margin-top")));

				if(u.qs(".desktop_wrapper")) {
					page._page_state = page._page_state ? page._page_state : (page.offsetWidth > 480 ? 480 : 0);
//					u.bug(u.browserW() + ";" + page._page_state)
					if(u.browserW() < 480 && page._page_state != 0) {
						page._orientationchanged();
						page._page_state = 0;
					}
					else if(u.browserW() >= 480 && page._page_state != 480) {
						page._orientationchanged();
						page._page_state = 480;
					}
					u.a.setHeight(page, u.qs(".desktop_mask").offsetHeight);
				}
				else {
	 				u.a.setHeight(document.body, window.innerHeight);
					u.a.setHeight(page, window.innerHeight - parseInt(u.gcs(document.body, "margin-top")));
					
				}


				if(page.intro && typeof(page.intro.resized) == "function" && page.intro.parentNode) {
					page.intro.resized();
				}
				if(page.bookmark && typeof(page.bookmark.resized) == "function" && page.bookmark.parentNode) {
					page.bookmark.resized();
				}

				if(page.hN && typeof(page.hN.resized) == "function") {
					page.hN.resized();
				}
				if(page.nN && typeof(page.nN.resized) == "function") {
					page.nN.resized();
				}
				if(page.cN && typeof(page.cN.resized) == "function") {
					page.cN.resized();
				}
				if(page.cN && page.cN.scene && typeof(page.cN.scene.resized) == "function") {
					page.cN.scene.resized();
				}
				if(page.fN && typeof(page.fN.resized) == "function") {
					page.fN.resized();
				}
			}
			// set resize handler
			u.e.addEvent(window, "resize", page.resized);

			// resize content height
			page.cN.resized = function() {
//				u.bug("set content height:" + this.page.offsetHeight +"-"+ this.page.hN.offsetHeight)
				u.a.setHeight(this, this.page.offsetHeight - this.page.hN.offsetHeight);
			}
			page.nN.resized = function() {
				u.a.setHeight(this, this.page.offsetHeight);
			}


			// handle orientation change
			page._orientationchanged = function(event) {
//				u.bug("orientation changed:");

				u.rc(document.body, "landscape|portrait");
				u.ac(document.body, (this.orientation == 90 || this.orientation == 270) ? "landscape" : "portrait");

				var page = u.qs("#page");
				if(!u.qs(".desktop_wrapper") && !u.hc(document.body, "standalone")) {
					page.resetHeight();
				}

				page.cN.cleanScenes();
				if(page.cN.scene && page.cN.scene.parentNode) {
					page.cN.removeChild(page.cN.scene);
				}
//				page.cN.transition_method = page.cN.transitions.hard;
				page.cN.navigate(u.h.getCleanHash(location.hash));
			}
			// redraw page if orientation changes
			u.e.addEvent(window, "orientationchange", page._orientationchanged);

		}


		// INTRO

		// create intro node
		page.intro = u.ae(page, "div", {"class":"intro"});
		page.intro.page = page;
		page.intro.sequence_player = u.sequencePlayer(page.intro);
		page.intro.sequence_player.page = page;

		// intro images
		page.intro._images = new Array();
		for(i = 24; i <= 75; i++) {
//		for(i = 24; i <= 25; i++) {
			page.intro._images.push("/img/intro/Untitled-1_000" + (i < 10 ? "0" : "") + i + ".jpg");
		}

		page.intro.sequence_player.ended = function() {
//			u.bug("playback ended")

			this.ended = function() {
				this.page.intro.transitioned = function() {
					u.a.transition(this, "none");
					this.transitioned = null;
					this.parentNode.removeChild(this);
					this.page.intro = null;

					this.page.ready();
				}
				u.a.transition(this.page.intro, "all 0.2s ease-out");
				u.a.setOpacity(this.page.intro, 0);
			}

			this.play({"from":this._to,"to":this._from});
		}

		page.intro.sequence_player.loaded = function() {
//			u.bug("sequence loaded")

			// show intro
			u.as(this.page.intro, "display", "block");

			// show page
			this.page.ready();
		}

		if(u.qs(".warning")) {
			// load intro - but wait for warning to clear
			page.intro.sequence_player.load(page.intro._images, {"framerate":24});
		}
		else if(u.qs(".desktop_wrapper")) {
			// load and play intro
			page.intro.sequence_player.loadAndPlay(page.intro._images, {"framerate":24});
		}
		// mobile browser mode
		else if(!navigator.standalone) {

			// show bookmark screen
			var repeat = u.getCookie("bookmark");
			if(repeat && Number(repeat)%5 == 0) {
				// load intro - but wait for bookmark sceen to clear
				u.ac(document.body, "bookmark");
				page.bookmark = u.ae(document.body, "div", {"class":"bookmark"});
				page.bookmark.moved = function(event) {
					u.e.resetEvents(this);
				}
				page.bookmark.clicked = function() {
					this.bookmark = false;
					this.parentNode.removeChild(this);
					u.qs("#page").intro.sequence_player.play();
					u.rc(document.body, "bookmark");
				}
				u.e.click(page.bookmark);
				page.bookmark.resized = function() {
//					u.bug("bookmark resized")
					u.a.setHeight(this, page.offsetHeight);
				}

				u.ae(page.bookmark, "h1", {"html":"Install this App"});
				u.ae(page.bookmark, "h2", {"html":"Or tap to continue"});
				u.ae(page.bookmark, "P", {"html":"Tap &quot;Add to homesceen&quot; to install this app on your phone."});

				page.intro.sequence_player.load(page.intro._images, {"framerate":24});
			}
			else {
				// load and play intro
				page.intro.sequence_player.loadAndPlay(page.intro._images, {"framerate":24});
			}

			u.saveCookie("bookmark", repeat ? ++repeat : 1)
		}
		// app mode
		else {
			u.ac(document.body, "standalone");
			// load and play intro
			page.intro.sequence_player.loadAndPlay(page.intro._images, {"framerate":24});
		}


	}
}


// Controlled initialization
function static_init() {

	// wrap page if segment dictates
	if(typeof(u.o.validdevice) == "object") {
		u.o.validdevice.init(document.body)
	}

	u.o.page.init(u.qs("#page"));
}

u.e.addDOMReadyEvent(static_init);
//u.e.addOnloadEvent(static_init);
