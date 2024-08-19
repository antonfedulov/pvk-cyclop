import { Hono, type HonoRequest } from 'hono';
import { mvgReports } from './mvgReports';

export const parseFormData = async (request: HonoRequest): Promise<any> => {
  const formData = await request.formData();
  const fields: any = {};
  const files: any = {};

  formData.forEach((value, key) => {
    if (value instanceof Blob) {
      files[key] = value;
    } else {
      fields[key] = value;
    }
  });

  return { fields, files };
};

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