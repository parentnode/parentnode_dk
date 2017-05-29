Util.Objects["ubuntuSetupPost"] = new function() {
	this.init = function(post) {

		var extension_start = u.qs(".extension_start", post);

		var form = u.f.addForm(post, {"class":"labelstyle:inject ubuntuSetupPost"});
		var extension_text = u.ae(form, "p", {"html":"To make the following commands C/P ready, enter your information here:"});

		var fieldset = u.f.addFieldset(form);
		u.f.addField(fieldset, {"label":"IP address", "name":"ip", "class":"ip_master"});
		u.f.addField(fieldset, {"label":"Username", "name":"username", "class":"username_master"});

		u.f.init(form);

		form.fields["ip"].ips = u.qsa("span.ip", post);
		form.fields["ip"].updated = function() {
			var i, ip;
			for(i = 0; ip = this.ips[i]; i++) {
				ip.innerHTML = this.val();
			}
		}

		form.fields["username"].usernames = u.qsa("span.username", post);
		form.fields["username"].updated = function() {
			var i, username;
			for(i = 0; username = this.usernames[i]; i++) {
				username.innerHTML = this.val();
			}
		}

		extension_start.parentNode.insertBefore(form, extension_start);

	}
}

Util.Objects["dynamicVariablesPost"] = new function() {
	this.init = function(post) {

		var extension_start = u.qs(".extension_start", post);

		var form = u.f.addForm(post, {"class":"labelstyle:inject dynamicVariablesPost"});
		var extension_text = u.ae(form, "p", {"html":"To make the following commands C/P ready, enter your information here:"});

		var fieldset = u.f.addFieldset(form);

		var var_names = {};
		var dyn_vars = u.qsa("span.dynvar");
		var i, dyn_var;
		for(i = 0; dyn_var = dyn_vars[i]; i++) {
			dyn_var.var_name = dyn_var.className.replace(/(dynvar|[ ])/g, "");
			if(!var_names[dyn_var.var_name]) {
				var_names[dyn_var.var_name] = u.f.addField(fieldset, {"label":dyn_var.innerHTML, "name":dyn_var.var_name, "class":dyn_var.var_name+"_master"});

			}
			
		}


		u.f.init(form);

		for(i = 0; dyn_var = dyn_vars[i]; i++) {

			form.fields[dyn_var.var_name].placeholders = u.qsa("span.dynvar."+dyn_var.var_name, post);
			form.fields[dyn_var.var_name].updated = function() {
				var i, placeholder;
				for(i = 0; placeholder = this.placeholders[i]; i++) {
					placeholder.innerHTML = this.val();
				}
			}
		}

		extension_start.parentNode.insertBefore(form, extension_start);

	}
}