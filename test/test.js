import {fireEvent, getByTestId} from "@testing-library/dom"
import "@testing-library/jest-dom/extend-expect"
import jsdom, {JSDOM} from "jsdom"
import path from "path"

const BASE = path.resolve(__dirname, "../src")

let virtualConsole
let dom, body

jest.useFakeTimers()

describe("image carousel test", function () {
  beforeEach(async () => {
    virtualConsole = new jsdom.VirtualConsole()
    virtualConsole.on("error", console.error)
    dom = await JSDOM.fromFile(`${BASE}/index.html`, {
      runScripts: "dangerously",
      resources: "usable",
      pretendToBeVisual: true,
      virtualConsole
    })
    await loadDom(dom)
    body = dom.window.document.body
  })

  it('carousel should show the 1st image from the list by default', async function () {
    const image = getByTestId(body, "carousel-img")
    const imageSrc = await image.getAttribute('src')
    expect(imageSrc).toMatch('img-1.jpg')
  })

  it('Clicking on previous button should show the previous image', async function () {
    const next = getByTestId(body, "next")
    const prev = getByTestId(body, "previous")
    await fireEvent.click(next)
    await fireEvent.click(prev)

    const image = getByTestId(body, "carousel-img")
    const imageSrc = await image.getAttribute('src')
    expect(imageSrc).toMatch('img-1.jpg')
  })

  it('Clicking on next button should show the next image', async function () {
    const next = getByTestId(body, "next")
    await fireEvent.click(next)

    const image = getByTestId(body, "carousel-img")
    const imageSrc = await image.getAttribute('src')
    expect(imageSrc).toMatch('img-2.jpg')
  })

  it('Clicking on next button in the last item should show the first image', async function () {
    const next = getByTestId(body, "next")
    await fireEvent.click(next)
    await fireEvent.click(next)
    await fireEvent.click(next)
    await fireEvent.click(next)
    await fireEvent.click(next)

    const image = getByTestId(body, "carousel-img")
    const imageSrc = await image.getAttribute('src')
    expect(imageSrc).toMatch('img-1.jpg')
  })

  it('Clicking on previous button in the first item should show the last image', async function () {
    const prev = getByTestId(body, "previous")
    await fireEvent.click(prev)

    const image = getByTestId(body, "carousel-img")
    const imageSrc = await image.getAttribute('src')
    expect(imageSrc).toMatch('img-5.jpg')
  })

  it('Clicking on any indicator icon should show the appropriate image', async function () {
    const indicators = [
      getByTestId(body, "one"),
      getByTestId(body, "two"),
      getByTestId(body, "three"),
      getByTestId(body, "four"),
      getByTestId(body, "five"),
    ]

    for (let i = 0; i < indicators.length; i++) {
      const indicator = indicators[i]
      fireEvent.click(indicator)

      const image = getByTestId(body, "carousel-img")
      const imageSrc = await image.getAttribute('src')
      expect(imageSrc).toMatch(`img-${i + 1}.jpg`)
    }
  })

  it('when slide enabled should change the image for every 3 seconds', async function () {
    const slide = getByTestId(body, "slide")
    fireEvent.click(slide)

    jest.advanceTimersByTime(6000)

    const image = getByTestId(body, "carousel-img")
    const imageSrc = await image.getAttribute('src')
    expect(imageSrc).toMatch("img-3.jpg")
  })

  it('when slide enabled also user interaction like previous, next or indecator should work as expected', async function () {
    const slide = getByTestId(body, "slide")
    fireEvent.click(slide)

    jest.advanceTimersByTime(6000)

    const prev = getByTestId(body, "previous")
    fireEvent.click(prev)
    fireEvent.click(prev)

    const image = getByTestId(body, "carousel-img")
    const imageSrc = await image.getAttribute('src')
    expect(imageSrc).toMatch("img-1.jpg")
  })

  it('uncheck slide should stop changing the image for every 3 seconds', async function () {
    const slide = getByTestId(body, "slide")
    fireEvent.click(slide)

    jest.advanceTimersByTime(6000)

    let image = getByTestId(body, "carousel-img")
    let imageSrc = await image.getAttribute('src')
    expect(imageSrc).toMatch("img-3.jpg")

    fireEvent.click(slide)

    jest.advanceTimersByTime(6000)

    image = getByTestId(body, "carousel-img")
    imageSrc = await image.getAttribute('src')
    expect(imageSrc).toMatch("img-3.jpg")
  })
})

function loadDom(dom) {
  return new Promise((resolve, _) => {
    virtualConsole.on("log", log => {
      if (log === "DOM Loaded") resolve(dom)
    })
  })
}
