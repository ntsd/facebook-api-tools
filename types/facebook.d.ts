export interface Paging {
    cursors: {
        before: string;
        after: string;
    }
    next: string;
}

export interface ResponseObject<T> {
    data: T[]
    paging: Paging
}

export interface Picture {
    data: {
        url: string
        height: number
        width: number
        is_silhouette: boolean
    }
}

export interface Page {
    id: string
    name: string
    about: string
    link: string
    picture: Picture
    followers_count: number
    category: string
}

export interface LikePagesResponse {
    likes: ResponseObject<Page>
}
