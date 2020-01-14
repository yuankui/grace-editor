const _ = require('lodash');

const a = {
    "name": "yuankui",
    "age": 11,
    "gender": true,
    "fav": [
        "basketball",
        "movie",
        "games"
    ]
};


console.log(_.isArray(a));
