import {
  Column,
  Model,
  Table,
  BeforeCreate,
  BeforeUpdate,
} from 'sequelize-typescript';
import * as bcrypt from 'bcryptjs';

@Table({
  tableName: 'users',
})
export class User extends Model<User> {
  @Column({
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({
    allowNull: false,
  })
  password: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  async matchPassword(enteredPassword: string): Promise<boolean> {
    try {
      return bcrypt.compare(enteredPassword, this.password);
    } catch (error) {
      return false;
    }
  }

  @BeforeCreate
  @BeforeUpdate
  static async hashPass(instance: User): Promise<void> {
    if (!instance.changed('password')) {
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(instance.password, salt);
    instance.password = hashedPass;
  }
}
