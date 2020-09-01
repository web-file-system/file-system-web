import ajax from "axios";
import server from "./server";

function ajaxPost({ url, resolve, reject }) {
    return ajax
        .post(url)
        .then((result) => {
            // console.log("result:", result);
            const status = result.status;
            if (status === 200) {
                const data = result.data;
                resolve(data);
            } else {
                const error = {
                    code: status,
                    message: result.statusText,
                };
                reject(error);
            }
        })
        .catch((error) => {
            console.log("error:", error);
            reject(error);
        });
}
export function getFileListData() {
    return new Promise((resolve, reject) => {
        const url = `${server.host}/list`;
        ajaxPost({ url, resolve, reject })
            .then((result) => {
                // console.log("result:", result);
                resolve(result);
            })
            .catch((error) => {
                console.log("error:", error);
                reject(error);
            });
    });
}
