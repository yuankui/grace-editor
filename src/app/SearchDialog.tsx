import * as React from "react";
import {createRef, ReactNode} from "react";
import {connect} from 'react-redux';
import {AppStore} from "../redux/store";
import {Dispatch} from "redux";
import {DropdownSelect} from "../dropdown-select/select";
import {OpenPostCommand} from "../redux/commands/OpenPostCommand";
import {Modal} from "antd";
import {Post} from "../backend";
import Immutable from "immutable";
import Mousetrap from "mousetrap";
import './SearchDialog.less';
import {findAll} from "../utils";

interface Props {
    state: AppStore,
    dispatch: Dispatch,
}

interface State {
    showSearch: boolean,
}

interface SearchOption {
    title: string,
    subtitle: string,
    postId: string,
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
        Mousetrap.bindGlobal("command+o", e => {
            e.preventDefault();
            that.toggleSearch();
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
                                this.props.dispatch(new OpenPostCommand(data.postId));
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

    renderOption = (e: any, keyword: string) => {
        const words = findAll(e.title, keyword);
        const highlightedText = words
            .map(word => {
                if (word === keyword) {
                    return <span className='highlight'>{word}</span>;
                } else {
                    return word;
                }
            });

        return <div className='dropdown-select-item'>
            <div className='list-title'>
                {highlightedText}
            </div>
            <div className='list-subtitle'>
                {e.subtitle}
            </div>
        </div>
    };

    async onSearch(keyword: string): Promise<Array<SearchOption>> {
        return this.props.state.posts.valueSeq().toArray()
            .filter(post => post.title.indexOf(keyword) >= 0)
            .map(post => ({
                title: post.title,
                subtitle: this.getPath(post, this.props.state.posts),
                postId: post.id,
            }));
    }



    getPath(post: Post, posts: Immutable.OrderedMap<string, Post>): string {
        let path: Array<string> = [];
        while (post != null) {
            path.push(post.title);
            if (post.parentId == null) {
                break;
            }
            post = posts.get(post.parentId);
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