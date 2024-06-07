var AnimatedBanner = function() {

	this.config = {
		width: 930,
		height: 600,

		// Banner type options - if no bannerType is declared, neutral click handling is applied
		// bannerType: "Adform",
//		bannerType: "DR",
//		bannerType: "Adtech",
		bannerType: "GoogleStudio",

//		benyt bannerType google til Sizmek bannere

		// Optional custom click property – Only for "full-banner-click"
		// (if you need multiple/custom click areas, these should be defined in setupClickTag further down in this file)
		// The settings below can be used to overwrite the individual settings.
		// Note - not all settings work with all banner-types: 

		// target: "_parent" - opens in same window, "_blank" - opens in new window (not used by Adform)
		// url: "the-click-url-of-the-banner" (not used by Adform/Google)
		// clickTag: "the-name-of-the-clicktag-to-use". Default is "clickTag" (only used by Adform/Google)

		// Adform reads url/target from clickTag value in manifest.js
		// Google reads url from clickTag value in HTML
		// DR/Neutral needs url specified in local clickProperty

		// clickProperty: {
		//	url: "https://example3.com",
		//	clickTag: "clickTags",
		//	target: "_parent"
		// },


		// DR example:
		// clickProperty: {
		//	url: "https://dr.dk",
		// },
		


		isPoliteBanner: false,

		maxLoops: 3,
		maxAnimationTime: 0,

		renderer: {
//			scale: true,
			containerSelector: "#Animated",
			backgroundColor: 'transparent',
			assetsBaseUrl: '',
			transparent: true,
			antialias: false,
			resize:true,
			resolution:2
		},

		// Add Animated in-banner advertising
		// consoleAd: true,
		// rightClickAd: true,

		// absolute or relative path to fallback background image (or false to override fallback detection)
		fallback: "bg.jpg"

	}

	// Load asses
	this.loadQueue = [
		"bg1.png",
		"bg.jpg",
		"logo.png",
		"logo1.png",
		// "hero.png",
		"btn.png",
		"pligt.png",
		// "f1_first.png",
		"f1_1.png",
		"f1_2.png",
		"f1_3.png",
		"f1_4.png",
		"f1_5.png",
		
		"f2_1.png",
		// "f2_2.png",
		// "f2_3.png",
		// "f2_4.png",

		"f3_1.png",
		"f3_2.png",
		"f3_3.png",
		// "f3_4.png",
		// "f3_5.png",

		"f4_1.png",
		"f4_2.png",
		// "f5_1.png",
		// "f5_2.png",
		// "video_fallback.png",
		// "tvframe.png",
		"dice.json",
		
	];


	// Do initial setup of assets
	this.init = function() {
		
		// window.clickTag = window.Exit;
		
		this.loops = 0;
		this.maxLoops = 3;
		this.stageWidth = this.renderer.width/2;
		this.stageHeight = this.renderer.height/2;

		this.stage.addChild(this.assets.bg);

		this.content = new PIXI.Container();
		this.stage.addChild(this.content);
		var _yDiff = 600;
		this.content.addChild(this.assets.logo);
		this.assets.logo.anchor.set(0.5);
		// this.assets.logo.x = -530;
		this.assets.logo.y = -500 + _yDiff;
		// this.assets.logo.scale.set(0.5);
		this.content.addChild(this.assets.pligt);
		this.assets.pligt.anchor.set(0.5,0)
		// this.assets.pligt.scale.set(0.5);
		this.assets.pligt.y = 470 + _yDiff;



		this.frame2 = new PIXI.Container();
		this.content.addChild(this.frame2);
		this.addFrameTextObjects("2",this.frame2, 1);
		this.frame2.y = -600 + _yDiff;
		this.frame2.x = 0;


		this.frame3 = new PIXI.Container();
		this.content.addChild(this.frame3);
		this.frame3.position.set(-270,20 + _yDiff);
		this.addFrameSplashObjects("3",this.frame3);


		

		this.frame4 = new PIXI.Container();
		this.content.addChild(this.frame4);
		this.frame4.position.set(340,-0 + _yDiff);
		this.addFrameSplashObjects("4",this.frame4);
		this.frame4.speed = AnimatedMath.randomBetween(90,140)/100;
		this.frame4.yPos = this.frame4.y;
		this.frame4.yDiff = AnimatedMath.randomBetween(10,40)/10;

		this.frame5 = new PIXI.Container();
		this.content.addChild(this.frame5);
		this.addFrameTextObjects("5",this.frame5, 1);
		this.frame5.x = 210;
		this.frame5.y = -240 + _yDiff;


		this.content.addChild(this.assets.btn);
		this.assets.btn.anchor.set(0.5);
		// this.assets.btn.scale.set(0.5);
		this.assets.btn.xPos = 0;
		this.assets.btn.x = this.assets.btn.xPos;
		this.assets.btn.y = 410 + _yDiff;


		this.stage.addChild(this.assets.bg1);

		this.frame1Container = new PIXI.Container();
		this.stage.addChild(this.frame1Container);
		
		this.frame1 = new PIXI.Container();
		this.frame1Container.addChild(this.frame1);
		this.addFrameTextObjects("1",this.frame1,1);
		// this.frame1.x = 168/2;
		this.frame1.y = 0 + _yDiff;


		this.confettiContainer = new PIXI.Container();
		this.stage.addChild(this.confettiContainer);
		this.confettiStartX = 0;
		this.confettiStartY = 600;
		this.addDices();

		this.frame1Container.addChild(this.assets.logo1);
		// this.assets.logo1.scale.set(0.5);
		this.assets.logo1.anchor.set(0.5);
		// this.assets.logo1.x = this.stageWidth/2;
		this.assets.logo1.y = 430 + _yDiff;

		

	}


	this.showPrice = function(_obj){
		var _size = _obj.scale.x;
		Tween.to(_obj.scale, 0.2, {x:_size*0.7,y:_size*0.7,ease:Quad.easeInOut});
		Tween.to(_obj.scale, 0.8, {delay:0.2, x:_size,y:_size,ease:Elastic.easeOut.config(1)});
	}

	// Optional Callback on resize (for resize:true banners only)
	// Can be commented out when not needed
	this.resized = function(event) {

		// You have to variable available with the updated banner width and height
		// AnimatedCore.banner_w
		// AnimatedCore.banner_h
		if(this.assets) {
			this.stageWidth = this.renderer.width/this.renderer.resolution;
			this.stageHeight = this.renderer.height/this.renderer.resolution;

			this.assets.bg.width = this.stageWidth;
			this.assets.bg.height = this.stageHeight;
			this.assets.bg1.width = this.stageWidth;
			this.assets.bg1.height = this.stageHeight;

			var size1 = ((this.stageWidth) /(1080/100))/100;
			var size2 = ((this.stageHeight) /(1400/100))/100;
			// var size = (this.stageWidth / ((this.contentWidth+10)/100))/100;
			var size = size1;
			if(size1>size2){
				size = size2;
			}
			// if(size>1){
			// 	size = 1;
			// }
			this.content.scale.set(size);
			this.frame1Container.scale.set(size);

			var _xPos = (this.stageWidth/2);
			var _yPos = 20;
			// console.log((this.stageWidth/2)-((1920*size)/4));
			this.frame1Container.x = _xPos;
			this.frame1Container.y = _yPos;
			this.content.x = _xPos;
			this.content.y = _yPos;

			// this.assets.pligt.scale.set(size);
			// this.assets.pligt.y = this.stageHeight - this.assets.pligt.height;
			// this.assets.pligt.x = (this.stageWidth/2) - (this.assets.pligt.width/2);

		}

	}


	// Start animating!
	this.start = function() {
		
		this.doHover(this.assets.f3_1);
		this.doHover(this.assets.f3_2);

		// this.frame4.yDiff = this.assets.f3_2.yDiff;
		// this.frame4.speed = this.assets.f3_2.speed;

		this.doHover(this.frame4);
		// this.doHover(this.assets.f3_4);
		// this.doHover(this.assets.f3_5);
		Tween.delayedCall(0, this.frame1In.bind(this));
	}

	this.doHover = function(_obj){
		_obj.yDiff*=-1;
		Tween.to(_obj, _obj.speed, {y:_obj.yPos + _obj.yDiff, ease:Quad.easeInOut});
		Tween.delayedCall(_obj.speed, this.doHover.bind(this),[_obj]);
	}
	// Add your frames here
	this.frame1In = function() {
		Tween.delayedCall(.2,this.doConfettiBurst.bind(this),[800,13,10]);
		Tween.delayedCall(0, this.showFrame.bind(this),[this.frame1]);
		Tween.delayedCall(3.4, this.frame1Out.bind(this));
		// Tween.delayedCall(1, this.frame1Out.bind(this));
	}

	this.frame1Out = function() {
		Tween.delayedCall(0.6, this.hideFrame.bind(this),[this.frame1]);
		
		Tween.delayedCall(0.1, function(){this.frame1Container.visible = false;}.bind(this));
		Tween.delayedCall(0.1, function(){this.assets.bg1.visible = false;}.bind(this));
		Tween.delayedCall(0, this.frame2In.bind(this));
	}


	this.frame2In = function(){
		this.showFrame(this.frame2);
		// this.showFrame(this.frame5);

		Tween.delayedCall(0.5, this.showFrame.bind(this), [this.frame5]);

		this.splashesOn(this.frame3);
		// this.splashesOn(this.frame4);
		Tween.fromTo(this.assets.btn.scale, 0.6, {x:0, y:0},{delay:0.6, x:1, y:1, ease:Elastic.easeOut.config(0.3)});
		Tween.delayedCall(0.4, this.splashesOn.bind(this),[this.frame4]);

		this.assets.f4_2.alpha = 0;
		Tween.delayedCall(2.5, this.turnSplash.bind(this));

		Tween.delayedCall(1.5, this.showPrice.bind(this), [this.assets.f3_2]);
		Tween.delayedCall(3.5, this.showPrice.bind(this), [this.assets.f3_2]);

		Tween.delayedCall(1.7, this.shakeStart.bind(this),[this.assets.btn, true]);
		Tween.delayedCall(3.8, this.shakeStart.bind(this),[this.assets.btn, true]);

		this.loops++;
		if(this.loops<this.maxLoops){
			Tween.delayedCall(6.5, this.frame2Out.bind(this));
		}
	}
	this.turnSplash = function(){
		Tween.to(this.frame4.scale, 0.15, {x:0, ease:Quad.easeIn});
		Tween.to(this.assets.f4_2, 0, {delay:0.15, alpha:1});
		Tween.to(this.frame4.scale, 0.15, {delay:.15, x:1, ease:Quad.easeOut});
	}
	this.frame2Out = function(){
		this.hideFrame(this.frame2);
		this.hideFrame(this.frame5);
		this.splashesOff(this.frame3);
		this.splashesOff(this.frame4);
		Tween.delayedCall(0, function(){this.frame1Container.visible = true;}.bind(this));
		Tween.delayedCall(0, function(){this.assets.bg1.visible = true;}.bind(this));
		Tween.delayedCall(0.3, this.frame1In.bind(this));
	}
	


	this.splashesOn = function(_frame){
		var _speed = 0.85;
		for(var i = 0; i<_frame.children.length; i++){
			var letterObj = _frame.getChildAt(i);
			Tween.fromTo(letterObj.scale,_speed,{x:0, y:0},{delay:i*0.1, x:1, y:1, ease:Elastic.easeOut.config(0.3)});
		}

	}

	this.splashesOff = function(_frame){
		var _speed = 0.3;
		for(var i = 0; i<_frame.children.length; i++){
			var letterObj = _frame.getChildAt(i);
			Tween.fromTo(letterObj.scale,_speed,{x:1, y:1},{delay:i*0.05, x:0, y:0, ease:Back.easeIn});
		}

	}


	this.showFrame = function(_frame){
		var _speed = 0.5;
		for(var i = 0; i<_frame.children.length; i++){
			var letterObj = _frame.getChildAt(i);
			Tween.fromTo(letterObj,_speed,{x:this.stageWidth},{delay:i*0.05, x:0, ease:Elastic.easeOut.config(0.1)});
		}

	}

	this.hideFrame = function(_frame){
		var _speed = 0.3;
		for(var i = 0; i<_frame.children.length; i++){
			var letterObj = _frame.getChildAt(i);
			Tween.to(letterObj,_speed,{delay:i*0.05, x:this.stageWidth + letterObj.width, ease:Expo.easeIn});
		}

	}


	this.addFrameSplashObjects = function(_frameNum, _container){
		var i=1
		while(this.assets["f" + _frameNum + "_" + i]){
			var assetObj = this.assets["f"+ _frameNum + "_" + i];
			_container.addChild(assetObj);
			assetObj.anchor.set(0.5);
			assetObj.scale.set(0); 
			assetObj.yPos = assetObj.y; 
			assetObj.speed = AnimatedMath.randomBetween(90,140)/100;
			assetObj.yDiff = AnimatedMath.randomBetween(10,40)/10;
			i++;
		}
	}

	this.addFrameTextObjects = function(_frameNum, _container, _alpha){
		var i=1
		while(this.assets["f" + _frameNum + "_" + i]){
			var assetObj = this.assets["f"+ _frameNum + "_" + i];
			_container.addChild(assetObj);
			assetObj.anchor.set(0.5); 
			// assetObj.scale.set(0.5); 
			assetObj.x = this.stageWidth;
			assetObj.alpha = _alpha;
			i++;
		}
	}






	this.shakeStart = function(btnObj, elastic) {
        btnObj.elastic = elastic;
        btnObj.shakeNum = 0;
        btnObj.shakesTotal = 1;
        btnObj.shakeSpeed = .13;  
        btnObj.shakeDistance = 6;
        btnObj.shakeNum = 0;
        TweenLite.to(btnObj, 0, { delay: 0.3, x: btnObj.xPos, ease: Quad.easeInOut, onComplete: this.shakeLeft.bind(this), onCompleteParams:[btnObj] });
    };
    this.shakeLeft = function(btnObj) {
        TweenLite.to(btnObj, btnObj.shakeSpeed, { x: btnObj.xPos - btnObj.shakeDistance, ease: Quad.easeInOut, onComplete: this.shakeRight.bind(this), onCompleteParams:[btnObj] });
    };
    this.shakeRight = function(btnObj) {
        btnObj.shakeNum++;
        if (btnObj.shakeNum > btnObj.shakesTotal) {
            TweenLite.to(btnObj, btnObj.shakeSpeed, { x: btnObj.xPos + btnObj.shakeDistance, ease: Quad.easeInOut, onComplete: this.shakeEnd.bind(this), onCompleteParams:[btnObj]});
        } else {
            TweenLite.to(btnObj, btnObj.shakeSpeed, { x: btnObj.xPos + btnObj.shakeDistance, ease: Quad.easeInOut, onComplete: this.shakeLeft.bind(this), onCompleteParams:[btnObj]});
        }
    };
    this.shakeEnd = function(btnObj) {
    	if(btnObj.elastic){
        	TweenLite.to(btnObj, 1.5, { delay: 0, x: btnObj.xPos, ease: Elastic.easeOut, onComplete: this.onShakeEnd.bind(this), onCompleteParams:[btnObj] });
    	} else {
        	TweenLite.to(btnObj, btnObj.shakeSpeed, { delay: 0, x: btnObj.xPos, ease: Quad.easeInOut, onComplete: this.onShakeEnd.bind(this), onCompleteParams:[btnObj] });
    	}
    };
    this.onShakeEnd = function () {
        //console.log("shake btn done");
    }


    this.addDice = function () {
        var diceFrameNames = [];
        var numDiceFrames = 16;
        for (var i = 1; i < numDiceFrames; i++) {
            diceFrameNames.push("coin_" + i  +".png");
        }
        var diceAnimation = PIXI.AnimatedSprite.fromFrames(diceFrameNames);
        diceAnimation.anchor.set(0.5);
        // diceAnimation.visible = false;
        var size = AnimatedMath.randomBetween(20, 50) / 100;
        diceAnimation.scale.x = size;
        diceAnimation.scale.y = size;

        diceAnimation.x = 150;
        diceAnimation.y = this.stageHeight + 50;
        var animationSpeed = 0.6;//AnimatedMath.randomBetween(40,75)/100;
        diceAnimation.animationSpeed = animationSpeed;
        diceAnimation.rotation = (AnimatedMath.randomBetween(0,20)-10) * PIXI.DEG_TO_RAD;
        var cNum = AnimatedMath.randomBetween(1,2);

        // if(cNum<2){
	        this.confettiContainer.addChild(diceAnimation);
	    // } else {
	    //     this.confettiContainer2.addChild(diceAnimation);
	    // }

		diceAnimation.oPoint = new PIXI.Point();
		diceAnimation.oPoint.x = diceAnimation.x;
		diceAnimation.oPoint.y = diceAnimation.y;

		diceAnimation.active = false;

		this.confettiArray.push(diceAnimation);
        // diceAnimation.play();
        diceAnimation.gotoAndStop(AnimatedMath.randomBetween(0,15));
    }

    this.addDices = function () {
    	this.confettiArray = [];
        for (var i = 0; i < 150; i++) {
            this.addDice();
        }
    };

    this.doConfettiBurst = function(_spreadDelay,_speedDiff, _angleSpread){
    	// console.log(this.stageWidth,this.stageHeight);
		this.confettiBurst = true;
		var spreadDelay = _spreadDelay;
		this.slowMoSpeed = 1;
		this.burstDirection = -80;

		for(var i=0;i<this.confettiArray.length;i++){
			var confettiObj = this.confettiArray[i];
			if(confettiObj.active == false){
				var _diff = 0;
				var _burstDirection = this.burstDirection;
				if(AnimatedMath.randomBetween(1,2) == 1){
					_diff = this.assets.bg1.width;
					// console.log(this.assets.bg1.width,this.assets.bg1.height);
					_burstDirection = -100;
				}
				confettiObj.x = this.confettiStartX + _diff;
				confettiObj.y = this.confettiStartY;
				confettiObj.speed = AnimatedMath.randomBetween(40,200)/_speedDiff;
				confettiObj.ySpeed = 0;
				confettiObj.ySpeedAcc = AnimatedMath.randomBetween(50,100)/600;
				confettiObj.rotationSpeed = AnimatedMath.randomBetween(-100,100)/8;
				confettiObj.direction = _burstDirection + AnimatedMath.randomBetween(-_angleSpread,_angleSpread);
				confettiObj.active = false;
				confettiObj.alpha = 0;
				Tween.delayedCall(i/spreadDelay, function(){this.alpha = 1; this.active = true;}.bind(confettiObj));

				// Tween.fromTo(confettiObj.scale,0.3,{x:0.4,y:0.4},{delay:i/spreadDelay, x:confettiObj.size, y:confettiObj.size, ease:Quad.easeIn});
			}
		}
		//Tween.delayedCall(1, function(){this.slowMoSpeed = 0.2;}.bind(this));
	}
	this.confetteHandler = function(){
		for(var i=0;i<this.confettiArray.length;i++){

			var confettiObj = this.confettiArray[i];
			if(confettiObj.active==true){
				confettiObj.alpha = 1;
				confettiObj.speed*=0.9999;
				confettiObj.ySpeed += confettiObj.ySpeedAcc*this.slowMoSpeed;
				confettiObj.y += confettiObj.ySpeed*this.slowMoSpeed;
				confettiObj.rotationSpeed*=0.99;
				confettiObj.rotation += (confettiObj.rotationSpeed * PIXI.DEG_TO_RAD)*this.slowMoSpeed;
				confettiObj.oPoint.x = confettiObj.x;
				confettiObj.oPoint.y = confettiObj.y;
				var nextPos = AnimatedMath.getNextPointInDirection(confettiObj.oPoint, confettiObj.direction, confettiObj.speed*this.slowMoSpeed);
				confettiObj.x = nextPos.x;
				confettiObj.y = nextPos.y;

			}
			if(confettiObj.x > this.stageWidth+100 || confettiObj.x < -100 || confettiObj.y > this.stageHeight+AnimatedMath.randomBetween(0,500)){
				confettiObj.active = false;
				confettiObj.alpha = 0;
			}
		}

	}


	// WHEN USING THIS - REMEMBER TO UPDATE manifest.json WITH MATHCING CLICKTAGS
	// Optional clicktag settings
	// (banner defaults to one clickTag on container if this function is removed)

	// this.setupClickTag = function() {


	// 	// Adform example
	// 	AnimatedCore.button(this.assets.bg, {clickTag:"clickTag", url:"https://example.com/"});


	// 	// DR example
	// 	// AnimatedCore.button(this.assets.carsten, {url:"https://dr.dk/1"});
	// 	// AnimatedCore.button(this.assets.carsten_red, {url:"https://dr.dk/2"});


	// 	// Google example
	// 	// AnimatedCore.button(this.assets.carsten, {clickTag:"clickTag"});
	// 	// AnimatedCore.button(this.assets.carsten_red, {clickTag:"clickTag2"});

	// }



	this.onBannerRender = function() {
		if(this.confettiBurst){
			this.confetteHandler();
		}
//		console.log("render banner");
	}


	this.onBannerStopped = function() {
//		console.log("banner stopped");
	}

}



