(function (document, requestAnimationFrame, CACHE, IE9TO11) {
	function onload() {
		var xhr = this, x = document.createElement('x'), s = xhr.s;

		x.innerHTML = xhr.responseText;

		xhr.onload = function () {
			s.splice(0).map(function (array) {
				var g = x.querySelector('#' + array[1]);

				if (g) {
					g = g.cloneNode(true);

					g.removeAttribute('id');

					array[0].appendChild(g);
				}
			});
		};

		xhr.onload();
	}

	function onframe() {
		var use;

		while ((use = document.getElementsByTagName('use')[0])) {
			var
			svg = use.parentNode,
			url = use.getAttribute('xlink:href').split('#'),
			url_root = url[0],
			url_hash = url[1],
			xhr = CACHE[url_root] = CACHE[url_root] || new XMLHttpRequest();

			svg.removeChild(use);

			if (!xhr.s) {
				xhr.s = [];

				xhr.open('GET', url_root);

				xhr.onload = onload;

				xhr.send();
			}

			xhr.s.push([svg, url_hash]);

			if (xhr.readyState === 4) xhr.onload();
		}

		requestAnimationFrame(onframe);		
	}

	if (IE9TO11) {
		onframe();
	}
})(
	document,
	window.requestAnimationFrame || window.setTimeout,
	{},
	/Trident\/[567]\b/.test(navigator.userAgent)
);
