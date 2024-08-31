import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export enum Status {
    Pending = 'pending',
    Approved = 'approved',
    Rejected = 'rejected'
}

export class UpdateProductDto {

    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    price: string

    @ApiPropertyOptional()
    description: string;

    @ApiPropertyOptional()
    quantity: string;
}

export class UpdateProductStatusDto {

    @IsString()
    @IsNotEmpty({ message: 'Status can not be empty' })
    @IsEnum(Status, { message: 'Status must be either pending or approved or rejected' })
    @ApiProperty({ enum: Status })
    status: string;
}
