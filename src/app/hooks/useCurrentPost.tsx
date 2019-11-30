import {useCurrentPostId} from "../../utils";
import useAppStore from "./useAppStore";

export function useCurrentPost() {
    const postId = useCurrentPostId();
    if (postId == null) {
        return null;
    }

    const appStore = useAppStore();
    return appStore.posts.posts.get(postId);
}