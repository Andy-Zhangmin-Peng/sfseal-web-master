/**
 * prevent browser call
 *
 * @param {any} req
 * @param {any} res
 * @param {any} proxyOptions
 * @returns
 */
const preventBrowserCalls = function (req, res, proxyOptions) {
  if (req.headers.accept && req.headers.accept.indexOf('html') !== -1) {
    return '/index.html';
  }
  req.headers['X-Custom-Header'] = 'yes';
};
const PROXY_CONFIG = [
  {
    context: ['/noauth', '/oauth', '/reference','/staff','/company','/user', '/account','/lock','/workorder','/seal'],
    target: 'http://localhost:8080',
    // target: 'http://42.56.94.146:8086/',
    secure: false,
    bypass: preventBrowserCalls
  },
  {
    context: ['/geocoding'],
    target: 'http://api.map.baidu.com',
    secure: false,
    bypass: preventBrowserCalls
  }
];
module.exports = PROXY_CONFIG;
