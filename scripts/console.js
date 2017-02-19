const Console = {
	print : (output, isError) => {
		if(output.slice(-1) != "\n") {
			output += "\n"
		}
		let line = document.createElement('div')
		line.className = isError ? 'line output error' : 'line output'
		let text = document.createTextNode(output)
		line.appendChild(text)
		let _console = document.getElementsByClassName('console')[0]
		_console.appendChild(line)
	},
	write : (output) => Console.print(output, false),
	writeError : (output) => Console.print(output, true),
	writeYes : () => Console.print('Yeah, you\'ll want a jacket.'),
	writeNo : () => Console.print('You\'re probably fine wihtout a jacket')
}