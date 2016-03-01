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
        return it('list: deep', function () {
            var res;
            res = immutableHelper.getByPath(list, '1/0');
            return assert(list.get(1).get(0), res);
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
        return it('list: deep', function () {
            var res;
            res = immutableHelper.setByPath(list, '1/0', 2);
            return assert(Immutable.is(res, list.set(1, list.get(1).set('0', 2))));
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
    });
    describe('delete by path test', function () {
        return it('delete test', function () {
            var res;
            res = immutableHelper.deleteByPath(list, '1', 0);
            return assert(res.get(1).size, 0);
        });
    });
});
