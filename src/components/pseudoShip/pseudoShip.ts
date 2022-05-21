export function updateMouseCoords(e: MouseEvent) {
  console.log(e.clientX, e.clientY);
}

document.addEventListener("mousemove", updateMouseCoords);
