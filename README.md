## Interceptors

You can intercept requests or responses before they are handled by `then` or `catch`.

```js
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
```

If you need to remove an interceptor later you can.

```js
const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
```

You can also clear all interceptors for requests or responses.
```js
const instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});
instance.interceptors.request.clear(); // Removes interceptors from requests
instance.interceptors.response.use(function () {/*...*/});
instance.interceptors.response.clear(); // Removes interceptors from responses
```

You can add interceptors to a custom instance of axios.

```js
const instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});
```

When you add request interceptors, they are presumed to be asynchronous by default. This can cause a delay
in the execution of your axios request when the main thread is blocked (a promise is created under the hood for 
the interceptor and your request gets put on the bottom of the call stack). If your request interceptors are synchronous you can add a flag
to the options object that will tell axios to run the code synchronously and avoid any delays in request execution.

```js
axios.interceptors.request.use(function (config) {
  config.headers.test = 'I am only a header!';
  return config;
}, null, { synchronous: true });
```

If you want to execute a particular interceptor based on a runtime check, 
you can add a `runWhen` function to the options object. The interceptor will not be executed **if and only if** the return
of `runWhen` is `false`. The function will be called with the config
object (don't forget that you can bind your own arguments to it as well.) This can be handy when you have an
asynchronous request interceptor that only needs to run at certain times.

```js
function onGetCall(config) {
  return config.method === 'get';
}
axios.interceptors.request.use(function (config) {
  config.headers.test = 'special get headers';
  return config;
}, null, { runWhen: onGetCall });
```

### Multiple Interceptors

Given you add multiple response interceptors
and when the response was fulfilled
- then each interceptor is executed
- then they are executed in the order they were added
- then only the last interceptor's result is returned
- then every interceptor receives the result of its predecessor
- and when the fulfillment-interceptor throws
    - then the following fulfillment-interceptor is not called
    - then the following rejection-interceptor is called
    - once caught, another following fulfill-interceptor is called again (just like in a promise chain).
    
Read [the interceptor tests](./test/specs/interceptors.spec.js) for seeing all this in code.

## Handling Errors

```js
axios.get('/user/12345')
  .catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
```

Using the `validateStatus` config option, you can define HTTP code(s) that should throw an error.

```js
axios.get('/user/12345', {
  validateStatus: function (status) {
    return status < 500; // Resolve only if the status code is less than 500
  }
})
```

Using `toJSON` you get an object with more information about the HTTP error.

```js
axios.get('/user/12345')
  .catch(function (error) {
    console.log(error.toJSON());
  });
```