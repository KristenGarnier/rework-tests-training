
import { describe, it, expect } from 'vitest';
import { authenticateUser } from './auth.ts';

describe('authenticateUser', () => {
  it('authentifie un utilisateur avec des identifiants corrects', () => {
    const user = authenticateUser('john', 'secret');
    expect(user).toHaveProperty('id', 1);
    expect(user).toHaveProperty('username', 'john');
    expect(user).toHaveProperty('email', 'john@example.com');
    expect(user).not.toHaveProperty('password');
  });

  it('lance une exception si l’utilisateur n’existe pas', () => {
    expect(() => authenticateUser('nonexistent', 'secret')).toThrow('Utilisateur non trouvé');
  });

  it('lance une exception si le mot de passe est incorrect', () => {
    expect(() => authenticateUser('john', 'wrong')).toThrow('Mot de passe incorrect');
  });
});
