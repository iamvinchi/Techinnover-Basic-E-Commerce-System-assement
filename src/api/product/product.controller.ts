import {Request, Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto, UpdateProductStatusDto } from './dto/update-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseAuthGuard } from 'src/utils/jwt/use.auth.guard';
import { Role } from 'src/utils/roles/roles.enum';
import { PageOptionsDto } from 'src/utils/pagination/pagination.options';
import { CreateProductResponseDto, GetProductDetailResponseDto, GetUserProductResponseDto } from './product.response.schema';
import { DeleteResponseDto, UpdateResponseDto } from '../user/user.response.schema';

@ApiTags('Product Management')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @UseAuthGuard(Role.User)
  @ApiOperation({ summary: 'This method enables a user to create a new product.' })
  @ApiResponse({ status: 200, description: 'Create product response', type:CreateProductResponseDto })
  create(@Request() req, @Body() createProductDto: CreateProductDto) {
    const userId = req.user.sub
    return this.productService.create(userId, createProductDto);
  }

  @Get('approved')
  @ApiOperation({ summary: 'This methed returns all approved products to both authorized and unauthorized users.' })
  @ApiResponse({ status: 200, description: 'Get approved products response', type:GetUserProductResponseDto })
  findApprovedProducts(@Query() pageOptionsDto: PageOptionsDto){
    return this.productService.findApprovedProducts(pageOptionsDto)
  }
  
  @Get('user/all')
  @UseAuthGuard(Role.User)
  @ApiOperation({ summary: 'This method gets all products belonging to a user and it can only be call by a user and forbidden for admin.' })
  @ApiResponse({ status: 200, description: 'Get products response', type:GetUserProductResponseDto })
  findUserProducts(@Request() req, @Query() pageOptionsDto: PageOptionsDto){
    const userId = req.user.sub
    return this.productService.findUserProducts(+userId, pageOptionsDto)
  }

  @Get('all')
  @UseAuthGuard(Role.Admin)
  @ApiOperation({ summary: 'This lists all products and can only be accessed by admin users.' })
  @ApiResponse({ status: 200, description: 'Get products response', type:GetUserProductResponseDto })
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.productService.findAll(pageOptionsDto);
  }
  
  @Get(':id')
  @ApiOperation({ summary: 'This method gets the detail of a particular product by id. It is not a protected route.' })
  @ApiResponse({ status: 200, description: 'Get user products response', type:GetProductDetailResponseDto })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch('status/:id')
  @UseAuthGuard(Role.Admin)
  @ApiOperation({ summary: 'This enables an admin to either approve or reject a transaction created by a user.' })
  @ApiResponse({ status: 200, description: 'Update product status response', type:UpdateResponseDto })
  updateProductStatus(@Param('id') id: string, @Body() updateProductStatusDto: UpdateProductStatusDto) {
    return this.productService.updateProductStatus(+id, updateProductStatusDto);
  }

  @Patch(':id')
  @UseAuthGuard(Role.User)
  @ApiOperation({ summary: 'This allows users to update a product detail.' })
  @ApiResponse({ status: 200, description: 'Update product response', type:UpdateResponseDto })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @UseAuthGuard(Role.User)
  @ApiOperation({ summary: 'This method deletes a product by id.' })
  @ApiResponse({ status: 200, description: 'Delete product response', type:DeleteResponseDto })
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
