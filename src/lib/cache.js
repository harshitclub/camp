/**
 * In-Memory TTL Cache Manager
 * 
 * Specifically designed to protect the Supabase Free Tier:
 * - Free plan limits: 500MB DB, 2GB egress, strict API rate limits and connection limits.
 * - This cache drastically reduces read queries, bandwidth, and connection spikes
 *   by caching read-heavy endpoints (categories, assessments, certificates, forms, users)
 *   with configurable Time-To-Live (TTL).
 * - Provides tag-based and key-based cache invalidation on write/update/delete operations.
 */

class MemoryCache {
  constructor() {
    /** @type {Map<string, { value: any, expiresAt: number, tags: string[] }>} */
    this.cache = new Map();
  }

  /**
   * Retrieves an item from the cache if not expired
   * @param {string} key - Cache identifier
   * @returns {any|null} Cached value or null if miss/expired
   */
  get(key) {
    if (!key) return null;
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.value;
  }

  /**
   * Stores an item in the cache with a specified TTL in seconds
   * @param {string} key - Cache identifier
   * @param {any} value - Value to cache
   * @param {number} [ttlSeconds=60] - Expiry in seconds
   * @param {string[]} [tags=[]] - Tags for group invalidation (e.g. ['categories', 'assessments'])
   */
  set(key, value, ttlSeconds = 60, tags = []) {
    if (!key) return;
    const expiresAt = Date.now() + ttlSeconds * 1000;
    this.cache.set(key, { value, expiresAt, tags });
  }

  /**
   * Invalidate a single cache key
   * @param {string} key - Cache key to remove
   */
  invalidate(key) {
    if (!key) return;
    this.cache.delete(key);
  }

  /**
   * Invalidate all cache entries matching a tag or prefix
   * @param {string} tag - Tag name or key prefix
   */
  invalidateTag(tag) {
    if (!tag) return;
    for (const [key, entry] of this.cache.entries()) {
      if (key.startsWith(tag) || (entry.tags && entry.tags.includes(tag))) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Clears the entire cache
   */
  clear() {
    this.cache.clear();
  }

  /**
   * Helper that checks cache first, or calls async producer function and caches result
   * @template T
   * @param {string} key - Cache key
   * @param {() => Promise<T>} producer - Async function that fetches data
   * @param {number} [ttlSeconds=60] - TTL in seconds
   * @param {string[]} [tags=[]] - Associated tags for invalidation
   * @returns {Promise<T>}
   */
  async wrap(key, producer, ttlSeconds = 60, tags = []) {
    const cached = this.get(key);
    if (cached !== null && cached !== undefined) {
      return cached;
    }

    const fresh = await producer();
    if (fresh !== null && fresh !== undefined) {
      this.set(key, fresh, ttlSeconds, tags);
    }
    return fresh;
  }
}

// Global Singleton Cache Instance
export const memoryCache = new MemoryCache();
export default memoryCache;
