Util.Objects["articleList"] = new function() {
	this.init = function(list) {

		u.bug("articleList")

		list.articles = u.qsa("li.article", list);

		var i, node;
		for(i = 0; node = list.articles[i]; i++) {

			var header = u.qs("h3", node);

			node.readstate = u.cv(node, "readstate");
			u.bug("articleList:" + node.readstate)
			if(node.readstate) {
				u.addCheckmark(node);
				u.as(node.checkmark, "top", (header.offsetTop + 3) + "px");
			}

		}

	}
}
