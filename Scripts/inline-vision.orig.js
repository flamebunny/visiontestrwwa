var visionWrapper
var videoElem

const skyOneUrl = "https://skyliverwwa-i.akamaihd.net/hls/live/570288/skyliverwwa/sky1rw.m3u8"
const skyTwoUrl = "https://skyliverwwa-i.akamaihd.net/hls/live/570288/skyliverwwa/sky2rw.m3u8"

var loaded = false

function init() {
    console.log('Vision.init()')

    visionWrapper = document.createElement('div')
    visionWrapper.classList.add('inline-vision')

    videoElem = document.createElement('video')
    visionWrapper.appendChild(videoElem)

    var skyOneButton = document.createElement('div')
    skyOneButton.classList.add('channel-btn', 'skyOne')
    skyOneButton.innerText = 'Sky One'
    skyOneButton.addEventListener('click', () => changeChannel(skyOneUrl))
    visionWrapper.appendChild(skyOneButton)

    var skyTwoButton = document.createElement('div')
    skyTwoButton.classList.add('channel-btn', 'skyTwo')
    skyTwoButton.innerText = 'Sky Two'
    skyTwoButton.addEventListener('click', () => changeChannel(skyTwoUrl))
    visionWrapper.appendChild(skyTwoButton)

    document.body.appendChild(visionWrapper)

    videoElem.addEventListener('click', () => {
        visionWrapper.classList.toggle('max')
    })

    setTimeout(() => {
        document.querySelector('a[href="/#vision/home"]').addEventListener('click', () => {
            openVision()
        })
    }, 200)

    openVision()
}

function openVision() {
    console.log('Vision.openVision()')
    visionWrapper.classList.add('open')

    if (!loaded) {
        changeChannel(skyOneUrl)
    } else {
        videoElem.play()
    }
}

function closeVision() {
    console.log('Vision.closeVision()')
    visionWrapper.classList.remove('open')
    videoElem.pause()
}

function changeChannel(url) {
    videoElem.pause()

    var hls = new Hls()
    hls.loadSource(url)
    hls.attachMedia(videoElem)
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoElem.play()
        loaded = true
    })
}

init()
