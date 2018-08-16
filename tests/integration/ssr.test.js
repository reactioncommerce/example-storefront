/*
 *   Test to Verify NextJS rendering pages via SSR
 */
const cheerio = require("cheerio");
const chai = require("chai");
const request = require("request");

const url = "http://localhost:4000";

describe("NextJS Loading", () => {
  it("SSR Loads with an HTML Body", () => {
    request(url, (err, resp, body) => {
      if (!err && resp.statusCode === 200) {
        const cheer = cheerio.load(body);
        chai.expect(cheer("#__next").find("div")).to.not.be.empty;
      }
    });
  });
});
