import ajax, { AxiosResponse } from "axios";
import server from "./server";

interface Result {
    code: number;
    message: string;
    data?: any;
}

interface CallFunc {
    (param: Result): void;
}
interface AjaxParam {
    url: string;
    resolve: CallFunc;
    reject: CallFunc;
}

function ajaxPost(param: AjaxParam) {
    return ajax
        .post(param.url)
        .then((result: AxiosResponse) => {
            console.log("result:", result);
            const status = result.status;
            if (status === 200) {
                param.resolve(result.data);
            } else {
                const error = {
                    code: result.status,
                    message: result.statusText,
                };
                param.reject(error);
            }
        })
        .catch((error) => {
            param.reject(error);
        });
}

export function getFileList(path: string) {
    return new Promise((resolve, reject) => {
        const url = `${server.host}/list`;

        ajaxPost({ url, resolve, reject })
            .then((result: AxiosResponse | void) => {
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
