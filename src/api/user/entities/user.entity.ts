import { Product } from 'src/api/product/entities/product.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', enum:['user', 'admin'], nullable:true })
  role: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', })
  email: string;

  @Column({ type: 'varchar', enum:['active', 'banned'], default:"active" })
  status: string;

  @Column({ type: 'varchar' })
  password: string;

  @OneToMany(() => Product, product => product.user, { nullable:true, onDelete:"SET NULL" })
  products: Product[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

}
