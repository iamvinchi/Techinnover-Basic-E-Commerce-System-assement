import {Request, Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto, UpdateProductStatusDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { UseAuthGuard } from 'src/utils/jwt/use.auth.guard';
import { Role } from 'src/utils/roles/roles.enum';
import { PageOptionsDto } from 'src/utils/pagination/pagination.options';

@ApiTags('Product Management')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseAuthGuard(Role.User)
  create(@Request() req, @Body() createProductDto: CreateProductDto) {
    const userId = req.user.sub
    return this.productService.create(userId, createProductDto);
  }

  @Get('approved')
  @UseAuthGuard(Role.User, Role.Admin)
  findApprovedProducts(@Query() pageOptionsDto: PageOptionsDto){
    return this.productService.findApprovedProducts(pageOptionsDto)
  }

  @Get('user/me')
  @UseAuthGuard(Role.User)
  findUserProducts(@Request() req, @Query() pageOptionsDto: PageOptionsDto){
    const userId = req.user.sub
    return this.productService.findUserProducts(+userId, pageOptionsDto)
  }

  @Get()
  @UseAuthGuard(Role.Admin)
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.productService.findAll(pageOptionsDto);
  }

  @Get(':id')
  @UseAuthGuard(Role.User, Role.Admin)
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch('status/:id')
  @UseAuthGuard(Role.Admin)
  updateProductStatus(@Param('id') id: string, @Body() updateProductStatusDto: UpdateProductStatusDto) {
    return this.productService.updateProductStatus(+id, updateProductStatusDto);
  }

  @Patch(':id')
  @UseAuthGuard(Role.User)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @UseAuthGuard(Role.User)
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
