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
    let sql = `select * from blogs where id='${id}'`;
    return exec(sql).then(rows => {
        return rows[0];
    })
}

const newBlog = (blogData = {}) => {
    const { title, content, author } = blogData;
    const createTime = Data.now();

    const sql = `
        insert into blogs (title, content, author, createtime)
        values ('${title}', '${content}', '${author}', '${createTime}');
    `

    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
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