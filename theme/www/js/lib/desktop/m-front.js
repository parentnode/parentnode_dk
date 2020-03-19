Util.Modules["front"] = new function() {
	this.init = function(scene) {
		// u.bug("scene init:", scene);

		scene.resized = function(event) {
			// u.bug("scene.resized:", this);

			if(page.intro) {
				u.ass(page.intro, {
					"height": page.browser_h + "px"
				});
			}

		}

		scene.scrolled = function(event) {
			// u.bug("scene.scrolled:", this);
		}

		scene.ready = function() {
			// u.bug("scene.ready:", this);

			// if has not already been shown for this session
			if(!u.getCookie("intro_shown")) {
				this.initIntro();
			}
			// intro should not be shown again
			else {
				this.revealPage();
			}

		}


		// INTRO

		// Prepare intro content for playback
		scene.initIntro = function() {
			// u.bug("initIntro");

			u.saveCookie("intro_shown", 1);

			u.ass(document.body, {
				"overflow": "hidden"
			});

			page.intro = u.ae(document.body, "div", {id:"intro"});
			u.ass(page.intro, {
				"height": u.browserH() + "px"
			});
			// map reference
			page.intro.scene = this;


			// End intro on click
			u.ce(page.intro);
			page.intro.clicked = function(event) {
				page.intro.scene.endIntro();
			}

			// Animate symbol part of logo
			page.intro.animateSymbol = function() {

				// Add svg element
				this.logoSvg = u.svg({
					"node":page.intro.div_logo_symbol,
					"class":"svglogo",
					"width":this.div_logo_chars.offsetWidth + "px",
					"height":125
				});

				// Copy animation properties
				u.logoAP = JSON.parse(JSON.stringify(u.logoAnimationPartsIntro));

				// Animate symbol
				u.animateLogo(this.logoSvg);

				// End intro in 1.5 sec (animation of symbol included)
				page.t_intro = u.t.setTimer(this, this.scene.endIntro, 1500);

			}

			// Prepare for text animation
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

					// When last char has been animated, then add and animate symbol
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

		// hide intro and continue to article
		scene.endIntro = function() {
			// u.bug("end intro");

			u.t.resetTimer(page.t_intro);

			// ensure correct rendering
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

		// Show header, navigation and footer (hidden for frontpage)
		scene.revealPage = function() {
			// u.bug("scene.revealPage");

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
			// Unless page is scrolled
			if (!scroll_y) {
				u.logoAP = JSON.parse(JSON.stringify(u.logoAnimationParts));
				// Animate logo
				u.animateLogo(page.logoSvg);
			}
			else {
				page.scrolled();
			}
			page.acceptCookies();

		}

		// Register scene
		page.cN.scene = scene;

	}

}
