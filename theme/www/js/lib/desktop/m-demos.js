Util.Modules["demos"] = new function() {
	this.init = function(scene) {
		// u.bug("scene init:", scene);

		scene.resized = function() {
			// u.bug("scene.resized:", this);

			if(this.div_filter) {
				this.filter_top = u.absY(this.div_filter);
			}
		}

		scene.scrolled = function() {
			// u.bug("scene.scrolled:", this);

			if(this.div_filter) {

				u.t.resetTimer(this.t_scroll);
				this.t_scroll = u.t.setTimer(this, this.scrollTimeout, 100);

				if(this.filter_top - 50 < page.scrolled_y) {

					if(!this.is_filter_faded) {
						u.ass(this.div_filter, {
							"transition": "opacity 0.3s linear",
							"opacity": 0
						});
						this.is_filter_faded = true;
					}

				}
				else {

					u.ass(this.div_filter, {
						"transform": "translate3d(0, 0, 0)",
						"transition": "opacity 0.2s linear",
						"opacity": 1
					});
					this.is_filter_faded = false;

				}

			}

		}

		scene.scrollTimeout = function() {

			if(this.filter_top - 50 < page.scrolled_y) {
				u.ass(this.div_filter, {
					"transform": "translate3d(0, "+ (page.scrolled_y - (this.filter_top - 50)) +"px, 0)",
				});
			}
			else {
				u.ass(this.div_filter, {
					"transform": "translate3d(0, 0, 0)",
				});
			}

			u.ass(this.div_filter, {
				"transition": "opacity 0.2s linear",
				"opacity": 1
			});
			this.is_filter_faded = false;

		}

		scene.ready = function() {
			// u.bug("scene.ready:", this);


			this.div_demos = u.qs("div.demos", this);
			if(this.div_demos) {

				this.tags = [];
				this.selected_tags = [];

				this.demos = u.qsa("li.demo", this);

				var i, demo, j, tag, tag_value;
				for(i = 0; i < this.demos.length; i++) {
					demo = this.demos[i];

					demo.tags = u.qsa("ul.tags li", demo);
					demo.tag_values = [];

					// u.bug(demo, demo.tags);

					for(j = 0; j < demo.tags.length; j++) {
						tag = demo.tags[j];
						tag_value = tag.innerHTML;

						demo.tag_values.push(tag_value);

						if(this.tags.indexOf(tag_value) === -1) {
							this.tags.push(tag_value);
						}

					}
				}


				// Do we have any tags to create tag filter
				if(this.tags.length) {
					this.div_filter = u.ie(this.div_demos, "div", {"class":"filter"});

					u.ae(this.div_filter, "p", {"html": "Select tags to filter demos by topics"});

					this.ul_tags = u.ae(this.div_filter, "ul", {"class":"all_tags"});
					for(i = 0; i < this.tags.length; i++) {
						tag_value = this.tags[i];
						tag = u.ae(this.ul_tags, "li", {"html":tag_value});
						tag.tag_value = tag_value;

						u.ce(tag);
						tag.div = this;
						tag.clicked = function() {
							
							if(this.div.selected_tags.indexOf(this.tag_value) === -1) {
								this.div.selected_tags.push(this.tag_value);
								u.ac(this, "selected");
							}
							else {
								this.div.selected_tags.splice(this.div.selected_tags.indexOf(this.tag_value), 1);
								u.rc(this, "selected");
							}

							this.div.filterTags();

						}
					}
					
				}

			}

			this.filterTags = function() {

				var i, demo, j, tag;
				for(i = 0; i < this.demos.length; i++) {
					demo = this.demos[i];

					// No tags selected
					if(this.selected_tags) {

						u.ass(demo, {
							"display": "block"
						});

						for(j = 0; j < this.selected_tags.length; j++) {
							tag = this.selected_tags[j];
							
							u.bug(demo.tag_values, tag);
							if(demo.tag_values.indexOf(tag) === -1) {
								u.ass(demo, {
									"display": "none"
								});
								break;
							}
						}

					}
					else {

						u.ass(demo, {
							"display": "block"
						});

					}
				}

				if(u.absY(this.div_demos)-50 < page.scrolled_y) {
					u.scrollTo(window, {node: this.div_demos, offset_y: 50});
				}

			}

			this.resized();

			u.showScene(this);

		}

		// Map scene – page will call scene.ready
		page.cN.scene = scene;

	}
}
