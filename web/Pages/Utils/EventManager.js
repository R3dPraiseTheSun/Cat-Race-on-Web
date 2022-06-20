export const PastEvent = function(event){
    var evday = event[1].slice(0,2);
    var evmonth = event[1].slice(3,5);
    var evyear = event[1].slice(6,10);
    var evhour = event[2].slice(0,2);
    var evminutes = event[2].slice(3,5);
    var evseconds = event[2].slice(6,8);

    const eventDate = new Date(`${evyear}-${evmonth}-${evday} ${evhour}:${evminutes}:${evseconds}`);
    const today = new Date();
    if(eventDate > today) return true;
    return false

}

export function parseTime(s) {
    var part = s.match(/(\d+):(\d+)(?: )?(am|pm)?/i);
    var hh = parseInt(part[1], 10);
    var mm = parseInt(part[2], 10);
    var ap = part[3] ? part[3].toUpperCase() : null;
    if (ap === "AM") {
        if (hh == 12) {
            hh = 0;
        }
    }
    if (ap === "PM") {
        if (hh != 12) {
            hh += 12;
        }
    }
    return { hh: hh, mm: mm };
}