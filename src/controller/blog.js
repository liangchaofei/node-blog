const { exec } = require('../db/mysql')
const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `;
    if(author){
        sql+=`and author='${author}' `
    }
    if(keyword){
        sql+=`and title like '%${keyword}%' `
    }
    
    sql+= `order by createtime desc`;

    return exec(sql);
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

const newBlog = (blogData = {}) => {
    return {
        id: 3,
    }
}

const updateBlog = (id, blogData = {}) => {
    return true;
}

const deleteBlog = id => {
    return true;
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}