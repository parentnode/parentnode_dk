/*
parentNode, Copyright 2008-2023, https://manipulator.parentnode.dk
asset-builder @ 2024-04-22 14:18:17
*/

/*seg_desktop_include.js*/

/*seg_desktop.js*/
if(!u || !Util) {
	var u, Util = u = new function() {};
	u.version = "0.9.3";
	u.bug = u.nodeId = u.exception = function() {};
	u.stats = new function() {this.pageView = function(){};this.event = function(){};}
	u.txt = function(index) {return index;}
}
function fun(v) {return (typeof(v) === "function")}
function obj(v) {return (typeof(v) === "object")}
function str(v) {return (typeof(v) === "string")}
u.bug_console_only = true;
Util.debugURL = function(url) {
	if(u.bug_force) {
		return true;
	}
	return document.domain.match(/(\.local|\.proxy)$/);
}
Util.nodeId = function(node, include_path) {
	console.log("Util.nodeId IS DEPRECATED. Use commas in u.bug in stead.");
	console.log(arguments.callee.caller);
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
		u.exception("u.nodeId", arguments, exception);
	}
	return "Unindentifiable node!";
}
Util.exception = function(name, _arguments, _exception) {
	u.bug("Exception in: " + name + " (" + _exception + ")");
	console.error(_exception);
	u.bug("Invoked with arguments:");
	console.log(_arguments);
}
Util.bug = function() {
	if(u.debugURL()) {
		if(!u.bug_console_only) {
			var i, message;
			if(obj(console)) {
				for(i = 0; i < arguments.length; i++) {
					if(arguments[i] || typeof(arguments[i]) == "undefined") {
						console.log(arguments[i]);
					}
				}
			}
			var option, options = new Array([0, "auto", "auto", 0], [0, 0, "auto", "auto"], ["auto", 0, 0, "auto"], ["auto", "auto", 0, 0]);
			var corner = u.bug_corner ? u.bug_corner : 0;
			var color = u.bug_color ? u.bug_color : "black";
			option = options[corner];
			if(!document.getElementById("debug_id_"+corner)) {
				var d_target = u.ae(document.body, "div", {"class":"debug_"+corner, "id":"debug_id_"+corner});
				d_target.style.position = u.bug_position ? u.bug_position : "absolute";
				d_target.style.zIndex = 16000;
				d_target.style.top = option[0];
				d_target.style.right = option[1];
				d_target.style.bottom = option[2];
				d_target.style.left = option[3];
				d_target.style.backgroundColor = u.bug_bg ? u.bug_bg : "#ffffff";
				d_target.style.color = "#000000";
				d_target.style.fontSize = "11px";
				d_target.style.lineHeight = "11px";
				d_target.style.textAlign = "left";
				if(d_target.style.maxWidth) {
					d_target.style.maxWidth = u.bug_max_width ? u.bug_max_width+"px" : "auto";
				}
				d_target.style.padding = "2px 3px";
			}
			for(i = 0; i < arguments.length; i++) {
				if(arguments[i] === undefined) {
					message = "undefined";
				}
				else if(!str(arguments[i]) && fun(arguments[i].toString)) {
					message = arguments[i].toString();
				}
				else {
					message = arguments[i];
				}
				var debug_div = document.getElementById("debug_id_"+corner);
				message = message ? message.replace(/\>/g, "&gt;").replace(/\</g, "&lt;").replace(/&lt;br&gt;/g, "<br>") : "Util.bug with no message?";
				u.ae(debug_div, "div", {"style":"color: " + color, "html": message});
			}
		}
		else if(typeof(console) !== "undefined" && obj(console)) {
			var i;
			for(i = 0; i < arguments.length; i++) {
				console.log(arguments[i]);
			}
		}
	}
}
Util.xInObject = function(object, _options) {
	if(u.debugURL()) {
		var return_string = false;
		var explore_objects = false;
		if(obj(_options)) {
			var _argument;
			for(_argument in _options) {
				switch(_argument) {
					case "return"     : return_string               = _options[_argument]; break;
					case "objects"    : explore_objects             = _options[_argument]; break;
				}
			}
		}
		var x, s = "--- start object ---\n";
		for(x in object) {
			if(explore_objects && object[x] && obj(object[x]) && !str(object[x].nodeName)) {
				s += x + "=" + object[x]+" => \n";
				s += u.xInObject(object[x], true);
			}
			else if(object[x] && obj(object[x]) && str(object[x].nodeName)) {
				s += x + "=" + object[x]+" -> " + u.nodeId(object[x], 1) + "\n";
			}
			else if(object[x] && fun(object[x])) {
				s += x + "=function\n";
			}
			else {
				s += x + "=" + object[x]+"\n";
			}
		}
		s += "--- end object ---\n";
		if(return_string) {
			return s;
		}
		else {
			u.bug(s);
		}
	}
}
Util.Animation = u.a = new function() {
	this.support3d = function() {
		if(this._support3d === undefined) {
			var node = u.ae(document.body, "div");
			try {
				u.as(node, "transform", "translate3d(10px, 10px, 10px)");
				if(u.gcs(node, "transform").match(/matrix3d\(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 10, 10, 10, 1\)/)) {
					this._support3d = true;
				}
	 			else {
					this._support3d = false;
				}
			}
			catch(exception) {
				this._support3d = false;
			}
			document.body.removeChild(node);
		}
		return this._support3d;
	}
	this.transition = function(node, transition, callback) {
		try {
			var duration = transition.match(/[0-9.]+[ms]+/g);
			if(duration) {
				node.duration = duration[0].match("ms") ? parseFloat(duration[0]) : (parseFloat(duration[0]) * 1000);
				if(callback) {
					var transitioned;
					transitioned = (function(event) {
						u.e.removeEvent(event.target, u.a.transitionEndEventName(), transitioned);
						if(event.target == this) {
							u.a.transition(this, "none");
							if(fun(callback)) {
								var key = u.randomString(4);
								node[key] = callback;
								node[key](event);
								delete node[key];
								callback = null;
							}
							else if(fun(this[callback])) {
								this[callback](event);
							}
						}
						else {
						}
					});
					u.e.addEvent(node, u.a.transitionEndEventName(), transitioned);
				}
				else {
					u.e.addEvent(node, u.a.transitionEndEventName(), this._transitioned);
				}
			}
			else {
				node.duration = false;
			}
			u.as(node, "transition", transition);
		}
		catch(exception) {
			u.exception("u.a.transition", arguments, exception);
		}
	}
	this.transitionEndEventName = function() {
		if(!this._transition_end_event_name) {
			this._transition_end_event_name = "transitionend";
			var transitions = {
				"transition": "transitionend",
				"MozTransition": "transitionend",
				"msTransition": "transitionend",
				"webkitTransition": "webkitTransitionEnd",
				"OTransition": "otransitionend"
			};
			var x, div = document.createElement("div");
			for(x in transitions){
				if(typeof(div.style[x]) !== "undefined") {
					this._transition_end_event_name = transitions[x];
					break;
				}
			}
		}
		return this._transition_end_event_name;
	}
	this._transitioned = function(event) {
		if(event.target == this) {
			u.e.removeEvent(event.target, u.a.transitionEndEventName(), u.a._transitioned);
			u.a.transition(event.target, "none");
			if(fun(this.transitioned)) {
				this.transitioned_before = this.transitioned;
				this.transitioned(event);
				if(this.transitioned === this.transitioned_before) {
					delete this.transitioned;
				}
			}
		}
	}
	this.translate = function(node, x, y) {
		if(this.support3d()) {
			u.as(node, "transform", "translate3d("+x+"px, "+y+"px, 0)");
		}
		else {
			u.as(node, "transform", "translate("+x+"px, "+y+"px)");
		}
		node._x = x;
		node._y = y;
		node.offsetHeight;
	}
	this.rotate = function(node, deg) {
		u.as(node, "transform", "rotate("+deg+"deg)");
		node._rotation = deg;
		node.offsetHeight;
	}
	this.scale = function(node, scale) {
		u.as(node, "transform", "scale("+scale+")");
		node._scale = scale;
		node.offsetHeight;
	}
	this.setOpacity = this.opacity = function(node, opacity) {
		u.as(node, "opacity", opacity);
		node._opacity = opacity;
		node.offsetHeight;
	}
	this.setWidth = this.width = function(node, width) {
		width = width.toString().match(/\%|auto|px/) ? width : (width + "px");
		node.style.width = width;
		node._width = width;
		node.offsetHeight;
	}
	this.setHeight = this.height = function(node, height) {
		height = height.toString().match(/\%|auto|px/) ? height : (height + "px");
		node.style.height = height;
		node._height = height;
		node.offsetHeight;
	}
	this.setBgPos = this.bgPos = function(node, x, y) {
		x = x.toString().match(/\%|auto|px|center|top|left|bottom|right/) ? x : (x + "px");
		y = y.toString().match(/\%|auto|px|center|top|left|bottom|right/) ? y : (y + "px");
		node.style.backgroundPosition = x + " " + y;
		node._bg_x = x;
		node._bg_y = y;
		node.offsetHeight;
	}
	this.setBgColor = this.bgColor = function(node, color) {
		node.style.backgroundColor = color;
		node._bg_color = color;
		node.offsetHeight;
	}
	this._animationqueue = {};
	this.requestAnimationFrame = function(node, callback, duration) {
		if(!u.a.__animation_frame_start) {
			u.a.__animation_frame_start = Date.now();
		}
		var id = u.randomString();
		u.a._animationqueue[id] = {};
		u.a._animationqueue[id].id = id;
		u.a._animationqueue[id].node = node;
		u.a._animationqueue[id].callback = callback;
		u.a._animationqueue[id].duration = duration;
		u.t.setTimer(u.a, function() {u.a.finalAnimationFrame(id)}, duration);
		if(!u.a._animationframe) {
			window._requestAnimationFrame = eval(u.vendorProperty("requestAnimationFrame"));
			window._cancelAnimationFrame = eval(u.vendorProperty("cancelAnimationFrame"));
			u.a._animationframe = function(timestamp) {
				var id, animation;
				for(id in u.a._animationqueue) {
					animation = u.a._animationqueue[id];
					if(!animation["__animation_frame_start_"+id]) {
						animation["__animation_frame_start_"+id] = timestamp;
					}
					if(fun(animation.node[animation.callback])) {
						animation.node[animation.callback]((timestamp-animation["__animation_frame_start_"+id]) / animation.duration);
					}
				}
				if(Object.keys(u.a._animationqueue).length) {
					u.a._requestAnimationId = window._requestAnimationFrame(u.a._animationframe);
				}
			}
		}
		if(!u.a._requestAnimationId) {
			u.a._requestAnimationId = window._requestAnimationFrame(u.a._animationframe);
		}
		return id;
	}
	this.finalAnimationFrame = function(id) {
		var animation = u.a._animationqueue[id];
		animation["__animation_frame_start_"+id] = false;
		if(fun(animation.node[animation.callback])) {
			animation.node[animation.callback](1);
		}
		if(fun(animation.node.transitioned)) {
			animation.node.transitioned({});
		}
		delete u.a._animationqueue[id];
		if(!Object.keys(u.a._animationqueue).length) {
			this.cancelAnimationFrame(id);
		}
	}
	this.cancelAnimationFrame = function(id) {
		if(id && u.a._animationqueue[id]) {
			delete u.a._animationqueue[id];
		}
		if(u.a._requestAnimationId) {
			window._cancelAnimationFrame(u.a._requestAnimationId);
			u.a.__animation_frame_start = false;
			u.a._requestAnimationId = false;
		}
	}
}
Util.saveCookie = function(name, value, _options) {
	var expires = true;
	var path = false;
	var samesite = "lax";
	var force = false;
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "expires"	: expires	= _options[_argument]; break;
				case "path"		: path		= _options[_argument]; break;
				case "samesite"	: samesite	= _options[_argument]; break;
				case "force"	: force		= _options[_argument]; break;
			}
		}
	}
	if(!force && obj(window.localStorage) && obj(window.sessionStorage)) {
		if(expires === true) {
			window.sessionStorage.setItem(name, value);
		}
		else {
			window.localStorage.setItem(name, value);
		}
		return;
	}
	if(expires === false) {
		expires = ";expires="+(new Date((new Date()).getTime() + (1000*60*60*24*365))).toGMTString();
	}
	else if(str(expires)) {
		expires = ";expires="+expires;
	}
	else {
		expires = "";
	}
	if(str(path)) {
		path = ";path="+path;
	}
	else {
		path = "";
	}
	samesite = ";samesite="+samesite;
	document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + path + expires + samesite;
}
Util.getCookie = function(name) {
	var matches;
	if(obj(window.sessionStorage) && window.sessionStorage.getItem(name)) {
		return window.sessionStorage.getItem(name)
	}
	else if(obj(window.localStorage) && window.localStorage.getItem(name)) {
		return window.localStorage.getItem(name)
	}
	return (matches = document.cookie.match(encodeURIComponent(name) + "=([^;]+)")) ? decodeURIComponent(matches[1]) : false;
}
Util.deleteCookie = function(name, _options) {
	var path = false;
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "path"	: path	= _options[_argument]; break;
			}
		}
	}
	if(obj(window.sessionStorage)) {
		window.sessionStorage.removeItem(name);
	}
	if(obj(window.localStorage)) {
		window.localStorage.removeItem(name);
	}
	if(str(path)) {
		path = ";path="+path;
	}
	else {
		path = "";
	}
	document.cookie = encodeURIComponent(name) + "=" + path + ";expires=Thu, 01-Jan-70 00:00:01 GMT";
}
Util.saveNodeCookie = function(node, name, value, _options) {
	var ref = u.cookieReference(node, _options);
	var mem = JSON.parse(u.getCookie("man_mem"));
	if(!mem) {
		mem = {};
	}
	if(!mem[ref]) {
		mem[ref] = {};
	}
	mem[ref][name] = (value !== false && value !== undefined) ? value : "";
	u.saveCookie("man_mem", JSON.stringify(mem), {"path":"/"});
}
Util.getNodeCookie = function(node, name, _options) {
	var ref = u.cookieReference(node, _options);
	var mem = JSON.parse(u.getCookie("man_mem"));
	if(mem && mem[ref]) {
		if(name) {
			return (typeof(mem[ref][name]) != "undefined") ? mem[ref][name] : false;
		}
		else {
			return mem[ref];
		}
	}
	return false;
}
Util.deleteNodeCookie = function(node, name, _options) {
	var ref = u.cookieReference(node, _options);
	var mem = JSON.parse(u.getCookie("man_mem"));
	if(mem && mem[ref]) {
		if(name) {
			delete mem[ref][name];
		}
		else {
			delete mem[ref];
		}
	}
	u.saveCookie("man_mem", JSON.stringify(mem), {"path":"/"});
}
Util.cookieReference = function(node, _options) {
	var ref;
	var ignore_classnames = false;
	var ignore_classvars = false;
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "ignore_classnames"	: ignore_classnames	= _options[_argument]; break;
				case "ignore_classvars" 	: ignore_classvars	= _options[_argument]; break;
			}
		}
	}
	if(node.id) {
		ref = node.nodeName + "#" + node.id;
	}
	else {
		var node_identifier = "";
		if(node.name) {
			node_identifier = node.nodeName + "["+node.name+"]";
		}
		else if(node.className) {
			var classname = node.className;
			if(ignore_classnames) {
				var regex = new RegExp("(^| )("+ignore_classnames.split(",").join("|")+")($| )", "g");
				classname = classname.replace(regex, " ").replace(/[ ]{2,4}/, " ");
			}
			if(ignore_classvars) {
				classname = classname.replace(/\b[a-zA-Z_]+\:[\?\=\w\/\\#~\:\.\,\+\&\%\@\!\-]+\b/g, "").replace(/[ ]{2,4}/g, " ");
			}
			node_identifier = node.nodeName+"."+classname.trim().replace(/ /g, ".");
		}
		else {
			node_identifier = node.nodeName
		}
		var id_node = node;
		while(!id_node.id) {
			id_node = id_node.parentNode;
		}
		if(id_node.id) {
			ref = id_node.nodeName + "#" + id_node.id + " " + node_identifier;
		}
		else {
			ref = node_identifier;
		}
	}
	return ref;
}
Util.date = function(format, timestamp, months) {
	var date = timestamp ? new Date(timestamp) : new Date();
	if(isNaN(date.getTime())) {
		if(new Date(timestamp.replace(/ /, "T"))) {
			date = new Date(timestamp.replace(/ /, "T"));
		}
		else {
			if(!timestamp.match(/[A-Z]{3}\+[0-9]{4}/)) {
				if(timestamp.match(/ \+[0-9]{4}/)) {
					date = new Date(timestamp.replace(/ (\+[0-9]{4})/, " GMT$1"));
				}
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
	try {
		scope = scope ? scope : document;
		return scope.querySelectorAll(query);
	}
	catch(exception) {
		u.exception("u.qsa", arguments, exception);
	}
	return [];
}
Util.getElement = u.ge = function(identifier, scope) {
	var node, nodes, i, regexp;
	if(document.getElementById(identifier)) {
		return document.getElementById(identifier);
	}
	scope = scope ? scope : document;
	regexp = new RegExp("(^|\\s)" + identifier + "(\\s|$|\:)");
	nodes = scope.getElementsByTagName("*");
	for(i = 0; i < nodes.length; i++) {
		node = nodes[i];
		if(regexp.test(node.className)) {
			return node;
		}
	}
	return scope.getElementsByTagName(identifier).length ? scope.getElementsByTagName(identifier)[0] : false;
}
Util.getElements = u.ges = function(identifier, scope) {
	var node, nodes, i, regexp;
	var return_nodes = new Array();
	scope = scope ? scope : document;
	regexp = new RegExp("(^|\\s)" + identifier + "(\\s|$|\:)");
	nodes = scope.getElementsByTagName("*");
	for(i = 0; i < nodes.length; i++) {
		node = nodes[i];
		if(regexp.test(node.className)) {
			return_nodes.push(node);
		}
	}
	return return_nodes.length ? return_nodes : scope.getElementsByTagName(identifier);
}
Util.parentNode = u.pn = function(node, _options) {
	var exclude = "";
	var include = "";
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "include"      : include       = _options[_argument]; break;
				case "exclude"      : exclude       = _options[_argument]; break;
			}
		}
	}
	var exclude_nodes = exclude ? u.qsa(exclude) : [];
	var include_nodes = include ? u.qsa(include) : [];
	node = node.parentNode;
	while(node && (node.nodeType == 3 || node.nodeType == 8 || (exclude && (u.inNodeList(node, exclude_nodes))) || (include && (!u.inNodeList(node, include_nodes))))) {
		node = node.parentNode;
	}
	return node;
}
Util.previousSibling = u.ps = function(node, _options) {
	var exclude = "";
	var include = "";
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "include"      : include       = _options[_argument]; break;
				case "exclude"      : exclude       = _options[_argument]; break;
			}
		}
	}
	var exclude_nodes = exclude ? u.qsa(exclude, node.parentNode) : [];
	var include_nodes = include ? u.qsa(include, node.parentNode) : [];
	node = node.previousSibling;
	while(node && (node.nodeType == 3 || node.nodeType == 8 || (exclude && (u.inNodeList(node, exclude_nodes))) || (include && (!u.inNodeList(node, include_nodes))))) {
		node = node.previousSibling;
	}
	return node;
}
Util.nextSibling = u.ns = function(node, _options) {
	var exclude = "";
	var include = "";
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "include"      : include       = _options[_argument]; break;
				case "exclude"      : exclude       = _options[_argument]; break;
			}
		}
	}
	var exclude_nodes = exclude ? u.qsa(exclude, node.parentNode) : [];
	var include_nodes = include ? u.qsa(include, node.parentNode) : [];
	node = node.nextSibling;
	while(node && (node.nodeType == 3 || node.nodeType == 8 || (exclude && (u.inNodeList(node, exclude_nodes))) || (include && (!u.inNodeList(node, include_nodes))))) {
		node = node.nextSibling;
	}
	return node;
}
Util.childNodes = u.cn = function(node, _options) {
	var exclude = "";
	var include = "";
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "include"      : include       = _options[_argument]; break;
				case "exclude"      : exclude       = _options[_argument]; break;
			}
		}
	}
	var exclude_nodes = exclude ? u.qsa(exclude, node) : [];
	var include_nodes = include ? u.qsa(include, node) : [];
	var i, child;
	var children = new Array();
	for(i = 0; i < node.childNodes.length; i++) {
		child = node.childNodes[i]
		if(child && child.nodeType != 3 && child.nodeType != 8 && (!exclude || (!u.inNodeList(child, exclude_nodes))) && (!include || (u.inNodeList(child, include_nodes)))) {
			children.push(child);
		}
	}
	return children;
}
Util.appendElement = u.ae = function(_parent, node_type, attributes) {
	try {
		var node = (obj(node_type)) ? node_type : (node_type == "svg" ? document.createElementNS("http://www.w3.org/2000/svg", node_type) : document.createElement(node_type));
		node = _parent.appendChild(node);
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
		u.exception("u.ae", arguments, exception);
	}
	return false;
}
Util.insertElement = u.ie = function(_parent, node_type, attributes) {
	try {
		var node = (obj(node_type)) ? node_type : (node_type == "svg" ? document.createElementNS("http://www.w3.org/2000/svg", node_type) : document.createElement(node_type));
		node = _parent.insertBefore(node, _parent.firstChild);
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
		u.exception("u.ie", arguments, exception);
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
		u.exception("u.we", arguments, exception);
	}
	return false;
}
Util.wrapContent = u.wc = function(node, node_type, attributes) {
	try {
		var wrapper_node = document.createElement(node_type);
		if(attributes) {
			var attribute;
			for(attribute in attributes) {
				wrapper_node.setAttribute(attribute, attributes[attribute]);
			}
		}	
		while(node.childNodes.length) {
			wrapper_node.appendChild(node.childNodes[0]);
		}
		node.appendChild(wrapper_node);
		return wrapper_node;
	}
	catch(exception) {
		u.exception("u.wc", arguments, exception);
	}
	return false;
}
Util.textContent = u.text = function(node) {
	try {
		return node.textContent;
	}
	catch(exception) {
		u.exception("u.text", arguments, exception);
	}
	return "";
}
Util.clickableElement = u.ce = function(node, _options) {
	node._use_link = "a";
	node._click_type = "manual";
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "use"			: node._use_link		= _options[_argument]; break;
				case "type"			: node._click_type		= _options[_argument]; break;
			}
		}
	}
	var a = (node.nodeName.toLowerCase() == "a" ? node : u.qs(node._use_link, node));
	if(a) {
		u.ac(node, "link");
		if(a.getAttribute("href") !== null) {
			node.url = a.href;
			a.url = a.href;
			node.onclick = function(event) {
				event.preventDefault();
			}
			node._a = a;
		}
	}
	else {
		u.ac(node, "clickable");
	}
	if(obj(u.e) && fun(u.e.click)) {
		u.e.click(node, _options);
		if(node._click_type == "link") {
			node.clicked = function(event) {
				if(fun(node.preClicked)) {
					node.preClicked();
				}
				if(event && (event.metaKey || event.ctrlKey || (this._a && this._a.target))) {
					window.open(this.url);
				}
				else {
					if(obj(u.h) && u.h.is_listening) {
						u.h.navigate(this.url, this);
					}
					else {
						location.href = this.url;
					}
				}
			}
		}
	}
	return node;
}
Util.classVar = u.cv = function(node, var_name) {
	try {
		var regexp = new RegExp("(\^| )" + var_name + ":[?=\\w/\\#~:.,?+=?&%@!\\-]*");
		var match = node.className.match(regexp);
		if(match) {
			return match[0].replace(var_name + ":", "").trim();
		}
	}
	catch(exception) {
		u.exception("u.cv", arguments, exception);
	}
	return false;
}
Util.setClass = u.sc = function(node, classname, dom_update) {
	var old_class;
	if(node instanceof SVGElement) {
		old_class = node.className.baseVal;
		node.setAttribute("class", classname);
	}
	else {
		old_class = node.className;
		node.className = classname;
	}
	dom_update = (dom_update === false) || (node.offsetTop);
	return old_class;
}
Util.hasClass = u.hc = function(node, classname) {
	if(node.classList.contains(classname)) {
		return true;
	}
	else {
		var regexp = new RegExp("(^|\\s)(" + classname + ")(\\s|$)");
		if(node instanceof SVGElement) {
			if(regexp.test(node.className.baseVal)) {
				return true;
			}
		}
		else {
			if(regexp.test(node.className)) {
				return true;
			}
		}
	}
	return false;
}
Util.addClass = u.ac = function(node, classname, dom_update) {
	var classnames = classname.split(" ");
	while(classnames.length) {
		node.classList.add(classnames.shift());
	}
	dom_update = (dom_update === false) || (node.offsetTop);
	return node.className;
}
Util.removeClass = u.rc = function(node, classname, dom_update) {
	if(node.classList.contains(classname)) {
		node.classList.remove(classname);
	}
	else {
		var regexp = new RegExp("(^|\\s)(" + classname + ")(?=[\\s]|$)", "g");
		if(node instanceof SVGElement) {
			node.setAttribute("class", node.className.baseVal.replace(regexp, " ").trim().replace(/[\s]{2}/g, " "));
		}
		else {
			node.className = node.className.replace(regexp, " ").trim().replace(/[\s]{2}/g, " ");
		}
	}
	dom_update = (dom_update === false) || (node.offsetTop);
	return node.className;
}
Util.toggleClass = u.tc = function(node, classname, _classname, dom_update) {
	if(u.hc(node, classname)) {
		u.rc(node, classname, dom_update);
		if(_classname) {
			u.ac(node, _classname, dom_update);
		}
	}
	else {
		u.ac(node, classname);
		if(_classname) {
			u.rc(node, _classname, dom_update);
		}
	}
	dom_update = (dom_update === false) || (node.offsetTop);
	return node.className;
}
Util.applyStyle = u.as = function(node, property, value, dom_update) {
	node.style[u.vendorProperty(property)] = value;
	dom_update = (dom_update === false) || (node.offsetTop);
}
Util.applyStyles = u.ass = function(node, styles, dom_update) {
	if(styles) {
		var style;
		for(style in styles) {
			if(obj(u.a) && style == "transition") {
				u.a.transition(node, styles[style]);
			}
			else {
				node.style[u.vendorProperty(style)] = styles[style];
			}
		}
	}
	dom_update = (dom_update === false) || (node.offsetTop);
}
Util.getComputedStyle = u.gcs = function(node, property) {
	var dom_update = node.offsetHeight;
	property = (u.vendorProperty(property).replace(/([A-Z]{1})/g, "-$1")).toLowerCase().replace(/^(webkit|ms)/, "-$1");
	return window.getComputedStyle(node, null).getPropertyValue(property);
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
u.contains = function(scope, node) {
	if(scope != node) {
		if(scope.contains(node)) {
			return true
		}
	}
	return false;
}
u.containsOrIs = function(scope, node) {
	if(scope == node || u.contains(scope, node)) {
		return true
	}
	return false;
}
u.elementMatches = u.em = function(node, selector) {
	return node.matches(selector);
}
Util.insertAfter = u.ia = function(insert_node, after_node) {
	var next_node = u.ns(after_node);
	if(next_node) {
		after_node.parentNode.insertBefore(insert_node, next_node);
	}
	else {
		after_node.parentNode.appendChild(insert_node);
	}
}
Util.selectText = function(node) {
	var selection = window.getSelection();
	var range = document.createRange();
	range.selectNodeContents(node);
	selection.removeAllRanges();
	selection.addRange(range);
}
Util.inNodeList = function(node, list) {
	var i, list_node;
	for(i = 0; i < list.length; i++) {
		list_node = list[i]
		if(list_node === node) {
			return true;
		}
	}
	return false;
}
u.easings = new function() {
	this["ease-in"] = function(progress) {
		return Math.pow((progress), 3);
	}
	this["linear"] = function(progress) {
		return progress;
	}
	this["ease-out"] = function(progress) {
		return 1 - Math.pow(1 - ((progress)), 3);
	}
	this["linear"] = function(progress) {
		return (progress);
	}
	this["ease-in-out-veryslow"] = function(progress) {
		if(progress > 0.5) {
			return 4*Math.pow((progress-1),3)+1;
		}
		return 4*Math.pow(progress,3);  
	}
	this["ease-in-out"] = function(progress) {
		if(progress > 0.5) {
			return 1 - Math.pow(1 - ((progress)), 2);
		}
		return Math.pow((progress), 2);
	}
	this["ease-out-slow"] = function(progress) {
		return 1 - Math.pow(1 - ((progress)), 2);
	}
	this["ease-in-slow"] = function(progress) {
		return Math.pow((progress), 2);
	}
	this["ease-in-veryslow"] = function(progress) {
		return Math.pow((progress), 1.5);
	}
	this["ease-in-fast"] = function(progress) {
		return Math.pow((progress), 4);
	}
	this["easeOutQuad"] = function (progress) {
		d = 1;
		b = 0;
		c = progress;
		t = progress;
		t /= d;
		return -c * t*(t-2) + b;
	};
	this["easeOutCubic"] = function (progress) {
		d = 1;
		b = 0;
		c = progress;
		t = progress;
		t /= d;
		t--;
		return c*(t*t*t + 1) + b;
	};
	this["easeOutQuint"] = function (progress) {
		d = 1;
		b = 0;
		c = progress;
		t = progress;
		t /= d;
		t--;
		return c*(t*t*t*t*t + 1) + b;
	};
	this["easeInOutSine"] = function (progress) {
		d = 1;
		b = 0;
		c = progress;
		t = progress;
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	};
	this["easeInOutElastic"] = function (progress) {
		d = 1;
		b = 0;
		c = progress;
		t = progress;
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	}
	this["easeOutBounce"] = function (progress) {
		d = 1;
		b = 0;
		c = progress;
		t = progress;
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
	}
	this["easeInBack"] = function (progress) {
		var s = 1.70158;
		d = 1;
		b = 0;
		c = progress;
		t = progress;
			return c*(t/=d)*t*((s+1)*t - s) + b;
	}
}
Util.Events = u.e = new function() {
	this.event_pref = typeof(document.ontouchmove) == "undefined" || (navigator.maxTouchPoints > 1 && navigator.userAgent.match(/Windows/i)) ? "mouse" : "touch";
	if (navigator.userAgent.match(/Windows/i) && ((obj(document.ontouchmove) && obj(document.onmousemove)) || (fun(document.ontouchmove) && fun(document.onmousemove)))) {
		this.event_support = "multi";
	}
	else if (obj(document.ontouchmove) || fun(document.ontouchmove)) {
		this.event_support = "touch";
	}
	else {
		this.event_support = "mouse";
	}
	this.events = {
		"mouse": {
			"start":"mousedown",
			"move":"mousemove",
			"end":"mouseup",
			"over":"mouseover",
			"out":"mouseout"
		},
		"touch": {
			"start":"touchstart",
			"move":"touchmove",
			"end":"touchend",
			"over":"touchstart",
			"out":"touchend"
		}
	}
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
			u.exception("u.e.addEvent", arguments, exception);
		}
	}
	this.removeEvent = function(node, type, action) {
		try {
			node.removeEventListener(type, action, false);
		}
		catch(exception) {
			u.exception("u.e.removeEvent", arguments, exception);
		}
	}
	this.addStartEvent = this.addDownEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.addEvent(node, this.events.mouse.start, action);
			u.e.addEvent(node, this.events.touch.start, action);
		}
		else {
			u.e.addEvent(node, this.events[this.event_support].start, action);
		}
	}
	this.removeStartEvent = this.removeDownEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.removeEvent(node, this.events.mouse.start, action);
			u.e.removeEvent(node, this.events.touch.start, action);
		}
		else {
			u.e.removeEvent(node, this.events[this.event_support].start, action);
		}
	}
	this.addMoveEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.addEvent(node, this.events.mouse.move, action);
			u.e.addEvent(node, this.events.touch.move, action);
		}
		else {
			u.e.addEvent(node, this.events[this.event_support].move, action);
		}
	}
	this.removeMoveEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.removeEvent(node, this.events.mouse.move, action);
			u.e.removeEvent(node, this.events.touch.move, action);
		}
		else {
			u.e.removeEvent(node, this.events[this.event_support].move, action);
		}
	}
	this.addEndEvent = this.addUpEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.addEvent(node, this.events.mouse.end, action);
			u.e.addEvent(node, this.events.touch.end, action);
		}
		else {
			u.e.addEvent(node, this.events[this.event_support].end, action);
		}
	}
	this.removeEndEvent = this.removeUpEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.removeEvent(node, this.events.mouse.end, action);
			u.e.removeEvent(node, this.events.touch.end, action);
		}
		else {
			u.e.removeEvent(node, this.events[this.event_support].end, action);
		}
	}
	this.addOverEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.addEvent(node, this.events.mouse.over, action);
			u.e.addEvent(node, this.events.touch.over, action);
		}
		else {
			u.e.addEvent(node, this.events[this.event_support].over, action);
		}
	}
	this.removeOverEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.removeEvent(node, this.events.mouse.over, action);
			u.e.removeEvent(node, this.events.touch.over, action);
		}
		else {
			u.e.removeEvent(node, this.events[this.event_support].over, action);
		}
	}
	this.addOutEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.addEvent(node, this.events.mouse.out, action);
			u.e.addEvent(node, this.events.touch.out, action);
		}
		else {
			u.e.addEvent(node, this.events[this.event_support].out, action);
		}
	}
	this.removeOutEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.removeEvent(node, this.events.mouse.out, action);
			u.e.removeEvent(node, this.events.touch.out, action);
		}
		else {
			u.e.removeEvent(node, this.events[this.event_support].out, action);
		}
	}
	this.resetClickEvents = function(node) {
		u.t.resetTimer(node.t_held);
		u.t.resetTimer(node.t_clicked);
		this.removeEvent(node, "mouseup", this._dblclicked);
		this.removeEvent(node, "touchend", this._dblclicked);
		this.removeEvent(node, "mouseup", this._rightclicked);
		this.removeEvent(node, "touchend", this._rightclicked);
		this.removeEvent(node, "mousemove", this._cancelClick);
		this.removeEvent(node, "touchmove", this._cancelClick);
		this.removeEvent(node, "mouseout", this._cancelClick);
		this.removeEvent(node, "mousemove", this._move);
		this.removeEvent(node, "touchmove", this._move);
	}
	this.resetEvents = function(node) {
		this.resetClickEvents(node);
		if(fun(this.resetDragEvents)) {
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
		this.move_timestamp = event.timeStamp;
		this.move_last_x = 0;
		this.move_last_y = 0;
		this.swiped = false;
		if(!event.button) {
			if(this.e_click || this.e_dblclick || this.e_hold) {
				if(event.type.match(/mouse/)) {
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
					u.e.addEvent(this, "mouseout", u.e._cancelClick);
				}
				else {
					u.e.addMoveEvent(this, u.e._cancelClick);
				}
				u.e.addMoveEvent(this, u.e._move);
				u.e.addEndEvent(this, u.e._dblclicked);
				if(this.e_hold) {
					this.t_held = u.t.setTimer(this, u.e._held, 750);
				}
			}
			if(this.e_drag || this.e_swipe) {
				u.e.addMoveEvent(this, u.e._pick);
				this.e_cancelPick = u.e.addWindowEndEvent(this, u.e._cancelPick);
			}
			if(this.e_scroll) {
				u.e.addMoveEvent(this, u.e._scrollStart);
				u.e.addEndEvent(this, u.e._scrollEnd);
			}
		}
		else if(event.button === 2) {
			if(this.e_rightclick) {
				if(event.type.match(/mouse/)) {
					u.e.addEvent(this, "mouseout", u.e._cancelClick);
				}
				else {
					u.e.addMoveEvent(this, u.e._cancelClick);
				}
				u.e.addMoveEvent(this, u.e._move);
				u.e.addEndEvent(this, u.e._rightclicked);
			}
		}
		if(fun(this.inputStarted)) {
			this.inputStarted(event);
		}
	}
	this._cancelClick = function(event) {
		var offset_x = u.eventX(event) - this.start_event_x;
		var offset_y = u.eventY(event) - this.start_event_y;
		if(event.type.match(/mouseout/) || (event.type.match(/move/) && (Math.abs(offset_x) > 15 || Math.abs(offset_y) > 15))) {
			u.e.resetClickEvents(this);
			if(fun(this.clickCancelled)) {
				this.clickCancelled(event);
			}
		}
	}
	this._move = function(event) {
		if(fun(this.moved)) {
			this.current_x = u.eventX(event) - this.start_event_x;
			this.current_y = u.eventY(event) - this.start_event_y;
			this.current_xps = Math.round(((this.current_x - this.move_last_x) / (event.timeStamp - this.move_timestamp)) * 1000);
			this.current_yps = Math.round(((this.current_y - this.move_last_y) / (event.timeStamp - this.move_timestamp)) * 1000);
			this.move_timestamp = event.timeStamp;
			this.move_last_x = this.current_x;
			this.move_last_y = this.current_y;
			this.moved(event);
		}
	}
	this.hold = function(node, _options) {
		node.e_hold_options = _options ? _options : {};
		node.e_hold_options.eventAction = u.stringOr(node.e_hold_options.eventAction, "Held");
		node.e_hold = true;
		u.e.addStartEvent(node, this._inputStart);
	}
	this._held = function(event) {
		this.e_hold_options.event = this.e_hold_options.event || "hold";
		u.stats.event(this, this.e_hold_options);
		u.e.resetNestedEvents(this);
		if(fun(this.held)) {
			this.held(event);
		}
	}
	this.click = this.tap = function(node, _options) {
		node.e_click_options = _options ? _options : {};
		node.e_click_options.eventAction = u.stringOr(node.e_click_options.eventAction, "Clicked");
		node.e_click = true;
		u.e.addStartEvent(node, this._inputStart);
	}
	this._clicked = function(event) {
		if(this.e_click_options) {
			this.e_click_options.event = this.e_click_options.event || "click";
			u.stats.event(this, this.e_click_options);
		}
		u.e.resetNestedEvents(this);
		if(fun(this.clicked)) {
			this.clicked(event);
		}
	}
	this.rightclick = function(node, _options) {
		node.e_rightclick_options = _options ? _options : {};
		node.e_rightclick_options.eventAction = u.stringOr(node.e_rightclick_options.eventAction, "RightClicked");
		node.e_rightclick = true;
		u.e.addStartEvent(node, this._inputStart);
		u.e.addEvent(node, "contextmenu", function(event){u.e.kill(event);});
	}
	this._rightclicked = function(event) {
		u.bug("_rightclicked:", this);
		if(this.e_rightclick_options) {
			this.e_rightclick_options.event = this.e_rightclick_options.event || "rightclick";
			u.stats.event(this, this.e_rightclick_options);
		}
		u.e.resetNestedEvents(this);
		if(fun(this.rightclicked)) {
			this.rightclicked(event);
		}
	}
	this.dblclick = this.doubleclick = this.doubletap = this.dbltap = function(node, _options) {
		node.e_dblclick_options = _options ? _options : {};
		node.e_dblclick_options.eventAction = u.stringOr(node.e_dblclick_options.eventAction, "DblClicked");
		node.e_dblclick = true;
		u.e.addStartEvent(node, this._inputStart);
	}
	this._dblclicked = function(event) {
		if(u.t.valid(this.t_clicked) && event) {
			this.e_dblclick_options.event = this.e_dblclick_options.event || "doubleclick";
			u.stats.event(this, this.e_dblclick_options);
			u.e.resetNestedEvents(this);
			if(fun(this.dblclicked)) {
				this.dblclicked(event);
			}
			return;
		}
		else if(!this.e_dblclick) {
			this._clicked = u.e._clicked;
			this._clicked(event);
		}
		else if(event.type == "timeout") {
			this._clicked = u.e._clicked;
			this._clicked(this.event_var);
		}
		else {
			u.e.resetNestedEvents(this);
			this.t_clicked = u.t.setTimer(this, u.e._dblclicked, 400);
		}
	}
	this.hover = function(node, _options) {
		node._hover_out_delay = 100;
		node._hover_over_delay = 0;
		node._callback_out = "out";
		node._callback_over = "over";
		if(obj(_options)) {
			var argument;
			for(argument in _options) {
				switch(argument) {
					case "over"				: node._callback_over		= _options[argument]; break;
					case "out"				: node._callback_out		= _options[argument]; break;
					case "delay_over"		: node._hover_over_delay	= _options[argument]; break;
					case "delay"			: node._hover_out_delay		= _options[argument]; break;
				}
			}
		}
		node.e_hover = true;
		u.e.addOverEvent(node, this._over);
		u.e.addOutEvent(node, this._out);
	}
	this._over = function(event) {
		u.t.resetTimer(this.t_out);
		if(!this._hover_over_delay) {
			u.e.__over.call(this, event);
		}
		else if(!u.t.valid(this.t_over)) {
			this.t_over = u.t.setTimer(this, u.e.__over, this._hover_over_delay, event);
		}
	}
	this.__over = function(event) {
		u.t.resetTimer(this.t_out);
		if(!this.is_hovered) {
			this.is_hovered = true;
			u.e.removeOverEvent(this, u.e._over);
			u.e.addOverEvent(this, u.e.__over);
			if(fun(this[this._callback_over])) {
				this[this._callback_over](event);
			}
		}
	}
	this._out = function(event) {
		u.t.resetTimer(this.t_over);
		u.t.resetTimer(this.t_out);
		this.t_out = u.t.setTimer(this, u.e.__out, this._hover_out_delay, event);
	}
	this.__out = function(event) {
		this.is_hovered = false;
		u.e.removeOverEvent(this, u.e.__over);
		u.e.addOverEvent(this, u.e._over);
		if(fun(this[this._callback_out])) {
			this[this._callback_out](event);
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
			window["_DOMReady_" + id] = {
				id: id,
				action: action,
				callback: function(event) {
					if(fun(this.action)) {
						this.action.bind(window)(event);
					}
					else if(fun(this[this.action])){
						this[this.action].bind(window)(event);
					}
 					u.e.removeEvent(document, "DOMContentLoaded", window["_DOMReady_" + this.id].eventCallback); 
					delete window["_DOMReady_" + this.id];
				}
			}
			eval('window["_DOMReady_' + id + '"].eventCallback = function() {window["_DOMReady_'+id+'"].callback(event);}');
			u.e.addEvent(document, "DOMContentLoaded", window["_DOMReady_" + id].eventCallback);
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
		window["_Onload_" + id] = {
			id: id,
			action: action,
			callback: function(event) {
				if(fun(this.action)) {
					this.action.bind(window)(event);
				}
				else if(fun(this[this.action])){
					this[this.action].bind(window)(event);
				}
				u.e.removeEvent(document, "load", window["_Onload_" + this.id].eventCallback); 
				delete window["_Onload_" + this.id];
			}
		}
		eval('window["_Onload_' + id + '"].eventCallback = function() {u.bug("load");window["_Onload_'+id+'"].callback(event);}');
		u.e.addEvent(window, "load", window["_Onload_" + id].eventCallback);
	}
}
u.e.addWindowEvent = function(node, type, action) {
	var id = u.randomString();
	window["_OnWindowEvent_"+ id] = {
		id: id,
		node: node,
		type: type,
		action: action,
		callback: function(event) {
			if(fun(this.action)) {
				this.action.bind(this.node)(event);
			}
			else if(fun(this[this.action])){
				this[this.action](event);
			}
		}
	};
	eval('window["_OnWindowEvent_' + id + '"].eventCallback = function(event) {window["_OnWindowEvent_'+ id + '"].callback(event);}');
	u.e.addEvent(window, type, window["_OnWindowEvent_" + id].eventCallback);
	return id;
}
u.e.removeWindowEvent = function(id) {
	if(window["_OnWindowEvent_" + id]) {
		u.e.removeEvent(window, window["_OnWindowEvent_"+id].type, window["_OnWindowEvent_"+id].eventCallback);
		delete window["_OnWindowEvent_"+id];
	}
}
u.e.addWindowStartEvent = function(node, action) {
	var id = u.randomString();
	window["_OnWindowStartEvent_"+ id] = {
		id: id,
		node: node,
		action: action,
		callback: function(event) {
			if(fun(this.action)) {
				this.action.bind(this.node)(event);
			}
			else if(fun(this[this.action])){
				this[this.action](event);
			}
		}
	};
	eval('window["_OnWindowStartEvent_' + id + '"].eventCallback = function(event) {window["_OnWindowStartEvent_'+ id + '"].callback(event);}');
	u.e.addStartEvent(window, window["_OnWindowStartEvent_" + id].eventCallback);
	return id;
}
u.e.removeWindowStartEvent = function(id) {
	if(window["_OnWindowStartEvent_" + id]) {
		u.e.removeStartEvent(window, window["_OnWindowStartEvent_"+id].eventCallback);
		delete window["_OnWindowStartEvent_"+id];
	}
}
u.e.addWindowMoveEvent = function(node, action) {
	var id = u.randomString();
	window["_OnWindowMoveEvent_"+ id] = {
		id: id,
		node: node,
		action: action,
		callback: function(event) {
			if(fun(this.action)) {
				this.action.bind(this.node)(event);
			}
			else if(fun(this[this.action])){
				this[this.action](event);
			}
		}
	};
	eval('window["_OnWindowMoveEvent_' + id + '"].eventCallback = function(event) {window["_OnWindowMoveEvent_'+ id + '"].callback(event);}');
	u.e.addMoveEvent(window, type, window["_OnWindowMoveEvent_" + id].eventCallback);
	return id;
}
u.e.removeWindowMoveEvent = function(id) {
	if(window["_OnWindowMoveEvent_" + id]) {
		u.e.removeMoveEvent(window, window["_OnWindowMoveEvent_"+id].eventCallback);
		delete window["_OnWindowMoveEvent_"+id];
	}
}
u.e.addWindowEndEvent = function(node, action) {
	var id = u.randomString();
	window["_OnWindowEndEvent_"+ id] = {
		id: id,
		node: node,
		action: action,
		callback: function(event) {
			if(fun(this.action)) {
				this.action.bind(this.node)(event);
			}
			else if(fun(this[this.action])){
				this[this.action](event);
			}
		}
	};
	eval('window["_OnWindowEndEvent_' + id + '"].eventCallback = function(event) {window["_OnWindowEndEvent_'+ id + '"].callback(event);}');
	u.e.addEndEvent(window, window["_OnWindowEndEvent_" + id].eventCallback);
	return id;
}
u.e.removeWindowEndEvent = function(id) {
	if(window["_OnWindowEndEvent_" + id]) {
		u.e.removeEndEvent(window, window["_OnWindowEndEvent_" + id].eventCallback);
		delete window["_OnWindowEndEvent_"+id];
	}
}
Util.Form = u.f = new function() {
	this.customInit = {};
	this.customValidate = {};
	this.customDataFormat = {};
	this.customHintPosition = {};
	this.customLabelStyle = {};
	this.init = function(_form, _options) {
		var i, j, field, action, input, hidden_input;
		_form._bulk_operation = true;
		if(_form.nodeName.toLowerCase() != "form") {
			_form.native_form = u.pn(_form, {"include":"form"});
			if(!_form.native_form) {
				u.bug("there is no form in this document??");
				return;
			}
		}
		else {
			_form.native_form = _form;
		}
		_form._focus_z_index = 50;
		_form._validation = true;
		_form._debug = false;
		_form._label_style = u.cv(_form, "labelstyle");
		_form._callback_ready = "ready";
		_form._callback_submitted = "submitted";
		_form._callback_submit_failed = "submitFailed";
		_form._callback_pre_submitted = "preSubmitted";
		_form._callback_resat = "resat";
		_form._callback_updated = "updated";
		_form._callback_changed = "changed";
		_form._callback_blurred = "blurred";
		_form._callback_focused = "focused";
		_form._callback_validation_failed = "validationFailed";
		_form._callback_validation_passed = "validationPassed";
		if(obj(_options)) {
			var _argument;
			for(_argument in _options) {
				switch(_argument) {
					case "validation"               : _form._validation                = _options[_argument]; break;
					case "debug"                    : _form._debug                     = _options[_argument]; break;
					case "focus_z"                  : _form._focus_z_index             = _options[_argument]; break;
					case "label_style"              : _form._label_style               = _options[_argument]; break;
					case "callback_ready"           : _form._callback_ready            = _options[_argument]; break;
					case "callback_submitted"       : _form._callback_submitted        = _options[_argument]; break;
					case "callback_submit_failed"   : _form._callback_submit_failed    = _options[_argument]; break;
					case "callback_pre_submitted"   : _form._callback_pre_submitted    = _options[_argument]; break;
					case "callback_resat"           : _form._callback_resat            = _options[_argument]; break;
					case "callback_updated"         : _form._callback_updated          = _options[_argument]; break;
					case "callback_changed"         : _form._callback_changed          = _options[_argument]; break;
					case "callback_blurred"         : _form._callback_blurred          = _options[_argument]; break;
					case "callback_focused"         : _form._callback_focused          = _options[_argument]; break;
					case "callback_validation_failed"         : _form._callback_validation_failed          = _options[_argument]; break;
					case "callback_validation_passed"         : _form._callback_validation_passed          = _options[_argument]; break;
				}
			}
		}
		_form._hover_z_index = _form._focus_z_index - 1;
		_form.native_form.onsubmit = function(event) {
			if(event.target._form) {
				return false;
			}
		}
		_form.native_form.setAttribute("novalidate", "novalidate");
		_form.DOMsubmit = _form.native_form.submit;
		_form.submit = this._submit;
		_form.DOMreset = _form.native_form.reset;
		_form.reset = this._reset;
		_form.getData = function(_options) {
			return u.f.getFormData(this, _options);
		}
		_form.inputs = {};
		_form.actions = {};
		_form._error_inputs = {};
		var fields = u.qsa(".field", _form);
		for(i = 0; i < fields.length; i++) {
			field = fields[i];
			u.f.initField(_form, field);
		}
		var hidden_inputs = u.qsa("input[type=hidden]", _form);
		for(i = 0; i < hidden_inputs.length; i++) {
			hidden_input = hidden_inputs[i];
			if(!_form.inputs[hidden_input.name]) {
				_form.inputs[hidden_input.name] = hidden_input;
				hidden_input._form = _form;
				hidden_input.val = this._value;
			}
		}
		var actions = u.qsa(".actions li input[type=button],.actions li input[type=submit],.actions li input[type=reset],.actions li a.button", _form);
		for(i = 0; i < actions.length; i++) {
			action = actions[i];
			this.initButton(_form, action);
		}
		u.t.setTimer(_form, function() {
			var validate_inputs = [];
			for(input in this.inputs) {
				if(this.inputs[input].field) {
					validate_inputs.push(this.inputs[input]);
				}
			}
			u.f.bulkValidate(validate_inputs);
			if(_form._debug) {
				u.bug(_form, "inputs:", _form.inputs, "actions:", _form.actions);
			}
			if(fun(this[this._callback_ready])) {
				this[this._callback_ready]();
			}
		}, 100);
	}
	this.initField = function(_form, field) {
		field._form = _form;
		field._base_z_index = u.gcs(field, "z-index");
		field.help = u.qs(".help", field);
		field.hint = u.qs(".hint", field);
		field.error = u.qs(".error", field);
		field.label = u.qs("label", field);
		field.indicator = u.ae(field, "div", {"class":"indicator"});
		if(fun(u.f.fixFieldHTML)) {
			u.f.fixFieldHTML(field);
		}
		field._custom_initialized = false;
		var custom_init;
		for(custom_init in this.customInit) {
			if(u.hc(field, custom_init)) {
				this.customInit[custom_init](field);
				field._custom_initialized = true;
				break;
			}
		}
		if(!field._custom_initialized) {
			if(u.hc(field, "string|email|tel|number|integer|password|date|datetime")) {
				field.type = field.className.match(/(?:^|\b)(string|email|tel|number|integer|password|date|datetime)(?:\b|$)/)[0];
				field.input = u.qs("input", field);
				field.input._form = _form;
				field.input.label = u.qs("label[for='"+field.input.id+"']", field);
				field.input.field = field;
				field.input.val = this._value;
				u.e.addEvent(field.input, "keyup", this._updated);
				u.e.addEvent(field.input, "change", this._changed);
				this.inputOnEnter(field.input);
				this.activateInput(field.input);
			}
			else if(u.hc(field, "text")) {
				field.type = "text";
				field.input = u.qs("textarea", field);
				field.input._form = _form;
				field.input.label = u.qs("label[for='"+field.input.id+"']", field);
				field.input.field = field;
				field.input.val = this._value;
				if(u.hc(field, "autoexpand")) {
					u.ass(field.input, {
						"overflow": "hidden"
					});
					field.input.setHeight = function() {
						u.ass(this, {
							height: "auto"
						});
						u.ass(this, {
							height: (this.scrollHeight) + "px"
						});
					}
					u.e.addEvent(field.input, "input", field.input.setHeight);
					field.input.setHeight();
				}
				u.e.addEvent(field.input, "keyup", this._updated);
				u.e.addEvent(field.input, "change", this._changed);
				this.activateInput(field.input);
			}
			else if(u.hc(field, "json")) {
				field.type = "json";
				field.input = u.qs("textarea", field);
				field.input._form = _form;
				field.input.label = u.qs("label[for='"+field.input.id+"']", field);
				field.input.field = field;
				field.input.val = this._value;
				if(u.hc(field, "autoexpand")) {
					u.ass(field.input, {
						"overflow": "hidden"
					});
					field.input.setHeight = function() {
						u.ass(this, {
							height: "auto"
						});
						u.ass(this, {
							height: (this.scrollHeight) + "px"
						});
					}
					u.e.addEvent(field.input, "input", field.input.setHeight);
					field.input.setHeight();
				}
				u.e.addEvent(field.input, "keyup", this._updated);
				u.e.addEvent(field.input, "change", this._changed);
				this.activateInput(field.input);
			}
			else if(u.hc(field, "select")) {
				field.type = "select";
				field.input = u.qs("select", field);
				field.input._form = _form;
				field.input.label = u.qs("label[for='"+field.input.id+"']", field);
				field.input.field = field;
				field.input.val = this._value_select;
				u.e.addEvent(field.input, "change", this._updated);
				u.e.addEvent(field.input, "keyup", this._updated);
				u.e.addEvent(field.input, "change", this._changed);
				this.activateInput(field.input);
			}
			else if(u.hc(field, "checkbox|boolean")) {
				field.type = field.className.match(/(?:^|\b)(checkbox|boolean)(?:\b|$)/)[0];
				field.input = u.qs("input[type=checkbox]", field);
				field.input._form = _form;
				field.input.label = u.qs("label[for='"+field.input.id+"']", field);
				field.input.field = field;
				field.input.val = this._value_checkbox;
				u.f._update_checkbox_field.bind(field.input)();
				u.e.addEvent(field.input, "change", this._changed);
				u.e.addEvent(field.input, "change", this._updated);
				u.e.addEvent(field.input, "change", this._update_checkbox_field);
				this.inputOnEnter(field.input);
				this.activateInput(field.input);
			}
			else if(u.hc(field, "radiobuttons")) {
				field.type = "radiobuttons";
				field.inputs = u.qsa("input", field);
				field.input = field.inputs[0];
				for(j = 0; j < field.inputs.length; j++) {
					input = field.inputs[j];
					input._form = _form;
					input.label = u.qs("label[for='"+input.id+"']", field);
					input.field = field;
					input.val = this._value_radiobutton;
					u.e.addEvent(input, "change", this._changed);
					u.e.addEvent(input, "change", this._updated);
					this.inputOnEnter(input);
					this.activateInput(input);
				}
			}
			else if(u.hc(field, "files")) {
				field.type = "files";
				field.input = u.qs("input", field);
				field.input._form = _form;
				field.input.label = u.qs("label[for='"+field.input.id+"']", field);
				field.input.field = field;
				field.input.val = this._value_file;
				field.filelist = u.qs("ul.filelist", field);
				if(!field.filelist) {
					field.filelist = u.ae(field, "ul", {"class":"filelist"});
					field.insertBefore(field.help, field.filelist);
				}
				field.filelist.field = field;
				field.uploaded_files = u.qsa("li.uploaded", field.filelist);
				this._update_filelist.bind(field.input)();
				u.e.addEvent(field.input, "change", this._update_filelist);
				if(u.e.event_support != "touch") {
					u.e.addEvent(field.input, "dragenter", this._focus);
					u.e.addEvent(field.input, "dragleave", this._blur);
					u.e.addEvent(field.input, "drop", this._blur);
				}
				this.activateInput(field.input);
			}
			else {
				u.bug("UNKNOWN FIELD IN FORM INITIALIZATION:", field);
			}
		}
		if(field.input) {
			_form.inputs[field.input.name] = field.input;
			if(!_form._bulk_operation) {
				this.validate(field.input);
			}
		}
		if(field.virtual_input && !field.virtual_input.tabindex) {
			field.virtual_input.setAttribute("tabindex", 0);
			field.input.setAttribute("tabindex", 0);
		}
		else if(field.input && field.input.getAttribute("readonly")) {
			field.input.setAttribute("tabindex", -1);
		}
		else if(field.input && !field.input.tabindex) {
			field.input.setAttribute("tabindex", 0);
		}
	}
	this.initButton = function(_form, action) {
		action._form = _form;
		action.setAttribute("tabindex", 0);
		this.buttonOnEnter(action);
		this.activateButton(action);
	}
	this._reset = function(event, iN) {
		for (name in this.inputs) {
			if (this.inputs[name] && this.inputs[name].field && this.inputs[name].type != "hidden" && !this.inputs[name].getAttribute("readonly")) {
				this.inputs[name]._used = false;
				this.inputs[name].val("");
				if(fun(u.f.updateDefaultState)) {
					u.f.updateDefaultState(this.inputs[name]);
				}
			}
		}
		if(fun(this[this._callback_resat])) {
			this[this._callback_resat](iN);
		}
	}
	this._submit = function(event, iN) {
		var validate_inputs = [];
		for(name in this.inputs) {
			if(this.inputs[name] && this.inputs[name].field && fun(this.inputs[name].val)) {
				this.inputs[name]._used = true;
				validate_inputs.push(this.inputs[name]);
			}
		}
		u.f.bulkValidate(validate_inputs);
		if(!Object.keys(this._error_inputs).length) {
			if(fun(this[this._callback_pre_submitted])) {
				this[this._callback_pre_submitted](iN);
			}
			if(fun(this[this._callback_submitted])) {
				this[this._callback_submitted](iN);
			}
			else {
				for(name in this.inputs) {
					if(this.inputs[name] && this.inputs[name].default_value && this.inputs[name].nodeName.match(/^(input|textarea)$/i)) {
						if(fun(this.inputs[name].val) && !this.inputs[name].val()) {
							this.inputs[name].value = "";
						}
					}
				}
				this.DOMsubmit();
			}
		}
		else {
			if(fun(this[this._callback_submit_failed])) {
				this[this._callback_submit_failed](iN);
			}
		}
	}
	this._value = function(value) {
		if(value !== undefined) {
			this.value = value;
			if(value !== this.default_value) {
				u.rc(this, "default");
			}
			u.f.validate(this);
		}
		return (this.value != this.default_value) ? this.value : "";
	}
	this._value_radiobutton = function(value) {
		var i, option;
		if(value !== undefined) {
			for(i = 0; i < this.field.inputs.length; i++) {
				option = this.field.inputs[i];
				if(option.value == value || (option.value == "true" && value) || (option.value == "false" && value === false)) {
					option.checked = true;
					u.f.validate(this);
				}
				else {
					option.checked = false;
				}
			}
		}
		for(i = 0; i < this.field.inputs.length; i++) {
			option = this.field.inputs[i];
			if(option.checked) {
				return option.value;
			}
		}
		return "";
	}
	this._value_checkbox = function(value) {
		if(value !== undefined) {
			if(value) {
				this.checked = true
			}
			else {
				this.checked = false;
			}
			u.f._update_checkbox_field.bind(this)();
			u.f.validate(this);
		}
		if(this.checked) {
			return this.value;
		}
		return "";
	}
	this._value_select = function(value) {
		if(value !== undefined) {
			var i, option;
			for(i = 0; i < this.options.length; i++) {
				option = this.options[i];
				if(option.value == value) {
					this.selectedIndex = i;
					u.f.validate(this);
					return this.options[this.selectedIndex].value;
				}
			}
			if (value === "") {
				this.selectedIndex = -1;
				u.f.validate(this);
				return "";
			}
		}
		return (this.selectedIndex >= 0 && this.default_value != this.options[this.selectedIndex].value) ? this.options[this.selectedIndex].value : "";
	}
	this._value_file = function(value) {
		if(value !== undefined) {
			if(value === "") {
				this.value = null;
			}
			else {
				u.bug('ADDING VALUES MANUALLY TO INPUT type="file" IS NOT SUPPORTED IN JAVASCRIPT');
			}
			u.f._update_filelist.bind(this)();
			u.f.validate(this);
		}
		if(this.files && this.files.length) {
			var i, file, files = [];
			for(i = 0; i < this.files.length; i++) {
				file = this.files[i];
				files.push(file);
			}
			return files;
		}
		else if(!this.files && this.value) {
			return this.value;
		}
		else if(this.field.uploaded_files && this.field.uploaded_files.length){
			return true;
		}
		return "";
	}
	this._changed = function(event) {
		u.f.positionHint(this.field);
		if(fun(this[this._form._callback_changed])) {
			this[this._form._callback_changed](this);
		}
		else if(fun(this.field.input[this._form._callback_changed])) {
			this.field.input[this._form._callback_changed](this);
		}
		if(fun(this._form[this._form._callback_changed])) {
			this._form[this._form._callback_changed](this);
		}
	}
	this._updated = function(event) {
		if(event.keyCode != 9 && event.keyCode != 13 && event.keyCode != 16 && event.keyCode != 17 && event.keyCode != 18) {
			u.f.validate(this);
			if(fun(this[this._form._callback_updated])) {
				this[this._form._callback_updated](this);
			}
			else if(fun(this.field.input[this._form._callback_updated])) {
				this.field.input[this._form._callback_updated](this);
			}
			if(fun(this._form[this._form._callback_updated])) {
				this._form[this._form._callback_updated](this);
			}
		}
	}
	this._update_checkbox_field = function(event) {
		if(this.checked) {
			u.ac(this.field, "checked");
		}
		else {
			u.rc(this.field, "checked");
		}
	}
	this._update_filelist = function(event) {
		var i;
		var files = this.val();
		this.field.filelist.innerHTML = "";
		this.e_updated = event;
		u.ae(this.field.filelist, "li", {
			"html":this.field.hint ? u.text(this.field.hint) : u.text(this.label), class:"label",
		});
		if(files && files.length) {
			u.ac(this.field, "has_new_files");
			var i, file, li_file;
			this.field.filelist.load_queue = 0;
			for(i = 0; i < files.length; i++) {
				file = files[i];
				li_file = u.ae(this.field.filelist, "li", {"html":file.name, "class":"new format:"+file.name.substring(file.name.lastIndexOf(".")+1).toLowerCase()})
				li_file.input = this;
				if(file.type.match(/image/)) {
					li_file.image = new Image();
					li_file.image.li = li_file;
					u.ac(li_file, "loading");
					this.field.filelist.load_queue++;
					li_file.image.onload = function() {
						u.ac(this.li, "width:"+this.width);
						u.ac(this.li, "height:"+this.height);
						u.rc(this.li, "loading");
						this.li.input.field.filelist.load_queue--;
						delete this.li.image;
						u.f.filelistUpdated(this.li.input);
					}
					li_file.image.src = URL.createObjectURL(file);
				}
				else if(file.type.match(/video/)) {
					li_file.video = document.createElement("video");
					li_file.video.preload = "metadata";
					li_file.video.li = li_file;
					u.ac(li_file, "loading");
					this.field.filelist.load_queue++;
					li_file.video.onloadedmetadata = function() {
						u.bug("loaded", this);
						u.ac(this.li, "width:"+this.videoWidth);
						u.ac(this.li, "height:"+this.videoHeight);
						u.rc(this.li, "loading");
						this.li.input.field.filelist.load_queue--;
						delete this.li.video;
						u.f.filelistUpdated(this.li.input);
					}
					li_file.video.src = URL.createObjectURL(file);
				}
			}
			if(this.multiple) {
				for(i = 0; i < this.field.uploaded_files.length; i++) {
					u.ae(this.field.filelist, this.field.uploaded_files[i]);
				}
			}
			else {
				this.field.uploaded_files = [];
			}
			u.f.filelistUpdated(this);
		}
		else if(this.field.uploaded_files && this.field.uploaded_files.length) {
			u.rc(this.field, "has_new_files");
			var i;
			for(i = 0; i < this.field.uploaded_files.length; i++) {
				u.ae(this.field.filelist, this.field.uploaded_files[i]);
			}
		}
		else {
			u.rc(this.field, "has_new_files");
		}
	}
	this.filelistUpdated = function(input) {
		if(input.field.filelist.load_queue === 0) {
			this._changed.bind(input.field.input)(input.e_updated);
			this._updated.bind(input.field.input)(input.e_updated);
			delete input.e_updated;
		}
	}
	this.updateFilelistStatus = function(form, response) {
		if(form && form.inputs && response && response.cms_status == "success" && response.cms_object && response.cms_object.mediae) {
			var mediae = JSON.parse(JSON.stringify(response.cms_object.mediae));
			var filelists = u.qsa("div.field.files ul.filelist", form);
			var i, j, k, filelist, old_files, old_file, new_files, new_files;
			for(i = 0; i < filelists.length; i++) {
				filelist = filelists[i];
				new_files = u.qsa("li.new", filelist);
				if(new_files.length) {
					old_files = u.qsa("li.uploaded", filelist);
					if(old_files.length) {
						for(j in mediae) {
							media = mediae[j];
							if(media.variant.match("^" + filelist.field.input.name.replace(/\[\]$/, "") + "(\-|$)")) {
								for(k = 0; k < old_files.length; k++) {
									old_file = old_files[k];
									if(u.cv(old_file, "media_id") == media.id) {
										delete mediae[j];
									}
								}
							}
						}
					}
					if(Object.keys(mediae).length) {
						for(j in mediae) {
							media = mediae[j];
							if(media.variant.match("^"+filelist.field.input.name.replace(/\[\]$/, "")+"(\-|$)")) {
								for(k = 0; k < new_files.length; k++) {
									new_file = new_files[k];
									if(u.text(new_file) == media.name || u.text(new_file)+".zip" == media.name) {
										new_file.innerHTML = media.name;
										u.rc(new_file, "new");
										u.ac(new_file, "uploaded media_id:"+media.id+" variant:"+media.variant+" format:"+media.format+" width:"+media.width+" height:"+media.height);
										delete mediae[j];
									}
								}
							}
						}
					}
				}
				filelist.field.uploaded_files = u.qsa("li.uploaded", filelist);
			}
		}
	}
	this._mouseenter = function(event) {
		u.ac(this.field, "hover");
		u.ac(this, "hover");
		u.as(this.field, "zIndex", this._form._hover_z_index);
		u.f.positionHint(this.field);
	}
	this._mouseleave = function(event) {
		u.rc(this.field, "hover");
		u.rc(this, "hover");
		u.as(this.field, "zIndex", this.field._base_z_index);
		u.f.positionHint(this.field);
	}
	this._focus = function(event) {
		this.field.is_focused = true;
		this.is_focused = true;
		u.ac(this.field, "focus");
		u.ac(this, "focus");
		u.as(this.field, "zIndex", this._form._focus_z_index);
		u.f.positionHint(this.field);
		if(fun(this[this._form._callback_focused])) {
			this[this._form._callback_focused](this);
		}
		else if(fun(this.field.input[this._form._callback_focused])) {
			this.field.input[this._form._callback_focused](this);
		}
		if(fun(this._form[this._form._callback_focused])) {
			this._form[this._form._callback_focused](this);
		}
	}
	this._blur = function(event) {
		this.field.is_focused = false;
		this.is_focused = false;
		u.rc(this.field, "focus");
		u.rc(this, "focus");
		u.as(this.field, "zIndex", this.field._base_z_index);
		u.f.positionHint(this.field);
		this._used = true;
		if(fun(this[this._form._callback_blurred])) {
			this[this._form._callback_blurred](this);
		}
		else if(fun(this.field.input[this._form._callback_blurred])) {
			this.field.input[this._form._callback_blurred](this);
		}
		if(fun(this._form[this._form._callback_blurred])) {
			this._form[this._form._callback_blurred](this);
		}
	}
	this._button_focus = function(event) {
		u.ac(this, "focus");
		if(fun(this[this._form._callback_focused])) {
			this[this._form._callback_focused](this);
		}
		if(fun(this._form[this._form._callback_focused])) {
			this._form[this._form._callback_focused](this);
		}
	}
	this._button_blur = function(event) {
		u.rc(this, "focus");
		if(fun(this[this._form._callback_blurred])) {
			this[this._form._callback_blurred](this);
		}
		if(fun(this._form[this._form._callback_blurred])) {
			this._form[this._form._callback_blurred](this);
		}
	}
	this._validate = function(event) {
		u.f.validate(this);
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
				this.blur();
				this._form.submitInput = this;
				this._form.submitButton = false;
				this._form.submit(event, this);
			}
		}
		u.e.addEvent(node, "keydown", node.keyPressed);
	}
	this.buttonOnEnter = function(node) {
		node.keyPressed = function(event) {
			if(event.keyCode == 13 && !u.hc(this, "disabled") && fun(this.clicked)) {
				u.e.kill(event);
				this.clicked(event);
			}
		}
		u.e.addEvent(node, "keydown", node.keyPressed);
	}
	this.activateInput = function(iN) {
		u.e.addEvent(iN, "focus", this._focus);
		u.e.addEvent(iN, "blur", this._blur);
		if(u.e.event_support != "touch") {
			u.e.addEvent(iN, "mouseenter", this._mouseenter);
			u.e.addEvent(iN, "mouseleave", this._mouseleave);
		}
		u.e.addEvent(iN, "blur", this._validate);
		if(iN._form._label_style && fun(this.customLabelStyle[iN._form._label_style])) {
			this.customLabelStyle[iN._form._label_style](iN);
		}
		else {
			iN.default_value = "";
		}
	}
	this.activateButton = function(action) {
		if(action.type && action.type == "submit" || action.type == "reset") {
			action.onclick = function(event) {
				u.e.kill(event);
			}
		}
		u.ce(action);
		if(!action.clicked) {
			action.clicked = function(event) {
				if(!u.hc(this, "disabled")) {
					if(this.type && this.type.match(/submit/i)) {
						this._form._submit_button = this;
						this._form._submit_input = false;
						this._form.submit(event, this);
					}
					else if(this.type && this.type.match(/reset/i)) {
						this._form._submit_button = false;
						this._form._submit_input = false;
						this._form.reset(event, this);
					}
					else if(this.url) {
						if(event && (event.metaKey || event.ctrlKey)) {
							window.open(this.url);
						}
						else {
							if(obj(u.h) && u.h.is_listening) {
								u.h.navigate(this.url, this);
							}
							else {
								location.href = this.url;
							}
						}
					}
				}
			}
		}
		var action_name = action.name ? action.name : (action.parentNode.className ? u.superNormalize(action.parentNode.className) : (action.value ? u.superNormalize(action.value) : u.superNormalize(u.text(action))));
		if(action_name && !action._form.actions[action_name]) {
			action._form.actions[action_name] = action;
		}
		if(obj(u.k) && u.hc(action, "key:[a-z0-9]+")) {
			u.k.addKey(action, u.cv(action, "key"));
		}
		u.e.addEvent(action, "focus", this._button_focus);
		u.e.addEvent(action, "blur", this._button_blur);
	}
	this.positionHint = function(field) {
		if(field.help) {
			var custom_hint_position;
			for(custom_hint_position in this.customHintPosition) {
				if(u.hc(field, custom_hint_position)) {
					this.customHintPosition[custom_hint_position](field);
					return;
				}
			}
			var input_middle, help_top;
			if(field.virtual_input) {
				input_middle = field.virtual_input.parentNode.offsetTop + (field.virtual_input.parentNode.offsetHeight / 2);
			}
			else {
				input_middle = field.input.offsetTop + (field.input.offsetHeight / 2);
			}
			help_top = input_middle - field.help.offsetHeight / 2;
			u.ass(field.help, {
				"top": help_top + "px"
			});
		}
	}
	this.inputHasError = function(iN) {
		u.rc(iN, "correct");
		u.rc(iN.field, "correct");
		delete iN.is_correct;
		if(iN.val() !== "") {
			if(!iN.has_error && (iN._used || iN._form._bulk_operation)) {
				iN._form._error_inputs[iN.name] = true;
				u.ac(iN, "error");
				u.ac(iN.field, "error");
				iN.has_error = true;
				this.updateInputValidationState(iN);
			 }
		}
		else if(!iN.has_error && iN._used) {
			iN._form._error_inputs[iN.name] = true;
			u.ac(iN, "error");
			u.ac(iN.field, "error");
			iN.has_error = true;
			this.updateInputValidationState(iN);
		}
		else if(!iN._used) {
			delete iN._form._error_inputs[iN.name];
			u.rc(iN, "error");
			u.rc(iN.field, "error");
			delete iN.has_error;
		}
		this.positionHint(iN.field);
	}
	this.inputIsCorrect = function(iN) {
		u.rc(iN, "error");
		u.rc(iN.field, "error");
		delete iN.has_error;
		delete iN._form._error_inputs[iN.name];
		if(iN.val() !== "") {
			if(!iN.is_correct) {
				iN._used = true;
				u.ac(iN, "correct");
				u.ac(iN.field, "correct");
				iN.is_correct = true;
				this.updateInputValidationState(iN);
			}
		}
		else if(iN.is_correct || iN.has_error) {
			u.rc(iN, "correct");
			u.rc(iN.field, "correct");
			delete iN.is_correct;
			this.updateInputValidationState(iN);
		}
		this.positionHint(iN.field);
	}
	this.updateInputValidationState = function(iN) {
		if(iN.has_error && fun(iN[iN._form._callback_validation_failed])) {
			iN[iN._form._callback_validation_failed]();
		}
		else if(iN.is_correct && fun(iN[iN._form._callback_validation_passed])) {
			iN[iN._form._callback_validation_passed]();
		}
		this.updateFormValidationState(iN._form);
	}
	this.updateFormValidationState = function(_form) {
		if(!_form._bulk_operation) {
			if(Object.keys(_form._error_inputs).length) {
				_form._validation_state = "error";
				if(_form._error_inputs !== _form._reference_error_inputs) {
					if(fun(_form[_form._callback_validation_failed])) {
						_form[_form._callback_validation_failed](_form._error_inputs);
					}
				}
			}
			else if(u.qsa(".field.required", _form).length === u.qsa(".field.required.correct", _form).length) {
				if(fun(_form[_form._callback_validation_passed]) && _form._validation_state !== "correct") {
					_form[_form._callback_validation_passed]();
				}
				_form._validation_state = "correct";
			}
			else {
				_form._validation_state = "void";
			}
			_form._reference_error_inputs = JSON.parse(JSON.stringify(_form._error_inputs));
		}
	}
	this.bulkValidate = function(inputs) {
		if(inputs && inputs.length) {
			var _form = inputs[0]._form;
			_form._bulk_operation = true;
			var i;
			for(i = 0; i < inputs.length; i++) {
				u.f.validate(inputs[i]);
			}
			_form._bulk_operation = false;
			this.updateFormValidationState(_form);
		}
	}
	this.validate = function(iN) {
		if(!iN._form._validation || !iN.field) {
			return true;
		}
		var min, max, pattern;
		var validated = false;
		var compare_to = iN.getAttribute("data-compare-to");
		if(!u.hc(iN.field, "required") && iN.val() === "" && (!compare_to || iN._form.inputs[compare_to].val() === "")) {
			this.inputIsCorrect(iN);
			return true;
		}
		else if(u.hc(iN.field, "required") && iN.val() === "") {
			this.inputHasError(iN);
			return false;
		}
		var custom_validate;
		for(custom_validate in u.f.customValidate) {
			if(u.hc(iN.field, custom_validate)) {
				u.f.customValidate[custom_validate](iN);
				validated = true;
			}
		}
		if(!validated) {
			if(u.hc(iN.field, "password")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 8;
				max = max ? max : 255;
				pattern = iN.getAttribute("pattern");
				if(
					iN.val().length >= min && 
					iN.val().length <= max && 
					(!pattern || iN.val().match("^"+pattern+"$")) &&
					(!compare_to || iN.val() == iN._form.inputs[compare_to].val())
				) {
					this.inputIsCorrect(iN);
					if(compare_to) {
						this.inputIsCorrect(iN._form.inputs[compare_to]);
					}
				}
				else {
					this.inputHasError(iN);
					if(compare_to) {
						this.inputHasError(iN._form.inputs[compare_to]);
					}
				}
			}
			else if(u.hc(iN.field, "number")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 0;
				max = max ? max : 99999999999999999999999999999;
				pattern = iN.getAttribute("pattern");
				if(
					!isNaN(iN.val()) && 
					iN.val() >= min && 
					iN.val() <= max && 
					(!pattern || iN.val().match("^"+pattern+"$"))
				) {
					this.inputIsCorrect(iN);
				}
				else {
					this.inputHasError(iN);
				}
			}
			else if(u.hc(iN.field, "integer")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 0;
				max = max ? max : 99999999999999999999999999999;
				pattern = iN.getAttribute("pattern");
				if(
					!isNaN(iN.val()) && 
					Math.round(iN.val()) == iN.val() && 
					iN.val() >= min && 
					iN.val() <= max && 
					(!pattern || iN.val().match("^"+pattern+"$"))
				) {
					this.inputIsCorrect(iN);
				}
				else {
					this.inputHasError(iN);
				}
			}
			else if(u.hc(iN.field, "tel")) {
				pattern = iN.getAttribute("pattern");
				if(
					(
						(!pattern && iN.val().match(/^([\+0-9\-\.\s\(\)]){5,18}$/))
						||
						(pattern && iN.val().match("^"+pattern+"$"))
					)
					&&
					(!compare_to || iN.val() == iN._form.inputs[compare_to].val())
				) {
					this.inputIsCorrect(iN);
					if(compare_to) {
						this.inputIsCorrect(iN._form.inputs[compare_to]);
					}
				}
				else {
					this.inputHasError(iN);
					if(compare_to) {
						this.inputHasError(iN._form.inputs[compare_to]);
					}
				}
			}
			else if(u.hc(iN.field, "email")) {
				pattern = iN.getAttribute("pattern");
				if(
					(
						(!pattern && iN.val().match(/^([^<>\\\/%$])+\@([^<>\\\/%$])+\.([^<>\\\/%$]{2,20})$/))
						||
						(pattern && iN.val().match("^"+pattern+"$"))
					)
					&&
					(!compare_to || iN.val() == iN._form.inputs[compare_to].val())
				) {
					this.inputIsCorrect(iN);
					if(compare_to) {
						this.inputIsCorrect(iN._form.inputs[compare_to]);
					}
				}
				else {
					this.inputHasError(iN);
					if(compare_to) {
						this.inputHasError(iN._form.inputs[compare_to]);
					}
				}
			}
			else if(u.hc(iN.field, "text")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 1;
				max = max ? max : 10000000;
				pattern = iN.getAttribute("pattern");
				if(
					iN.val().length >= min && 
					iN.val().length <= max && 
					(!pattern || iN.val().match("^"+pattern+"$"))
				) {
					this.inputIsCorrect(iN);
				}
				else {
					this.inputHasError(iN);
				}
			}
			else if(u.hc(iN.field, "json")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 2;
				max = max ? max : 10000000;
				if(
					iN.val().length >= min && 
					iN.val().length <= max && 
					(function(value) {
						try {
							JSON.parse(value);
							return true;
						}
						catch(exception) {
							return false;
						}
					}(iN.val()))
				) {
					this.inputIsCorrect(iN);
				}
				else {
					this.inputHasError(iN);
				}
			}
			else if(u.hc(iN.field, "date")) {
				min = u.cv(iN.field, "min");
				max = u.cv(iN.field, "max");
				pattern = iN.getAttribute("pattern");
				if(
					(!min || new Date(decodeURIComponent(min)) <= new Date(iN.val())) &&
					(!max || new Date(decodeURIComponent(max)) >= new Date(iN.val())) &&
					(
						(!pattern && iN.val().match(/^([\d]{4}[\-\/\ ]{1}[\d]{2}[\-\/\ ][\d]{2})$/))
						||
						(pattern && iN.val().match("^"+pattern+"$"))
					)
				) {
					this.inputIsCorrect(iN);
				}
				else {
					this.inputHasError(iN);
				}
			}
			else if(u.hc(iN.field, "datetime")) {
				min = u.cv(iN.field, "min");
				max = u.cv(iN.field, "max");
				pattern = iN.getAttribute("pattern");
				if(
					(!min || new Date(decodeURIComponent(min)) <= new Date(iN.val())) &&
					(!max || new Date(decodeURIComponent(max)) >= new Date(iN.val())) &&
					(
						(!pattern && iN.val().match(/^([\d]{4}[\-\/\ ]{1}[\d]{2}[\-\/\ ][\d]{2} [\d]{2}[\-\/\ \:]{1}[\d]{2}[\-\/\ \:]{0,1}[\d]{0,2})$/))
						||
						(pattern && iN.val().match(pattern))
					)
				) {
					this.inputIsCorrect(iN);
				}
				else {
					this.inputHasError(iN);
				}
			}
			else if(u.hc(iN.field, "files")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 1;
				max = max ? max : 10000000;
				pattern = iN.getAttribute("accept");
				if(pattern) {
					pattern = pattern.split(",");
				}
				var i, files = Array.prototype.slice.call(u.qsa("li:not(.label)", iN.field.filelist));
				var min_width = Number(iN.getAttribute("data-min-width"));
				var min_height = Number(iN.getAttribute("data-min-height"));
				var allowed_sizes = iN.getAttribute("data-allowed-sizes");
				if(allowed_sizes) {
					allowed_sizes = allowed_sizes.split(",");
				}
				var allowed_proportions = iN.getAttribute("data-allowed-proportions");
				if(allowed_proportions) {
					allowed_proportions = allowed_proportions.split(",");
					for(i = 0; i < allowed_proportions.length; i++) {
						allowed_proportions[i] = u.round(eval(allowed_proportions[i]), 4);
					}
				}
				if(
					(files.length >= min && files.length <= max)
					&&
					(!pattern || files.every(function(node) {return pattern.indexOf("."+u.cv(node, "format")) !== -1}))
					&&
					(!min_width || files.every(function(node) {return u.cv(node, "width") >= min_width}))
					&&
					(!min_height || files.every(function(node) {return u.cv(node, "height") >= min_height}))
					&&
					(!allowed_sizes || files.every(function(node) {return allowed_sizes.indexOf(u.cv(node, "width")+"x"+u.cv(node, "height")) !== -1}))
					&&
					(!allowed_proportions || files.every(function(node) {return allowed_proportions.indexOf(u.round(Number(u.cv(node, "width"))/Number(u.cv(node, "height")), 4)) !== -1}))
				) {
					this.inputIsCorrect(iN);
				}
				else {
					this.inputHasError(iN);
				}
			}
			else if(u.hc(iN.field, "select")) {
				if(iN.val() !== "") {
					this.inputIsCorrect(iN);
				}
				else {
					this.inputHasError(iN);
				}
			}
			else if(u.hc(iN.field, "checkbox|boolean|radiobuttons")) {
				if(iN.val() !== "") {
					this.inputIsCorrect(iN);
				}
				else {
					this.inputHasError(iN);
				}
			}
			else if(u.hc(iN.field, "string")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 1;
				max = max ? max : 255;
				pattern = iN.getAttribute("pattern");
				if(
					iN.val().length >= min &&
					iN.val().length <= max && 
					(!pattern || iN.val().match("^"+pattern+"$"))
					&&
					(!compare_to || iN.val() == iN._form.inputs[compare_to].val())
				) {
					this.inputIsCorrect(iN);
					if(compare_to) {
						this.inputIsCorrect(iN._form.inputs[compare_to]);
					}
				}
				else {
					this.inputHasError(iN);
					if(compare_to) {
						this.inputHasError(iN._form.inputs[compare_to]);
					}
				}
			}
		}
		if(u.hc(iN.field, "error")) {
			return false;
		}
		else {
			return true;
		}
	}
	this.getFormData = this.getParams = function(_form, _options) {
		var format = "formdata";
		var ignore_inputs = "ignoreinput";
		if(obj(_options)) {
			var _argument;
			for(_argument in _options) {
				switch(_argument) {
					case "ignore_inputs"    : ignore_inputs     = _options[_argument]; break;
					case "format"           : format            = _options[_argument]; break;
				}
			}
		}
		var i, input, select, textarea, param, params;
		if(format == "formdata") {
			params = new FormData();
		}
		else {
			params = new Object();
			params.append = function(name, value, filename) {
				this[name] = filename || value;
			}
		}
		if(_form._submit_button && _form._submit_button.name) {
			params.append(_form._submit_button.name, _form._submit_button.value);
		}
		var inputs = u.qsa("input", _form);
		var selects = u.qsa("select", _form)
		var textareas = u.qsa("textarea", _form)
		for(i = 0; i < inputs.length; i++) {
			input = inputs[i];
			if(!u.hc(input, ignore_inputs)) {
				if((input.type == "checkbox" || input.type == "radio") && input.checked) {
					if(fun(input.val)) {
						params.append(input.name, input.val());
					}
					else {
						params.append(input.name, input.value);
					}
				}
				else if(input.type == "file") {
					var f, file, files;
					if(fun(input.val)) {
						files = input.val();
					}
					else if(input.files) {
						files = input.files;
					}
					if(files && files.length) {
						for(f = 0; f < files.length; f++) {
							file = files[f];
							params.append(input.name, file, file.name);
						}
					}
					else {
						params.append(input.name, (input.value || ""));
					}
				}
				else if(!input.type.match(/button|submit|reset|file|checkbox|radio/i)) {
					if(fun(input.val)) {
						params.append(input.name, input.val());
					}
					else {
						params.append(input.name, input.value);
					}
				}
			}
		}
		for(i = 0; i < selects.length; i++) {
			select = selects[i];
			if(!u.hc(select, ignore_inputs)) {
				if(fun(select.val)) {
					params.append(select.name, select.val());
				}
				else {
					params.append(select.name, select.options[select.selectedIndex] ? select.options[select.selectedIndex].value : "");
				}
			}
		}
		for(i = 0; i < textareas.length; i++) {
			textarea = textareas[i];
			if(!u.hc(textarea, ignore_inputs)) {
				if(fun(textarea.val)) {
					params.append(textarea.name, textarea.val());
				}
				else {
					params.append(textarea.name, textarea.value);
				}
			}
		}
		if(format && fun(this.customDataFormat[format])) {
			return this.customDataFormat[format](params, _form);
		}
		else if(format == "formdata") {
			return params;
		}
		else if(format == "object") {
			delete params.append;
			return params;
		}
		else {
			var string = "";
			for(param in params) {
				if(!fun(params[param])) {
					string += (string ? "&" : "") + param + "=" + encodeURIComponent(params[param]);
				}
			}
			return string;
		}
	}
}
Util.Form.customLabelStyle["inject"] = function(iN) {
	if(!iN.type || !iN.type.match(/file|radio|checkbox/)) {
		iN.default_value = u.text(iN.label);
		u.e.addEvent(iN, "focus", u.f._changed_state);
		u.e.addEvent(iN, "blur", u.f._changed_state);
		u.e.addEvent(iN, "change", u.f._changed_state);
		if(iN.type.match(/number|integer|password|datetime|date/)) {
			iN.pseudolabel = u.ae(iN.parentNode, "span", {"class":"pseudolabel", "html":iN.default_value});
			iN.pseudolabel.iN = iN;
			u.as(iN.pseudolabel, "top", iN.offsetTop+"px");
			u.as(iN.pseudolabel, "left", iN.offsetLeft+"px");
			u.ce(iN.pseudolabel)
			iN.pseudolabel.inputStarted = function(event) {
				u.e.kill(event);
				this.iN.focus();
			}
		}
		u.f.updateDefaultState(iN);
	}
}
u.f._changed_state = function() {
	u.f.updateDefaultState(this);
}
u.f.updateDefaultState = function(iN) {
	if(iN.is_focused || iN.val() !== "") {
		u.rc(iN, "default");
		if(iN.field.virtual_input) {
			u.rc(iN.field.virtual_input, "default");
		}
		if(iN.val() === "") {
			iN.val("");
		}
	}
	else {
		if(iN.val() === "") {
			u.ac(iN, "default");
			if(obj(iN.field.virtual_input)) {
				u.ac(iN.field.virtual_input, "default");
			}
			iN.val(iN.default_value);
		}
	}
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
	return (event.targetTouches && event.targetTouches.length ? event.targetTouches[0].pageX : event.pageX);
}
Util.eventY = function(event){
	return (event.targetTouches && event.targetTouches.length ? event.targetTouches[0].pageY : event.pageY);
}
Util.browserWidth = u.browserW = function() {
	return document.documentElement.clientWidth;
}
Util.browserHeight = u.browserH = function() {
	return document.documentElement.clientHeight;
}
Util.htmlWidth = u.htmlW = function() {
	return document.body.offsetWidth + parseInt(u.gcs(document.body, "margin-left")) + parseInt(u.gcs(document.body, "margin-right"));
}
Util.htmlHeight = u.htmlH = function() {
	return document.body.offsetHeight + parseInt(u.gcs(document.body, "margin-top")) + parseInt(u.gcs(document.body, "margin-bottom"));
}
Util.pageScrollX = u.scrollX = function() {
	return window.pageXOffset;
}
Util.pageScrollY = u.scrollY = function() {
	return window.pageYOffset;
}
Util.Modules = u.m = new Object();
Util.init = function(scope) {
	var i, node, nodes, module;
	scope = scope && scope.nodeName ? scope : document;
	nodes = u.ges("i\:([_a-zA-Z0-9])+", scope);
	for(i = 0; i < nodes.length; i++) {
		node = nodes[i];
		while((module = u.cv(node, "i"))) {
			u.rc(node, "i:"+module);
			if(module && obj(u.m[module])) {
				u.m[module].init(node);
			}
		}
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
Util.round = function(number, decimals) {
	var round_number = number*Math.pow(10, decimals);
	return Math.round(round_number)/Math.pow(10, decimals);
}
u.objectValues = function(obj) {
	var key, values = [];
	for(key in obj) {
		if(obj.hasOwnProperty(key)) {
			values.push(obj[key]);
		}
	}
	return values;
}
u.preloader = function(node, files, _options) {
	var callback_preloader_loaded = "loaded";
	var callback_preloader_loading = "loading";
	var callback_preloader_waiting = "waiting";
	node._callback_min_delay = 0;
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "loaded"               : callback_preloader_loaded       = _options[_argument]; break;
				case "loading"              : callback_preloader_loading      = _options[_argument]; break;
				case "waiting"              : callback_preloader_waiting      = _options[_argument]; break;
				case "callback_min_delay"   : node._callback_min_delay              = _options[_argument]; break;
			}
		}
	}
	if(!u._preloader_queue) {
		u._preloader_queue = document.createElement("div");
		u._preloader_processes = 0;
		if(u.e && u.e.event_support == "touch") {
			u._preloader_max_processes = 1;
		}
		else {
			u._preloader_max_processes = 2;
		}
	}
	if(node && files) {
		var entry, file;
		var new_queue = u.ae(u._preloader_queue, "ul");
		new_queue._callback_loaded = callback_preloader_loaded;
		new_queue._callback_loading = callback_preloader_loading;
		new_queue._callback_waiting = callback_preloader_waiting;
		new_queue._node = node;
		new_queue._files = files;
		new_queue.nodes = new Array();
		new_queue._start_time = new Date().getTime();
		for(i = 0; i < files.length; i++) {
			file = files[i];
			entry = u.ae(new_queue, "li", {"class":"waiting"});
			entry.i = i;
			entry._queue = new_queue
			entry._file = file;
		}
		u.ac(node, "waiting");
		if(fun(node[new_queue._callback_waiting])) {
			node[new_queue._callback_waiting](new_queue.nodes);
		}
	}
	u._queueLoader();
	return u._preloader_queue;
}
u._queueLoader = function() {
	if(u.qs("li.waiting", u._preloader_queue)) {
		while(u._preloader_processes < u._preloader_max_processes) {
			var next = u.qs("li.waiting", u._preloader_queue);
			if(next) {
				if(u.hc(next._queue._node, "waiting")) {
					u.rc(next._queue._node, "waiting");
					u.ac(next._queue._node, "loading");
					if(fun(next._queue._node[next._queue._callback_loading])) {
						next._queue._node[next._queue._callback_loading](next._queue.nodes);
					}
				}
				u._preloader_processes++;
				u.rc(next, "waiting");
				u.ac(next, "loading");
				if(next._file.match(/png|jpg|gif|svg/)) {
					next.loaded = function(event) {
						this.image = event.target;
						this._image = this.image;
						this._queue.nodes[this.i] = this;
						u.rc(this, "loading");
						u.ac(this, "loaded");
						u._preloader_processes--;
						if(!u.qs("li.waiting,li.loading", this._queue)) {
							u.rc(this._queue._node, "loading");
							if(fun(this._queue._node[this._queue._callback_loaded])) {
								this._queue._node[this._queue._callback_loaded](this._queue.nodes);
							}
						}
						u._queueLoader();
					}
					u.loadImage(next, next._file);
				}
				else if(next._file.match(/mp3|aac|wav|ogg/)) {
					next.loaded = function(event) {
						console.log(event);
						this._queue.nodes[this.i] = this;
						u.rc(this, "loading");
						u.ac(this, "loaded");
						u._preloader_processes--;
						if(!u.qs("li.waiting,li.loading", this._queue)) {
							u.rc(this._queue._node, "loading");
							if(fun(this._queue._node[this._queue._callback_loaded])) {
								this._queue._node[this._queue._callback_loaded](this._queue.nodes);
							}
						}
						u._queueLoader();
					}
					if(fun(u.audioPlayer)) {
						next.audioPlayer = u.audioPlayer();
						next.load(next._file);
					}
					else {
						u.bug("You need u.audioPlayer to preload MP3s");
					}
				}
				else {
				}
			}
			else {
				break
			}
		}
	}
}
u.loadImage = function(node, src) {
	var image = new Image();
	image.node = node;
	u.ac(node, "loading");
    u.e.addEvent(image, 'load', u._imageLoaded);
	u.e.addEvent(image, 'error', u._imageLoadError);
	image.src = src;
}
u._imageLoaded = function(event) {
	u.rc(this.node, "loading");
	if(fun(this.node.loaded)) {
		this.node.loaded(event);
	}
}
u._imageLoadError = function(event) {
	u.rc(this.node, "loading");
	u.ac(this.node, "error");
	if(fun(this.node.loaded) && typeof(this.node.failed) != "function") {
		this.node.loaded(event);
	}
	else if(fun(this.node.failed)) {
		this.node.failed(event);
	}
}
u._imageLoadProgress = function(event) {
	u.bug("progress")
	if(fun(this.node.progress)) {
		this.node.progress(event);
	}
}
u._imageLoadDebug = function(event) {
	u.bug("event:" + event.type);
	u.xInObject(event);
}
Util.createRequestObject = function() {
	return new XMLHttpRequest();
}
Util.request = function(node, url, _options) {
	var request_id = u.randomString(6);
	node[request_id] = {};
	node[request_id].request_url = url;
	node[request_id].request_method = "GET";
	node[request_id].request_async = true;
	node[request_id].request_data = "";
	node[request_id].request_headers = false;
	node[request_id].request_credentials = false;
	node[request_id].response_type = false;
	node[request_id].callback_response = "response";
	node[request_id].callback_error = "responseError";
	node[request_id].jsonp_callback = "callback";
	node[request_id].request_timeout = false;
	if(obj(_options)) {
		var argument;
		for(argument in _options) {
			switch(argument) {
				case "method"				: node[request_id].request_method			= _options[argument]; break;
				case "params"				: node[request_id].request_data				= _options[argument]; break;
				case "data"					: node[request_id].request_data				= _options[argument]; break;
				case "async"				: node[request_id].request_async			= _options[argument]; break;
				case "headers"				: node[request_id].request_headers			= _options[argument]; break;
				case "credentials"			: node[request_id].request_credentials		= _options[argument]; break;
				case "responseType"			: node[request_id].response_type			= _options[argument]; break;
				case "callback"				: node[request_id].callback_response		= _options[argument]; break;
				case "error_callback"		: node[request_id].callback_error			= _options[argument]; break;
				case "jsonp_callback"		: node[request_id].jsonp_callback			= _options[argument]; break;
				case "timeout"				: node[request_id].request_timeout			= _options[argument]; break;
			}
		}
	}
	if(node[request_id].request_method.match(/GET|POST|PUT|PATCH/i)) {
		node[request_id].HTTPRequest = this.createRequestObject();
		node[request_id].HTTPRequest.node = node;
		node[request_id].HTTPRequest.request_id = request_id;
		if(node[request_id].request_async) {
			node[request_id].HTTPRequest.statechanged = function() {
				if(this.readyState == 4 || this.IEreadyState) {
					u.validateResponse(this);
				}
			}
			if(fun(node[request_id].HTTPRequest.addEventListener)) {
				u.e.addEvent(node[request_id].HTTPRequest, "readystatechange", node[request_id].HTTPRequest.statechanged);
			}
		}
		try {
			if(node[request_id].request_method.match(/GET/i)) {
				var params = u.JSONtoParams(node[request_id].request_data);
				node[request_id].request_url += params ? ((!node[request_id].request_url.match(/\?/g) ? "?" : "&") + params) : "";
				node[request_id].HTTPRequest.open(node[request_id].request_method, node[request_id].request_url, node[request_id].request_async);
				if(node[request_id].response_type) {
					node[request_id].HTTPRequest.responseType = node[request_id].response_type;
				}
				if(node[request_id].request_timeout) {
					node[request_id].HTTPRequest.timeout = node[request_id].request_timeout;
				}
				if(node[request_id].request_credentials) {
					node[request_id].HTTPRequest.withCredentials = true;
				}
				if(typeof(node[request_id].request_headers) != "object" || (!node[request_id].request_headers["Content-Type"] && !node[request_id].request_headers["content-type"])) {
					node[request_id].HTTPRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				}
				if(obj(node[request_id].request_headers)) {
					var header;
					for(header in node[request_id].request_headers) {
						node[request_id].HTTPRequest.setRequestHeader(header, node[request_id].request_headers[header]);
					}
				}
				node[request_id].HTTPRequest.setRequestHeader("X-Requested-With", "XMLHttpRequest");
				node[request_id].HTTPRequest.send("");
			}
			else if(node[request_id].request_method.match(/POST|PUT|PATCH|DELETE/i)) {
				var params;
				if(obj(node[request_id].request_data) && node[request_id].request_data.constructor.toString().match(/function Object/i)) {
					params = JSON.stringify(node[request_id].request_data);
				}
				else {
					params = node[request_id].request_data;
				}
				node[request_id].HTTPRequest.open(node[request_id].request_method, node[request_id].request_url, node[request_id].request_async);
				if(node[request_id].response_type) {
					node[request_id].HTTPRequest.responseType = node[request_id].response_type;
				}
				if(node[request_id].request_timeout) {
					node[request_id].HTTPRequest.timeout = node[request_id].request_timeout;
				}
				if(node[request_id].request_credentials) {
					node[request_id].HTTPRequest.withCredentials = true;
				}
				if(!params.constructor.toString().match(/FormData/i) && (typeof(node[request_id].request_headers) != "object" || (!node[request_id].request_headers["Content-Type"] && !node[request_id].request_headers["content-type"]))) {
					node[request_id].HTTPRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				}
				if(obj(node[request_id].request_headers)) {
					var header;
					for(header in node[request_id].request_headers) {
						node[request_id].HTTPRequest.setRequestHeader(header, node[request_id].request_headers[header]);
					}
				}
				node[request_id].HTTPRequest.setRequestHeader("X-Requested-With", "XMLHttpRequest");
				node[request_id].HTTPRequest.send(params);
			}
		}
		catch(exception) {
			node[request_id].HTTPRequest.exception = exception;
			u.validateResponse(node[request_id].HTTPRequest);
			return;
		}
		if(!node[request_id].request_async) {
			u.validateResponse(node[request_id].HTTPRequest);
		}
	}
	else if(node[request_id].request_method.match(/SCRIPT/i)) {
		if(node[request_id].request_timeout) {
			node[request_id].timedOut = function(requestee) {
				this.status = 0;
				delete this.timedOut;
				delete this.t_timeout;
				Util.validateResponse({node: requestee.node, request_id: requestee.request_id, status:this.status});
			}
			node[request_id].t_timeout = u.t.setTimer(node[request_id], "timedOut", node[request_id].request_timeout, {node: node, request_id: request_id});
		}
		var key = u.randomString();
		document[key] = new Object();
		document[key].key = key;
		document[key].node = node;
		document[key].request_id = request_id;
		document[key].responder = function(response) {
			var response_object = new Object();
			response_object.node = this.node;
			response_object.request_id = this.request_id;
			response_object.responseText = response;
			u.t.resetTimer(this.node[this.request_id].t_timeout);
			delete this.node[this.request_id].timedOut;
			delete this.node[this.request_id].t_timeout;
			u.qs("head").removeChild(this.node[this.request_id].script_tag);
			delete this.node[this.request_id].script_tag;
			delete document[this.key];
			u.validateResponse(response_object);
		}
		var params = u.JSONtoParams(node[request_id].request_data);
		node[request_id].request_url += params ? ((!node[request_id].request_url.match(/\?/g) ? "?" : "&") + params) : "";
		node[request_id].request_url += (!node[request_id].request_url.match(/\?/g) ? "?" : "&") + node[request_id].jsonp_callback + "=document."+key+".responder";
		node[request_id].script_tag = u.ae(u.qs("head"), "script", ({"type":"text/javascript", "src":node[request_id].request_url}));
	}
	return request_id;
}
Util.JSONtoParams = function(json) {
	if(obj(json)) {
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
Util.evaluateResponseText = function(responseText) {
	var object;
	if(obj(responseText)) {
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
Util.validateResponse = function(HTTPRequest){
	var object = false;
	if(HTTPRequest) {
		var node = HTTPRequest.node;
		var request_id = HTTPRequest.request_id;
		var request = node[request_id];
		request.response_url = HTTPRequest.responseURL || request.request_url;
		delete request.HTTPRequest;
		if(request.finished) {
			return;
		}
		request.finished = true;
		try {
			request.status = HTTPRequest.status;
			if(HTTPRequest.status && !HTTPRequest.status.toString().match(/[45][\d]{2}/)) {
				if(HTTPRequest.responseType && HTTPRequest.response) {
					object = HTTPRequest.response;
				}
				else if(HTTPRequest.responseText) {
					object = u.evaluateResponseText(HTTPRequest.responseText);
				}
			}
			else if(HTTPRequest.responseText && typeof(HTTPRequest.status) == "undefined") {
				object = u.evaluateResponseText(HTTPRequest.responseText);
			}
		}
		catch(exception) {
			request.exception = exception;
		}
	}
	else {
		console.log("Lost track of this request. There is no way of routing it back to requestee.")
		return;
	}
	if(object !== false) {
		if(fun(request.callback_response)) {
			request.callback_response(object, request_id);
		}
		else if(fun(node[request.callback_response])) {
			node[request.callback_response](object, request_id);
		}
	}
	else {
		if(fun(request.callback_error)) {
			request.callback_error({error:true,status:request.status}, request_id);
		}
		else if(fun(node[request.callback_error])) {
			node[request.callback_error]({error:true,status:request.status}, request_id);
		}
		else if(fun(request.callback_response)) {
			request.callback_response({error:true,status:request.status}, request_id);
		}
		else if(fun(node[request.callback_response])) {
			node[request.callback_response]({error:true,status:request.status}, request_id);
		}
	}
}
u.scrollTo = function(node, _options) {
	node._callback_scroll_to = "scrolledTo";
	node._callback_scroll_cancelled = "scrollToCancelled";
	var offset_y = 0;
	var offset_x = 0;
	var scroll_to_x = 0;
	var scroll_to_y = 0;
	var to_node = false;
	node._force_scroll_to = false;
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "callback"             : node._callback_scroll_to            = _options[_argument]; break;
				case "callback_cancelled"   : node._callback_scroll_cancelled     = _options[_argument]; break;
				case "offset_y"             : offset_y                           = _options[_argument]; break;
				case "offset_x"             : offset_x                           = _options[_argument]; break;
				case "node"                 : to_node                            = _options[_argument]; break;
				case "x"                    : scroll_to_x                        = _options[_argument]; break;
				case "y"                    : scroll_to_y                        = _options[_argument]; break;
				case "scrollIn"             : scrollIn                           = _options[_argument]; break;
				case "force"                : node._force_scroll_to              = _options[_argument]; break;
			}
		}
	}
	if(to_node) {
		node._to_x = u.absX(to_node);
		node._to_y = u.absY(to_node);
	}
	else {
		node._to_x = scroll_to_x;
		node._to_y = scroll_to_y;
	}
	node._to_x = offset_x ? node._to_x - offset_x : node._to_x;
	node._to_y = offset_y ? node._to_y - offset_y : node._to_y;
	if (Util.support("scrollBehavior")) {
		var test = node.scrollTo({top:node._to_y, left:node._to_x, behavior: 'smooth'});
	}
	else {
		if(node._to_y > (node == window ? document.body.scrollHeight : node.scrollHeight)-u.browserH()) {
			node._to_y = (node == window ? document.body.scrollHeight : node.scrollHeight)-u.browserH();
		}
		if(node._to_x > (node == window ? document.body.scrollWidth : node.scrollWidth)-u.browserW()) {
			node._to_x = (node == window ? document.body.scrollWidth : node.scrollWidth)-u.browserW();
		}
		node._to_x = node._to_x < 0 ? 0 : node._to_x;
		node._to_y = node._to_y < 0 ? 0 : node._to_y;
		node._x_scroll_direction = node._to_x - u.scrollX();
		node._y_scroll_direction = node._to_y - u.scrollY();
		node._scroll_to_x = u.scrollX();
		node._scroll_to_y = u.scrollY();
		node._ignoreWheel = function(event) {
			u.e.kill(event);
		}
		if(node._force_scroll_to) {
			u.e.addEvent(node, "wheel", node._ignoreWheel);
		}
		node._scrollToHandler = function(event) {
			u.t.resetTimer(this.t_scroll);
			this.t_scroll = u.t.setTimer(this, this._scrollTo, 25);
		}
		node._cancelScrollTo = function() {
			if(!this._force_scroll_to) {
				u.t.resetTimer(this.t_scroll);
				this._scrollTo = null;
			}
		}
		node._scrollToFinished = function() {
			u.t.resetTimer(this.t_scroll);
			u.e.removeEvent(this, "wheel", this._ignoreWheel);
			this._scrollTo = null;
		}
		node._ZoomScrollFix = function(s_x, s_y) {
			if(Math.abs(this._scroll_to_y - s_y) <= 2 && Math.abs(this._scroll_to_x - s_x) <= 2) {
				return true;
			}
			return false;
		}
		node._scrollTo = function(start) {
			var s_x = u.scrollX();
			var s_y = u.scrollY();
			if((s_y == this._scroll_to_y && s_x == this._scroll_to_x) || this._force_scroll_to || this._ZoomScrollFix(s_x, s_y)) {
				if(this._x_scroll_direction > 0 && this._to_x > s_x) {
					this._scroll_to_x = Math.ceil(this._scroll_to_x + (this._to_x - this._scroll_to_x)/6);
				}
				else if(this._x_scroll_direction < 0 && this._to_x < s_x) {
					this._scroll_to_x = Math.floor(this._scroll_to_x - (this._scroll_to_x - this._to_x)/6);
				}
				else {
					this._scroll_to_x = this._to_x;
				}
				if(this._y_scroll_direction > 0 && this._to_y > s_y) {
					this._scroll_to_y = Math.ceil(this._scroll_to_y + (this._to_y - this._scroll_to_y)/6);
				}
				else if(this._y_scroll_direction < 0 && this._to_y < s_y) {
					this._scroll_to_y = Math.floor(this._scroll_to_y - (this._scroll_to_y - this._to_y)/6);
				}
				else {
					this._scroll_to_y = this._to_y;
				}
				if(this._scroll_to_x == this._to_x && this._scroll_to_y == this._to_y) {
					this._scrollToFinished();
					this.scrollTo(this._to_x, this._to_y);
					if(fun(this[this._callback_scroll_to])) {
						this[this._callback_scroll_to]();
					}
					return;
				}
				this.scrollTo(this._scroll_to_x, this._scroll_to_y);
				this._scrollToHandler();
			}
			else {
				this._cancelScrollTo();
				if(fun(this[this._callback_scroll_cancelled])) {
					this[this._callback_scroll_cancelled]();
				}
			}	
		}
		node._scrollTo();
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
		for(i = 0; i < matches.length; i++){
			match = matches[i];
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
Util.stringOr = u.eitherOr = function(value, replacement) {
	if(value !== undefined && value !== null) {
		return value;
	}
	else {
		return replacement ? replacement : "";
	}	
}
Util.getMatches = function(string, regex) {
	var match, matches = [];
	while(match = regex.exec(string)) {
		matches.push(match[1]);
	}
	return matches;
}
Util.upperCaseFirst = u.ucfirst = function(string) {
	return string.replace(/^(.){1}/, function($1) {return $1.toUpperCase()});
}
Util.lowerCaseFirst = u.lcfirst = function(string) {
	return string.replace(/^(.){1}/, function($1) {return $1.toLowerCase()});
}
Util.normalize = function(string) {
	var table = {
		'À':'A',  'à':'a',
		'Á':'A',  'á':'a',
		'Â':'A',  'â':'a',
		'Ã':'A',  'ã':'a',
		'Ä':'A',  'ä':'a',
		'Å':'Aa', 'å':'aa',
		'Æ':'Ae', 'æ':'ae',
		'Ç':'C',  'ç':'c',
		'Č':'C',  'ć':'c',
		'Ć':'C',  'č':'c',
		'Đ':'D',  'đ':'d',  'ð':'d',
		'È':'E',  'è':'e',
		'É':'E',  'é':'e',
		'Ê':'E',  'ê':'e',
		'Ë':'E',  'ë':'e',
		'Ģ':'G',  'ģ':'g',
		'Ğ':'G',  'ğ':'g',
		'Ì':'I',  'ì':'i',
		'Í':'I',  'í':'i',
		'Î':'I',  'î':'i',
		'Ï':'I',  'ï':'i',
		'Ī':'I',  'ī':'i',
		'Ķ':'K',  'ķ':'k',
		'Ļ':'L',  'ļ':'l',
		'Ñ':'N',  'ñ':'n',
		'Ņ':'N',  'ņ':'n',
		'Ò':'O',  'ò':'o',
		'Ó':'O',  'ó':'o',
		'Ô':'O',  'ô':'o',
		'Õ':'O',  'õ':'o',
		'Ö':'O',  'ö':'o',
		'Ō':'O',  'ō':'o',
		'Ø':'Oe', 'ø':'oe',
		'Ŕ':'R',  'ŕ':'r',
		'Š':'S',  'š':'s',
		'Ş':'S',  'ş':'s',
		'Ṩ':'S',  'ṩ':'s',
		'Ù':'U',  'ù':'u',
		'Ú':'U',  'ú':'u',
		'Û':'U',  'û':'u',
		'Ü':'U',  'ü':'u',
		'Ū':'U',  'ū':'u',
		'Ų':'U',  'ų':'u',
		'Ŭ':'U',  'ŭ':'u',
		'Ý':'Y',  'ý':'y',
		'Ÿ':'Y',  'ÿ':'y',
		'Ž':'Z',  'ž':'z',
		'Þ':'B',  'þ':'b',
		'ß':'Ss',
		'@':' at ',
		'&':'and',
		'%':' percent',
		'\\$':'USD',
		'¥':'JPY',
		'€':'EUR',
		'£':'GBP',
		'™':'trademark',
		'©':'copyright',
		'§':'s',
		'\\*':'x',
		'×':'x'
	}
	var char, regex;
	for(char in table) {
		regex = new RegExp(char, "g");
		string = string.replace(regex, table[char]);
	}
	return string;
}
Util.superNormalize = function(string) {
	string = u.normalize(string);
	string = string.toLowerCase();
	string = u.stripTags(string);
	string = string.replace(/[^a-z0-9\_]/g, '-');
	string = string.replace(/-+/g, '-');
	string = string.replace(/^-|-$/g, '');
	return string;
}
Util.stripTags = function(string) {
	var node = document.createElement("div");
	node.innerHTML = string;
	return u.text(node);
}
Util.pluralize = function(count, singular, plural) {
	if(count != 1) {
		return count + " " + plural;
	}
	return count + " " + singular;
}
Util.isStringJSON = function(string) {
	if(string.trim().substr(0, 1).match(/[\{\[]/i) && string.trim().substr(-1, 1).match(/[\}\]]/i)) {
		try {
			var test = JSON.parse(string);
			if(obj(test)) {
				test.isJSON = true;
				return test;
			}
		}
		catch(exception) {
			console.log(exception)
		}
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
Util.svg = function(svg_object) {
	var svg, shape, svg_shape;
	if(svg_object.name && u._svg_cache && u._svg_cache[svg_object.name]) {
		svg = u._svg_cache[svg_object.name].cloneNode(true);
	}
	if(!svg) {
		svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		for(shape in svg_object.shapes) {
			Util.svgShape(svg, svg_object.shapes[shape]);
		}
		if(svg_object.name) {
			if(!u._svg_cache) {
				u._svg_cache = {};
			}
			u._svg_cache[svg_object.name] = svg.cloneNode(true);
		}
	}
	if(svg_object.title) {
		svg.setAttributeNS(null, "title", svg_object.title);
	}
	if(svg_object["class"]) {
		svg.setAttributeNS(null, "class", svg_object["class"]);
	}
	if(svg_object.width) {
		svg.setAttributeNS(null, "width", svg_object.width);
	}
	if(svg_object.height) {
		svg.setAttributeNS(null, "height", svg_object.height);
	}
	if(svg_object.id) {
		svg.setAttributeNS(null, "id", svg_object.id);
	}
	if(svg_object.viewBox) {
		svg.setAttributeNS(null, "viewBox", svg_object.viewBox);
	}
	if(svg_object.node) {
		svg.node = svg_object.node;
	}
	if(svg_object.node) {
		svg_object.node.appendChild(svg);
	}
	return svg;
}
Util.svgShape = function(svg, svg_object) {
	var detail, svg_shape;
	svg_shape = document.createElementNS("http://www.w3.org/2000/svg", svg_object["type"]);
	delete svg_object["type"];
	for(detail in svg_object) {
		svg_shape.setAttributeNS(null, detail, svg_object[detail]);
	}
	return svg.appendChild(svg_shape);
}
Util.browser = function(model, version) {
	var current_version = false;
	if(model.match(/\bedge\b/i)) {
		if(navigator.userAgent.match(/Windows[^$]+Gecko[^$]+Edge\/(\d+.\d)/i)) {
			current_version = navigator.userAgent.match(/Edge\/(\d+)/i)[1];
		}
	}
	if(model.match(/\bexplorer\b|\bie\b/i)) {
		if(window.ActiveXObject && navigator.userAgent.match(/MSIE (\d+.\d)/i)) {
			current_version = navigator.userAgent.match(/MSIE (\d+.\d)/i)[1];
		}
		else if(navigator.userAgent.match(/Trident\/[\d+]\.\d[^$]+rv:(\d+.\d)/i)) {
			current_version = navigator.userAgent.match(/Trident\/[\d+]\.\d[^$]+rv:(\d+.\d)/i)[1];
		}
	}
	if(model.match(/\bfirefox\b|\bgecko\b/i) && !u.browser("ie,edge")) {
		if(navigator.userAgent.match(/Firefox\/(\d+\.\d+)/i)) {
			current_version = navigator.userAgent.match(/Firefox\/(\d+\.\d+)/i)[1];
		}
	}
	if(model.match(/\bwebkit\b/i)) {
		if(navigator.userAgent.match(/WebKit/i) && !u.browser("ie,edge")) {
			current_version = navigator.userAgent.match(/AppleWebKit\/(\d+.\d)/i)[1];
		}
	}
	if(model.match(/\bchrome\b/i)) {
		if(window.chrome && !u.browser("ie,edge")) {
			current_version = navigator.userAgent.match(/Chrome\/(\d+)(.\d)/i)[1];
		}
	}
	if(model.match(/\bsafari\b/i)) {
		u.bug(navigator.userAgent);
		if(!window.chrome && navigator.userAgent.match(/WebKit[^$]+Version\/(\d+)(.\d)/i) && !u.browser("ie,edge")) {
			current_version = navigator.userAgent.match(/Version\/(\d+)(.\d)/i)[1];
		}
	}
	if(model.match(/\bopera\b/i)) {
		if(window.opera) {
			if(navigator.userAgent.match(/Version\//)) {
				current_version = navigator.userAgent.match(/Version\/(\d+)(.\d)/i)[1];
			}
			else {
				current_version = navigator.userAgent.match(/Opera[\/ ]{1}(\d+)(.\d)/i)[1];
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
Util.segment = function(segment) {
	if(!u.current_segment) {
		var scripts = document.getElementsByTagName("script");
		var script, i, src;
		for(i = 0; i < scripts.length; i++) {
			script = scripts[i];
			seg_src = script.src.match(/\/seg_([a-z_]+)/);
			if(seg_src) {
				u.current_segment = seg_src[1];
			}
		}
	}
	if(segment) {
		return segment == u.current_segment;
	}
	return u.current_segment;
}
Util.system = function(os, version) {
	var current_version = false;
	if(os.match(/\bwindows\b/i)) {
		if(navigator.userAgent.match(/(Windows NT )(\d+.\d)/i)) {
			current_version = navigator.userAgent.match(/(Windows NT )(\d+.\d)/i)[2];
		}
	}
	else if(os.match(/\bmac\b/i)) {
		if(navigator.userAgent.match(/(Macintosh; Intel Mac OS X )(\d+[._]{1}\d)/i)) {
			current_version = navigator.userAgent.match(/(Macintosh; Intel Mac OS X )(\d+[._]{1}\d)/i)[2].replace("_", ".");
		}
	}
	else if(os.match(/\blinux\b/i)) {
		if(navigator.userAgent.match(/linux|x11/i) && !navigator.userAgent.match(/android/i)) {
			current_version = true;
		}
	}
	else if(os.match(/\bios\b/i)) {
		if(navigator.userAgent.match(/(OS )(\d+[._]{1}\d+[._\d]*)( like Mac OS X)/i)) {
			current_version = navigator.userAgent.match(/(OS )(\d+[._]{1}\d+[._\d]*)( like Mac OS X)/i)[2].replace(/_/g, ".");
		}
	}
	else if(os.match(/\bandroid\b/i)) {
		if(navigator.userAgent.match(/Android[ ._]?(\d+.\d)/i)) {
			current_version = navigator.userAgent.match(/Android[ ._]?(\d+.\d)/i)[1];
		}
	}
	else if(os.match(/\bwinphone\b/i)) {
		if(navigator.userAgent.match(/Windows[ ._]?Phone[ ._]?(\d+.\d)/i)) {
			current_version = navigator.userAgent.match(/Windows[ ._]?Phone[ ._]?(\d+.\d)/i)[1];
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
Util.support = function(property) {
	if(document.documentElement) {
		var style_property = u.lcfirst(property.replace(/^(-(moz|webkit|ms|o)-|(Moz|webkit|Webkit|ms|O))/, "").replace(/(-\w)/g, function(word){return word.replace(/-/, "").toUpperCase()}));
		if(style_property in document.documentElement.style) {
			return true;
		}
		else if(u.vendorPrefix() && (u.vendorPrefix()+u.ucfirst(style_property)) in document.documentElement.style) {
			return true;
		}
	}
	return false;
}
Util.vendor_properties = {};
Util.vendorProperty = function(property) {
	if(!Util.vendor_properties[property]) {
		Util.vendor_properties[property] = property.replace(/(-\w)/g, function(word){return word.replace(/-/, "").toUpperCase()});
		if(document.documentElement) {
			var style_property = u.lcfirst(property.replace(/^(-(moz|webkit|ms|o)-|(Moz|webkit|Webkit|ms|O))/, "").replace(/(-\w)/g, function(word){return word.replace(/-/, "").toUpperCase()}));
			if(style_property in document.documentElement.style) {
				Util.vendor_properties[property] = style_property;
			}
			else if(u.vendorPrefix() && (u.vendorPrefix()+u.ucfirst(style_property)) in document.documentElement.style) {
				Util.vendor_properties[property] = u.vendorPrefix()+u.ucfirst(style_property);
			}
		}
	}
	return Util.vendor_properties[property];
}
Util.vendor_prefix = false;
Util.vendorPrefix = function() {
	if(Util.vendor_prefix === false) {
		Util.vendor_prefix = "";
		if(document.documentElement && fun(window.getComputedStyle)) {
			var styles = window.getComputedStyle(document.documentElement, "");
			if(styles.length) {
				var i, style, match;
				for(i = 0; i < styles.length; i++) {
					style = styles[i];
					match = style.match(/^-(moz|webkit|ms)-/);
					if(match) {
						Util.vendor_prefix = match[1];
						if(Util.vendor_prefix == "moz") {
							Util.vendor_prefix = "Moz";
						}
						break;
					}
				}
			}
			else {
				var x, match;
				for(x in styles) {
					match = x.match(/^(Moz|webkit|ms|OLink)/);
					if(match) {
						Util.vendor_prefix = match[1];
						if(Util.vendor_prefix === "OLink") {
							Util.vendor_prefix = "O";
						}
						break;
					}
				}
			}
		}
	}
	return Util.vendor_prefix;
}
Util.Timer = u.t = new function() {
	this._timers = new Array();
	this.setTimer = function(node, action, timeout, param) {
		var id = this._timers.length;
		param = param != undefined ? param : {"target":node, "type":"timeout"};
		this._timers[id] = {"_a":action, "_n":node, "_p":param, "_t":setTimeout("u.t._executeTimer("+id+")", timeout)};
		return id;
	}
	this.resetTimer = function(id) {
		if(this._timers[id]) {
			clearTimeout(this._timers[id]._t);
			this._timers[id] = false;
		}
	}
	this._executeTimer = function(id) {
		var timer = this._timers[id];
		this._timers[id] = false;
		var node = timer._n;
		if(fun(timer._a)) {
			node._timer_action = timer._a;
			node._timer_action(timer._p);
			node._timer_action = null;
		}
		else if(fun(node[timer._a])) {
			node[timer._a](timer._p);
		}
	}
	this.setInterval = function(node, action, interval, param) {
		var id = this._timers.length;
		param = param ? param : {"target":node, "type":"timeout"};
		this._timers[id] = {"_a":action, "_n":node, "_p":param, "_i":setInterval("u.t._executeInterval("+id+")", interval)};
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
		if(fun(this._timers[id]._a)) {
			node._interval_action = this._timers[id]._a;
			node._interval_action(this._timers[id]._p);
			node._interval_action = null;
		}
		else if(fun(node[this._timers[id]._a])) {
			node[this._timers[id]._a](this._timers[id]._p);
		}
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
Util.History = u.h = new function() {
	this.popstate = ("onpopstate" in window);
	this.callbacks = [];
	this.is_listening = false;
	this.navigate = function(url, node, silent) {
		silent = silent || false;
		if((!url.match(/^http[s]?\:\/\//) || url.match(document.domain)) && (!node || !node._a || !node._a.target)) {
			if(this.popstate) {
				history.pushState({}, url, url);
				if(!silent) {
					this.callback(url);
				}
			}
			else {
				if(silent) {
					this.next_hash_is_silent = true;
				}
				location.hash = u.h.getCleanUrl(url);
			}
		}
		else {
			if(!node || !node._a || !node._a.target) {
				location.href = url;
			}
			else {
				window.open(this.url);
			}
		}
	}
	this.callback = function(url) {
		var i, recipient;
		for(i = 0; i < this.callbacks.length; i++) {
			recipient = this.callbacks[i];
			if(fun(recipient.node[recipient.callback])) {
				recipient.node[recipient.callback](url);
			}
		}
	}
	this.removeEvent = function(node, _options) {
		var callback_urlchange = "navigate";
		if(obj(_options)) {
			var argument;
			for(argument in _options) {
				switch(argument) {
					case "callback"		: callback_urlchange		= _options[argument]; break;
				}
			}
		}
		var i, recipient;
		for(i = 0; recipient = this.callbacks[i]; i++) {
			if(recipient.node == node && recipient.callback == callback_urlchange) {
				this.callbacks.splice(i, 1);
				break;
			}
		}
	}
	this.addEvent = function(node, _options) {
		var callback_urlchange = "navigate";
		if(obj(_options)) {
			var argument;
			for(argument in _options) {
				switch(argument) {
					case "callback"		: callback_urlchange		= _options[argument]; break;
				}
			}
		}
		if(!this.is_listening) {
			this.is_listening = true;
			if(this.popstate) {
				u.e.addEvent(window, "popstate", this._urlChanged);
			}
			else if("onhashchange" in window && !u.browser("explorer", "<=7")) {
				u.e.addEvent(window, "hashchange", this._hashChanged);
			}
			else {
				u.h._current_hash = window.location.hash;
				window.onhashchange = this._hashChanged;
				setInterval(
					function() {
						if(window.location.hash !== u.h._current_hash) {
							u.h._current_hash = window.location.hash;
							window.onhashchange();
						}
					}, 200
				);
			}
		}
		this.callbacks.push({"node":node, "callback":callback_urlchange});
	}
	this._urlChanged = function(event) {
		var url = u.h.getCleanUrl(location.href);
		if(event.state || (!event.state && event.path)) {
			u.h.callback(url);
		}
		else {
			history.replaceState({}, url, url);
		}
	}
	this._hashChanged = function(event) {
		if(!location.hash || !location.hash.match(/^#\//)) {
			location.hash = "#/"
			return;
		}
		var url = u.h.getCleanHash(location.hash);
		if(u.h.next_hash_is_silent) {
			delete u.h.next_hash_is_silent;
		}
		else {
			u.h.callback(url);
		}
	}
	this.trail = [];
	this.addToTrail = function(url, node) {
		this.trail.push({"url":url, "node":node});
	}
	this.getCleanUrl = function(string, levels) {
		string = string.replace(location.protocol+"//"+document.domain, "") ? string.replace(location.protocol+"//"+document.domain, "").match(/[^#$]+/)[0] : "/";
		if(!levels) {
			return string;
		}
		else {
			var i, return_string = "";
			var path = string.split("/");
			levels = levels > path.length-1 ? path.length-1 : levels;
			for(i = 1; i <= levels; i++) {
				return_string += "/" + path[i];
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
	this.resolveCurrentUrl = function() {
		return !location.hash ? this.getCleanUrl(location.href) : this.getCleanHash(location.hash);
	}
}
u.navigation = function(_options) {
	var navigation_node = page;
	var callback_navigate = "_navigate";
	var initialization_scope = page.cN;
	if(obj(_options)) {
		var argument;
		for(argument in _options) {
			switch(argument) {
				case "callback"       : callback_navigate           = _options[argument]; break;
				case "node"           : navigation_node             = _options[argument]; break;
				case "scope"          : initialization_scope        = _options[argument]; break;
			}
		}
	}
	window._man_nav_path = window._man_nav_path ? window._man_nav_path : u.h.getCleanUrl(location.href, 1);
	navigation_node._navigate = function(url) {
		var clean_url = u.h.getCleanUrl(url);
		u.stats.pageView(url);
		if(
			!window._man_nav_path || 
			(!u.h.popstate && window._man_nav_path != u.h.getCleanHash(location.hash, 1)) || 
			(u.h.popstate && window._man_nav_path != u.h.getCleanUrl(location.href, 1))
		) {
			if(this.cN && fun(this.cN.navigate)) {
				this.cN.navigate(clean_url, url);
			}
		}
		else {
			if(this.cN.scene && this.cN.scene.parentNode && fun(this.cN.scene.navigate)) {
				this.cN.scene.navigate(clean_url, url);
			}
			else if(this.cN && fun(this.cN.navigate)) {
				this.cN.navigate(clean_url, url);
			}
		}
		if(!u.h.popstate) {
			window._man_nav_path = u.h.getCleanHash(location.hash, 1);
		}
		else {
			window._man_nav_path = u.h.getCleanUrl(location.href, 1);
		}
	}
	if(location.hash.length && location.hash.match(/^#!/)) {
		location.hash = location.hash.replace(/!/, "");
	}
	var callback_after_init = false;
	if(!this.is_initialized) {
		this.is_initialized = true;
		if(!u.h.popstate) {
			if(location.hash.length < 2) {
				window._man_nav_path = u.h.getCleanUrl(location.href);
				u.h.navigate(window._man_nav_path);
			}
			else if(location.hash.match(/^#\//) && u.h.getCleanHash(location.hash) != u.h.getCleanUrl(location.href)) {
				callback_after_init = u.h.getCleanHash(location.hash);
			}
			else {
			}
		}
		else {
			if(u.h.getCleanHash(location.hash) != u.h.getCleanUrl(location.href) && location.hash.match(/^#\//)) {
				window._man_nav_path = u.h.getCleanHash(location.hash);
				u.h.navigate(window._man_nav_path);
				callback_after_init = window._man_nav_path;
			}
			else {
			}
		}
		var random_string = u.randomString(8);
		if(callback_after_init) {
			eval('navigation_node._initNavigation_'+random_string+' = function() {u.h.addEvent(this, {"callback":"'+callback_navigate+'"});u.h.callback("'+callback_after_init+'");}');
		}
		else {
			eval('navigation_node._initNavigation_'+random_string+' = function() {u.h.addEvent(this, {"callback":"'+callback_navigate+'"});}');
		}
		u.t.setTimer(navigation_node, "_initNavigation_"+random_string, 100);
	}
	else {
		u.h.callbacks.push({"node":navigation_node, "callback":callback_navigate});
	}
}
u.txt = function(index) {
	if(!u.translations) {
	}
	if(index == "assign") {
		u.bug("USING RESERVED INDEX: assign");
		return "";
	}
	if(u.txt[index]) {
		return u.txt[index];
	}
	u.bug("MISSING TEXT: "+index);
	return "";
}
u.txt["assign"] = function(obj) {
	for(x in obj) {
		u.txt[x] = obj[x];
	}
}
u.showScene = function(scene) {
	var i, node;
	var nodes = u.cn(scene);
	if(nodes.length) {
		var article = u.qs("div.article", scene);
		if(nodes[0] == article) {
			var article_nodes = u.cn(article);
			nodes.shift();
			for(x in nodes) {
				article_nodes.push(nodes[x]);
			}
			nodes = article_nodes;
		}
		var headline = u.qs("h1,h2", scene);
		for(i = 0; node = nodes[i]; i++) {
			u.ass(node, {
				"opacity":0,
			});
		}
		u.ass(scene, {
			"opacity":1,
		});
		u._stepA1.call(headline);
		for(i = 0; node = nodes[i]; i++) {
			u.a.transition(node, "all 0.2s ease-in "+((i*100)+200)+"ms");
			u.ass(node, {
				"opacity":1,
			});
		}
	}
	else {
		u.ass(scene, {
			"opacity":1,
		});
	}
}
u._stepA1 = function() {
	var svg_icon = u.qs("svg", this);
	if(svg_icon) {
		this.removeChild(svg_icon);
	}
	this.innerHTML = this.innerHTML.replace(/[ ]?<br[ \/]?>[ ]?/, " <br /> ");
	this.innerHTML = '<span class="word">'+this.innerHTML.split(" ").join('</span> <span class="word">')+'</span>'; 
	var word_spans = u.qsa("span.word", this);
	var i, span, letters, spanned_word;
	for(i = 0; span = word_spans[i]; i++) {
		if(span.innerHTML.match(/<br[ \/]?>/)) {
			span.parentNode.replaceChild(document.createElement("br"), span);
		}
		else {
			if(span.innerHTML.match(/&[a-zA-Z0-9#]+;/)) {
				letters = span.innerHTML.split("");
				span.innerHTML = "";
				for(j = 0; j < letters.length; j++) {
					if(letters[j] === "&") {
						spanned_word = letters[j];
						while(letters[++j] !== ";") {
							spanned_word += letters[j];
						}
						spanned_word += letters[j];
						span.innerHTML += "<span>" + spanned_word + "</span>";
					}
					else {
						span.innerHTML += "<span>" + letters[j] + "</span>";
					}
				}
			}
			else {
				span.innerHTML = "<span>"+span.innerHTML.split("").join("</span><span>")+"</span>";
			}
		}
	}
	this.spans = u.qsa("span:not(.word)", this);
	if(this.spans) {
		var i, span;
		for(i = 0; span = this.spans[i]; i++) {
			span.innerHTML = span.innerHTML.replace(/ /, "&nbsp;");
			u.ass(span, {
				"transformOrigin": "0 100% 0",
				"transform":"translate(0, 40px)",
				"opacity":0
			});
		}
		u.ass(this, {
			"opacity":1
		});
		for(i = 0; span = this.spans[i]; i++) {
			u.a.transition(span, "all 0.2s ease-in-out "+(15*u.random(0, 15))+"ms");
			u.ass(span, {
				"transform":"translate(0, 0)",
				"opacity":1
			});
			span.transitioned = function(event) {
				u.ass(this, {
					"transform":"none"
				});
			}
		}
	}
	if(svg_icon) {
		this.appendChild(svg_icon);
	}
}
u._stepA2 = function() {
	if(this.spans) {
		var i, span;
		for(i = 0; span = this.spans[i]; i++) {
			u.a.transition(span, "all 0.2s ease-in-out "+(15*u.random(0, 15))+"ms");
			u.ass(span, {
				"transform":"translate(0, -40px)",
				"opacity":0
			});
		}
	}
}
u.txt["share"] = "Share this page";
u.txt["share-info-headline"] = "(How do I share?)";
u.txt["share-info-txt"] = "We have not included social media plugins on this site, because they are frequently abused to collect data about you. Also we don't want to promote some channels over others. Instead, just copy the link and share it wherever you find relevant.";
u.txt["share-info-ok"] = "OK";
u.txt["readmore"] = "Read more ...";
u.txt["readstate-not_read"] = "Click to mark as read";
u.txt["readstate-read"] = "Read";
u.txt["add_comment"] = "Add comment";
u.txt["comment"] = "Comment";
u.txt["add_question"] = "Send question";
u.txt["question"] = "Ask a question. Try to be precise :-)";
u.txt["cancel"] = "Cancel";
u.txt["login_to_comment"] = '<a href="/login">Login</a> or <a href="/signup">Sign up</a> to add comments.';
u.txt["relogin"] = "Your session timed out - please login to continue.";
u.txt["terms-headline"] = "We love <br />cookies and privacy";
u.txt["terms-accept"] = "Accept";
u.txt["terms-details"] = "Details";
u.txt["smartphone-switch-headline"] = "Hello curious";
u.txt["smartphone-switch-text"] = [
	"If you are looking for a mobile version of this site, using an actual mobile phone is a better starting point.",
	"We care about our endusers and <em>one-size fits one device</em>, the parentNode way, provides an optimized user experience with a smaller footprint, because it doesn't come with all sizes included.",
	"But, since it is our mission to accommodate users, feel free to switch to the Smartphone segment and see if it serves your purpose better for the moment. We'll make sure to leave you with an option to return back to the Desktop segment.",
];
u.txt["smartphone-switch-bn-hide"] = "Hide";
u.txt["smartphone-switch-bn-switch"] = "Go to Smartphone version";
u.fontsReady = function(node, fonts, _options) {
	var callback_loaded = "fontsLoaded";
	var callback_timeout = "fontsNotLoaded";
	var max_time = 3000;
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "callback"					: callback_loaded		= _options[_argument]; break;
				case "timeout"					: callback_timeout		= _options[_argument]; break;
				case "max"						: max_time				= _options[_argument]; break;
			}
		}
	}
	window["_man_fonts_"] = window["_man_fonts_"] || {};
	window["_man_fonts_"].fontApi = document.fonts && fun(document.fonts.check) ? true : false;
	window["_man_fonts_"].fonts = window["_man_fonts_"].fonts || {};
	var font, node, i;
	if(typeof(fonts.length) == "undefined") {
		font = fonts;
		fonts = new Array();
		fonts.push(font);
	}
	var loadkey = u.randomString(8);
	if(window["_man_fonts_"].fontApi) {
		window["_man_fonts_"+loadkey] = {};
	}
	else {
		window["_man_fonts_"+loadkey] = u.ae(document.body, "div");
		window["_man_fonts_"+loadkey].basenodes = {};
	}
	window["_man_fonts_"+loadkey].nodes = [];
	window["_man_fonts_"+loadkey].t_timeout = u.t.setTimer(window["_man_fonts_"+loadkey], "fontCheckTimeout", max_time);
	window["_man_fonts_"+loadkey].loadkey = loadkey;
	window["_man_fonts_"+loadkey].callback_node = node;
	window["_man_fonts_"+loadkey].callback_loaded = callback_loaded;
	window["_man_fonts_"+loadkey].callback_timeout = callback_timeout;
	for(i = 0; i < fonts.length; i++) {
		font = fonts[i];
		font.style = font.style || "normal";
		font.weight = font.weight || "400";
		font.size = font.size || "16px";
		font.status = "waiting";
		font.id = u.superNormalize(font.family+font.style+font.weight);
		if(!window["_man_fonts_"].fonts[font.id]) {
			window["_man_fonts_"].fonts[font.id] = font;
		}
		if(window["_man_fonts_"].fontApi) {
			node = {};
		}
		else {
			if(!window["_man_fonts_"+loadkey].basenodes[u.superNormalize(font.style+font.weight)]) {
				window["_man_fonts_"+loadkey].basenodes[u.superNormalize(font.style+font.weight)] = u.ae(window["_man_fonts_"+loadkey], "span", {"html":"I'm waiting for your fonts to load!","style":"font-family: Times !important; font-style: "+font.style+" !important; font-weight: "+font.weight+" !important; font-size: "+font.size+" !important; line-height: 1em !important; opacity: 0 !important;"});
			}
			node = u.ae(window["_man_fonts_"+loadkey], "span", {"html":"I'm waiting for your fonts to load!","style":"font-family: '"+font.family+"', Times !important; font-style: "+font.style+" !important; font-weight: "+font.weight+" !important; font-size: "+font.size+" !important; line-height: 1em !important; opacity: 0 !important;"});
		}
		node.font_size = font.size;
		node.font_family = font.family;
		node.font_weight = font.weight;
		node.font_style = font.style;
		node.font_id = font.id;
		node.loadkey = loadkey;
		window["_man_fonts_"+loadkey].nodes.push(node);
	}
	window["_man_fonts_"+loadkey].checkFontsAPI = function() {
		var i, node, font_string;
		for(i = 0; i < this.nodes.length; i++) {
			node = this.nodes[i];
			if(window["_man_fonts_"].fonts[node.font_id] && window["_man_fonts_"].fonts[node.font_id].status == "waiting") {
				font_string = node.font_style + " " + node.font_weight + " " + node.font_size + " " + node.font_family;
				document.fonts.load(font_string).then(function(fontFaceSetEvent) {
					if(fontFaceSetEvent && fontFaceSetEvent.length && fontFaceSetEvent[0].status == "loaded") {
						window["_man_fonts_"].fonts[this.font_id].status = "loaded";
					}
					else {
						window["_man_fonts_"].fonts[this.font_id].status = "failed";
					}
					if(window["_man_fonts_"+this.loadkey] && fun(window["_man_fonts_"+this.loadkey].checkFontsStatus)) {
						window["_man_fonts_"+this.loadkey].checkFontsStatus();
					}
				}.bind(node));
			}
		}
		if(fun(this.checkFontsStatus)) {
			this.checkFontsStatus();
		}
	}
	window["_man_fonts_"+loadkey].checkFontsFallback = function() {
		var basenode, i, node;
		for(i = 0; i < this.nodes.length; i++) {
			node = this.nodes[i];
			basenode = this.basenodes[u.superNormalize(node.font_style+node.font_weight)];
			if(node.offsetWidth != basenode.offsetWidth || node.offsetHeight != basenode.offsetHeight) {
				window["_man_fonts_"].fonts[node.font_id].status = "loaded";
			}
		}
		this.t_fallback = u.t.setTimer(this, "checkFontsFallback", 30);
		if(fun(this.checkFontsStatus)) {
			this.checkFontsStatus();
		}
	}
	window["_man_fonts_"+loadkey].fontCheckTimeout = function(event) {
		u.t.resetTimer(this.t_fallback);
		delete window["_man_fonts_"+this.loadkey];
		if(this.parentNode) {
			this.parentNode.removeChild(this);
		}
		if(fun(this.callback_node[this.callback_timeout])) {
			this.callback_node[this.callback_timeout](this.nodes);
		}
		else if(fun(this.callback_node[this.callback_loaded])) {
			this.callback_node[this.callback_loaded](this.nodes);
		}
	}
	window["_man_fonts_"+loadkey].checkFontsStatus = function(event) {
		var i, node;
		for(i = 0; i < this.nodes.length; i++) {
			node = this.nodes[i];
			if(window["_man_fonts_"].fonts[node.font_id].status == "waiting") {
				return;
			}
		}
		u.t.resetTimer(this.t_timeout);
		u.t.resetTimer(this.t_fallback);
		delete window["_man_fonts_"+this.loadkey];
		if(this.parentNode) {
			this.parentNode.removeChild(this);
		}
		if(fun(this.callback_node[this.callback_loaded])) {
			if(this.fontApi) {
				this.callback_node[this.callback_loaded](this.nodes);
			}
			else {
				setTimeout(function() {
					this.callback_node[this.callback_loaded](this.nodes); 
				}.bind(this), 250);
			}
		}
	}
	if(window["_man_fonts_"].fontApi) {
		window["_man_fonts_"+loadkey].checkFontsAPI();
	}
	else {
		window["_man_fonts_"+loadkey].checkFontsFallback();
	}
}
u.notifier = function(node) {
	var notifications = u.qs("div.notifications", node);
	if(!notifications) {
		node.notifications = u.ae(node, "div", {"id":"notifications"});
	}
	node.notifications.hide_delay = 4500;
	node.notifications.hide = function(node) {
		u.a.transition(this, "all 0.5s ease-in-out");
		u.a.translate(this, 0, -this.offsetHeight);
	}
	node.notify = function(response, _options) {
		var class_name = "message";
		if(obj(_options)) {
			var argument;
			for(argument in _options) {
				switch(argument) {
					case "class"	: class_name	= _options[argument]; break;
				}
			}
		}
		var output = [];
		if(obj(response) && response.isJSON) {
			var message = response.cms_message;
			var cms_status = typeof(response.cms_status) != "undefined" ? response.cms_status : "";
			if(obj(message)) {
				for(type in message) {
					if(str(message[type])) {
						output.push(u.ae(this.notifications, "div", {"class":class_name+" "+cms_status+" "+type, "html":message[type]}));
					}
					else if(obj(message[type]) && message[type].length) {
						var node, i;
						for(i = 0; i < message[type].length; i++) {
							_message = message[type][i];
							output.push(u.ae(this.notifications, "div", {"class":class_name+" "+cms_status+" "+type, "html":_message}));
						}
					}
				}
			}
			else if(str(message)) {
				output.push(u.ae(this.notifications, "div", {"class":class_name+" "+cms_status, "html":message}));
			}
			if(fun(this.notifications.show)) {
				this.notifications.show();
			}
		}
		else if(obj(response) && response.isHTML) {
			var login = u.qs(".scene.login form", response);
			var messages = u.qsa(".scene div.messages p", response);
			if(login && !u.qs("#login_overlay")) {
				this.autosave_disabled = true;
				if(page.t_autosave) {
					u.t.resetTimer(page.t_autosave);
				}
				var overlay = u.ae(document.body, "div", {"id":"login_overlay"});
				overlay.node = this;
				u.ae(overlay, login);
				u.as(document.body, "overflow", "hidden");
				var relogin = u.ie(login, "h1", {"class":"relogin", "html":(u.txt["relogin"] ? u.txt["relogin"] : "Your session expired")});
				login.overlay = overlay;
				u.ae(login, "input", {"type":"hidden", "name":"ajaxlogin", "value":"true"})
				u.f.init(login);
				login.inputs["username"].focus();
				login.submitted = function() {
					this.response = function(response) {
						if(response.isJSON && response.cms_status == "success") {
							var csrf_token = response.cms_object["csrf-token"];
							var data_vars = u.qsa("[data-csrf-token]", page);
							var input_vars = u.qsa("[name=csrf-token]", page);
							var dom_vars = u.qsa("*", page);
							var i, node;
							for(i = 0; i < data_vars.length; i++) {
								node = data_vars[i];
								node.setAttribute("data-csrf-token", csrf_token);
							}
							for(i = 0; i < input_vars.length; i++) {
								node = input_vars[i];
								node.value = csrf_token;
							}
							for(i = 0; i < dom_vars.length; i++) {
								node = dom_vars[i];
								if(node.csrf_token) {
									node.csrf_token = csrf_token;
								}
							}
							this.overlay.parentNode.removeChild(this.overlay);
							var multiple_overlays = u.qsa("#login_overlay");
							if(multiple_overlays) {
								for(i = 0; i < multiple_overlays.length; i++) {
									overlay = multiple_overlays[i];
									overlay.parentNode.removeChild(overlay);
								}
							}
							u.as(document.body, "overflow", "auto");
							this.overlay.node.autosave_disabled = false;
							if(this.overlay.node._autosave_node && this.overlay.node._autosave_interval) {
								u.t.setTimer(this.overlay.node._autosave_node, "autosave", this.overlay.node._autosave_interval);
							}
						}
						else {
							this.inputs["username"].focus();
							this.inputs["password"].val("");
							var error_message = u.qs(".errormessage", response);
							if(error_message) {
								this.overlay.node.notify({"isJSON":true, "cms_status":"error", "cms_message":error_message.innerHTML});
							}
							else {
								this.overlay.node.notify({"isJSON":true, "cms_status":"error", "cms_message":"An error occured"});
							}
						}
					}
					u.request(this, this.action, {"method":this.method, "data":this.getData()});
				}
			}
			else if(messages) {
				for(i = 0; i < messages.length; i++) {
					message = messages[i];
					output.push(u.ae(this.notifications, "div", {"class":message.className, "html":message.innerHTML}));
				}
			}
		}
		this.t_notifier = u.t.setTimer(this.notifications, this.notifications.hide, this.notifications.hide_delay, output);
	}
}
u.smartphoneSwitch = new function() {
	this.state = 0;
	this.init = function(node) {
		this.callback_node = node;
		this.event_id = u.e.addWindowEvent(this, "resize", this.resized);
		this.resized();
	}
	this.resized = function() {
		if(u.browserW() < 520 && !this.state) {
			this.switchOn();
		}
		else if(u.browserW() > 520 && this.state) {
			this.switchOff();
		}
	}
	this.switchOn = function() {
		if(!this.panel) {
			this.state = true;
			this.panel = u.ae(document.body, "div", {"id":"smartphone_switch"});
			u.ass(this.panel, {
				opacity: 0
			});
			u.ae(this.panel, "h1", {html:u.stringOr(u.txt("smartphone-switch-headline"), "Hello curious")});
			if(u.txt("smartphone-switch-text").length) {
				for(i = 0; i < u.txt("smartphone-switch-text").length; i++) {
					u.ae(this.panel, "p", {html:u.txt("smartphone-switch-text")[i]});
				}
			}
			var ul_actions = u.ae(this.panel, "ul", {class:"actions"});
			var li; 
			li = u.ae(ul_actions, "li", {class:"hide"});
			var bn_hide = u.ae(li, "a", {class:"hide button", html:u.txt("smartphone-switch-bn-hide")});
			li = u.ae(ul_actions, "li", {class:"switch"});
			var bn_switch = u.ae(li, "a", {class:"switch button primary", html:u.txt("smartphone-switch-bn-switch")});
			u.e.click(bn_switch);
			bn_switch.clicked = function() {
				u.saveCookie("smartphoneSwitch", "on");
				location.href = location.href.replace(/[&]segment\=desktop|segment\=desktop[&]?/, "") + (location.href.match(/\?/) ? "&" : "?") + "segment=smartphone";
			}
			u.e.click(bn_hide);
			bn_hide.clicked = function() {
				u.e.removeWindowEvent(u.smartphoneSwitch.event_id);
				u.smartphoneSwitch.switchOff();
			}
			u.a.transition(this.panel, "all 0.5s ease-in-out");
			u.ass(this.panel, {
				opacity: 1
			});
			if(this.callback_node && typeof(this.callback_node.smartphoneSwitchedOn) == "function") {
				this.callback_node.smartphoneSwitchedOn();
			}
		}
	}
	this.switchOff = function() {
		if(this.panel) {
			this.state = false;
			this.panel.transitioned = function() {
				this.parentNode.removeChild(this);
				delete u.smartphoneSwitch.panel;
			}
			u.a.transition(this.panel, "all 0.5s ease-in-out");
			u.ass(this.panel, {
				opacity: 0
			});
			if(this.callback_node && typeof(this.callback_node.smartphoneSwitchedOff) == "function") {
				this.callback_node.smartphoneSwitchedOff();
			}
		}
	}
}
Util.Modules["page"] = new function() {
	this.init = function(page) {
		u.bug_force = true;
		u.bug("This site is built using the combined powers of body, mind and spirit. Well, and also Manipulator, Janitor and Detector");
		if(document.domain !== "parentnode.dk") {
			u.bug("Visit https://parentnode.dk for more information");
		}
		u.bug_force = false;
		page.style_tag = document.createElement("style");
		page.style_tag.setAttribute("media", "all");
		page.style_tag.setAttribute("type", "text/css");
		page.style_tag = u.ae(document.head, page.style_tag);
		page.hN = u.qs("#header");
		page.hN.service = u.qs("ul.servicenavigation", page.hN);
		page.cN = u.qs("#content", page);
		page.nN = u.qs("#navigation", page);
		page.nN = u.ie(page.hN, page.nN);
		page.fN = u.qs("#footer");
		page.fN.service = u.qs("ul.servicenavigation", page.fN);
		page.resized = function(event) {
			page.browser_h = u.browserH();
			page.browser_w = u.browserW();
			page.available_height = page.browser_h - page.hN.offsetHeight - page.fN.offsetHeight;
			u.as(page.cN, "min-height", "auto", false);
			if(page.available_height >= page.cN.offsetHeight) {
				u.as(page.cN, "min-height", page.available_height+"px", false);
			}
			if(page.browser_w > 1080) {
				u.ac(page, "fixed");
			}
			else {
				u.rc(page, "fixed");
			}
			if(page.cN && page.cN.scene && typeof(page.cN.scene.resized) == "function") {
				page.cN.scene.resized(event);
			}
			page.offsetHeight;
		}
		page.scrolled = function(event) {
			this.scrolled_y = u.scrollY();
			if(fun(u.logoScroller)) {
				u.logoScroller();
			}
			else {
				if(this.scrolled_y < this.logo.top_offset) {
					this.logo.is_reduced = false;
					var reduce_font = (1-(this.logo.top_offset-this.scrolled_y)/this.logo.top_offset) * this.logo.font_size_gap;
					this.logo.css_rule.style.setProperty("font-size", (this.logo.font_size-reduce_font)+"px", "important");
				}
				else if(!this.logo.is_reduced) {
					this.logo.is_reduced = true;
					this.logo.css_rule.style.setProperty("font-size", (this.logo.font_size-this.logo.font_size_gap)+"px", "important");
				}
			}
			if(this.nN.top_offset && this.scrolled_y < this.nN.top_offset) {
				this.nN.is_reduced = false;
				var factor = (1-(this.nN.top_offset-this.scrolled_y)/this.nN.top_offset);
				var reduce_font = factor * this.nN.font_size_gap;
				this.nN.list.css_rule.style.setProperty("font-size", (this.nN.font_size-reduce_font)+"px", "important");
				var reduce_top = factor * this.nN.top_offset_gap;
				this.nN.css_rule.style.setProperty("top", (this.nN.top_offset-reduce_top)+"px", "important");
			}
			else if(this.nN.top_offset && !this.nN.is_reduced) {
				this.nN.is_reduced = true;
				this.nN.list.css_rule.style.setProperty("font-size", (this.nN.font_size-this.nN.font_size_gap)+"px", "important");
				this.nN.css_rule.style.setProperty("top", (this.nN.top_offset-this.nN.top_offset_gap)+"px", "important");
			}
			if(this.cN && this.cN.scene && typeof(this.cN.scene.scrolled) == "function") {
				this.cN.scene.scrolled(event);
			}
		}
		page.preload = function() {
			if(fun(u.pagePreloader)) {
				u.pagePreloader();
			}
			else {
				u.fontsReady(this, [
					{"family":"OpenSans", "weight":"normal", "style":"normal"},
					{"family":"OpenSans", "weight":"bold", "style":"normal"},
					{"family":"OpenSans", "weight":"normal", "style":"italic"},
					{"family":"PT Serif", "weight":"normal", "style":"normal"}
				], {"callback": "ready"});
			}
		}
		page.ready = function() {
			if(!this.is_ready) {
				this.is_ready = true;
				u.e.addWindowEvent(this, "resize", this.resized);
				u.e.addWindowEvent(this, "scroll", this.scrolled);
				if(fun(u.notifier)) {
					u.notifier(this);
				}
				if(obj(u.smartphoneSwitch)) {
					u.smartphoneSwitch.init(this);
				}
				if(fun(u.navigation)) {
					u.navigation();
				}
				this.initHeader();
				this.initNavigation();
				this.initFooter();
				this.resized();
				this.scrolled();
				if(!fun(this.cN.scene.revealPage)) {
					this.revealPage();
				}
				this.cN.scene.ready();
			}
		}
		page.cN.navigate = function(url, raw_url) {
			if(raw_url) {
				location.reload(true);
			}
			else {
				location.href = url;
			}
		}
		page.acceptCookies = function() {
			if(u.terms_version && !u.getCookie(u.terms_version)) {
				var terms_link = u.qs("li.terms a");
				if(terms_link && terms_link.href) {
					var terms = u.ie(document.body, "div", {"class":"terms_notification"});
					u.ae(terms, "h3", {"html":u.stringOr(u.txt["terms-headline"], "We love <br />cookies and privacy")});
					var bn_accept = u.ae(terms, "a", {"class":"accept", "html":u.stringOr(u.txt["terms-accept"], "Accept")});
					bn_accept.terms = terms;
					u.ce(bn_accept);
					bn_accept.clicked = function() {
						this.terms.parentNode.removeChild(this.terms);
						u.saveCookie(u.terms_version, true, {"path":"/", "expires":false});
					}
					if(!location.href.match(terms_link.href)) {
						var bn_details = u.ae(terms, "a", {"class":"details", "html":u.stringOr(u.txt["terms-details"], "Details"), "href":terms_link.href});
						u.ce(bn_details, {"type":"link"});
					}
					u.a.transition(terms, "all 0.5s ease-in");
					u.ass(terms, {
						"opacity": 1
					});
				}
			}
		}
		page.initHeader = function() {
			page.logo = u.ie(page.hN, "a", {"class":"logo", "html":u.eitherOr(u.site_name, "Frontpage")});
			page.logo.url = '/';
			page.logo.font_size = parseInt(u.gcs(page.logo, "font-size"));
			page.logo.font_size_gap = page.logo.font_size-14;
			page.logo.top_offset = u.absY(page.nN) + parseInt(u.gcs(page.nN, "padding-top"));
			page.style_tag.sheet.insertRule("#header a.logo {}", 0);
			page.logo.css_rule = page.style_tag.sheet.cssRules[0];
		}
		page.initNavigation = function() {
			var i, node, nodes;
			page.nN.list = u.qs("ul", page.nN);
			if(page.nN.list) {
				page.nN.list.nodes = u.qsa("li", page.nN.list);
				if(page.nN.list.nodes.length > 1) {
					page.nN.font_size = parseInt(u.gcs(page.nN.list.nodes[1], "font-size"));
					page.nN.font_size_gap = page.nN.font_size-14;
					page.nN.top_offset = u.absY(page.nN) + parseInt(u.gcs(page.nN, "padding-top"));
					page.nN.top_offset_gap = page.nN.top_offset-10;
					page.style_tag.sheet.insertRule("#navigation {}", 0);
					page.nN.css_rule = page.style_tag.sheet.cssRules[0];
					page.style_tag.sheet.insertRule("#navigation ul li {}", 0);
					page.nN.list.css_rule = page.style_tag.sheet.cssRules[0];
				}
			}
			nodes = u.qsa("#navigation li,a.logo", page.hN);
			for(i = 0; node = nodes[i]; i++) {
				u.ce(node, {"type":"link"});
				u.e.hover(node);
				node.over = function() {
					u.a.transition(this, "none");
					this.transitioned = function() {
						this.transitioned = function() {
							this.transitioned = function() {
								u.a.transition(this, "none");
							}
							u.a.transition(this, "all 0.1s ease-in-out");
							u.a.scale(this, 1.2);
						}
						u.a.transition(this, "all 0.1s ease-in-out");
						u.a.scale(this, 1.15);
					}
					if(this._scale != 1.22) {
						u.a.transition(this, "all 0.1s ease-in-out");
						u.a.scale(this, 1.22);
					}
					else {
						this.transitioned();
					}
				}
				node.out = function() {
					u.a.transition(this, "none");
					this.transitioned = function() {
						this.transitioned = function() {
							u.a.transition(this, "none");
						}
						u.a.transition(this, "all 0.1s ease-in");
						u.a.scale(this, 1);
					}
					if(this._scale != 0.8) {
						u.a.transition(this, "all 0.1s ease-in");
						u.a.scale(this, 0.8);
					}
					else {
						this.transitioned();
					}
				}
			}
			if(page.hN.service) {
				var nav_anchor = u.qs("li.navigation", page.hN.service);
				if(nav_anchor) {
					page.hN.service.removeChild(nav_anchor);
				}
			}
			if(page.fN.service) {
				nodes = u.qsa("li", page.fN.service);
				for(i = 0; node = nodes[i]; i++) {
					u.ie(page.hN.service, node);
				}
				page.fN.removeChild(page.fN.service);
			}
			if(u.github_fork) {
				var github = u.ae(page.hN.service, "li", {"html":'<a href="'+u.github_fork.url+'">'+u.github_fork.text+'</a>', "class":"github"});
				u.ce(github, {"type":"link"});
			}
			if(fun(u.logoInjected)) {
				u.logoInjected();
			}
		}
		page.initFooter = function() {}
		page.revealPage = function() {
			u.a.transition(page.hN, "all 0.3s ease-in");
			u.ass(page.hN, {
				"opacity":1
			});
			u.a.transition(page.nN, "all 0.3s ease-in");
			u.ass(page.nN, {
				"opacity":1
			});
			u.a.transition(page.fN, "all 0.3s ease-in");
			u.ass(page.fN, {
				"opacity":1
			});
			this.acceptCookies();
		}
		page.preload();
	}
}
u.e.addDOMReadyEvent(u.init);
Util.Modules["login"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			this._form = u.qs("form", this);
			u.f.init(this._form);
			this._form.inputs["username"].focus();
			u.showScene(this);
		}
		page.cN.scene = scene;
	}
}
Util.Modules["scene"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
			this.offsetHeight;
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			u.showScene(this);
		}
		page.cN.scene = scene;
	}
}
Util.Modules["article"] = new function() {
	this.init = function(article) {
		article.csrf_token = article.getAttribute("data-csrf-token");
		article.header = u.qs("h1,h2,h3", article);
		article.header.article = article;
		var i, image;
		article._images = u.qsa("div.image,div.media", article);
		for(i = 0; image = article._images[i]; i++) {
			image.node = article;
			image.caption = u.qs("p a", image);
			if(image.caption) {
				image.caption.removeAttribute("href");
			}
			image._id = u.cv(image, "item_id");
			image._format = u.cv(image, "format");
			image._variant = u.cv(image, "variant");
			if(image._id && image._format) {
				image._image_src = "/images/" + image._id + "/" + (image._variant ? image._variant+"/" : "") + "540x." + image._format;
				u.ass(image, {
					"opacity": 0
				});
				image.loaded = function(queue) {
					u.ac(this, "loaded");
					this._image = u.ie(this, "img");
					this._image.image = this;
					this._image.src = queue[0].image.src;
					if(this.node.article_list) {
						this.node.article_list.correctScroll(this);
					}
					u.ce(this._image);
					this._image.clicked = function() {
						if(u.hc(this.image, "fullsize")) {
							u.a.transition(this, "all 0.3s ease-in-out");
							u.rc(this.image, "fullsize");
							u.ass(this, {
								width: "540px"
							});
							this.src = this.image._image_src;
						}
						else {
							u.a.transition(this, "all 0.3s ease-in-out");
							u.ac(this.image, "fullsize");
							u.ass(this, {
								width: (page.browser_w < 1080 ? page.browser_w : 1080) + "px"
							});
							if(this._fullsize_src) {
								u.bug("this._fullsize_src:", this._fullsize_src);
								this.src = this._fullsize_src;
							}
							else {
								this._fullsize_width = 1080;
								this._fullsize_src = "/images/" + this.image._id + "/" + (this.image._variant ? this.image._variant+"/" : "") + this._fullsize_width + "x." + this.image._format;
								this.response = function() {
									this.src = this._fullsize_src;
								}
								this.responseError = function() {
									u.bug("error")
									this._fullsize_width = this._fullsize_width-200;
									this._fullsize_src = "/images/" + this.image._id + "/" + (this.image._variant ? this.image._variant+"/" : "") + this._fullsize_width + "x." + this.image._format;
									u.request(this, this._fullsize_src);
								}
								u.request(this, this._fullsize_src);
							}
						}
					}
					u.a.transition(this, "all 0.5s ease-in-out");
					u.ass(this, {
						"opacity": 1
					});
				}
				u.preloader(image, [image._image_src]);
			}
		}
		var video;
		article._videos = u.qsa("div.youtube, div.vimeo", article);
		for (i = 0; video = article._videos[i]; i++) {
			video._src = u.cv(video, "video_id");
			video._type = video._src.match(/youtube|youtu\.be/) ? "youtube" : "vimeo";
			if (video._type == "youtube") {
				video._id = video._src.match(/watch\?v\=/) ? video._src.split("?v=")[1] : video._src.split("/")[video._src.split("/").length-1];
				video.iframe = u.ae(video, "iframe", {
					id: "ytplayer",
					type: "text/html",
					webkitallowfullscreen: true,
					mozallowfullscreen: true,
					allowfullscreen: true,
					frameborder: 0,
					allow: "autoplay",
					sandbox:"allow-same-origin allow-scripts",
					width: "100%",
					height: 540 / 1.7777,
					src: 'https://www.youtube.com/embed/'+video._id+'?autoplay=false&loop=0&color=f0f0ee&modestbranding=1&rel=0&playsinline=1',
				});
			}
			else {
				video._id = video._src.split("/")[video._src.split("/").length-1];
				video.iframe = u.ae(video, "iframe", {
					webkitallowfullscreen: true,
					mozallowfullscreen: true,
					allowfullscreen: true,
					frameborder: 0,
					sandbox:"allow-same-origin allow-scripts",
					width: "100%",
					height: 540 / 1.7777,
					src: 'https://player.vimeo.com/video/'+video._id+'?autoplay=false&loop=0&byline=0&portrait=0',
				});
			}
		}
		article.geolocation = u.qs("ul.geo", article);
		if(article.geolocation && typeof(u.injectGeolocation) == "function") {
			u.injectGeolocation(article);
		}
		var hardlink = u.qs("li.main_entity.share", article);
		article.hardlink = hardlink ? (hardlink.hasAttribute("content") ? hardlink.getAttribute("content") : hardlink.innerHTML) : false;
		if(article.hardlink && typeof(u.injectSharing) == "function") {
			article.shareInjected = function() {
				if(this.article_list) {
					this.article_list.correctScroll(this, this.sharing);
				}
			}
			u.injectSharing(article);
		}
		article.header.current_readstate = article.getAttribute("data-readstate");
		article.add_readstate_url = article.getAttribute("data-readstate-add");
		article.delete_readstate_url = article.getAttribute("data-readstate-delete");
		if(article.header.current_readstate || (article.add_readstate_url && article.delete_readstate_url)) {
			u.addCheckmark(article.header);
			u.ce(article.header.checkmark);
			article.header.checkmark.clicked = function(event) {
				this.out(event);
				if(this.node.current_readstate) {
					this.response = function(response) {
						if(response.cms_status == "success" && response.cms_object) {
							this.setAttribute("class", "checkmark not_read");
							this.node.current_readstate = false;
							this.node.article.setAttribute("data-readstate", "");
							this.hint_txt = u.txt["readstate-not_read"];
						}
					}
					u.request(this, this.node.article.delete_readstate_url, {"method":"post", "params":"csrf-token="+this.node.article.csrf_token+"&item_id"});
				}
				else {
					this.response = function(response) {
						if(response.cms_status == "success" && response.cms_object) {
							this.setAttribute("class", "checkmark read");
							this.node.current_readstate = new Date();
							this.node.article.setAttribute("data-readstate", this.node.current_readstate);
							this.hint_txt = u.txt["readstate-read"] + ", " + u.date("Y-m-d H:i:s", this.node.current_readstate);
						}
					}
					u.request(this, this.node.article.add_readstate_url, {"method":"post", "params":"csrf-token="+this.node.article.csrf_token});
				}
			}
		}
	}
}
u.injectGeolocation = function(node) {
	if(!u.browser("IE", "<=9")) {
		node.geolocation.node = node;
		var li_longitude = u.qs("li.longitude", node.geolocation);
		var li_latitude = u.qs("li.latitude", node.geolocation);
		if(li_longitude && li_latitude) {
			node.geo_longitude = parseFloat(li_longitude.getAttribute("content"));
			node.geo_latitude = parseFloat(li_latitude.getAttribute("content"));
			node.showMap = function() {
				if(!this.geomap) {
					this.geomap = u.ae(this, "div", {"class":"geomap"});
					this.insertBefore(this.geomap, u.qs("ul.info", this));
					var maps_url = "https://maps.googleapis.com/maps/api/js" + (u.gapi_key ? "?key="+u.gapi_key : "");
					var html = '<html><head>';
					html += '<style type="text/css">body {margin: 0;}#map {height: 300px;}</style>';
					html += '<script type="text/javascript" src="'+maps_url+'"></script>';
					html += '<script type="text/javascript">';
					html += 'var map, marker;';
					html += 'var initialize = function() {';
					html += '	window._map_loaded = true;';
					html += '	var mapOptions = {center: new google.maps.LatLng('+this.geo_latitude+', '+this.geo_longitude+'),zoom: 12};';
					html += '	map = new google.maps.Map(document.getElementById("map"),mapOptions);';
					html += '	marker = new google.maps.Marker({position: new google.maps.LatLng('+this.geo_latitude+', '+this.geo_longitude+'), draggable:true});';
					html += '	marker.setMap(map);';
					html += '};';
					html += 'google.maps.event.addDomListener(window, "load", initialize);';
					html += '</script>';
					html += '</head><body><div id="map"></div></body></html>';
					this.mapsiframe = u.ae(this.geomap, "iframe");
					this.mapsiframe.doc = this.mapsiframe.contentDocument? this.mapsiframe.contentDocument: this.mapsiframe.contentWindow.document;
					this.mapsiframe.doc.open();
					this.mapsiframe.doc.write(html);
					this.mapsiframe.doc.close();
				}
			}
			node.geolocation.clicked = function() {
				this.node.showMap();
			}
			u.ce(node.geolocation);
			u.ac(node.geolocation, "active");
		}
	}
}
u.addCheckmark = function(node) {
	node.checkmark = u.svg({
		"name":"checkmark",
		"node":node,
		"class":"checkmark "+(node.current_readstate ? "read" : "not_read"),
		"width":17,
		"height":17,
		"shapes":[
			{
				"type": "line",
				"x1": 2,
				"y1": 8,
				"x2": 7,
				"y2": 15
			},
			{
				"type": "line",
				"x1": 6,
				"y1": 15,
				"x2": 12,
				"y2": 2
			}
		]
	});
	node.checkmark.hint_txt = (node.current_readstate ? (u.txt["readstate-read"] + ", " + u.date("Y-m-d H:i:s", node.current_readstate)) : u.txt["readstate-not_read"]),
	node.checkmark.node = node;
	u.e.hover(node.checkmark);
	node.checkmark.over = function(event) {
		this.hint = u.ae(document.body, "div", {"class":"hint", "html":this.hint_txt});
		u.ass(this.hint, {
			"top":(u.absY(this.parentNode)+parseInt(u.gcs(this, "top"))+(Number(this.getAttribute("height")))) + "px",
			"left":(u.absX(this.parentNode)+parseInt(u.gcs(this, "left"))+Number(this.getAttribute("width"))) + "px"
		});
	}
	node.checkmark.out = function(event) {
		if(this.hint) {
			this.hint.parentNode.removeChild(this.hint);
			delete this.hint;
		}
	}
}
u.removeCheckmark = function(node) {
	if(node.checkmark.hint) {
		node.checkmark.hint.parentNode.removeChild(node.checkmark.hint);
	}
	if(node.checkmark) {
		node.checkmark.parentNode.removeChild(node.checkmark);
		node.checkmark = false;
	}
}


/*u-settings.js*/
u.site_name = "parentNode";
u.terms_version = "terms_v1";
u.github_fork = {"url":"https://github.com/parentnode", "text":"parentNode on GitHub"};
u.ga_account = 'G-10DCX2DD2C';
u.ga_domain = 'parentnode.dk';


/*u-googleanalytics.js*/
u.includeGoogleAnalytics = function() {
	if(typeof(gtag) !== "function") {
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', u.ga_account);
		var script = document.createElement("script");
		script.src = "https://www.googletagmanager.com/gtag/js?id="+u.ga_account;
		script.async = true;
		document.head.appendChild(script);
		u.stats = new function() {
			this.pageView = function(url) {
			}
			this.event = function(node, _options) {
				var event = false;
				var eventCategory = "Uncategorized";
				var eventAction = null;
				var eventLabel = null;
				var eventValue = null;
				var nonInteraction = false;
				var hitCallback = null;
				if(obj(_options)) {
					var _argument;
					for(_argument in _options) {
						switch(_argument) {
							case "event"				: event					= _options[_argument]; break;
							case "eventCategory"		: eventCategory			= _options[_argument]; break;
							case "eventAction"			: eventAction			= _options[_argument]; break;
							case "eventLabel"			: eventLabel			= _options[_argument]; break;
							case "eventValue"			: eventValue			= _options[_argument]; break;
							case "nonInteraction"		: nonInteraction		= _options[_argument]; break;
							case "hitCallback"			: hitCallback			= _options[_argument]; break;
						}
					}
				}
				if(!eventAction && event && event.type) {
					eventAction = event.type;
				}
				else if(!eventAction && event) {
					eventAction = event;
				}
 				else if(!eventAction) {
					eventAction = "Unknown";
				}
				if(!eventLabel && event && event.currentTarget && event.currentTarget.url) {
					eventLabel = event.currentTarget.url;
				}
				else if(!eventLabel) {
					eventLabel = this.nodeSnippet(node);
				}
				gtag({
					"event": eventAction, 
					"eventCategory": eventCategory, 
					"eventAction": eventAction,
					"eventLabel": eventLabel,
					"eventValue": eventValue,
				});
			}
			this.nodeSnippet = function(node) {
				if(node.id) {
					return node.id;
				}
				else if(node._a && node._a.id) {
					return node._a.id;
				}
				else if(u.text(node)) {
					return u.cutString(u.text(node).trim(), 20);
				}
				else if(event && event.currentTarget && event.currentTarget.url) {
					return event.currentTarget.url;
				}
				else {
					return node.nodeName + (node.className ? "."+node.className : "");
				}
			}
		}
	}
}
if(u.ga_account && !u.cookies_disallowed) {
	u.includeGoogleAnalytics();
}


/*u-basics.js*/
u.pagePreloader = function() {
	u.fontsReady(page, [
		{"family":"OpenSans", "weight":"normal", "style":"normal"},
		{"family":"OpenSans", "weight":"bold", "style":"normal"},
		{"family":"OpenSans", "weight":"normal", "style":"italic"},
		{"family":"PT Serif", "weight":"normal", "style":"normal"},
		{"family":"PT Serif Caption", "weight":"normal", "style":"normal"}
	], {"callback": "ready"});
}
u.logoInjected = function() {
	page.logoSvg = u.svg({
		"node":page.logo,
		"class":"svglogo",
		"width":178,
		"height":60
	});
	page.logo.scrolled = function() {
		var scroll_y = u.scrollY();
		if (scroll_y) {
			if(!page.logoSvg.hide) {
				u.withdrawLogo(page.logoSvg);
			}
		}
		else {
			page.logoSvg.hide = false;
			u.logoAP = JSON.parse(JSON.stringify(u.logoAnimationParts));
			u.animateLogo(page.logoSvg);
		}
	}
	u.e.addWindowEvent(page.logo, "scroll", page.logo.scrolled);
	var scroll_y = u.scrollY();
	if (!scroll_y && (!u.hc(document.body, "front") || u.getCookie("intro_shown"))) {
		u.logoAP = JSON.parse(JSON.stringify(u.logoAnimationParts));
		u.animateLogo(page.logoSvg);
	}
	else {
		page.scrolled();
	}
}
u.logoAnimationParts = [
	[
		{type:"line", x1: 130, y1: 0, x2: 123, y2: 11}
	],
	[
		{type:"circle", cx: 119, cy: 17, r:7, cx1: 123, cy1: 11}
	],
	[
		{type:"line", x1: 112, y1: 21, x2: 103, y2: 27},
		{type:"line", x1: 121, y1: 24, x2: 129, y2: 38}
	],
	[
		{type:"circle", cx: 96, cy: 31, r: 7, cx1: 103, cy1: 27},
		{type:"circle", cx: 132, cy: 45, r: 7, cx1: 129, cy1: 38}
	]
];
u.logoAnimationPartsIntro = [
	[
		{type:"line", x1: 305, y1: 0, x2: 289, y2: 25}
	],
	[
		{type:"circle", cx: 279, cy: 40, r:17, cx1: 289, cy1: 25}
	],
	[
		{type:"line", x1: 263, y1: 49, x2: 242, y2: 63},
		{type:"line", x1: 284, y1: 56, x2: 303, y2: 89}
	],
	[
		{type:"circle", cx: 225, cy: 73, r: 17, cx1: 242, cy1: 63},
		{type:"circle", cx: 310, cy: 106, r: 17, cx1: 303, cy1: 89}
	]
];
u.animateLogo = function(svg) {
	if(u.logoAP.length && !svg.hide) {
		var next_part = u.logoAP.shift();
		u.ass(svg, {
			display: "block"
		});
		var i;
		for(i = 0; i < next_part.length; i++) {
			var element = next_part[i];
			if(element.type == "line") {
				u.drawLogoLine(svg, element.x1, element.y1, element.x2, element.y2);
			}
			else if(element.type == "circle") {
				u.drawLogoCircle(svg, element.cx, element.cy, element.r, element.cx1, element.cy1);
			}
		}
	}
}
u.withdrawLogo = function(svg) {
	svg.hide = true;
	var elements = u.qsa("circle, line", svg);
	var i;
	for(i = 0; i < elements.length; i++) {
		element = elements[i];
		element.svg = svg;
		if(element.nodeName.toLowerCase() === "circle") {
			element.transitioned = function() {
				delete this.transitioned;
				this.svg.removeChild(this);
				if(u.qsa("svg", this.svg.parentNode).length == 1) {
					u.ass(this.svg, {
						display: "none"
					});
				}
			}
			u.a.to(element, "all 300ms ease-in-out", {"r": 0});
		}
		else {
			var x1 = element.getAttribute("x1");
			var y1 = element.getAttribute("y1");
			var x2 = element.getAttribute("x2");
			var y2 = element.getAttribute("y2");
			var end_x = x1 - ((x1-x2) / 2);
			var end_y = y1 - ((y1-y2) / 2);
			element.transitioned = function() {
				delete this.transitioned;
				this.svg.removeChild(this);
				if(u.qsa("svg", this.svg.parentNode).length == 1) {
					u.ass(this.svg, {
						display: "none"
					});
				}
			}
			u.a.to(element, "all 300ms ease-in-out", {"x1": end_x, "x2": end_x, "y1": end_y, "y2": end_y});
		}
	}
}
u.drawLogoLine = function(svg, x1, y1, x2, y2) {
	var line = u.svgShape(svg, {
		"type": "line",
		"x1": x1,
		"y1": y1,
		"x2": x1,
		"y2": y1
	});
	line.svg = svg;
	line.transitioned = function() {
		u.animateLogo(this.svg);
	}
	u.a.to(line, "all 100ms ease-in-out", {"x2": x2, "y2": y2});
	return line;
}
u.drawLogoCircle = function(svg, cx, cy, r, cx1, cy1) {
	var circle = u.svgShape(svg, {
		"type": "circle",
		"cx": cx1,
		"cy": cy1,
		"r":  1,
	});
	circle.svg = svg;
	circle.transitioned = function() {
		u.animateLogo(this.svg);
	}
	u.a.to(circle, "all 100ms ease-in-out", {"r":r, "cx": cx, "cy": cy});
	return circle;
}


/*beta-u-animation-to.js*/
	u.a.parseSVGPolygon = function(value) {
		var pairs = value.trim().split(" ");
		var sets = [];
		var part;
		for(x in pairs) {
			parts = pairs[x].trim().split(",");
			for(part in parts) {
				parts[part] = Number(parts[part]);
			}
			sets[x] = parts;
		}
		return sets;
	}
	u.a.parseSVGPath = function(value) {
		var pairs = {"m":2, "l":2, "a":7, "c":6, "s":4, "q":4, "z":0};
		var x, sets;
		value = value.replace(/-/g, " -");
		value = value.replace(/,/g, " ");
		value = value.replace(/(m|l|a|c|s|q|M|L|A|C|S|Q)/g, " $1 ");
		value = value.replace(/  /g, " ");
		sets = value.match(/(m|l|a|c|s|q|M|L|A|C|S|Q)([0-9 \-\.]+)/g);
		for(x in sets) {
			parts = sets[x].trim().split(" ");
			sets[x] = parts;
			if(parts && pairs[parts[0].toLowerCase()] == parts.length-1) {
			}
			else {
			}
		}
		return sets;
	}
	u.a.getInitialValue = function(node, attribute) {
		var value = (node.getAttribute(attribute) ? node.getAttribute(attribute) : u.gcs(node, attribute)).replace(node._unit[attribute], "")
		if(attribute.match(/^(d|points)$/)) {
			return value;
		}
		else {
			return Number(value.replace(/auto/, 0));
		}
	}
	u.a.to = function(node, transition, attributes) {
		var transition_parts = transition.split(" ");
		if(transition_parts.length >= 3) {
			node._target = transition_parts[0];
			node.duration = transition_parts[1].match("ms") ? parseFloat(transition_parts[1]) : (parseFloat(transition_parts[1]) * 1000);
			node._ease = transition_parts[2];
			if(transition_parts.length == 4) {
				node.delay = transition_parts[3].match("ms") ? parseFloat(transition_parts[3]) : (parseFloat(transition_parts[3]) * 1000);
			}
		}
		var value, d;
		node._start = {};
		node._end = {};
		node._unit = {};
		for(attribute in attributes) {
			if(attribute.match(/^(d)$/)) {
				node._start[attribute] = this.parseSVGPath(this.getInitialValue(node, attribute));
				node._end[attribute] = this.parseSVGPath(attributes[attribute]);
			}
			else if(attribute.match(/^(points)$/)) {
				node._start[attribute] = this.parseSVGPolygon(this.getInitialValue(node, attribute));
				node._end[attribute] = this.parseSVGPolygon(attributes[attribute]);
			}
			else {
				node._unit[attribute] = attributes[attribute].toString().match(/\%|px/);
				node._start[attribute] = this.getInitialValue(node, attribute);
				node._end[attribute] = attributes[attribute].toString().replace(node._unit[attribute], "");
			}
		}
		node.easing = u.easings[node._ease];
		node.transitionTo = function(progress) {
			var easing = node.easing(progress);
			for(attribute in attributes) {
				if(attribute.match(/^(translate|rotate|scale)$/)) {
					if(attribute == "translate") {
						u.a.translate(this, Math.round((this._end_x - this._start_x) * easing), Math.round((this._end_y - this._start_y) * easing))
					}
					else if(attribute == "rotate") {
					}
				}
				else if(attribute.match(/^(x1|y1|x2|y2|r|cx|cy|stroke-width)$/)) {
					var new_value = (this._start[attribute] + ((this._end[attribute] - this._start[attribute]) * easing)) +  this._unit[attribute]
					this.setAttribute(attribute, new_value);
				}
				else if(attribute.match(/^(d)$/)) {
					var new_value = "";
					for(x in this._start[attribute]) {
						for(y in this._start[attribute][x]) {
							if(parseFloat(this._start[attribute][x][y]) == this._start[attribute][x][y]) {
								new_value += (Number(this._start[attribute][x][y]) + ((Number(this._end[attribute][x][y]) - Number(this._start[attribute][x][y])) * easing)) + " ";
							}
							else {
								new_value += this._end[attribute][x][y] + " ";
							}
						}
					}
					this.setAttribute(attribute, new_value);
				}
				else if(attribute.match(/^(points)$/)) {
					var new_value = "";
					for(x in this._start[attribute]) {
						new_value += (this._start[attribute][x][0] + ((this._end[attribute][x][0] - this._start[attribute][x][0]) * easing)) + ",";
						new_value += (this._start[attribute][x][1] + ((this._end[attribute][x][1] - this._start[attribute][x][1]) * easing)) + " ";
					}
					this.setAttribute(attribute, new_value);
				}
				else {
					var new_value = (this._start[attribute] + ((this._end[attribute] - this._start[attribute]) * easing)) +  this._unit[attribute]
					u.as(node, attribute, new_value, false);
				}
			}
		}
		u.a.requestAnimationFrame(node, "transitionTo", node.duration);
	}


/*beta-u-columns.js*/
u.columns = function(node, _columns, insert) {
	var current_node = node;
	insert = insert || false;
	if(!node._tree) {
		if(insert) {
			node._tree = u.ie(node, "div", {
				"class":"c"
			})
		}
		else {
			node._tree = u.ae(node, "div", {
				"class":"c"
			})
		}
		node._tree.node = node;
		current_node = node._tree;
	}
	var _column, div_column, column, i, key, value, j;
	for(j = 0; j < _columns.length; j++) {
		_column = _columns[j];
		if(typeof(_column) === "object") {
			key = Object.keys(_column)[0];
			value = _column[key];
			div_column = u.ae(current_node, "div", {
				"class":key
			});
			div_column._tree = node._tree;
			u.columns(div_column, value);
		}
		else {
			var target = u.qs(_column, node._tree.node);
			if(target) {
				div_column = u.ae(current_node, target);
				div_column._tree = node._tree;
			}
		}
	}
}


/*u-form-builder.js*/
u.f.customBuild = {};
u.f.addForm = function(node, _options) {
	var form_name = "js_form";
	var form_action = "#";
	var form_method = "post";
	var form_class = "";
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "name"			: form_name				= _options[_argument]; break;
				case "action"		: form_action			= _options[_argument]; break;
				case "method"		: form_method			= _options[_argument]; break;
				case "class"		: form_class			= _options[_argument]; break;
			}
		}
	}
	var form = u.ae(node, "form", {"class":form_class, "name": form_name, "action":form_action, "method":form_method});
	return form;
}
u.f.addFieldset = function(node, _options) {
	var fieldset_class = "";
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "class"			: fieldset_class			= _options[_argument]; break;
			}
		}
	}
	return u.ae(node, "fieldset", {"class":fieldset_class});
}
u.f.addField = function(node, _options) {
	var field_name = "js_name";
	var field_label = "Label";
	var field_type = "string";
	var field_value = "";
	var field_options = [];
	var field_checked = false;
	var field_class = "";
	var field_id = "";
	var field_max = false;
	var field_min = false;
	var field_disabled = false;
	var field_readonly = false;
	var field_required = false;
	var field_pattern = false;
	var field_error_message = "There is an error in your input";
	var field_hint_message = "";
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "name"					: field_name			= _options[_argument]; break;
				case "label"				: field_label			= _options[_argument]; break;
				case "type"					: field_type			= _options[_argument]; break;
				case "value"				: field_value			= _options[_argument]; break;
				case "options"				: field_options			= _options[_argument]; break;
				case "checked"				: field_checked			= _options[_argument]; break;
				case "class"				: field_class			= _options[_argument]; break;
				case "id"					: field_id				= _options[_argument]; break;
				case "max"					: field_max				= _options[_argument]; break;
				case "min"					: field_min				= _options[_argument]; break;
				case "disabled"				: field_disabled		= _options[_argument]; break;
				case "readonly"				: field_readonly		= _options[_argument]; break;
				case "required"				: field_required		= _options[_argument]; break;
				case "pattern"				: field_pattern			= _options[_argument]; break;
				case "error_message"		: field_error_message	= _options[_argument]; break;
				case "hint_message"			: field_hint_message	= _options[_argument]; break;
			}
		}
	}
	var custom_build;
	if(field_type in u.f.customBuild) {
		return u.f.customBuild[field_type](node, _options);
	}
	field_id = field_id ? field_id : "input_"+field_type+"_"+field_name;
	field_disabled = !field_disabled ? (field_class.match(/(^| )disabled( |$)/) ? "disabled" : false) : "disabled";
	field_readonly = !field_readonly ? (field_class.match(/(^| )readonly( |$)/) ? "readonly" : false) : "readonly";
	field_required = !field_required ? (field_class.match(/(^| )required( |$)/) ? true : false) : true;
	field_class += field_disabled ? (!field_class.match(/(^| )disabled( |$)/) ? " disabled" : "") : "";
	field_class += field_readonly ? (!field_class.match(/(^| )readonly( |$)/) ? " readonly" : "") : "";
	field_class += field_required ? (!field_class.match(/(^| )required( |$)/) ? " required" : "") : "";
	field_class += field_min ? (!field_class.match(/(^| )min:[0-9]+( |$)/) ? " min:"+field_min : "") : "";
	field_class += field_max ? (!field_class.match(/(^| )max:[0-9]+( |$)/) ? " max:"+field_max : "") : "";
	if (field_type == "hidden") {
		return u.ae(node, "input", {"type":"hidden", "name":field_name, "value":field_value, "id":field_id});
	}
	var field = u.ae(node, "div", {"class":"field "+field_type+" "+field_class});
	var attributes = {};
	if(field_type == "string") {
		field_max = field_max ? field_max : 255;
		attributes = {
			"type":"text", 
			"id":field_id, 
			"value":field_value, 
			"name":field_name, 
			"maxlength":field_max, 
			"minlength":field_min,
			"pattern":field_pattern,
			"readonly":field_readonly,
			"disabled":field_disabled
		};
		u.ae(field, "label", {"for":field_id, "html":field_label});
		u.ae(field, "input", u.f.verifyAttributes(attributes));
	}
	else if(field_type == "email" || field_type == "tel" || field_type == "password") {
		field_max = field_max ? field_max : 255;
		attributes = {
			"type":field_type, 
			"id":field_id, 
			"value":field_value, 
			"name":field_name, 
			"maxlength":field_max, 
			"minlength":field_min,
			"pattern":field_pattern,
			"readonly":field_readonly,
			"disabled":field_disabled
		};
		u.ae(field, "label", {"for":field_id, "html":field_label});
		u.ae(field, "input", u.f.verifyAttributes(attributes));
	}
	else if(field_type == "number" || field_type == "integer" || field_type == "date" || field_type == "datetime") {
		attributes = {
			"type":field_type, 
			"id":field_id, 
			"value":field_value, 
			"name":field_name, 
			"max":field_max, 
			"min":field_min,
			"pattern":field_pattern,
			"readonly":field_readonly,
			"disabled":field_disabled
		};
		u.ae(field, "label", {"for":field_id, "html":field_label});
		u.ae(field, "input", u.f.verifyAttributes(attributes));
	}
	else if(field_type == "checkbox") {
		attributes = {
			"type":field_type, 
			"id":field_id, 
			"value":field_value ? field_value : "true", 
			"name":field_name, 
			"disabled":field_disabled,
			"checked":field_checked
		};
		u.ae(field, "input", {"name":field_name, "value":"false", "type":"hidden"});
		u.ae(field, "input", u.f.verifyAttributes(attributes));
		u.ae(field, "label", {"for":field_id, "html":field_label});
	}
	else if(field_type == "text") {
		attributes = {
			"id":field_id, 
			"html":field_value, 
			"name":field_name, 
			"maxlength":field_max, 
			"minlength":field_min,
			"pattern":field_pattern,
			"readonly":field_readonly,
			"disabled":field_disabled
		};
		u.ae(field, "label", {"for":field_id, "html":field_label});
		u.ae(field, "textarea", u.f.verifyAttributes(attributes));
	}
	else if(field_type == "select") {
		attributes = {
			"id":field_id, 
			"name":field_name, 
			"disabled":field_disabled
		};
		u.ae(field, "label", {"for":field_id, "html":field_label});
		var select = u.ae(field, "select", u.f.verifyAttributes(attributes));
		if(field_options) {
			var i, option;
			for(i = 0; i < field_options.length; i++) {
				option = field_options[i];
				if(option.value == field_value) {
					u.ae(select, "option", {"value":option.value, "html":option.text, "selected":"selected"});
				}
				else {
					u.ae(select, "option", {"value":option.value, "html":option.text});
				}
			}
		}
	}
	else if(field_type == "radiobuttons") {
		u.ae(field, "label", {"html":field_label});
		if(field_options) {
			var i, option;
			for(i = 0; i < field_options.length; i++) {
				option = field_options[i];
				var div = u.ae(field, "div", {"class":"item"});
				if(option.value == field_value) {
					u.ae(div, "input", {"value":option.value, "id":field_id+"-"+i, "type":"radio", "name":field_name, "checked":"checked"});
					u.ae(div, "label", {"for":field_id+"-"+i, "html":option.text});
				}
				else {
					u.ae(div, "input", {"value":option.value, "id":field_id+"-"+i, "type":"radio", "name":field_name});
					u.ae(div, "label", {"for":field_id+"-"+i, "html":option.text});
				}
			}
		}
	}
	else if(field_type == "files") {
		u.ae(field, "label", {"for":field_id, "html":field_label});
		u.ae(field, "input", {"id":field_id, "name":field_name, "type":"file"});
	}
	else {
		u.bug("input type not implemented")
	}
	if(field_hint_message || field_error_message) {
		var help = u.ae(field, "div", {"class":"help"});
		if (field_hint_message) {
			u.ae(help, "div", { "class": "hint", "html": field_hint_message });
		}
		if(field_error_message) {
			u.ae(help, "div", { "class": "error", "html": field_error_message });
		}
	}
	return field;
}
u.f.verifyAttributes = function(attributes) {
	for(attribute in attributes) {
		if(attributes[attribute] === undefined || attributes[attribute] === false || attributes[attribute] === null) {
			delete attributes[attribute];
		}
	}
	return attributes;
}
u.f.addAction = function(node, _options) {
	var action_type = "submit";
	var action_name = "js_name";
	var action_value = "";
	var action_class = "";
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "type"			: action_type			= _options[_argument]; break;
				case "name"			: action_name			= _options[_argument]; break;
				case "value"		: action_value			= _options[_argument]; break;
				case "class"		: action_class			= _options[_argument]; break;
			}
		}
	}
	var p_ul = node.nodeName.toLowerCase() == "ul" ? node : u.pn(node, {"include":"ul.actions"});
	if(!p_ul || !u.hc(p_ul, "actions")) {
		if(node.nodeName.toLowerCase() == "form") {
			p_ul = u.qs("ul.actions", node);
		}
		p_ul = p_ul ? p_ul : u.ae(node, "ul", {"class":"actions"});
	}
	var p_li = node.nodeName.toLowerCase() == "li" ? node : u.pn(node, {"include":"li"});
	if(!p_li || p_ul != p_li.parentNode) {
		p_li = u.ae(p_ul, "li", {"class":action_name});
	}
	else {
		p_li = node;
	}
	var action = u.ae(p_li, "input", {"type":action_type, "class":action_class, "value":action_value, "name":action_name})
	return action;
}


/*m-pagination.js*/
Util.Modules["pagination"] = new function() {
	this.init = function(pagination) {
		if(pagination) {
			u.ae(document.body, pagination);
			u.as(pagination, "transform", "none");
			pagination.next = u.qs(".next", pagination);
			if(pagination.next) {
				u.addNextArrow(pagination.next);
				pagination.next.a = u.qs("a", pagination.next);
				u.ce(pagination.next, {"type":"link"});
				u.e.hover(pagination.next);
				pagination.next.over = function() {
					u.ass(this, {
						"transition": "width 0.3s ease",
						"width":this.a.offsetWidth+"px"
					});
					u.ass(this.a, {
						"transition": "opacity 0.2s ease 0.2s",
						"opacity":1
					});
				}
				pagination.next.out = function() {
					u.ass(this.a, {
						"transition": "opacity 0.2s ease",
						"opacity":0
					});
					u.ass(this, {
						"transition": "width 0.3s ease 0.2s",
						"width":0
					});
				}
			}
			pagination.prev = u.qs(".previous", pagination);
			if(pagination.prev) {
				u.addPreviousArrow(pagination.prev);
				pagination.prev.a = u.qs("a", pagination.prev);
				u.ce(pagination.prev, {"type":"link"});
				u.e.hover(pagination.prev);
				pagination.prev.over = function() {
					u.ass(this, {
						"transition": "width 0.3s ease",
						"width":this.a.offsetWidth+"px"
					});
					u.ass(this.a, {
						"transition": "opacity 0.2s ease 0.2s",
						"opacity":1
					});
				}
				pagination.prev.out = function() {
					u.ass(this.a, {
						"transition": "opacity 0.2s ease",
						"opacity":0
					});
					u.ass(this, {
						"transition": "width 0.3s ease 0.2s",
						"width":0
					});
				}
			}
			pagination.destroy = function() {
				document.body.removeChild(this);
			}
		}
	}
}


/*m-comments.js*/
Util.Modules["comments"] = new function() {
	this.init = function(div) {
		div.item_id = u.cv(div, "item_id");
		div.list = u.qs("ul.comments", div);
		div.comments = u.qsa("li.comment", div.list);
		div.header = u.qs("h2", div);
		div.header.div = div;
		u.addExpandArrow(div.header);
		u.ce(div.header);
		div.header.clicked = function() {
			if(u.hc(this.div, "open")) {
				u.rc(this.div, "open");
				u.addExpandArrow(this);
				u.saveCookie("comments_open_state", 0, {"path":"/"});
			}
			else {
				u.ac(this.div, "open");
				u.addCollapseArrow(this);
				u.saveCookie("comments_open_state", 1, {"path":"/"});
			}
		}
		div.comments_open_state = u.getCookie("comments_open_state", {"path":"/"});
		if(div.comments_open_state == 1) {
			div.header.clicked();
		}
		div.initComment = function(node) {
			node.div = this;
		}
		div.csrf_token = div.getAttribute("data-csrf-token");
		div.add_comment_url = div.getAttribute("data-comment-add");
		if(div.add_comment_url && div.csrf_token) {
			div.actions = u.ae(div, "ul", {"class":"actions"});
			div.bn_comment = u.ae(u.ae(div.actions, "li", {"class":"add"}), "a", {"html":u.txt["add_comment"], "class":"button primary comment"});
			div.bn_comment.div = div;
			u.ce(div.bn_comment);
			div.bn_comment.clicked = function() {
				var actions, bn_add, bn_cancel;
				u.as(this.div.actions, "display", "none");
				this.div.form = u.f.addForm(this.div, {"action":this.div.add_comment_url+"/"+this.div.item_id, "class":"add labelstyle:inject"});
				this.div.form.div = div;
				u.ae(this.div.form, "input", {"type":"hidden","name":"csrf-token", "value":this.div.csrf_token});
				u.f.addField(this.div.form, {"type":"text", "name":"item_comment", "label":u.txt["comment"]});
				actions = u.ae(this.div.form, "ul", {"class":"actions"});
				bn_add = u.f.addAction(actions, {"value":u.txt["add_comment"], "class":"button primary update", "name":"add"});
				bn_add.div = div;
				bn_cancel = u.f.addAction(actions, {"value":u.txt["cancel"], "class":"button cancel", "type":"button", "name":"cancel"});
				bn_cancel.div = div;
				u.f.init(this.div.form);
				this.div.form.submitted = function() {
					this.response = function(response) {
						if(response.cms_status == "success" && response.cms_object) {
							if(!div.list) {
								var p = u.qs("p", div);
								if(p) {
									p.parentNode.removeChild(p);
								}
								div.list = u.ie(div, "ul", {"class":"comments"});
								div.insertBefore(div.list, div.actions);
							}
							var comment_li = u.ae(this.div.list, "li", {"class":"comment comment_id:"+response.cms_object["id"]});
							var info = u.ae(comment_li, "ul", {"class":"info"});
							u.ae(info, "li", {"class":"created_at", "html":response.cms_object["created_at"]});
							u.ae(info, "li", {"class":"author", "html":response.cms_object["nickname"]});
							u.ae(comment_li, "p", {"class":"comment", "html":response.cms_object["comment"]})
							this.div.initComment(comment_li);
							this.parentNode.removeChild(this);
							u.as(this.div.actions, "display", "");
						}
					}
					u.request(this, this.action, {"method":"post", "data":this.getData()});
				}
				u.ce(bn_cancel);
				bn_cancel.clicked = function(event) {
					u.e.kill(event);
					this.div.form.parentNode.removeChild(this.div.form);
					u.as(this.div.actions, "display", "");
				}
			}
		}
		else {
			u.ae(div, "p", {"html": (u.txt["login_to_comment"] ? u.txt["login_to_comment"] : "Login or signup to comment")});
		}
		var i, node;
		for(i = 0; node = div.comments[i]; i++) {
			div.initComment(node);
		}
	}
}


/*m-signup.js*/
Util.Modules["signup"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			var form_signup = u.qs("form.signup", this);
			if(form_signup) {
				var place_holder = u.qs("div.articlebody .placeholder.signup", this);
				if(form_signup && place_holder) {
					place_holder.parentNode.replaceChild(form_signup, place_holder);
				}
				if(form_signup) {
					u.f.init(form_signup);
				}
				form_signup.submitted = function() {
					var data = this.getData();
					this.is_submitting = true; 
					u.ac(this, "submitting");
					u.ac(this.actions["signup"], "disabled");
					this.response = function(response, request_id) {
						if (u.qs(".scene.verify", response)) {
							u.bug(response);
							scene.replaceScene(response);
							var url_actions = this[request_id].response_url.replace(location.protocol + "://" + document.domain, "");
							u.h.navigate(url_actions, false, true);
						}
						else {
							if (this.is_submitting) {
								this.is_submitting = false; 
								u.rc(this, "submitting");
								u.rc(this.actions["signup"], "disabled");
							}
							if (this.error) {
								this.error.parentNode.removeChild(this.error);
							}
							this.error = scene.showMessage(this, response);
							u.ass(this.error, {
								transform:"translate3d(0, -20px, 0) rotate3d(-1, 0, 0, 90deg)",
								opacity:0
							});
							u.a.transition(this.error, "all .6s ease");
							u.ass(this.error, {
								transform:"translate3d(0, 0, 0) rotate3d(0, 0, 0, 0deg)",
								opacity:1
							});
						}
					}
					u.request(this, this.action, {"data":data, "method":"POST"});
				}
			}
			u.showScene(this);
		}
		scene.replaceScene = function(response) {
			var current_scene = u.qs(".scene", page);
			var new_scene = u.qs(".scene", response);
			page.cN.replaceChild(new_scene, current_scene); 
			u.init();
			new_scene.ready();
			return new_scene;
		}
		scene.showMessage = function(form, response) {
			var new_error = (u.qs("p.errormessage", response) || u.qs("p.error", response));
			var current_error = (u.qs("p.errormessage", form) || u.qs("p.error", form));
			if (!current_error) {
				u.ie(form, new_error);
			}
			else {
				form.replaceChild(new_error, current_error);
			}
			return new_error;
		}
		page.cN.scene = scene;
	}
}


/*m-verify.js*/
Util.Modules["verify"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			var form_verify = u.qs("form.verify_code", this);
			if(form_verify) {
				u.f.init(form_verify);
			}
			form_verify.submitted = function() {
				var data = this.getData();
				this.is_submitting = true; 
				u.ac(this, "submitting");
				u.ac(this.actions["verify"], "disabled");
				u.ac(this.actions["skip"], "disabled");
				this.response = function(response, request_id) {
					if (u.qs(".scene.login", response)) {
						scene.replaceScene(response);
						u.h.navigate("/login", false, true);
					}
					else if (u.qs(".scene.confirmed", response)) {
						scene.replaceScene(response);
						var url_actions = this[request_id].response_url.replace(location.protocol + "://" + document.domain, "");
						u.h.navigate(url_actions, false, true);
					}
					else {
						if (this.is_submitting) {
							this.is_submitting = false; 
							u.rc(this, "submitting");
							u.rc(this.actions["verify"], "disabled");
							u.rc(this.actions["skip"], "disabled");
						}
						if (this.error) {
							this.error.parentNode.removeChild(this.error);
						}
						this.error = scene.showMessage(this, response);
						u.ass(this.error, {
							transform:"translate3d(0, -20px, 0) rotate3d(-1, 0, 0, 90deg)",
							opacity:0
						});
						u.a.transition(this.error, "all .6s ease");
						u.ass(this.error, {
							transform:"translate3d(0, 0, 0) rotate3d(0, 0, 0, 0deg)",
							opacity:1
						});
					}
				}
				u.request(this, this.action, {"data":data, "method":"POST", "responseType":"document"});
			}
			u.showScene(this);
		}
		scene.replaceScene = function(response) {
			var current_scene = u.qs(".scene", page);
			var new_scene = u.qs(".scene", response);
			page.cN.replaceChild(new_scene, current_scene); 
			u.init();
			new_scene.ready();
			return new_scene;
		}
		scene.showMessage = function(form, response) {
			var new_error = (u.qs("p.errormessage", response) || u.qs("p.error", response));
			var current_error = (u.qs("p.errormessage", form) || u.qs("p.error", form));
			if (!current_error) {
				u.ie(form, new_error);
			}
			else {
				form.replaceChild(new_error, current_error);
			}
			return new_error;
		}
		page.cN.scene = scene;
	}
}


/*m-dynamic-variables-post.js*/
Util.Modules["dynamicVariablesPost"] = new function() {
	this.init = function(post) {
		var extension_start = u.qs(".extension_start", post);
		var form = u.f.addForm(post, {"class":"labelstyle:inject dynamicVariablesPost"});
		var extension_text = u.ae(form, "p", {"html":"To make the following commands Copy/Paste ready, enter your information here:"});
		var fieldset = u.f.addFieldset(form);
		var var_names = [];
		var var_labels = {};
		var dyn_vars = u.qsa("span.dynvar");
		var i, dyn_var, label;
		for(i = 0; dyn_var = dyn_vars[i]; i++) {
			dyn_var.var_name = dyn_var.className.replace(/(dynvar|[ ]|label\:[^$ ]+)/g, "");
			if(!var_labels[dyn_var.var_name]) {
				label = u.cv(dyn_var, "label");
				if(label) {
					var_labels[dyn_var.var_name] = label.replace(/_/, " ");
				}
			}
			if(var_names.indexOf(dyn_var.var_name) == -1) {
				var_names.push(dyn_var.var_name);
			}
		}
		for(i = 0; dyn_var_name = var_names[i]; i++) {
			label = var_labels[dyn_var_name] ? decodeURI(var_labels[dyn_var_name]) : u.qs("span.dynvar."+dyn_var_name).innerHTML;
				u.f.addField(fieldset, {"label":label, "name":dyn_var_name, "class":dyn_var_name+"_master"});
		}
		u.f.init(form);
		for(i = 0; dyn_var = dyn_vars[i]; i++) {
			form.inputs[dyn_var.var_name].placeholders = u.qsa("span.dynvar."+dyn_var.var_name, post);
			form.inputs[dyn_var.var_name].updated = function() {
				var i, placeholder;
				for(i = 0; placeholder = this.placeholders[i]; i++) {
					placeholder.innerHTML = this.val();
				}
			}
		}
		extension_start.parentNode.insertBefore(form, extension_start);
	}
}

/*m-article_preview_list.js*/
Util.Modules["articlePreviewList"] = new function() {
	this.init = function(list) {
		list.articles = u.qsa("li.article", list);
		list.initArticle = function(article) {
			article._a = u.qs("h3 a", article);
			if(article._a) {
				article._link = article._a.href ? article._a.href : article._a.url;
			}
			article._description_p = u.qs("div.description p", article)
			if(article._description_p && article._link) {
				u.ae(article._description_p, "br");
				u.ae(article._description_p, "a", {href: article._link, class:"readmore", html:u.txt("readmore")});
			}
			var i, image;
			article._images = u.qsa("div.image,div.media", article);
			for(i = 0; image = article._images[i]; i++) {
				image.node = article;
				image.caption = u.qs("p a", image);
				if(image.caption) {
					image.caption.removeAttribute("href");
				}
				image._id = u.cv(image, "item_id");
				image._format = u.cv(image, "format");
				image._variant = u.cv(image, "variant");
				if(image._id && image._format) {
					image._image_src = "/images/" + image._id + "/" + (image._variant ? image._variant+"/" : "") + "540x." + image._format;
					u.ass(image, {
						"opacity": 0
					});
					image.loaded = function(queue) {
						u.ac(this, "loaded");
						this._image = u.ie(this, "img");
						this._image.image = this;
						this._image.src = queue[0].image.src;
						if(this.node.article_list && fun(this.node.article_list.correctScroll)) {
							this.node.article_list.correctScroll(this);
						}
						u.ce(this._image);
						this._image.clicked = function() {
							if(u.hc(this.image, "fullsize")) {
								u.a.transition(this, "all 0.3s ease-in-out");
								u.rc(this.image, "fullsize");
								this.src = this.image._image_src;
								u.ass(this, {
									width: ""
								});
							}
							else {
								u.a.transition(this, "all 0.3s ease-in-out");
								u.ac(this.image, "fullsize");
								u.ass(this, {
									width: (page.browser_w < 1080 ? page.browser_w : 1080) + "px"
								});
								if(this._fullsize_src) {
									this.src = this._fullsize_src;
								}
								else {
									this._fullsize_width = 1080;
									this._fullsize_src = "/images/" + this.image._id + "/" + (this.image._variant ? this.image._variant+"/" : "") + this._fullsize_width + "x." + this.image._format;
									this.response = function() {
										this.src = this._fullsize_src;
									}
									this.responseError = function() {
										this._fullsize_width = this._fullsize_width-200;
										this._fullsize_src = "/images/" + this._id + "/" + (this.image._variant ? this.image._variant+"/" : "") + this._fullsize_width + "x." + this.image._format;
										u.request(this, this._fullsize_src);
									}
									u.request(this, this._fullsize_src);
								}
							}
						}
						u.a.transition(this, "all 0.5s ease-in-out");
						u.ass(this, {
							"opacity": 1
						});
					}
					u.preloader(image, [image._image_src]);
				}
			}
			var video;
			article._videos = u.qsa("div.youtube, div.vimeo", article);
			for (i = 0; video = article._videos[i]; i++) {
				video._src = u.cv(video, "video_id");
				video._type = video._src.match(/youtube|youtu\.be/) ? "youtube" : "vimeo";
				if (video._type == "youtube") {
					video._id = video._src.match(/watch\?v\=/) ? video._src.split("?v=")[1] : video._src.split("/")[video._src.split("/").length-1];
					video.iframe = u.ae(video, "iframe", {
						id: "ytplayer",
						type: "text/html",
						webkitallowfullscreen: true,
						mozallowfullscreen: true,
						allowfullscreen: true,
						frameborder: 0,
						allow: "autoplay",
						sandbox:"allow-same-origin allow-scripts",
						width: "100%",
						height: 540 / 1.7777,
						src: 'https://www.youtube.com/embed/'+video._id+'?autoplay=false&loop=0&color=f0f0ee&modestbranding=1&rel=0&playsinline=1',
					});
				}
				else {
					video._id = video._src.split("/")[video._src.split("/").length-1];
					video.iframe = u.ae(video, "iframe", {
						webkitallowfullscreen: true,
						mozallowfullscreen: true,
						allowfullscreen: true,
						frameborder: 0,
						sandbox:"allow-same-origin allow-scripts",
						width: "100%",
						height: 540 / 1.7777,
						src: 'https://player.vimeo.com/video/'+video._id+'?autoplay=false&loop=0&byline=0&portrait=0',
					});
				}
			}
			var header = u.qs("h2,h3", article);
			header.current_readstate = article.getAttribute("data-readstate");
			if(header.current_readstate) {
				u.ac(header, "read");
				u.addCheckmark(header);
			}
			article.geolocation = u.qs("ul.geo", article);
			if(article.geolocation && typeof(u.injectGeolocation) == "function") {
				u.injectGeolocation(article);
			}
		}
		list.resized = function() {
			this.browser_h = u.browserH();
			this.screen_middle = this.browser_h/2;
		}
		list.scrolled = function(event) {
			u.t.resetTimer(this.t_init);
			this.scroll_y = u.scrollY();
			if(this._next_url) {
				var i, node, node_y, list_y;
				list_y = u.absY(this);
				if(list_y + this.offsetHeight < this.scroll_y + (this.browser_h*2)) {
					this.loadNext();
				}
			}
			this.t_init = u.t.setTimer(this, this.initFocusedArticles, 500);
		}
		list.initFocusedArticles = function() {
			var i, node, node_y;
			for(i = 0; node = this.articles[i]; i++) {
				if(!node.is_ready) {
					node_y = u.absY(node);
					if(node_y > this.scroll_y + this.browser_h) {
						break;
					}
					else if(
						(
							node_y + node.offsetHeight > this.scroll_y && 
							node_y + node.offsetHeight < this.scroll_y + this.browser_h
						)
						 || 
						(
							node_y > this.scroll_y &&
							node_y < this.scroll_y + this.browser_h
						)
						 ||
						(
							node_y < this.scroll_y &&
							node_y + node.offsetHeight > this.scroll_y + this.browser_h
						)
					) {
						this.initArticle(node);
						node.is_ready = true;
					}
				}
			}
		}
		list.correctScroll = function(div_image) {
			if(this.scroll_y) {
				var image_node_y = u.absY(div_image);
				if(image_node_y < this.scroll_y + this.screen_middle) {
					var new_scroll_y = this.scroll_y + (div_image.offsetHeight);
					window.scrollTo(0, new_scroll_y);
				}
			}
		}
		var next = u.qs(".pagination li.next a", list.parentNode);
		list._next_url = false;
		if(next) {
			u.ac(u.pn(next, {include:"div"}), "autoload");
			list._next_url = next ? next.href : false;
		}
		list.loadNext = function() {
			if(this._next_url) {
				this.response = function(response) {
					var articles = u.qsa("li.article", response);
					var i, node;
					for(i = 0; i < articles.length; i++) {
						node = u.ae(this, articles[i]);
						node.article_list = this;
					}
					var next = u.qs(".pagination li.next a", response);
					this._next_url = next ? next.href : false;
					this.articles = u.qsa("li.article", this);
				}
				u.request(this, this._next_url);
				this._next_url = false;
			}
		}
		var i, node;
		for(i = 0; node = list.articles[i]; i++) {
			node.article_list = list;
		}
		list.resized();
		list.scrolled();
		u.e.addWindowEvent(list, "resize", list.resized);
		u.e.addWindowEvent(list, "scroll", list.scrolled);
	}
}


/*m-search.js*/
Util.Modules["search"] = new function() {
	this.init = function(div) {
		div.form = u.qs("form", div);
		if(div.form) {
			u.f.init(div.form);
		}
	}
}


/*m-columns.js*/
Util.Modules["columns"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
			this.offsetHeight;
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			u.columns(this, [
				{"c200": [
					"div.article", 
					"div.articles",
					"div.related"
				]},
				{"c100": [
					".search",
					".categories"
				]},
				{"c300": [
					"div.company"
				]}
			]);
			u.showScene(this);
		}
		page.cN.scene = scene;
	}
}


/*u-sharing.js*/
u.injectSharing = function(node) {
	node.sharing = u.ae(node, "div", {"class":"sharing"});
	node.sharing.node = node;
	var ref_point = u.qs("div.comments", node);
	if(ref_point) {
		node.sharing = node.insertBefore(node.sharing, ref_point);
	}
	node.h3_share = u.ae(node.sharing, "h3", {"html":u.txt["share"]});
	if(!u.getCookie("share-info")) {
		node.share_info = u.ae(node.h3_share, "span", {"html":u.txt["share-info-headline"]});
		node.share_info.node = node;
		u.e.hover(node.share_info, {"delay":500});
		node.share_info.over = function() {
			if(!this.hint) {
				this.hint = u.ae(document.body, "div", {"class":"hint"});
				this.hint.share_info = this;
				u.ae(this.hint, "p", {"html":u.txt["share-info-txt"]});
				this.bn_ok = u.ae(this.hint, "a", {"html":u.txt["share-info-ok"]});
				this.bn_ok.share_info = this;
				u.ce(this.bn_ok);
				this.bn_ok.clicked = function(event) {
					u.saveCookie("share-info", 1, {"expires":false, "path":"/"});
					this.share_info.out();
					this.share_info.parentNode.removeChild(this.share_info);
					this.share_info.node.sharing.clicked();
				}
				this.hint.over = function() {
					var share_info_event = new MouseEvent("mouseover", {
						bubbles: true,
						cancelable: true,
						view: window
					});
					this.share_info.dispatchEvent(share_info_event);
					this.share_info.node.sharing.button.dispatchEvent(share_info_event);
				}
				u.e.addEvent(this.hint, "mouseover", this.hint.over);
				this.hint.out = function() {
					var share_info_event = new MouseEvent("mouseout", {
						bubbles: true,
						cancelable: true,
						view: window
					});
					this.share_info.dispatchEvent(share_info_event);
					this.share_info.node.sharing.dispatchEvent(share_info_event);
				}
				u.e.addEvent(this.hint, "mouseout", this.hint.out);
				u.ass(this.hint, {
					"top":(u.absY(this) + this.offsetHeight + 5) + "px",
					"left":(u.absX(this)) + "px"
				});
			}
		}
		node.share_info.out = function() {
			if(this.hint) {
				this.hint.parentNode.removeChild(this.hint);
				delete this.hint;
			}
		}
	}
	node.p_share = u.ae(node.sharing, "p", {"html":node.hardlink});
	u.e.click(node.sharing);
	node.sharing.clicked = function() {
		u.selectText(this.node.p_share);
	}
	node.sharing.svg = u.svg({
		"node":node.sharing,
		"class":"sharing",
		"width":500,
		"height":300,
		"shapes":[
			{
				"type": "line",
				"class": "primary",
				"x1": 6,
				"y1": 150,
				"x2": 22,
				"y2": 150
			},
			{
				"type": "circle",
				"class": "primary",
				"cx": 6,
				"cy": 150,
				"r": 5
			},
			{
				"type": "circle",
				"class": "primary",
				"cx": 22,
				"cy": 150,
				"r": 3
			}
		]
	});
	node.sharing.svg.drawings = 0;
	node.sharing.drawCircle = function(svg, cx, cy) {
		var circle = u.svgShape(svg, {
			"type": "circle",
			"cx": cx,
			"cy": cy,
			"r":  1,
		});
		circle.svg = svg;
		var new_radius = u.random(2, 5);
		circle.transitioned = svg._circle_transitioned;
		u.a.to(circle, "all 100ms linear", {"r":new_radius});
		return circle;
	}
	node.sharing.drawLine = function(svg, x1, y1, x2, y2) {
		x2 = x2 ? x2 : (x1 + u.random(30, 50));
		if(!y2) {
			if(y1 < 150) {
				y2 = y1 + u.random(-50, 30);
			}
			else {
				y2 = y1 + u.random(-30, 50);
			}
		}
		if(x2 < 490 && y2 > 10 && y2 < 290 && (x2 < 70 || x2 > 450 || (y2 < 130 && y1 < 130) || (y2 > 180 && y1 > 180))) {
			var line = u.svgShape(svg, {
				"type": "line",
				"x1": x1,
				"y1": y1,
				"x2": x1,
				"y2": y1
			});
			u.ie(svg, line);
			line.svg = svg;
			line.transitioned = svg._line_transitioned;
			u.a.to(line, "all 150ms linear", {"x2": x2, "y2": y2});
			return line;
		}
		return false;
	}
	node.sharing.svg._line_transitioned = function() {
		this.transitioned = null;
		if(!this.svg.hide) {
			var key = u.randomString(4);
			var cx = Number(this.getAttribute("x2"));
			var cy = Number(this.getAttribute("y2"));
			var circle = this.svg.node.drawCircle(this.svg, cx, cy);
			circle.id = key;
		}
	}
	node.sharing.svg._circle_transitioned = function() {
		this.transitioned = null;
		if(!this.svg.hide) {
			this.svg.drawings++;
			if(this.svg.drawings < 50) {
				var x1 = Number(this.getAttribute("cx"));
				var y1 = Number(this.getAttribute("cy"));
				var r = Number(this.getAttribute("r"));
				var line, i;
				if(r >= 5 && this.svg.drawings < 6) {
					line = this.svg.node.drawLine(this.svg, x1, y1, x1 + u.random(30, 60), y1 + u.random(-40, -60));
					line = this.svg.node.drawLine(this.svg, x1, y1, x1 + u.random(50, 60), y1 + u.random(-20, 20));
					line = this.svg.node.drawLine(this.svg, x1, y1, x1 + u.random(30, 60), y1 + u.random(40, 60));
				}
				else if(r >= 4) {
					line = this.svg.node.drawLine(this.svg, x1, y1, x1 + u.random(20, 70), y1 + u.random(-15, -40));
					line = this.svg.node.drawLine(this.svg, x1, y1, x1 + u.random(20, 70), y1 + u.random(15, 40));
				}
				else if(r >= 3 || this.svg.drawings%2 == 1) {
					line = this.svg.node.drawLine(this.svg, x1, y1, x1 + u.random(30, 60), y1 + u.random(-40, 40));
				}
				else {}
			}
		}
	}
	node.sharing.button = u.svgShape(node.sharing.svg, {
		"type": "rect",
		"class": "share",
		"x": 0,
		"y": 130,
		"width": 40,
		"height": 40,
		"fill": "transparent"
	});
	node.sharing.button._x1 = 22;
	node.sharing.button._y1 = 150;
	node.sharing.button.sharing = node.sharing;
	node.sharing.button.over = function() {
		u.t.resetTimer(this.t_hide);
		u.ac(this.sharing, "hover");
		this.sharing.drawLine(node.sharing.svg, this._x1, this._y1, u.random(this._x1, 70), this._y1 + u.random(-55, -40));
		this.sharing.drawLine(node.sharing.svg, this._x1, this._y1, u.random(70, 120), this._y1 + u.random(-20, -15));
		this.sharing.drawLine(node.sharing.svg, this._x1, this._y1, u.random(70, 120), this._y1 + u.random(15, 20));
		this.sharing.drawLine(node.sharing.svg, this._x1, this._y1, u.random(this._x1, 70), this._y1 + u.random(40, 55));
	}
	node.sharing.button.out = function() {
		var circles = u.qsa("circle:not(.primary)", this.sharing.svg);
		var lines = u.qsa("line:not(.primary)", this.sharing.svg);
		var line, circle, i;
		u.rc(this.sharing, "hover");
		this.sharing.svg.hide = true;
		this.sharing.svg.drawings = 0;
		for(i = 0; circle = circles[i]; i++) {
			circle.transitioned = function() {
				this.transitioned = null;
				this.svg.removeChild(this);
			}
			u.a.to(circle, "all 0.15s linear", {"r":0});
		}
		for(i = 0; line = lines[i]; i++) {
			x1 = Number(line.getAttribute("x1"));
			y1 = Number(line.getAttribute("y1"));
			x2 = Number(line.getAttribute("x2"));
			y2 = Number(line.getAttribute("y2"));
			new_x = x2 - ((x2-x1)/2);
			if(y1 < y2) {
				new_y = y2 - ((y2-y1)/2);
			}
			else {
				new_y = y1 - ((y1-y2)/2);
			}
			line.transitioned = function() {
				this.transitioned = null;
				this.svg.removeChild(this);
			}
			u.a.to(line, "all 0.25s linear", {"x1":new_x, "y1":new_y, "x2":new_x, "y2":new_y});
		}
		u.t.setTimer(this.sharing.svg, function() {this.hide = false;}, 250);
	}
	node.sharing.button.toggle = function(event) {
		if(u.hc(this.sharing, "hover")) {
			this.out(event);
		}
		else {
			this.over(event);
		}
	}
	node.sharing.autohide = function() {
		u.t.resetTimer(this.button.t_hide);
		this.button.t_hide = u.t.setTimer(this.button, this.button.out, 500);
	}
	if(u.e.event_support == "mouse") {
		u.e.addEvent(node.sharing.button, "mouseover", node.sharing.button.over);
		u.e.addEvent(node.sharing, "mouseleave", node.sharing.autohide);
	}
	else {
		u.e.addStartEvent(node.sharing.button, node.sharing.button.toggle);
	}
	if(typeof(node.sharingInjected) == "function") {
		node.sharingInjected();
	}
}


/*u-expandarrow.js*/
u.addExpandArrow = function(node) {
	if(node.collapsearrow) {
		node.collapsearrow.parentNode.removeChild(node.collapsearrow);
		node.collapsearrow = false;
	}
	node.expandarrow = u.svg({
		"name":"expandarrow",
		"node":node,
		"class":"arrow",
		"width":17,
		"height":17,
		"shapes":[
			{
				"type": "line",
				"x1": 2,
				"y1": 2,
				"x2": 7,
				"y2": 9
			},
			{
				"type": "line",
				"x1": 6,
				"y1": 9,
				"x2": 11,
				"y2": 2
			}
		]
	});
}
u.addCollapseArrow = function(node) {
	if(node.expandarrow) {
		node.expandarrow.parentNode.removeChild(node.expandarrow);
		node.expandarrow = false;
	}
	node.collapsearrow = u.svg({
		"name":"collapsearrow",
		"node":node,
		"class":"arrow",
		"width":17,
		"height":17,
		"shapes":[
			{
				"type": "line",
				"x1": 2,
				"y1": 9,
				"x2": 7,
				"y2": 2
			},
			{
				"type": "line",
				"x1": 6,
				"y1": 2,
				"x2": 11,
				"y2": 9
			}
		]
	});
}
u.addPreviousArrow = function(node) {
	node.arrow = u.svg({
		"name":"prevearrow",
		"node":node,
		"class":"arrow",
		"width":17,
		"height":17,
		"shapes":[
			{
				"type": "line",
				"x1": 9,
				"y1": 2,
				"x2": 2,
				"y2": 7
			},
			{
				"type": "line",
				"x1": 2,
				"y1": 6,
				"x2": 9,
				"y2": 11
			}
		]
	});
}
u.addNextArrow = function(node) {
	node.arrow = u.svg({
		"name":"nextearrow",
		"node":node,
		"class":"arrow",
		"width":17,
		"height":17,
		"shapes":[
			{
				"type": "line",
				"x1": 2,
				"y1": 2,
				"x2": 9,
				"y2": 7
			},
			{
				"type": "line",
				"x1": 9,
				"y1": 6,
				"x2": 2,
				"y2": 11
			}
		]
	});
}


/*m-front.js*/
Util.Modules["front"] = new function() {
	this.init = function(scene) {
		scene.resized = function(event) {
			if(page.intro) {
				u.ass(page.intro, {
					"height": page.browser_h + "px"
				});
			}
		}
		scene.scrolled = function(event) {
		}
		scene.ready = function() {
			if(!u.getCookie("intro_shown")) {
				this.initIntro();
			}
			else {
				this.revealPage();
			}
		}
		scene.initIntro = function() {
			u.saveCookie("intro_shown", 1);
			u.ass(document.body, {
				"overflow": "hidden"
			});
			page.intro = u.ae(document.body, "div", {id:"intro"});
			u.ass(page.intro, {
				"height": u.browserH() + "px"
			});
			page.intro.scene = this;
			u.ce(page.intro);
			page.intro.clicked = function(event) {
				page.intro.scene.endIntro();
			}
			page.intro.animateSymbol = function() {
				this.logoSvg = u.svg({
					"node":page.intro.div_logo_symbol,
					"class":"svglogo",
					"width":this.div_logo_chars.offsetWidth + "px",
					"height":125
				});
				u.logoAP = JSON.parse(JSON.stringify(u.logoAnimationPartsIntro));
				u.animateLogo(this.logoSvg);
				page.t_intro = u.t.setTimer(this, this.scene.endIntro, 1500);
			}
			page.intro.wrapper = u.ae(page.intro, "div", {class:"wrapper"});
			page.intro.div_logo_chars = u.ae(page.intro.wrapper, "div", {class:"logo_chars"});
			page.intro.div_logo_symbol = u.ae(page.intro.wrapper, "div", {class:"logo_symbol"});
			page.intro.logo_chars = ("parentNode").split("");
			var i, char, chars = [];
			for(i = 0; i < page.intro.logo_chars.length; i++) {
				char = u.ae(page.intro.div_logo_chars, "span", {html: page.intro.logo_chars[i]});
				u.ass(char, {
					"transform": "translate(0, 75px)"
				});
				chars.push(char);
			}
			while(chars.length) {
				if(chars.length === 1) {
					char = chars.pop();
					char.transitioned = function() {
						page.intro.animateSymbol();
					}
				}
				else {
					char = chars.splice(u.random(1, chars.length-1), 1)[0];
				}
				u.ass(char, {
					"transition": "all 0.5s ease-in-out " + ((page.intro.logo_chars.length - chars.length) * 15) + "ms",
					"transform": "translate(0, 0)",
					"opacity": 1
				});
			}
		}
		scene.endIntro = function() {
			u.t.resetTimer(page.t_intro);
			page.resized();
			if(page.intro.logoSvg) {
				u.withdrawLogo(page.intro.logoSvg);
			}
			var chars = Array.prototype.slice.call(u.qsa("span", page.intro));
			while(chars.length) {
				if(chars.length === 1) {
					char = chars.pop();
					char.transitioned = function() {
						document.body.removeChild(page.intro);
						u.ass(document.body, {
							"overflow": ""
						});
						delete page.intro;
						page.cN.scene.revealPage();
					}
				}
				else {
					char = chars.splice(u.random(1, chars.length-1), 1)[0];
				}
				u.ass(char, {
					"transition": "all 0.5s ease-in-out " + ((page.intro.logo_chars.length - chars.length) * 15) + "ms",
					"transform": "translate(0, -100px)",
					"opacity": 1
				});
			}
		}
		scene.revealPage = function() {
			u.a.transition(page.hN, "all 0.3s ease-in");
			u.ass(page.hN, {
				"opacity":1,
			});
			u.a.transition(page.nN, "all 0.3s ease-in");
			u.ass(page.nN, {
				"opacity":1,
			});
			u.a.transition(page.fN, "all 0.3s ease-in");
			u.ass(page.fN, {
				"opacity":1,
			});
			u.showScene(this);
			var scroll_y = u.scrollY();
			if (!scroll_y) {
				u.logoAP = JSON.parse(JSON.stringify(u.logoAnimationParts));
				u.animateLogo(page.logoSvg);
			}
			else {
				page.scrolled();
			}
			page.acceptCookies();
		}
		page.cN.scene = scene;
	}
}


/*m-contact.js*/
Util.Modules["contact"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			var nodes = u.qsa("li.item", scene);
			if(nodes) {
				var i, node, image;
				for(i = 0; i < nodes.length; i++) {
					node = nodes[i];
					image = u.qs("div.image", node);
					if(image) {
						image.caption = u.qs("p a", image);
						if(image.caption) {
							image.caption.removeAttribute("href");
						}
						image._id = u.cv(image, "item_id");
						image._format = u.cv(image, "format");
						image._variant = u.cv(image, "variant");
						if(image._id && image._format) {
							image._image_src = "/images/" + image._id + "/" + (image._variant ? image._variant+"/" : "") + "500x." + image._format;
							u.ass(image, {
								"opacity": 0
							});
							image.loaded = function(queue) {
								u.ac(this, "loaded");
								this._image = u.ie(this, "img");
								this._image.image = this;
								this._image.src = queue[0].image.src;
								u.a.transition(this, "all 0.5s ease-in-out");
								u.ass(this, {
									"opacity": 1
								});
							}
							u.preloader(image, [image._image_src]);
						}
					}
				}
			}
			u.showScene(this);
		}
		page.cN.scene = scene;
	}
}


/*m-demos.js*/
Util.Modules["demos"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
			if(this.div_filter) {
				this.filter_top = u.absY(this.div_filter);
			}
		}
		scene.scrolled = function() {
			if(this.div_filter) {
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
			}
		}
		scene.ready = function() {
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
					for(j = 0; j < demo.tags.length; j++) {
						tag = demo.tags[j];
						tag_value = tag.innerHTML;
						demo.tag_values.push(tag_value);
						if(this.tags.indexOf(tag_value) === -1) {
							this.tags.push(tag_value);
						}
					}
				}
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
		page.cN.scene = scene;
	}
}

