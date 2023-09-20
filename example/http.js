const { ZeptServer } = require('@zept/http');
const server = new ZeptServer();

server.useProcessor((req, res, next) => {
  console.log('processor called');
  next();
});
server.use((req, res, next) => {
  console.log('middleware called');
  next();
});

server.listen(3000);
