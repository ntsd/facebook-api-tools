/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";
import React from "react";
import { Button } from "../components/Button";
import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { getLikePages } from "../services/likes";
import { unlikeObject } from "../services/unlike";

const limit = 20;

const Likes: React.FC<{}> = () => {
    const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery(
        "infiniteCharacters",
        async ({ pageParam, signal }) => {
            return await getLikePages(limit, signal, pageParam)
        },
        {
            getNextPageParam: (lastPage, pages) => {
                if (lastPage.paging.next) {
                    return lastPage.paging.next;
                }
            },
        }
    );

    if (status !== "success") return <p>No like pages data</p>

    return (
        <div className="flex items-center justify-center flex-col h-full">
            <div className="container mx-auto overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <InfiniteScroll
                        dataLength={data?.pages.length * limit}
                        next={fetchNextPage}
                        hasMore={hasNextPage || false}
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
                                    data.pages.map((page) => (
                                        page.data.map((likePage, i) => {
                                            return <tr key={`page-${i}`}>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <a href={likePage.link} className="block relative hover:text-gray-400" target="_blank" rel="noreferrer">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0">
                                                                <img alt={likePage.name} src={likePage.picture.data.url} className="mx-auto object-cover rounded-full h-10 w-10" loading='lazy' />
                                                            </div>
                                                            <div className="ml-3">
                                                                <p>
                                                                    {likePage.name}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </td>
                                                <td className="hidden md:table-cell px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p>
                                                        {likePage.about}
                                                    </p>
                                                </td>
                                                <td className="hidden lg:table-cell px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p>
                                                        {likePage.category}
                                                    </p>
                                                </td>
                                                <td className="hidden lg:table-cell px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p>
                                                        {likePage.followers_count}
                                                    </p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <Button onClick={() => {unlikeObject(likePage.id)}}>
                                                        Unlike
                                                    </Button>
                                                </td>
                                            </tr>
                                        })
                                    ))
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
