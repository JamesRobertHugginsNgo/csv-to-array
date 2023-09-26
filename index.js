export default function (csv) {
	const token = `Q:${new Date().getTime()}:Q`;
	const rows = [];

	let cols = [];
	let col = [];
	let isInQuote = false;
	let quoteChar;

	const csvLength = csv.length;
	for (let index = 0; index < csvLength; index++) {
		const char = csv[index];
		if (isInQuote) {
			if (char === quoteChar) {
				if (csv[index + 1] === char) {
					index = index + 1;
					col.push(char);
					continue;
				}
				isInQuote = false;
				col.push(token);
				continue;
			}
			col.push(char);
			continue;
		}

		if (char === '\r' || char === '\n') {
			cols.push(col.join('').trim().replaceAll(token, ''));
			col = [];
			if (cols.length > 0 && !cols.every((col) => !col)) {
				rows.push(cols);
			}
			cols = [];
			continue;
		}

		if (char === "'" || char === "\"") {
			isInQuote = true;
			quoteChar = char;
			col.push(token);
			continue;
		}

		if (char === ',') {
			cols.push(col.join('').trim().replaceAll(token, ''));
			col = [];
			continue;
		}

		col.push(char);
	}

	return rows;
}
