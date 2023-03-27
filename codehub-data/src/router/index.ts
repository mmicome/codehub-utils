import Router from '@koa/router';
import {DefaultContext} from 'koa'

const router = new Router();


/**
 * Base route, return a 401
 */
router.get('/', async (ctx:DefaultContext) => ctx.status = 401);

/**
 * Basic healthcheck
 */
router.get('/healthcheck', async (ctx:DefaultContext) => ctx.body = 'OK');

export const routes = router.routes();
