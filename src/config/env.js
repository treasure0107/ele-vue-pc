/**
 * Created by 520 on 2018/6/20.
 */
let baseUrl = '';
let routerMode = 'hash';
let imgBaseUrl;

if (process.env.NODE_ENV == 'development') {
  baseUrl = 'http://localhost:8080/';
  imgBaseUrl = 'http://localhost:8080/img/';
} else if (process.env.NODE_ENV == 'production') {
/*  baseUrl = 'http://vip.1903.love/api/';
   imgBaseUrl = 'http://vip.1903.love/api/images/';*/
  baseUrl = 'http://vipapi.1903.love/api/';
  imgBaseUrl = 'http://vipapi.1903.love/api/images/';
}
export {
  baseUrl,
  routerMode,
  imgBaseUrl,
}
