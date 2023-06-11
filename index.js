"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = require('puppeteer');
const fs = require('fs');
const url = 'https://wltest.dns-systems.net/';
const main = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);
    const resData = await page.evaluate((url) => {
        const convertPrice = (price) => {
            return parseFloat(price.replace('£', ''));
        };
        const parentCls = Array.from(document.querySelectorAll('.widget .package-features'));
        const data = parentCls.map((item) => ({
            title: item.querySelector('.package-name').innerHTML,
            description: item.querySelector('.package-description').innerHTML,
            price: convertPrice(item.querySelector('.package-price .price-big').innerHTML),
            discount: item.querySelector('.package-data').innerHTML,
        }));
        // Sort by annual price (descending)
        data.sort((a, b) => {
            return b.price - a.price;
        });
        return data;
    }, url);
    console.log(resData);
    await browser.close();
    fs.writeFile('data.json', JSON.stringify(resData), (err) => {
        if (err)
            throw err;
        console.log('Successfully saved JSON');
    });
};
main();
