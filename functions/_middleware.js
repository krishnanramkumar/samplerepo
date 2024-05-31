addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

/**
 * Respond with custom headers
 * @param {Request} request
 */
async function handleRequest(request) {

  // Fetch the response from the origin
  const response = await fetch(request);

  // Clone the response to modify the headers
  const modifiedResponse = new Response(response.body, {
    ...response,
    headers: new Headers({
      ...response.headers,
      'X-Custom-Response-Header': 'CustomResponseHeaderValue',
    }),
  });

  return modifiedResponse;
}
