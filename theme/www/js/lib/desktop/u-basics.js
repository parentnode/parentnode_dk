u.pagePreloader = function() {

	// preload fonts
	u.fontsReady(page, [
		{"family":"OpenSans", "weight":"normal", "style":"normal"},
		{"family":"OpenSans", "weight":"bold", "style":"normal"},
		{"family":"OpenSans", "weight":"normal", "style":"italic"},
		{"family":"PT Serif", "weight":"normal", "style":"normal"},
		{"family":"PT Serif Caption", "weight":"normal", "style":"normal"}
	], {"callback": "ready"});

}

u.logoInjected = function() {

	// create base svg (animation placeholder)
	page.logoSvg = u.svg({
		"node":page.logo,
		"class":"svglogo",
		"width":178,
		"height":60
	});

	// Handle page scrolling
	page.logo.scrolled = function() {
		var scroll_y = u.scrollY();
		// If page is scrolled then remove logo
		if (scroll_y) {
			// unless already being hidden
			if(!page.logoSvg.hide) {
				u.withdrawLogo(page.logoSvg);
			}
		}
		// Page not scrolled
		else {
			page.logoSvg.hide = false;
			// Copy animation part set
			u.logoAP = JSON.parse(JSON.stringify(u.logoAnimationParts));
			// Animate logo
			u.animateLogo(page.logoSvg);
		}
	}
	
	// set scroll handler
	u.e.addWindowEvent(page.logo, "scroll", page.logo.scrolled);

	// Initial animation
	var scroll_y = u.scrollY();
	// Unless page is scrolled
	if (!scroll_y && (!u.hc(document.body, "front") || u.getCookie("intro_shown"))) {
		u.logoAP = JSON.parse(JSON.stringify(u.logoAnimationParts));
		// Animate logo
		u.animateLogo(page.logoSvg);
	}
	else {
		page.scrolled();
	}
}

// Animation parts
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

// Animation parts
u.logoAnimationPartsIntro = [
	[
		// {type:"line", x1: 130, y1: 0, x2: 123, y2: 11}
		{type:"line", x1: 305, y1: 0, x2: 289, y2: 25}
		// calc factor:0,4375
	],
	[
		// {type:"circle", cx: 119, cy: 17, r:7, cx1: 123, cy1: 11}
		{type:"circle", cx: 279, cy: 40, r:17, cx1: 289, cy1: 25}
	],
	[
		// {type:"line", x1: 112, y1: 21, x2: 103, y2: 27},
		{type:"line", x1: 263, y1: 49, x2: 242, y2: 63},

		// {type:"line", x1: 121, y1: 24, x2: 129, y2: 38}
		{type:"line", x1: 284, y1: 56, x2: 303, y2: 89}
	],
	[
		// {type:"circle", cx: 96, cy: 31, r: 17, cx1: 103, cy1: 27},
		{type:"circle", cx: 225, cy: 73, r: 17, cx1: 242, cy1: 63},

		// {type:"circle", cx: 132, cy: 45, r: 17, cx1: 129, cy1: 38}
		{type:"circle", cx: 310, cy: 106, r: 17, cx1: 303, cy1: 89}
	]
];

// Animate logo
u.animateLogo = function(svg) {

	// still more parts to animate (and hiding not started)
	if(u.logoAP.length && !svg.hide) {
		// Get next part
		var next_part = u.logoAP.shift();

		u.ass(svg, {
			display: "block"
		});

		var i;
		// Part can be more than one element
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

// Withdraw logo
u.withdrawLogo = function(svg) {
	// Stop other processes
	svg.hide = true;


	// Find all element and remove them
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

// Draw line
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

// Draw circle
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
