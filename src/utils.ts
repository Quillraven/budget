const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "eur",
  style: "currency",
  minimumFractionDigits: 0
})

export const formatCurrency = (value: number): string => {
  return CURRENCY_FORMATTER.format(value)
}

export const progressBarVariant = (spent: number, limit: number): string => {
  const ratio = spent / limit

  if (ratio < 0.5) {
    return "primary"
  } else if (ratio < 0.75) {
    return "warning"
  } else {
    return "danger"
  }
}
