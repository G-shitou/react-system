// 引入createStore创建store
import { createStore } from 'redux';
// 引入所有的reducer
import reducer from './../reducer';
const state = {
    tags: [{title:'首页',path:'/home'}],
    isCollapsed: false,
    tagIndex: 0,
    menuKey: ''
}
const store = () => createStore(reducer, state);

export default store;