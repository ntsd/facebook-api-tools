import { getSession } from "next-auth/react"
import { StatusResponse } from "../types/facebook"
import axios from "./axios.config"

// Note: seem like unlike only work for page unlike page, post

// https://developers.facebook.com/docs/graph-api/reference/v15.0/object/likes#delete

// required `pages_manage_engagement` permission

export const unlikeObject = async (objectId: string): Promise<StatusResponse> => {
    return new Promise((resolve, reject) => {
        getSession()
            .then((session) => {
                if (!session) {
                    reject('can not get session')
                    return
                }
                let url = `/${objectId}/likes?access_token=${session.token.accessToken}`
                axios.delete<StatusResponse>(url)
                    .then(res => {
                        if (res.status != 200) {
                            reject('http error status: ' + res.status)
                            return
                        }
                        if (!res.data.success) {
                            reject('response status not success')
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
