import { Hono } from "hono";
import { checkPermission } from "../middleware/acl.js";

const route = new Hono();

route.get('/profile/:id',
  checkPermission({ action: 'read', resource: 'profile' }),
  (c) => {
    return c.json({ message: 'Profil consulté' });
  });

route.post('/data',
  checkPermission({ action: 'create', resource: 'data', possession: 'own' }),
  (c) => {
    return c.json({ message: 'Données créées' });
  });

route.put('/data/:id',
  checkPermission({ action: 'update', resource: 'data', possession: 'own' }),
  (c) => {
    return c.json({ message: 'Données modifiées' });
  });

route.delete('/data/:id',
  checkPermission({ action: 'delete', resource: 'data' }),
  (c) => {
    return c.json({ message: 'Données supprimées' });
  });


export default route;
