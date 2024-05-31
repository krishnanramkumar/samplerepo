export default async function(request) {
  // Your middleware logic here
  const response = await fetch(event.request);
  // Modify response headers (optional)
  response.headers.set('X-Custom-Header', 'My Value');
  return response;
}
