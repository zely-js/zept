# Zept

```js
const { zept } = require('zept');
const routes = [
  {
    path: '/',
    module: (req, res) => {
      res.end('Hello World');
    },
  },
  {
    path: '/book/:id',
    module: (req, res) => {
      res.end(req.params.id);
    },
  },
];

const app = zept(routes);

app.routes.push({
  path: '/foo',
  module: (req, res) => {
    res.end('bar');
  },
});

app.listen(3000);
```
