import React, {FunctionComponent, useEffect} from 'react';
import cmp from 'semver-compare';
import fetch from 'node-fetch';
import {useToasts} from "@zeit-ui/react";
import open from 'open'
interface Props {}

const currentVersion = VERSION;
const interval = 1000 * 3600 * 24;
const AutoUpdate: FunctionComponent<Props> = (props) => {
    const [toasts, setToast] = useToasts()

    async function checkUpdate() {
        const lastCheckTime = localStorage.getItem('lastCheckTime') || (new Date().getTime() - interval).toString();
        // 时间间隔不到一天，不检查更新。
        if (new Date().getTime() - parseInt(lastCheckTime) < interval) {
            return;
        }

        const response = await fetch('https://grace-note.app/version.json');
        const text = await response.text() || "{}";
        localStorage.setItem('lastCheckTime', new Date().getTime().toString());
        const obj = JSON.parse(text);
        const latestVersion = obj.latest;

        const openHome = () => {
            open('https://grace-note.app');
        }
        // 最新版本大于当前版本
        // if (cmp(latestVersion, currentVersion) >= 0) {
            setToast({
                text: '发现新版本，是否更新？',
                actions: [
                    {
                        name: '前往下载',
                        handler: openHome,
                    }
                ]
            });
        // }
    }
    useEffect(()  =>{
        checkUpdate();
    }, [])
    return <>

    </>;
};

export default AutoUpdate;
