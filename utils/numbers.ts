const { format: formatUsdCurrency } = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

function formatDollar(price?: number | null) {
  return price !== undefined && price !== null ? formatUsdCurrency(price) : '-'
}

function formatNumber(
  amount: number | null | undefined | string,
  maximumFractionDigits: number = 2,
  compact?: boolean
) {
  const { format } = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: maximumFractionDigits,
    notation: compact ? 'compact' : 'standard',
  })
  if (!amount) {
    return '-'
  }
  if (Number(amount) >= 1000000000) {
    return '>1B'
  }
  return format(+amount)
}

const truncateFractionAndFormat = (
  parts: Intl.NumberFormatPart[],
  digits: number
) => {
  return parts
    .map(({ type, value }) => {
      if (type !== 'fraction' || !value || value.length < digits) {
        return value
      }

      let formattedValue = ''
      for (let idx = 0; idx < value.length && idx < digits; idx++) {
        formattedValue += value[idx]
      }
      return formattedValue
    })
    .reduce((string, part) => string + part)
}

export { formatDollar, formatNumber }
