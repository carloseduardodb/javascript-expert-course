const http = require('http');
const DEFAULT_USER = {
  username: 'admin',
  password: 'admin'
}
const routes = {
  '/contact:get': (request, response) => {
    response.write('contact us page')
    return response.end()
  },
  '/login:post': async (request, response) => {
    for await (const data of request) {
      const user = JSON.parse(data)
      if (user.username === DEFAULT_USER.username && user.password === DEFAULT_USER.password) {
        response.write('Login has succeeded')
        return response.end()
      } else {
        response.writeHead(401)
        response.write('Login has failed')
        return response.end()
      }
    }
  },
  default: (request, response) => {
    response.write('Hello World!');
    response.end();
  }
}

const handler = function (request, response) {
  const { method, url } = request;
  const routeKey = `${url}:${method.toLowerCase()}`;
  const chosen = routes[routeKey] || routes.default;
  response.writeHead(200, { 'Content-Type': 'text/html' });
  return chosen(request, response);
}

const app = http.createServer(handler).listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});

module.exports = app;