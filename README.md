<div align="center">
  <h1>zept</h1>
  🔭 Nodejs HTTP Library for performance
  <div>
    <a href="https://www.npmjs.com/package/zept">npm</a> 
    <a href="https://github.com/zely-js/zept">github</a> 
    <a href="https://zely.netlify.app/packages/zept">docs</a>
  </div>
</div>

---

## Installation

```bash
npm install --save-dev zept
```

## Usage

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

zept(routes).listen(3000);
```

## License

MIT
