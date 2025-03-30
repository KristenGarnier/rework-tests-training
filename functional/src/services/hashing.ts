import argon2 from 'argon2';
import crypto from 'node:crypto'

export const hashPassword = async (password: string): Promise<{ password: string, salt: string }> => {
  const salt = crypto.randomBytes(16).toString('hex');
  return {
    password: await argon2.hash(`${password}${salt}`, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 3,
      parallelism: 1
    }), salt
  };
};

export const verifyPassword = async (
  password: string,
  salt: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    return await argon2.verify(hashedPassword, `${password}${salt}`);
  } catch (err) {
    return false;
  }
};
