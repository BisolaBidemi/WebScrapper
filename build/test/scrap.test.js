"use strict";
const { scraperWrapper } = require('../src/scrap');
describe('Scrapper', () => {
    it('should scrap the right number of products from the website', async () => {
        const url = 'https://wltest.dns-systems.net/';
        const productOptions = await scraperWrapper(url, true);
        expect(productOptions).toHaveLength(6);
    }, 30000);
});
