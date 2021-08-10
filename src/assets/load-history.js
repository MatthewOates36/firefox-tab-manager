export function createLoadHistoryScript(urls) {
    return `const urls = ['${urls.join("','")}']

    const loadUrl = () => {
        if (urls.length > 0) {
            let url = urls.pop()
            window.history.pushState({}, url, "/assets/pageredirect/redirect.html?url=" + url)
            loadUrl()
        } else {
            location.reload()
        }
    }


    if (urls.length > 1) {
        let url = urls.pop()
        window.history.replaceState({}, url, "/assets/pageredirect/redirect.html?url=" + url)
        loadUrl()
    } else if (urls.length === 1) {
        location.replace(urls.pop())
    } else {
        location.replace("about:blank")
    }`
}