import { ApiProperty } from "@nestjs/swagger";
import { UserData } from "../user/user.response.schema";

export class Message{
    @ApiProperty({ example: 'successful' })
    message: string;

    @ApiProperty({ example: true })
    status: boolean;
  }

  export class ProductInfo{
    @ApiProperty({ example: "Camera" })
    name: string

    @ApiProperty({ example: "2000" })
    price: string

    @ApiProperty({ example: "Some description" })
    description: string

    @ApiProperty({ example: '1' })
    quantity:string

    @ApiProperty({ example: 1 })
    id:number

    @ApiProperty({ type: UserData })
    user:UserData
  }

  export class MetaData{
    @ApiProperty({ example: 1 })
    page: number
    @ApiProperty({ example: 10 })
    take: number
    @ApiProperty({ example: 1 })
    itemCount: number
    @ApiProperty({ example: 1 })
    pageCount: number
    @ApiProperty({ example: false })
    hasPreviousPage: boolean
    @ApiProperty({ example: true })
    hasNextPage: boolean
  }

  export class ProductData{
    @ApiProperty({ type: ProductInfo })
    data:ProductInfo
  }

  export class AllProductData{
    @ApiProperty({ type: [ProductInfo] })
    data:ProductInfo[]
    @ApiProperty({ type: MetaData })
    meta:MetaData
  }

  export class CreateProductResponseDto {

    @ApiProperty({ example: 'Create product' })
    title: string;

    @ApiProperty({ type: Message })
    message:Message

    @ApiProperty({ example: 200 })
    statusCode: number;

    @ApiProperty({ type: ProductData })
    data: ProductData;
  }

  export class GetUserProductResponseDto {

    @ApiProperty({ example: 'Get user products' })
    title: string;

    @ApiProperty({ type: Message })
    message:Message

    @ApiProperty({ example: 200 })
    statusCode: number;

    @ApiProperty({ type: AllProductData })
    data: AllProductData;
  }

  export class GetProductDetailResponseDto {

    @ApiProperty({ example: 'Get product detail' })
    title: string;

    @ApiProperty({ type: Message })
    message:Message

    @ApiProperty({ example: 200 })
    statusCode: number;

    @ApiProperty({ type: ProductData })
    data: ProductData;
  }