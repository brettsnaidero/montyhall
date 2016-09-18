function closest(element, query) {
  while (element !== document) {
    if (element.matches(query)){
      return element;
    }
    element = element.parentNode;
  }
  return false;
};

function delegate(selector, eventName, targetSelector, listener) {
  let delegatedTo = document.querySelector(selector);

  delegatedTo.addEventListener(eventName, event => {
    let closestMatch = closest(event.target, targetSelector);

    if (closestMatch) {
      event.delegateTarget = closestMatch;
      listener(event);
    }
  });
}
