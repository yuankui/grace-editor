import simplegit, {SimpleGit} from '../../copies/simple-git/promise';

export default interface GitRepo {
    init();
    status();
}

export class GitRepoImpl implements GitRepo {
    private readonly workDir: string;
    private readonly git: SimpleGit;

    constructor(workDir: string) {
        this.workDir = workDir;
        this.git = simplegit(workDir);
    }

    async init() {
        await this.git.init();
    }

    async status() {
        const statusResult = await this.git.status();
        console.log(statusResult);
    }
}