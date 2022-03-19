const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 获取cookie过期时间
const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + 24*60*60*1000)
    return d.toGMTString();
}

const handleUserRouter = (req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];


    // 登录
    if(method === 'GET' && path === '/api/user/login'){
        // const { username, password } = req.body;
        const { username, password } = req.query;
        const res = login(username, password)
        return res.then(data => {
            if(data.username){
                // 操作 cookie
                // res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly;expires=${getCookieExpires()}`)
                req.session.username = data.username;
                req.session.realname = data.realname;

                return new SuccessModel()
            }
            return new ErrorModel('登陆失败')
        })
    }

    // 登陆验证测试
    if(method === 'GET' && req.path === '/api/user/login-test'){
        if(req.session.username){
            return Promise.resolve(new SuccessModel())
        }
        return Promise.resolve(new ErrorModel('尚未登陆'))
    }

}

module.exports = handleUserRouter;