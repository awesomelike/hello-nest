import * as Joi from 'joi';

interface EnvConfig {
  [key: string]: string;
}

const validateConfig = (envConfig: EnvConfig): EnvConfig => {
  const envSchema: Joi.ObjectSchema = Joi.object({
    NODE_ENV: Joi.string().valid('dev', 'test', 'prod'),
    MONGODB_SERVER: Joi.string().required(),
    MONGODB_USER: Joi.string().required(),
    MONGODB_PASS: Joi.string().required(),
  });

  const { error, value: validatedEnvConfig } = envSchema.validate(envConfig, {
    allowUnknown: true,
  });

  if (error) {
    throw new Error(`Invalid .env config: ${error.message}`);
  }

  return validatedEnvConfig;
};

export default () => {
  validateConfig(process.env);
  return {
    port: parseInt(process.env.PORT, 10) || 3000,
    mongo: {
      server: process.env.MONGODB_SERVER,
      user: process.env.MONGODB_USER,
      pass: process.env.MONGODB_PASS,
      uri: `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_SERVER}`,
    },
  };
};
