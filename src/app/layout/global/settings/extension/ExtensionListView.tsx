import React, {FunctionComponent} from 'react';
import {useExtensionManager} from "../../../../../globalPlugins/useExtensionManager";
import {useLang} from "../../../../../i18n/i18n";
import ExtensionView from "./ExtensionView";

interface Props {}

const ExtensionListView: FunctionComponent<Props> = (props) => {
    const manager = useExtensionManager();
    const extensions = manager.getExtensions();
    const lang = useLang();
    const list = extensions.map(e => <ExtensionView extension={e}/>);
    return <div>
        <h2>{lang['setting.extension.list.title']}</h2>
        {list}
    </div>;
};

export default ExtensionListView;
