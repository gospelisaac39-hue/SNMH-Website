function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Submissions');
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Submissions');
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp', 'Event', 'Name', 'Email', 'Dominant', 'Secondary',
      'Critic', 'Distancer', 'Perfectionist', 'Worrier', 'Pleaser',
      'Adviser', 'Performer', 'Restless', 'Analyst', 'Victim', 'Answers'
    ]);
  }

  var data = JSON.parse(e.postData.contents);
  var s = data.scores || {};

  sheet.appendRow([
    new Date(),
    data.event || '',
    data.name || '',
    data.email || '',
    data.dominant || '',
    data.secondary || '',
    s.critic != null ? s.critic : '',
    s.distancer != null ? s.distancer : '',
    s.perfectionist != null ? s.perfectionist : '',
    s.worrier != null ? s.worrier : '',
    s.pleaser != null ? s.pleaser : '',
    s.adviser != null ? s.adviser : '',
    s.performer != null ? s.performer : '',
    s.restless != null ? s.restless : '',
    s.analyst != null ? s.analyst : '',
    s.victim != null ? s.victim : '',
    data.answers ? data.answers.join(',') : ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
