
/*
 * Evaluating a string as a mathematical expression in JavaScript
 *
 * @private
 * @description This function can be used separately in HTML pages or custom JavaScript.
 * @return {String}            - New calculation result.
 */
export const UixMath = UixMath || ( () => {
    function t() { }

    return t.version = "0.0.1",

    t.evaluate = function(s) {

		const chars = s.replace(/\s/g, '').split("");
		let n = [], op = [], index = 0, oplast = true;

		n[index] = "";

		// Parse the expression
		for (let c = 0; c < chars.length; c++) {

			if (isNaN(parseInt(chars[c])) && chars[c] !== "." && !oplast) {
				op[index] = chars[c];
				index++;
				n[index] = "";
				oplast = true;
			} else {
				n[index] += chars[c];
				oplast = false;
			}
		}

		// Calculate the expression
		s = parseFloat(n[0]);
		for (let o = 0; o < op.length; o++) {
			const num = parseFloat(n[o + 1]);
			switch (op[o]) {
				case "+":
					s = s + num;
					break;
				case "-":
					s = s - num;
					break;
				case "*":
					s = s * num;
					break;
				case "/":
					s = s / num;
					break;
			}
		}

		return s;
    },
        
    //
	t
})();
