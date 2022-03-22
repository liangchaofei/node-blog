// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取博客列表 GET /api/blog/list */
export async function getBlogList(
  params?: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/blog/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
