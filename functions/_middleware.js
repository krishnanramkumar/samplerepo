export async function onRequest(context) {
  try {
    var result =  await context.next();
   let before_time_0 = performance.now();
   let value_0 = await context.env.MY_KV_NAMESPACE.get("onekb");
   let after_time_0 = performance.now();
   let diff_0 = (after_time_0 - before_time_0).toString();
   let before_time_1 = performance.now();
   let value_1 = await context.env.MY_KV_NAMESPACE.get("fivetwelvebytes");
   let after_time_1 = performance.now();
   let diff_1 = (after_time_1 - before_time_1).toString();
   result.headers.append(
      "onekb",
      diff_0
    );
    result.headers.append("fivetwelvebytes", diff_1);
   result.headers.set("cache-control", "s-maxage=604800");
    return result;
  } catch (err) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 });
  }
}
