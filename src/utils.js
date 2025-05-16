export function convertDateFormat(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function getDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function generateId() {
  return (
    Date.now().toString(36) + "-" + Math.random().toString(36).substring(2, 8)
  );
}

export function formatDateTime(date, time = null) {
  const date_str = time ? date + "T" + time : date;
  // console.log(date_str);
  const dateObj = new Date(date_str);

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const day = String(dateObj.getDate()).padStart(2, "0");

  let time_str = "";
  // if time is given
  if (time) {
    const hour = String(dateObj.getHours()).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    const a = hour < 12 || hour == 24 ? "AM" : "PM";

    // hour < 12 ==> AM
    // hour > 12 ==> PM
    // 12 ==> PM
    // 24 ==> AM
    time_str = `, ${hour % 12 || 12}:${minutes} ${a}`; // => ", hh:mm a"
  }

  return `${day}/${month}/${year}` + time_str;
}

// export { convertDateFormat, getDate, generateId };
