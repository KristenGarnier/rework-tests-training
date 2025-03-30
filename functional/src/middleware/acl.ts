import { ac } from '../services/accessControl.js';
import { createMiddleware } from 'hono/factory';

type Permission = {
  resource: string;
  action: string;
  possession?: 'own' | 'any';
};

export const checkPermission = (permission: Permission) => {
  return createMiddleware(async (c, next) => {
    const user = c.get('user');

    if (!user) {
      return c.json({ error: 'Non authentifié' }, 401);
    }

    const { action, resource, possession = 'any' } = permission;
    const permission_query = possession === 'own'
      ? `${action}Own`
      : `${action}${possession === 'any' ? '' : possession}`;

    try {
      const allowed = ac.can(user.role)[permission_query](resource);
      if (!allowed.granted) {
        return c.json({
          error: 'Permission refusée',
          details: `${user.role} ne peut pas ${action} ${resource}`
        }, 403);
      }
    } catch (error) {
      return c.json({ error: 'Erreur de vérification des permissions' }, 500);
    }

    await next();
  });
};
