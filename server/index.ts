import { serve } from 'bun';
import { sequelize } from './config/database';
import honoRouter from './routes';

const startServer = async () => {
  try {
    
    // await sequelize.authenticate();
    // console.log('Connection has been established successfully.');

    // await sequelize.sync();
    // console.log('Database & tables created!');

    serve({
        fetch: honoRouter.fetch,
        port: 8080,
    });

    console.log('Server is running on port 8080');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
};

startServer();