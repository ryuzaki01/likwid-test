function truncateUrl(url: string) {
  return url.slice(0, 15) + '…' + url.slice(-10)
}

function truncateStr(str: string, length: number = 30, shrinkInidicator?: string) {
  return str.length > length ? str.slice(0, length) + (shrinkInidicator || '…') : str
}

function truncateAddress(address: string, shrinkInidicator?: string) {
  return address.slice(0, 4) + (shrinkInidicator || '…') + address.slice(-4)
}

function truncateEns(ensName: string, shrinkInidicator?: string) {
  if (ensName.length < 24) return ensName

  return ensName.slice(0, 20) + (shrinkInidicator || '…') + ensName.slice(-3)
}

export { truncateUrl, truncateAddress, truncateEns, truncateStr }
