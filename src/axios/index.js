import JsonP from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd'

export default class Axios {
    static jsonp(options) {
        return new Promise ((resolve, reject) => {
            JsonP(options.url, {
                param: 'callback'
            }, function (err, response) {
                if (response.status === '1') {
                    resolve(response)
                } else {
                    reject(response.info)
                }
            })
        })
    }

    static ajax(options) {
        let loading
        if (options.data && options.data.isShowLoading !== false) {
            loading = document.getElementById('ajaxLoading')
            loading.style.display = 'block'
        }
        let baseApi = 'https://www.easy-mock.com/mock/5b5fc256ce93cc61fbbab385/mockapi'
        return new Promise((resolve, reject) => {
            axios({
                url: baseApi + options.url,
                method: 'get',
                baseUrl: baseApi,
                timeout: 10000,
                params: (options.data && options.data.params) || ''
            }).then((response) => {
                loading.style.display = 'none'
                if (response.status == '200') {
                    let res = response.data
                    if (res.code == '0') {
                        resolve(res)
                    } else {
                        Modal.info({
                            title: '提示',
                            content: res.message
                        })
                    }
                } else {
                    reject(response.data)
                }
            }).catch((err) => {
                loading.style.display = 'none'
                Modal.info({
                    title: '提示',
                    content: '请求出错或超时，请刷新'
                })
                reject(err)
            })
        })
    }
}