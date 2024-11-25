const { Builder } = require('selenium-webdriver');

async function getDriver() {
  return new Builder().forBrowser('chrome').build();
}

module.exports = getDriver;