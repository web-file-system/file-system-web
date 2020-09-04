import server from "./server";

export const saveHistory = (history) => {
    localStorage.setItem("history", JSON.stringify(history));
    window.dispatchEvent(new Event("history"));
};
export const getHistory = () => {
    const historyStr = localStorage.getItem("history");
    if (historyStr === undefined || historyStr === null) {
        return [server.root];
    } else {
        const history = JSON.parse(historyStr);
        if (history.length < 1) {
            return [server.root];
        } else {
            return history;
        }
    }
};
