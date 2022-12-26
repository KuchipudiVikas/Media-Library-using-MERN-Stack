const fs = require('fs')
var os = require("os");
for (let i = 11; i < 100; i++) {
    const string = `movies.uhd${i}@gmail.com : movies.${i}uhd`
    fs.appendFile("gmails.txt", string + os.EOL,
        { encoding: "latin1", mode: 0o666, flag: "a" },
        (err) => {
            if (err) {
                console.log(err);
            }
        });

}