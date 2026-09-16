import { useEffect } from "react"


function isItemValid(data) {
  if (!Array.isArray(data)) return false
  const requiredProperties = ['description', 'amount', 'categoryId', 'time', 'date', 'id']
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  const timeRegex = /^\d{2}:\d{2}$/


  function dateOk({ item, property }) {
    if (!dateRegex.test(item[property])) return false

    const parts = item[property].split("-")
    const year = Number(parts[0])
    const month = Number(parts[1])
    const day = Number(parts[2])

    const newDate = new Date(year, month - 1, day)
    if (
      newDate.getFullYear() !== year
      || newDate.getMonth() !== month - 1
      || newDate.getDate() !== day
    ) return false

    return true
  }


  function timeOk({ item, property }) {
    if (!timeRegex.test(item[property])) return false
    const parts = item[property].split(":")
    const hour = Number(parts[0])
    const minute = Number(parts[1])

    if (hour > 23 || hour < 0 || minute > 59 || minute < 0) return false

    return true
  }


  return data.every(item => {
    if (typeof item !== 'object' || item === null) return false
    if (Object.keys(item).length !== requiredProperties.length) return false

    return requiredProperties.every(property => {
      return (
        (property in item)
        && (
          (property === 'date' && dateOk({ item, property }))
          || (property === 'time' && timeOk({ item, property }))
          || (property === 'amount' && Number.isFinite(item[property]))
          || (property !== 'amount' && property !== 'date' && property !== 'time' && typeof item[property] === 'string' && item[property].trim() !== '')
        )
      )
    })
  })
}

export function getStoredItemData(list) {
  try {
    const data = JSON.parse(localStorage.getItem(list))
    if (!isItemValid(data)) {
      throw new Error(`${list} data is not valid`)
    }
    return data
  } catch (error) {
    console.log(error)
    return []
  }
}


function isCategoryValid(data) {
  if (!Array.isArray(data)) return false
  const requiredProperties = ['id', 'name']

  return data.every(item => {
    if (typeof item !== 'object' || item === null) return false
    if (Object.keys(item).length !== requiredProperties.length) return false

    return requiredProperties.every(property => (
      (property in item) && (typeof item[property] === 'string') && (item[property].trim() !== '')
    ))
  })
}


export function getStoredCategoryData(list) {
  try {
    const data = JSON.parse(localStorage.getItem(list))
    if (!isCategoryValid(data)) {
      throw new Error(`${list} data is not valid`)
    }
    return data
  } catch (error) {
    console.log(error)
    return false
  }
}



export function useLocalStorage(key, value) {
  useEffect(() => {
    localStorage.setItem(`${key}`, JSON.stringify(value))
  }, [value, key])
}