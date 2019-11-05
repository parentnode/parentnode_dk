Util.Objects["demos"] = new function() {
	this.init = function(demos) {

		// Insert DIV with form field 
		var div_demos = u.qs("div.articlebody.demos");
		var div_filter = u.ie(div_demos, "div");
		var form_filter = Util.Form.addForm(div_filter, {
		});
		var fieldset_filter = u.f.addFieldset(form_filter);
		var field_filter = u.f.addField(fieldset_filter, {
			"name":"filter",
			"label":"Filter",
			"hint_message":"Here's a hint"
		});
		var action_filter = u.f.addAction(form_filter, {
			"value":"Filter",
			"class":"button primary",
		})
		u.f.init(form_filter);
		form_filter.submitted = function() {
			
		};
		field_filter.updated = function() {
			if (field_filter._input.val().length >= 3) {
				console.log("hej");
			}
		}

		
		//Create global and local tag arrays
		var demos = u.qsa("div.demos li.demo");
		var global_tags = [];
		
		for (i = 0; i < demos.length; i++) {
			var tag_containers = u.qsa("ul.tags li", demos[i]);	
			var local_tags = [];

			for (j = 0; j < tag_containers.length; j++) {
				var tag_text = u.text(tag_containers[j]);
				local_tags.push(tag_text);
				if(global_tags.indexOf(tag_text)===-1) {
					global_tags.push(tag_text);
				}
			}

			demos[i].local_tags = local_tags;
		}
		
		//Display global tag list beneath the search field
		if(global_tags.length > 0) {

			var global_tags_ul = u.ie(div_demos, "ul", {
				"class":"tags"
			})

			for (k = 0; k < global_tags.length; k++) {
				u.ie(global_tags_ul, "li", {
					"html":global_tags[k]
				})
			}
		}

	}
}