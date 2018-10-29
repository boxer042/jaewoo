// @flow
import Router from 'koa-router';
import needsAuth from 'lib/middlewares/needsAuth';

import * as filesCtrl from './files.ctrl';

const files: Router = new Router();

files.post(
  '/create-url/post-image',
  needsAuth,
  filesCtrl.createPostImageSignedUrl,
);

files.post('/upload', needsAuth, filesCtrl.upload);

export default files;
