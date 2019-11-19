import {CommandType} from "../index";
import {AppStore} from "../../store";
import GitCommand from "./GitCommand";
import {message} from "antd";
import {Reference, Signature} from "nodegit";

// refer: https://github.com/nodegit/nodegit/blob/master/examples/add-and-commit.js
export default class GitCommitCommand extends GitCommand {
    private readonly message: string;

    constructor(message: string) {
        super();
        this.message = message;
    }

    name(): CommandType {
        return "Git/Commit";
    }

    async processGit(state: AppStore): Promise<AppStore> {
        const repo = state.repo;

        if (!repo) {
            return state;
        }

        const statusFiles = await repo.getStatus();
        const index = await repo.refreshIndex();

        for (let statusFile of statusFiles) {
            await index.addByPath(statusFile.path());
        }
        await index.write();
        const oid = await index.writeTree();

        const head = await Reference.nameToId(repo, 'HEAD');
        const parent = await repo.getCommit(head);
        const author = Signature.now("grace-user",
            "grace-user@some.where");
        const committer = Signature.now("grace-user",
            "grace-user@some.where");

        const newOid = await repo.createCommit("HEAD", author, committer, this.message, oid, [parent]);

        message.info("commit success, version:" + newOid.tostrS());
        return state;
    }

}