import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const dataSource = app.get<DataSource>(getDataSourceToken())
  await dataSource.synchronize(true)

  const productRepository = dataSource.getRepository('Product')
  await productRepository.insert([
    {
        "id": "1",
        "name": "Product 1",
        "description": "Description 1",
        "price": 100,
        "image_url": "http://localhost:9000/products/1.png"
      },
      {
        "id": "2",
        "name": "Fantastic Widget",
        "description": "A wonderful widget for your needs",
        "price": 49.99,
        "image_url": "http://localhost:9000/products/2.png"
      },
      {
        "id": "3",
        "name": "Super Gizmo",
        "description": "The ultimate gizmo for tech enthusiasts",
        "price": 129.99,
        "image_url": "http://localhost:9000/products/3.png"
      },
      {
        "id": "4",
        "name": "Incredible Thingamajig",
        "description": "An amazing thingamajig that does it all",
        "price": 79.95,
        "image_url": "http://localhost:9000/products/4.png"
      },
      {
        "id": "5",
        "name": "Awesome Contraption",
        "description": "A truly awesome contraption for your daily life",
        "price": 199.99,
        "image_url": "http://localhost:9000/products/5.png"
      },
      {
        "id": "6",
        "name": "Marvelous Apparatus",
        "description": "A marvelous apparatus that will amaze you",
        "price": 89.99,
        "image_url": "http://localhost:9000/products/6.png"
      },
      {
        "id": "7",
        "name": "Spectacular Whatchamacallit",
        "description": "A spectacular whatchamacallit you've never seen before",
        "price": 149.95,
        "image_url": "http://localhost:9000/products/7.png"
      },
      {
        "id": "8",
        "name": "Unbelievable Doohickey",
        "description": "An unbelievable doohickey that defies explanation",
        "price": 69.99,
        "image_url": "http://localhost:9000/products/8.png"
      },
      {
        "id": "9",
        "name": "Glorious Gizmo",
        "description": "A glorious gizmo to enhance your daily routine",
        "price": 119.99,
        "image_url": "http://localhost:9000/products/9.png"
      },
      {
        "id": "10",
        "name": "Fancy Doodad",
        "description": "A fancy doodad that adds style to your life",
        "price": 54.99,
        "image_url": "http://localhost:9000/products/10.png"
      }
  ])

  await app.close()
}
bootstrap();
