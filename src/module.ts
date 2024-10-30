import {
  defineNuxtModule,
  addServerHandler,
  createResolver,
  addServerPlugin,
} from '@nuxt/kit'

export interface ModuleOptions {
  features?: string[]
  src?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxtPolyfills',
    configKey: 'nuxtPolyfills',
  },
  defaults: {
    src: '/_nuxt/polyfills.js',
    features: [],
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.nuxtPolyfills = {
      features: options.features,
      src: options.src,
    }

    addServerPlugin(resolver.resolve('./runtime/server/plugins/polyfill'))

    addServerHandler({
      method: 'get',
      route: options.src,
      handler: resolver.resolve('./runtime/handler'),
    })
  },
})
