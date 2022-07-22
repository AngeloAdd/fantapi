import {Router} from 'express';

export default class RoutesLoader {
  constructor(config, routes) {
    this.config = config;
    this.routes = routes;
  }

  load(expressApp) {
    expressApp.get('/favicon.ico', (req, res) => res.status(204));
    expressApp.get('/', (req, res) => res.json(['ok']));

    const apiV1 = Router({mergeParams: true});
    this.routes.v1.forEach((route) => {
      apiV1.use(route.path, route.handler);
    });

    expressApp.use('/v1', apiV1);
  }
}
