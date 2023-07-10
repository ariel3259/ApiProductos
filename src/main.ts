import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = Number(`${process.env.PORT}`);

  //enabling cors
  app.enableCors({
    exposedHeaders: ['x-total-count'],
  });
  //Swagger documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Products Api')
    .setDescription('An api about products')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(
    app,
    swaggerConfig,
  );

  SwaggerModule.setup('/swagger', app, document);

  //setting validation pipes
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT);
}
bootstrap();
