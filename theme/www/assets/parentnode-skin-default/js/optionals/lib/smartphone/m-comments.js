Util.Modules["comments"] = new function() {
	this.init = function(div) {
		// u.bug("comment init:", div);


		div.item_id = u.cv(div, "item_id");

		div.list = u.qs("ul.comments", div);
		div.comments = u.qsa("li.comment", div.list);


		// comment initialization (still not doing anything)
		div.initComment = function(node) {

			node.div = this;

		}


		// Add comment form
		div.form_comment = u.qs("form.add", div);
		if(div.form_comment) {

			div.form_comment.div = div;

			u.f.init(div.form_comment);

			// handle form submit
			div.form_comment.submitted = function() {

				this.response = function(response) {

					if(response.cms_status == "success" && response.cms_object) {

						if(!this.div.list) {
							var p = u.qs("p", this.div);
							if(p) {
								p.parentNode.removeChild(p);
							}
							this.div.list = u.ie(this.div, "ul", {"class":"comments"});
							this.div.insertBefore(this.div.list, this.div.actions);
						}

						var comment_li = u.ae(this.div.list, "li", {"class":"comment comment_id:"+response.cms_object["id"]});
						var info = u.ae(comment_li, "ul", {"class":"info"});
						u.ae(info, "li", {"class":"created_at", "html":response.cms_object["created_at"]});
						u.ae(info, "li", {"class":"author", "html":response.cms_object["nickname"]});
						u.ae(comment_li, "p", {"class":"comment", "html":response.cms_object["comment"]})

						this.div.initComment(comment_li);

						// return form to original state
						this.actions["cancel"].clicked();
					}
				}
				u.request(this, this.action, {"method":"post", "data":this.getData()});

			}

			div.field_comment = div.form_comment.inputs["item_comment"].field;

			div.bn_comment = div.form_comment.actions["submit"];
			if(div.bn_comment) {

				div.bn_comment.div = div;

				u.ce(div.bn_comment);
				div.bn_comment.clicked = function(event) {
					if(!this.div.is_active) {
						u.e.kill(event);
						this.div.is_active = true;

						u.ass(this.div.field_comment, {
							"display": this.div.field_comment.default_display,
						});
						u.ass(this.div.bn_cancel, {
							"display": this.div.bn_cancel.default_display,
						});

					}
					else {
						this._form.submit();
					}

				}
			}


			div.bn_cancel = div.form_comment.actions["cancel"];
			if(div.bn_cancel) {

				div.bn_cancel.div = div;

				u.ce(div.bn_cancel);
				div.bn_cancel.clicked = function() {
					this.div.is_active = false;
					this._form.reset();

					u.ass(this.div.field_comment, {
						"display": "none",
					});
					u.ass(this.div.bn_cancel, {
						"display": "none",
					});
				}

			}


			div.field_comment.default_display = u.gcs(div.field_comment, "display");
			div.bn_cancel.default_display = u.gcs(div.bn_cancel, "display");

			u.ass(div.field_comment, {
				"display": "none",
			});
			u.ass(div.bn_cancel, {
				"display": "none",
			});
		}


		// initalize existing comments
		var i, node;
		for(i = 0; node = div.comments[i]; i++) {
			div.initComment(node);
		}

	}
}
