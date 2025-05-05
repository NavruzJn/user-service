import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserInterface } from '@src/domain/interfaces/user.interface';

@Entity('users')
export class UserOrmEntity implements UserInterface {
    constructor(props?: unknown) {
        if (props) {
            Object.assign(this, props);
        }
    }

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

    @BeforeInsert()
    @BeforeUpdate()
    public async hashPassword() {
        console.log(this.password);
        if (this.password && !this.password.startsWith('$2b$')) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
    }
}
