

export function dateTimeFormatter(mongoDateTime) {
  // Convert MongoDB Date object to JavaScript Date object
  const jsDate = new Date(mongoDateTime);

  // Extract hours and minutes
  const hours = jsDate.getHours();
  const minutes = jsDate.getMinutes();

  // Format the time string
  const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;

  return formattedTime;
}


