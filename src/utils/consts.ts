export const UPLOAD_FILE_ERROR =
  "Looks like you forgot to upload the sheet. Please upload and try again";

export const SUCCESSFULLY_DOWNLOADED =
  "WSR Generated successfully. Don't forget to say Thank you to Hardik for his wonderful work";

export const SOMETHING_BAD_ERROR = "Something is wrong. Please try again";

export const jiraBaseURL = "https://splunk.atlassian.net/browse/";

export const defaultSprint = "Sprint 1";

export const jiraIssueBaseURL =
  "https://splunk.atlassian.net/issues/?jql=id in ";

export const dropZoneConfig = {
  maxFiles: 1,
  maxSize: 1024 * 1024 * 4,
  multiple: true,
  accept: {
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
      ".xlsx",
    ],
  },
};
