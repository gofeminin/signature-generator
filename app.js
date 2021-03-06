(function(window, document){
	var _APP = null;
	var _OUTPUT = null;
	var _INPUTCOUNTER = 0;
	var _HTML_TEMPLATE_FILE = '';
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
		var node = null;
		var node_container = createEl('div', null, [['class', 'inputbox']]);
		var label = null;
		var nodeid = '';
		switch(data.type) {
			case 'input':
				nodeid = data.id || 'text' + _INPUTCOUNTER;
				node = createEl('input', null, [
					['id', nodeid],
					['type', 'text'],
					['name', data.name],
					['value', data.value || ''],
					['placeholder', data.placeholder || '']
				]);
				break;
			case 'button':
				nodeid = data.id || 'button' + _INPUTCOUNTER;
				node = createEl('button', data.text, [
					['id', nodeid],
					['value', data.value || '']
				]);
				break;
			case 'checkbox':
				nodeid = data.id || 'checkbox' + _INPUTCOUNTER;
				node = createEl('input', null, [
					['id', nodeid],
					['type', 'checkbox'],
					['name', data.name],
					['value', data.value || '']
				]);
				break;
			default:
				break;
		}
		node_container.appendChild(node);
		if (data.label) {
			label = createEl('label', data.label, [
				['for', nodeid]
			]);
			node_container.appendChild(label);
		}
		_INPUTCOUNTER = _INPUTCOUNTER+1;
		return node_container;
	};
	var loadTemplateFromJson = function(filename) {
		var app_container = query('#app');
		app_container.innerHTML = '';
		var dataCallback = function(json) {
			_HTML_TEMPLATE_FILE = json.html_template_file;
			var elementsCallback = function(el_data) {
				var node = createTemplateEl(el_data);
				_APP.appendChild(node);
			};
			json.data.forEach(elementsCallback);
			query('#btn_gen_show').addEventListener('click', generateSignature);
			query('#btn_gen_download').addEventListener('click', generateSignature);
		};
		getData('data/' + filename, dataCallback);
	};
	var getValues = function() {
		var map = {};
		var inputs = queryAll('input');
		var inputsCallback = function(input) {
			var key = input.name;
			var value = input.value;
			if (input.type === 'checkbox') {
				value = input.checked;
			}
			map[key] = value;
		};
		inputs.forEach(inputsCallback);
		return map;
	};
	var download = function(filename, contents) {
		var el = createEl('a', 'tempdl', [
			['href', 'data:text/html;charset=utf-8,' + encodeURIComponent(contents)],
			['download', filename],
			['style', 'display:none;']

		]);
		document.body.appendChild(el);
		el.click();
		document.body.removeChild(el);
	};
	var generateSignature = function(evt) {
		var mode = evt.target.value;
		var values = getValues();
		var template = null;
		var getDataCallback = function(html) {
			template = ejs.render(html, values);
			if (mode === 'show') {
				_OUTPUT.style.border = '1px solid #000';
				_OUTPUT.style.overflow = 'auto';
				_OUTPUT.innerHTML = template;
			} else {
				download('signature.html', template);
			}
		};
		getData('./templates/' + _HTML_TEMPLATE_FILE, getDataCallback,
			{dataType: 'text'});
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
			_APP = query('#app');
			_OUTPUT = query('#output');
			json.portals.forEach(portalsCallback);
			var select = createEl('select', portals);
			select.addEventListener('change', selectChangeCallback);
			_APP.appendChild(select);
		};
		getData('portals.json', cb);
	};
	var init = function() {
		renderPortalSelection();
	};
	init();
})(window, document);

