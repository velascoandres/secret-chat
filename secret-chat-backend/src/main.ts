import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('Secret Chat')
    .setDescription('The Sechet Chat API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/documentation', app, document);

  await app.listen(3000);
}
bootstrap();
