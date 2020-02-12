const title = function (option){
    return {
        text: option.title || '',
        textStyle: {
            color: option.color || '#000',
            fontWeight: 700
        },
        subtext: option.subTitle || '',
        subtextStyle: {
            color: option.color || '#000',
            fontWeight: 400
        },
        left: 'center'
    }
}

export default {
    title
}