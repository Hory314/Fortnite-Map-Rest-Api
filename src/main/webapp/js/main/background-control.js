function removeMapBgClasses()
{
    let map = $("#fnbr_map");
    let classList = map.attr("class");
    let classArray = classList.split(/\s+/);

    let classBuilder = "";
    for (let clazz of classArray)
    {
        if (!clazz.startsWith("bg-"))
        {
            classBuilder += clazz + " ";
        }
    }
    map.attr("class", classBuilder);
}

function hideSpikes()
{
    $("#fnbr_map .bg-spikes").css("display", "none");
}

function showSpikes()
{
    $("#fnbr_map .bg-spikes").css("display", "block");
}

document.addEventListener("DOMContentLoaded", () =>
{
    let map = $("#fnbr_map");

    let bgClass = getCookie("bg");

    if (bgClass !== "")
    {
        removeMapBgClasses();
        switch (bgClass)
        {
            case "bg-white":
            case "bg-black":
            case "bg-gray":
            case "bg-light-gray":
            {
                hideSpikes();
                break;
            }
            default:
            {
                showSpikes();
            }
        }
        map.addClass(bgClass);
    }

    $("#settings div:not(:first-child)").on("click", (e) =>
    {
        let clicked = $(e.target);
        removeMapBgClasses();
        let classToAdd = clicked.attr("class");

        map.addClass(classToAdd);

        // noinspection FallThroughInSwitchStatementJS
        switch (classToAdd)
        {
            case "bg-white":
            case "bg-black":
            case "bg-gray":
            case "bg-light-gray":
            {
                hideSpikes();
                break;
            }
            default:
            {
                showSpikes();
            }
        }

        // hit ESC key to close lightbox
        let ev = new KeyboardEvent('keydown', {
            altKey: false,
            bubbles: true,
            cancelBubble: false,
            cancelable: true,
            charCode: 0,
            code: "Esc",
            composed: true,
            ctrlKey: false,
            currentTarget: null,
            defaultPrevented: true,
            detail: 0,
            eventPhase: 0,
            isComposing: false,
            isTrusted: true,
            key: "Esc",
            keyCode: 27,
            location: 0,
            metaKey: false,
            repeat: false,
            returnValue: false,
            shiftKey: false,
            type: "keydown",
            which: 27
        });

        document.dispatchEvent(ev);

        setCookie("bg", classToAdd, "180");
    });
});
