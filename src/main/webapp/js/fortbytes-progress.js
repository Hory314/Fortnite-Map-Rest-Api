function toggleFortbyteIdInCookie()
{
    if (this.checked)
    {
        // add/update cookie
        let completedCookie = getCookie("remaining_fortbytes");

        let completedArray = [];
        if (completedCookie !== "") completedArray = JSON.parse(completedCookie);

        for (let i of completedArray) // check id exist already in cookie
        {
            if (i === $(this).attr("id"))
            {
                return; // nothing to do if exist
            }
        }
        completedArray.push($(this).attr("id"));
        setCookie("remaining_fortbytes", JSON.stringify(completedArray), 180)
    }
    else
    {
        // remove id from cookie
        let completedCookie = getCookie("remaining_fortbytes");

        let completedArray = [];
        if (completedCookie !== "") completedArray = JSON.parse(completedCookie);

        // remove all elements with given id
        let index;
        while ((index = completedArray.indexOf($(this).attr("id"))) > -1)
        {
            completedArray.splice(index, 1);
        }
        setCookie("remaining_fortbytes", JSON.stringify(completedArray), 180)
    }
    recalculateProgress();
}

function initCheckboxes()
{
    let completionCheckboxes = $("#left-menu .fortbyte-no span form input[type=checkbox]"); // checkbox elements

    let completedCookie = getCookie("remaining_fortbytes"); // get cookie...

    let completedArray = [];
    if (completedCookie !== "") completedArray = JSON.parse(completedCookie);

    for (let el of completionCheckboxes)
    {
        el.checked = (completedArray.indexOf($(el).attr("id"))) > -1;  // check checkbox if id present in cookie
    }
}

document.addEventListener("DOMContentLoaded", () =>
{
    recalculateProgress();
    initCheckboxes();

    let leftMenu = $("#left-menu");

    $("div.open-button").on("click", () =>
    {
        if (leftMenu.css("left") === "0" || leftMenu.css("left") === "0px")
        {
            leftMenu.css("left", "-400px"); // hide menu
            $("div.open-button").css("left", "0");
            $("div.open-button div.arrow").css("transform", "translate(25%, -50%)");
        }
        else if (leftMenu.css("left") === "-400px")
        {
            leftMenu.css("left", "0"); // show menu
            $("div.open-button").css("left", "400px");
            $("div.open-button div.arrow").css("transform", "translate(25%, -50%) rotate(180deg)");
        }
    });

    // on left-menu checkbox change (set/remove another cookie)
    leftMenu.find(".fortbyte-no form input[type=checkbox]").on("change", toggleFortbyteIdInCookie);

// TODO: continue work on progress bar
});