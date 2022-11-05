import { getSession } from "next-auth/react"
import { LikePagesResponse } from "../types/facebook"
import axios from "./axios.config"

// https://developers.facebook.com/docs/graph-api/reference/page/
const likeQuery = 'me?fields=likes.limit(5){id,name,about,link,picture,followers_count,category}' // 'me?fields=likes.limit(200){id,name,about,link,picture}'

export const getLikePages = async (after?: string): Promise<LikePagesResponse> => {
    return new Promise((resolve, reject) => {
        getSession()
            .then((session) => {
                if (!session) {
                    reject('can not get session')
                    return
                }
                let url = `${likeQuery}&access_token=${session.token.accessToken}`
                if (after) {
                    url += `&after=${after}`
                }
                axios.get(url)
                    .then(res => {
                        if (res.status != 200) {
                            reject('http error status: ' + res.status)
                            return
                        }
                        resolve(res.data)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
            .catch(err => {
                reject(err)
            })
    });
}
