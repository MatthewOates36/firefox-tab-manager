const globalSheet = browser.extension.getURL('browser/style.css')

setInterval(() => {

    browser.tabs.query({}).then(tabs => {
        for(let tab of tabs) {
            // console.log(tab)
            // console.log(tab.url)
            // console.log(tab.windowId)
            // browser
        }
    })

    // browser.theme.set
}, 5000)

// console.log(browser)

browser.stylesheet.load(globalSheet, 'AUTHOR_SHEET')

browser.webNavigation.onCommitted.addListener(details => {
    console.log(details)
})
//
// browser.tabs.create({
//     url: "https://www.google.com"
// }).then(tab => {
//     setTimeout(() => {
//         // browser.tabs.executeScript(tab.id, {code: 'console.log("TEST")\nhistory.pushState(undefined, "", "http://www.netflix.com")'})
//         console.log(tab.id)
//         console.log(tab.title)
//     }, 5000)
// })
//
// browser.tabs.executeScript({code: `console.log("TEST")`})

let createData = {
    url: "../assets/pageredirect/redirect.html",
    width: 250,
    height: 100
};
browser.tabs.create(createData)