import {Workspace, WorkspaceManager} from "../assets/workspace.js"
import {WindowManager} from "../assets/window.js"
import {TabManager, Tab} from "../assets/tab.js"

const globalSheet = browser.extension.getURL('browser/style.css')
const workspaceManager = new WorkspaceManager()
const windowManager = new WindowManager()
const tabManager = new TabManager()

browser.tabs.query({}).then(tabs => {
    for (let tab of tabs) {

    }
})

browser.stylesheet.load(globalSheet, 'AUTHOR_SHEET')

browser.webNavigation.onCommitted.addListener(details => {
    // console.log(details)
})

browser.menus.onShown.addListener(async (info, tab) => {
    let workspaces = await workspaceManager.getWorkspaces()

    for (let workspace of workspaces) {
        browser.menus.create({
            id: `add-${workspace.id}`,
            title: `Add to ${workspace.name}`,
            contexts: ["tab"]
        })

        browser.menus.create({
            id: `open-${workspace.id}`,
            title: `Open ${workspace.name}`,
            contexts: ["browser_action"]
        })
    }

    browser.menus.refresh()
})

browser.menus.onHidden.addListener(() => {
    browser.menus.removeAll()
})

browser.menus.onClicked.addListener(async (info, tab) => {
    let action = info.menuItemId

    if (action.includes('add-')) {
        let workspace = await workspaceManager.getWorkspace(action.replaceAll('add-', ''))

        workspace.addTab(tab)

        await workspaceManager.setWorkspace(workspace)

        updateTabColors()
    }
})

workspaceManager.setWorkspaces([
    Workspace.deserialize({i: 0, n: "Work", c: "#FF0000", t: []}),
    Workspace.deserialize({i: 1, n: "Home", c: "#00CC00", t: []})
])

function setTabColor(tab, color) {
    let sheetText = `data:text/css,arrowscrollbox > tab[linkedpanel^="panel-${tab.windowId}-"]:nth-child(${tab.index + 1}) > .tab-stack:after { background-color: ${color} !important; }`.replace('#', '%23')
    browser.stylesheet.load(sheetText, 'AUTHOR_SHEET')
}

async function updateTabColors() {
    const workspaces = await workspaceManager.getWorkspaces()

    for (let workspace of workspaces) {
        for (let tab of workspace.tabs) {
            setTabColor(tab, workspace.color)
        }
    }
}

browser.tabs.query({}).then(tabs => {

})

tabManager.loadTab(["https://stackoverflow.com/questions/23013573/swap-key-with-value-json", "https://www.desmos.com/calculator", "https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export"])
