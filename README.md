## immutable-helper

[![NPM](https://nodei.co/npm/immutable-helper.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/immutable-helper/)

Some help methods for [Immutable.js](https://facebook.github.io/immutable-js/).

### Usage

    var immutableHelper = require('immutable-helper');
	var map = Immutable.Map({
        foo: Immutable.Map({
            bar: 1
        })
    });

	var bar = immutableHelper.findByPath(map, "foo/bar"); // bar === 1

### API

#### getByPath(obj, path)

map:

    var map = Immutable.Map({
        foo: Immutable.Map({
            bar: 1
        })
    });

    immutableHelper.getByPath(map, 'foo/bar') === 1;

list:

    var list = Immutable.fromJS([{foo: 'foo'}, {bar: 2}]);

    immutableHelper.getByPath(list, '1/bar') === 2;

#### setByPath(obj, path, val)

map:

    var map = Immutable.fromJS({
        foo: {
            bar: 1
        }
    });

    var newMap = immutableHelper.setByPath(map, 'foo/bar', 2);
    newMap.get('foo').get('bar') === 2;

list:

    var list = Immutable.fromJS([[0, 1], [1, 2]]]);
    var newList = immutableHelper.setByPath(list, '1/0', 3);
    newList.get(1).get(0) === 3;

#### pushByPath(obj, path, val)

1:

    var map = Immutable.fromJS({
        foo: [0, 1]
    });
    var newMap = immutableHelper.pushByPath(map, 'foo', 3);
    newMap.get('foo').get(2) === 3;

2.


    var list = Immutable.fromJS([[0], [1, [2]]);
    var newList = immutableHelper.pushByPath(list, '1/1', 3);
    newList.get(1).get(1).get(1) === 3;

#### deleteByPath(obj, path)

1:

    var map = Immutable.fromJS({
        foo: {
            bar: 1,
            baz: 2
        }
    });

    var newMap = immutableHelper.deleteByPath(map, 'foo/baz');
    newMap.get('foo').get('baz') === undefined;

2.

    var list = Immutable.fromJS({
        foo: {
            bar: [0, 1]
        }
    });

    var newList = immutableHelper.deleteByPath(list, 'foo/bar/1');
    newList.get('foo').get('bar').get(1) === undefined;

#### findByProperty(list, propName, propVal)

    var list = Immutable.fromJS([
      {
        id: 0,
        name: 'foo'
      },
      {
        id: 1,
        name: 'bar'
      },
      {
        id: 2,
        name: 'baz'
      }]);
    var item = immutableHelper.findByProperty(list, 'id', 2);
    item.get('name') === 'baz';

### LICENSE

MIT
