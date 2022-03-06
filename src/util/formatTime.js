
function isLessThenTen(val){
    return val < 10?'0'+val:val
}

// 格式化时间
export function formatTime(time, format){

    var dealTime = new Date(time)

    if( isNaN(dealTime.getTime()) ){
        console.warn('请上传时间')
        return time;
    }

    return format
        .replace('YYYY', dealTime.getFullYear())
        .replace('MM', isLessThenTen(dealTime.getMonth()+1))
        .replace('dd', isLessThenTen(dealTime.getDate()))
        .replace('HH', isLessThenTen(dealTime.getHours()))
        .replace('mm', isLessThenTen(dealTime.getMinutes()))
        .replace('ss', isLessThenTen(dealTime.getSeconds()))

}

// 计算和今天过去了多久
export function calCurrentTime(time){
    let paramDate = formatTime(time, 'YYYY-MM-dd HH:mm:ss')
    let paramTime = new Date(paramDate).getTime()
    let currentTime = new Date().getTime()
    let calSecond = parseInt((currentTime-paramTime)/1000)
    if(calSecond > (60*60*24)){
        return parseInt(calSecond/(60*60*24))+'天前'
    }else if(calSecond > (60*60)){
        return parseInt(calSecond/(60*60))+'小时前'
    }else if(calSecond > 60){
        return parseInt(calSecond/(60))+'分钟前'
    }else {
        return parseInt(calSecond)+'秒前'
    }
}


