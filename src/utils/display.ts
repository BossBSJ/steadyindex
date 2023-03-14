import { BigNumber } from 'ethers'
import Numeral from 'numeral'

/**
 * Floor decimal number
 */
const _NumeralFormat = (num: string | BigNumber | number) => {
  return Numeral(num).format('0,0.[00]a', (value) => Math.floor(value))
}
/**
 * toA is format number to auto K M B T after the number
 * @param num the number that want to format
 * @param fallBack the result if nothing
 */
export const toA = (
  num?: string | number,
  fallBack?: string,
): string | undefined => {
  if (!num && num !== 0 && fallBack) return fallBack
  if (Number.isNaN(num)) return '0'
  // the meaning of undefined is loading
  if (!num && num !== 0) return undefined
  // small number handler
  if (
    (typeof num === 'number' && num < 0.01 && num > 0) ||
    (typeof num === 'string' &&
      parseFloat(num) < 0.01 &&
      parseFloat(num) > 0)
  ) {
    let _num = num
    const res = Numeral(_num).format('0.[0000]a')
    return res === 'NaN' ? '0' : res === '0' ? '0' : '<0.01'
  }
  // if (
  //   (typeof num === 'number' && num < 0.01) ||
  //   (typeof num === 'string' && parseFloat(num) < 0.01) ||
  //   (typeof num === 'object' && num.lt(0.01))
  // ) {
  //   if (typeof num === 'object' && num.isNaN()) return '0'
  //   let _num = num
  //   if (typeof num === 'object') _num = num.toFixed(5)
  //   const res = Numeral(_num).format('0.[0000]a')
  //   return res === 'NaN' ? '0' : res
  // }

  // default return
  return _NumeralFormat(num).toLocaleUpperCase()
}

export const dashIf0 = (num?: string) => {
  if (!num) return
  if (num === '0') return '-'
  return num
}

export const shortenAddress = (address?: string, [h, t]: number[] = [4, 4]) => {
  if (!address) return ''
  const head = address.slice(0, h)
  const tail = t === 0 ? '' : address.slice(-1 * t, address.length)
  return address.length > h + t ? [head, tail].join('...') : address
}

export const formatNumber = (
  num?: number | string | BigNumber,
): string | undefined => {
  if (!num) return undefined
  return Number(num).toLocaleString('en-US')
}
