module.exports.toRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const hoursString = hours.toString().padStart(2, '0');
    const minutesString = remainingMinutes.toString().padStart(2, '0');

    return `${hoursString}:${minutesString}`;
}

module.exports.options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'ddd91bd90fmsh4f56c17f86db0bdp1c50acjsn11ac76127c4c',
        'X-RapidAPI-Host': 'mdblist.p.rapidapi.com'
    }
};