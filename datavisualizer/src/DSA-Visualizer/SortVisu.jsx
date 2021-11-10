import React from 'react'
import * as sortingAlgos from '../algorithms/sortingAlgos.js'
import './SortVisu.css'
// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise'

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red'

export default class SortVisu extends React.Component {
  constructor(props) {
    super(props)

    // Our main array
    this.state = {
      visArray: [],
    }
  }
  // When the app loads
  componentDidMount() {
    // just resets the array
    this.resetArray()
  }

  // creates array and pushes random values form 1-1000 to the array
  resetArray() {
    const visArray = []
    for (let index = 0; index < NUMBER_OF_ARRAY_BARS; index++) {
      visArray.push(randomInt(2, 800))
    }
    this.setState({ visArray })
  }

  bubbleSort() {}
  mergeSort() {
    const anims = sortingAlgos.mergeSort(this.state.visArray)
    for (let i = 0; i < anims.length; i++) {
      const bars = document.getElementsByClassName('visu-navbar')
      const isColorChange = i % 3 !== 2
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = anims[i]
        const barOneStyle = bars[barOneIdx].style
        const barTwoStyle = bars[barTwoIdx].style
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR
        setTimeout(() => {
          barOneStyle.backgroundColor = color
          barTwoStyle.backgroundColor = color
        }, i * ANIMATION_SPEED_MS)
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = anims[i]
          const barOneStyle = bars[barOneIdx].style
          barOneStyle.height = `${newHeight}px`
        }, i * ANIMATION_SPEED_MS)
      }
    }
    const sortedArrayJS = this.state.visArray.slice().sort((a, b) => a - b)
    const sortedArray = sortingAlgos.mergeSort(this.state.visArray)
    console.log(sortedArray)
    console.log(equalArrays(sortedArrayJS, sortedArray))
  }
  quickSort() {}
  heapSort() {}

  render() {
    const { visArray } = this.state

    return (
      // iterate through array and maping values to the divs
      <div className="visu-container">
        {visArray.map((value, index) => (
          <div
            className="visu-navbar"
            key={index}
            style={{ height: `${value}px` }}
          ></div>
        ))}
        <button onClick={() => this.resetArray()}>New Array</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
      </div>
    )
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
function equalArrays(arr1, arr2) {
  if (arr1.length !== arr2.length) return false
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false
  }
  return true
}
