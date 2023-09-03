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
    module: {
      post: (req, res) => {
        res.end(`Book Id : ${req.params.id}`);
      },
    },
  },
];

const app = zept(routes);

app.pageNotFound((req, res) => {
  res.status(404).end('Page Not Found');
});

setTimeout(() => {
  app.routes.push({
    path: '/foo',
    module: (req, res) => {
      res.end('bar');
    },
  });
  console.log('Page Added');
}, 5000);

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
