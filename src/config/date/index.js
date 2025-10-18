export function DateFormatter (date) {
    const [HourString , MinuteString] =  date.split(':');
    const hour = Number(HourString) %24;
    return (hour%12 || 12) + ':' + MinuteString + ' ' + (hour < 12 ? 'AM' : 'PM');
    

}