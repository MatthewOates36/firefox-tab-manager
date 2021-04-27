const urls = ["https://3015rangerrobotics.github.io/irh_leaderboard/#/", "https://www.thebluealliance.com/", "https://drive.google.com/drive/my-drive", "https://drive.google.com/drive/my-drive"]

const loadUrl = () => {
    if(urls.length > 0) {
        const url = urls.pop()
        setTimeout(() => {
            console.log(url)
            window.location = url
        }, 1000)
        loadUrl()
    }
}