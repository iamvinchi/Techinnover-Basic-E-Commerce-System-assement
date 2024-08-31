import { Injectable } from '@nestjs/common';
import { CreateUserDto, CreateUserLoginDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { error, success } from 'src/utils/response';
import { Authutil } from 'src/utils/auth.helper';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; 

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly authutil:Authutil
  ) {}

  async create(createUserDto: CreateUserDto) {

    try {
      const {email,password,confirmPassword} = createUserDto

      const user = await this.userRepository.findOne({where: {email}})
      if(user){
        return error(
          'Register',
          `An account with provided email already exist.`,
        );
      }
  
      if(password !== confirmPassword){
        return error(
          'Register',
          `Password do not match!`,
        );
      }
  
        const hashedPassword = await this.authutil.hash(password)
    
        delete createUserDto.confirmPassword
          
        const newUser =  await this.userRepository.save({...createUserDto, password: hashedPassword})
        delete newUser.password
          return success(
            {
              data: newUser,
            },
            'Register',
            'Sign up successful.',
          );

       
    } catch (err) {
      return error(
        'Register',
        `${err}`,
      );
    }
   
  }

  async login(loginDto: CreateUserLoginDto){
    try {
    const {email, password} = loginDto

    const user = await this.userRepository.findOne({
      where: {email}
    })
    
    const isValidPassword = await this.authutil.compare(password, user.password)

    if(!user || !isValidPassword){
      return error(
        'Login',
        `Invalid email or password`,
      );
    }

    if(user?.status === 'banned'){
      return error(
        'Login',
        `Account restricted! please contact admin.`,
      );
    }

    const token  = await this.authutil.getToken(user)

      return success( 
        {
          data:{user,token}
        },
        'Login',
        'User successfully logged in',
      );
    } catch (err) {
      return error(
        'Login',
        `${err}`,
      );
    }
  }

  async findAll() {
    try {
      const users =  await this.userRepository.find({})

          return success(
            {
              data: users,
            },
            'Get all users',
            'Users retrieved successfully.',
          );
    } catch (err) {
      return error(
        'Get all users',
        `${err}`,
      );
    }
  }

  async findOne(id: number) {
    try {
      const user =  await this.userRepository.findOneBy({id})

          return success(
            {
              data: user,
            },
            'Get a user',
            'User retrieved successfully.',
          );
    } catch (err) {
      return error(
        'Get a user',
        `${err}`,
      );
    }  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const updated = await this.userRepository.update(id, {...updateUserDto})

      if(updated){
        return success(
          {
            data: updated
          },
          'Update user detail',
          "User details updated successfully"
        )
      }else{
        return error(
          'Update user detail',
          `Error updating user details.`
        )
      }
      
    } catch (err) {
      return error(
        'Update user detail',
        `Error occured: ${err}`
      )
    }  }

  async banAndUnbanUser(id: number) {
    try {
      const user = await this.userRepository.findOneBy({id})
      let updated
      if(user?.status === "active"){
        updated = await this.userRepository.update(id, {status: 'banned'})
      }else{
        updated = await this.userRepository.update(id, {status:'active'})
      }

      if(updated){
        return success(
          {
            data: updated
          },
          'Update user status',
          "User status updated successfully"
        )
      }else{
        return error(
          'Update user status',
          `Error updating user status.`
        )
      }
      
    } catch (err) {
      return error(
        'Update user status',
        `Error occured: ${err}`
      )
    }
  }

  async remove(id: number) {
    try {
      const deleted = await this.userRepository.delete(id)

        return success(
          {
            data: deleted
          },
          'Delete user',
          "User deleted successfully"
        )
      
    } catch (err) {
      return error(
        'Delete user',
        `Error occured: ${err}`
      )
    }  }
}
