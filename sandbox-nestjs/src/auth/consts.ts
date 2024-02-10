import 'dotenv/config';
import { SetMetadata } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export const jwtConsts = {
  secret: process.env.JWT_SECRET,
};

export const IS_PUBLIC_KEY = 'isPublic';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const haskPassword = async (password: string) => {
  const saltOrRounds = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, saltOrRounds);
  return hash;
};
