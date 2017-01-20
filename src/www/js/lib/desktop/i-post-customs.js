Util.Objects["ubuntuSetupPost"] = new function() {
	this.init = function(post) {

		var extension_start = u.qs(".extension_start", post);

		var form = u.f.addForm(post, {"class":"labelstyle:inject"});
		var extension_text = u.ae(form, "p", {"html":"To make the following commands C/P ready, you can enter your information here:"});

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