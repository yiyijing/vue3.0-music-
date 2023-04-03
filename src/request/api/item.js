import service from "..";
// 获取歌单详情页面
export function getMusicitem(id){
    return service({
        method:'GET',
        url:`/playlist/detail?id=${id}`
    })
}

// 获取所有歌单信息
export function getMusicList(id){
    return service({
        method:'GET',
        url:`/playlist/track/all?id=${id}&limit=15&offset=0`
    })
}
