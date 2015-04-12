(function(module) {
	"use strict";
	var Beam = {},
			embed = '<iframe height="280" width="500" frameborder="0" src="https://beam.pro/embed/player/$1"></iframe>';
	var	regularStreamUrl = /<a href="(?:https?:\/\/)?(?:www\.)?(?:beam\.pro)\/(.+)">.+<\/a>/g;
	var embedStreamUrl = /<a href="(?:https?:\/\/)?(?:www\.)?(?:beam\.pro)\/(?:embed)\/(?:player)\/(.+)">.+<\/a>/g;

	Beam.parse = function(data, callback) {
		if (!data || !data.postData || !data.postData.content) {
			return callback(null, data);
		}
		if (data.postData.content.match(embedStreamUrl)) {
			data.postData.content = data.postData.content.replace(embedStreamUrl, embed);
		}
		if (data.postData.content.match(regularStreamUrl)) {
			data.postData.content = data.postData.content.replace(regularStreamUrl, embed);
		}

		callback(null, data);
	};

	module.exports = Beam;
}(module));
