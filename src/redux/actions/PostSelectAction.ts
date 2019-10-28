import {push} from "connected-react-router";

export default function PostSelectAction(postId: string) {
    return push('/post/' + postId);
}