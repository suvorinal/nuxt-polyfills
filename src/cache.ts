import { LRUCache } from 'lru-cache'

const options = {
  max: 50,
  maxSize: 50_000_000,
  sizeCalculation: (n: string) => n.length,
  ttl: 1000 * 30,
  updateAgeOnHas: true,
}

const cache = new LRUCache(options)

export default cache
