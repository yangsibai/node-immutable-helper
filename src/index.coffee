Immutable = require 'immutable'

immutableHelper =
    getByPath: (obj, path)->
        unless obj instanceof Immutable.Collection
            throw new Error 'first argument should be a Immutable Collection'
        if not path or not path.trim()
            return obj
        roads = path.split('/')
        res = obj
        for road in roads
            res = res.get(road)
        res

    setByPath: (obj, path, val)->
        unless obj instanceof Immutable.Collection
            throw new Error 'first argument should be a Immutable Collection'
        if not path or not path.trim()
            return obj
        while path
            slashIndex = path.lastIndexOf '/'
            k = path.substring slashIndex + 1, path.length
            path = path.substring 0, slashIndex
            val = this.getByPath(obj, path).set k, val
        val

    pushByPath: (obj, path, val)->
        unless obj instanceof Immutable.Collection
            throw new Error 'first argument should be a Immutable Collection'
        if not path or not path.trim()
            return obj
        this.setByPath obj, path, this.getByPath(obj, path).push(val)

    deleteByPath: (obj, path)->
        unless obj instanceof Immutable.Collection
            throw new Error 'first argument should be a Immutable Collection'
        if not path or not path.trim()
            return obj
        slashIndex = path.lastIndexOf '/'
        k = path.substring slashIndex + 1, path.length
        path = path.substring 0, slashIndex
        this.setByPath obj, path, this.getByPath(obj, path).delete(k)

    findByProperty: (list, propName, propVal)->
        return list.find (item)->
            return item.get(propName) is propVal

module.exports = immutableHelper
