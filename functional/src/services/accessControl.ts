import { AccessControl } from 'accesscontrol';

const ac = new AccessControl();

// Définition des permissions
ac.grant('guest')
  .read('profile')
  .readOwn('data');

ac.grant('user')
  .extend('guest')
  .createOwn('data')
  .updateOwn('data')
  .deleteOwn('data');

ac.grant('admin')
  .extend('user')
  .create('profile')
  .update('profile')
  .delete('profile')
  .read('data')
  .create('data')
  .update('data')
  .delete('data');

export { ac };
