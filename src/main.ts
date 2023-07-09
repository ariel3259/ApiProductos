import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule, OpenAPIObject } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = Number(`${process.env.PORT}`);

  //Swagger documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Products Api')
    .setDescription('An api about products')
    .setVersion('1.0')
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(
    app,
    swaggerConfig,
  );

  SwaggerModule.setup('/swagger', app, document);
  await app.listen(PORT);
}
bootstrap();
