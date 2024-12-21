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

const makeCommits = async (inputDate) => {
    const git = simpleGit();

    // Xử lý ngày được nhập vào
    const targetDate = moment(inputDate, "YYYY-MM-DD");
    if (!targetDate.isValid()) {
        console.error("Ngày không hợp lệ. Vui lòng nhập ngày theo định dạng YYYY-MM-DD.");
        return;
    }

    console.log(`Tạo commit cho ngày: ${targetDate.format("YYYY-MM-DD")}`);

    // Số commit ngẫu nhiên mỗi ngày
    const commitsPerDay = random.int(3, 20);
    for (let i = 0; i < commitsPerDay; i++) {
        // Thời gian commit ngẫu nhiên trong ngày
        const randomHours = random.int(0, 23);
        const randomMinutes = random.int(0, 59);
        const randomSeconds = random.int(0, 59);

        const commitDate = targetDate.clone()
            .hour(randomHours)
            .minute(randomMinutes)
            .second(randomSeconds);

        console.log(`Creating commit: ${commitDate.toISOString()}`);
        await markCommit(commitDate);
    }

    console.log("Pushing all commits...");
    await git.push();
};

// Chạy hàm tạo commit với ngày được nhập vào
const dateToCommit = "2024-12-21"; // Thay đổi ngày muốn tạo commit ở đây
makeCommits(dateToCommit);
