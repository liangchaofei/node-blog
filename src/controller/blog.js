const getList = (author, keyword) => {
    // 先返回假数据
    return [
        {
            id: 1,
            title: '标题',
            content: '内容',
            createTime: '2022-01-01',
            author: 'curry'
        }
    ]
}

const getDetail = id => {
    return {
        id: 1,
        title: '标题',
        content: '内容',
        createTime: '2022-01-01',
        author: 'curry'
    }
}

module.exports = {
    getList,
    getDetail
}