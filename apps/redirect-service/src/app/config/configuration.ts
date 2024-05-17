import process from 'process';

const error = (name: string) => {
  throw new Error(`Environment variable ${name} is not defined`);
};

export default () => ({
  MONGODB_CONNECTION_URI:
    process.env.MONGODB_CONNECTION_URI || error('MONGODB_CONNECTION_URI'),
});
