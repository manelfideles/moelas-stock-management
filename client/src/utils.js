export function formatBeverageName(bevName) {
    const bev = bevName.split('-');
    for (let i = 0; i < bev.length; i++)
        bev[i] = bev[i].charAt(0).toUpperCase() + bev[i].slice(1);
    return bev.join(' ');
}

export function unformatBeverageName(bevName) {
    const bev = bevName.split(' ');
    for (let i = 0; i < bev.length; i++)
        bev[i] = bev[i].toLowerCase()
    return bev.join('-');
}