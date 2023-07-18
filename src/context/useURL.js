import { useCallback } from "react"
import { networks } from "../utils/networks";

const toQueryMsg = (msg) => {
    try {
        return JSON.stringify(JSON.parse(msg))
    } catch (error) {
        return ""
    }
}

export default () => {
    const { lcd } = networks.mainnet
    const getUrl = useCallback(
        (contract, msg, baseUrl) => {
            const query_msg =
                typeof msg === "string" ? toQueryMsg(msg) : JSON.stringify(msg)

            return `${baseUrl || lcd}/cosmwasm/wasm/v1/contract/${contract}/smart/${window.btoa(query_msg)}`
        },
        [lcd]
    )
    return getUrl
}
