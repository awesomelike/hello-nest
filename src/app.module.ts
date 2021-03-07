import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ProductsModule,
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const MONGODB_SERVER = config.get('MONGODB_SERVER');
        const MONGODB_USER = config.get('MONGODB_USER');
        const MONGODB_PASS = config.get('MONGODB_PASS');
        const mongoURI = `mongodb://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_SERVER}`;
        return {
          uri: mongoURI,
          useUnifiedTopology: true,
          useNewUrlParser: true,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
