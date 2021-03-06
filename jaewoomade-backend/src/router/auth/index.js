// @flow
import Router from 'koa-router';

import * as authCtrl from './auth.ctrl';

const auth:Router = new Router();

auth.post('/send-auth-email', authCtrl.sendAuthEmail);
auth.get('/code/:code', authCtrl.getCode);
auth.post('/register/local', authCtrl.createLocalAccount);
auth.post('/login/local', authCtrl.localLogin);
auth.post('/code-login', authCtrl.codeLogin);
auth.get('/check', authCtrl.check);
auth.get('/logout', authCtrl.logout);
auth.post('/verify-social/:provider(github|facebook|google)', authCtrl.verifySocial);
auth.post('/register/:provider(github|facebook|google)', authCtrl.socialRegister);
auth.post('/login/:provider(github|facebook|google)', authCtrl.socialLogin);

export default auth;