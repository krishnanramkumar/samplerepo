export async function onRequest(context) {
	try {

                var request = context.request()
                  const keys = []

  // Check for custom headers
  		for (const [key, value] of request.headers.entries()) {
    		// Check if the header key starts with 'x-' or 'X-' (common prefix for custom headers)
    		if (key.startsWith('x-') || key.startsWith('X-')) {
      			keys.push(value)
    		}
  		}
                
		var result = await context.next();
		//var keys = ['fourhundredkb', 'fivetwelvebytes', 'onekb'];
        for (const item of keys){
		    let before_time = Date.now();
                    let value = await context.env.MY_KV_NAMESPACE.get(item);
		    let after_time = Date.now();
		    if (value == null)
                     {
                        result.headers.append(item, "Error fetching from  KV");
                      }else {
                    let diff = (after_time - before_time).toString();	
		    result.headers.append(item, diff);
                     }
        }
		return result;
	} catch (err) {
		return new Response(`${err.message}\n${err.stack}`, { status: 500 });
	}
}

