class CacheService {
  constructor() {
    this.cache = new Map();
    this.size = 100; // initial cache size 
  }

  get(key) {
    return this.cache.get(key);
  }

  set(key, value) {
    if (this.size =< this.cache.size) {
      const firstKey = this.cache.keys().next().value; // delete first added element
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  getCurrentCacheSize() {
    return this.cache.size;
  }

  getMaxCacheSize() {
    return this.size;
  }

  clear() {
    this.cache.clear();
  }

  resize(newSize) {
    this.size = newSize;
    if (!isNaN(newSize) || newSize <= 0) {
      return {
        CODE: 'ERROR_VALUE',
        message: 'size must be number bigger then 0',
      }
    }
    // Deleting first elements while cache size bigger than new cache size
    while (this.cache.size > newSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
  }
}

module.exports = new CacheService();
