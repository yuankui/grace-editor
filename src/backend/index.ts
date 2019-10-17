import {RawDraftContentState} from "draft-js";

export interface Backend {
    /**
     * 存储图像，返回url
     * @param file
     * @param id
     */
    saveImage(file: File, id: string): Promise<string>;

    /**
     * 删除文章
     * @param id
     */
    deletePost(id: string): Promise<any>;
    /**
     * 获取文章属性结构
     */
    getPosts(): Promise<Array<Post>>,

    /**
     * 保存文章
     * @param post
     */
    savePost(post: Post): Promise<Post>,

    /**
     * 获取文章详情
     * @param id
     */
    getPost(id: string): Promise<Post | null>,
}

export interface Post {
    /**
     * id组成规则，创建时间
     */
    id: string,

    /**
     * 父id，表示父子关系
     */
    parentId: string | null,

    /**
     * 权重，约到约排前面,当精度过细后，要进行一次调整
     *
     * (1|2|3)*
     *
     * 重排序的时候，默认自己+2，排前-1，排后+1
     */
    weight: string,
    title: string,
    tags: Array<string>,
    content: RawDraftContentState,
    children: Array<string>,
}