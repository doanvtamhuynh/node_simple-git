import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

const markCommit = async (date) => {
    const data = { date: date.toISOString() };
    await jsonfile.writeFile(path, data);

    const git = simpleGit();
    await git.add([path]);
    await git.commit(date.toISOString(), { "--date": date.toISOString() });
};

const makeCommits = async () => {
    const git = simpleGit();
    const currentDate = moment();

    // Số commit ngẫu nhiên mỗi ngày
    const commitsPerDay = random.int(2, 10);
    for (let i = 0; i < commitsPerDay; i++) {
        // Thời gian commit ngẫu nhiên trong ngày
        const randomHours = random.int(0, 23);
        const randomMinutes = random.int(0, 59);
        const randomSeconds = random.int(0, 59);

        const commitDate = currentDate.clone()
            .hour(randomHours)
            .minute(randomMinutes)
            .second(randomSeconds);

        console.log(`Creating commit: ${commitDate.toISOString()}`);
        await markCommit(commitDate);
    }

    console.log("Pushing all commits...");
    await git.push();
};

// Chạy hàm tạo commit
makeCommits();
