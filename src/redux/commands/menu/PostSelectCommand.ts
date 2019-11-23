import {push} from "connected-react-router";

export function PostSelectCommand(postId: string) {
    return push(`/post?postId=${postId}`)
}