export interface LiangchenCheckInPart {
    "number": string,
    "name": string,
    "cadName": string,
    "containerId": string,
    "location": string,
    "fileUpdateTime": string,
    "cadType": "ASM" | "PRT",
    "subPart": {
        "number": string,
        "quantity": string
    }[]
}

export interface LiangchenCheckInInput {
    part: LiangchenCheckInPart[]
}