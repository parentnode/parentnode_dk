Util.Objects["validdevice"] = new function() {
	this.init = function(body) {

		u.rc(body, "i:validdevice");


		var wrapper = document.createElement("div");
		wrapper.className = "desktop_wrapper";

		var mask = document.createElement("div");
		mask.className = "desktop_mask";

		while(child = body.childNodes[0]) {
			mask.appendChild(child);
		}

		wrapper.appendChild(mask);
		body.appendChild(wrapper);

		var warning_displayed = u.getCookie("warning");

		if(!warning_displayed) {
			var warning = u.ae(body, "div", {"class":"warning"});
			warning.innerHTML = "<h1>Warning</h1><p>This site is designed for touch interaction - using a pointer such as a mouse or trackpad might have unitented side effects. Move the mouse slowly when dragging to minimize errors.</p><p>Click to continue.</p>"
			u.e.click(warning);
			warning.clicked = function(event) {
				this.parentNode.removeChild(this);
				u.saveCookie("warning", "true");

				u.qs("#page").intro.sequence_player.play();
			}
		}

	}
}
