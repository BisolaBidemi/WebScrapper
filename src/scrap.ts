

const puppeteer = require('puppeteer')
const fs = require('fs');
import { Browser } from "puppeteer"


export const scraperWrapper = async (url: string, test:boolean = false) => {

    // Simulate a browser navigation experience
    const browser: Browser = await puppeteer.launch({headless: false})
    const page =  await browser.newPage();
    await page.goto(url)

    const resData = await page.evaluate((url) => {

        // Convert price to a float
        const convertPrice = (price: string) => {
            return parseFloat(price.replace('£', ''))
        }

        // Pick out appropriate values to Scrap
        const parentCls = Array.from(document.querySelectorAll('.widget .package-features'))
        const data = parentCls.map((item: any) => ({
            title: item.querySelector('.package-name').innerHTML,
            description: item.querySelector('.package-description').innerHTML,
            price: convertPrice(item.querySelector('.package-price .price-big').innerHTML),
            discount: item.querySelector('.package-data').innerHTML,
        }))

        
        // Sort by annual price (descending)
        data.sort((a, b) => {
            return b.price - a.price});
            return data;
    }, url)

    // console.log(resData)
    await browser.close();

    if(test) return resData

    // save to file.
    // I have decided to use this as an in-app database, so the API can fetch data via filestream
    fs.writeFile('data.json', JSON.stringify(resData), (err: any) => {
        if(err) throw err
        console.log('Successfully saved JSON')
    });
}

const url = 'https://wltest.dns-systems.net/';
scraperWrapper(url);