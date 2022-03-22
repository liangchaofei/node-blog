import React, { useEffect } from 'react';
import { getBlogList } from '@/services/blog/api';

const List = React.memo(() => {
  useEffect(() => {
    console.log('aa');
    getBlogList().then((res) => {
      console.log('res', res);
    });
  }, []);
  return <div>List</div>;
});

export default List;
