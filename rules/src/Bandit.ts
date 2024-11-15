import { getEnumValues } from '@gamepark/rules-api'

export enum Bandit {
  Belle = 1, Cheyenne, Django, Doc, Ghost, Mei, Tuco
}

export const characters = getEnumValues(Bandit)
