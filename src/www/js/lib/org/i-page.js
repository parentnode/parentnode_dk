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

			// content reference
			page.cN = u.qs("#content");

			// navigation reference
			page.nN = u.qs("#navigation");

			// footer reference
			page.fN = u.qs("#footer");

		}

	}
}


u.e.addDOMReadyEvent(u.init);
//u.e.addOnloadEvent(static_init);
