// ADD THIS FUNCTION to your existing Apps Script.
// Keep your existing doPost and cleanPhone functions as-is.
// Then redeploy: Deploy > Manage Deployments > Edit > New Version > Deploy

function doGet(e) {
  const data = {
    name: (e.parameter.name || "").trim(),
    phone: e.parameter.phone || "",
    email: (e.parameter.email || "").trim(),
    source: (e.parameter.source || "").trim(),
  };

  // Reuse the same core logic as doPost
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");

  const name = data.name;
  const phone = cleanPhone(data.phone);
  const email = data.email;
  const source = data.source;

  // Validation
  if (!name || phone.length !== 10) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: "Please enter a valid name and 10-digit phone number."
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // Duplicate check
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    const existingPhones = sheet.getRange(2, 4, lastRow - 1, 1).getValues();
    const exists = existingPhones.some(row => cleanPhone(row[0]) === phone);
    if (exists) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          message: "This phone number is already registered."
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  // Generate Ticket ID and save
  const ticketId = "SATNA-" + Utilities.getUuid().substring(0, 6).toUpperCase();

  sheet.appendRow([
    new Date(),
    ticketId,
    name,
    phone,
    email,
    source
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      ticketId: ticketId,
      location: "Satna, Madhya Pradesh",
      phone: phone,
      email: email
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
