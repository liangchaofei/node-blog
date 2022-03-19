const { loginCheck } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];


    // 登录
    if(method === 'POST' && path === '/api/user/login'){
        const { username, password } = req.body;
        console.log('req', req)
        const res = loginCheck(username, password)
        return res.then(data => {
            console.log('data', data)
            if(data.username){
                return new SuccessModel()
            }
            return new ErrorModel('登陆失败')
        })

    }

}

module.exports = handleUserRouter;