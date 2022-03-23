const querystring = require('querystring')
const { get, set } = require('./src/db/redis')
const { access } = require('./src/utils/log')
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user')

// session 数据
const SESSION_DATA = {};
// 获取cookie过期时间
const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + 24*60*60*1000)
    return d.toGMTString();
}
// 用于处理 post data
const getPostData = req => {
    const promise = new Promise((resolve,reject) => {
        if(req.method !== 'POST'){
            resolve({})
            return;
        }
        if(req.headers['content-type']!=='application/json'){
            resolve({})
            return;
        }
        let postData = '';
         req.on('data', chunk => {
             postData += chunk.toString();
         })

         req.on('end', () => {
             if(!postData){
                resolve({})
                return;
             }
             resolve(
                 JSON.parse(postData)
             )
         })
    })
    return promise;
}

const serverHandle = (req, res) => {
    // 记录 access log
    access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)
    
    res.setHeader('Content-type', 'application/json')

    const url = req.url;
    req.path = url.split('?')[0];

    
    req.query = querystring.parse(url.split('?')[1])
     
    // 解析cookie
    req.cookie = {};
    const cookieStr = req.headers.cookie || '';
    cookieStr.split(';').forEach(item => {
        if(!item) return;
        const [key, val] = item.split('=');
        req.cookie[key.trim()] = val.trim();
    })
    console.log('cookie', req.cookie)

    // 解析 session
    let needSetCookie = false;
    let userId = req.cookie.userid;
    if(userId){
        if(!SESSION_DATA[userId]){
            SESSION_DATA[userId] = {}
        }
    }else{
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`
        SESSION_DATA[userId] = {}
    }
    req.session = SESSION_DATA[userId];

    getPostData(req).then(postData => {
        req.body = postData;
        // 处理blog路由
        const blogResult = handleBlogRouter(req, res);
        if(blogResult){
            blogResult.then(blogData => {
                if(needSetCookie){
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly;expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(blogData))
            })
            return;
        }
 
        // 处理user路由
        const userResult = handleUserRouter(req, res);
        if(userResult){
            userResult.then(userData => {
                if(needSetCookie){
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly;expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(userData))
            })
            return;
        }
        // 404
        res.writeHead(404,{'Content-type':'text/plain'})
        res.write('404')
        res.end()
    })

}
module.exports = serverHandle;