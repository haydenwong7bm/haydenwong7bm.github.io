function convert() {
	fetch("https://raw.githubusercontent.com/haydenwong7bm/inherited-glyphs-converter/main/conversion-tables/variants_list.txt")
	.then(response => response.text())
	.then(textString => {
		var table = textString.trim().split("\n");
		table = table.map(x => x.split("\t"));
		
		var i = 0;
		var string = document.getElementById('input').value;
		
		while (i < table.length) {
			string = string.replace(table[i][0], table[i][1]);
			i++;
		}
		
		document.getElementById('output').value = string;
	})
}