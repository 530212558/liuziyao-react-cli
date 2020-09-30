

// export function returnFloat(value) {    // 补零两位小数
//     var value = Math.round(parseFloat(value) * 100) / 100;  //  转化为两位小数，并对两位小数后的四舍五入。
//     var xsd = value.toString().split(".");
//     if (xsd.length == 1) {
//         value = value.toString() + ".00";
//         return value;
//     }
//     if (xsd.length > 1) {
//         if (xsd[1].length < 2) {
//             value = value.toString() + "0";
//         }
//         return value;
//     }
// }

export function convertTimeZone(oldTime){
    const timeZone =  Math.abs(new Date().getTimezoneOffset()/60);
    const newDate = new Date(oldTime)

    return new Date(newDate.getTime()+(timeZone * 60 * 60 * 1000)).toLocaleString('zh', { hour12: false })
}

