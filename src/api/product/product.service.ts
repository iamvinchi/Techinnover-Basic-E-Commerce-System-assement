import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto, UpdateProductStatusDto } from './dto/update-product.dto';
import { error, success } from 'src/utils/response';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm'; 
import { Product } from './entities/product.entity';
import { PageMetaDto } from 'src/utils/pagination/pagination.meta.dto';
import { PageDto } from 'src/utils/pagination/pagination.dto';
import { PageOptionsDto } from 'src/utils/pagination/pagination.options';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
  ) {}
  async create(userId: number,createProductDto: CreateProductDto) {
    const {name, price, description,quantity } = createProductDto
    try {
      const user = await this.userRepository.findOne({where: {id: userId}, relations:['products']})

    const productExist = await this.productRepository.findOne({where: {user:{id: userId}, name:name.trim()}, relations:['user']})

    if(productExist){
      return error(
        'Create Product',
        "Product already exist"
      )
    }

    const newProduct = await this.productRepository.save({
      name:name.trim(), price, description,quantity,user
    })

    return success(
      {
        data: newProduct
      },
      'Create Product',
      "Product detail created successfully"
    )
    
    } catch (err) {
      return error(
        'Create Product',
        `Error occured: ${err}`
      )
    }  }

    async findApprovedProducts(pageOptionsDto: PageOptionsDto){
      try {
      
        const queryBuilder = this.productRepository.createQueryBuilder("products");
  
        queryBuilder
        .andWhere("products.status = :status", { status:'approved'})
        .leftJoinAndSelect("products.user", "user")
          .orderBy("products.created_at", pageOptionsDto.order)
          .skip(pageOptionsDto.skip)
          .take(pageOptionsDto.take);
    
        const itemCount = await queryBuilder.getCount();
        const { entities } = await queryBuilder.getRawAndEntities();
    
        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    
        const banks = new PageDto(entities, pageMetaDto);
          
        return success(
          {
            data: banks
          },
          'Get approved products',
          "Products retrieved successfully"
        )
      } catch (err) {
        return error(
          'Get approved products',
          `Error occured: ${err}`
        )
      }
    }
  
    async findUserProducts(userId: number, pageOptionsDto: PageOptionsDto) {
      try {
      
        const queryBuilder = this.productRepository.createQueryBuilder("products");
  
        queryBuilder
        .andWhere("products.user.id = :userId", { userId})
        .leftJoinAndSelect("products.user", "user")
          .orderBy("products.created_at", pageOptionsDto.order)
          .skip(pageOptionsDto.skip)
          .take(pageOptionsDto.take);
    
        const itemCount = await queryBuilder.getCount();
        const { entities } = await queryBuilder.getRawAndEntities();
    
        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    
        const banks = new PageDto(entities, pageMetaDto);
          
        return success(
          {
            data: banks
          },
          'Get user products',
          "Products retrieved successfully"
        )
      } catch (err) {
        return error(
          'Get user products',
          `Error occured: ${err}`
        )
      }
    }
  
    async findAll(pageOptionsDto: PageOptionsDto) {
      try {
  
          const queryBuilder = this.productRepository.createQueryBuilder("products");
  
          queryBuilder
            .orderBy("products.created_at", pageOptionsDto.order)
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take);
      
          const itemCount = await queryBuilder.getCount();
          const { entities } = await queryBuilder.getRawAndEntities();
      
          const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
      
          const products = new PageDto(entities, pageMetaDto);
           
        return success(
          {
            data: products
          },
          'Get all products',
          "Products retrieved successfully"
        )
      } catch (err) {
        return error(
          'Get all products',
          `Error occured: ${err}`
        )
      }
    }
  
    async findOne(id: number) {
      try {
        const product = await this.productRepository.findOne({where: {id: +id}})
  
        if(product){
          return success(
            {
              data: product
            },
            'Get product',
            "Product retrieved successfully"
          )
        }else{
          return error(
            'Get product',
            `No product detail found with provided info.`
          )
        }
        
      } catch (err) {
        return error(
          'Get product',
          `Error occured: ${err}`
        )
      }
    }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const updated = await this.productRepository.update(id, {...updateProductDto})

      if(updated){
        return success(
          {
            data: updated
          },
          'Update product detail',
          "Product details updated successfully"
        )
      }else{
        return error(
          'Update product detail',
          `Error updating product details.`
        )
      }
      
    } catch (err) {
      return error(
        'Update product detail',
        `Error occured: ${err}`
      )
    }
  }

  async updateProductStatus(id: number, updateProductStatusDto: UpdateProductStatusDto) {
    const {status} = updateProductStatusDto
    try {
      const updated = await this.productRepository.update(id, {status})

      if(updated){
        return success(
          {
            data: updated
          },
          'Update product status',
          "Product status updated successfully"
        )
      }else{
        return error(
          'Update product status',
          `Error updating product status.`
        )
      }
      
    } catch (err) {
      return error(
        'Update product status',
        `Error occured: ${err}`
      )
    }
  }

  async remove(id: number) {
    try {
      const deleted = await this.productRepository.delete(id)

        return success(
          {
            data: deleted
          },
          'Delete Product',
          "Product deleted successfully"
        )
      
    } catch (err) {
      return error(
        'Delete Product',
        `Error occured: ${err}`
      )
    }  }
}
