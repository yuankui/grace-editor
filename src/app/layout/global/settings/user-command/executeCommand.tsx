import {UserCommand} from "./UserCommand";
import {exec} from "child_process";
import {message} from "antd";
import React from "react";
import NProgress from "nprogress";


export function executeCommand(command: UserCommand, workPath: string, quiet: boolean = false) {
    !quiet && NProgress.start();
    const process = exec(command.command.config, {
        cwd: workPath,
    });

    process.on('exit', code => {
        // some errors
        if (code != 0) {
            const out = process.stdout?.read();
            const error = process.stderr?.read();
            message.error(<div>
                <h2>error</h2>
                <p>
                    stdout: {out}
                </p>
                <p>
                    stderr: {error}
                </p>
            </div>);
            return;
        }

        console.log("execute command success: " + command.title);
        !quiet && NProgress.done();
        !quiet && message.info("execute command success: " + command.title);
    })
}