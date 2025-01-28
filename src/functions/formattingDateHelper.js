function dateFormatted(duedate){
    const date = new Date(duedate);

    // Use `toLocaleDateString` for a readable format
    const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    });

    return formattedDate
}

export {dateFormatted}