
function isLessThenTen(val){
    return val < 10?'0'+val:val
}

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