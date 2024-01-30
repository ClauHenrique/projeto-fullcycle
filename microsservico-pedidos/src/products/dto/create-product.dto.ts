import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {

    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    image_url: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;
}
