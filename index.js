import jsonfile from 'jsonfile';
import moment from 'moment';
import simpleGit from 'simple-git';
import random from 'random';

const FILE_PATH = './data.json';

const makeCommit = n => {
    // Base case: Once we hit 0, stop generating and push everything to GitHub
    if (n === 0) return simpleGit().push();

    // The contribution graph has 54 weeks (X) and 7 days (Y)
    const x = random.int(0, 54);
    const y = random.int(0, 6);

    // Subtract 1 year, then add random weeks and days to scatter the commits
    const DATE = moment().subtract(1, 'y').add(x, 'w').add(y, 'd').format();

    const data = {
        date: DATE
    };

    console.log(`Creating commit... Remaining: ${n} | Date: ${DATE}`);

    // Write the dummy date to data.json, then commit it with the backdated timestamp
    jsonfile.writeFile(FILE_PATH, data, () => {
        simpleGit().add([FILE_PATH]).commit(DATE, { '--date': DATE },
            makeCommit.bind(this, --n)
        );
    });
};

// This number dictates how many green squares you will generate.
makeCommit(100);