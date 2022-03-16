const handleBlogRouter = (req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];

    // 获取博客列表
    if(method === 'GET' && path === '/api/blog/list'){
        return {
            msg: '获取博客列表的接口'
        }
    }

    // 获取博客详情
    if(method === 'GET' && path === '/api/blog/detail'){
        return {
            msg: '获取博客详情的接口'
        }
    }

    // 新建博客
    if(method === 'POST' && path === '/api/blog/new'){
        return {
            msg: '新建博客的接口'
        }
    }

    // 更新博客
    if(method === 'POST' && path === '/api/blog/update'){
        return {
            msg: '更新博客的接口'
        }
    }

    // 删除博客
    if(method === 'DELETE' && path === '/api/blog/delete'){
        return {
            msg: '删除博客的接口'
        }
    }
}

module.exports = handleBlogRouter;