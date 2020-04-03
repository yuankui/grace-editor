import {useCurrentPostId} from "../../utils";
import useAppStore from "./useAppStore";

export function useCurrentPost() {
    const postId = useCurrentPostId();
    const appStore = useAppStore();

    if (postId == null) {
        return null;
    }
    return appStore.posts.posts.get(postId);
}