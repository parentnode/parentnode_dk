Util.Objects["gallery"] = new function() {
	this.init = function(list) {
		var i, node;





		// add next/prev links
		var gallery = u.wrapElement(list, "div", {"class":"gallery"});

		gallery.list = list;
		gallery.t_loading = false;

		gallery.transition_type = "ease-out";
		gallery.transition_time = 0.6; // in seconds

//		u.bug("gallery.offsetWidth:" + gallery.offsetWidth);
		gallery.gallery_width = gallery.offsetWidth;
		gallery.image_width = gallery.list.offsetWidth;

		gallery.bn_next = u.ae(gallery, "div", {"class":"next"});
		gallery.bn_next.gallery = gallery;
		u.e.click(gallery.bn_next);
		gallery.bn_next.clicked = function(event) {
			this.gallery.selectNode(this.gallery.selected_node.i+1);
		}

		gallery.bn_prev = u.ae(gallery, "div", {"class":"prev"});
		gallery.bn_prev.gallery = gallery;
		u.e.click(gallery.bn_prev);
		gallery.bn_prev.clicked = function(event) {
			this.gallery.selectNode(this.gallery.selected_node.i-1);
		}

		// load all nodes on init

		// swipe
		// place next node correctly
		// drag selected_node and next node at the same time - next node is decided based on drag position
		// on drop - move selected_node and next node at the same time to end state
		// callback to scene update

		// click
		// place next node correctly
		// move selected_node and next node at the same time to end state
		// callback to scene update (to set )

		gallery.showLoading = function() {
			u.ac(this, "loading");
		}

		gallery.loading = function() {
			this.t_loading = u.t.setTimer(this, this.showLoading, 1000);
		}

		gallery.loaded = function() {
			u.t.resetTimer(this.t_loading);
			u.rc(this, "loading");
		}

		// set up carousel

		gallery._ready = function() {
			if(this.nodes.length == u.qsa("li.ready", this).length) {

				this.loaded();

				// add touch event
//				if(u.e.event_pref == "touch") {
					u.e.swipe(this, this, {"show_bounds":false, "horizontal_lock":true});

					this.picked = function(event) {
//						u.bug("picked gallery")

						// get prev and next node

						this.prev_node = this.selected_node.i-1 < 0 ? this.nodes[this.nodes.length-1] : this.nodes[this.selected_node.i-1];
						this.next_node = this.selected_node.i+1 >= this.nodes.length ? this.nodes[0] : this.nodes[this.selected_node.i+1];

						// no transitions on drag
						u.a.transition(this.prev_node, "none");
						u.a.transition(this.selected_node, "none");
						u.a.transition(this.next_node, "none");

						// position nodes for drag
						u.a.translate(this.prev_node, -(this.image_width), 0);
						u.a.translate(this.next_node, (this.image_width), 0);
					}

					this.moved = function(event) {
//						u.bug("moved gallery:" + this.current_x);

						// only drag the required nodes to maintain full visual effect with least resources
						// prev node in view
						if(this.current_x > 0) {
//							u.bug("move prev:")
							u.a.translate(this.prev_node, (this.current_x-this.image_width), 0);
						}
						// if out of view, but not cleared yet, clear 
						else if(this.prev_node._x > -(this.image_width)) {
							u.a.translate(this.prev_node, -(this.image_width), 0);
						}

						u.a.translate(this.selected_node, this.current_x, 0);

						// next node in view
						if(this.current_x < 0) {
							u.a.translate(this.next_node, (this.current_x+this.image_width), 0);
						}
						// if out of view, but not cleared yet, clear 
						else if(this.next_node._x < (this.image_width)) {
							u.a.translate(this.next_node, (this.image_width), 0);
						}
					}

					this.dropped = function(event) {
//						u.bug("dropped gallery");

						// no direction on exit (but movement - to be sure it is not just a click) - go back
						// the rest will be handled by the swipeHandlers and selectNode
						if(!this.swiped && this.selected_node._x != 0) {
//							u.bug("dropped without swipe:" + this.swiped + "," + this.selected_node._x);

							var duration = this.transition_time / (this.image_width / this.current_x);

							u.a.transition(this.prev_node, "all " + duration + "s " + this.transition_type);
							u.a.transition(this.selected_node, "all " + duration + "s " + this.transition_type);
							u.a.transition(this.next_node, "all " + duration + "s " + this.transition_type);

							u.a.translate(this.prev_node, -(this.image_width), 0);
							u.a.translate(this.selected_node, 0, 0);
							u.a.translate(this.next_node, (this.image_width), 0);
						}


					}
					this.swipedDown = this.swipedUp = function(event) {
						this.swiped = false;
					}

					this.swipedLeft = function(event) {
//						u.bug("swipedLeft:" + this.selected_node._x);
						// only swipe to next if position and swipe-direction says the same
						if(this.selected_node._x < 0) {
							this.selectNode(this.selected_node.i+1);
						}
						else {
							this.swiped = false;
						}
					}
					this.swipedRight = function(event) {
//						u.bug("swipedRight:" + this.selected_node._x);
						// only swipe to next if position and swipe-direction says the same
						if(this.selected_node._x > 0) {
							this.selectNode(this.selected_node.i-1);
						}
						else {
							this.swiped = false;
						}
					}
				//}

				if(typeof(this.ready) == "function") {
					this.ready();
				}
			}
		}

		// load node bg - all nodes are loaded on init
		gallery.nodeLoad = function(node) {
//			u.bug("nodeLoad:" + u.nodeId(node, 1));


			// load node background
			if(!node.initialized) {
				node.initialized = true;

				// load bg
				node.loaded = function(queue) {
					u.as(this, "backgroundImage", "url("+queue[0]._image.src+")");

					// default hide all stories, by placing them out of sight
					// make sure they are displayed block, so calculations 
					u.a.transition(this, "none");
					u.a.translate(this, this.gallery.image_width, 0);
					u.as(this, "display", "block");


					u.ac(this, "ready");

					// callback to _ready controller (will monitor if all nodes are ready)
					this.gallery._ready();
				}
				u.preloader(node, ["/images/"+u.cv(node, "id")+"/"+this.image_width+"x.jpg"]);
			}
			else {
				this.gallery._ready();
			}

		}

		// set selected image
		gallery.selectNode = function(index, static_update) {
//			u.bug("gallery.selectNode:" + u.nodeId(this,1) + ":" + index + ":" + static_update)

			// if no selected_node - fresh start, prepare page for initial viewing
			if(!this.selected_node) {
//				u.bug("initial setup")

				// set selected node
				this.selected_node = this.nodes[index];
//				this.selected_index = this.selected_node.i;

				// position node correctly, ready to fade up
				u.a.transition(this.selected_node, "none");
				u.a.setOpacity(this.selected_node, 0);
				u.a.translate(this.selected_node, 0, 0);

//				u.bug("this.selected_node:" + u.nodeId(this.selected_node) + ":" + this.selected_node._x);

				// fade up
				u.a.transition(this.selected_node, "all 1s ease-in");
				u.a.setOpacity(this.selected_node, 1);

			}
			// we already have a node shown
			// needs to handle both swipe and click selects, so needs to be able to move correctly from current position
			else {

				// already shown node
				var org_node = this.selected_node;

				// what is exit direction - always 1 (left) or -1 (right)
				this.direction = (index - org_node.i) > 0 ? 1 : -1;

				// correct index
				if(index < 0) {
					index = this.nodes.length-1;
				}
				else if(index >= this.nodes.length) {
					index = 0;
				}

				// set new selected node
				this.selected_node = this.nodes[index];

// 				// org node exited
// 				this.selected_node.transitioned = function(event) {
//					u.bug("node exited")
// 
// 					this.transitioned = null;
// 					u.a.transition(this, "none");
// 				}

				// hard update - no transitions 
				// (when doing updates while hidden, IE when gallery is in fullscreen mode and index in page below needs updating)
				if(static_update) {
					u.a.transition(org_node, "none");
					u.a.transition(this.selected_node, "none");

				}
				else if(this.swiped) {
					// calculate time based on remaining distance

					var duration;
					// adjust for speed, best visual correction
					if(this.current_xps) {
				 		duration = ((this.image_width / Math.abs(this.current_xps)) * this.transition_time);
						duration = duration > this.transition_time ? this.transition_time : duration;
					}
					// adjust for time
					else {
						duration = this.transition_time / (1 - Math.abs(this.current_x / this.image_width));
					}


					duration = (duration > 1.5) ? 1.5 : ((duration < 0.2) ? 0.2 : duration);
//					u.bug("duration:" + duration)


					u.a.transition(org_node, "all " + duration + "s " + this.transition_type);
					u.a.transition(this.selected_node, "all " + duration + "s " + this.transition_type);
					
				}
				else {
					// get selected node ready for entering
					u.a.transition(this.selected_node, "none");
					u.a.translate(this.selected_node, this.image_width*this.direction, 0);

					// selected_node and org_node move transition
					u.a.transition(org_node, "all " + this.transition_time + "s " + this.transition_type);
					u.a.transition(this.selected_node, "all " + this.transition_time + "s " + this.transition_type);
				}

				u.a.translate(org_node, -(this.image_width*this.direction), 0);
				u.a.translate(this.selected_node, 0, 0);

			}

			// callback 
			if(typeof(this.nodeSelected) == "function") {
				this.nodeSelected();
			}

		}


		gallery.nodes = u.qsa("li", list);

		gallery.loading();

		// loop through nodes for initial setup
		for(i = 0; node = gallery.nodes[i]; i++) {
			node.gallery = gallery;
			node.i = i;


			// load node
			gallery.nodeLoad(node);
		}


		return gallery;
	}
}