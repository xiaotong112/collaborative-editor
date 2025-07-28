import { compare } from 'bcrypt';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  nickname: string;

  @Column()
  avatar: string;

  @Column()
  password: string;

  @Column({ default: false })
  isDeleted: boolean;

  /**
   * 比较密码
   * @param password Hash 后的密码
   * @returns 如果密码匹配则返回 true，否则返回 false
   */
  async comparePassword(password: string): Promise<boolean> {
    return await compare(this.password, password);
  }
}
