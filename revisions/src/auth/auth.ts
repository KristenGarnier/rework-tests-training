export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

const users: User[] = [
  { id: 1, username: 'john', email: 'john@example.com', password: 'secret' },
  { id: 2, username: 'jane', email: 'jane@example.com', password: 'password' },
];

export function authenticateUser(username: string, password: string): Omit<User, 'password'> {
  const user = users.find(u => u.username === username);
  if (!user) {
    throw new Error('Utilisateur non trouvé');
  }
  if (user.password !== password) {
    throw new Error('Mot de passe incorrect');
  }
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

