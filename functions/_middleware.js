export async function onRequest(context) {
  try {
    var result =  await context.next();
   let value = await context.env.MY_KV_NAMESPACE.get("mykey");
   result.headers.append(
      "x-workers-hello",
      value
    );
    return result;
  } catch (err) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 });
  }
}
