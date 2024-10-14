export const formatDatime = (dateTime) => {
    const currDateTime = new Date(dateTime);
    const date = String(currDateTime.getDate()).padStart(2, '0');
    const month = String(currDateTime.getMonth() + 1).padStart(2, '0');
    const year = currDateTime.getFullYear();

    let hours = currDateTime.getHours();
    const ampm = hours < 12 ? "am" : "pm";
    hours = hours % 12 || 12;
    const minutes = String(currDateTime.getMinutes()).padStart(2, '0');

    return `${date}/${month}/${year} ${String(hours).padStart(2, '0')}:${minutes}${ampm}`;
};
