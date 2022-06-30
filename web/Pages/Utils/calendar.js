
function event() {
	var startdate = new Date(2022, 6, 30);
	var caldate = startdate;
	var calyr;
	var calMo;
	var calda;
	var calset;
	var addSpace = "<p>";
	var i;
  document.write(
    "<p>BEGIN:VCALENDAR<br />VERSION:2.0<br />X-WR-CALNAME:e<br />X-WR-TIMEZONE:Romania<br />CALSCALE:GREGORIAN</p>");

  for (i = 1; i <= 52; i++)
{
	calyr = caldate.getFullYear().toString();
	calMo = ((caldate.getMonth() + 1) < 10 ? "0" + (caldate.getMonth() + 1) : "" + (caldate.getMonth() + 1));
	calda = (caldate.getDate() < 10 ? "0" + caldate.getDate() : "" + caldate.getDate());
	calset = calyr + calMo + calda;
	document.write(addSpace + "BEGIN:VEVENT" + "<br />");
	document.write("DTSTART;VALUE=DATE:" + calset + "<br />");
	document.write("DTEND;VALUE=DATE:" + calset + "<br />");
	document.write("SUMMARY:Race " + i + "<br />");
	document.write("X-GOOGLE-CALENDAR-CONTENT-TITLE:Race " + i + "<br />");
	document.write("X-GOOGLE-CALENDAR-CONTENT-TYPE:text/html <br />");
	document.write("END:VEVENT </p>");
	addWeek(caldate);
	addSpace = "<p>&nbsp";
	if (caldate.getFullYear() != startdate.getFullYear())
	{
		i = 53;
	};
};
}
