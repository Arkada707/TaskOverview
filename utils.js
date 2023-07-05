export function exportObjectAsCSV(data, fileName, options = {}) {
  const { keysAsHeader = false } = options;

  // Format the object data as a CSV string
  const csvData = convertJsObjectToCSV(data, keysAsHeader);

  // Create a Blob object from the CSV string
  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

  exportBlob(blob, fileName);
}

export function convertJsObjectToCSV(objArray, keysAsHeader = false) {
  const array = typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
  let str = "";

  if (keysAsHeader) {
    const header = Object.keys(array[0]).join(",");
    str += header + "\r\n";
  }

  for (let i = 0; i < array.length; i++) {
    let line = "";
    for (let index in array[i]) {
      if (line !== "") line += ",";

      line += array[i][index];
    }

    str += line + "\r\n";
  }

  return str;
}

export function exportBlob(blob, fileName) {
  // Generate a URL for the Blob object
  const url = URL.createObjectURL(blob);

  // Create a link element
  const link = document.createElement("a");

  // Set the necessary attributes for the link element
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);

  // Trigger a click event on the link element to download the file
  link.click();

  // Remove the link element
  link.remove();
}
