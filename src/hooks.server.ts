import type {Handle} from '@sveltejs/kit'
export const handle: Handle = async ({event, resolve}) => {
  console.log('event.request.method', event.request.method)
  if (event.request.method == 'POST') {
    event.request.headers.append('x-prerender-revalidate', '0VkJCrieFXnOIRGqLdqf')
  }
  const response = await resolve(event)
  return response
}
