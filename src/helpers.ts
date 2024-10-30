import polyfill from 'polyfill-library'
import Cache from './cache'

function getPolyfillString(uaString: string | undefined, features: string[]): Promise<string> {
  return polyfill.getPolyfillString({
    uaString,
    minify: true,
    features: Object.fromEntries(features.map((feature) => {
      return [feature, { flags: ['gated'] }]
    })),
  }) as Promise<string>
}

export async function putPolyfills(uaString: string | undefined, features: string[]) {
  const cacheKey = uaString || 'undefined'

  if (Cache.has(cacheKey)) {
    return
  }
  const str = await getPolyfillString(uaString, features)
  Cache.set(cacheKey, str)
}

export async function getPolyfills(uaString: string | undefined, features: string[]): Promise<string> {
  const cacheKey = uaString || 'undefined'

  const cached = Cache.get(cacheKey)
  if (cached) {
    return cached
  }

  return getPolyfillString(uaString, features)
}
