if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('sw.js').then((_reg) => {
		console.log('Service worker registered.');
	});
}
