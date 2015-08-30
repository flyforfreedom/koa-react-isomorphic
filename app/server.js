import 'babel/polyfill';

import koa         from 'koa';
import debug       from 'debug';
import * as config from 'config/middlewares/config';
import apis        from './server/apis/base';
import controllers from './server/controllers/base';

const PORT = process.env.PORT || 3000;
const app = koa();

// setup middlewares
config.initialLayer(app);
config.errorLayer(app);
config.apiLayer(app, apis);
config.securityLayer(app);
config.renderLayer(app, controllers);

// error logs
app.on('error', function(error) {
  debug('error')(error);
});

app.listen(PORT);
console.log(`Server listening on port ${PORT}`);

export default app;
