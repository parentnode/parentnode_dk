const banner_info = document.querySelector("var.badnamnam");

console.log(banner_info.dataset);

const topnavigation = window.top.document.querySelector(".topbar, #sitehead, .jp-header, .navmenu, .masthead, .globalHeader, #wrapHeader, #siteHeader, #sdk-header");
const whitespace =  topnavigation ? (topnavigation.offsetHeight || 185) : 185;
const creativeHeight = window.parent.innerHeight - whitespace;

const frame = window.frameElement;
frame.style.cssText = `
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: ${creativeHeight}px;
	vertical-align: initial;
	border:0;
`;

const placement = frame.parentElement.parentElement;
placement.style.cssText = `
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;
	width: 100%;
	height: ${creativeHeight}px;
	clip: rect(auto, auto, auto, auto);
`;

const polPosition = placement.parentElement;
polPosition.classList.add("interscrollerAd");
polPosition.style.cssText = `
	height: ${creativeHeight}px;
	max-height: ${creativeHeight}px;
`;

// function updateTrackingUrl() {
// 	iframe.documentElement.clickTag = this.tracking_url + encodeURIComponent(iframe.documentElement.clickTag);
// }


const iframe = document.createElement("iframe");
let tracking_url = banner_info.dataset.singleClick;
// console.log(tracking_url);

// document.addEventListener(iframe, "load", updateTrackingUrl);



iframe.setAttribute('style', 'width:100%;height:100%;border:0;');
iframe.setAttribute('allow', 'autoplay; fullscreen');
iframe.setAttribute('scrolling', 'no');

if(banner_info.dataset.bannerUrl) {
	loadIframe(banner_info.dataset.bannerUrl);
}
else if(banner_info.dataset.bannerId) {
	loadIframe("https://parentnode.dk/badnamnam/banner?id="+banner_info.dataset.bannerId);
}


const iframeDiv = document.createElement("div");
iframeDiv.setAttribute(
	'style',
	'position:fixed;width:100%;height:' +
	creativeHeight +
	'px;background-position:center;background-size:cover;background-repeat:no-repeat;background-attachment:fixed;cursor:pointer;z-index:1000'
);
iframeDiv.appendChild(iframe);


placement.appendChild(iframeDiv);

const svgDiv = document.createElement("div");
svgDiv.innerHTML = `
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="#ffffff">
		<path d="M24 0C10.7 0 0 10.7 0 24s10.7 24 24 24 24-10.7 24-24S37.3 0 24 0zm13.4 21.4L24 34.8 10.6 21.4c-.8-.8-.8-2 0-2.8s2-.8 2.8 0L24 29.2l10.6-10.6c.8-.7 2.1-.6 2.8.2.7.8.7 1.9 0 2.6z"></path>
	</svg>
`;
svgDiv.style = `
	z-index: 9999;
	position: absolute;
	bottom: 30px;
	left: 0;
	right: 0;
	width: 6%;
	min-width: 25px;
	max-width: 90px;
	height: auto;
	margin-left: auto;
	margin-right: auto;
	cursor: pointer;
	transform: translate3d(0,-15%,0);
	animation: fadeOutDown ease 2s infinite;
`;
svgDiv.addEventListener("click", (e) => {
	e.stopPropagation();
	scrolToDiv.scrollIntoView({
		behavior: "smooth",
		block: "start",
		inline: "nearest",
	});
});
const animation = document.createElement("style");
animation.innerHTML = `
	@keyframes fadeOutDown {
		0% {
			opacity: 1
		}
		75% {
			opacity: 0.8;
			transform: translate3d(0,10%,0)
		}
		100% {
			opacity: 0;
			transform: translate3d(0,15%,0)
		}
	}
`;
const scrolToDiv = document.createElement("div");
scrolToDiv.style = `
	position: absolute;
	bottom: 0;
`;
placement.appendChild(animation);
placement.appendChild(svgDiv);
placement.appendChild(scrolToDiv);

async function loadIframe(url) {

	console.log("loadIframe", url);
	const response = await fetch(url);
	let response_text = await response.text();
	console.log(response);
	if(response.ok) {
		let matches = response_text.match(/clicktag[^=]+/i);
		let update_string = "";
		if(matches) {
			let i, match;
			
			for(i = 0; i < matches.length; i++) {
				match = matches[i].trim();
				update_string += match + " = '" + tracking_url + "' + " + match + ";";
			}
		}

		// var response_url = "https://preview.animated.dk/altibox/2024/202405_altibox_1000mbit_v3/standard/desktop_topscroll_altibox/index.html";
		// var base_url = response_url.lastIndexOf("/") <= response_url.length + 1 ? response_url.substring(0, response_url.lastIndexOf("/")) + "/" : response_url; //(/\/[^$\/]+/, "/");
		// console.log(base_url, response_url.length, response_url.lastIndexOf("/"));
		var base_url = response.url;

		response_text = response_text.replace(/\<head\>/, '<head><base href="'+base_url+'" />');
		var test_string = response_text.replace(/\<\/body\>/, '<script>'+update_string+'</script></body>');
		console.log(test_string);
		
		iframe.srcdoc = test_string;

		console.log("after");
	}

	// iframe.src = url;
}
