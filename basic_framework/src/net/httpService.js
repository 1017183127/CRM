import axios from 'axios'
const HttpService = {};

HttpService.instance = axios.create({
  timeout: 50000,
  headers: {'content-type': 'application/json'}
});
['get', 'post', 'patch', 'delete'].forEach((method) => {
  HttpService[method] = (url, payload) => {
    let opt;
    if (method === 'get') {
      opt = { params: payload };
    } else if (method === 'post') {
      opt = payload;
    } else if (method === 'patch') {
      opt = payload;
    } else if (method === 'delete') {
      opt = { params: payload };
    }
    return new Promise((resolve, reject) => {
      HttpService.instance[method](url, opt).then(res => {
        let dt = res.data;
        if (!dt.success) {
          resolve({...dt, success: false});
        } else {
          resolve(dt);
        }
      }).catch((e) => {
        reject(new Error('请检查网络是否正常！'));
      });
    })
  }
})

HttpService.cache = (url, data, callback) => {// eslint-disable-line
};
export default HttpService;
