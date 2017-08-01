import cloneDeep from 'lodash/cloneDeep'

// listUtils
export default {
  update (list, listUpdates) {
    let result = cloneDeep(list)

    listUpdates.forEach(([action, value]) => {
      if (action === 'add') {
        result.push(value)
      } else if (action === 'delete') {
        result = result.filter(id => id !== value)
      }
    })

    return result
  },
  deepFilter (list, by1, by2, against) {
    return list.find(item1 => item1[by1].some(item2 => item2[by2] === against))
  }
}
