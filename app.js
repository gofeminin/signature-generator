(function(window, document){
	var query = function(sel) {
		return document.querySelector(sel);
	};
	var queryAll = function(sel) {
		return document.querySelectorAll(sel);
	};
	var createEl = function(nodeName, nodeContents, nodeAttrs) {
		var el = document.createElement(nodeName);
		if (nodeContents) {
			if (typeof nodeContents === 'string') {
				el.innerHTML = nodeContents;
			} else if (typeof nodeContents === 'object' && nodeContents.length) {
				var nodeContentsCallback = function(nodeContent) {
					el.appendChild(nodeContent);
				};
				nodeContents.forEach(nodeContentsCallback);
			} else if (typeof nodeContents === 'object' && !nodeContents.length) {
				el.appendChild(nodeContents);
			}
		}
		if (nodeAttrs && nodeAttrs.length) {
			var nodeAttrsCallback = function(nodeAttr) {
				el.setAttribute(nodeAttr[0], nodeAttr[1]);
			};
			nodeAttrs.forEach(nodeAttrsCallback);
		}
		return el;
	};
	var getData = function(url, opts, cb) {
		opts = opts || {};
		var passToCallback = function(json) {
			cb(json);
		};
		var processData = function(data) {
			switch (opts.dataType) {
				case 'text':
					data.text().then(passToCallback);
					break;
				case 'blob':
					data.blob().then(passToCallback);
					break;
				default:
					data.json().then(passToCallback);
					break;
			}
		};
		fetch(url).then(processData);
	};
	var renderPortalSelection = function() {
		var portals = [];
		var portalsCallback = function(portal) {
			var el = createEl('option', portal.name, [
				['value', portal.data]
			]);
			portals.push(el);
		};
		var cb = function(json) {
			json.portals.forEach(portalsCallback);
			var select = createEl('select', portals);
			query('#app').appendChild(select);
			console.log(portals);
		};
		getData('portals.json', null, cb);
	};
	var init = function() {
		renderPortalSelection();
	};
	init();
})(window, document);

