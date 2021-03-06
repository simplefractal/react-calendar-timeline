'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getParentPosition = getParentPosition;
// TODO: can we use getBoundingClientRect instead??
function getParentPosition(element) {
  var xPosition = 0;
  var yPosition = 0;
  var first = true;

  while (element) {
    if (!element.offsetParent && element.tagName === 'BODY' && element.scrollLeft === 0 && element.scrollTop === 0) {
      element = document.scrollingElement || element;
    }
    xPosition += element.offsetLeft - (first ? 0 : element.scrollLeft) + element.clientLeft;
    yPosition += element.offsetTop - (first ? 0 : element.scrollTop) + element.clientTop;
    element = element.offsetParent;
    first = false;
  }
  return { x: xPosition, y: yPosition };
}