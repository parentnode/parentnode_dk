
/*seg_tablet.js*/
if(!u || !Util) {
	var u, Util = u = new function() {}
	u.version = 0.7;
	u.bug = function() {}
	u.stats = new function() {this.pageView = function(){};this.event = function(){};this.customVar = function(){}}
}
Util.debugURL = function(url) {
	if(u.bug_force) {
		return true;
	}
	return document.domain.match(/.local$/);
}
Util.nodeId = function(node, include_path) {
	try {
		if(!include_path) {
			return node.id ? node.nodeName+"#"+node.id : (node.className ? node.nodeName+"."+node.className : (node.name ? node.nodeName + "["+node.name+"]" : node.nodeName));
		}
		else {
			if(node.parentNode && node.parentNode.nodeName != "HTML") {
				return u.nodeId(node.parentNode, include_path) + "->" + u.nodeId(node);
			}
			else {
				return u.nodeId(node);
			}
		}
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.nodeId("+node+"), called from: "+arguments.callee.caller);
	}
	return "Unindentifiable node!";
}
Util.bug = function(message, corner, color) {
	if(u.debugURL()) {
		if(!u.bug_console_only) {
			var option, options = new Array([0, "auto", "auto", 0], [0, 0, "auto", "auto"], ["auto", 0, 0, "auto"], ["auto", "auto", 0, 0]);
			if(isNaN(corner)) {
				color = corner;
				corner = 0;
			}
			if(typeof(color) != "string") {
				color = "black";
			}
			option = options[corner];
			if(!u.qs("#debug_id_"+corner)) {
				var d_target = u.ae(document.body, "div", {"class":"debug_"+corner, "id":"debug_id_"+corner});
				d_target.style.position = u.bug_position ? u.bug_position : "absolute";
				d_target.style.zIndex = 16000;
				d_target.style.top = option[0];
				d_target.style.right = option[1];
				d_target.style.bottom = option[2];
				d_target.style.left = option[3];
				d_target.style.backgroundColor = u.bug_bg ? u.bug_bg : "#ffffff";
				d_target.style.color = "#000000";
				d_target.style.textAlign = "left";
				if(d_target.style.maxWidth) {
					d_target.style.maxWidth = u.bug_max_width ? u.bug_max_width+"px" : "auto";
				}
				d_target.style.padding = "3px";
			}
			if(typeof(message) != "string") {
				message = message.toString();
			}
			u.ae(u.qs("#debug_id_"+corner), "div", ({"style":"color: " + color})).innerHTML = message ? message.replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/&lt;br&gt;/g, "<br>") : "Util.bug with no message?";
		}
		if(typeof(console) == "object") {
			console.log(message);
		}
	}
}
Util.xInObject = function(object) {
	if(u.debugURL()) {
		var x, s = "--- start object ---<br>";
		for(x in object) {
			if(object[x] && typeof(object[x]) == "object" && typeof(object[x].nodeName) == "string") {
				s += x + "=" + object[x]+" -> " + u.nodeId(object[x], 1) + "<br>";
			}
			else if(object[x] && typeof(object[x]) == "function") {
				s += x + "=function<br>";
			}
			else {
				s += x + "=" + object[x]+"<br>";
			}
		}
		s += "--- end object ---"
		u.bug(s);
	}
}
Util.Animation = u.a = new function() {
	this.support3d = function() {
		if(this._support3d === undefined) {
			var node = document.createElement("div");
			try {
				var test = "translate3d(10px, 10px, 10px)";
				node.style[this.variant() + "Transform"] = test;
				if(node.style[this.variant() + "Transform"] == test) {
					this._support3d = true;
				}
				else {
					this._support3d = false;
				}
			}
			catch(exception) {
				this._support3d = false;
			}
		}
		return this._support3d;
	}
	this.variant = function() {
		if(this._variant === undefined) {
			if(document.body.style.webkitTransform != undefined) {
				this._variant = "webkit";
			}
			else if(document.body.style.MozTransform != undefined) {
				this._variant = "Moz";
			}
			else if(document.body.style.oTransform != undefined) {
				this._variant = "o";
			}
			else if(document.body.style.msTransform != undefined) {
				this._variant = "ms";
			}
			else {
				this._variant = "";
			}
		}
		return this._variant;
	}
	this.transition = function(node, transition) {
		try {
			node.style[this.variant() + "Transition"] = transition;
			if(this.variant() == "Moz") {
				u.e.addEvent(node, "transitionend", this._transitioned);
			}
			else {
				u.e.addEvent(node, this.variant() + "TransitionEnd", this._transitioned);
			}
			var duration = transition.match(/[0-9.]+[ms]+/g);
			if(duration) {
				node.duration = duration[0].match("ms") ? parseFloat(duration[0]) : (parseFloat(duration[0]) * 1000);
			}
			else {
				node.duration = false;
			}
		}
		catch(exception) {
			u.bug("Exception ("+exception+") in u.a.transition(" + u.nodeId(node) + "), called from: "+arguments.callee.caller);
		}
	}
	this._transitioned = function(event) {
		if(event.target == this && typeof(this.transitioned) == "function") {
			this.transitioned(event);
		}
	}
	this.translate = function(node, x, y) {
		if(this.support3d()) {
			node.style[this.variant() + "Transform"] = "translate3d("+x+"px, "+y+"px, 0)";
		}
		else {
			node.style[this.variant() + "Transform"] = "translate("+x+"px, "+y+"px)";
		}
		node._x = x;
		node._y = y;
		node.offsetHeight;
	}
	this.rotate = function(node, deg) {
		node.style[this.variant() + "Transform"] = "rotate("+deg+"deg)";
		node._rotation = deg;
		node.offsetHeight;
	}
	this.scale = function(node, scale) {
		node.style[this.variant() + "Transform"] = "scale("+scale+")";
		node._scale = scale;
		node.offsetHeight;
	}
	this.setOpacity = function(node, opacity) {
		node.style.opacity = opacity;
		node._opacity = opacity;
		node.offsetHeight;
	}
	this.setWidth = function(node, width) {
		width = width.toString().match(/\%|auto|px/) ? width : (width + "px");
		node.style.width = width;
		node._width = width;
		node.offsetHeight;
	}
	this.setHeight = function(node, height) {
		height = height.toString().match(/\%|auto|px/) ? height : (height + "px");
		node.style.height = height;
		node._height = height;
		node.offsetHeight;
	}
	this.setBgPos = function(node, x, y) {
		x = x.toString().match(/\%|auto|px|center|top|left|bottom|right/) ? x : (x + "px");
		y = y.toString().match(/\%|auto|px|center|top|left|bottom|right/) ? y : (y + "px");
		node.style.backgroundPosition = x + " " + y;
		node._bg_x = x;
		node._bg_y = y;
		node.offsetHeight;
	}
	this.setBgColor = function(node, color) {
		node.style.backgroundColor = color;
		node._bg_color = color;
		node.offsetHeight;
	}
}
Util.saveCookie = function(name, value, options) {
	expiry = false;
	path = false;
	if(typeof(options) == "object") {
		var argument;
		for(argument in options) {
			switch(argument) {
				case "expiry"	: expiry	= (typeof(options[argument]) == "string" ? options[argument] : "Mon, 04-Apr-2020 05:00:00 GMT"); break;
				case "path"		: path		= options[argument]; break;
			}
		}
	}
	document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) +";" + (path ? "path="+path+";" : "") + (expiry ? "expires="+expiry+";" : "")
}
Util.getCookie = function(name) {
	var matches;
	return (matches = document.cookie.match(encodeURIComponent(name) + "=([^;]+)")) ? decodeURIComponent(matches[1]) : false;
}
Util.deleteCookie = function(name, options) {
	path = false;
	if(typeof(options) == "object") {
		var argument;
		for(argument in options) {
			switch(argument) {
				case "path"	: path	= options[argument]; break;
			}
		}
	}
	document.cookie = encodeURIComponent(name) + "=;" + (path ? "path="+path+";" : "") + "expires=Thu, 01-Jan-70 00:00:01 GMT";
}
Util.saveNodeCookie = function(node, name, value) {
	var ref = u.cookieReference(node);
	var mem = JSON.parse(u.getCookie("jes_mem"));
	if(!mem) {
		mem = {};
	}
	if(!mem[ref]) {
		mem[ref] = {};
	}
	mem[ref][name] = (value !== false && value !== undefined) ? value : "";
	u.saveCookie("jes_mem", JSON.stringify(mem), {"path":"/"});
}
Util.getNodeCookie = function(node, name) {
	var ref = u.cookieReference(node);
	var mem = JSON.parse(u.getCookie("jes_mem"));
	if(mem && mem[ref]) {
		if(name) {
			return mem[ref][name] ? mem[ref][name] : "";
		}
		else {
			return mem[ref];
		}
	}
	return false;
}
Util.deleteNodeCookie = function(node, name) {
	var ref = u.cookieReference(node);
	var mem = JSON.parse(u.getCookie("jes_mem"));
	if(mem && mem[ref]) {
		if(name) {
			delete mem[ref][name];
		}
		else {
			delete mem[ref];
		}
	}
	u.saveCookie("jes_mem", JSON.stringify(mem), {"path":"/"});
}
Util.cookieReference = function(node) {
	var ref;
	if(node.id) {
		ref = node.nodeName + "#" + node.id;
	}
	else {
		var id_node = node;
		while(!id_node.id) {
			id_node = id_node.parentNode;
		}
		if(id_node.id) {
			ref = id_node.nodeName + "#"+id_node.id + " " + (node.name ? (node.nodeName + "["+node.name+"]") : (node.className ? (node.nodeName+"."+node.className) : node.nodeName));
		}
	}
	return ref;
}
Util.date = function(format, timestamp, months) {
	var date = timestamp ? new Date(timestamp) : new Date();
	if(isNaN(date.getTime())) {
		if(!timestamp.match(/[A-Z]{3}\+[0-9]{4}/)) {
			if(timestamp.match(/ \+[0-9]{4}/)) {
				date = new Date(timestamp.replace(/ (\+[0-9]{4})/, " GMT$1"));
			}
		}
		if(isNaN(date.getTime())) {
			date = new Date();
		}
	}
	var tokens = /d|j|m|n|F|Y|G|H|i|s/g;
	var chars = new Object();
	chars.j = date.getDate();
	chars.d = (chars.j > 9 ? "" : "0") + chars.j;
	chars.n = date.getMonth()+1;
	chars.m = (chars.n > 9 ? "" : "0") + chars.n;
	chars.F = months ? months[date.getMonth()] : "";
	chars.Y = date.getFullYear();
	chars.G = date.getHours();
	chars.H = (chars.G > 9 ? "" : "0") + chars.G;
	var i = date.getMinutes();
	chars.i = (i > 9 ? "" : "0") + i;
	var s = date.getSeconds();
	chars.s = (s > 9 ? "" : "0") + s;
	return format.replace(tokens, function (_) {
		return _ in chars ? chars[_] : _.slice(1, _.length - 1);
	});
};
Util.querySelector = u.qs = function(query, scope) {
	scope = scope ? scope : document;
	return scope.querySelector(query);
}
Util.querySelectorAll = u.qsa = function(query, scope) {
	scope = scope ? scope : document;
	return scope.querySelectorAll(query);
}
Util.getElement = u.ge = function(identifier, scope) {
	var node, i, regexp;
	if(document.getElementById(identifier)) {
		return document.getElementById(identifier);
	}
	scope = scope ? scope : document;
	regexp = new RegExp("(^|\\s)" + identifier + "(\\s|$|\:)");
	for(i = 0; node = scope.getElementsByTagName("*")[i]; i++) {
		if(regexp.test(node.className)) {
			return node;
		}
	}
	return scope.getElementsByTagName(identifier).length ? scope.getElementsByTagName(identifier)[0] : false;
}
Util.getElements = u.ges = function(identifier, scope) {
	var node, i, regexp;
	var nodes = new Array();
	scope = scope ? scope : document;
	regexp = new RegExp("(^|\\s)" + identifier + "(\\s|$|\:)");
	for(i = 0; node = scope.getElementsByTagName("*")[i]; i++) {
		if(regexp.test(node.className)) {
			nodes.push(node);
		}
	}
	return nodes.length ? nodes : scope.getElementsByTagName(identifier);
}
Util.parentNode = u.pn = function(node, node_type) {
	if(node_type) {
		if(node.parentNode) {
			var parent = node.parentNode;
		}
		while(parent.nodeName.toLowerCase() != node_type.toLowerCase()) {
			if(parent.parentNode) {
				parent = parent.parentNode;
			}
			else {
				return false;
			}
		}
		return parent;
	}
	else {
		return node.parentNode;
	}
}
Util.previousSibling = u.ps = function(node, exclude) {
	node = node.previousSibling;
	while(node && (node.nodeType == 3 || node.nodeType == 8 || exclude && (u.hc(node, exclude) || node.nodeName.toLowerCase().match(exclude)))) {
		node = node.previousSibling;
	}
	return node;
}
Util.nextSibling = u.ns = function(node, exclude) {
	node = node.nextSibling;
	while(node && (node.nodeType == 3 || node.nodeType == 8 || exclude && (u.hc(node, exclude) || node.nodeName.toLowerCase().match(exclude)))) {
		node = node.nextSibling;
	}
	return node;
}
Util.childNodes = u.cn = function(node, exclude) {
	var i, child;
	var children = new Array();
	for(i = 0; child = node.childNodes[i]; i++) {
		if(child && child.nodeType != 3 && child.nodeType != 8 && (!exclude || (!u.hc(child, exclude) && !child.nodeName.toLowerCase().match(exclude) ))) {
			children.push(child);
		}
	}
	return children;
}
Util.appendElement = u.ae = function(parent, node_type, attributes) {
	try {
		var node = (typeof(node_type) == "object") ? node_type : document.createElement(node_type);
		node = parent.appendChild(node);
		if(attributes) {
			var attribute;
			for(attribute in attributes) {
				if(attribute == "html") {
					node.innerHTML = attributes[attribute]
				}
				else {
					node.setAttribute(attribute, attributes[attribute]);
				}
			}
		}
		return node;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.ae, called from: "+arguments.callee.caller.name);
		u.bug("node:" + u.nodeId(parent, 1));
		u.xInObject(attributes);
	}
	return false;
}
Util.insertElement = u.ie = function(parent, node_type, attributes) {
	try {
		var node = (typeof(node_type) == "object") ? node_type : document.createElement(node_type);
		node = parent.insertBefore(node, parent.firstChild);
		if(attributes) {
			var attribute;
			for(attribute in attributes) {
				if(attribute == "html") {
					node.innerHTML = attributes[attribute];
				}
				else {
					node.setAttribute(attribute, attributes[attribute]);
				}
			}
		}
		return node;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.ie, called from: "+arguments.callee.caller);
		u.bug("node:" + u.nodeId(parent, 1));
		u.xInObject(attributes);
	}
	return false;
}
Util.wrapElement = u.we = function(node, node_type, attributes) {
	try {
		var wrapper_node = node.parentNode.insertBefore(document.createElement(node_type), node);
		if(attributes) {
			var attribute;
			for(attribute in attributes) {
				wrapper_node.setAttribute(attribute, attributes[attribute]);
			}
		}	
		wrapper_node.appendChild(node);
		return wrapper_node;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.we, called from: "+arguments.callee.caller);
		u.bug("node:" + u.nodeId(node, 1));
		u.xInObject(attributes);
	}
	return false;
}
Util.textContent = u.text = function(node) {
	return node.textContent;
}
Util.clickableElement = u.ce = function(node) {
	var a = (node.nodeName.toLowerCase() == "a" ? node : u.qs("a", node));
	if(a) {
		u.ac(node, "link");
		if(a.getAttribute("href") !== null) {
			node.url = a.href;
			a.removeAttribute("href");
		}
	}
	if(typeof(u.e.click) == "function") {
		u.e.click(node);
	}
	return node;
}
u.link = u.ce;
Util.classVar = u.cv = function(node, var_name) {
	try {
		var regexp = new RegExp(var_name + ":[?=\\w/\\#~:.?+=?&%@!\\-]*");
		if(node.className.match(regexp)) {
			return node.className.match(regexp)[0].replace(var_name + ":", "");
		}
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.cv, called from: "+arguments.callee.caller);
	}
	return false;
}
u.getIJ = u.cv;
Util.setClass = u.sc = function(node, classname) {
	try {
		var old_class = node.className;
		node.className = classname;
		node.offsetTop;
		return old_class;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.setClass, called from: "+arguments.callee.caller);
	}
	return false;
}
Util.hasClass = u.hc = function(node, classname) {
	try {
		if(classname) {
			var regexp = new RegExp("(^|\\s)(" + classname + ")(\\s|$)");
			if(regexp.test(node.className)) {
				return true;
			}
		}
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.hasClass("+u.nodeId(node)+"), called from: "+arguments.callee.caller);
	}
	return false;
}
Util.addClass = u.ac = function(node, classname, dom_update) {
	try {
		if(classname) {
			var regexp = new RegExp("(^|\\s)" + classname + "(\\s|$)");
			if(!regexp.test(node.className)) {
				node.className += node.className ? " " + classname : classname;
				dom_update === false ? false : node.offsetTop;
			}
			return node.className;
		}
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.addClass, called from: "+arguments.callee.caller);
	}
	return false;
}
Util.removeClass = u.rc = function(node, classname, dom_update) {
	try {
		if(classname) {
			var regexp = new RegExp("(\\b)" + classname + "(\\s|$)", "g");
			node.className = node.className.replace(regexp, " ").trim().replace(/[\s]{2}/g, " ");
			dom_update === false ? false : node.offsetTop;
			return node.className;
		}
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.removeClass, called from: "+arguments.callee.caller);
	}
	return false;
}
Util.toggleClass = u.tc = function(node, classname, _classname, dom_update) {
	try {
		var regexp = new RegExp("(^|\\s)" + classname + "(\\s|$|\:)");
		if(regexp.test(node.className)) {
			u.rc(node, classname, false);
			if(_classname) {
				u.ac(node, _classname, false);
			}
		}
		else {
			u.ac(node, classname, false);
			if(_classname) {
				u.rc(node, _classname, false);
			}
		}
		dom_update === false ? false : node.offsetTop;
		return node.className;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.toggleClass, called from: "+arguments.callee.caller);
	}
	return false;
}
Util.applyStyle = u.as = function(node, property, value, dom_update) {
	try {
		node.style[property] = value;
		dom_update === false ? false : node.offsetTop;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.applyStyle("+u.nodeId(node)+", "+property+", "+value+") called from: "+arguments.callee.caller);
	}
}
Util.getComputedStyle = u.gcs = function(node, property) {
	node.offsetHeight;
	if(document.defaultView && document.defaultView.getComputedStyle) {
		return document.defaultView.getComputedStyle(node, null).getPropertyValue(property);
	}
	return false;
}
Util.hasFixedParent = u.hfp = function(node) {
	while(node.nodeName.toLowerCase() != "body") {
		if(u.gcs(node.parentNode, "position").match("fixed")) {
			return true;
		}
		node = node.parentNode;
	}
	return false;
}
Util.Events = u.e = new function() {
	this.event_pref = typeof(document.ontouchmove) == "undefined" ? "mouse" : "touch";
	this.kill = function(event) {
		if(event) {
			event.preventDefault();
			event.stopPropagation();
		}
	}
	this.addEvent = function(node, type, action) {
		try {
			node.addEventListener(type, action, false);
		}
		catch(exception) {
			alert("exception in addEvent:" + node + "," + type + ":" + exception);
		}
	}
	this.removeEvent = function(node, type, action) {
		try {
			node.removeEventListener(type, action, false);
		}
		catch(exception) {
			u.bug("exception in removeEvent:" + node + "," + type + ":" + exception);
		}
	}
	this.addStartEvent = this.addDownEvent = function(node, action) {
		u.e.addEvent(node, (this.event_pref == "touch" ? "touchstart" : "mousedown"), action);
	}
	this.removeStartEvent = this.removeDownEvent = function(node, action) {
		u.e.removeEvent(node, (this.event_pref == "touch" ? "touchstart" : "mousedown"), action);
	}
	this.addMoveEvent = function(node, action) {
		u.e.addEvent(node, (this.event_pref == "touch" ? "touchmove" : "mousemove"), action);
	}
	this.removeMoveEvent = function(node, action) {
		u.e.removeEvent(node, (this.event_pref == "touch" ? "touchmove" : "mousemove"), action);
	}
	this.addEndEvent = this.addUpEvent = function(node, action) {
		u.e.addEvent(node, (this.event_pref == "touch" ? "touchend" : "mouseup"), action);
		if(node.snapback && u.e.event_pref == "mouse") {
			u.e.addEvent(node, "mouseout", this._snapback);
		}
	}
	this.removeEndEvent = this.removeUpEvent = function(node, action) {
		u.e.removeEvent(node, (this.event_pref == "touch" ? "touchend" : "mouseup"), action);
		if(node.snapback && u.e.event_pref == "mouse") {
			u.e.removeEvent(node, "mouseout", this._snapback);
		}
	}
	this.resetClickEvents = function(node) {
		u.t.resetTimer(node.t_held);
		u.t.resetTimer(node.t_clicked);
		this.removeEvent(node, "mouseup", this._dblclicked);
		this.removeEvent(node, "touchend", this._dblclicked);
		this.removeEvent(node, "mousemove", this._clickCancel);
		this.removeEvent(node, "touchmove", this._clickCancel);
		this.removeEvent(node, "mousemove", this._move);
		this.removeEvent(node, "touchmove", this._move);
	}
	this.resetEvents = function(node) {
		this.resetClickEvents(node);
		if(typeof(this.resetDragEvents) == "function") {
			this.resetDragEvents(node);
		}
	}
	this.resetNestedEvents = function(node) {
		while(node && node.nodeName != "HTML") {
			this.resetEvents(node);
			node = node.parentNode;
		}
	}
	this._inputStart = function(event) {
		this.event_var = event;
		this.input_timestamp = event.timeStamp;
		this.start_event_x = u.eventX(event);
		this.start_event_y = u.eventY(event);
		this.current_xps = 0;
		this.current_yps = 0;
		this.swiped = false;
		if(this.e_click || this.e_dblclick || this.e_hold) {
			var node = this;
			while(node) {
				if(node.e_drag || node.e_swipe) {
					u.e.addMoveEvent(this, u.e._cancelClick);
					break;
				}
				else {
					node = node.parentNode;
				}
			}
			u.e.addMoveEvent(this, u.e._move);
			u.e.addEndEvent(this, u.e._dblclicked);
			if(u.e.event_pref == "mouse") {
				u.e.addEvent(this, "mouseout", u.e._cancelClick);
			}
		}
		if(this.e_hold) {
			this.t_held = u.t.setTimer(this, u.e._held, 750);
		}
		if(this.e_drag || this.e_swipe) {
			u.e.addMoveEvent(this, u.e._pick);
			u.e.addEndEvent(this, u.e._drop);
		}
		if(this.e_scroll) {
			u.e.addMoveEvent(this, u.e._scrollStart);
			u.e.addEndEvent(this, u.e._scrollEnd);
		}
		if(typeof(this.inputStarted) == "function") {
			this.inputStarted(event);
		}
	}
	this._cancelClick = function(event) {
		u.e.resetClickEvents(this);
		if(typeof(this.clickCancelled) == "function") {
			this.clickCancelled(event);
		}
	}
	this._move = function(event) {
		if(typeof(this.moved) == "function") {
			this.moved(event);
		}
	}
	this.hold = function(node) {
		node.e_hold = true;
		u.e.addStartEvent(node, this._inputStart);
	}
	this._held = function(event) {
		u.stats.event(this, "held");
		u.e.resetNestedEvents(this);
		if(typeof(this.held) == "function") {
			this.held(event);
		}
	}
	this.click = this.tap = function(node) {
		node.e_click = true;
		u.e.addStartEvent(node, this._inputStart);
	}
	this._clicked = function(event) {
		u.stats.event(this, "clicked");
		u.e.resetNestedEvents(this);
		if(typeof(this.clicked) == "function") {
			this.clicked(event);
		}
	}
	this.dblclick = this.doubletap = function(node) {
		node.e_dblclick = true;
		u.e.addStartEvent(node, this._inputStart);
	}
	this._dblclicked = function(event) {
		if(u.t.valid(this.t_clicked) && event) {
			u.stats.event(this, "dblclicked");
			u.e.resetNestedEvents(this);
			if(typeof(this.dblclicked) == "function") {
				this.dblclicked(event);
			}
			return;
		}
		else if(!this.e_dblclick) {
			this._clicked = u.e._clicked;
			this._clicked(event);
		}
		else if(!event) {
			this._clicked = u.e._clicked;
			this._clicked(this.event_var);
		}
		else {
			u.e.resetNestedEvents(this);
			this.t_clicked = u.t.setTimer(this, u.e._dblclicked, 400);
		}
	}
}
u.e.addDOMReadyEvent = function(action) {
	if(document.readyState && document.addEventListener) {
		if((document.readyState == "interactive" && !u.browser("ie")) || document.readyState == "complete" || document.readyState == "loaded") {
			action();
		}
		else {
			var id = u.randomString();
			window["DOMReady_" + id] = action;
			eval('window["_DOMReady_' + id + '"] = function() {window["DOMReady_'+id+'"](); u.e.removeEvent(document, "DOMContentLoaded", window["_DOMReady_' + id + '"])}');
			u.e.addEvent(document, "DOMContentLoaded", window["_DOMReady_" + id]);
		}
	}
	else {
		u.e.addOnloadEvent(action);
	}
}
u.e.addOnloadEvent = function(action) {
	if(document.readyState && (document.readyState == "complete" || document.readyState == "loaded")) {
		action();
	}
	else {
		var id = u.randomString();
		window["Onload_" + id] = action;
		eval('window["_Onload_' + id + '"] = function() {window["Onload_'+id+'"](); u.e.removeEvent(window, "load", window["_Onload_' + id + '"])}');
		u.e.addEvent(window, "load", window["_Onload_" + id]);
	}
}
u.e.addResizeEvent = function(node, action) {
}
u.e.removeResizeEvent = function(node, action) {
}
u.e.addScrollEvent = function(node, action) {
}
u.e.removeScrollEvent = function(node, action) {
}
u.e.resetDragEvents = function(node) {
	this.removeEvent(node, "mousemove", this._pick);
	this.removeEvent(node, "touchmove", this._pick);
	this.removeEvent(node, "mousemove", this._drag);
	this.removeEvent(node, "touchmove", this._drag);
	this.removeEvent(node, "mouseup", this._drop);
	this.removeEvent(node, "touchend", this._drop);
	this.removeEvent(node, "mouseout", this._drop);
	this.removeEvent(node, "mousemove", this._scrollStart);
	this.removeEvent(node, "touchmove", this._scrollStart);
	this.removeEvent(node, "mousemove", this._scrolling);
	this.removeEvent(node, "touchmove", this._scrolling);
	this.removeEvent(node, "mouseup", this._scrollEnd);
	this.removeEvent(node, "touchend", this._scrollEnd);
}
u.e.overlap = function(node, boundaries, strict) {
	if(boundaries.constructor.toString().match("Array")) {
		var boundaries_start_x = Number(boundaries[0]);
		var boundaries_start_y = Number(boundaries[1]);
		var boundaries_end_x = Number(boundaries[2]);
		var boundaries_end_y = Number(boundaries[3]);
	}
	else if(boundaries.constructor.toString().match("HTML")) {
		var boundaries_start_x = u.absX(boundaries) - u.absX(node);
		var boundaries_start_y =  u.absY(boundaries) - u.absY(node);
		var boundaries_end_x = Number(boundaries_start_x + boundaries.offsetWidth);
		var boundaries_end_y = Number(boundaries_start_y + boundaries.offsetHeight);
	}
	var node_start_x = Number(node._x);
	var node_start_y = Number(node._y);
	var node_end_x = Number(node_start_x + node.offsetWidth);
	var node_end_y = Number(node_start_y + node.offsetHeight);
	if(strict) {
		if(node_start_x >= boundaries_start_x && node_start_y >= boundaries_start_y && node_end_x <= boundaries_end_x && node_end_y <= boundaries_end_y) {
			return true;
		}
		else {
			return false;
		}
	} 
	else if(node_end_x < boundaries_start_x || node_start_x > boundaries_end_x || node_end_y < boundaries_start_y || node_start_y > boundaries_end_y) {
		return false;
	}
	return true;
}
u.e.drag = function(node, boundaries, settings) {
	node.e_drag = true;
	if(node.childNodes.length < 2 && node.innerHTML.trim() == "") {
		node.innerHTML = "&nbsp;";
	}
	node.drag_strict = true;
	node.drag_elastica = 0;
	node.drag_dropout = true;
	node.show_bounds = false;
	if(typeof(settings) == "object") {
		var argument;
		for(argument in settings) {
			switch(argument) {
				case "strict"		: node.drag_strict		= settings[argument]; break;
				case "elastica"		: node.drag_elastica	= Number(settings[argument]); break;
				case "dropout"		: node.drag_dropout		= settings[argument]; break;
				case "show_bounds"	: node.show_bounds		= settings[argument]; break; // NEEDS HELP
			}
		}
	}
	if((boundaries.constructor && boundaries.constructor.toString().match("Array")) || (boundaries.scopeName && boundaries.scopeName != "HTML")) {
		node.start_drag_x = Number(boundaries[0]);
		node.start_drag_y = Number(boundaries[1]);
		node.end_drag_x = Number(boundaries[2]);
		node.end_drag_y = Number(boundaries[3]);
	}
	else if((boundaries.constructor && boundaries.constructor.toString().match("HTML")) || (boundaries.scopeName && boundaries.scopeName == "HTML")) {
		node.start_drag_x = u.absX(boundaries) - u.absX(node);
		node.start_drag_y = u.absY(boundaries) - u.absY(node);
		node.end_drag_x = node.start_drag_x + boundaries.offsetWidth;
		node.end_drag_y = node.start_drag_y + boundaries.offsetHeight;
	}
	if(node.show_bounds) {
		var debug_bounds = u.ae(document.body, "div", {"class":"debug_bounds"})
		debug_bounds.style.position = "absolute";
		debug_bounds.style.background = "red"
		debug_bounds.style.left = (u.absX(node) + node.start_drag_x - 1) + "px";
		debug_bounds.style.top = (u.absY(node) + node.start_drag_y - 1) + "px";
		debug_bounds.style.width = (node.end_drag_x - node.start_drag_x) + "px";
		debug_bounds.style.height = (node.end_drag_y - node.start_drag_y) + "px";
		debug_bounds.style.border = "1px solid white";
		debug_bounds.style.zIndex = 9999;
		debug_bounds.style.opacity = .5;
		if(document.readyState && document.readyState == "interactive") {
			debug_bounds.innerHTML = "WARNING - injected on DOMLoaded"; 
		}
		u.bug("node: "+u.nodeId(node)+" in (" + u.absX(node) + "," + u.absY(node) + "), (" + (u.absX(node)+node.offsetWidth) + "," + (u.absY(node)+node.offsetHeight) +")");
		u.bug("boundaries: (" + node.start_drag_x + "," + node.start_drag_y + "), (" + node.end_drag_x + ", " + node.end_drag_y + ")");
	}
	node._x = node._x ? node._x : 0;
	node._y = node._y ? node._y : 0;
	node.locked = ((node.end_drag_x - node.start_drag_x == node.offsetWidth) && (node.end_drag_y - node.start_drag_y == node.offsetHeight));
	node.only_vertical = (!node.locked && node.end_drag_x - node.start_drag_x == node.offsetWidth);
	node.only_horisontal = (!node.locked && node.end_drag_y - node.start_drag_y == node.offsetHeight);
	u.e.addStartEvent(node, this._inputStart);
}
u.e._pick = function(event) {
	var init_speed_x = Math.abs(this.start_event_x - u.eventX(event));
	var init_speed_y = Math.abs(this.start_event_y - u.eventY(event));
	if(init_speed_x > init_speed_y && this.only_horisontal || 
	   init_speed_x < init_speed_y && this.only_vertical ||
	   !this.only_vertical && !this.only_horisontal) {
		u.e.resetNestedEvents(this);
	    u.e.kill(event);
		this.move_timestamp = event.timeStamp;
		this.move_last_x = this._x;
		this.move_last_y = this._y;
		if(u.hasFixedParent(this)) {
			this.start_input_x = u.eventX(event) - this._x - u.scrollX(); 
			this.start_input_y = u.eventY(event) - this._y - u.scrollY();
		}
		else {
			this.start_input_x = u.eventX(event) - this._x; 
			this.start_input_y = u.eventY(event) - this._y;
		}
		this.current_xps = 0;
		this.current_yps = 0;
		u.a.transition(this, "none");
		if(typeof(this.picked) == "function") {
			this.picked(event);
		}
		u.e.addMoveEvent(this, u.e._drag);
		u.e.addEndEvent(this, u.e._drop);
	}
	if(this.drag_dropout && u.e.event_pref == "mouse") {
		u.e.addEvent(this, "mouseout", u.e._drop);
	}
}
u.e._drag = function(event) {
	if(u.hasFixedParent(this)) {
		this.current_x = u.eventX(event) - this.start_input_x - u.scrollX();
		this.current_y = u.eventY(event) - this.start_input_y - u.scrollY();
	}
	else {
		this.current_x = u.eventX(event) - this.start_input_x;
		this.current_y = u.eventY(event) - this.start_input_y;
	}
	this.current_xps = Math.round(((this.current_x - this.move_last_x) / (event.timeStamp - this.move_timestamp)) * 1000);
	this.current_yps = Math.round(((this.current_y - this.move_last_y) / (event.timeStamp - this.move_timestamp)) * 1000);
	this.move_timestamp = event.timeStamp;
	this.move_last_x = this.current_x;
	this.move_last_y = this.current_y;
	if(this.only_vertical) {
		this._y = this.current_y;
	}
	else if(this.only_horisontal) {
		this._x = this.current_x;
	}
	else if(!this.locked) {
		this._x = this.current_x;
		this._y = this.current_y;
	}
	if(this.e_swipe) {
		if(this.current_xps && (Math.abs(this.current_xps) > Math.abs(this.current_yps) || this.only_horisontal)) {
			if(this.current_xps < 0) {
				this.swiped = "left";
			}
			else {
				this.swiped = "right";
			}
		}
		else if(this.current_yps && (Math.abs(this.current_xps) < Math.abs(this.current_yps) || this.only_vertical)) {
			if(this.current_yps < 0) {
				this.swiped = "up";
			}
			else {
				this.swiped = "down";
			}
		}
	}
	if(!this.locked) {
		if(u.e.overlap(this, [this.start_drag_x, this.start_drag_y, this.end_drag_x, this.end_drag_y], true)) {
			u.a.translate(this, this._x, this._y);
		}
		else if(this.drag_elastica) {
			this.swiped = false;
			this.current_xps = 0;
			this.current_yps = 0;
			var offset = false;
			if(!this.only_vertical && this._x < this.start_drag_x) {
				offset = this._x < this.start_drag_x - this.drag_elastica ? - this.drag_elastica : this._x - this.start_drag_x;
				this._x = this.start_drag_x;
				this.current_x = this._x + offset + (Math.round(Math.pow(offset, 2)/this.drag_elastica));
			}
			else if(!this.only_vertical && this._x + this.offsetWidth > this.end_drag_x) {
				offset = this._x + this.offsetWidth > this.end_drag_x + this.drag_elastica ? this.drag_elastica : this._x + this.offsetWidth - this.end_drag_x;
				this._x = this.end_drag_x - this.offsetWidth;
				this.current_x = this._x + offset - (Math.round(Math.pow(offset, 2)/this.drag_elastica));
			}
			else {
				this.current_x = this._x;
			}
			if(!this.only_horisontal && this._y < this.start_drag_y) {
				offset = this._y < this.start_drag_y - this.drag_elastica ? - this.drag_elastica : this._y - this.start_drag_y;
				this._y = this.start_drag_y;
				this.current_y = this._y + offset + (Math.round(Math.pow(offset, 2)/this.drag_elastica));
			}
			else if(!this.horisontal && this._y + this.offsetHeight > this.end_drag_y) {
				offset = (this._y + this.offsetHeight > this.end_drag_y + this.drag_elastica) ? this.drag_elastica : (this._y + this.offsetHeight - this.end_drag_y);
				this._y = this.end_drag_y - this.offsetHeight;
				this.current_y = this._y + offset - (Math.round(Math.pow(offset, 2)/this.drag_elastica));
			}
			else {
				this.current_y = this._y;
			}
			if(offset) {
				u.a.translate(this, this.current_x, this.current_y);
			}
		}
		else {
			this.swiped = false;
			this.current_xps = 0;
			this.current_yps = 0;
			if(this._x < this.start_drag_x) {
				this._x = this.start_drag_x;
			}
			else if(this._x + this.offsetWidth > this.end_drag_x) {
				this._x = this.end_drag_x - this.offsetWidth;
			}
			if(this._y < this.start_drag_y) {
				this._y = this.start_drag_y;
			}
			else if(this._y + this.offsetHeight > this.end_drag_y) { 
				this._y = this.end_drag_y - this.offsetHeight;
			}
			u.a.translate(this, this._x, this._y);
		}
	}
	if(typeof(this.moved) == "function") {
		this.moved(event);
	}
}
u.e._drop = function(event) {
	u.e.resetEvents(this);
	if(this.e_swipe && this.swiped) {
		if(this.swiped == "left" && typeof(this.swipedLeft) == "function") {
			this.swipedLeft(event);
		}
		else if(this.swiped == "right" && typeof(this.swipedRight) == "function") {
			this.swipedRight(event);
		}
		else if(this.swiped == "down" && typeof(this.swipedDown) == "function") {
			this.swipedDown(event);
		}
		else if(this.swiped == "up" && typeof(this.swipedUp) == "function") {
			this.swipedUp(event);
		}
	}
	else if(!this.drag_strict && !this.locked) {
		this.current_x = this._x + (this.current_xps/2);
		this.current_y = this._y + (this.current_yps/2);
		if(this.only_vertical || this.current_x < this.start_drag_x) {
			this.current_x = this.start_drag_x;
		}
		else if(this.current_x + this.offsetWidth > this.end_drag_x) {
			this.current_x = this.end_drag_x - this.offsetWidth;
		}
		if(this.only_horisontal || this.current_y < this.start_drag_y) {
			this.current_y = this.start_drag_y;
		}
		else if(this.current_y + this.offsetHeight > this.end_drag_y) {
			this.current_y = this.end_drag_y - this.offsetHeight;
		}
		this.transitioned = function() {
			this.transitioned = null;
			u.a.transition(this, "none");
			if(typeof(this.projected) == "function") {
				this.projected(event);
			}
		}
		if(this.current_xps || this.current_yps) {
			u.a.transition(this, "all 1s cubic-bezier(0,0,0.25,1)");
		}
		else {
			u.a.transition(this, "none");
		}
		u.a.translate(this, this.current_x, this.current_y);
	}
	if(typeof(this.dropped) == "function") {
		this.dropped(event);
	}
}
u.e.swipe = function(node, boundaries, settings) {
	node.e_swipe = true;
	u.e.drag(node, boundaries, settings);
}
u.e.scroll = function(e) {
	e.e_scroll = true;
	e._x = e._x ? e._x : 0;
	e._y = e._y ? e._y : 0;
	u.e.addStartEvent(e, this._inputStart);
}
u.e._scrollStart = function(event) {
	u.e.resetNestedEvents(this);
	this.move_timestamp = new Date().getTime();
	this.current_xps = 0;
	this.current_yps = 0;
	this.start_input_x = u.eventX(event) - this._x;
	this.start_input_y = u.eventY(event) - this._y;
	u.a.transition(this, "none");
	if(typeof(this.picked) == "function") {
		this.picked(event);
	}
	u.e.addMoveEvent(this, u.e._scrolling);
	u.e.addEndEvent(this, u.e._scrollEnd);
}
u.e._scrolling = function(event) {
	this.new_move_timestamp = new Date().getTime();
	this.current_x = u.eventX(event) - this.start_input_x;
	this.current_y = u.eventY(event) - this.start_input_y;
	this.current_xps = Math.round(((this.current_x - this._x) / (this.new_move_timestamp - this.move_timestamp)) * 1000);
	this.current_yps = Math.round(((this.current_y - this._y) / (this.new_move_timestamp - this.move_timestamp)) * 1000);
	this.move_timestamp = this.new_move_timestamp;
	if(u.scrollY() > 0 && -(this.current_y) + u.scrollY() > 0) {
		u.e.kill(event);
		window.scrollTo(0, -(this.current_y) + u.scrollY());
	}
	if(typeof(this.moved) == "function") {
		this.moved(event);
	}
}
u.e._scrollEnd = function(event) {
	u.e.resetEvents(this);
	if(typeof(this.dropped) == "function") {
		this.dropped(event);
	}
}
u.e.beforeScroll = function(node) {
	node.e_beforescroll = true;
	u.e.addStartEvent(node, this._inputStartDrag);
}
u.e._inputStartDrag = function() {
	u.e.addMoveEvent(this, u.e._beforeScroll);
}
u.e._beforeScroll = function(event) {
	u.e.removeMoveEvent(this, u.e._beforeScroll);
	if(typeof(this.picked) == "function") {
		this.picked(event);
	}
}
Util.flashDetection = function(version) {
	var flash_version = false;
	var flash = false;
	if(navigator.plugins && navigator.plugins["Shockwave Flash"] && navigator.plugins["Shockwave Flash"].description && navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"]) {
		flash = true;
		var Pversion = navigator.plugins["Shockwave Flash"].description.match(/\b([\d]+)\b/);
		if(Pversion.length > 1 && !isNaN(Pversion[1])) {
			flash_version = Pversion[1];
		}
	}
	else if(window.ActiveXObject) {
		try {
			var AXflash, AXversion;
			AXflash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			if(AXflash) {
				flash = true;
				AXversion = AXflash.GetVariable("$version").match(/\b([\d]+)\b/);
				if(AXversion.length > 1 && !isNaN(AXversion[1])) {
					flash_version = AXversion[1];
				}
			}
		}
		catch(exception) {}
	}
	if(flash_version || (flash && !version)) {
		if(!version) {
			return true;
		}
		else {
			if(!isNaN(version)) {
				return flash_version == version;
			}
			else {
				return eval(flash_version + version);
			}
		}
	}
	else {
		return false;
	}
}
Util.flash = function(node, url, settings) {
	var width = "100%";
	var height = "100%";
	var background = "transparent";
	var id = "flash_" + new Date().getHours() + "_" + new Date().getMinutes() + "_" + new Date().getMilliseconds();
	var allowScriptAccess = "always";
	var menu = "false";
	var scale = "showall";
	var wmode = "transparent";
	if(typeof(settings) == "object") {
		var argument;
		for(argument in settings) {
			switch(argument) {
				case "id"					: id				= settings[argument]; break;
				case "width"				: width				= Number(settings[argument]); break;
				case "height"				: height			= Number(settings[argument]); break;
				case "background"			: background		= settings[argument]; break;
				case "allowScriptAccess"	: allowScriptAccess = settings[argument]; break;
				case "menu"					: menu				= settings[argument]; break;
				case "scale"				: scale				= settings[argument]; break;
				case "wmode"				: wmode				= settings[argument]; break;
			}
		}
	}
	html = '<object';
	html += ' id="'+id+'"';
	html += ' width="'+width+'"';
	html += ' height="'+height+'"';
	if(u.browser("explorer")) {
		html += ' classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"';
	}
	else {
		html += ' type="application/x-shockwave-flash"';
		html += ' data="'+url+'"';
	}
	html += '>';
	html += '<param name="allowScriptAccess" value="'+allowScriptAccess+'" />';
	html += '<param name="movie" value="'+url+'" />';
	html += '<param name="quality" value="high" />';
	html += '<param name="bgcolor" value="'+background+'" />';
	html += '<param name="play" value="true" />';
	html += '<param name="wmode" value="'+wmode+'" />';
	html += '<param name="menu" value="'+menu+'" />';
	html += '<param name="scale" value="'+scale+'" />';
	html += '</object>';
	var temp_node = document.createElement("div");
	temp_node.innerHTML = html;
	node.insertBefore(temp_node.firstChild, node.firstChild);
	var flash_object = u.qs("#"+id, node);
	return flash_object;
}
Util.Form = u.f = new function() {
	this.customInit = {};
	this.customValidate = {};
	this.customSend = {};
	this.init = function(form, settings) {
		var i, j, field, action, input;
		form.form_send = "params";
		form.ignore_inputs = "ignoreinput";
		if(typeof(settings) == "object") {
			var argument;
			for(argument in settings) {
				switch(argument) {
					case "ignore_inputs"	: form.ignore_inputs	= settings[argument]; break;
					case "form_send"		: form.form_send		= settings[argument]; break;
				}
			}
		}
		form.onsubmit = function(event) {return false;}
		form.setAttribute("novalidate", "novalidate");
		form._submit = this._submit;
		form.fields = {};
		form.tab_order = [];
		form.actions = {};
		var fields = u.qsa(".field", form);
		for(i = 0; field = fields[i]; i++) {
			var abbr = u.qs("abbr", field);
			if(abbr) {
				abbr.parentNode.removeChild(abbr);
			}
			var error_message = field.getAttribute("data-error");
			if(error_message) {
				u.ae(field, "div", {"class":"error", "html":error_message})
			}
			field._label = u.qs("label", field);
			field._hint = u.qs(".hint", field);
			field._error = u.qs(".error", field);
			var not_initialized = true;
			var custom_init;
			for(custom_init in this.customInit) {
				if(field.className.match(custom_init)) {
					this.customInit[custom_init](field);
					not_initialized = false;
				}
			}
			if(not_initialized) {
				if(u.hc(field, "string|email|tel|numeric|integer|password")) {
					field._input = u.qs("input", field);
					field._input.field = field;
					this.formIndex(form, field._input);
				}
				else if(u.hc(field, "text")) {
					field._input = u.qs("textarea", field);
					field._input.field = field;
					this.formIndex(form, field._input);
				}
				else if(u.hc(field, "select")) {
					field._input = u.qs("select", field);
					field._input.field = field;
					this.formIndex(form, field._input);
				}
				else if(u.hc(field, "checkbox|boolean")) {
					field._input = u.qs("input[type=checkbox]", field);
					field._input.field = field;
					this.formIndex(form, field._input);
				}
				else if(u.hc(field, "radio|radio_buttons")) {
					field._input = u.qsa("input", field);
					for(j = 0; input = field._input[j]; j++) {
						input.field = field;
						this.formIndex(form, input);
					}
				}
				else if(u.hc(field, "date")) {
					field._input = u.qsa("select,input", field);
					for(j = 0; input = field._input[j]; j++) {
						input.field = field;
						this.formIndex(form, input);
					}
				}
				else if(u.hc(field, "file")) {
					field._input = u.qs("input", field);
					field._input.field = field;
					this.formIndex(form, field._input);
				}
			}
		}
		var hidden_fields = u.qsa("input[type=hidden]", form);
		for(i = 0; hidden_field = hidden_fields[i]; i++) {
			if(!form.fields[hidden_field.name]) {
				form.fields[hidden_field.name] = hidden_field;
				hidden_field.val = this._value;
			}
		}
		var actions = u.qsa(".actions li", form);
		for(i = 0; action = actions[i]; i++) {
			action._input = u.qs("input,a", action);
			if(action._input.type && action._input.type == "submit") {
				action._input.onclick = function(event) {
					u.e.kill(event ? event : window.event);
				}
			}
			u.ce(action._input);
			action._input.clicked = function(event) {
				u.e.kill(event);
				if(!u.hc(this, "disabled")) {
					if(this.type && this.type.match(/submit/i)) {
						this.form._submit_button = this;
						this.form._submit_input = false;
						this.form._submit(event);
					}
				}
			}
			this.buttonOnEnter(action._input);
			this.activateButton(action._input);
			if(action._input.name && action._input.name) {
				form.actions[action._input.name] = action._input;
			}
			if(typeof(u.e.k) == "object" && u.hc(action._input, "key:[a-z0-9]+")) {
				u.e.k.addShortcut(u.cv(action._input, "key"), action._input);
			}
		}
	}
	this._value = function(value) {
		if(value !== undefined) {
			this.value = value;
			u.f.validate(this);
		}
		return this.value;
	}
	this._value_radio = function(value) {
		if(value) {
			for(i = 0; option = this.form[this.name][i]; i++) {
				if(option.value == value) {
					option.checked = true;
					u.f.validate(this);
				}
			}
		}
		else {
			var i, option;
			for(i = 0; option = this.form[this.name][i]; i++) {
				if(option.checked) {
					return option.value;
				}
			}
		}
		return false;
	}
	this._value_checkbox = function(value) {
		if(value) {
			this.checked = true
			u.f.validate(this);
		}
		else {
			if(this.checked) {
				return this.value;
			}
		}
		return false;
	}
	this._value_select = function(value) {
		if(value !== undefined) {
			var i, option;
			for(i = 0; option = this.options[i]; i++) {
				if(option.value == value) {
					this.selectedIndex = i;
					u.f.validate(this);
					return i;
				}
			}
			return false;
		}
		else {
			return this.options[this.selectedIndex].value;
		}
	}
	this.inputOnEnter = function(node) {
		node.keyPressed = function(event) {
			if(this.nodeName.match(/input/i) && (event.keyCode == 40 || event.keyCode == 38)) {
				this._submit_disabled = true;
			}
			else if(this.nodeName.match(/input/i) && this._submit_disabled && (
				event.keyCode == 46 || 
				(event.keyCode == 39 && u.browser("firefox")) || 
				(event.keyCode == 37 && u.browser("firefox")) || 
				event.keyCode == 27 || 
				event.keyCode == 13 || 
				event.keyCode == 9 ||
				event.keyCode == 8
			)) {
				this._submit_disabled = false;
			}
			else if(event.keyCode == 13 && !this._submit_disabled) {
				u.e.kill(event);
				this.form.submitInput = this;
				this.form.submitButton = false;
				this.form._submit(event);
			}
		}
		u.e.addEvent(node, "keydown", node.keyPressed);
	}
	this.buttonOnEnter = function(node) {
		node.keyPressed = function(event) {
			if(event.keyCode == 13 && !u.hc(this, "disabled")) {
				u.e.kill(event);
				this.form.submit_input = false;
				this.form.submit_button = this;
				this.form._submit(event);
			}
		}
		u.e.addEvent(node, "keydown", node.keyPressed);
	}
	this.formIndex = function(form, node) {
		node.tab_index = form.tab_order.length;
		form.tab_order[node.tab_index] = node;
		if(node.field && node.name) {
			form.fields[node.name] = node;
			if(node.nodeName.match(/input/i) && node.type && node.type.match(/text|email|number|password/)) {
				node.val = this._value;
				u.e.addEvent(node, "keyup", this._updated);
				u.e.addEvent(node, "change", this._changed);
				this.inputOnEnter(node);
			}
			else if(node.nodeName.match(/textarea/i)) {
				node.val = this._value;
				u.e.addEvent(node, "keyup", this._updated);
				u.e.addEvent(node, "change", this._changed);
				if(u.hc(node.field, "autoexpand")) {
					u.as(node, "overflow", "hidden");
					node.autoexpand_offset = 0;
					if(parseInt(u.gcs(node, "height")) != node.scrollHeight) {
						node.autoexpand_offset = node.scrollHeight - parseInt(u.gcs(node, "height"));
					}
					node.setHeight = function() {
						var textarea_height = parseInt(u.gcs(this, "height"));
						if(this.value) {
							if(u.browser("webkit")) {
								if(this.scrollHeight - this.autoexpand_offset > textarea_height) {
									u.a.setHeight(this, this.scrollHeight);
								}
							}
							else if(u.browser("opera") || u.browser("explorer")) {
								if(this.scrollHeight > textarea_height) {
									u.a.setHeight(this, this.scrollHeight);
								}
							}
							else {
								u.a.setHeight(this, this.scrollHeight);
							}
						}
					}
					u.e.addEvent(node, "keyup", node.setHeight);
				}
			}
			else if(node.nodeName.match(/select/i)) {
				node.val = this._value_select;
				u.e.addEvent(node, "change", this._updated);
				u.e.addEvent(node, "keyup", this._updated);
				u.e.addEvent(node, "change", this._changed);
			}
			else if(node.type && node.type.match(/checkbox/)) {
				node.val = this._value_checkbox;
				if(u.browser("explorer", "<=8")) {
					node.pre_state = node.checked;
					node._changed = u.f._changed;
					node._updated = u.f._updated;
					node._clicked = function(event) {
						if(this.checked != this.pre_state) {
							this._changed(window.event);
							this._updated(window.event);
						}
						this.pre_state = this.checked;
					}
					u.e.addEvent(node, "click", node._clicked);
				}
				else {
					u.e.addEvent(node, "change", this._updated);
					u.e.addEvent(node, "change", this._changed);
				}
				this.inputOnEnter(node);
			}
			else if(node.type && node.type.match(/radio/)) {
				node.val = this._value_radio;
				if(u.browser("explorer", "<=8")) {
					node.pre_state = node.checked;
					node._changed = u.f._changed;
					node._updated = u.f._updated;
					node._clicked = function(event) {
						var i, input;
						if(this.checked != this.pre_state) {
							this._changed(window.event);
							this._updated(window.event);
						}
						for(i = 0; input = this.field._input[i]; i++) {
							input.pre_state = input.checked;
						}
					}
					u.e.addEvent(node, "click", node._clicked);
				}
				else {
					u.e.addEvent(node, "change", this._updated);
					u.e.addEvent(node, "change", this._changed);
				}
				this.inputOnEnter(node);
			}
			this.activateField(node);
			this.validate(node);
		}
	}
	this._changed = function(event) {
		this.used = true;
		if(typeof(this.changed) == "function") {
			this.changed(this);
		}
		if(typeof(this.form.changed) == "function") {
			this.form.changed(this);
		}
	}
	this._updated = function(event) {
		if(event.keyCode != 9 && event.keyCode != 13 && event.keyCode != 16 && event.keyCode != 17 && event.keyCode != 18) {
			if(this.used || u.hc(this.field, "error")) {
				u.f.validate(this);
			}
			if(typeof(this.updated) == "function") {
				this.updated(this);
			}
			if(typeof(this.form.updated) == "function") {
				this.form.updated(this);
			}
		}
	}
	this._validate = function() {
		u.f.validate(this);
	}
	this._submit = function(event, input) {
		for(name in this.fields) {
			if(this.fields[name].field) {
				this.fields[name].used = true;
				u.f.validate(this.fields[name]);
			}
		}
		if(u.qs(".field.error", this)) {
			if(typeof(this.validationFailed) == "function") {
				this.validationFailed();
			}
		}
		else {
			if(typeof(this.submitted) == "function") {
				this.submitted(input);
			}
			else {
				this.submit();
			}
		}
	}
	this.activateField = function(input) {
		this._focus = function(event) {
			this.field.focused = true;
			u.ac(this.field, "focus");
			u.ac(this, "focus");
			if(typeof(this.focused) == "function") {
				this.focused();
			}
			if(typeof(this.form.focused) == "function") {
				this.form.focused(this);
			}
		}
		this._blur = function(event) {
			this.field.focused = false;
			u.rc(this.field, "focus");
			u.rc(this, "focus");
			this.used = true;
			if(typeof(this.blurred) == "function") {
				this.blurred();
			}
			if(typeof(this.form.blurred) == "function") {
				this.form.blurred(this);
			}
		}
		u.e.addEvent(input, "focus", this._focus);
		u.e.addEvent(input, "blur", this._blur);
		u.e.addEvent(input, "blur", this._validate);
	}
	this.activateButton = function(button) {
		this._button_focus = function(event) {
			u.ac(this, "focus");
			if(typeof(this.focused) == "function") {
				this.focused();
			}
			if(typeof(this.form.focused) == "function") {
				this.form.focused(this);
			}
		}
		this._button_blur = function(event) {
			u.rc(this, "focus");
			if(typeof(this.blurred) == "function") {
				this.blurred();
			}
			if(typeof(this.form.blurred) == "function") {
				this.form.blurred(this);
			}
		}
		u.e.addEvent(button, "focus", this._button_focus);
		u.e.addEvent(button, "blur", this._button_blur);
	}
	this.isDefault = function(input) {
		if(input.field.default_value && input.val() == iN.field.default_value) {
			return true;
		}
		return false;
	}
	this.fieldError = function(input) {
		u.rc(input, "correct");
		u.rc(input.field, "correct");
		if(input.used || !this.isDefault(input) && input.val()) {
			u.ac(input, "error");
			u.ac(input.field, "error");
			if(typeof(input.validationFailed) == "function") {
				input.validationFailed();
			}
		}
	}
	this.fieldCorrect = function(input) {
		if(!this.isDefault(input) && input.val()) {
			u.ac(input, "correct");
			u.ac(input.field, "correct");
			u.rc(input, "error");
			u.rc(input.field, "error");
		}
		else {
			u.rc(input, "correct");
			u.rc(input.field, "correct");
			u.rc(input, "error");
			u.rc(input.field, "error");
		}
	}
	this.validate = function(input) {
		var min, max;
		var not_validated = true;
		var custom_validate;
		for(custom_validate in u.f.customValidate) {
			if(u.hc(input.field, custom_validate)) {
				u.f.customValidate[custom_validate](input);
				not_validated = false;
			}
		}
		if(not_validated) {
			if(u.hc(input.field, "password")) {
				min = Number(u.cv(input.field, "min"));
				max = Number(u.cv(input.field, "max"));
				min = min ? min : 8;
				max = max ? max : 20;
				if((input.value.length >= min && input.value.length <= max && !this.isDefault(input)) || (!u.hc(input.field, "required") && !input.value)) {
					this.fieldCorrect(input);
				}
				else {
					this.fieldError(input);
				}
			}
			else if(u.hc(input.field, "numeric")) {
				min = Number(u.cv(input.field, "min"));
				max = Number(u.cv(input.field, "max"));
				min = min ? min : 0;
				max = max ? max : 99999999999999999999999999999;
				if((input.value && !isNaN(input.value) && input.value >= min && input.value <= max && !this.isDefault(input)) || (!u.hc(input.field, "required") && !input.value)) {
					this.fieldCorrect(input);
				}
				else {
					this.fieldError(input);
				}
			}
			else if(u.hc(input.field, "integer")) {
				min = Number(u.cv(input.field, "min"));
				max = Number(u.cv(input.field, "max"));
				min = min ? min : 0;
				max = max ? max : 99999999999999999999999999999;
				if((input.value && !isNaN(input.value) && Math.round(input.value) == input.value && input.value >= min && input.value <= max && !this.isDefault(input)) || (!u.hc(input.field, "required") && !input.value)) {
					this.fieldCorrect(input);
				}
				else {
					this.fieldError(input);
				}
			}
			else if(u.hc(input.field, "tel")) {
				if((input.value.match(/^([\+0-9\-\.\s\(\)]){5,16}$/) && !this.isDefault(input)) || (!u.hc(input.field, "required") && !input.value)) {
					this.fieldCorrect(input);
				}
				else {
					this.fieldError(input);
				}
			}
			else if(u.hc(input.field, "email")) {
				if((input.value.match(/^([^<>\\\/%$])+\@([^<>\\\/%$])+\.([^<>\\\/%$]{2,20})$/) && !this.isDefault(input)) || (!u.hc(input.field, "required") && !input.value)) {
					this.fieldCorrect(input);
				}
				else {
					this.fieldError(input);
				}
			}
			else if(u.hc(input.field, "text")) {
				min = Number(u.cv(input.field, "min"));
				max = Number(u.cv(input.field, "max"));
				min = min ? min : 1;
				max = max ? max : 10000000;
				if((input.value.length >= min && input.value.length <= max && !this.isDefault(input)) || (!u.hc(input.field, "required") && !input.value)) {
					this.fieldCorrect(input);
				}
				else {
					this.fieldError(input);
				}
			}
			else if(u.hc(input.field, "select")) {
				if(input.val() != "" || !u.hc(input.field, "required")) {
					this.fieldCorrect(input);
				}
				else {
					this.fieldError(input);
				}
			}
			else if(u.hc(input.field, "checkbox|boolean|radio|radio_buttons")) {
				if(input.val() != "" || !u.hc(input.field, "required")) {
					this.fieldCorrect(input);
				}
				else {
					this.fieldError(input);
				}
			}
			else if(u.hc(input.field, "string")) {
				min = Number(u.cv(input.field, "min"));
				max = Number(u.cv(input.field, "max"));
				min = min ? min : 1;
				max = max ? max : 10000000;
				if((input.value.length >= min && input.value.length <= max && !this.isDefault(input)) || (!u.hc(input.field, "required") && !input.value)) {
					this.fieldCorrect(input);
				}
				else {
					this.fieldError(input);
				}
			}
		}
		if(u.hc(input.field, "error")) {
			return false;
		}
		else {
			return true;
		}
	}
	this.getParams = function(form, settings) {
		var send_as = "params";
		var ignore_inputs = "ignoreinput";
		if(typeof(settings) == "object") {
			var argument;
			for(argument in settings) {
				switch(argument) {
					case "ignore_inputs"	: ignore_inputs		= settings[argument]; break;
					case "send_as"			: send_as			= settings[argument]; break;
				}
			}
		}
		var i, input, select, textarea, param;
		var params = new Object();
		if(form._submit_button && form._submit_button.name) {
			params[form._submit_button.name] = form._submit_button.value;
		}
		var inputs = u.qsa("input", form);
		var selects = u.qsa("select", form)
		var textareas = u.qsa("textarea", form)
		for(i = 0; input = inputs[i]; i++) {
			if(!u.hc(input, ignore_inputs)) {
				if((input.type == "checkbox" || input.type == "radio") && input.checked) {
					params[input.name] = input.value;
				}
				else if(!input.type.match(/button|submit|reset|checkbox|radio/i)) {
					params[input.name] = input.value;
				}
			}
		}
		for(i = 0; select = selects[i]; i++) {
			if(!u.hc(select, ignore_inputs)) {
				params[select.name] = select.options[select.selectedIndex].value;
			}
		}
		for(i = 0; textarea = textareas[i]; i++) {
			if(!u.hc(textarea, ignore_inputs)) {
				params[textarea.name] = textarea.value;
			}
		}
		if(send_as && typeof(this.customSend[send_as]) == "function") {
			return this.customSend[send_as](params, form);
		}
		else if(send_as == "json") {
			return u.f.convertNamesToJsonObject(params);
		}
		else if(send_as == "object") {
			return params;
		}
		else {
			var string = "";
			for(param in params) {
				string += (string ? "&" : "") + param + "=" + encodeURIComponent(params[param]);
			}
			return string;
		}
	}
}
u.f.convertNamesToJsonObject = function(params) {
 	var indexes, root, indexes_exsists, param;
	var object = new Object();
	for(param in params) {
	 	indexes_exsists = param.match(/\[/);
		if(indexes_exsists) {
			root = param.split("[")[0];
			indexes = param.replace(root, "");
			if(typeof(object[root]) == "undefined") {
				object[root] = new Object();
			}
			object[root] = this.recurseName(object[root], indexes, params[param]);
		}
		else {
			object[param] = params[param];
		}
	}
	return object;
}
u.f.recurseName = function(object, indexes, value) {
	var index = indexes.match(/\[([a-zA-Z0-9\-\_]+)\]/);
	var current_index = index[1];
	indexes = indexes.replace(index[0], "");
 	if(indexes.match(/\[/)) {
		if(object.length !== undefined) {
			var i;
			var added = false;
			for(i = 0; i < object.length; i++) {
				for(exsiting_index in object[i]) {
					if(exsiting_index == current_index) {
						object[i][exsiting_index] = this.recurseName(object[i][exsiting_index], indexes, value);
						added = true;
					}
				}
			}
			if(!added) {
				temp = new Object();
				temp[current_index] = new Object();
				temp[current_index] = this.recurseName(temp[current_index], indexes, value);
				object.push(temp);
			}
		}
		else if(typeof(object[current_index]) != "undefined") {
			object[current_index] = this.recurseName(object[current_index], indexes, value);
		}
		else {
			object[current_index] = new Object();
			object[current_index] = this.recurseName(object[current_index], indexes, value);
		}
	}
	else {
		object[current_index] = value;
	}
	return object;
}
Util.absoluteX = u.absX = function(node) {
	if(node.offsetParent) {
		return node.offsetLeft + u.absX(node.offsetParent);
	}
	return node.offsetLeft;
}
Util.absoluteY = u.absY = function(node) {
	if(node.offsetParent) {
		return node.offsetTop + u.absY(node.offsetParent);
	}
	return node.offsetTop;
}
Util.relativeX = u.relX = function(node) {
	if(u.gcs(node, "position").match(/absolute/) == null && node.offsetParent && u.gcs(node.offsetParent, "position").match(/relative|absolute|fixed/) == null) {
		return node.offsetLeft + u.relX(node.offsetParent);
	}
	return node.offsetLeft;
}
Util.relativeY = u.relY = function(node) {
	if(u.gcs(node, "position").match(/absolute/) == null && node.offsetParent && u.gcs(node.offsetParent, "position").match(/relative|absolute|fixed/) == null) {
		return node.offsetTop + u.relY(node.offsetParent);
	}
	return node.offsetTop;
}
Util.actualWidth = u.actualW = function(node) {
	return parseInt(u.gcs(node, "width"));
}
Util.actualHeight = u.actualH = function(node) {
	return parseInt(u.gcs(node, "height"));
}
Util.eventX = function(event){
	return (event.targetTouches ? event.targetTouches[0].pageX : event.pageX);
}
Util.eventY = function(event){
	return (event.targetTouches ? event.targetTouches[0].pageY : event.pageY);
}
Util.browserWidth = u.browserW = function() {
	return document.documentElement.clientWidth;
}
Util.browserHeight = u.browserH = function() {
	return document.documentElement.clientHeight;
}
Util.htmlWidth = u.htmlW = function() {
	return document.body.offsetWidth + parseInt(u.gcs(document.body, "margin-left")) +  + parseInt(u.gcs(document.body, "margin-right"));
}
Util.htmlHeight = u.htmlH = function() {
	return document.body.offsetHeight + parseInt(u.gcs(document.body, "margin-top")) +  + parseInt(u.gcs(document.body, "margin-bottom"));
}
Util.pageScrollX = u.scrollX = function() {
	return window.pageXOffset;
}
Util.pageScrollY = u.scrollY = function() {
	return window.pageYOffset;
}
Util.Hash = u.h = new function() {
	this.catchEvent = function(callback, node) {
		this.node = node;
		this.node.callback = callback;
		hashChanged = function(event) {
			u.h.node.callback();
		}
		if("onhashchange" in window && !u.browser("explorer", "<=7")) {
			window.onhashchange = hashChanged;
		}
		else {
			u.current_hash = window.location.hash;
			window.onhashchange = hashChanged;
			setInterval(
				function() {
					if(window.location.hash !== u.current_hash) {
						u.current_hash = window.location.hash;
						window.onhashchange();
					}
				}, 200
			);
		}
	}
	this.cleanHash = function(string, levels) {
		if(!levels) {
			return string.replace(location.protocol+"//"+document.domain, "");
		}
		else {
			var i, return_string = "";
			var hash = string.replace(location.protocol+"//"+document.domain, "").split("/");
			for(i = 1; i <= levels; i++) {
				return_string += "/" + hash[i];
			}
			return return_string;
		}
	}
	this.getCleanUrl = function(string, levels) {
		string = string.split("#")[0].replace(location.protocol+"//"+document.domain, "");
		if(!levels) {
			return string;
		}
		else {
			var i, return_string = "";
			var hash = string.split("/");
			levels = levels > hash.length-1 ? hash.length-1 : levels;
			for(i = 1; i <= levels; i++) {
				return_string += "/" + hash[i];
			}
			return return_string;
		}
	}
	this.getCleanHash = function(string, levels) {
		string = string.replace("#", "");
		if(!levels) {
			return string;
		}
		else {
			var i, return_string = "";
			var hash = string.split("/");
			levels = levels > hash.length-1 ? hash.length-1 : levels;
			for(i = 1; i <= levels; i++) {
				return_string += "/" + hash[i];
			}
			return return_string;
		}
	}
}
Util.Image = u.i = new function() {
	this.load = function(node, src) {
		var image = new Image();
		image.node = node;
		u.ac(node, "loading");
	    u.e.addEvent(image, 'load', u.i._loaded);
		u.e.addEvent(image, 'error', u.i._error);
		image.src = src;
	}
	this._loaded = function(event) {
		u.rc(this.node, "loading");
		if(typeof(this.node.loaded) == "function") {
			this.node.loaded(event);
		}
	}
	this._error = function(event) {
		u.rc(this.node, "loading");
		u.ac(this.node, "error");
		if(typeof(this.node.loaded) == "function" && typeof(this.node.failed) != "function") {
			this.node.loaded(event);
		}
		else if(typeof(this.node.failed) == "function") {
			this.node.failed(event);
		}
	}
	this._progress = function(event) {
		u.bug("progress")
		if(typeof(this.node.progress) == "function") {
			this.node.progress(event);
		}
	}
	this._debug = function(event) {
		u.bug("event:" + event.type);
		u.xInObject(event);
	}
}
Util.random = function(min, max) {
	return Math.round((Math.random() * (max - min)) + min);
}
Util.numToHex = function(num) {
	return num.toString(16);
}
Util.hexToNum = function(hex) {
	return parseInt(hex,16);
}
Util.period = function(format, time) {
	var seconds = 0;
	if(typeof(time) == "object") {
		var argument;
		for(argument in time) {
			switch(argument) {
				case "seconds"		: seconds = time[argument]; break;
				case "milliseconds" : seconds = Number(time[argument])/1000; break;
				case "minutes"		: seconds = Number(time[argument])*60; break;
				case "hours"		: seconds = Number(time[argument])*60*60 ; break;
				case "days"			: seconds = Number(time[argument])*60*60*24; break;
				case "months"		: seconds = Number(time[argument])*60*60*24*(365/12); break;
				case "years"		: seconds = Number(time[argument])*60*60*24*365; break;
			}
		}
	}
	var tokens = /y|n|o|O|w|W|c|d|e|D|g|h|H|l|m|M|r|s|S|t|T|u|U/g;
	var chars = new Object();
	chars.y = 0; // TODO
	chars.n = 0; // TODO 
	chars.o = (chars.n > 9 ? "" : "0") + chars.n; // TODO
	chars.O = 0; // TODO
	chars.w = 0; // TODO
	chars.W = 0; // TODO
	chars.c = 0; // TODO
	chars.d = 0; // TODO
	chars.e = 0; // TODO
	chars.D = Math.floor(((seconds/60)/60)/24);
	chars.g = Math.floor((seconds/60)/60)%24;
	chars.h = (chars.g > 9 ? "" : "0") + chars.g;
	chars.H = Math.floor((seconds/60)/60);
	chars.l = Math.floor(seconds/60)%60;
	chars.m = (chars.l > 9 ? "" : "0") + chars.l;
	chars.M = Math.floor(seconds/60);
	chars.r = Math.floor(seconds)%60;
	chars.s = (chars.r > 9 ? "" : "0") + chars.r;
	chars.S = Math.floor(seconds);
	chars.t = Math.round((seconds%1)*10);
	chars.T = Math.round((seconds%1)*100);
	chars.T = (chars.T > 9 ? "": "0") + Math.round(chars.T);
	chars.u = Math.round((seconds%1)*1000);
	chars.u = (chars.u > 9 ? chars.u > 99 ? "" : "0" : "00") + Math.round(chars.u);
	chars.U = Math.round(seconds*1000);
	return format.replace(tokens, function (_) {
		return _ in chars ? chars[_] : _.slice(1, _.length - 1);
	});
};
Util.popup = function(url, settings) {
	var width = "330";
	var height = "150";
	var name = "popup" + new Date().getHours() + "_" + new Date().getMinutes() + "_" + new Date().getMilliseconds();
	var extra = "";
	if(typeof(settings) == "object") {
		var argument;
		for(argument in settings) {
			switch(argument) {
				case "name"		: name		= settings[argument]; break;
				case "width"	: width		= Number(settings[argument]); break;
				case "height"	: height	= Number(settings[argument]); break;
				case "extra"	: extra		= settings[argument]; break;
			}
		}
	}
	var p;
	p = "width=" + width + ",height=" + height;
	p += ",left=" + (screen.width-width)/2;
	p += ",top=" + ((screen.height-height)-20)/2;
	p += extra ? "," + extra : ",scrollbars";
	document[name] = window.open(url, name, p);
	return document[name];
}
Util.createRequestObject = function() {
	return new XMLHttpRequest();
}
Util.Request = u.request = function(node, url, settings) {
	node.request_url = url;
	node.request_method = "GET";
	node.request_async = true;
	node.request_params = "";
	node.request_headers = false;
	if(typeof(settings) == "object") {
		var argument;
		for(argument in settings) {
			switch(argument) {
				case "method"	: node.request_method	= settings[argument]; break;
				case "params"	: node.request_params	= settings[argument]; break;
				case "async"	: node.request_async	= settings[argument]; break;
				case "headers"	: node.request_headers	= settings[argument]; break;
			}
		}
	}
	if(node.request_method.match(/GET|POST|PUT|PATCH/i)) {
		node.HTTPRequest = this.createRequestObject();
		node.HTTPRequest.node = node;
		if(node.request_async) {
			node.HTTPRequest.onreadystatechange = function() {
				if(this.readyState == 4) {
					u.validateResponse(this);
				}
			}
		}
		try {
			if(node.request_method.match(/GET/i)) {
				var params = u.JSONtoParams(node.request_params);
				node.request_url += params ? ((!node.request_url.match(/\?/g) ? "?" : "&") + params) : "";
				node.HTTPRequest.open(node.request_method, node.request_url, node.request_async);
				node.HTTPRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				var csfr_field = u.qs('meta[name="csrf-token"]');
				if(csfr_field && csfr_field.content) {
					node.HTTPRequest.setRequestHeader("X-CSRF-Token", csfr_field.content);
				}
				if(typeof(node.request_headers) == "object") {
					var header;
					for(header in node.request_headers) {
						node.HTTPRequest.setRequestHeader(header, node.request_headers[header]);
					}
				}
				node.HTTPRequest.send("");
			}
			else if(node.request_method.match(/POST|PUT|PATCH/i)) {
				var params = typeof(node.request_params) == "object" ? JSON.stringify(node.request_params) : node.request_params;
				node.HTTPRequest.open(node.request_method, node.request_url, node.request_async);
				node.HTTPRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				var csfr_field = u.qs('meta[name="csrf-token"]');
				if(csfr_field && csfr_field.content) {
					node.HTTPRequest.setRequestHeader("X-CSRF-Token", csfr_field.content);
				}
				if(typeof(node.request_headers) == "object") {
					var header;
					for(header in node.request_headers) {
						node.HTTPRequest.setRequestHeader(header, node.request_headers[header]);
					}
				}
				node.HTTPRequest.send(params);
			}
		}
		catch(exception) {
			node.HTTPRequest.exception = exception;
			u.validateResponse(node.HTTPRequest);
			return;
		}
		if(!node.request_async) {
			u.validateResponse(node.HTTPRequest);
		}
	}
	else if(node.request_method.match(/SCRIPT/i)) {
		var key = u.randomString();
		document[key] = new Object();
		document[key].node = node;
		document[key].responder = function(response) {
			var response_object = new Object();
			response_object.node = this.node;
			response_object.responseText = response;
			u.validateResponse(response_object);
		}
		var params = u.JSONtoParams(node.request_params);
		node.request_url += params ? ((!node.request_url.match(/\?/g) ? "?" : "&") + params) : "";
		node.request_url += (!node.request_url.match(/\?/g) ? "?" : "&") + "callback=document."+key+".responder";
		u.ae(u.qs("head"), "script", ({"type":"text/javascript", "src":node.request_url}));
	}
}
Util.JSONtoParams = function(json) {
	if(typeof(json) == "object") {
		var params = "", param;
		for(param in json) {
			params += (params ? "&" : "") + param + "=" + json[param];
		}
		return params
	}
	var object = u.isStringJSON(json);
	if(object) {
		return u.JSONtoParams(object);
	}
	return json;
}
Util.isStringJSON = function(string) {
	if(string.trim().substr(0, 1).match(/[\{\[]/i) && string.trim().substr(-1, 1).match(/[\}\]]/i)) {
		try {
			var test = JSON.parse(string);
			if(typeof(test) == "object") {
				test.isJSON = true;
				return test;
			}
		}
		catch(exception) {}
	}
	return false;
}
Util.isStringHTML = function(string) {
	if(string.trim().substr(0, 1).match(/[\<]/i) && string.trim().substr(-1, 1).match(/[\>]/i)) {
		try {
			var test = document.createElement("div");
			test.innerHTML = string;
			if(test.childNodes.length) {
				var body_class = string.match(/<body class="([a-z0-9A-Z_: ]+)"/);
				test.body_class = body_class ? body_class[1] : "";
				var head_title = string.match(/<title>([^$]+)<\/title>/);
				test.head_title = head_title ? head_title[1] : "";
				test.isHTML = true;
				return test;
			}
		}
		catch(exception) {}
	}
	return false;
}
Util.evaluateResponseText = function(responseText) {
	var object;
	if(typeof(responseText) == "object") {
		responseText.isJSON = true;
		return responseText;
	}
	else {
		var response_string;
		if(responseText.trim().substr(0, 1).match(/[\"\']/i) && responseText.trim().substr(-1, 1).match(/[\"\']/i)) {
			response_string = responseText.trim().substr(1, responseText.trim().length-2);
		}
		else {
			response_string = responseText;
		}
		var json = u.isStringJSON(response_string);
		if(json) {
			return json;
		}
		var html = u.isStringHTML(response_string);
		if(html) {
			return html;
		}
		return responseText;
	}
}
Util.validateResponse = function(response){
	var object = false;
	if(response) {
		try {
			if(response.status && !response.status.toString().match(/403|404|500/)) {
				object = u.evaluateResponseText(response.responseText);
			}
			else if(response.responseText) {
				object = u.evaluateResponseText(response.responseText);
			}
		}
		catch(exception) {
			response.exception = exception;
		}
	}
	if(object) {
		if(typeof(response.node.Response) == "function") {
			response.node.Response(object);
		}
		if(typeof(response.node.response) == "function") {
			response.node.response(object);
		}
	}
	else {
		if(typeof(response.node.ResponseError) == "function") {
			response.node.ResponseError(response);
		}
		if(typeof(response.node.responseError) == "function") {
			response.node.responseError(response);
		}
	}
}
Util.cutString = function(string, length) {
	var matches, match, i;
	if(string.length <= length) {
		return string;
	}
	else {
		length = length-3;
	}
	matches = string.match(/\&[\w\d]+\;/g);
	if(matches) {
		for(i = 0; match = matches[i]; i++){
			if(string.indexOf(match) < length){
				length += match.length-1;
			}
		}
	}
	return string.substring(0, length) + (string.length > length ? "..." : "");
}
Util.prefix = function(string, length, prefix) {
	string = string.toString();
	prefix = prefix ? prefix : "0";
	while(string.length < length) {
		string = prefix + string;
	}
	return string;
}
Util.randomString = function(length) {
	var key = "", i;
	length = length ? length : 8;
	var pattern = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
	for(i = 0; i < length; i++) {
		key += pattern[u.random(0,35)];
	}
	return key;
}
Util.uuid = function() {
	var chars = '0123456789abcdef'.split('');
	var uuid = [], rnd = Math.random, r, i;
	uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
	uuid[14] = '4';
	for(i = 0; i < 36; i++) {
		if(!uuid[i]) {
			r = 0 | rnd()*16;
			uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r & 0xf];
		}
 	}
	return uuid.join('');
}
Util.stringOr = function(value, replacement) {
	if(value !== undefined && value !== null) {
		return value;
	}
	else {
		return replacement ? replacement : "";
	}	
}
Util.browser = function(model, version) {
	var current_version = false;
	if(model.match(/\bexplorer\b|\bie\b/i)) {
		if(window.ActiveXObject) {
			current_version = navigator.userAgent.match(/(MSIE )(\d+.\d)/i)[2];
		}
	}
	else if(model.match(/\bfirefox\b|\bgecko\b/i)) {
		if(window.navigator.mozIsLocallyAvailable) {
			current_version = navigator.userAgent.match(/(Firefox\/)(\d+\.\d+)/i)[2];
		}
	}
	else if(model.match(/\bwebkit\b/i)) {
		if(document.body.style.webkitTransform != undefined) {
			current_version = navigator.userAgent.match(/(AppleWebKit\/)(\d+.\d)/i)[2];
		}
	}
	else if(model.match(/\bchrome\b/i)) {
		if(window.chrome && document.body.style.webkitTransform != undefined) {
			current_version = navigator.userAgent.match(/(Chrome\/)(\d+)(.\d)/i)[2];
		}
	}
	else if(model.match(/\bsafari\b/i)) {
		if(!window.chrome && document.body.style.webkitTransform != undefined) {
			current_version = navigator.userAgent.match(/(Version\/)(\d+)(.\d)/i)[2];
		}
	}
	else if(model.match(/\bopera\b/i)) {
		if(window.opera) {
			if(navigator.userAgent.match(/Version\//)) {
				current_version = navigator.userAgent.match(/(Version\/)(\d+)(.\d)/i)[2];
			}
			else {
				current_version = navigator.userAgent.match(/(Opera\/)(\d+)(.\d)/i)[2];
			}
		}
	}
	if(current_version) {
		if(!version) {
			return current_version;
		}
		else {
			if(!isNaN(version)) {
				return current_version == version;
			}
			else {
				return eval(current_version + version);
			}
		}
	}
	else {
		return false;
	}
}
Util.system = function(os, version) {
}
Util.support = function(property) {
	if(document.documentElement) {
		property = property.replace(/(-\w)/g, function(word){return word.replace(/-/, "").toUpperCase()});
		return property in document.documentElement.style;
	}
	return false;
}
Util.windows = function() {
	return (navigator.userAgent.indexOf("Windows") >= 0) ? true : false;
}
Util.osx = function() {
	return (navigator.userAgent.indexOf("OS X") >= 0) ? true : false;
}
Util.Timer = u.t = new function() {
	this._timers = new Array();
	this.setTimer = function(node, action, timeout) {
		var id = this._timers.length;
		this._timers[id] = {"_a":action, "_n":node, "_t":setTimeout("u.t._executeTimer("+id+")", timeout)};
		return id;
	}
	this.resetTimer = function(id) {
		if(this._timers[id]) {
			clearTimeout(this._timers[id]._t);
			this._timers[id] = false;
		}
	}
	this._executeTimer = function(id) {
		var node = this._timers[id]._n;
		node._timer_action = this._timers[id]._a;
		node._timer_action();
		node._timer_action = null;
		this._timers[id] = false;
	}
	this.setInterval = function(node, action, interval) {
		var id = this._timers.length;
		this._timers[id] = {"_a":action, "_n":node, "_i":setInterval("u.t._executeInterval("+id+")", interval)};
		return id;
	}
	this.resetInterval = function(id) {
		if(this._timers[id]) {
			clearInterval(this._timers[id]._i);
			this._timers[id] = false;
		}
	}
	this._executeInterval = function(id) {
		var node = this._timers[id]._n;
		node._interval_action = this._timers[id]._a;
		node._interval_action();
		node._timer_action = null;
	}
	this.valid = function(id) {
		return this._timers[id] ? true : false;
	}
	this.resetAllTimers = function() {
		var i, t;
		for(i = 0; i < this._timers.length; i++) {
			if(this._timers[i] && this._timers[i]._t) {
				this.resetTimer(i);
			}
		}
	}
	this.resetAllIntervals = function() {
		var i, t;
		for(i = 0; i < this._timers.length; i++) {
			if(this._timers[i] && this._timers[i]._i) {
				this.resetInterval(i);
			}
		}
	}
}
Util.getVar = function(param, url) {
	var string = url ? url.split("#")[0] : location.search;
	var regexp = new RegExp("[\&\?\b]{1}"+param+"\=([^\&\b]+)");
	var match = string.match(regexp);
	if(match && match.length > 1) {
		return match[1];
	}
	else {
		return "";
	}
}

/*beta-u-preloader.js*/
u.preloader = function(node, files, options) {
	var callback, callback_min_delay
	if(typeof(options) == "object") {
		var argument;
		for(argument in options) {
			switch(argument) {
				case "callback"				: callback				= options[argument]; break;
				case "callback_min_delay"	: callback_min_delay	= options[argument]; break;
			}
		}
	}
	if(!u._preloader_queue) {
		u._preloader_queue = document.createElement("div");
		u._preloader_processes = 0;
	}
	if(node && files) {
		var entry, file;
		var new_queue = u.ae(u._preloader_queue, "ul");
		new_queue._callback = callback;
		new_queue._node = node;
		new_queue._files = files;
		new_queue.nodes = new Array();
		new_queue._start_time = new Date().getTime();
		for(i = 0; file = files[i]; i++) {
			entry = u.ae(new_queue, "li", {"class":"waiting"});
			entry.i = i;
			entry._queue = new_queue
			entry._file = file;
		}
		u.ac(node, "waiting");
		if(typeof(node.waiting) == "function") {
			node.waiting();
		}
	}
	u.queueLoader();
	return u._preloader_queue;
}
u.queueLoader = function() {
	if(u.qs("li.waiting", u._preloader_queue)) {
		while(u._preloader_processes < 4) {
			var next = u.qs("li.waiting", u._preloader_queue);
			if(next) {
				if(u.hc(next._queue._node, "waiting")) {
					u.rc(next._queue._node, "waiting");
					u.ac(next._queue._node, "loading");
					if(typeof(next._queue._node.loading) == "function") {
						next._node._queue.loading();
					}
				}
				u._preloader_processes++;
				u.rc(next, "waiting");
				u.ac(next, "loading");
				next.loaded = function(event) {
					this._image = event.target;
					this._queue.nodes[this.i] = this;
					u.rc(this, "loading");
					u.ac(this, "loaded");
					u._preloader_processes--;
					if(!u.qs("li.waiting,li.loading", this._queue)) {
						u.rc(this._queue._node, "loading");
						if(typeof(this._queue._callback) == "function") {
							this._queue._node._callback = this._queue._callback;
							this._queue._node._callback(this._queue.nodes);
						}
						else if(typeof(this._queue._node.loaded) == "function") {
							this._queue._node.loaded(this._queue.nodes);
						}
					}
					u.queueLoader();
				}
				u.i.load(next, next._file);
			}
			else {
				break
			}
		}
	}
}

/*u-events-movements.js*/
u.e.resetDragEvents = function(node) {
	this.removeEvent(node, "mousemove", this._pick);
	this.removeEvent(node, "touchmove", this._pick);
	this.removeEvent(node, "mousemove", this._drag);
	this.removeEvent(node, "touchmove", this._drag);
	this.removeEvent(node, "mouseup", this._drop);
	this.removeEvent(node, "touchend", this._drop);
	this.removeEvent(node, "mouseout", this._drop);
	this.removeEvent(node, "mousemove", this._scrollStart);
	this.removeEvent(node, "touchmove", this._scrollStart);
	this.removeEvent(node, "mousemove", this._scrolling);
	this.removeEvent(node, "touchmove", this._scrolling);
	this.removeEvent(node, "mouseup", this._scrollEnd);
	this.removeEvent(node, "touchend", this._scrollEnd);
}
u.e.overlap = function(node, boundaries, strict) {
	if(boundaries.constructor.toString().match("Array")) {
		var boundaries_start_x = Number(boundaries[0]);
		var boundaries_start_y = Number(boundaries[1]);
		var boundaries_end_x = Number(boundaries[2]);
		var boundaries_end_y = Number(boundaries[3]);
	}
	else if(boundaries.constructor.toString().match("HTML")) {
		var boundaries_start_x = u.absX(boundaries) - u.absX(node);
		var boundaries_start_y =  u.absY(boundaries) - u.absY(node);
		var boundaries_end_x = Number(boundaries_start_x + boundaries.offsetWidth);
		var boundaries_end_y = Number(boundaries_start_y + boundaries.offsetHeight);
	}
	var node_start_x = Number(node._x);
	var node_start_y = Number(node._y);
	var node_end_x = Number(node_start_x + node.offsetWidth);
	var node_end_y = Number(node_start_y + node.offsetHeight);
	if(strict) {
		if(node_start_x >= boundaries_start_x && node_start_y >= boundaries_start_y && node_end_x <= boundaries_end_x && node_end_y <= boundaries_end_y) {
			return true;
		}
		else {
			return false;
		}
	} 
	else if(node_end_x < boundaries_start_x || node_start_x > boundaries_end_x || node_end_y < boundaries_start_y || node_start_y > boundaries_end_y) {
		return false;
	}
	return true;
}
u.e.drag = function(node, boundaries, settings) {
	node.e_drag = true;
	if(node.childNodes.length < 2 && node.innerHTML.trim() == "") {
		node.innerHTML = "&nbsp;";
	}
	node.drag_strict = true;
	node.drag_elastica = 0;
	node.drag_dropout = true;
	node.show_bounds = false;
	if(typeof(settings) == "object") {
		var argument;
		for(argument in settings) {
			switch(argument) {
				case "strict"			: node.drag_strict			= settings[argument]; break;
				case "elastica"			: node.drag_elastica		= Number(settings[argument]); break;
				case "dropout"			: node.drag_dropout			= settings[argument]; break;
				case "show_bounds"		: node.show_bounds			= settings[argument]; break; // NEEDS HELP
				case "vertical_lock"	: node.vertical_lock		= settings[argument]; break;
				case "horizontal_lock"	: node.horizontal_lock		= settings[argument]; break;
			}
		}
	}
	if((boundaries.constructor && boundaries.constructor.toString().match("Array")) || (boundaries.scopeName && boundaries.scopeName != "HTML")) {
		node.start_drag_x = Number(boundaries[0]);
		node.start_drag_y = Number(boundaries[1]);
		node.end_drag_x = Number(boundaries[2]);
		node.end_drag_y = Number(boundaries[3]);
	}
	else if((boundaries.constructor && boundaries.constructor.toString().match("HTML")) || (boundaries.scopeName && boundaries.scopeName == "HTML")) {
		node.start_drag_x = u.absX(boundaries) - u.absX(node);
		node.start_drag_y = u.absY(boundaries) - u.absY(node);
		node.end_drag_x = node.start_drag_x + boundaries.offsetWidth;
		node.end_drag_y = node.start_drag_y + boundaries.offsetHeight;
	}
	if(node.show_bounds) {
		var debug_bounds = u.ae(document.body, "div", {"class":"debug_bounds"})
		debug_bounds.style.position = "absolute";
		debug_bounds.style.background = "red"
		debug_bounds.style.left = (u.absX(node) + node.start_drag_x - 1) + "px";
		debug_bounds.style.top = (u.absY(node) + node.start_drag_y - 1) + "px";
		debug_bounds.style.width = (node.end_drag_x - node.start_drag_x) + "px";
		debug_bounds.style.height = (node.end_drag_y - node.start_drag_y) + "px";
		debug_bounds.style.border = "1px solid white";
		debug_bounds.style.zIndex = 9999;
		debug_bounds.style.opacity = .5;
		if(document.readyState && document.readyState == "interactive") {
			debug_bounds.innerHTML = "WARNING - injected on DOMLoaded"; 
		}
		u.bug("node: "+u.nodeId(node)+" in (" + u.absX(node) + "," + u.absY(node) + "), (" + (u.absX(node)+node.offsetWidth) + "," + (u.absY(node)+node.offsetHeight) +")");
		u.bug("boundaries: (" + node.start_drag_x + "," + node.start_drag_y + "), (" + node.end_drag_x + ", " + node.end_drag_y + ")");
	}
	node._x = node._x ? node._x : 0;
	node._y = node._y ? node._y : 0;
	node.locked = ((node.end_drag_x - node.start_drag_x == node.offsetWidth) && (node.end_drag_y - node.start_drag_y == node.offsetHeight));
	node.only_vertical = (node.vertical_lock || (!node.locked && node.end_drag_x - node.start_drag_x == node.offsetWidth));
	node.only_horizontal = (node.horizontal_lock || (!node.locked && node.end_drag_y - node.start_drag_y == node.offsetHeight));
	u.e.addStartEvent(node, this._inputStart);
}
u.e._pick = function(event) {
	var init_speed_x = Math.abs(this.start_event_x - u.eventX(event));
	var init_speed_y = Math.abs(this.start_event_y - u.eventY(event));
	if((init_speed_x > init_speed_y && this.only_horizontal) || 
	   (init_speed_x < init_speed_y && this.only_vertical) ||
	   (!this.only_vertical && !this.only_horizontal)) {
		u.e.resetNestedEvents(this);
	    u.e.kill(event);
		this.move_timestamp = event.timeStamp;
		this.move_last_x = this._x;
		this.move_last_y = this._y;
		if(u.hasFixedParent(this)) {
			this.start_input_x = u.eventX(event) - this._x - u.scrollX(); 
			this.start_input_y = u.eventY(event) - this._y - u.scrollY();
		}
		else {
			this.start_input_x = u.eventX(event) - this._x; 
			this.start_input_y = u.eventY(event) - this._y;
		}
		this.current_xps = 0;
		this.current_yps = 0;
		u.a.transition(this, "none");
		if(typeof(this.picked) == "function") {
			this.picked(event);
		}
		u.e.addMoveEvent(this, u.e._drag);
		u.e.addEndEvent(this, u.e._drop);
	}
	if(this.drag_dropout && u.e.event_pref == "mouse") {
		u.e.addEvent(this, "mouseout", u.e._drop);
	}
}
u.e._drag = function(event) {
	if(u.hasFixedParent(this)) {
		this.current_x = u.eventX(event) - this.start_input_x - u.scrollX();
		this.current_y = u.eventY(event) - this.start_input_y - u.scrollY();
	}
	else {
		this.current_x = u.eventX(event) - this.start_input_x;
		this.current_y = u.eventY(event) - this.start_input_y;
	}
	this.current_xps = Math.round(((this.current_x - this.move_last_x) / (event.timeStamp - this.move_timestamp)) * 1000);
	this.current_yps = Math.round(((this.current_y - this.move_last_y) / (event.timeStamp - this.move_timestamp)) * 1000);
	this.move_timestamp = event.timeStamp;
	this.move_last_x = this.current_x;
	this.move_last_y = this.current_y;
	if(!this.locked && this.only_vertical) {
		this._y = this.current_y;
	}
	else if(!this.locked && this.only_horizontal) {
		this._x = this.current_x;
	}
	else if(!this.locked) {
		this._x = this.current_x;
		this._y = this.current_y;
	}
	if(this.e_swipe) {
		if(this.current_xps && (Math.abs(this.current_xps) > Math.abs(this.current_yps) || this.only_horizontal)) {
			if(this.current_xps < 0) {
				this.swiped = "left";
			}
			else {
				this.swiped = "right";
			}
		}
		else if(this.current_yps && (Math.abs(this.current_xps) < Math.abs(this.current_yps) || this.only_vertical)) {
			if(this.current_yps < 0) {
				this.swiped = "up";
			}
			else {
				this.swiped = "down";
			}
		}
	}
	if(!this.locked) {
		if(u.e.overlap(this, [this.start_drag_x, this.start_drag_y, this.end_drag_x, this.end_drag_y], true)) {
			u.a.translate(this, this._x, this._y);
		}
		else if(this.drag_elastica) {
			this.swiped = false;
			this.current_xps = 0;
			this.current_yps = 0;
			var offset = false;
			if(!this.only_vertical && this._x < this.start_drag_x) {
				offset = this._x < this.start_drag_x - this.drag_elastica ? - this.drag_elastica : this._x - this.start_drag_x;
				this._x = this.start_drag_x;
				this.current_x = this._x + offset + (Math.round(Math.pow(offset, 2)/this.drag_elastica));
			}
			else if(!this.only_vertical && this._x + this.offsetWidth > this.end_drag_x) {
				offset = this._x + this.offsetWidth > this.end_drag_x + this.drag_elastica ? this.drag_elastica : this._x + this.offsetWidth - this.end_drag_x;
				this._x = this.end_drag_x - this.offsetWidth;
				this.current_x = this._x + offset - (Math.round(Math.pow(offset, 2)/this.drag_elastica));
			}
			else {
				this.current_x = this._x;
			}
			if(!this.only_horizontal && this._y < this.start_drag_y) {
				offset = this._y < this.start_drag_y - this.drag_elastica ? - this.drag_elastica : this._y - this.start_drag_y;
				this._y = this.start_drag_y;
				this.current_y = this._y + offset + (Math.round(Math.pow(offset, 2)/this.drag_elastica));
			}
			else if(!this.horizontal && this._y + this.offsetHeight > this.end_drag_y) {
				offset = (this._y + this.offsetHeight > this.end_drag_y + this.drag_elastica) ? this.drag_elastica : (this._y + this.offsetHeight - this.end_drag_y);
				this._y = this.end_drag_y - this.offsetHeight;
				this.current_y = this._y + offset - (Math.round(Math.pow(offset, 2)/this.drag_elastica));
			}
			else {
				this.current_y = this._y;
			}
			if(offset) {
				u.a.translate(this, this.current_x, this.current_y);
			}
		}
		else {
			this.swiped = false;
			this.current_xps = 0;
			this.current_yps = 0;
			if(this._x < this.start_drag_x) {
				this._x = this.start_drag_x;
			}
			else if(this._x + this.offsetWidth > this.end_drag_x) {
				this._x = this.end_drag_x - this.offsetWidth;
			}
			if(this._y < this.start_drag_y) {
				this._y = this.start_drag_y;
			}
			else if(this._y + this.offsetHeight > this.end_drag_y) { 
				this._y = this.end_drag_y - this.offsetHeight;
			}
			u.a.translate(this, this._x, this._y);
		}
	}
	if(typeof(this.moved) == "function") {
		this.moved(event);
	}
}
u.e._drop = function(event) {
	u.e.resetEvents(this);
	if(this.e_swipe && this.swiped) {
		if(this.swiped == "left" && typeof(this.swipedLeft) == "function") {
			this.swipedLeft(event);
		}
		else if(this.swiped == "right" && typeof(this.swipedRight) == "function") {
			this.swipedRight(event);
		}
		else if(this.swiped == "down" && typeof(this.swipedDown) == "function") {
			this.swipedDown(event);
		}
		else if(this.swiped == "up" && typeof(this.swipedUp) == "function") {
			this.swipedUp(event);
		}
	}
	else if(!this.drag_strict && !this.locked) {
		this.current_x = this._x + (this.current_xps/2);
		this.current_y = this._y + (this.current_yps/2);
		if(this.only_vertical || this.current_x < this.start_drag_x) {
			this.current_x = this.start_drag_x;
		}
		else if(this.current_x + this.offsetWidth > this.end_drag_x) {
			this.current_x = this.end_drag_x - this.offsetWidth;
		}
		if(this.only_horizontal || this.current_y < this.start_drag_y) {
			this.current_y = this.start_drag_y;
		}
		else if(this.current_y + this.offsetHeight > this.end_drag_y) {
			this.current_y = this.end_drag_y - this.offsetHeight;
		}
		this.transitioned = function() {
			this.transitioned = null;
			u.a.transition(this, "none");
			if(typeof(this.projected) == "function") {
				this.projected(event);
			}
		}
		if(this.current_xps || this.current_yps) {
			u.a.transition(this, "all 1s cubic-bezier(0,0,0.25,1)");
		}
		else {
			u.a.transition(this, "all 0.2s cubic-bezier(0,0,0.25,1)");
		}
		u.a.translate(this, this.current_x, this.current_y);
	}
	if(typeof(this.dropped) == "function") {
		this.dropped(event);
	}
}
u.e.swipe = function(node, boundaries, settings) {
	node.e_swipe = true;
	u.e.drag(node, boundaries, settings);
}
u.e.scroll = function(e) {
	e.e_scroll = true;
	e._x = e._x ? e._x : 0;
	e._y = e._y ? e._y : 0;
	u.e.addStartEvent(e, this._inputStart);
}
u.e._scrollStart = function(event) {
	u.e.resetNestedEvents(this);
	this.move_timestamp = new Date().getTime();
	this.current_xps = 0;
	this.current_yps = 0;
	this.start_input_x = u.eventX(event) - this._x;
	this.start_input_y = u.eventY(event) - this._y;
	u.a.transition(this, "none");
	if(typeof(this.picked) == "function") {
		this.picked(event);
	}
	u.e.addMoveEvent(this, u.e._scrolling);
	u.e.addEndEvent(this, u.e._scrollEnd);
}
u.e._scrolling = function(event) {
	this.new_move_timestamp = new Date().getTime();
	this.current_x = u.eventX(event) - this.start_input_x;
	this.current_y = u.eventY(event) - this.start_input_y;
	this.current_xps = Math.round(((this.current_x - this._x) / (this.new_move_timestamp - this.move_timestamp)) * 1000);
	this.current_yps = Math.round(((this.current_y - this._y) / (this.new_move_timestamp - this.move_timestamp)) * 1000);
	this.move_timestamp = this.new_move_timestamp;
	if(u.scrollY() > 0 && -(this.current_y) + u.scrollY() > 0) {
		u.e.kill(event);
		window.scrollTo(0, -(this.current_y) + u.scrollY());
	}
	if(typeof(this.moved) == "function") {
		this.moved(event);
	}
}
u.e._scrollEnd = function(event) {
	u.e.resetEvents(this);
	if(typeof(this.dropped) == "function") {
		this.dropped(event);
	}
}
u.e.beforeScroll = function(node) {
	node.e_beforescroll = true;
	u.e.addStartEvent(node, this._inputStartDrag);
}
u.e._inputStartDrag = function() {
	u.e.addMoveEvent(this, u.e._beforeScroll);
}
u.e._beforeScroll = function(event) {
	u.e.removeMoveEvent(this, u.e._beforeScroll);
	if(typeof(this.picked) == "function") {
		this.picked(event);
	}
}

/*beta-u-sequence.js*/
u.sequencePlayer = function(node, options) {
	var player;
	if(node) {
		player = u.ae(node, "div", {"class":"sequenceplayer"});
	}
	else {
		player = document.createElement("div");
		u.ac(player, "sequenceplayer");
	}
	player.t_playback = false;
	player._framerate = 12;
	if(typeof(options) == "object") {
		var argument;
		for(argument in options) {
			switch(argument) {
				case "framerate"		: this._framerate			= options[argument]; break;
			}
		}
	}
	else {
		options = {};
	}
	player.load = function(images, options) {
		this._load_callback;
		this._autoplay = false;
		if(typeof(options) == "object") {
			var argument;
			for(argument in options) {
				switch(argument) {
					case "load_callback"		: this._load_callback			= options[argument]; break;
					case "autoplay"				: this._autoplay				= options[argument]; break;
				}
			}
		}
		this.setup(images);
	}
	player.loadAndPlay = function(images, options) {
		if(!options) {
			options = {};
		}
		options.autoplay = true;
		this._options = options;
		this.load(images, options);
	}
	player.play = function(options) {
		this._ended_callback = null;
		this._from = this.sequence._start;
		this._to = this.sequence._end;
		if(typeof(options) == "object") {
			var argument;
			for(argument in options) {
				switch(argument) {
					case "ended_callback"	: this._ended_callback			= options[argument]; break;
					case "framerate"		: this._framerate				= options[argument]; break;
					case "to"				: this._to						= options[argument]; break;
					case "from"				: this._from					= options[argument]; break;
				}
			}
		}
		if(this._from <= this._to) {
			this._direction = 1;
		}
		else {
			this._direction = -1;
		}
			if(this._direction > 0) {
				var start_z_index = 4000;
				for(i = this.sequence._start; i <= this.sequence._end; i++) {
					if(i == this._from || i == this._from+1) {
						u.as(this._nodes[i], "display", "block", 1);
					}
					else {
						u.as(this._nodes[i], "display", "none", 1);
					}
					u.as(this._nodes[i], "zIndex", start_z_index-i, 1);
				}
			}
			else {
				var start_z_index = 4000 - this._nodes.length;
				for(i = this.sequence._end; i <= this.sequence._start; i--) {
					if(i == this._from || i == this._from-1) {
						u.as(this._nodes[i], "display", "block", 1);
					}
					else {
						u.as(this._nodes[i], "display", "none", 1);
					}
					u.as(this._nodes[i], "zIndex", start_z_index+i, 1);
				}
			}
			this.offsetHeight;
			this._current_frame = this._from;
		this.playback(true);
	}
	player.playback = function(start) {
		if(!start) {
			this.nextFrame(this._current_frame);
			this._current_frame = this._current_frame + this._direction;
		}
		if(this._to == this._current_frame) {
			if(typeof(this._ended_callback) == "function") {
				this._ended_callback();
			}
			else if(typeof(this.ended) == "function") {
				this.ended();
			}
		}
		else {
			this.t_playback = u.t.setTimer(this, this.playback, (1000/this._framerate));
		}
	}
	player.nextFrame = function(frame) {
		var after_next = (frame + (this._direction*2));
		if(this._nodes[after_next] && (this._direction > 0 ? after_next <= this._to : after_next >= this._to)) {
			u.as(this._nodes[after_next], "display", "block");
		}
		if(this._nodes[frame]) {
			u.as(this._nodes[frame], "display", "none");
		}
	}
	player.prevFrame = function(frame) {
		var after_next = (frame + this._direction);
		var prev = (frame - this._direction);
		if(this._nodes[prev]) {
			u.as(this._nodes[prev], "display", "block");
			if(this._nodes[after_next] && (this._direction > 0 ? after_next <= this._to : after_next >= this._to)) {
				u.as(this._nodes[after_next], "display", "none");
			}
		}
		else {
			for(i = this._from; i < this._to; i += this._direction) {
				if(i == this._to || i == this._to-this._direction) {
					u.as(this._nodes[i], "display", "block");
				}
				else {
					u.as(this._nodes[i], "display", "none");
				}
			}
		}
	}
	player.next = function(loop) {
		if(!loop || this._current_frame + this._direction <= this._to) {
			this.nextFrame(this._current_frame);
			this._current_frame = this._current_frame + this._direction;
		}
		else if(loop) {
			this.play();
			this.pause();
			this.nextFrame(this._current_frame);
			this._current_frame = this._current_frame + this._direction;
		}
	}
	player.prev = function(loop) {
		if(!loop || this._current_frame - this._direction >= this._from) {
			this.prevFrame(this._current_frame);
			this._current_frame = this._current_frame - this._direction;
		}
		else if(loop) {
			this.prevFrame(this._current_frame);
			this._current_frame = this._to;
		}
	}
	player.resume = function() {
		this.t_playback = u.t.setTimer(this, this.playback, (1000/this._framerate));
	}
	player.pause = function() {
		u.t.resetTimer(this.t_playback);
	}
	player.stop = function() {
		u.t.resetTimer(this.t_playback);
	}
	player.setup = function(images) {
		if(this.sequence) {
			this.removeChild(this.sequence);
		}
		this.sequence = u.ie(this, "ul", {"class":"sequence"});
		this.sequence.player = this;
		this._images = images;
		this._nodes = new Array();
		this.sequence._start = 0;
		this.sequence._end = this._images.length-1;
		this._current_frame = 0;
		this._setup = function() {
			for(i = 0; i <= this.sequence._end; i++) {
				this._nodes[i] = u.ae(this.sequence, "li", {"style":"background-image: url(" + this._images[i] + ");"});
				u.as(this._nodes[i], "display", "none", 1);
			}
			this.offsetHeight;
			if(typeof(this._load_callback) == "function") {
				this._load_callback();
			}
			else if(typeof(this.loaded) == "function") {
				this.loaded();
			}
			if(this._autoplay) {
			 	this.play(this._options);
			}
		}
		u.preloader(this, this._images, {"callback":this._setup});
	}
	return player;
}

/*u-init.js*/
Util.Objects = u.o = new Object();
Util.init = function(scope) {
	var i, node, nodes, object;
	scope = scope && scope.nodeName ? scope : document;
	nodes = u.ges("i\:([_a-zA-Z0-9])+");
	for(i = 0; node = nodes[i]; i++) {
		while((object = u.cv(node, "i"))) {
			u.rc(node, "i:"+object);
			if(object && typeof(u.o[object]) == "object") {
				u.o[object].init(node);
			}
		}
	}
}

/*i-page-mobile_touch.js*/
u.bug_force = true;
Util.Objects["page"] = new function() {
	this.init = function(page) {
		if(u.hc(page, "i:page")) {
			u.rc(page, "i:page");
			page.hN = u.qs("#header");
			page.hN.page = page;
			page.cN = u.qs("#content");
			page.cN.page = page;
			page.nN = u.qs("#navigation");
			page.nN.page = page;
			page.nN = u.ae(page.parentNode, page.nN);
			page.fN = u.qs("#footer");
			page.fN.page = page;
			page.ready = function() {
				if(!this.intro) {
					this.initHeader();
					this.initNavigation();
					this.cN.ready();
				}
				if(!u.hc(this, "ready")) {
					if(!u.qs(".desktop_wrapper") && !u.hc(document.body, "standalone")) {
						this.resetHeight();
					}
					u.addClass(this, "ready");
					u.as(this, "display", "block");
					u.a.transition(this, "none");
					u.a.setOpacity(this, 1);
					this.resized();
					u.navigation(page);
				}
			}
			page.resetHeight = function() {
				window.scrollTo(0, 0);
				if(u.gcs(this, "height") != "4000px") {
					u.a.setHeight(this, 4000);
					window.scrollTo(0, 0);
					this.resetHeight();
				}
				else {
					var h = window.innerHeight;
					u.a.setHeight(document.body, h);
				}
			}
			page.cN.ready = function() {
				if(!this.page.intro && u.hc(this.page, "ready") && u.hc(this, "ready")) {
					if(u.qsa(".scene", this).length > 1) {
						var transition_method = this.page.hash_node && this.page.hash_node.transition_method ? this.page.hash_node.transition_method : this.transitions.fadeIn;
						transition_method();
					}
					else {
						this.transitions.hard()
					}
				}
			}
			page.cN.navigate = function(url) {
				if(!u.qs(".desktop_wrapper") && !u.hc(document.body, "standalone")) {
					this.page.resetHeight();
				}
				this.response = function(response) {
					u.setClass(document.body, response.body_class.replace("i:validdevice", "").trim() + (u.hc(document.body, "standalone") ? " standalone": ""));
					document.title = response.head_title;
					this.page.hN.h1.update(u.qs(".scene h1", response) ? u.qs(".scene h1", response).innerHTML : "");
					var new_scene = u.qs(".scene", response);
					u.a.translate(new_scene, this.offsetWidth, 0);
					u.ae(this, new_scene);
					u.init(this);
				}
				u.request(this, u.h.getCleanHash(url));
			}
			page.cN.cleanScenes = function() {
				while(u.qsa(".scene", this).length > 1) {
					var scene = u.qs(".scene", this);
					scene.parentNode.removeChild(scene);
				}
			}
			page.cN.transitions = new Object();
			page.cN.transitions.page = page;
			page.cN.transitions.animateLeft = function() {
				var scenes = u.qsa(".scene", this.page.cN);
				u.a.transition(scenes[scenes.length-1], "none");
				u.a.translate(scenes[scenes.length-1], (this.page.offsetWidth), 0);
				u.a.setOpacity(scenes[scenes.length-1], 1);
				u.as(scenes[scenes.length-1], "display", "block");
				scenes[0].transitioned = function() {
					this.transitioned = null;
					u.a.transition(this, "none");
					this.cN.cleanScenes();
					if(typeof(this.entered) == "function") {
						this.entered();
					}
				}
				scenes[scenes.length-1].transitioned = function() {
					this.transitioned = null;
					u.a.transition(this, "none");
				}
				if(scenes[0]._x != -(this.page.offsetWidth)) {
					u.a.transition(scenes[0], "all 0.3s ease-out");
					u.a.translate(scenes[0], -(this.page.offsetWidth), scenes[0]._y);
				}
				else {
					scenes[0].transitioned();
				}
				u.a.transition(scenes[scenes.length-1], "all 0.3s ease-out");
				u.a.translate(scenes[scenes.length-1], 0, 0);
			}
			page.cN.transitions.animateRight = function() {
				var scenes = u.qsa(".scene", this.page.cN);
				u.a.transition(scenes[scenes.length-1], "none");
				u.a.translate(scenes[scenes.length-1], -(this.page.offsetWidth), 0);
				u.a.setOpacity(scenes[scenes.length-1], 1);
				u.as(scenes[scenes.length-1], "display", "block");
				scenes[0].transitioned = function() {
					this.transitioned = null;
					u.a.transition(this, "none");
					this.cN.cleanScenes();
					if(typeof(this.entered) == "function") {
						this.entered();
					}
				}
				scenes[scenes.length-1].transitioned = function() {
					this.transitioned = null;
					u.a.transition(this, "none");
					this.cN.cleanScenes();
				}
				if(scenes[0]._x != (this.page.offsetWidth)) {
					u.a.transition(scenes[0], "all 0.3s ease-out");
					u.a.translate(scenes[0], (this.page.offsetWidth), scenes[0]._y);
				}
				else {
					scenes[0].transitioned();
				}
				u.a.transition(scenes[scenes.length-1], "all 0.3s ease-out");
				u.a.translate(scenes[scenes.length-1], 0, 0);
			}
			page.cN.transitions.pullUp = function() {
				var scenes = u.qsa(".scene", this.page.cN);
				scenes[0].transitioned = function() {
					this.transitioned = null;
					u.a.transition(this, "none");
					this.cN.cleanScenes();
					if(typeof(this.cN.scene.entered) == "function") {
						this.cN.scene.entered();
					}
				}
				u.a.transition(scenes[0], "none");
				u.a.transition(scenes[scenes.length-1], "none");
				u.as(scenes[0], "zIndex", 10);
				u.as(scenes[scenes.length-1], "zIndex", 5);
				u.a.translate(scenes[scenes.length-1], 0, 0);
				u.a.setOpacity(scenes[scenes.length-1], 1);
				u.as(scenes[scenes.length-1], "display", "block");
				if(scenes[0]._x != -(scenes[0].offsetHeight)) {
					u.a.transition(scenes[0], "all 0.5s ease-out");
					u.a.translate(scenes[0], 0, -(scenes[0].offsetHeight));
				}
				else {
					scenes[0].transitioned();
				}
			}
			page.cN.transitions.dropDown = function() {
				var scenes = u.qsa(".scene", this.page.cN);
				scenes[scenes.length-1].transitioned = function() {
					this.transitioned = null;
					u.a.transition(this, "none");
					this.cN.cleanScenes();
					if(typeof(this.entered) == "function") {
						this.entered();
					}
				}
				u.a.transition(scenes[0], "none");
				u.a.transition(scenes[scenes.length-1], "none");
				u.as(scenes[0], "zIndex", 5);
				u.as(scenes[scenes.length-1], "zIndex", 1);
				u.a.setOpacity(scenes[scenes.length-1], 1);
				u.as(scenes[scenes.length-1], "display", "block");
				u.a.translate(scenes[scenes.length-1], 0, -(scenes[scenes.length-1].offsetHeight));
				u.as(scenes[scenes.length-1], "zIndex", 10);
				if(scenes[scenes.length-1]._y != 0) {
					u.a.transition(scenes[scenes.length-1], "all 0.5s ease-out");
					u.a.translate(scenes[scenes.length-1], 0, 0);
				}
				else {
					scenes[scenes.length-1].transitioned();
				}
			}
			page.cN.transitions.fadeIn = function() {
				var scene = u.qs(".scene", this.page.cN);
				scene.transitioned = function(event) {
					this.transitioned = null;
					u.a.transition(this, "none");
					this.cN.cleanScenes();
					var scene = u.qs(".scene", this.cN);
					scene.transitioned = function(event) {
						this.transitioned = null;
						u.a.transition(this, "none");
						this.cN.cleanScenes();
						if(typeof(this.entered) == "function") {
							this.entered();
						}
					}
					u.a.transition(scene, "none");
					u.a.setOpacity(scene, 0);
					u.a.translate(scene, 0, 0);
					u.as(scene, "display", "block");
					u.a.transition(scene, "all 0.3s ease-out");
					u.a.setOpacity(scene, 1);
				}
				if(u.gcs(scene, "opacity") == 1) {
					u.a.transition(scene, "all 0.3s ease-out");
					u.a.setOpacity(scene, 0);
				}
				else {
					scene.transitioned();
				}
			}
			page.cN.transitions.hard = function() {
				this.page.cN.cleanScenes();
				var scene = u.qs(".scene", this.page.cN);
				scene.transitioned = function(event) {
					this.transitioned = null;
					u.a.transition(this, "none");
					if(typeof(this.entered) == "function") {
						this.entered();
					}
				}
				u.a.transition(scene, "none");
				u.a.setOpacity(scene, 0);
				u.a.translate(scene, 0, 0);
				u.as(scene, "display", "block");
				u.a.transition(scene, "all 0.3s ease-out");
				u.a.setOpacity(scene, 1);
			}
			page.hN.h1 = u.ae(page.hN, "h1");
			page.hN.h1.update = function(new_text) {
				page.hN.h1._new_text = new_text;
				this.transitioned = function() {
					this.transitioned = null;
					u.a.transition(this, "none");
					this.innerHTML = this._new_text;
					this.transitioned = function() {
						this.transitioned = null;
						u.a.transition(this, "none");
					}
					u.a.transition(this, "all 0.2s ease-out");
					u.a.setOpacity(this, 1);
				}
				u.a.transition(this, "all 0.2s ease-out");
				u.a.setOpacity(this, 0);
			}
			page.hN.bn_nav = u.qs("li.navigation", this.hN);
			page.hN.bn_nav.page = page;
			page.hN.bn_nav.clicked = function(event) {
				u.e.kill(event);
				this.page.transitioned = function() {
					this.transitioned = null;
					u.a.transition(this, "none");
				}
				if(!u.hc(this.page.nN, "open")) {
					u.a.transition(this.page, "all 0.3s ease-in-out");
					u.a.translate(this.page, this.page.offsetWidth - this.offsetWidth, 0)
					u.ac(this.page.nN, "open");
				}
				else {
					u.a.transition(this.page, "all 0.3s ease-in-out");
					u.a.translate(this.page, 0, 0)
					u.rc(this.page.nN, "open");
				}
			}
			u.ce(page.hN.bn_nav);
			page.hN.bn_back = u.ae(u.qs(".servicenavigation", this.hN), "li", {"class":"back"});
			page.hN.bn_back.page = page;
			page.hN.bn_back.clicked = function(event) {
				this.transition_method = this.page.cN.transitions.animateRight;
				this.page.navigate(this.page.historyBack(), this);
			}
			u.ce(page.hN.bn_back);
			page.hN.bn_cart = u.ae(u.qs(".servicenavigation", page.hN), u.qs(".cart", page.nN).cloneNode(true));
			page.hN.bn_cart.span = u.ae(page.hN.bn_cart, "span", {"class":"empty"});
			page.hN.bn_cart.page = page;
			page.hN.bn_cart.clicked = function(event) {
				u.e.kill(event);
				if(u.h.getCleanHash(location.hash) != u.h.getCleanUrl(this.url)) {
					this.transition_method = this.page.cN.transitions.dropDown;
					this.page.navigate(this.url, this);
				}
				else {
					this.transition_method = this.page.cN.transitions.pullUp;
					this.page.navigate(this.page.historyBack(), this);
				}
			}
			u.ce(page.hN.bn_cart);
			page.initHeader = function() {
			}
			page.initNavigation = function() {
				u.as(this.nN, "display", "block");
				this.hN.updateCart();
				var i, node;
				var nodes = u.qsa("ul.store li,ul.partners li", this.nN);
				for(i = 0; node = nodes[i]; i++) {
					node.page = page;
					node.moved = function(event) {
						u.e.resetEvents(this);
					}
					node.clicked = function(event) {
						u.e.kill(event);
						this.page.navigate(this.url, this.page.nN);
						this.page.hN.bn_nav.clicked();
					}
					u.ce(node);
				}
				u.e.swipe(this.nN, this.nN);
				this.nN.swipedLeft = function() {
					this.page.hN.bn_nav.clicked();
				}
			}
			page.hN.addToCart = function() {
				var items = u.getCookie("cart");
				if(!isNaN(parseInt(items))) {
					items = parseInt(items) + 1;
				}
				else {
					items = 1;
				}
				this.bn_cart.span.innerHTML = items;
				u.saveCookie("cart", this.bn_cart.span.innerHTML);
				u.rc(this.bn_cart.span, "empty");
			}
			page.hN.updateCart = function() {
				var items = u.getCookie("cart");
				if(items && !isNaN(parseInt(items))) {
					this.bn_cart.span.innerHTML = parseInt(items);
					u.rc(this.bn_cart.span, "empty");
				}
				else {
					this.bn_cart.span.innerHTML = "";
					u.ac(this.bn_cart.span, "empty");
				}
			}
			page.hN.changeToBack = function() {
				if(u.gcs(this.bn_back, "opacity") != 1) {
					this.bn_nav.transitioned = function() {
						this.transitioned = null;
						u.a.transition(this, "none");
						u.as(this, "display", "none");
						u.a.transition(this.page.hN.bn_back, "none");
						u.a.setOpacity(this.page.hN.bn_back, 0);
						u.as(this.page.hN.bn_back, "display", "block");
						this.page.hN.bn_back.transitioned = function() {
							this.transitioned = null;
							u.a.transition(this, "none");
						}
						u.a.transition(this.page.hN.bn_back, "all 0.3s ease-in");
						u.a.setOpacity(this.page.hN.bn_back, 1);
					}
					if(u.gcs(this.bn_nav, "opacity") == 1) {
						u.a.transition(this.bn_nav, "all 0.1s ease-out");
						u.a.setOpacity(this.bn_nav, 0);
					}
					else {
						this.bn_nav.transitioned();
					}
				}
			}
			page.hN.changeToNav = function() {
				if(u.gcs(this.bn_nav, "opacity") != 1) {
					this.bn_back.transitioned = function() {
						this.transitioned = null;
						u.a.transition(this, "none");
						u.as(this, "display", "none");
						u.a.transition(this.page.hN.bn_nav, "none");
						u.a.setOpacity(this.page.hN.bn_nav, 0);
						u.as(this.page.hN.bn_nav, "display", "block");
						this.page.hN.bn_nav.transitioned = function() {
							this.transitioned = null;
							u.a.transition(this, "none");
						}
						u.a.transition(this.page.hN.bn_nav, "all 0.3s ease-in");
						u.a.setOpacity(this.page.hN.bn_nav, 1);
					}
					if(u.gcs(this.bn_back, "opacity") == 1) {
						u.a.transition(this.bn_back, "all 0.1s ease-out");
						u.a.setOpacity(this.bn_back, 0);
					}
					else {
						this.bn_back.transitioned();
					}
				}
			}
			page.resized = function() {
				var page = u.qs("#page");
				if(u.qs(".desktop_wrapper")) {
					page._page_state = page._page_state ? page._page_state : (page.offsetWidth > 480 ? 480 : 0);
					if(u.browserW() < 480 && page._page_state != 0) {
						page._orientationchanged();
						page._page_state = 0;
					}
					else if(u.browserW() >= 480 && page._page_state != 480) {
						page._orientationchanged();
						page._page_state = 480;
					}
					u.a.setHeight(page, u.qs(".desktop_mask").offsetHeight);
				}
				else {
	 				u.a.setHeight(document.body, window.innerHeight);
					u.a.setHeight(page, window.innerHeight - parseInt(u.gcs(document.body, "margin-top")));
				}
				if(page.intro && typeof(page.intro.resized) == "function" && page.intro.parentNode) {
					page.intro.resized();
				}
				if(page.bookmark && typeof(page.bookmark.resized) == "function" && page.bookmark.parentNode) {
					page.bookmark.resized();
				}
				if(page.hN && typeof(page.hN.resized) == "function") {
					page.hN.resized();
				}
				if(page.nN && typeof(page.nN.resized) == "function") {
					page.nN.resized();
				}
				if(page.cN && typeof(page.cN.resized) == "function") {
					page.cN.resized();
				}
				if(page.cN && page.cN.scene && typeof(page.cN.scene.resized) == "function") {
					page.cN.scene.resized();
				}
				if(page.fN && typeof(page.fN.resized) == "function") {
					page.fN.resized();
				}
			}
			u.e.addEvent(window, "resize", page.resized);
			page.cN.resized = function() {
				u.a.setHeight(this, this.page.offsetHeight - this.page.hN.offsetHeight);
			}
			page.nN.resized = function() {
				u.a.setHeight(this, this.page.offsetHeight);
			}
			page._orientationchanged = function(event) {
				u.rc(document.body, "landscape|portrait");
				u.ac(document.body, (this.orientation == 90 || this.orientation == 270) ? "landscape" : "portrait");
				var page = u.qs("#page");
				if(!u.qs(".desktop_wrapper") && !u.hc(document.body, "standalone")) {
					page.resetHeight();
				}
				page.cN.cleanScenes();
				if(page.cN.scene && page.cN.scene.parentNode) {
					page.cN.removeChild(page.cN.scene);
				}
				page.cN.navigate(u.h.getCleanHash(location.hash));
			}
			u.e.addEvent(window, "orientationchange", page._orientationchanged);
		}
		page.intro = u.ae(page, "div", {"class":"intro"});
		page.intro.page = page;
		page.intro.sequence_player = u.sequencePlayer(page.intro);
		page.intro.sequence_player.page = page;
		page.intro._images = new Array();
		for(i = 24; i <= 75; i++) {
			page.intro._images.push("/img/intro/Untitled-1_000" + (i < 10 ? "0" : "") + i + ".jpg");
		}
		page.intro.sequence_player.ended = function() {
			this.ended = function() {
				this.page.intro.transitioned = function() {
					u.a.transition(this, "none");
					this.transitioned = null;
					this.parentNode.removeChild(this);
					this.page.intro = null;
					this.page.ready();
				}
				u.a.transition(this.page.intro, "all 0.2s ease-out");
				u.a.setOpacity(this.page.intro, 0);
			}
			this.play({"from":this._to,"to":this._from});
		}
		page.intro.sequence_player.loaded = function() {
			u.as(this.page.intro, "display", "block");
			this.page.ready();
		}
		if(u.qs(".warning")) {
			page.intro.sequence_player.load(page.intro._images, {"framerate":24});
		}
		else if(u.qs(".desktop_wrapper")) {
			page.intro.sequence_player.loadAndPlay(page.intro._images, {"framerate":24});
		}
		else if(!navigator.standalone) {
			var repeat = u.getCookie("bookmark");
			if(repeat && Number(repeat)%5 == 0) {
				u.ac(document.body, "bookmark");
				page.bookmark = u.ae(document.body, "div", {"class":"bookmark"});
				page.bookmark.moved = function(event) {
					u.e.resetEvents(this);
				}
				page.bookmark.clicked = function() {
					this.bookmark = false;
					this.parentNode.removeChild(this);
					u.qs("#page").intro.sequence_player.play();
					u.rc(document.body, "bookmark");
				}
				u.e.click(page.bookmark);
				page.bookmark.resized = function() {
					u.a.setHeight(this, page.offsetHeight);
				}
				u.ae(page.bookmark, "h1", {"html":"Install this App"});
				u.ae(page.bookmark, "h2", {"html":"Or tap to continue"});
				u.ae(page.bookmark, "P", {"html":"Tap &quot;Add to homesceen&quot; to install this app on your phone."});
				page.intro.sequence_player.load(page.intro._images, {"framerate":24});
			}
			else {
				page.intro.sequence_player.loadAndPlay(page.intro._images, {"framerate":24});
			}
			u.saveCookie("bookmark", repeat ? ++repeat : 1)
		}
		else {
			u.ac(document.body, "standalone");
			page.intro.sequence_player.loadAndPlay(page.intro._images, {"framerate":24});
		}
	}
}
function static_init() {
	if(typeof(u.o.validdevice) == "object") {
		u.o.validdevice.init(document.body)
	}
	u.o.page.init(u.qs("#page"));
}
u.e.addDOMReadyEvent(static_init);

/*i-productlist.js*/
Util.Objects["productlist"] = new function() {
	this.init = function(scene) {
		scene.cN = u.qs("#content");
		scene.cN.scene = scene;
		scene.ready = function() {
			if(u.qsa("li.product", this).length == u.qsa("li.product.ready", this).length) {
				if(this.cN.offsetHeight < this.offsetHeight) {
					u.e.drag(this, [0, this.cN.offsetHeight - this.offsetHeight, this.offsetWidth, this.offsetHeight], {"show_bounds":false, "strict":false, "elastica":200});
					this.picked = function(event) {}
					this.moved = function(event) {
						if(this.current_yps < 0 && !u.hc(document.body, "standalone") && !u.qs(".desktop_wrapper")) {
							window.scrollTo(0, 0);
						}
					}
					this.dropped = function(event) {}
				}
				u.ac(this.cN, "ready");
				this.cN.ready();
			}
		}
		scene.resized = function() {
		}
		scene.cleanup = function() {
		}
		scene.navigate = function() {
		}
		var i, product;
		var products = u.qsa("li.product", scene);
		if(products.length) {
			for(i = 0; product = products[i]; i++) {
				product.scene = scene;
				var h2 = u.qs("h2", product);
				var desc = u.qs("div.description", product);
				var box = u.ie(product, "div", {"class":"box"});
				u.ae(box, h2);
				u.ae(box, desc);
				u.ce(product);
				product.clicked = function(event) {
					this.scene.transition_method = this.scene.cN.transitions.animateLeft;
					this.scene.cN.page.navigate(this.url, this.scene)
				}
				product.moved = function(event) {
					u.e.resetEvents(this);
				}
				product.loaded = function(queue) {
					u.as(this, "backgroundImage", "url("+queue[0]._image.src+")");
					u.as(this, "paddingTop", queue[0]._image.height+"px");
					u.ac(this, "ready");
					this.scene.ready();
				}
				u.preloader(product, ["/images/"+u.cv(product, "id")+"/"+product.scene.cN.page.offsetWidth+"x.jpg"]);
			}
		}
		else {
			scene.ready();
		}
		scene.cN.page.hN.changeToNav();
		var scene_images = new Array();
		scene_images.push("/img/gx_loader.gif");
	}
}

/*i-productview.js*/
Util.Objects["productview"] = new function() {
	this.init = function(scene) {
		scene.cN = u.qs("#content");
		scene.cN.scene = scene;
		scene.ready = function() {
			if(this.cN.offsetHeight < this.offsetHeight) {
				u.e.drag(this, [0, this.cN.offsetHeight - this.offsetHeight, this.offsetWidth, this.offsetHeight], {"show_bounds":false, "strict":false, "elastica":200});
				this.picked = function(event) {}
				this.moved = function(event) {
					if(this.current_yps < 0 && !u.hc(document.body, "standalone") && !u.qs(".desktop_wrapper")) {
						window.scrollTo(0, 0);
					}
				}
				this.dropped = function(event) {}
				u.ac(this.cN, "ready");
				this.cN.ready();
			}
		}
		scene.entered = function() {
			if(this.sequencePlayer) {
				this.sequencePlayer.loaded = function() {
					u.rc(this, "loading");
				}
				this.sequencePlayer.ended = function() {
					this.play();
				}
				u.ac(this.sequencePlayer, "loading");
				this.sequencePlayer.loadAndPlay(this.load_list, {"framerate":12});
				var carousel = u.ae(this.sequencePlayer, "div", {"class":"carousel"});
				carousel.sP = this.sequencePlayer;
				u.e.click(carousel);
				carousel.inputStarted = function(event) {
					this.sP.pause();
				}
				carousel.clicked = function(event) {
					this.sP.resume();
				}
				carousel.picked = function(event) {
					this._is_dragging = 1;
				}
				carousel.moved = function(event) {
					if(this._is_dragging) {
						if(this.current_x - this._is_dragging > 15) {
							this.sP.prev(true);
							this._is_dragging = this.current_x;
						}
						if(this.current_x - this._is_dragging < -15) {
							this.sP.next(true);
							this._is_dragging = this.current_x;
						}
					}
				}
				carousel.dropped = function(event) {
					this._is_dragging = false;
					this.sP.resume();
				}
				u.e.swipe(carousel, carousel, {"horizontal_lock":true});
			}
		}
		scene.resized = function() {
		}
		scene.cleanup = function() {
		}
		scene.navigate = function() {
		}
		var product = u.qs("div.product", scene);
		product.scene = scene;
		var offer = u.qs(".offer", product);
		u.ie(product, offer);
		var h1 = u.qs("h1", product);
		u.ie(product, h1);
		var images = u.qs("div.images", product);
		u.ie(product, images);
		var form = u.qs("form", product);
		form.onsubmit = function() {return false;};
		product.bn_buy = u.qs(".actions li.buy", product);
		product.bn_buy.page = scene.cN.page;
		product.bn_buy.clicked = function(event) {
			u.e.kill(event);
			this.page.hN.addToCart();
		}
		u.ce(product.bn_buy);
		product.bn_map = u.qs(".map", product);
		product.bn_map.page = scene.cN.page;
		product.bn_map.clicked = function(event) {
			u.e.kill(event);
			alert("Thank you for viewing our demo.")
		}
		u.ce(product.bn_map);
		images.scene = scene;
		images.loaded = function(queue) {
			u.a.setHeight(this, queue[0]._image.height);
			this.scene.ready();
		}
		var gallery_index = u.qs("ul.thumbnails", images);
		if(gallery_index) {
			var i, node;
			scene.cN.page.hN.changeToBack();
			scene.gallery = u.o.gallery.init(gallery_index)
			scene.gallery.ready = function() {
				if(u.h.getCleanUrl(location.href, 2) == u.h.getCleanUrl(location.href, 3)) {
					this.selectNode(0);
				}
				else {
					var index = u.h.getCleanUrl(location.href).split("/")[3];
					this.selectNode(index);
				}
			}
			u.preloader(images, ["/images/"+u.cv(u.qs("li", images), "id")+"/"+images.offsetWidth+"x.jpg"]);
		}
		var sequence_index = u.qs("ul.sequence", images);
		if(sequence_index) {
			scene.sequencePlayer = u.sequencePlayer(images, {"framerate":24});
			scene.cN.page.hN.changeToNav();
			scene.load_list = [];
			var sqs = u.qsa("li", sequence_index);
			var sq, i;
			for(i = 0; sq = sqs[i]; i++) {
				scene.load_list.push("/images/" + u.cv(sq, "id") + "/" + images.offsetWidth + "x.png");
			}
			u.preloader(images, ["/images/"+u.cv(u.qs("li", images), "id")+"/"+images.offsetWidth+"x.png"]);
		}
	}
}
/*i-cart.js*/
Util.Objects["cart"] = new function() {
	this.init = function(scene) {
		scene.cN = u.qs("#content");
		scene.cN.scene = scene;
		scene.ready = function() {
			if(this.cN.offsetHeight < this.offsetHeight) {
				u.e.drag(this, [0, this.cN.offsetHeight - this.offsetHeight, this.offsetWidth, this.offsetHeight], {"show_bounds":false, "strict":false, "elastica":200});
				this.picked = function(event) {}
				this.moved = function(event) {
					if(this.current_yps < 0 && !u.hc(document.body, "standalone") && !u.qs(".desktop_wrapper")) {
						window.scrollTo(0, 0);
					}
				}
				this.dropped = function(event) {}
			}
			u.ac(this.cN, "ready");
			this.cN.ready();
		}
		scene.resized = function() {
		}
		scene.cleanup = function() {
		}
		scene.navigate = function() {
		}
		scene.cN.page.hN.changeToNav();
		scene.bn_shop = u.qs(".shop", scene);
		scene.bn_shop.page = scene.cN.page;
		scene.bn_shop.transition_method = scene.cN.transitions.pullUp;
		scene.bn_shop.moved = function(event) {
			u.e.resetEvents(this);
		}
		scene.bn_shop.clicked = function() {
			this.page.navigate(this.page.historyBack(), this);
		}
		u.ce(scene.bn_shop);
		scene.bn_checkout = u.qs(".actions li.checkout", scene);
		scene.bn_checkout.page = scene.cN.page;
		scene.bn_checkout.transition_method = scene.cN.transitions.pullUp;
		scene.bn_checkout.moved = function(event) {
			u.e.resetEvents(this);
		}
		scene.bn_checkout.clicked = function(event) {
			u.e.kill(event);
			alert("Thank you for viewing our demo.")
			u.deleteCookie("cart");
			this.page.hN.updateCart();
			this.page.navigate("/", this);
		}
		u.ce(scene.bn_checkout);
		scene.cart_items = u.qsa(".items li", scene);
		var in_cart = u.getCookie("cart");
		in_cart = !isNaN(parseInt(in_cart)) ? parseInt(in_cart) : 0;
		var item, i;
		var total = 0;
		for(i = 0; item = scene.cart_items[i]; i++) {
			if(i < in_cart) {
				total += parseInt(u.qs(".price", item).innerHTML);
				u.as(item, "display", "block");
			}
			else {
				u.as(item, "display", "none");
			}
		}
		u.qs(".subtotal .price", scene).innerHTML = total + " kr.";
		u.qs(".total .price", scene).innerHTML = total + " kr.";
		scene.ready();
	}
}

/*i-additem.js*/
Util.Objects["additem"] = new function() {
	this.init = function(scene) {
		scene.cN = u.qs("#content");
		scene.cN.scene = scene;
		scene.ready = function() {
			if(this.cN.offsetHeight < this.offsetHeight) {
				u.e.drag(this, [0, this.cN.offsetHeight - this.offsetHeight, this.offsetWidth, this.offsetHeight], {"show_bounds":false, "strict":false, "elastica":200});
				this.picked = function(event) {}
				this.moved = function(event) {
					if(this.current_yps < 0 && !u.hc(document.body, "standalone") && !u.qs(".desktop_wrapper")) {
						window.scrollTo(0, 0);
					}
				}
				this.dropped = function(event) {}
			}
			u.ac(this.cN, "ready");
			this.cN.ready();
		}
		scene.resized = function() {
		}
		scene.cleanup = function() {
		}
		scene.navigate = function() {
		}
		scene.cN.page.hN.changeToNav();
		scene.files = u.qsa("input[type=file]", scene);
		var i, file;
		for(i = 0; file = scene.files[i]; i++) {
			file.scene = scene
			file.changed = function() {
				var reader = new FileReader();
				u.ac(this.form, "loading");
				reader.node = this;
				reader.onload = function(event) {
					u.a.setOpacity(this.node.scene.bn_upload, 1);
					u.rc(this.node.form, "loading");
					u.rc(this.node.form, "portrait");
					u.rc(this.node.form, "landscape");
					if(event.target.width / event.target.height < this.node.offsetWidth / this.node.offsetHeight) {
						u.ac(this.node.form, "landscape");
					}
					else {
						u.ac(this.node.form, "portrait");
					}
					u.as(this.node.form, "backgroundImage", "url("+event.target.result+")");
				}
				reader.readAsDataURL(this.files[0]);
			}
			u.e.addEvent(file, "change", file.changed);
		}
		scene.bn_upload = u.qs(".actions .upload", scene);
		scene.bn_upload.page = page;
		u.a.setOpacity(scene.bn_upload, 0.5);
		scene.bn_upload.clicked = function(event) {
			u.e.kill(event);
			alert("Thank you for viewing our demo.")
			this.page.navigate("/", this);
		}
		u.ce(scene.bn_upload);
		scene.ready();
	}
}

/*i-gallery.js*/
Util.Objects["gallery"] = new function() {
	this.init = function(list) {
		var i, node;
		var gallery = u.wrapElement(list, "div", {"class":"gallery"});
		gallery.list = list;
		gallery.t_loading = false;
		gallery.transition_type = "ease-out";
		gallery.transition_time = 0.6; // in seconds
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
		gallery._ready = function() {
			if(this.nodes.length == u.qsa("li.ready", this).length) {
				this.loaded();
					u.e.swipe(this, this, {"show_bounds":false, "horizontal_lock":true});
					this.picked = function(event) {
						this.prev_node = this.selected_node.i-1 < 0 ? this.nodes[this.nodes.length-1] : this.nodes[this.selected_node.i-1];
						this.next_node = this.selected_node.i+1 >= this.nodes.length ? this.nodes[0] : this.nodes[this.selected_node.i+1];
						u.a.transition(this.prev_node, "none");
						u.a.transition(this.selected_node, "none");
						u.a.transition(this.next_node, "none");
						u.a.translate(this.prev_node, -(this.image_width), 0);
						u.a.translate(this.next_node, (this.image_width), 0);
					}
					this.moved = function(event) {
						if(this.current_x > 0) {
							u.a.translate(this.prev_node, (this.current_x-this.image_width), 0);
						}
						else if(this.prev_node._x > -(this.image_width)) {
							u.a.translate(this.prev_node, -(this.image_width), 0);
						}
						u.a.translate(this.selected_node, this.current_x, 0);
						if(this.current_x < 0) {
							u.a.translate(this.next_node, (this.current_x+this.image_width), 0);
						}
						else if(this.next_node._x < (this.image_width)) {
							u.a.translate(this.next_node, (this.image_width), 0);
						}
					}
					this.dropped = function(event) {
						if(!this.swiped && this.selected_node._x != 0) {
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
						if(this.selected_node._x < 0) {
							this.selectNode(this.selected_node.i+1);
						}
						else {
							this.swiped = false;
						}
					}
					this.swipedRight = function(event) {
						if(this.selected_node._x > 0) {
							this.selectNode(this.selected_node.i-1);
						}
						else {
							this.swiped = false;
						}
					}
				if(typeof(this.ready) == "function") {
					this.ready();
				}
			}
		}
		gallery.nodeLoad = function(node) {
			if(!node.initialized) {
				node.initialized = true;
				node.loaded = function(queue) {
					u.as(this, "backgroundImage", "url("+queue[0]._image.src+")");
					u.a.transition(this, "none");
					u.a.translate(this, this.gallery.image_width, 0);
					u.as(this, "display", "block");
					u.ac(this, "ready");
					this.gallery._ready();
				}
				u.preloader(node, ["/images/"+u.cv(node, "id")+"/"+this.image_width+"x.jpg"]);
			}
			else {
				this.gallery._ready();
			}
		}
		gallery.selectNode = function(index, static_update) {
			if(!this.selected_node) {
				this.selected_node = this.nodes[index];
				u.a.transition(this.selected_node, "none");
				u.a.setOpacity(this.selected_node, 0);
				u.a.translate(this.selected_node, 0, 0);
				u.a.transition(this.selected_node, "all 1s ease-in");
				u.a.setOpacity(this.selected_node, 1);
			}
			else {
				var org_node = this.selected_node;
				this.direction = (index - org_node.i) > 0 ? 1 : -1;
				if(index < 0) {
					index = this.nodes.length-1;
				}
				else if(index >= this.nodes.length) {
					index = 0;
				}
				this.selected_node = this.nodes[index];
				if(static_update) {
					u.a.transition(org_node, "none");
					u.a.transition(this.selected_node, "none");
				}
				else if(this.swiped) {
					var duration;
					if(this.current_xps) {
				 		duration = ((this.image_width / Math.abs(this.current_xps)) * this.transition_time);
						duration = duration > this.transition_time ? this.transition_time : duration;
					}
					else {
						duration = this.transition_time / (1 - Math.abs(this.current_x / this.image_width));
					}
					duration = (duration > 1.5) ? 1.5 : ((duration < 0.2) ? 0.2 : duration);
					u.a.transition(org_node, "all " + duration + "s " + this.transition_type);
					u.a.transition(this.selected_node, "all " + duration + "s " + this.transition_type);
				}
				else {
					u.a.transition(this.selected_node, "none");
					u.a.translate(this.selected_node, this.image_width*this.direction, 0);
					u.a.transition(org_node, "all " + this.transition_time + "s " + this.transition_type);
					u.a.transition(this.selected_node, "all " + this.transition_time + "s " + this.transition_type);
				}
				u.a.translate(org_node, -(this.image_width*this.direction), 0);
				u.a.translate(this.selected_node, 0, 0);
			}
			if(typeof(this.nodeSelected) == "function") {
				this.nodeSelected();
			}
		}
		gallery.nodes = u.qsa("li", list);
		gallery.loading();
		for(i = 0; node = gallery.nodes[i]; i++) {
			node.gallery = gallery;
			node.i = i;
			gallery.nodeLoad(node);
		}
		return gallery;
	}
}
/*i-scene-generic.js*/
Util.Objects["scene"] = new function() {
	this.init = function(scene) {
		scene.cN = u.qs("#content");
		scene.cN.scene = scene;
		scene.ready = function() {
			if(this.cN.offsetHeight < this.offsetHeight) {
				u.e.drag(this, [0, this.cN.offsetHeight - this.offsetHeight, this.offsetWidth, this.offsetHeight], {"show_bounds":false, "strict":false, "elastica":200});
				this.picked = function(event) {}
				this.moved = function(event) {
					if(this.current_yps < 0 && !u.hc(document.body, "standalone") && !u.qs(".desktop_wrapper")) {
						window.scrollTo(0, 0);
					}
				}
				this.dropped = function(event) {}
			}
			u.ac(this.cN, "ready");
			this.cN.ready();
		}
		scene.resized = function() {
		}
		scene.cleanup = function() {
		}
		scene.navigate = function() {
		}
		scene.cN.page.hN.changeToNav();
		scene.ready();
	}
}

/*u-navigation.js*/
u.navigation = function(page, options) {
	page._nav_path = page._nav_path ? page._nav_path : "/";
	page._nav_history = page._nav_history ? page._nav_history : [];
	page._navigate = function() {
		var url = u.h.getCleanHash(location.hash);
		page._nav_history.unshift(url);
		u.stats.pageView(url);
		if(!this._nav_path || this._nav_path != u.h.getCleanHash(location.hash, 1)) {
			if(this.cN && typeof(this.cN.navigate) == "function") {
				this.cN.navigate(url);
			}
		}
		else {
			if(this.cN.scene && this.cN.scene.parentNode && typeof(this.cN.scene.navigate) == "function") {
				this.cN.scene.navigate(url);
			}
		}
		this._nav_path = u.h.getCleanHash(location.hash, 1);
	}
	page.navigate = function(url, node) {
		this.hash_node = node ? node : false;
		location.hash = u.h.getCleanUrl(url);
	}
	if(location.hash.length < 2) {
		page.navigate(location.href, page);
		page._nav_path = u.h.getCleanUrl(location.href);
		u.init(page.cN);
	}
	else if(u.h.getCleanHash(location.hash) != u.h.getCleanUrl(location.href)) {
		page._nav_path = u.h.getCleanUrl(location.href);
		page._navigate();
	}
	else {
		u.init(page.cN);
	}
	page._initHash = function() {
		u.h.catchEvent(page._navigate, page);
	}
	u.t.setTimer(page, page._initHash, 100);
	page.historyBack = function() {
		if(this._nav_history.length > 1) {
			this._nav_history.shift();
			return this._nav_history.shift();
		}
		else {
			return "/";
		}
	}
}

/*i-desktop.js*/
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
