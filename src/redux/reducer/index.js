/**
 * reducer
 */
import { type } from './../action';
const ebikeData = (state, action) => {
    // 浅克隆问题导致组件不更新
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        // 点击菜单增加标签
        case type.ADD_TAG:
            // 判断是否已经存在tag
            const flag = newState.tags.some( (item,index) => {
                if(item.path === action.tag.path){
                    // 改变tagIndex
                    newState.tagIndex = index;
                    return true;
                }else{
                    return false;
                }
            })
            // 新增tag不重复
            if(!flag){
                // 改变tags和tagIndex
                newState.tags.push(action.tag);
                newState.tagIndex = newState.tags.length - 1;
            }
            // 改变menuKey
            newState.menuKey = action.tag.path;
            return newState;
        //点击删除tag标签
        case type.DELETE_TAG:
            // 删除tag
            newState.tags.splice(action.index,1);
            // 判断当前展示标签是否是删除标签,并改变tagIndex的值
            if(newState.tagIndex === action.index){
                newState.tagIndex = Number(action.index) - 1;
                newState.menuKey = newState.tags[Number(action.index) - 1].path;
            }else if(newState.tagIndex > action.index){
                newState.tagIndex = newState.tagIndex - 1;
            }
            return newState;
        case type.CHANGE_TAG:
            // 切换tag,改变menuKey和tagIndex
            newState.tagIndex = action.item.tagIndex;
            newState.menuKey = action.item.menuKey;
            return newState;
        // 点击菜单折叠按钮
        case type.IS_COLLAPSED:
            newState.isCollapsed = action.collapsed;
            return newState
        default:
            return {...newState};
    }
};

export default ebikeData;