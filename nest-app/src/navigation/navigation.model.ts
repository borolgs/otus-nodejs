import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'navigations',
})
export class Navigation extends Model<Navigation> {
  @Column({
    unique: true,
    allowNull: false,
  })
  name: string;

  @Column({
    unique: true,
    allowNull: false,
  })
  url: string;

  @Column
  icon: string;
}
