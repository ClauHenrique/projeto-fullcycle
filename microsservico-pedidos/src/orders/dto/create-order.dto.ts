import { Type } from 'class-transformer';
import { 
    ArrayNotEmpty, 
    IsInt, 
    IsNotEmpty, 
    IsNumber, 
    IsPositive, 
    IsString, 
    MaxLength, 
    ValidateNested 
} from 'class-validator';

export class CreateOrderDto {
    @ArrayNotEmpty()
    @ValidateNested({each: true})
    @Type(() => OrderItemDto)
    items: OrderItemDto[];

    @MaxLength(255)
    @IsNotEmpty()
    @IsString()
    card_hash: string

    client_id: number
}

export class OrderItemDto {
    @IsPositive()
    @IsInt()
    @IsNotEmpty()
    quantity: number;

    @IsNotEmpty()
    @IsString()
    product_id: string;
}
