import * as React from "react";
import {createRef, ReactNode} from "react";
import {connect} from 'react-redux';
import {AppStore, Post, PostsStore} from "../redux/store";
import {Dispatch} from "redux";
import {DropdownSelect} from "./DropdownSelect";
import {Modal} from "antd";
import {findAll} from "../utils";
import {PostSelectCommand} from "../redux/commands/menu/PostSelectCommand";
import isHotkey from "is-hotkey";

interface Props {
    state: AppStore,
    dispatch: Dispatch,
}

interface State {
    showSearch: boolean,
}

interface SearchOption {
    key: string,
    title: string,
    subtitle: string,
    postId: string,
    tags: Array<string>,
}

class SearchDialog extends React.Component<Props, State> {
    private readonly searchRef: React.RefObject<DropdownSelect>;

    constructor(props) {
        super(props);
        this.searchRef = createRef();
        this.state = {
            showSearch: false,
        }
    }

    componentDidMount(): void {
        const that = this;
        window.addEventListener("keydown", e => {
            if (isHotkey('mod+o', e)) {
                e.preventDefault();
                that.toggleSearch();
            }
        });
    }


    render(): ReactNode {
        return <Modal
            className='modal-search'
            visible={this.state.showSearch}
            onOk={e => this.hideSearch()}
            footer={null}
            onCancel={e => this.hideSearch()}
        >
            <DropdownSelect ref={this.searchRef}
                            onSelect={(i, data: SearchOption) => {
                                this.props.dispatch(PostSelectCommand(data.postId));
                                this.hideSearch();
                            }}
                            maxHeight={300}
                            onSearch={keyword => this.onSearch(keyword)}
                            renderItem={this.renderOption}/>
        </Modal>
    }

    toggleSearch() {
        const showSearch = this.state.showSearch;
        this.setState({
            showSearch: !showSearch,
        });
        if (this.searchRef.current != null && !showSearch) {
            this.searchRef.current.focusAndReset();
        }
    }

    hideSearch = () => {
        this.setState({
            showSearch: false,
        })
    };

    renderOption = (e: SearchOption, keyword: string, active: boolean) => {
        keyword = keyword.toLowerCase();

        const words = findAll(e.title, keyword);
        const highlightedText = words
            .map(word => {
                if (word === keyword) {
                    return <span className='highlight'>{word}</span>;
                } else {
                    return word;
                }
            });

        return <div key={e.key} className={'dropdown-select-item' + " active-" + active}>
            <div className='list-title'>
                {highlightedText}
            </div>
            <div className='list-subtitle'>
                {e.subtitle}
                {this.renderTags(e.tags)}
            </div>
        </div>;
    };

    renderTags(tags: Array<string>) {
        const children = tags.map(t => <div className='search-tag'>{t}</div>);
        return <div className='search-tags'>{children}</div>;
    }

    async onSearch(keyword: string): Promise<Array<SearchOption>> {
        return this.props.state.posts.posts.valueSeq().toArray()
            .filter(post => post.title.toLowerCase().indexOf(keyword.toLowerCase()) >= 0)
            .map(post => ({
                title: post.title,
                subtitle: this.getPath(post.id, this.props.state.posts),
                postId: post.id,
                tags: post.tags,
                key: post.id,
            }));
    }

    getPath(postId: string, posts: PostsStore): string {
        let path: Array<string> = [];

        let maxLoop = 100;

        while (postId != null && (maxLoop--)>0) {
            let post: Post = posts.posts.get(postId);
            path.push(post.title);

            const parentId = posts.parentMap.get(postId);
            if (parentId == null) {
                break;
            }

            postId = parentId;
        }

        return "/ " + path.reverse().join(" / ")
    }

}

function mapState(state: AppStore): Partial<Props> {
    return {
        state: state,
    }
}

export default connect(mapState)(SearchDialog);