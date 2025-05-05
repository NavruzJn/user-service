import { Column, CreateDateColumn, Entity, PrimaryColumn, Table, UpdateDateColumn } from 'typeorm';
import { UserInterface } from '@src/domain/interfaces/user.interface';

@Entity('users')
export class UserOrmEntity implements UserInterface {
    @PrimaryColumn({ update: false, length: 64 })
    public id: string;

    @Column({ nullable: false, unique: true })
    public email: string;

    @Column({ nullable: false })
    public password: string;

    @Column({ nullable: true })
    public firstname: string;

    @Column({ nullable: true })
    public lastname: string;

    @Column({ nullable: true })
    public birthdate: Date;

    @CreateDateColumn({
        type: 'timestamptz',
        update: false,
    })
    public createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamptz',
    })
    public updatedAt: Date;
}
