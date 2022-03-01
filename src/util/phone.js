export function isPhoneNumber(tel) {
    var reg =/^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
    return reg.test(tel);
}

export function formatPhoneNumber(tel){
    if(!isPhoneNumber(tel)){
        console.info('不是手机号')
        return tel;
    }

    return tel.substring(0, 3)+"****"+tel.substr(tel.length-4)
}