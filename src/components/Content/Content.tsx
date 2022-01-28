import { ContentPost } from "./ContentPost"

export const Content = (props: any) => {
    return (
    <>
        <div className="rd-spacer" />
        <h1 className="text-white text-center">New posts:</h1>
        <div className="sth-spacer" />
        {
            props.posts.slice(0).reverse().map((post: Post) => {
                return <ContentPost key={post.id} {...post} />
            })
        }
    </>
    );
}