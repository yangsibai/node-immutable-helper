## immutable-helper

Some help methods for immutable.js.

### Usage

    var immutableHelper = require('immutable-helper');
	var map = Immutable.Map({
        a: Immutable.Map({
            b: 1
        })
    });

	var b = immutableHelper.findByPath(map, "a/b");

### API

#### getByPath(obj, path)

### setByPath(obj, path, val)

### pushByPath(obj, path, val)

### deleteByPath(obj, path)

### findByProperty(list, propName, propVal)

### LICENSE

MIT
