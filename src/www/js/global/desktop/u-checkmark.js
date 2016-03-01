
// global function to add checkmark
u.addCheckmark = function(node) {

	// u.bug("add checkmark:" + node.current_readstate + ", " + u.nodeId(node.parentNode) + ", " + (node.current_readstate ? (u.txt["readstate-read"] + ", " + u.date("Y-m-d H:i:s", node.current_readstate)) : u.txt["readstate-not_read"])); 

	node.checkmark = u.svg({
		"name":"checkmark",
		"node":node,
		"class":"checkmark "+(node.current_readstate ? "read" : "not_read"),
		"title":(node.current_readstate ? (u.txt["readstate-read"] + ", " + u.date("Y-m-d H:i:s", node.current_readstate)) : u.txt["readstate-not_read"]),
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
	node.checkmark.node = node;
}

// global function to remove checkmark
u.removeCheckmark = function(node) {
	if(node.checkmark) {
		node.checkmark.parentNode.removeChild(node.checkmark);
		node.checkmark = false;
	}
}