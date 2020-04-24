import React, {FunctionComponent} from 'react';
import {useExtensionManager} from "../../../../../globalPlugins/useExtensionManager";
import {useLang} from "../../../../../i18n/i18n";
import ExtensionView from "./ExtensionView";
import Message from "../../../../../i18n/Message";

interface Props {}

const ExtensionListView: FunctionComponent<Props> = (props) => {
    const manager = useExtensionManager();
    const extensions = manager.getExtensions();
    const list = extensions.map(e => <ExtensionView extension={e}/>);
    return <div>
        <h2><Message value={'setting.extension.list.title'}/></h2>
        {list}
    </div>;
};

export default ExtensionListView;
