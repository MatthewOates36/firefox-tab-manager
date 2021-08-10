import {createLoadHistoryScript} from "./load-history.js"

export class Tab {

    id
    localId
    window
}

export class TabManager {

    loadTab(urls) {
        browser.tabs.create({
            url: "/assets/load-history.html"
        }).then(tab => {
            browser.tabs.executeScript(tab.id, {code: createLoadHistoryScript(urls)})
        })
    }

    async getTabMap() {
        let tabs = (await browser.storage.local.get("tabs"))["tabs"]
        if (undefined === tabs) {
            return {}
        }
        return tabs
    }

    async getLocalTabId(remoteTabId) {
        return (await this.getTabMap())[remoteTabId]
    }

    async getRemoteTabId(localTabId) {
        return Object.fromEntries(Object.entries(await this.getTabMap()).map(e => [e[1], e[0]]))[localTabId]
    }

    setTabMap(tabMap) {
        browser.storage.local.set({"tabs": tabMap})
    }

    async setLocalTab(remoteTabId, localTabId) {
        let tabs = await this.getTabMap()
        tabs[remoteTabId] = localTabId
        this.setTabMap(tabs)
    }

    clear() {
        this.setTabMap({})
    }
}