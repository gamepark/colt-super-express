import { getEnumValues } from '@gamepark/rules-api'

export enum Bandit {
  Belle = 1, Cheyenne = 2, Django = 3, Doc = 4, Ghost = 5, Mei = 6, Tuco = 7
}

export const characters = getEnumValues(Bandit)
