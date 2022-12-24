function convert() {
	const SOURCE_URL = "https://raw.githubusercontent.com/haydenwong7bm/inherited-glyphs-converter/main/conversion-tables/variants_list.txt"
	
	fetch(SOURCE_URL)
	.then(response => response.text())
	.then(textString => {
		var table = textString.trim().split("\n");
		table = table.map(x => x.split("\t"));
		
		var i = 0;
		var string = document.getElementById('input').value;
		var options = document.getElementById('supp').value;
		
		if (document.getElementById('j').checked) {
			options += "j";
		}
		if (document.getElementById('k').checked) {
			options += "k";
		}
		if (document.getElementById('t').checked) {
			options += "t";
		}
		if (document.getElementById('i').checked) {
			options += "i";
		}
		
		options = new RegExp("[" + options + "]");
		
		while (i < table.length) {
			if ((table[i].length == 2) || (table[i].length == 3 && table[i][2].match(options))) {
				string = string.replace(table[i][0], table[i][1]);
				}
			i++;
		}
		
		document.getElementById('output').value = string;
	})
}