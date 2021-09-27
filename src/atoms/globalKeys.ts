import pkg from "../../package.json"

const prefix = `${pkg.name}.global`

export const globalActiveContentPlayerIdAtomKey = `${prefix}.activeContentPlayerId`

export const globalContentPlayerIdsAtomKey = `${prefix}.contentPlayerIds`
