export class WindowManager {

    async getWindowMap() {
        let windows = (await browser.storage.local.get("windows"))["windows"]
        if(undefined === windows) {
            return {}
        }
        return windows
    }

    async getLocalWindowId(remoteWindowId) {
        return (await this.getWindowMap())[remoteWindowId]
    }

    async getRemoteWindowId(localWindowId) {
        return Object.fromEntries(Object.entries(await this.getWindowMap()).map(e => [e[1], e[0]]))[localWindowId]
    }

    setWindowMap(windowMap) {
        browser.storage.local.set({"windows": windowMap})
    }

    async setLocalWindow(remoteWindowId, localWindowId) {
        let windows = await this.getWindowMap()
        windows[remoteWindowId] = localWindowId
        this.setWindowMap(windows)
    }

    clear() {
        this.setWindowMap({})
    }
}