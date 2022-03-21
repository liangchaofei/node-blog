const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 统一的登陆验证函数
const loginCheck = req => {
    if(req.session.username){
        return Promise.resolve(new ErrorModel('尚未登陆'))
    }
}

const handleBlogRouter = (req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];
    const id = req.query.id;

    // 获取博客列表
    if(method === 'GET' && path === '/api/blog/list'){
        const author = req.query.author;
        const keyword = req.query.keyword;

        const result = getList(author, keyword);
        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }

    // 获取博客详情
    if(method === 'GET' && path === '/api/blog/detail'){
        
        const result  = getDetail(id);
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    // 新建博客
    if(method === 'POST' && path === '/api/blog/new'){
        const loginCheckResult = loginCheck(req);
        if(loginCheckResult){
            // 没登陆
            return loginCheck;
        }
        const author = req.session.username;
        req.body.author = author;
        const result = newBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    // 更新博客
    if(method === 'POST' && path === '/api/blog/update'){
        const loginCheckResult = loginCheck(req);
        if(loginCheckResult){
            // 没登陆
            return loginCheck;
        }
        const result = updateBlog(id, req.body)
       return result.then(val => {
        if(val){
            return new SuccessModel();
           }else{
               return new ErrorModel('更新博客失败')
           }
       })
    }

    // 删除博客
    if(method === 'POST' && path === '/api/blog/delete'){
        const loginCheckResult = loginCheck(req);
        if(loginCheckResult){
            // 没登陆
            return loginCheck;
        }

        const author = req.session.username; // 假数据
        const result = deleteBlog(id, author)

        return result.then(val => {
            if(val){
                return new SuccessModel();
            }else{
                return new ErrorModel('删除博客失败')
            }
        })
    }
}

module.exports = handleBlogRouter;