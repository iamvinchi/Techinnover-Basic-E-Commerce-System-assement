import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateProductDto {

    @IsString()
    @IsNotEmpty({ message: 'Product Name can not be empty' })
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty({ message: 'Price can not be empty' })
    @ApiProperty()
    price: string

    @IsString()
    @IsNotEmpty({ message: 'Description can not be empty' })
    @ApiProperty()
    description: string;

    @IsString()
    @IsNotEmpty({ message: 'Quantity can not be empty' })
    @ApiProperty()
    quantity: string;
}
