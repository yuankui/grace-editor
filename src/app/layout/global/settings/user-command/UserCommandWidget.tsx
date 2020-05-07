import React, {FunctionComponent, useEffect} from 'react';
import {UserCommand, UserCommandName, UserCommandSettingKey} from "./UserCommand";
import _ from "lodash";
import {CronJob} from "cron";
import {useExtensionConfig} from "./useExtensionConfig";
import isHotkey from "is-hotkey";
import {executeCommand} from "./executeCommand";
import useAppStore from "../../../../hooks/useAppStore";

interface Props {}

const UserCommandWidget: FunctionComponent<Props> = (props) => {
    const commands: Array<UserCommand> = useExtensionConfig(UserCommandName, UserCommandSettingKey) || [];

    const workPath = useAppStore().settings.workSpace;
    useEffect(() => {
        const jobs = commands.filter(c => !_.isEmpty(c.cron) )
            .flatMap(c => {
                try {
                    const job = new CronJob(c.cron as string, () => {
                        executeCommand(c, workPath, true);
                    }, null, true, 'Asia/Shanghai');
                    return [job];
                } catch (e) {
                    console.log(`create job failed, job:${c.title}, error:${e.toString()}`);
                    return [];
                }
            });


        return () => jobs.forEach(job => job.stop());
    }, [commands]);

    useEffect(() => {
        const destroy = commands.filter(c => !_.isEmpty(c.hotkey))
            .map(c => {

                const listener = e => {
                    if (isHotkey(c.hotkey as string, e)) {
                        executeCommand(c, workPath);
                        e.stopImmediatePropagation();
                    }
                };
                window.addEventListener('keydown', listener);
                return () => {
                    window.removeEventListener('keydown', listener);
                }
            });

        return () => {
            destroy.forEach(d => d());
        }
    }, [commands]);
    return <>

    </>;
};

export default UserCommandWidget;
