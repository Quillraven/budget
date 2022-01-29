import {Dispatch, SetStateAction, useEffect, useState} from "react";

export default <S>(key: string, defaultValue: S): [S, Dispatch<SetStateAction<S>>] => {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key)
    if (jsonValue) {
      return JSON.parse(jsonValue)
    }

    return defaultValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
