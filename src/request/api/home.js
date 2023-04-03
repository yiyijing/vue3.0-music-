import service from "..";
// 获取首页轮播图的数据
export function getBanner(){
    return service({
        method:'GET',
        url:'/banner?type=2'
    })
}

// 发现好歌单
export function getMusicList(){
    return service({
        method:'GET',
        url:'/personalized?limit=30'
    })
}
 // 获取详细歌词 /playlist/detail
 export function getLydrice(data){
    return service({
        method:'GET',
        url:`/lyric?id=${data}`
    })
}

 // 搜索/cloudsearch?keywords=海阔天空
 export function getMusicSearch(data){
    return service({
        method:'GET',
        url:`/cloudsearch?keywords=${data}`
    })
}

//登录页面
export function getPheno(data){
    return service({
        method:'GET',
        url: `/login/cellphone?phone=${data.phone}&password=${data.password}`
    })
}

// 个人中心