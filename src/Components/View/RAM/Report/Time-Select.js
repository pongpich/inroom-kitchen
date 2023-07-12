export function Settime(e) {
  let timeSet = [];
  let timeName =[];
  if (e === "morning") {
    timeSet.push({ timestart: "0600", timeend: "0959", timetext: "06:00-09:59", timename: "เช้า"});
  }
  if (e === "lunch") {
    timeSet.push({ timestart: "1000", timeend: "1559",timetext: "10:00-15:59", timename: "กลางวัน"  });
  }
  if (e === "dinner") {
    timeSet.push({ timestart: "1600 ", timeend: "2000",timetext: "16:00-20:00", timename: "เย็น" });
  }
  if (e === "alltime") {
    timeSet.push({ timestart: "0000", timeend: "2359",timetext: "", timename: "ทุกมื้อ" });
  }
  return timeSet;
}
