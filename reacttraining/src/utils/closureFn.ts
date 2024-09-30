// encapsulate, closure function
export function Counter () {
	let count = 0

	const increasement = () => {
		count++ // 2
		console.log('count in ', count)
	}
	const decreasement = () => {
		count--
		console.log('count de ', count)
	}
	const reset = () => {
		count = 0
		console.log('reset ', count)
	}
	return {
		increasement,
		decreasement,
		reset
	}
}

const counter = Counter()
counter.increasement()
counter.increasement()
counter.increasement()
counter.decreasement()
