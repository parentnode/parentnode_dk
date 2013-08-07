Util.Objects["validdevice"] = new function() {
	this.init = function(e) {

		e.innerHTML = "";
		u.ae(e, "div", {"class":"error"}).innerHTML = "<p>This site is designed for iPad. Your browser is too old to display the site properly. Please try using Chrome or Safari.</p>"
	}
}

window.onload = u.init;