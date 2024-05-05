// place files you want to import through the `$lib` alias in this folder.

export function getRandom(arr: Array<unknown>) {
	return arr[Math.floor(Math.random() * arr.length)];
}
