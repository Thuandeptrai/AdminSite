import { atom } from "jotai"

export const currentUserState = atom({
    key: 'currentUserState',
    default: {name: '', email: '', userId: null}
  })