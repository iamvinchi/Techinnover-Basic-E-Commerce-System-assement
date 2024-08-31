import { User } from 'src/api/user/entities/user.entity';
import { Column, CreateDateColumn, JoinColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', enum:['pending', 'approved', 'rejected'], default:"pending" })
  status: string;
   
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', })
  price: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  quantity: string;

  @OneToOne(() => User, user => user.products, { nullable:true, onDelete:"CASCADE" })
  @JoinColumn()
  user: User;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

}
