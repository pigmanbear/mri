let imageNumber = 1

const indicators = ["one", "two", "three", "four", "five"].forEach((v) => {
  const indicator = document.getElementById(v)
  indicator.onclick = () => displayImage(indicator.value)
})
const displayImage = (n) => {
  document.getElementById("carousel-img").src = `/assets/images/img-${n}.jpg`
}

//action functions
displayImage(imageNumber)

const next = () => {
  imageNumber = (imageNumber % 5) + 1
  displayImage(imageNumber)
}

const previous = () => {
  imageNumber = imageNumber === 1 ? 5 : imageNumber - 1
  displayImage(imageNumber)
}

//action buttons
document.getElementById("previous").onclick = previous
document.getElementById("next").onclick = next

let slideInterval = null
let checkBox = document.getElementById("slide")
checkBox.addEventListener("change", () => {
  if (checkBox.checked) {
    slideInterval = setInterval(() => {
      next()
    }, 3000)
  } else {
    clearInterval(slideInterval)
  }
})
