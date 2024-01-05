const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res) => {
  console.error("scraper running");

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser',
    headless: 'new',
    slowMo: undefined
  });
  try {

    const page = await browser.newPage()
    await page.goto("https://webscraper.io/test-sites/e-commerce/allinone", {
      waitUntil: "networkidle2",
    })
    const data = await page.evaluate(() => {

      return document.querySelector("h4.float-end.price.card-title.pull-right").textContent


    })
    res.send(data)
    await browser.close()

  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };