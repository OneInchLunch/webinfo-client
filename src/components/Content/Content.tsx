import { useEffect, useState } from "react";
import { ContentPost } from "./ContentPost"

export const Content = (props: any) => {
    console.log(props)
    return (
    <>
        {
            props.posts.map((post: Post) => {
                return <ContentPost key={post.id} {...post} />
            })
        }
    </>
    );
}