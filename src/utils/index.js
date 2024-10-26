
// conver date string to readable date format
export const NumberToDate = (dateNumber) => {
    const date = new Date(dateNumber);
    const newDate = date.setDate(date.getDate() + 7)
    console.log(new Date(newDate).toDateString())
    const formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
    return formattedDate;
}