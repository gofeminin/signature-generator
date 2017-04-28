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
	var getData = function(url, cb, opts) {
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
	var createTemplateEl = function(data) {
		var node_name = 'input';
		switch(data.type) {
			case 'input':
				break;
			case 'checkbox':
				break;
			default:
				break;
		}
	};
	var loadTemplateFromJson = function(filename) {
		var app_container = query('#app');
		app_container.innerHTML = '';
		var dataCallback = function(json) {
			var elementsCallback = function(elData) {
				console.log(elData);
			};
			json.data.forEach(elementsCallback);
		};
		getData('data/' + filename, dataCallback);
	};
	var renderPortalSelection = function() {
		var portals = [createEl('option', '', [['value', '']])];
		var portalsCallback = function(portal) {
			var el = createEl('option', portal.name, [
				['value', portal.data]
			]);
			portals.push(el);
		};
		var selectChangeCallback = function(evt) {
			var selectedIndex = this.selectedIndex,
					selectedItem = this.children[selectedIndex],
					selectedValue = selectedItem.value;
			if (selectedValue === '') {
				return;
			}
			else {
				loadTemplateFromJson(selectedValue);
			}
		};
		var cb = function(json) {
			json.portals.forEach(portalsCallback);
			var select = createEl('select', portals);
			select.addEventListener('change', selectChangeCallback);
			query('#app').appendChild(select);
		};
		getData('portals.json', cb);
	};
	var init = function() {
		renderPortalSelection();
	};
	init();
})(window, document);

