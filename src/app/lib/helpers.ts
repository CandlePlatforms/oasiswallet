import { bech32 } from 'bech32'
import { quantity, staking, types } from '@oasisprotocol/client'
import { WalletBalance } from 'app/state/wallet/types'
import { decode as base64decode } from 'base64-arraybuffer'

export const uint2hex = (uint: Uint8Array) => Buffer.from(uint).toString('hex')
export const hex2uint = (hex: string) => new Uint8Array(Buffer.from(hex, 'hex'))
export const base64ToUint = (value: string) => new Uint8Array(base64decode(value))

export const shortPublicKey = async (publicKey: Uint8Array) => {
  return await staking.addressFromPublicKey(publicKey)
}

export const publicKeyToAddress = async (publicKey: Uint8Array) => {
  const data = await staking.addressFromPublicKey(publicKey)
  return staking.addressToBech32(data)
}

export const addressToPublicKey = async (addr: string) => {
  return staking.addressFromBech32(addr)
}

export const uint2bigintString = (uint: Uint8Array) => quantity.toBigInt(uint).toString()
export const stringBigint2uint = (number: string) => quantity.fromBigInt(BigInt(number))

export const isValidAddress = (addr: string) => {
  if (!addr.match(/^oasis1/)) {
    return false
  }
  try {
    bech32.decode(addr)
    return true
  } catch (e) {
    return false
  }
}

export function concat(...parts: Uint8Array[]) {
  let length = 0
  for (const part of parts) {
    length += part.length
  }
  let result = new Uint8Array(length)
  let pos = 0
  for (const part of parts) {
    result.set(part, pos)
    pos += part.length
  }
  return result
}

export const parseNumberToBigInt = (value: number) => BigInt(Math.round(value * 10 ** 9))
export const parseStringValueToInt = (value: string) => parseFloat(value) * 10 ** 9

export function parseRpcBalance(account: types.StakingAccount): WalletBalance {
  const zero = stringBigint2uint('0')

  const balance = {
    available: uint2bigintString(account.general?.balance || zero),
    debonding: uint2bigintString(account.escrow?.debonding?.balance || zero),
    escrow: uint2bigintString(account.escrow?.active?.balance || zero),
  }

  const total = BigInt(balance.available) + BigInt(balance.debonding) + BigInt(balance.escrow)

  return { ...balance, total: total.toString() }
}
