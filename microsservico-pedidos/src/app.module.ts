import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './orders/entities/order.item.entity';
import { AuthModule } from './auth/auth.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3304,
      username: 'root',
      password: 'root',
      database: 'pagamento_nest',
      entities: [Product, Order, OrderItem, User],
      synchronize: true
    }),
    ProductsModule,
    OrdersModule,
    AuthModule,
    RabbitmqModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
