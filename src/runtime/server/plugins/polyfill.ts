import { joinURL, cleanDoubleSlashes } from 'ufo'
import {
  getHeader,
  setHeader,
} from 'h3'
import type { NitroAppPlugin } from 'nitropack'
import { putPolyfills } from '../../../helpers'
import { useRuntimeConfig } from '#imports'

export default <NitroAppPlugin> function (nitroApp) {
  const config = useRuntimeConfig()
  const { src, features } = config.public.nuxtPolyfills

  const host = cleanDoubleSlashes(joinURL(config.app.baseURL, src))

  if (host) {
    const polyfill = `<script src="${host}" fetchpriority="high"></script>`

    nitroApp.hooks.hook('render:html', (html, { event }) => {
      const ua = getHeader(event, 'User-Agent')
      if (ua) {
        putPolyfills(ua, features)
      }

      setHeader(event, 'Link', `<${host}>; rel="preload"; as="script"; fetchpriority="high"`)

      html.head.unshift(polyfill)
    })
  }
}
