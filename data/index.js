const yaml = require('js-yaml'),
	  fs = require('fs');

function jsonify(file) {
	return yaml.safeLoad(fs.readFileSync(`${__dirname}/${file}`, 'utf8'));
}

module.exports = {
    "panel_boxes": jsonify("panel_boxes.yml"),
    "timesheet": jsonify("timesheet.yml"),
    "messages": jsonify("messages.yml"),
    "sidebar": jsonify("sidebar.yml"),
    "nav": jsonify("nav.yml"),
    "notifications": jsonify("notifications.yml"),
    "timeline": jsonify("timeline.yml")
}
