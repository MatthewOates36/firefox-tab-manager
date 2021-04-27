browser.menus.onShown.addListener(async (info, tab) => {
    browser.menus.create({
        id: "addToWorkspace",
        type: "normal",
        title: "Add to workspace",
        contexts: ["tab"],
    })

    browser.menus.create({
        id: "addToWorkspace2",
        type: "normal",
        title: "Add to workspace 2",
        contexts: ["tab"],
    })

    browser.menus.refresh();
})