/*
 *   Test to Verify NextJS rendering pages via SSR
 */

const cheerio = require('cheerio');
const chai = require('chai');
const request = require('request');
let expect = chai.expect

let url = 'localhost:3000';

describe('NextJS Loading', () => {

    it('SSR Loads with an HTML Body', () => {
        request(url, (err, resp, body) => {
            if (!err && resp.statusCode == 200) {
                let $ = cheerio.load(body);
                expect($('#__next').find('div')).to.not.be.empty;
            }
        });
    })

})
