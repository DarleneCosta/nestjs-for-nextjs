import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { parseCorsWhitelist } from './common/utils/parse-cors-whitelist';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

  const corsWhitelist = parseCorsWhitelist(process.env.CORS_WHITELIST || '');
  app.enableCors({
    origin: (
      origin: string | undefined, //isto é do navegador para proteger o cliente
      callback: (...args: any[]) => void,
    ) => {
      //requisicao sem origin ou que inclui no whitelist
      //é permitida
      if (!origin || corsWhitelist.includes(origin)) {
        return callback(null, true);
      }
      //requisicao com origin que não está no whitelist
      //é bloqueada
      return callback(new Error('Not allowed by CORS'));
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //remove propriedades que não estão no dto
      forbidNonWhitelisted: true, //retorna um erro se houver propriedades que não estão no dto
    }),
  );
  await app.listen(process.env.APP_PORT ?? 3000);
}
void bootstrap();
