'use strict';
var Immutable, assert, immutableHelper;

assert = require('assert');

Immutable = require('immutable');

immutableHelper = require('../src/index');

describe('immutable helper test', function () {
  var list, map;
  map = Immutable.Map({
    a: Immutable.Map({
      b: 1
    }),
    foo: Immutable.List([0])
  });
  list = Immutable.List([Immutable.List([0]), Immutable.List([1])]);
  describe('get by path test', function () {
    it('map: empty path should return itself', function () {
      var res;
      res = immutableHelper.getByPath(map, '');
      return assert(Immutable.is(map, res));
    });
    it('map: should get right submap', function () {
      var res;
      res = immutableHelper.getByPath(map, 'a');
      return assert(Immutable.is(map.get('a'), res));
    });
    it('map: deeper level', function () {
      var res;
      res = immutableHelper.getByPath(map, 'a/b');
      return assert(map.get('a').get('b'), res);
    });
    it('map: get', function () {
      var map = Immutable.Map({
        foo: Immutable.Map({
          bar: 1
        })
      });

      assert.ok(immutableHelper.getByPath(map, 'foo/bar') === 1);
    });
    it('list: empty', function () {
      var res;
      res = immutableHelper.getByPath(list, '');
      return assert(Immutable.is(list, res));
    });
    it('list: shallow', function () {
      var res;
      res = immutableHelper.getByPath(list, '0');
      return assert(Immutable.is(list.get(0), res));
    });
    it('list: deep', function () {
      var res;
      res = immutableHelper.getByPath(list, '1/0');
      return assert(list.get(1).get(0), res);
    });
    it('list: get', function () {
      var list = Immutable.fromJS([{foo: 'foo'}, {bar: 2}]);
      assert.ok(immutableHelper.getByPath(list, '1/bar') === 2);
    });
  });
  describe('set by path test', function () {
    it('map: empty path set not work', function () {
      var res;
      res = immutableHelper.setByPath(map, '', 1);
      return assert(Immutable.is(map, res));
    });
    it('map: shallow set', function () {
      var res;
      res = immutableHelper.setByPath(map, 'a', 2);
      return assert(res, map.set('a', 2));
    });
    it('map: deeper set', function () {
      var res;
      res = immutableHelper.setByPath(map, 'a/b', 3);
      return assert(res, map.set('a', map.get('a').set('b', 3)));
    });
    it('map: set', function () {
      var map = Immutable.fromJS({
        foo: {
          bar: 1
        }
      });

      var newMap = immutableHelper.setByPath(map, 'foo/bar', 2);
      assert.ok(newMap.get('foo').get('bar') === 2);
    });
    it('list: empty', function () {
      var res;
      res = immutableHelper.setByPath(list, '', 1);
      return assert(Immutable.is(list, res));
    });
    it('list: shallow set', function () {
      var res;
      res = immutableHelper.setByPath(list, '0', 1);
      return assert(Immutable.is(list.set(0, 1), res));
    });
    it('list: deep', function () {
      var res = immutableHelper.setByPath(list, '1/0', 2);
      return assert(Immutable.is(res, list.set(1, list.get(1).set('0', 2))));
    });
    it('list: set', function () {
      var list = Immutable.fromJS([[0, 1], [1, 2]]);
      var newList = immutableHelper.setByPath(list, '1/0', 3);
      assert.ok(newList.get(1).get(0) === 3);
    });
  });
  describe('push by path test', function () {
    it('push test', function () {
      var res;
      res = immutableHelper.pushByPath(list, '0', 1);
      return assert(res.get(0).get(1), 1);
    });
    it('push to list of map test', function () {
      var res = immutableHelper.pushByPath(map, 'foo', '1');
      assert.equal(res.get('foo').get(1), 1);
    });
    it('push', function () {
      var map = Immutable.fromJS({
        foo: [0, 1]
      });
      var newMap = immutableHelper.pushByPath(map, 'foo', 3);
      assert.ok(newMap.get('foo').get(2) === 3);
    });
    it('list push', function () {
      var list = Immutable.fromJS([[0], [1, [2]]]);
      var newList = immutableHelper.pushByPath(list, '1/1', 3);
      assert.ok(newList.get(1).get(1).get(1) === 3);
    });
  });
  describe('delete by path test', function () {
    it('delete test', function () {
      var res;
      res = immutableHelper.deleteByPath(list, '1', 0);
      return assert(res.get(1).size, 0);
    });
    it('delete by path', function () {
      var map = Immutable.fromJS({
        foo: {
          bar: 1,
          baz: 2
        }
      });

      var newMap = immutableHelper.deleteByPath(map, 'foo/baz');
      assert.ok(newMap.get('foo').get('baz') === undefined);
    });
    it('delete', function () {
      var list = Immutable.fromJS({
        foo: {
          bar: [0, 1]
        }
      });
      var newList = immutableHelper.deleteByPath(list, 'foo/bar/1');
      assert.ok(newList.get('foo').get('bar').get(1) === undefined);
    });
  });
  describe('find by property', function () {
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
    assert.ok(item.get('name') === 'baz');
  });
});
