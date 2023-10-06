export const handle = async ({resolve, event}) => {
  const response = await resolve(event)
  if (event.url.pathname.startsWith('/api') && event.request.method === 'POST') {
    response.headers.append('Access-Control-Allow-Origin', `*`)
  }
  return response
}
