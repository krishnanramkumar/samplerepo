addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const response = await fetch(event.request);
  // Add custom header here
  response.headers.set('X-Custom-Header', 'krishnan');
  return response;
}
