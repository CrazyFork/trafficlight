export const PARAMS_PREFIX: string = '$params';
/*
type can be
    {
        method: route.method,
        url: posix.join('/', path, route.path),
        middleware: [...mws, ...fnMws],
        name: route.name,
        params
      }

or 

      { method, path, name }
*/

export const ROUTE_PREFIX: string = '$routes';
export const MW_PREFIX: string = '$mw'; // middleware
export const PATH: string = '$path';

export const ACTION_TYPES = {
  HEAD: 'head',
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
  OPTIONS: 'options',
  ALL: 'all'
};
