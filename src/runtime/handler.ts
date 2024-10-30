import {
  defineEventHandler,
  getHeader,
  setHeader,
} from 'h3'
import { getPolyfills } from '../helpers'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const features = config.public.nuxtPolyfills.features
  const ua = getHeader(event, 'User-Agent')

  setHeader(event, 'Content-Type', 'application/javascript; charset=utf-8')

  return getPolyfills(ua, features)
})
