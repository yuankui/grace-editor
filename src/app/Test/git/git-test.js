const {Repository} = require('nodegit');

const promise = Repository.open('/Users/yuankui/grace-docs')
    .then(repo => {
        repo.getStatus()
            .then(status => {
                console.log(status);
            })
    });