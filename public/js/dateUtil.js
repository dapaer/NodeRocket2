Date.prototype.parseStr = function(a) {
    var b = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
      , c = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      , d = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
      , e = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
      , f = ["上午", "下午"]
      , g = this.getFullYear() + ""
      , h = g.substr(2);
    a = a.replaceAll("YYYY", g),
    a = a.replaceAll("YY", h);
    var i = this.getMonth() + 1
      , j = i < 10 ? "0" + i : i
      , k = b[i - 1];
    a = a.replaceAll("MMM", k),
    a = a.replaceAll("MM", j),
    a = a.replaceAll("M", i);
    var l = this.getDate()
      , m = l < 10 ? "0" + l : l;
    a = a.replaceAll("DD", m),
    a = a.replaceAll("D", l);
    var n = this.getHours()
      , o = n < 10 ? "0" + n : n;
    a = a.replaceAll("hh", o),
    a = a.replaceAll("h", n);
    var p = this.getMinutes()
      , q = p < 10 ? "0" + p : p;
    a = a.replaceAll("mm", q),
    a = a.replaceAll("m", p);
    var r = this.getSeconds()
      , s = r < 10 ? "0" + r : r;
    a = a.replaceAll("ss", s),
    a = a.replaceAll("s", r);
    var t = this.getDay();
    a = a.replaceAll("CWEEK", d[t]),
    a = a.replaceAll("WEEK", c[t]),
    a = a.replaceAll("WEK", e[t]);
    var u = n > 12 ? 1 : 0;
    return a = a.replaceAll("NOON", f[u]),
    a.indexOf("NaN") != -1 ? "" : a
}
,
Date.prototype.initTime = function(a, b, c, d) {
    var e = new Date(a.getTime());
    return b >= 0 && e.setHours(b),
    c >= 0 && e.setMinutes(c),
    d >= 0 && e.setSeconds(d),
    e
}
,
Date.prototype.parseToDate = function() {
    return this
}
,
Date.prototype.addMin = function(a) {
    var b = new Date(this.getTime() + 60 * a * 1e3);
    return b
}
,
Date.prototype.addTime = function(a) {
    var b = new Date(this.getTime() + a);
    return b
}
,
Date.prototype.addHour = function(a) {
    return this.addTime(60 * a * 60 * 1e3)
}
,
Date.prototype.addDay = function(a) {
    return this.addTime(24 * a * 60 * 60 * 1e3)
}
,
Date.prototype.compareDay = function(a) {
    var b = a.parseToDate().parseStr("YYYY-MM-DD").parseToDate()
      , c = this.parseToDate().parseStr("YYYY-MM-DD").parseToDate()
      , d = (b.getTime() - c.getTime()) / 24 / 60 / 60 / 1e3;
    return d = Math.abs(Math.floor(d))
}
,
Date.prototype.compareMin = function(a) {
    var b = a.parseToDate().parseStr("YYYY-MM-DD hh:mm:ss").parseToDate()
      , c = this.parseToDate().parseStr("YYYY-MM-DD hh:mm:ss").parseToDate()
      , d = (b.getTime() - c.getTime()) / 60 / 1e3;
    return d = Math.abs(Math.floor(d))
}
,
String.prototype.parseToDate = function() {
    return new Date(this.replace(/-/g, "/").substr(0, 19))
}
,
String.prototype.parseToHalfDate = function() {
    var a = new Date(this.replace(/-/g, "/").substr(0, 19))
      , b = a.parseStr("YYYY-MM-DD hh:mm").substr(0, 10)
      , c = a.parseStr("YYYY-MM-DD hh:mm").substr(11, 16);
    switch (c) {
    case "00:00":
        return b + " 全天";
    case "12:00":
        return b + " 上午";
    case "23:59":
        return b + " 下午"
    }
}
,
String.prototype.parseToAmHalfDate = function() {
    var a = new Date(this.replace(/-/g, "/").substr(0, 19))
      , b = a.parseStr("YYYY-MM-DD hh:mm").substr(0, 10)
      , c = a.parseStr("YYYY-MM-DD hh:mm").substr(11, 16);
    switch (c) {
    case "00:00":
        return b + " 上午";
    case "12:00":
        return b + " 下午";
    default:
        return b + " " + c
    }
}
,
String.prototype.parseToPmHalfDate = function() {
    var a = new Date(this.replace(/-/g, "/").substr(0, 19))
      , b = a.parseStr("YYYY-MM-DD hh:mm").substr(0, 10)
      , c = a.parseStr("YYYY-MM-DD hh:mm").substr(11, 16);
    switch (c) {
    case "12:00":
        return b + " 上午";
    case "23:59":
        return b + " 下午";
    default:
        return b + " " + c
    }
}
,
Date.prototype.compareNowDay = function() {
    var a = (new Date).parseToDate().parseStr("YYYY-MM-DD").parseToDate()
      , b = this.parseToDate().parseStr("YYYY-MM-DD").parseToDate()
      , c = (a.getTime() - b.getTime()) / 24 / 60 / 60 / 1e3;
    return c = Math.abs(Math.floor(c))
}
,
Date.prototype.compareNowDayReturn = function() {
    var a = (new Date).parseToDate().parseStr("YYYY-MM-DD").parseToDate()
      , b = this.parseToDate().parseStr("YYYY-MM-DD").parseToDate()
      , c = (a.getTime() - b.getTime()) / 24 / 60 / 60 / 1e3;
    return c > 0
}
,
Date.prototype.compareDate = function(a) {
    var b = a.parseToDate().parseStr("YYYY-MM-DD").parseToDate()
      , c = this.parseToDate().parseStr("YYYY-MM-DD").parseToDate()
      , d = c.getTime() - b.getTime();
    return d > 0
}
,
String.prototype.replaceAll = function(a, b) {
    return this.replace(new RegExp(a,"gm"), b)
}
,
String.prototype.parseStr = function() {
    return this
}