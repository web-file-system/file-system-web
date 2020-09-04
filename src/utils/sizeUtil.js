export default function size(Byte) {
    const KB = Byte / 1024;
    if (KB < 1024) {
        return `${KB.toFixed(1)} K`;
    } else {
        const M = KB / 1024;
        if (M < 1024) {
            return `${M.toFixed(1)} M`;
        } else {
            const G = M / 1024;
            return `${G.toFixed(1)} G`;
        }
    }
}
