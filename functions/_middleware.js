export async function onRequest(context) {
  try {
    context.request.headers.set("cache-control", "max-age=604800");
    context.request.headers.set("hello", "world");
   console.log("Hello Krishnan");
    console.log(JSON.stringify(context.request.headers));
    var result =  await context.next();
   let value = await context.env.MY_KV_NAMESPACE.get("mykey");
   result.headers.append(
      "x-workers-hello",
      value
    );
   result.headers.set("cache-control", "s-maxage=604800");
    return result;
  } catch (err) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 });
  }
}
