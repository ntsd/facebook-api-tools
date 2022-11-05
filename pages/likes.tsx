/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { getLikePages } from "../services/likes";
import { Page } from "../types/facebook";
import InfiniteScroll from "react-infinite-scroll-component";

const Likes: React.FC<{}> = () => {
    const { data: session, status: sessionStatus } = useSession()

    const [pages, setPages] = useState<Page[]>([])
    const [nextPage, setNextPage] = useState<string>("")
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        if (session && !isLoading && pages.length == 0) {
            setLoading(true)
            getLikePages()
                .then((data) => {
                    console.log(data)
                    setNextPage(data.likes.paging.next)
                    setPages(data.likes.data)
                    setLoading(false)
                })
        }
    }, [session, pages, isLoading])

    if (isLoading) return <p>Loading...</p>
    if (!pages) return <p>No pages data</p>

    return (
        <div className="flex items-center justify-center flex-col h-full">
            <div className="container mx-auto overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <InfiniteScroll
                        dataLength={pages.length}
                        next={() => console.log("fetching more data")}
                        hasMore={nextPage != ""}
                        loader={<h4>Loading...</h4>}
                    >
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                        Name
                                    </th>
                                    <th scope="col" className="hidden md:table-cell px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                        About
                                    </th>
                                    <th scope="col" className="hidden lg:table-cell px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                        Category
                                    </th>
                                    <th scope="col" className="hidden lg:table-cell px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                        Followers
                                    </th>
                                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    pages.map((page, i) => {
                                        return <tr key={`page-${i}`}>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <a href={page.link} className="block relative hover:text-gray-400" target="_blank" rel="noreferrer">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0">
                                                            <img alt={page.name} src={page.picture.data.url} className="mx-auto object-cover rounded-full h-10 w-10" loading='lazy' />
                                                        </div>
                                                        <div className="ml-3">
                                                            <p>
                                                                {page.name}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </td>
                                            <td className="hidden md:table-cell px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p>
                                                    {page.about}
                                                </p>
                                            </td>
                                            <td className="hidden lg:table-cell px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p>
                                                    {page.category}
                                                </p>
                                            </td>
                                            <td className="hidden lg:table-cell px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p>
                                                    {page.followers_count}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <Button>
                                                    Unlike
                                                </Button>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </InfiniteScroll>
                </div>
            </div>
        </div >
    )
}

export default Likes;
