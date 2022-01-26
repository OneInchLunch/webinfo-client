import { ContentPost } from "./ContentPost"
import '../../App.css'

export const Content = (props: any) => {
    return (
    <div className="dark-bg">
        {
            props.posts.map((post: Post) => {
                return <ContentPost key={post.id} {...post} />
            })
        }
    </div>
    );
}