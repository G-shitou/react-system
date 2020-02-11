/**
 * action 类型
 */
export const type = {
    ADD_TAG: 'ADD_TAG',
    IS_COLLAPSED: 'IS_COLLAPSED',
    DELETE_TAG: 'DELETE_TAG',
    CHANGE_TAG: 'CHANGE_TAG'
}

// 菜单点击切换，增加标签
export function addTag(tag) {
    return {
        type:type.ADD_TAG,
        tag
    }
}

// 点击tag关闭,删除标签
export function deleteTag(index){
    return {
        type:type.DELETE_TAG,
        index
    }
}

// 点击tag切换标签
export function changeTag(item){
    return {
        type:type.CHANGE_TAG,
        item
    }
}

// 点击折叠按钮,修改折叠状态
export function changeCollapsed(collapsed){
    return {
        type: type.IS_COLLAPSED,
        collapsed
    }
}