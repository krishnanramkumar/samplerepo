export async function onRequest(context) {
  try {
    var result =  await context.next();
    //let before_time_0 = Date.now();
    //let value_0 = await context.env.MY_KV_NAMESPACE.get("onekb");
    //let after_time_0 = Date.now();
    //let diff_0 = (after_time_0 - before_time_0).toString();
   //let before_time_1 = Date.now();
   //let value_1 = await context.env.MY_KV_NAMESPACE.get("fivetwelvebytes");
   //let after_time_1 = Date.now();
   //let diff_1 = (after_time_1 - before_time_1).toString();
     
     let before_time_2 = Date.now();
     //let value_2, = await context.env.MY_KV_NAMESPACE.get("fourhundredkb");
     let [value_2, fetching_from] = await fetchvaluefromKV(context, "fourhundredkb");
     let after_time_2 = Date.now();
     let diff_2 = (after_time_2 - before_time_2).toString();
   //result.headers.append(
    //  "onekb",
     // diff_0
    //);
    //result.headers.append("fivetwelvebytes", diff_1);
    result.headers.append("fourhundredkb",diff_2);
    result.headers.append("fourhundredkbvalue",value_2.substring(0,100));
    result.headers.append("fetchingfrom", fetching_from);
    return result;
  } catch (err) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 });
  }
}

let cache = {};

async function fetchvaluefromKV(context, key) {
// Check if the value is already in memory and not expired
  if (cache[key] && cache[key].expiry > Date.now()) {
    return [cache[key].value, "from local cache"];
  } else {
    // Fetch value from KV store
    const value = await context.env.MY_KV_NAMESPACE.get(key);
    // Store value in memory with a TTL of 30 seconds
    cache[key] = {
      value: value,
      expiry: Date.now() + 30000 // 30 seconds
    };
    return [cache[key].value, "from DB"];
}
}
