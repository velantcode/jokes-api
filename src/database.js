import mongoose from 'mongoose';
import { DBParams } from './DBParams';
import { showConsoleError, showConsoleLog } from './Functions/GlobalFunctions';

const { NODE_ENV } = process.env;

export default async function Database() {
  try {
    const { DDB_HOST, DDB_NAME, DDB_PASSWORD, DDB_USER } = DBParams[NODE_ENV === 'test' ? 'test' : 'env'];

    if (DDB_HOST || DDB_NAME) {
      const mongoOptions = {
        dbName: DDB_NAME,
        auth: {
          username: DDB_USER || undefined,
          password: DDB_PASSWORD || undefined,
        },
      };
      await mongoose.connect(DDB_HOST, mongoOptions);
      showConsoleLog('DB Connected.');
    } else {
      showConsoleError('database', 'Require database params!');
    }
  } catch (error) {
    showConsoleError('database', error);
  }
}
