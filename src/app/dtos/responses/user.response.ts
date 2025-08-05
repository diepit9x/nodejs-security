import { Exclude, Expose } from 'class-transformer';

export class UserResponse {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  email!: string;

  @Expose()
  role!: 'user' | 'admin';

  @Exclude()
  password!: string;

  constructor(partial: Partial<UserResponse>) {
    Object.assign(this, partial);
  }
}
