const nodegit = require('nodegit');

var repo;
var index;
var oid;
var paths;

const promise = nodegit.Repository.open('/Users/yuankui/grace-docs')
    .then(r => {
        repo = r;
        return repo.getStatus()
    })
    .then(status => {
        const paths = [];
        for (let s of status) {
            paths.push(s);
        }
        return paths;
    })
    .then(p => {
        console.log('paths', p);
        paths = p;
        return repo.refreshIndex();
    })
    .then(i => {
        index = i;
    })
    .then(() => {
        const promises = paths.map(p => {
            if (p.isDeleted()) {
                index.removeByPath(p.path());
            } else {
                index.addByPath(p)
            }
        });
        return Promise.all(promises);
    })
    .then(() => {
        index.write();
    })
    .then(() => {
        return index.writeTree();
    })
    .then(oidResult => {
        oid = oidResult;
        return nodegit.Reference.nameToId(repo, 'HEAD');
    })
    .then(function (head) {
        return repo.getCommit(head);
    })
    .then(function(parent) {
        const author = nodegit.Signature.now("yuankui",
            "schacon@gmail.com");
        const committer = nodegit.Signature.now("yuankui2",
            "scott@github.com");

        return repo.createCommit("HEAD", author, committer, "this is message", oid, [parent]);
    })
    .done(function(commitId) {
        console.log("New Commit: ", commitId.tostrS());
    });