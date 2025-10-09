// Background color: #ffffcfff

const canvasElements = document.getElementsByTagName('canvas');
const link = document.createElement('a');
link.download = 'my-canvas-image.png';
const dataUrl = canvasElements[0].toDataURL('image/png');
link.href = dataUrl;
document.body.appendChild(link);
link.click();
document.body.removeChild(link);