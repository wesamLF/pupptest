const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res) => {
  console.error("scraper running");

  const browser = await puppeteer.launch({
    headless:"new",
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--no-zygote",
    ],
    // executablePath:
    //   process.env.NODE_ENV === "production"
    //     ? process.env.PUPPETEER_EXECUTABLE_PATH
    //     : puppeteer.executablePath(),
  });
  try {
    const page = await browser.newPage();

    await page.goto("https://developer.chrome.com/");
    console.error("goto running");

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    // Type into search box
    await page.type(".search-box__input", "automate beyond recorder");
    console.error("type running");


    // Wait and click on first result
    const searchResultSelector = ".search-box__link";
    await page.waitForSelector(searchResultSelector);
    await page.click(searchResultSelector);
    console.error("click running");

    // Locate the full title with a unique string
    const textSelector = await page.waitForSelector(
      "text/Customize and automate"
    );
    const fullTitle = await textSelector.evaluate((el) => el.textContent);
    console.error("fullTitle running");

    // Print the full title
    const logStatement = `The title of this blog post is ${fullTitle}`;
    console.log(logStatement);
    res.send(logStatement);
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };