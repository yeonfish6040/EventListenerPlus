function addEventsListener(events) => {
    Object.keys(events).forEach(eventName => {
        Array.from(events[eventName]).forEach(eventHandler => {
            let animation = eventHandler.animation;
            if (eventHandler.hasOwnProperty("nomobile")) animation = (...args) => {if (window.innerWidth <= 720) return; eventHandler.animation(...args);};
            if (eventHandler.selector === "document") {
                document.addEventListener(eventName, (e) => animation(e, document));
                return;
            }
            if (eventHandler.hasOwnProperty("all") && eventHandler.all)
                document.querySelectorAll(eventHandler.selector).forEach(element => element.addEventListener(eventName, (e) => animation(e, element)));
            else
                document.querySelector(eventHandler.selector).addEventListener(eventName, (e) => animation(e, document.querySelector(eventHandler.selector)));
        });
    });
}
