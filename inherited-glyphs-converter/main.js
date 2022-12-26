function convert() {
	const SOURCE_URL = ["https://raw.githubusercontent.com/haydenwong7bm/inherited-glyphs-converter/main/conversion-tables/variants_list.txt", "https://raw.githubusercontent.com/haydenwong7bm/inherited-glyphs-converter/main/conversion-tables/radicals.txt"]
	
	var supp_option = new RegExp(document.querySelector('input[name="supp"]:checked').value);
	
	var var_options = '';
	
	if (document.getElementById('j').checked) {
		var_options += "j";
	}
	if (document.getElementById('k').checked) {
		var_options += "k";
	}
	if (document.getElementById('t').checked) {
		var_options += "t";
	}
	if (document.getElementById('i').checked) {
		var_options += "i";
	}
	
	var_options = new RegExp("[" + var_options + "]");
	
	var text_input = document.getElementById('input');
	text_input = text_input.value;
	
	for (let k = 0; k < SOURCE_URL.length; k++) {
		fetch(SOURCE_URL[k])
		.then(response => response.text())
		.then(table_text => {
			var table = table_text.trim().split("\n").map(x => x.split("\t"));
			
			for (let i = 0; i < table.length; i++) {
				if (table[i].length == 2) {
					text_input = text_input.replace(table[i][0], table[i][1]);
				} else {
				if (table[i].length == 3) {
					if (var_options.test(table[i][2])) {
						if (/[c*]/.test(table[i][2])) {
							if (supp_option.test(table[i][2])) {
								text_input = text_input.replace(table[i][0], table[i][1]);
							}
						} else {
							text_input = text_input.replace(table[i][0], table[i][1]);
						}
					} else {
						if (/[c*]/.test(table[i][2])) {
							if (supp_option.test(table[i][2])) {
								text_input = text_input.replace(table[i][0], table[i][1]);
							}
						}
					}
				}
				}
			}
			document.getElementById('output').value = text_input;
		})
	}
}

function copy() {
	navigator.clipboard.writeText(document.getElementById('output').value)
}