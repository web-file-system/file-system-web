import ajax from "axios";
import server from "./server";
import Qs from "qs";

ajax.defaults.headers["Content-Type"] = ["application/x-www-form-urlencoded"];

function ajaxPost({ url, data, resolve, reject }) {
    return ajax
        .post(url, Qs.stringify(data))
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
export function getFileListData(path) {
    return new Promise((resolve, reject) => {
        const url = `${server.host}/list`;
        const data = {
            path: path,
        };
        ajaxPost({ url, data, resolve, reject })
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

export function getRootDirListData(path) {
    return new Promise((resolve, reject) => {
        const url = `${server.host}/root`;
        const data = {
            path: path,
        };
        ajaxPost({ url, data, resolve, reject })
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

export function deleteFileOrDir({ type, path }) {
    return new Promise((resolve, reject) => {
        const url = `${server.host}/delete`;
        const data = {
            type: type,
            path: path,
        };
        ajaxPost({ url, data, resolve, reject })
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
