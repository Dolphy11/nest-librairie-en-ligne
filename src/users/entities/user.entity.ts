import { Category } from "src/category/entities/category.entity";
import { Livre } from "src/livres/entities/livre.entity";
import { Order } from "src/orders/entities/order.entity";
import { Review } from "src/reviews/entities/review.entity";
import { UserRole } from "src/utility/common/user-roles.enum";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: false })
    nom: string;
    @Column({ nullable: false })
    prenom: string;
    @Column({ unique: true, nullable: false })
    email: string;
    @Column({ unique: true, nullable: false })
    username: string;
    @Column({ nullable: false, select: false })
    password: string;
    @Column({nullable: false, default: 1 })
    isActive: boolean;
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
    @Column({type: 'enum', enum: UserRole, default:[UserRole.Client]})
    roles: UserRole[];
    @OneToMany(()=>Category,(cat)=>cat.addedBy)
    category:Category[];
    @OneToMany(()=>Livre,(livres)=>livres.addedBy)
    livre:Livre[];
    @OneToMany(()=>Review,(rev)=>rev.user)
    reviews:Review[];
    @OneToMany(()=>Order,(order)=>order.updatedBy)
    ordersUpdateBy:Order[]
    @OneToMany(()=>Order,(order)=>order.user)
    orders:Order[];
}