export function mergeSort(array) {
  const animations = []
  if (array.length <= 1) return array
  const auxArray = array.slice()
  sortHelp(array, 0, array.length - 1, auxArray, animations)
  return animations
}

function sortHelp(mainArray, startIndex, endIndex, auxArray, animations) {
  if (startIndex === endIndex) return
  const middleIdx = Math.floor((startIndex + endIndex) / 2)
  sortHelp(auxArray, startIndex, middleIdx, mainArray, animations)
  sortHelp(auxArray, middleIdx + 1, endIndex, mainArray, animations)
  merge(mainArray, startIndex, middleIdx, endIndex, auxArray, animations)
}

function merge(
  mainArray,
  startIndex,
  middleIndex,
  endIndex,
  auxArray,
  animations,
) {
  let k = startIndex
  let i = startIndex
  let j = middleIndex + 1
  while (i <= middleIndex && j <= endIndex) {
    // Chnage the color
    animations.push([i, j])
    // revert the ones we're comaring
    animations.push([i, j])
    if (auxArray[i] <= auxArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the aux array.
      animations.push([k, auxArray[i]])
      mainArray[k++] = auxArray[i++]
    } else {
      animations.push([k, auxArray[j]])
      mainArray[k++] = auxArray[j++]
    }
  }
  while (i <= middleIndex) {
    animations.push([i, i])
    animations.push([i, i])
    animations.push([k, auxArray[i]])
    mainArray[k++] = auxArray[i++]
  }
  while (j <= endIndex) {
    animations.push([j, j])
    animations.push([j, j])
    animations.push([k, auxArray[j]])
    mainArray[k++] = auxArray[j++]
  }
}
