import axios from 'axios'
// import { Message, ElMessageBox } from 'element-plus'
// import store from '@/store'
import retCode from '@/utils/retCode'
import qs from 'qs'
import { getQueryVariable } from '@/utils/index'
// import router from '@/router'
// import NProgress from 'nprogress' // progress bar
import CryptoJS from 'crypto-js'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 600000 // request timeout
})
let message = ''
service.interceptors.request.use(
  (config: any) => {
    // do something before request is sent
    if (!config.params) {
      config.params = {}
    }
    if (config.method === 'get') {
      delete config.headers['Content-Type']
      config.paramsSerializer = function(params: any) {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      }
    }
    if (getQueryVariable('SSOToken')) {
      config.params['SSOToken'] = getQueryVariable('SSOToken')
    }
    if (config.isFormData) {
      config.headers['Content-Type'] =
        'application/x-www-form-urlencoded;charset=utf-8'
    }
    config.params['_'] = Math.random()

    if (
      process.env.VUE_APP_HTTP_CYPTO !== 'false' &&
      config.data &&
      !config.isFormData
    ) {
      console.log(process.env.VUE_APP_HTTP_CYPTO,
        config.data,
        !config.isFormData)
      const keyHex = CryptoJS.enc.Utf8.parse(
        'SQxlea4xGJhqmppenxhw44OxEYy#bmxr'
      )
      const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(config.data),
        keyHex,
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        }
      )
      const enc = encrypted.ciphertext.toString(CryptoJS.enc.Base64)
      config.headers['crypto'] = '1'
      config.headers['Content-Type'] = 'application/json;charset=UTF-8'
      config.data = enc
      console.log(config.data)
    }

    // loading.open();
    return config
  },
  (error) => {
    // loading.close();
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  async(response: any) => {
    // debugger
    // loading.close();
    if (response.headers['crypto'] === '1') {
      const keyHex:any = CryptoJS.enc.Utf8.parse(
        'SQxlea4xGJhqmppenxhw44OxEYy#bmxr'
      )

      const encryptedText = 'SQxlea4xGJhqmppenxhw44OxEYy#bmxr' // 你的加密文本

      // const ciphertext = CryptoJS.enc.Utf8.parse(encryptedText)
      const key = CryptoJS.enc.Hex.parse(keyHex)

      const decrypted = CryptoJS.AES.decrypt(
        encryptedText,
        key,
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        }
      )
      response.data = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
    }
    // console.log(response)
    const res = response.data
    if (res.code === 302) {
      window.location.href = res.data
      return
    }
    // if (res.code === retCode.ERROR_LOGIN && store.getters.systemType === 2) {
    //   store.commit('user/RESET_STATE')
    //   await store.dispatch('router/resetRouter')
    //   localStorage.setItem('number', '0')
    //   NProgress.done()
    //   const mes = `<div style="margin-bottom: 16px;">${
    //     res.message + ',页面即将关闭。'
    //   }</div>
    //      <div style="position:absolute;top: 30px;right: 0;text-align: right;color: #3F51B5;">
    //         <a href="javascript:window.opener=null;window.open('','_self').close();">关闭</a>
    //   </div>`
    //   await ElMessageBox.confirm(mes, {
    //     confirmButtonText: '确定',
    //     type: 'warning',
    //     showClose: false,
    //     closeOnClickModal: false,
    //     showConfirmButton: false,
    //     showCancelButton: false,
    //     dangerouslyUseHTMLString: true
    //   }).then((r) => {
    //     return Promise.reject('error')
    //   })
    // }
    // console.log('返回数据->', res)
    if (response.config && response.config.isUpload) {
      if (res.code !== retCode.RET_OK) {
        return Promise.resolve([false, res])
      } else {
        return Promise.resolve([true])
      }
    }
    if (res.code !== retCode.RET_OK) {
      if (res.message !== message) {
        // Message({
        //   message: res.message || 'Error',
        //   type: 'error',
        //   duration: 5 * 1000,
        //   onClose: function() {
        //     message = ''
        //   }
        // })
        message = res.message
      }
      if (res.code === retCode.RET_NOT_LOGIN || res.code === retCode.TO_LOGIN) {
        // if (store.getters.systemType === 2) {
        //   await ElMessageBox.confirm(res.message + '，请刷新页面重试。', {
        //     confirmButtonText: '确定',
        //     type: 'warning',
        //     showClose: false,
        //     closeOnClickModal: false,
        //     showConfirmButton: true,
        //     showCancelButton: false
        //   }).then(async(r) => {
        //     store.commit('user/RESET_STATE')
        //     await store.dispatch('router/resetRouter')
        //     location.reload()
        //     return Promise.reject('error')
        //   })
        // } else {
        //   store.commit('user/RESET_STATE')
        //   await store.dispatch('router/resetRouter')
        //   if (window.location.hash === '#/') {
        //     location.reload()
        //   } else {
        //     router.push({ name: 'home', replace: true })
        //   }
        // }
        // re-login
        return Promise.reject(res.message)
      }

      return Promise.reject(res)
    } else {
      return res.data
    }
  },
  (error) => {
    // loading.close();
    console.log('err' + error) // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
