browser.tabs.query({}).then(tabs => {
    for(let tab of tabs) {
        const listItem = $(`<div class="tab-item">${tab.title}</div>`)

        listItem.appendTo($(".tab-list")[0])
    }
})
