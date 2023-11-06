export const DBParams = {
  test: {
    DDB_HOST: 'mongodb://0.0.0.0:27017',
    DDB_NAME: 'jokes_test',
    DDB_PASSWORD: '',
    DDB_USER: '',
  },
  env: {
    DDB_HOST: 'mongodb://0.0.0.0:27017',
    DDB_NAME: 'jokes',
    DDB_PASSWORD: '',
    DDB_USER: '',
  },
};

export default {
  DBParams,
};
