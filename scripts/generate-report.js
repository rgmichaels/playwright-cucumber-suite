const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "reports",
  reportPath: "reports/html",
  reportName: "Playwright Cucumber Report",
  pageTitle: "Test Report",
  displayDuration: true,
  metadata: {
    browser: { name: "chromium" },
    device: "CI/local",
    platform: { name: process.platform }
  }
});
