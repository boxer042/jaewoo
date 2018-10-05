// @flow
import hello from 'hellojs';

hello.init({
  github: '',
  facebook: '282105242405332',
  google: '1034158409824-8fv1oou8divf13oc9j32kvuap7k5o695.apps.googleusercontent.com',
}, {
  redirect_uri: 'callback',
});

export const github = (): Promise<*> => hello.login('github');
export const facebook = (): Promise<*> => hello.login('facebook', { scope: 'email, public_profile' });
export const google = (): Promise<*> => hello.login('google', {
  scope: 'https://www.googleapis.com/auth/userinfo.email',
});