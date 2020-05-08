import {UserCommand} from "./UserCommand";
import {exec} from "child_process";
import {message} from "antd";
import React from "react";
import NProgress from "nprogress";


export function executeCommand(command: UserCommand, workPath: string, quiet: boolean = false) {
    !quiet && NProgress.start();
    exec(command.command.config, {
        cwd: workPath,
    }, (error, stdout, stderr) => {
        // some errors
        if (error != null && error.code != 0) {
            message.error(<div>
                <h2>error</h2>
                <p>
                    stdout: {stdout}
                </p>
                <p>
                    stderr: {stderr}
                </p>
            </div>);
            !quiet && NProgress.done();
            return;
        }

        console.log("execute command success: " + command.title);
        !quiet && NProgress.done();
        !quiet && message.info("execute command success: " + command.title);
    });

}