export async function onRequest(context) {
  try {
    console.log("Helloooooooo Haiiiii")
    var result =  await context.next();
    console.log(result.headers);
    return result;
  } catch (err) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 });
  }
}
