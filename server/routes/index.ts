import { Hono } from 'hono';
import { mvgReports } from './mvgReports';

const cors = (options = {}) => {
    const defaults = {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    };
  
    const settings = { ...defaults, ...options };
  
    return (c, next) => {
      c.res.headers.set('Access-Control-Allow-Origin', settings.origin);
      c.res.headers.set('Access-Control-Allow-Methods', settings.methods);
      c.res.headers.set(
        'Access-Control-Allow-Headers',
        settings.allowedHeaders || 'Content-Type, Authorization'
      );
  
      if (c.req.method === 'OPTIONS') {
        return new Response(null, {
          headers: c.res.headers,
          status: settings.optionsSuccessStatus,
        });
      }
  
      return next();
    };
  };

const hanoRouter = new Hono();

hanoRouter.use('*', cors());

hanoRouter.route('/reports', mvgReports);

export default hanoRouter;