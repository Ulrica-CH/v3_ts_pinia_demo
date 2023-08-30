import request from '@/utils/request'

/** 顶部搜索 */
export function hintSearch(params:any) {
  return request({
    url: 'api/metadata/metatable/hint',
    method: 'post',
    data: params
  })
}
/** 左侧筛选 */
export function getAsideList(params:any) {
  return request({
    url: '/api/metadata/metatable/catalog',
    method: 'post',
    data: params
  })
}
/** 数据库筛选 */
export function getTopCatalogIdCount(params:any) {
  return request({
    url: 'api/metadata/metaTable/topCatalog',
    method: 'get',
    params
  })
}
/** 数据主题筛选 */
export function getCatalogIdCount(params:any) {
  return request({
    url: 'api/metadata/metaTable/catalog',
    method: 'get',
    params
  })
}
/** 采纳部门筛选 */
export function getSourceDepartIdCount(params:any) {
  return request({
    url: 'api/metadata/metaTable/sourceDepart',
    method: 'get',
    params
  })
}
/** 接入方式筛选 */
export function getSourceTypeCount(params:any) {
  return request({
    url: 'api/metadata/metaTable/sourceType',
    method: 'get',
    params
  })
}
/** 数据层级筛选 */
export function getMetaTableLevelCount(params:any) {
  return request({
    url: 'api/metadata/metaTable/level',
    method: 'get',
    params
  })
}
// /** 获取中间列表 */
// export function getMetaTableList(params) {
//   return request({
//     url: 'api/metadata/metaTable/list',
//     method: 'post',
//     params
//   })
// }
/** 获取中间列表 */
export function getMetaTableList(params:any) {
  return request({
    url: 'api/metadata/metatable/list',
    method: 'post',
    data: params
  })
}
export function editTable(params:any) {
  return request({
    url: 'api/metadata/metatable/edit-table',
    method: 'post',
    data: params
  })
}
export function deleteTable(params:any) {
  return request({
    url: 'api/metadata/metatable/del-table',
    method: 'post',
    data: params
  })
}
/** 右侧详情数据量 */
export function getDataCount(params:any) {
  return request({
    url: 'api/metadata/metatable/data-count',
    method: 'post',
    data: params
  })
}
/** 右侧数据源信息 */
export function getDataSource(params:any) {
  return request({
    url: 'api/metadata/metatable/query-data-source',
    method: 'post',
    data: params
  })
}
/** 右侧详情数据质量 */

/** 右侧详情字段信息 */
export function getSchema(params:any) {
  return request({
    url: 'api/metadata/metatable/query-schema',
    method: 'post',
    data: params
  })
}
// export function getSchema(params) {
//   return request({
//     url: 'api/metadata/metaTable/schema',
//     method: 'get',
//     params
//   })
// }
/** 新增信息 */
export function addTable(params:any) {
  return request({
    url: 'api/metadata/metatable/add-table',
    method: 'post',
    data: params
  })
}
// export function addTable(params) {
//   return request({
//     url: 'api/metadata/metaTable/addTable',
//     method: 'post',
//     data: params
//   })
// }

/** 查询字典 */
/** 查询所有字典 */
export function getAllDict(params:any) {
  return request({
    url: 'api/sys_dict/query_sys_dict_admin',
    method: 'get',
    params
  })
}
