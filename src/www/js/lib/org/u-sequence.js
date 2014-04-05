
u.sequencePlayer = function(node, options) {
	
	var player;

	// work with just one player
	if(node) {
		player = u.ae(node, "div", {"class":"sequenceplayer"});
	}
	else {
		player = document.createElement("div");
		u.ac(player, "sequenceplayer");
	}


	// playback timer
	player.t_playback = false;
	// default framerate (12 fps)
	player._framerate = 12;



	// load sequence of images
	player.load = function(images, options) {
//		u.bug("load sequence:" + images.length)
		
		this._load_callback;
		this._autoplay = false;

		// additional info passed to function as JSON object
		if(typeof(options) == "object") {
			var argument;
			for(argument in options) {

				switch(argument) {
					case "load_callback"		: this._load_callback			= options[argument]; break;
					case "autoplay"				: this._autoplay				= options[argument]; break;
				}

			}
		}


		// setup sequence / clean sequence
		this.setup(images);
	}

	// load sequence and play when loaded
	player.loadAndPlay = function(images, options) {
		
		// set autoplay to true
		options.autoplay = true;
		
		// save options for use when loading is done
		this._options = options;

		// load will automatically invoke play
		this.load(images, options);
	}


	// play currently loaded sequence
	player.play = function(options) {

		this._ended_callback = null;
		this._from = this.sequence._start;
		this._to = this.sequence._end;

		// additional info passed to function as JSON object
		if(typeof(options) == "object") {
			var argument;
			for(argument in options) {

				switch(argument) {
					case "ended_callback"	: this._ended_callback			= options[argument]; break;
					case "framerate"		: this._framerate				= (1000/options[argument]); break;

					case "to"				: this._to						= options[argument]; break;
					case "from"				: this._from					= options[argument]; break;
				}

			}
		}


//		u.bug("play sequence:" + this._from + " -> " + this._to + "@" + this._framerate + "fps")


		// playback direction
		if(this._from <= this._to) {
			this._direction = 1;
		}
		else {
			this._direction = -1;
		}


		// playback not in initial order
		if(this._from != this.sequence._start || this._to != this.sequence._end) {
//			u.bug("reorder stack")

			// hide all but first frame
			for(i = 0; i <= this.sequence._end; i++) {
				if(i == this._from) {
					u.as(this._nodes[i], "display", "block", 1);
				}
				else {
					u.as(this._nodes[i], "display", "none", 1);
				}
			}

			// set z-index for new order
			var start_z_index = 4000;
			for(i = this._from, j = 0; this._direction > 0 ? i <= this._to : i >= this._to; i += this._direction, j++) {
				u.as(this._nodes[i], "zIndex", start_z_index-j, 1);
			}

			this._current_frame = this._from;

		}




		this.playback(true);
	}



	// playback loop - continues until sequence is done
	player.playback = function(start) {

		// don't do anything on first loop
		if(!start) {
			// go to next frame
			this.nextFrame(this._current_frame);
			// set current frame
			this._current_frame = this._current_frame + this._direction;
		}

		// end loop and callback
		if(this._to == this._current_frame) {

			if(typeof(this._ended_callback) == "function") {
				this._ended_callback();
			}
			else if(typeof(this.ended) == "function") {
				this.ended();
			}

		}
		// continue loop
		else {
			this.t_playback = u.t.setTimer(this, this.playback, this._framerate);
		}

	}

	// hides last frame and reveals next frame below (part of playback handling)
	player.nextFrame = function(frame) {
//			u.bug("nextframe:" + frame)

		// prepare stack - after_next is not next frame, but frame after next frame (to be sure stack is always prepared two frame ahead)
		// this is done, because firefox causes blinking animation, if animation is started with delay
		var after_next = (this._current_frame + (this._direction*2))
		// make next frame visible
		if(this._nodes[after_next] && (this._direction > 0 ? after_next <= this._to : after_next >= this._to)) {
//			u.bug("show after_next:" + after_next);
			u.as(this._nodes[after_next], "display", "block");
		}

		// hide current frame
		if(this._nodes[frame]) {
//			u.bug("hide current:" + frame);
			u.as(this._nodes[frame], "display", "none");
		}
	}




	// TODO
	player.next = function(nodes, options) {}

	// TODO
	player.prev = function(nodes, options) {}

	// TODO
	player.pause = function() {
		u.t.resetTimer(this.t_playback);
	}
	
	// TODO
	player.stop = function() {
		u.t.resetTimer(this.t_playback);
	}


	// prepare animation for playback
	player.setup = function(images) {

//		u.bug("sequence player setup")

		if(this.sequence) {
			this.removeChild(this.sequence);
		}

		// add sequence node
		this.sequence = u.ie(this, "ul", {"class":"sequence"});
		this.sequence.player = this;


		this._images = images;
		this._nodes = new Array();

		this.sequence._start = 0;
		this.sequence._end = this._images.length-1;
		this._current_frame = 0;


		// after preloading, continue setup
		this._setup = function() {

			// stack images to make playback as light as possible
			var start_z_index = 4000;
			for(i = 0; i <= this.sequence._end; i++) {
				
				this._nodes[i] = u.ae(this.sequence, "li", {"style":"background-image: url(" + this._images[i] + "); z-index:" + (start_z_index-i) + ";"});

				// keep first two frames visible (for better performance)
				if(i > 1) {
					u.as(this._nodes[i], "display", "none", 1);
				}
				else {
					u.as(this._nodes[i], "display", "block", 1);
				}
			}

			// update dom
			this.offsetHeight;



			if(typeof(this._load_callback) == "function") {
				this._load_callback();
			}
			// or callback to default (loaded)
			else if(typeof(this.loaded) == "function") {
				this.loaded();
			}


			if(this._autoplay) {
			 	this.play(this._options);
			}

		}


		// preload image sequence
		u.preloader(this, this._images, {"callback":this._setup});

	}

	return player;
}


