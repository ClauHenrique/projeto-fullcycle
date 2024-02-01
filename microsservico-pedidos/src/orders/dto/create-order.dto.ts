import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
    @IsNotEmpty()
    items: OrderItemDto[];

    @IsNotEmpty()
    @IsString()
    card_hash: string
}

export class OrderItemDto {
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsNotEmpty()
    @IsNumber()
    product_id: string;
}
