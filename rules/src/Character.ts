import { getEnumValues } from '@gamepark/rules-api'

export enum Character {
  Belle = 1, Cheyenne, Django, Doc, Ghost, Mei, Tuco
}

export const characters = getEnumValues(Character)
