const J = 'j';
const K = 'k';
const T = 't';

function convert() {
	var supp_option = document.querySelector('input[name="supp"]:checked').value;
	
	var use_inherited = document.getElementById('i').checked;
	
	var comp_order = [];
	for (const opt of [J, K, T]) {
		if (document.getElementById(opt).checked) {
			switch (opt) {
				case J:
					comp_order.push(J_TABLE);
					break;
				case K:
					comp_order.push(K_TABLE);
					break;
				case T:
					comp_order.push(T_TABLE);
					break;
			}
		}
	}
	
	var text_input = document.getElementById('input').value;
	var converted = text_input;
	var replace;
	
	for (const chr of text_input) {
		value = chr;
		replace = false;
		
		if (BASIC_TABLE[value] !== undefined) {
			const value_char = BASIC_TABLE[value][0];
			
			var attr = BASIC_TABLE[value][1];
			if (attr == undefined) {
				attr = "";
			}
			
			if (value.codePointAt(0) <= 0xFFFF && value_char.codePointAt(0) > 0xFFFF) {
				replace = Boolean(supp_option);
				if (supp_option == "c") {
					replace = attr.includes(supp_option);
				}
			} else {
				replace = true;
			}
			
			if (replace && attr.includes("i")) {
				replace = use_inherited;
			}
			
			if (replace) {
				value = value_char;
			}
		}
		
		for (var table of comp_order) {
			if (table[value] !== undefined) {
				const value_char = table[value][0];
				var attr = table[value][1];
				
				if (value.codePointAt(0) <= 0xFFFF && value_char.codePointAt(0) > 0xFFFF) {
					replace = Boolean(supp_option);
					if (supp_option == "c") {
						replace = attr.includes(supp_option);
					}
				} else {
					replace = true;
				}
				
				if (replace) {
					value = value_char;
				}
			}
		}
		
		if (RADICALS_VARIANTS_TABLE[value] !== undefined) {
            value = RADICALS_VARIANTS_TABLE[chr];
            replace = true;
		}
		
		if (replace) {
			converted = converted.replaceAll(chr, value);
		}
	}
	
	document.getElementById('output_k').value = converted;
	document.getElementById('output').value = converted;
}

function copy() {
	navigator.clipboard.writeText(document.getElementById('output').value)
}

function paste() {
	navigator.clipboard
	.readText()
	.then((clipText) => (document.getElementById("input").value = clipText));
}

BASIC_TABLE = {
	"𬺽": ["㐂"],
	"𠉶": ["㑭"],
	"𠪨": ["㕓"],
	"𠬍": ["㕙"],
	"䎛": ["㖈"],
	"㦳": ["㘽"],
	"𡍤": ["㘿"],
	"𡎲": ["㙜"],
	"𪦅": ["㛴"],
	"𡡎": ["㜢"],
	"𡤎": ["㜶"],
	"𡬶": ["㝷"],
	"𡭪": ["㝸"],
	"𥚋": ["㞊"],
	"𡉚": ["㞷"],
	"𡶨": ["㟁"],
	"嵜": ["㟢"],
	"𪩙": ["㠚"],
	"𢎼": ["㢭"],
	"𢘵": ["㤻"],
	"㤤": ["㥚"],
	"𭡟": ["㨬"],
	"𢳌": ["㨾"],
	"攑": ["㩮"],
	"𢼨": ["㩻"],
	"𢼮": ["㩻"],
	"𢺾": ["㪆"],
	"𢼕": ["㪆"],
	"𢽢": ["㪞"],
	"𣂚": ["㪿"],
	"𣊠": ["㬓"],
	"𣏈": ["㭃"],
	"𣚓": ["㯞"],
	"𣪝": ["㲄"],
	"浻": ["㴄"],
	"𤈎": ["㶷"],
	"𤈺": ["㷀"],
	"𭴶": ["㷁"],
	"𦻐": ["㷹"],
	"𤡙": ["㺑"],
	"𤢷": ["㺤"],
	"𤭘": ["㼢"],
	"𤬳": ["㼦"],
	"蕤": ["㽔"],
	"𭼝": ["㾨"],
	"𥉱": ["䁆"],
	"䃱": ["䃸"],
	"𰨌": ["䄎"],
	"𥪎": ["䇑"],
	"𥬺": ["䇦"],
	"𥮚": ["䈀"],
	"𦉻": ["䍑"],
	"𦗩": ["䏇"],
	"𦢙": ["䑎"],
	"𧃬": ["䕩"],
	"𧆲": ["䖒"],
	"𮓱": ["䖝"],
	"䘂": ["䘋"],
	"𧚎": ["䙄"],
	"𧞑": ["䙩"],
	"𮘩": ["䛴"],
	"𧭄": ["䜈"],
	"龻": ["䜌"],
	"𨌦": ["䡟"],
	"𨡞": ["䤄"],
	"𰼍": ["䤋"],
	"𨣲": ["䤘"],
	"𨨿": ["䤹"],
	"𩣙": ["䮢"],
	"𩰘": ["䰗"],
	"𩳠": ["䰥"],
	"䱎": ["䱍"],
	"𮬹": ["䳟"],
	"𡤞": ["䶯"],
	"𣢧": ["䶾"],
	"丢": ["丟"],
	"𫝄": ["久"],
	"𠂰": ["乕"],
	"𢁺": ["乕"],
	"𠄣": ["亙"],
	"𠓛": ["亼"],
	"𫝆": ["今"],
	"仭": ["仞"],
	"𠇞": ["伎"],
	"𪜬": ["余"],
	"𪜱": ["余"],
	"𪜩": ["佝"],
	"侣": ["侶"],
	"俣": ["俁"],
	"𠈷": ["俾"],
	"併": ["倂"],
	"𫝉": ["倉"],
	"𠉀": ["候"],
	"𠋣": ["倚"],
	"偼": ["倢"],
	"值": ["値"],
	"俱": ["倶"],
	"偷": ["偸"],
	"𠋏": ["傊"],
	"𠌂": ["傘"],
	"𩑭": ["傾"],
	"𠏗": ["僚"],
	"偽": ["僞"],
	"兀": ["兀"],
	"兊": ["兌"],
	"兑": ["兌"],
	"兎": ["兔"],
	"兖": ["兗"],
	"俞": ["兪"],
	"𠔃": ["兮"],
	"𠔏": ["共"],
	"册": ["冊"],
	"𠳲": ["冔"],
	"净": ["凈"],
	"凢": ["凡"],
	"凣": ["凡"],
	"𠙽": ["凷"],
	"刄": ["刃"],
	"𠛬": ["刑"],
	"别": ["別"],
	"删": ["刪"],
	"刹": ["剎"],
	"剏": ["剙"],
	"剥": ["剝"],
	"𠟾": ["剿"],
	"劔": ["劒"],
	"𠠤": ["劖"],
	"𠠥": ["劖"],
	"㓛": ["功"],
	"𠡍": ["劲"],
	"勊": ["勀"],
	"𠡳": ["勔"],
	"𠢀": ["勤"],
	"𠢄": ["勤"],
	"𠢶": ["勦"],
	"匀": ["勻"],
	"匄": ["匃"],
	"𭅅": ["匈"],
	"𠣿": ["匓"],
	"𠥆": ["匩"],
	"㔺": ["卋"],
	"𠦔": ["卋"],
	"𤰞": ["卑"],
	"𠦢": ["協"],
	"𠀄": ["卫"],
	"巻": ["卷"],
	"巹": ["卺"],
	"即": ["卽"],
	"𤓾": ["受"],
	"𠮉": ["叡"],
	"呑": ["吞"],
	"𭇅": ["吱"],
	"吴": ["吳"],
	"呉": ["吳"],
	"𠯵": ["吳"],
	"呐": ["吶"],
	"告": ["吿"],
	"吕": ["呂"],
	"㕼": ["哅"],
	"𫪾": ["唴"],
	"𠸝": ["啑"],
	"啓": ["啟"],
	"𫪓": ["喕"],
	"唤": ["喚"],
	"𠺇": ["喜"],
	"唧": ["喞"],
	"喻": ["喩"],
	"𠦤": ["單"],
	"𠫹": ["單"],
	"嗀": ["嗀"],
	"𠹫": ["嗇"],
	"𫪻": ["嗤"],
	"𭒕": ["嘙"],
	"嘷": ["噑"],
	"嘘": ["噓"],
	"𠾖": ["器"],
	"嚔": ["嚏"],
	"𡃰": ["嚱"],
	"𫝝": ["嚴"],
	"𡅛": ["嚵"],
	"𡅕": ["囍"],
	"冏": ["囧"],
	"𡆾": ["囧"],
	"𭍛": ["囧"],
	"圏": ["圈"],
	"圎": ["圓"],
	"圗": ["圖"],
	"圡": ["土"],
	"𡈽": ["土"],
	"𡊹": ["垔"],
	"𡍑": ["埊"],
	"埓": ["埒"],
	"𡌨": ["埤"],
	"𫮍": ["埼"],
	"𦰌": ["堇"],
	"𡍷": ["堩"],
	"𫝔": ["堯"],
	"𭏕": ["塌"],
	"填": ["塡"],
	"𡎖": ["塤"],
	"塈": ["墍"],
	"増": ["增"],
	"𡐿": ["墶"],
	"𫮰": ["墻"],
	"𡉟": ["壯"],
	"夀": ["壽"],
	"夛": ["多"],
	"𡖈": ["多"],
	"𢑑": ["多"],
	"𦴋": ["夢"],
	"𢎯": ["夷"],
	"𡘹": ["奄"],
	"𫯠": ["奉"],
	"奂": ["奐"],
	"𭁗": ["奠"],
	"奥": ["奧"],
	"𡚱": ["妃"],
	"𡛇": ["妓"],
	"𪥩": ["妓"],
	"姗": ["姍"],
	"妍": ["姸"],
	"娯": ["娛"],
	"娱": ["娛"],
	"𡝘": ["娽"],
	"𡝤": ["婁"],
	"媫": ["婕"],
	"媮": ["婾"],
	"𡟮": ["媐"],
	"𡞎": ["媔"],
	"𫱇": ["媜"],
	"𡝭": ["媢"],
	"𡠌": ["媲"],
	"媪": ["媼"],
	"𡢴": ["嫽"],
	"媯": ["嬀"],
	"嬷": ["嬤"],
	"𡣳": ["孅"],
	"𡤼": ["孑"],
	"孳": ["孶"],
	"宫": ["宮"],
	"𡧱": ["害"],
	"𡨘": ["寃"],
	"𡨚": ["寃"],
	"𭔃": ["寄"],
	"𡨡": ["寏"],
	"寜": ["寧"],
	"寛": ["寬"],
	"専": ["專"],
	"𫴰": ["對"],
	"尓": ["尔"],
	"尚": ["尙"],
	"𤊽": ["尞"],
	"尫": ["尪"],
	"𡯓": ["尬"],
	"𠒖": ["尭"],
	"𡰁": ["尰"],
	"𡰅": ["尳"],
	"尶": ["尷"],
	"𫝲": ["尻"],
	"屏": ["屛"],
	"𭕙": ["屛"],
	"𡵨": ["岐"],
	"𡵲": ["岐"],
	"𡷊": ["岛"],
	"𫝍": ["岡"],
	"﨑": ["崎"],
	"峥": ["崢"],
	"𡾟": ["巇"],
	"巔": ["巓"],
	"坙": ["巠"],
	"𢁉": ["巽"],
	"㠶": ["帆"],
	"帡": ["帲"],
	"𢂸": ["帶"],
	"𢃄": ["帶"],
	"㡌": ["帽"],
	"并": ["幷"],
	"𭎎": ["幸"],
	"𪜊": ["广"],
	"𢇮": ["庋"],
	"𢇭": ["应"],
	"𢈏": ["庚"],
	"庻": ["庶"],
	"𢈔": ["庾"],
	"𢊁": ["廌"],
	"廄": ["廏"],
	"𢋁": ["廏"],
	"𢋨": ["廛"],
	"廽": ["廻"],
	"弑": ["弒"],
	"𢎞": ["弘"],
	"𢏏": ["弥"],
	"录": ["彔"],
	"彚": ["彙"],
	"𢑥": ["彙"],
	"彛": ["彜"],
	"彞": ["彝"],
	"彦": ["彥"],
	"徴": ["徵"],
	"徳": ["德"],
	"𢘚": ["忱"],
	"𫝹": ["念"],
	"恒": ["恆"],
	"𢘆": ["恆"],
	"悦": ["悅"],
	"悮": ["悞"],
	"惪": ["悳"],
	"恵": ["惠"],
	"𢚾": ["愌"],
	"𭐫": ["愛"],
	"𢝾": ["愮"],
	"慎": ["愼"],
	"𫺼": ["慆"],
	"愠": ["慍"],
	"𢠊": ["慘"],
	"𢣗": ["懡"],
	"𫻡": ["懷"],
	"懴": ["懺"],
	"𢦙": ["或"],
	"戬": ["戩"],
	"戯": ["戲"],
	"戱": ["戲"],
	"户": ["戶"],
	"戸": ["戶"],
	"戻": ["戾"],
	"𢩾": ["执"],
	"𠄘": ["承"],
	"𢪩": ["投"],
	"抛": ["拋"],
	"抜": ["拔"],
	"捝": ["挩"],
	"𪭺": ["捋"],
	"揑": ["捏"],
	"𢬽": ["捭"],
	"𢮆": ["捭"],
	"㨗": ["捷"],
	"𪮓": ["捹"],
	"𢰤": ["掎"],
	"挣": ["掙"],
	"𭠵": ["掝"],
	"挿": ["插"],
	"揷": ["插"],
	"换": ["換"],
	"搄": ["揯"],
	"㩁": ["搉"],
	"捜": ["搜"],
	"揾": ["搵"],
	"揺": ["摇"],
	"𢲄": ["摕"],
	"𢳛": ["摣"],
	"𢷇": ["摤"],
	"𰔬": ["撩"],
	"撃": ["擊"],
	"𢷬": ["擣"],
	"舉": ["擧"],
	"𦦙": ["擧"],
	"㩥": ["攕"],
	"𤽐": ["敀"],
	"𤽑": ["敀"],
	"教": ["敎"],
	"敚": ["敓"],
	"𢻎": ["散"],
	"𭣹": ["散"],
	"𭣿": ["敧"],
	"𢻗": ["敮"],
	"㪣": ["敲"],
	"𫾣": ["敲"],
	"𢿙": ["數"],
	"夐": ["敻"],
	"𢿌": ["敻"],
	"敿": ["敽"],
	"𢻤": ["敽"],
	"𢻧": ["斀"],
	"𣀈": ["斀"],
	"螤": ["斔"],
	"𣂷": ["斳"],
	"𣂼": ["斳"],
	"㫌": ["旋"],
	"𭥃": ["旖"],
	"既": ["旣"],
	"峕": ["旹"],
	"𣅐": ["旻"],
	"昻": ["昂"],
	"𣆃": ["昜"],
	"𣆄": ["昜"],
	"𫞄": ["晉"],
	"𣇈": ["晓"],
	"晩": ["晚"],
	"曍": ["暭"],
	"暨": ["曁"],
	"𣉊": ["曉"],
	"𣋡": ["曚"],
	"曵": ["曳"],
	"曽": ["曾"],
	"朶": ["朵"],
	"𣏓": ["杇"],
	"𠄬": ["枣"],
	"𡗭": ["枣"],
	"柺": ["枴"],
	"栅": ["柵"],
	"查": ["査"],
	"柡": ["栐"],
	"𫞉": ["桺"],
	"鿄": ["梁"],
	"𭐧": ["梦"],
	"棁": ["梲"],
	"𬃪": ["椅"],
	"榆": ["楡"],
	"𬃜": ["楨"],
	"榅": ["榲"],
	"𣙜": ["榷"],
	"槙": ["槇"],
	"㮣": ["槩"],
	"概": ["槪"],
	"𪳝": ["槱"],
	"橰": ["槹"],
	"𣙁": ["樝"],
	"榝": ["樧"],
	"𣝢": ["樸"],
	"𣜀": ["樾"],
	"𰘴": ["橑"],
	"横": ["橫"],
	"㰇": ["櫼"],
	"𣟬": ["欄"],
	"櫸": ["欅"],
	"𣟱": ["欅"],
	"𣣱": ["欹"],
	"㰱": ["歃"],
	"歩": ["步"],
	"歳": ["歲"],
	"𫞓": ["歲"],
	"𠧔": ["歺"],
	"殁": ["歿"],
	"殱": ["殲"],
	"殻": ["殼"],
	"毁": ["毀"],
	"毎": ["每"],
	"𣮟": ["毵"],
	"𫞕": ["氏"],
	"𫞖": ["民"],
	"氲": ["氳"],
	"𣱵": ["永"],
	"𣲅": ["江"],
	"𣲄": ["汣"],
	"没": ["沒"],
	"𭰝": ["洍"],
	"𣴑": ["流"],
	"𣵀": ["涅"],
	"渉": ["涉"],
	"涚": ["涗"],
	"涙": ["淚"],
	"𣴤": ["淢"],
	"渌": ["淥"],
	"浄": ["淨"],
	"清": ["淸"],
	"𰜟": ["渏"],
	"𣴪": ["渒"],
	"涣": ["渙"],
	"渇": ["渴"],
	"𣷍": ["湄"],
	"𭰫": ["湎"],
	"温": ["溫"],
	"滚": ["滾"],
	"𭑞": ["漁"],
	"𣻔": ["漂"],
	"溉": ["漑"],
	"𣻌": ["漾"],
	"潨": ["潀"],
	"溈": ["潙"],
	"濳": ["潛"],
	"澙": ["潟"],
	"𣿳": ["潦"],
	"𣽽": ["潸"],
	"濓": ["濂"],
	"𣿰": ["濬"],
	"𤀹": ["濬"],
	"濲": ["瀔"],
	"瀬": ["瀨"],
	"瀐": ["瀸"],
	"𢌇": ["灋"],
	"𤂦": ["灌"],
	"𫞞": ["灌"],
	"𪸓": ["炁"],
	"奌": ["点"],
	"熙": ["煕"],
	"𤋮": ["煕"],
	"焭": ["煢"],
	"𠙦": ["煢"],
	"焕": ["煥"],
	"煴": ["熅"],
	"𤋱": ["熏"],
	"𤐗": ["燎"],
	"𤒄": ["燫"],
	"𤐭": ["燽"],
	"𤑕": ["爋"],
	"𤑛": ["爋"],
	"争": ["爭"],
	"為": ["爲"],
	"𡙁": ["爽"],
	"𫝃": ["爾"],
	"𫵠": ["犀"],
	"𰠸": ["犄"],
	"𭸟": ["猗"],
	"𫞤": ["猿"],
	"奬": ["獎"],
	"獋": ["獔"],
	"𤢙": ["獠"],
	"𤡯": ["獡"],
	"𫉬": ["獲"],
	"𤢪": ["獵"],
	"𤣥": ["玄"],
	"𤣱": ["玘"],
	"𤥨": ["琢"],
	"𤦺": ["琦"],
	"𤦛": ["瑁"],
	"𤥺": ["瑍"],
	"𤨁": ["瑨"],
	"𤪃": ["璙"],
	"𭺊": ["瓈"],
	"𭺛": ["瓦"],
	"𭺜": ["瓦"],
	"瓶": ["甁"],
	"𠥄": ["甚"],
	"𫞪": ["甚"],
	"産": ["產"],
	"𤰱": ["画"],
	"𢌿": ["畀"],
	"𤲃": ["畢"],
	"𭺾": ["畢"],
	"畵": ["畫"],
	"𤲯": ["畫"],
	"𤲿": ["畫"],
	"𰣍": ["畸"],
	"𤴁": ["疉"],
	"𤴡": ["疐"],
	"𤷒": ["痺"],
	"痪": ["瘓"],
	"𤸄": ["瘝"],
	"痩": ["瘦"],
	"臯": ["皐"],
	"皡": ["皥"],
	"𥁋": ["盇"],
	"𫞰": ["盈"],
	"𥁘": ["盏"],
	"𥁫": ["盏"],
	"𭕘": ["眉"],
	"𥄳": ["眔"],
	"真": ["眞"],
	"衆": ["眾"],
	"𥈤": ["睫"],
	"䜭": ["睿"],
	"𥋄": ["瞟"],
	"𥌒": ["瞽"],
	"𥑉": ["砈"],
	"𥒐": ["砉"],
	"𮀒": ["砉"],
	"研": ["硏"],
	"𥓓": ["碑"],
	"𥔎": ["碕"],
	"鿆": ["祓"],
	"𥚬": ["祹"],
	"禄": ["祿"],
	"𥜽": ["禼"],
	"𥜾": ["禼"],
	"秃": ["禿"],
	"䄵": ["秊"],
	"𥝝": ["秊"],
	"税": ["稅"],
	"𥟑": ["稗"],
	"𥡴": ["稽"],
	"穂": ["穗"],
	"𫞹": ["空"],
	"𥤮": ["突"],
	"𥨤": ["竂"],
	"𥪖": ["竜"],
	"筝": ["箏"],
	"𥭼": ["箓"],
	"𥮷": ["箬"],
	"𥲒": ["築"],
	"𥰉": ["篌"],
	"簒": ["篡"],
	"𢲿": ["篫"],
	"𥱡": ["篾"],
	"𥲃": ["簆"],
	"箳": ["簈"],
	"簔": ["簑"],
	"𥵐": ["簝"],
	"𬖄": ["簾"],
	"𥶉": ["籑"],
	"籖": ["籤"],
	"𥹣": ["粣"],
	"𥹤": ["粣"],
	"𥺁": ["粧"],
	"𥹭": ["粱"],
	"𥹏": ["粲"],
	"粤": ["粵"],
	"𫒀": ["粵"],
	"𥺛": ["粺"],
	"𬗋": ["紫"],
	"絶": ["絕"],
	"緑": ["綠"],
	"𦂶": ["綺"],
	"緒": ["緖"],
	"縁": ["緣"],
	"𬗟": ["緬"],
	"𬗨": ["緽"],
	"緼": ["縕"],
	"𬗫": ["縣"],
	"𦂵": ["縦"],
	"𦆖": ["繚"],
	"𦅩": ["繪"],
	"纎": ["纖"],
	"𦉳": ["网"],
	"芈": ["羋"],
	"羙": ["美"],
	"𫟈": ["美"],
	"𮎪": ["美"],
	"𦍛": ["羕"],
	"𮊵": ["羸"],
	"羮": ["羹"],
	"翺": ["翶"],
	"𫰗": ["耍"],
	"𦕓": ["聓"],
	"𠕎": ["肉"],
	"𮌇": ["肉"],
	"䏍": ["肙"],
	"𦙪": ["肩"],
	"𦙌": ["胤"],
	"𦙍": ["胤"],
	"䏻": ["能"],
	"𦝕": ["能"],
	"𮌛": ["能"],
	"𦛹": ["胾"],
	"脱": ["脫"],
	"𦜉": ["脾"],
	"胼": ["腁"],
	"𦟩": ["腌"],
	"𦚤": ["腴"],
	"腽": ["膃"],
	"𦟾": ["膒"],
	"𦤀": ["臭"],
	"𦤺": ["致"],
	"臾": ["臾"],
	"𠒍": ["臾"],
	"𢆍": ["臿"],
	"𦥝": ["舀"],
	"舃": ["舄"],
	"𠢎": ["舅"],
	"𫟋": ["與"],
	"𦦙": ["舉"],
	"𦾔": ["舊"],
	"舎": ["舍"],
	"舗": ["舖"],
	"䑵": ["艒"],
	"𫇧": ["芩"],
	"𠰥": ["若"],
	"䒮": ["茕"],
	"兹": ["茲"],
	"𦯬": ["荼"],
	"𭄳": ["莇"],
	"𦮆": ["菆"],
	"葘": ["菑"],
	"𫟏": ["菟"],
	"𦵉": ["萐"],
	"𦳆": ["萒"],
	"茰": ["萸"],
	"𦳯": ["蒁"],
	"蒀": ["蒕"],
	"𫎇": ["蒙"],
	"𦻴": ["蓵"],
	"蓘": ["蔉"],
	"𦷾": ["蔕"],
	"𬞈": ["蔗"],
	"蒍": ["蔿"],
	"蕰": ["薀"],
	"𧃡": ["薻"],
	"𦿾": ["藜"],
	"藴": ["蘊"],
	"𧁨": ["蘓"],
	"𡖂": ["虁"],
	"𧅄": ["虁"],
	"𮓗": ["虍"],
	"𮓙": ["虎"],
	"虚": ["虛"],
	"𮓥": ["虞"],
	"𧈅": ["虩"],
	"𮓰": ["虫"],
	"𧈡": ["蚤"],
	"𫊫": ["蚤"],
	"𧊨": ["蚦"],
	"蜖": ["蛔"],
	"𧉨": ["蛩"],
	"蜕": ["蛻"],
	"𧎉": ["蜣"],
	"𧍑": ["蝄"],
	"𧑛": ["蟰"],
	"𧒲": ["蠊"],
	"𫟘": ["衞"],
	"𢖍": ["衡"],
	"𮕩": ["衰"],
	"𡊮": ["袁"],
	"𡋡": ["袁"],
	"䘠": ["袚"],
	"衮": ["袞"],
	"𬡄": ["袞"],
	"𧞬": ["襳"],
	"𫟜": ["觀"],
	"𣫅": ["觳"],
	"𧦖": ["訰"],
	"訮": ["詽"],
	"𧦷": ["詾"],
	"説": ["說"],
	"𧪌": ["誱"],
	"𧩽": ["諄"],
	"䛕": ["諛"],
	"𧪿": ["講"],
	"𧫴": ["謹"],
	"𧭖": ["議"],
	"𫟝": ["讓"],
	"䜟": ["讖"],
	"𧰼": ["象"],
	"豜": ["豣"],
	"𭾛": ["貞"],
	"𢎐": ["貳"],
	"賘": ["賍"],
	"賔": ["賓"],
	"頼": ["賴"],
	"𦢼": ["贏"],
	"赱": ["走"],
	"𧺆": ["走"],
	"𰷳": ["趄"],
	"𧻬": ["趍"],
	"𰷿": ["趫"],
	"𠯁": ["足"],
	"𨂹": ["踴"],
	"𨃒": ["踴"],
	"輺": ["輜"],
	"𰹝": ["輢"],
	"軿": ["輧"],
	"輼": ["轀"],
	"𨏋": ["轈"],
	"𫝕": ["辰"],
	"𭆒": ["農"],
	"迖": ["达"],
	"𨑙": ["迅"],
	"逥": ["迴"],
	"迸": ["逬"],
	"𨓻": ["逯"],
	"𨓜": ["逸"],
	"逹": ["達"],
	"逺": ["遠"],
	"𨙻": ["那"],
	"邢": ["郉"],
	"郎": ["郞"],
	"𮟿": ["郿"],
	"郷": ["鄕"],
	"鄉": ["鄕"],
	"𨞤": ["鄶"],
	"𮠔": ["鄽"],
	"𨢄": ["醜"],
	"醖": ["醞"],
	"釼": ["釰"],
	"鋭": ["銳"],
	"𨦵": ["鋩"],
	"録": ["錄"],
	"𨪆": ["錡"],
	"錬": ["鍊"],
	"𨭀": ["鎘"],
	"鎮": ["鎭"],
	"𨭼": ["鐐"],
	"䥥": ["鐮"],
	"𨮺": ["鑙"],
	"𨯒": ["鑯"],
	"𨳇": ["門"],
	"閲": ["閱"],
	"䦨": ["闌"],
	"𨺓": ["隆"],
	"陧": ["隉"],
	"𨻶": ["隙"],
	"寉": ["隺"],
	"𨿽": ["雖"],
	"𮥿": ["雚"],
	"𩃓": ["電"],
	"青": ["靑"],
	"静": ["靜"],
	"靣": ["面"],
	"靱": ["靭"],
	"𮧰": ["韋"],
	"韯": ["韱"],
	"𩑠": ["頙"],
	"𬱃": ["頟"],
	"𮚱": ["頳"],
	"𥛤": ["頴"],
	"頽": ["頹"],
	"顔": ["顏"],
	"顛": ["顚"],
	"𩔖": ["類"],
	"𩚆": ["飤"],
	"飲": ["飮"],
	"䬸": ["餐"],
	"餅": ["餠"],
	"馱": ["駄"],
	"駢": ["騈"],
	"𮪍": ["騎"],
	"𩥕": ["騹"],
	"𩦈": ["驃"],
	"𩥾": ["驗"],
	"骩": ["骫"],
	"骪": ["骫"],
	"𩨖": ["骫"],
	"𩩙": ["髀"],
	"髪": ["髮"],
	"鬬": ["鬭"],
	"𩵋": ["魚"],
	"𩾀": ["鮕"],
	"𩹌": ["鰥"],
	"鰛": ["鰮"],
	"𡰎": ["鳩"],
	"𩾛": ["鳩"],
	"𩾵": ["鳩"],
	"𠒎": ["鳬"],
	"鳯": ["鳳"],
	"𩾨": ["鳵"],
	"𪃰": ["鶰"],
	"鷏": ["鷆"],
	"𪃟": ["鷇"],
	"麫": ["麪"],
	"𬹃": ["麵"],
	"麽": ["麼"],
	"黄": ["黃"],
	"𮮐": ["黍"],
	"𮮑": ["黍"],
	"𪏭": ["黎"],
	"黒": ["黑"],
	"皷": ["鼓"],
	"𭽸": ["鼕"],
	"𮮫": ["鼞"],
	"𣦗": ["齒"],
	"𮮽": ["齒"],
	"𱌡": ["齮"],
	"榉": ["﨔"],
	"𧺯": ["﨣"],
	"𤔁": ["𠀭"],
	"𠒞": ["𠀻"],
	"𤕤": ["𠁊"],
	"𭑘": ["𠁊"],
	"𤕣": ["𠃾"],
	"𢆣": ["𠆕"],
	"𫝇": ["𠇭"],
	"𠈖": ["𠈪"],
	"𠈫": ["𠈪"],
	"𠊯": ["𠋢"],
	"𠋕": ["𠌖"],
	"偋": ["𠌸"],
	"𠏴": ["𠐑"],
	"㒨": ["𠑗"],
	"𡴪": ["𠒶"],
	"𠌆": ["𠓳"],
	"𠓵": ["𠓷"],
	"𠕂": ["𠕅"],
	"𭁡": ["𠕅"],
	"𡴊": ["𠕓"],
	"𣍓": ["𠕰"],
	"𤎹": ["𠘕"],
	"𦥒": ["𠚒"],
	"𢩬": ["𠛃"],
	"𠜰": ["𠜧"],
	"𡘢": ["𠜵"],
	"𭃤": ["𠝄"],
	"𠜕": ["𠝞"],
	"𠝠": ["𠝬"],
	"剙": ["𠝵"],
	"𠟿": ["𠞰"],
	"𠢅": ["𠢍"],
	"𠥇": ["𠥵"],
	"𠦕": ["𠦘"],
	"𠧳": ["𠧹"],
	"𫝂": ["𠩄"],
	"𫠦": ["𠩄"],
	"𠩶": ["𠩲"],
	"𠪬": ["𠪚"],
	"叝": ["𠫳"],
	"𠰒": ["𠰚"],
	"𫫀": ["𠵇"],
	"𭉈": ["𠺜"],
	"𭊋": ["𠺜"],
	"𡀼": ["𡀘"],
	"𠿎": ["𡁑"],
	"𡂤": ["𡂧"],
	"𡂭": ["𡂪"],
	"𡂪": ["𡂭"],
	"𭋲": ["𡄑"],
	"𡅗": ["𡄼"],
	"𡅤": ["𡅸"],
	"𡌹": ["𡌸"],
	"𡌸": ["𡌹"],
	"𡔢": ["𡔣"],
	"𣡆": ["𡕏"],
	"𢻯": ["𡕕"],
	"𢾶": ["𡕲"],
	"𡙛": ["𡙠"],
	"𭑡": ["𡚆"],
	"㛟": ["𡞵"],
	"𡦲": ["𡦭"],
	"𡦳": ["𡦭"],
	"𡦴": ["𡦭"],
	"𡩚": ["𡩀"],
	"𡪋": ["𡪚"],
	"𡭽": ["𡭴"],
	"𡮂": ["𡭴"],
	"𡮼": ["𡮻"],
	"𠠵": ["𡯄"],
	"𡯪": ["𡯭"],
	"𡰞": ["𡰝"],
	"𠔅": ["𡰤"],
	"𠔆": ["𡰤"],
	"𡥸": ["𡲪"],
	"𡵄": ["𡴀"],
	"𡴙": ["𡴐"],
	"𡸱": ["𡴜"],
	"𡴡": ["𡴩"],
	"𡴻": ["𡴲"],
	"𡻵": ["𡻫"],
	"𡼬": ["𡼒"],
	"𡻇": ["𡼗"],
	"𤎚": ["𡼷"],
	"𡿚": ["𡿟"],
	"𤿄": ["𢀎"],
	"𢄛": ["𢅂"],
	"𢅖": ["𢅏"],
	"𢆩": ["𢆢"],
	"庅": ["𢇝"],
	"𢉇": ["𢈩"],
	"𦱤": ["𢍋"],
	"𢎱": ["𢎨"],
	"𢎮": ["𢎶"],
	"𢑙": ["𢑛"],
	"𦄳": ["𢑲"],
	"𢀚": ["𢒄"],
	"𢒅": ["𢒄"],
	"𢔺": ["𢔷"],
	"𢘰": ["𢗧"],
	"𢚕": ["𢘽"],
	"𢡤": ["𢡍"],
	"𢦒": ["𢦔"],
	"𢪨": ["𢪚"],
	"𫽅": ["𢬱"],
	"𪭻": ["𢭀"],
	"𪭱": ["𢭯"],
	"𢮧": ["𢮅"],
	"𢮨": ["𢮛"],
	"𢮅": ["𢮧"],
	"𢮸": ["𢰷"],
	"𢱞": ["𢱞"],
	"𢱭": ["𢳎"],
	"𢷐": ["𢷟"],
	"㩬": ["𢹍"],
	"𢾪": ["𢻚"],
	"𢼯": ["𢼴"],
	"𣁋": ["𢼸"],
	"𢾛": ["𢾊"],
	"𭣙": ["𢾊"],
	"𢻕": ["𢾑"],
	"𢾚": ["𢾑"],
	"𢿽": ["𢿦"],
	"𭣝": ["𢿦"],
	"𢿵": ["𢿧"],
	"𭣜": ["𢿧"],
	"𢻥": ["𢿾"],
	"𣀉": ["𢿾"],
	"𣀸": ["𣀺"],
	"𣊆": ["𣊅"],
	"𣊭": ["𣊫"],
	"𣆑": ["𣌧"],
	"𦙿": ["𣍦"],
	"𦙳": ["𣍨"],
	"𦜷": ["𣎄"],
	"𫠡": ["𣎴"],
	"𣐂": ["𣏋"],
	"𣑾": ["𣑅"],
	"𭪉": ["𣒀"],
	"𣕕": ["𣒋"],
	"𣕹": ["𣓉"],
	"𣒆": ["𣓘"],
	"𣒏": ["𣓙"],
	"𤴜": ["𣓜"],
	"𣕏": ["𣓧"],
	"𠓲": ["𣔕"],
	"𣓍": ["𣔺"],
	"𫞎": ["𣘺"],
	"𫞏": ["𣘺"],
	"橩": ["𣜧"],
	"𣝿": ["𣞱"],
	"𣝡": ["𣞼"],
	"𣦋": ["𣥫"],
	"𣥩": ["𣥿"],
	"𣦻": ["𣦼"],
	"𣨃": ["𣧴"],
	"㱿": ["𣪊"],
	"𣫃": ["𣫌"],
	"𣚯": ["𣫎"],
	"毤": ["𣮆"],
	"𣮯": ["𣮸"],
	"𣮗": ["𣮻"],
	"𣰝": ["𣰢"],
	"𣳊": ["𣳃"],
	"淢": ["𣴤"],
	"𣳫": ["𣵭"],
	"𣶬": ["𣷉"],
	"𣷹": ["𣸸"],
	"𰜸": ["𣺈"],
	"淹": ["𣼜"],
	"𣾞": ["𣽁"],
	"𭒞": ["𣽦"],
	"𣽍": ["𣾄"],
	"澚": ["𤀀"],
	"𤂴": ["𤃪"],
	"𤅃": ["𤅄"],
	"𤊮": ["𤉺"],
	"焨": ["𤊻"],
	"㷗": ["𤌇"],
	"𤏊": ["𤐂"],
	"𤐥": ["𤑋"],
	"𤓿": ["𤔂"],
	"𠚞": ["𤔼"],
	"𡖀": ["𤔿"],
	"𤖊": ["𤖄"],
	"𤛒": ["𤛴"],
	"𭆌": ["𤟐"],
	"𤟌": ["𤟒"],
	"𪻅": ["𤠔"],
	"𤠛": ["𤠤"],
	"𤣔": ["𤣗"],
	"𤣭": ["𤣲"],
	"𤤄": ["𤣻"],
	"𤥟": ["𤤺"],
	"𤧩": ["𤦼"],
	"㻀": ["𤧙"],
	"𡨍": ["𤬽"],
	"𤮬": ["𤮫"],
	"𪐕": ["𤯒"],
	"𢍚": ["𤱿"],
	"𤵵": ["𤵨"],
	"𬏝": ["𤵶"],
	"𤿪": ["𥀈"],
	"𬐱": ["𥂭"],
	"𥄚": ["𥄙"],
	"𥆆": ["𥆨"],
	"𥇗": ["𥇵"],
	"𥇤": ["𥇵"],
	"𥈃": ["𥈟"],
	"𥈺": ["𥉰"],
	"𥑪": ["𥒚"],
	"𥔉": ["𥔑"],
	"𥑷": ["𥔢"],
	"𥒏": ["𥔢"],
	"磁": ["𥔵"],
	"𬒛": ["𥕧"],
	"𥛈": ["𥙸"],
	"𮂁": ["𥚣"],
	"𥜨": ["𥜪"],
	"𥠸": ["𥡃"],
	"𥡱": ["𥡤"],
	"𥢰": ["𥢤"],
	"𥤛": ["𥤚"],
	"𥦣": ["𥥗"],
	"𥦐": ["𥦪"],
	"窴": ["𥧑"],
	"𥪺": ["𥫃"],
	"𥫕": ["𥫖"],
	"𥬘": ["𥬟"],
	"𥰓": ["𥯣"],
	"𥬽": ["𥯮"],
	"𥰅": ["𥲂"],
	"𥲤": ["𥳁"],
	"𥳸": ["𥳹"],
	"𥵄": ["𥶅"],
	"𥷴": ["𥷤"],
	"𦀉": ["𥿰"],
	"綗": ["𦀝"],
	"𦁇": ["𦁤"],
	"𦂲": ["𦁥"],
	"𦂢": ["𦂖"],
	"𦅳": ["𦃍"],
	"𬘀": ["𦄇"],
	"𦅛": ["𦅀"],
	"𦅗": ["𦆀"],
	"𬼉": ["𦈢"],
	"𦎜": ["𦎇"],
	"𢐽": ["𦏚"],
	"𦏴": ["𦏻"],
	"𦐎": ["𦐃"],
	"𦒞": ["𦒛"],
	"𦒫": ["𦒯"],
	"聴": ["𦗟"],
	"𦘚": ["𦘕"],
	"𦙽": ["𦙱"],
	"𦊈": ["𦚋"],
	"𬚹": ["𦚩"],
	"𣍭": ["𦚹"],
	"𦚸": ["𦚹"],
	"𦞆": ["𦛠"],
	"𦛧": ["𦜡"],
	"𦜤": ["𦝦"],
	"𦡦": ["𦡂"],
	"𦢋": ["𦣍"],
	"𦢹": ["𦣍"],
	"𦣞": ["𦣝"],
	"𥃢": ["𦣸"],
	"致": ["𦤶"],
	"𦤺": ["𦤶"],
	"𢲓": ["𦥹"],
	"𠮌": ["𦦖"],
	"𦦧": ["𦦝"],
	"𦦡": ["𦦞"],
	"𦨳": ["𦨼"],
	"𦪲": ["𦪓"],
	"𦪺": ["𦪲"],
	"𦭠": ["𦭫"],
	"𦵐": ["𦯖"],
	"萖": ["𦯵"],
	"𦲝": ["𦰓"],
	"萒": ["𦳆"],
	"𦴃": ["𦵫"],
	"𦶫": ["𦹁"],
	"𦳅": ["𦺮"],
	"𦸥": ["𦼏"],
	"𦺺": ["𦽓"],
	"𦾽": ["𦿚"],
	"𧃱": ["𧂘"],
	"𦾫": ["𧂣"],
	"𧀼": ["𧃎"],
	"𧆬": ["𧆟"],
	"𧆭": ["𧆣"],
	"𧇄": ["𧇄"],
	"𧇕": ["𧇄"],
	"𧊱": ["𧊶"],
	"𧊠": ["𧍳"],
	"𧐑": ["𧎾"],
	"𧎅": ["𧏚"],
	"𧑻": ["𧐥"],
	"𧔹": ["𧓋"],
	"𧝰": ["𧞄"],
	"𭟍": ["𧞰"],
	"𧟡": ["𧟠"],
	"𧟵": ["𧟱"],
	"𧣼": ["𧣱"],
	"𧣱": ["𧣼"],
	"𣁀": ["𧥙"],
	"𧧂": ["𧦽"],
	"𧧇": ["𧧨"],
	"𧨤": ["𧨚"],
	"䛼": ["𧨤"],
	"𧨚": ["𧨤"],
	"𧩱": ["𧫮"],
	"𧭙": ["𧭊"],
	"𦌽": ["𧮀"],
	"𧯊": ["𧯈"],
	"𧯖": ["𧯕"],
	"𧴲": ["𧴪"],
	"𧶀": ["𧶊"],
	"𧸜": ["𧸖"],
	"𧹩": ["𧹯"],
	"𰷻": ["𧽍"],
	"𧿪": ["𧿝"],
	"𨅟": ["𨄏"],
	"𨇈": ["𨆫"],
	"𨍽": ["𨎊"],
	"𨏓": ["𨏪"],
	"𨑃": ["𨑄"],
	"𢀽": ["𨑔"],
	"𨖀": ["𨔢"],
	"𨔡": ["𨔵"],
	"𨖼": ["𨖙"],
	"𨗭": ["𨖽"],
	"𨗌": ["𨗤"],
	"邔": ["𨙬"],
	"𨚛": ["𨚤"],
	"𨛻": ["𨛲"],
	"𨜭": ["𨜓"],
	"𫑮": ["𨞬"],
	"䤇": ["𨡻"],
	"𨡦": ["𨢂"],
	"𨢫": ["𨣊"],
	"𨥀": ["𨥄"],
	"𨫗": ["𨫷"],
	"𨰦": ["𨰰"],
	"𨵎": ["𨵤"],
	"𨵻": ["𨶒"],
	"𨷭": ["𨷠"],
	"𨹃": ["𨹄"],
	"𱀘": ["𨻪"],
	"𱁊": ["𨿫"],
	"𨾳": ["𩀑"],
	"𩃢": ["𩃔"],
	"𩆇": ["𩄱"],
	"𩅧": ["𩅉"],
	"𩆹": ["𩇂"],
	"𩉩": ["𩉨"],
	"𩉲": ["𩉨"],
	"𢻨": ["𩐅"],
	"𩐯": ["𩐲"],
	"𩑄": ["𩑃"],
	"𩑑": ["𩑗"],
	"𩑞": ["𩑫"],
	"𩑿": ["𩒕"],
	"𩒋": ["𩒕"],
	"𩖜": ["𩖛"],
	"𩞟": ["𩝫"],
	"𩟣": ["𩟤"],
	"𩢯": ["𩣇"],
	"𩣈": ["𩣐"],
	"𩣦": ["𩣮"],
	"𩦔": ["𩦴"],
	"𩫗": ["𩫖"],
	"𮫄": ["𩬻"],
	"𩯶": ["𩰁"],
	"𩱽": ["𩲄"],
	"𱆟": ["𩳣"],
	"𩵉": ["𩵊"],
	"𩾉": ["𩷟"],
	"𩹦": ["𩸑"],
	"𩸺": ["𩸙"],
	"𩾍": ["𩼇"],
	"𩼖": ["𩼔"],
	"𩿗": ["𩿎"],
	"𪀙": ["𪃪"],
	"𪇞": ["𪇀"],
	"𱈼": ["𪇄"],
	"𪈈": ["𪈐"],
	"𫜎": ["𪊨"],
	"𪏃": ["𪏂"],
	"𡒢": ["𪔋"],
	"𡒡": ["𪔌"],
	"𥖫": ["𪔑"],
	"𥀻": ["𪔯"],
	"𥀼": ["𪔴"],
	"𬹵": ["𪘉"],
	"𤒅": ["𪚱"],
	"𨉠": ["𪧻"],
	"𢺻": ["𪯈"],
	"𢻳": ["𪯈"],
	"𦾀": ["𫉌"],
	"𮙅": ["𫍔"],
	"𰼯": ["𫒡"],
	"乑": ["𫡑"],
	"姮": ["𫰟"],
	"㛨": ["𫱎"],
	"𭪢": ["𬃄"],
	"𣟃": ["𬄺"],
	"𨗵": ["𬇓"],
	"𬍭": ["𬍵"],
	"𤫞": ["𬎞"],
	"𤱏": ["𬏂"],
	"𫈯": ["𬝆"],
	"𬻔": ["𬻐"],
	"𭁇": ["𭁈"],
	"𰈥": ["𭊕"],
	"𡾠": ["𭗲"],
	"㬅": ["𭦟"],
	"𮐛": ["𮏨"],
	"𩼻": ["𮓖"],
	"𮔃": ["𮓻"],
	"𧪤": ["𮘭"],
	"𩟚": ["𮩑"],
	"𩶳": ["𮫿"],
	"𦤓": ["𮮴"],
	"𰜛": ["𰜚"],
	"𥚳": ["𰨋"],
	"𩢶": ["𱄤"],
	"𪑝": ["𱋷"],
	"𬻋": ["𱽌"],
	"𦰥": ["𱽨"],
	"龹": ["𠔉", "c"],
	"凞": ["𠘕", "c"],
	"龺": ["𠦝", "c"],
	"慤": ["𢡱", "c"],
	"㲃": ["𣪘", "c"],
	"昷": ["𥁕", "c"],
	"磁": ["𥔵", "c"],
	"磙": ["𥕦", "c"],
	"銢": ["𨥭", "c"],
	"飠": ["𩙿", "c"],
	"嫩": ["㜛", "i"],
	"牬": ["㸬", "i"],
	"瓥": ["㼖", "i"],
	"刉": ["刏", "i"],
	"蠫": ["劙", "i"],
	"勗": ["勖", "i"],
	"奩": ["匳", "i"],
	"咒": ["呪", "i"],
	"峰": ["峯", "i"],
	"雟": ["巂", "i"],
	"匆": ["悤", "i"],
	"举": ["挙", "i"],
	"浂": ["泆", "i"],
	"潃": ["滫", "i"],
	"床": ["牀", "i"],
	"礻": ["示", "i"],
	"秘": ["祕", "i"],
	"袮": ["祢", "i"],
	"笻": ["筇", "i"],
	"糹": ["糸", "i"],
	"繌": ["緵", "i"],
	"群": ["羣", "i"],
	"卧": ["臥", "i"],
	"薞": ["蕵", "i"],
	"䖍": ["虔", "i"],
	"裡": ["裏", "i"],
	"褒": ["襃", "i"],
	"蒏": ["醟", "i"],
	"鋄": ["錽", "i"],
	"閠": ["閏", "i"],
	"覇": ["霸", "i"],
	"鶿": ["鷀", "i"],
	"麵": ["麪", "i"],
	"濍": ["𤁬", "i"],
	"焨": ["𤊻", "i"],
	"羿": ["𦐧", "i"],
	"虀": ["𧆌", "i"],
	"邍": ["𨙅", "i"],
	"叱": ["𠮟", "ic"],
};

J_TABLE = {
	"虜": ["虜"],
	"塚": ["塚"],
	"晴": ["晴"],
	"猪": ["猪"],
	"益": ["益"],
	"礼": ["礼"],
	"神": ["神"],
	"祥": ["祥"],
	"福": ["福"],
	"靖": ["靖"],
	"精": ["精"],
	"羽": ["羽"],
	"諸": ["諸"],
	"都": ["都"],
	"飯": ["飯"],
	"飼": ["飼"],
	"館": ["館"],
	"侮": ["侮"],
	"僧": ["僧"],
	"喝": ["喝"],
	"嘆": ["嘆"],
	"器": ["器"],
	"塀": ["塀"],
	"層": ["層"],
	"屮": ["屮"],
	"悔": ["悔"],
	"慨": ["慨"],
	"憎": ["憎"],
	"懲": ["懲"],
	"敏": ["敏"],
	"既": ["既"],
	"旣": ["既"],
	"暑": ["暑"],
	"梅": ["梅"],
	"海": ["海"],
	"渚": ["渚"],
	"漢": ["漢"],
	"煮": ["煮"],
	"琢": ["琢"],
	"社": ["社"],
	"祉": ["祉"],
	"祈": ["祈"],
	"祐": ["祐"],
	"祖": ["祖"],
	"祝": ["祝"],
	"禍": ["禍"],
	"禎": ["禎"],
	"穀": ["穀"],
	"突": ["突"],
	"節": ["節"],
	"練": ["練"],
	"繁": ["繁"],
	"署": ["署"],
	"者": ["者"],
	"臭": ["臭"],
	"艹": ["艹"],
	"著": ["著"],
	"褐": ["褐"],
	"視": ["視"],
	"謁": ["謁"],
	"謹": ["謹"],
	"賓": ["賓"],
	"贈": ["贈"],
	"逸": ["逸"],
	"難": ["難"],
	"響": ["響"],
	"廊": ["廊"],
	"朗": ["朗"],
	"類": ["類"],
};

K_TABLE = {
	"廊": ["廊"],
	"朗": ["朗"],
	"類": ["類"],
	"滑": ["滑"],
	"龜": ["龜"],
	"金": ["金"],
	"懶": ["懶"],
	"癩": ["癩"],
	"羅": ["羅"],
	"蘿": ["蘿"],
	"螺": ["螺"],
	"裸": ["裸"],
	"邏": ["邏"],
	"樂": ["樂"],
	"烙": ["烙"],
	"亂": ["亂"],
	"爛": ["爛"],
	"鸞": ["鸞"],
	"濫": ["濫"],
	"襤": ["襤"],
	"拉": ["拉"],
	"臘": ["臘"],
	"蠟": ["蠟"],
	"浪": ["浪"],
	"狼": ["狼"],
	"郞": ["郎"],
	"冷": ["冷"],
	"勞": ["勞"],
	"爐": ["爐"],
	"老": ["老"],
	"露": ["露"],
	"碌": ["碌"],
	"祿": ["祿"],
	"綠": ["綠"],
	"菉": ["菉"],
	"錄": ["錄"],
	"鹿": ["鹿"],
	"論": ["論"],
	"壟": ["壟"],
	"籠": ["籠"],
	"聾": ["聾"],
	"牢": ["牢"],
	"雷": ["雷"],
	"屢": ["屢"],
	"樓": ["樓"],
	"淚": ["淚"],
	"漏": ["漏"],
	"累": ["累"],
	"縷": ["縷"],
	"陋": ["陋"],
	"肋": ["肋"],
	"凜": ["凜"],
	"凌": ["凌"],
	"稜": ["稜"],
	"綾": ["綾"],
	"菱": ["菱"],
	"陵": ["陵"],
	"讀": ["讀"],
	"拏": ["拏"],
	"諾": ["諾"],
	"怒": ["怒"],
	"率": ["率"],
	"北": ["北"],
	"復": ["復"],
	"泌": ["泌"],
	"數": ["數"],
	"索": ["索"],
	"參": ["參"],
	"塞": ["塞"],
	"說": ["說"],
	"拾": ["拾"],
	"掠": ["掠"],
	"亮": ["亮"],
	"兩": ["兩"],
	"凉": ["凉"],
	"梁": ["梁"],
	"糧": ["糧"],
	"良": ["良"],
	"諒": ["諒"],
	"女": ["女"],
	"廬": ["廬"],
	"旅": ["旅"],
	"濾": ["濾"],
	"驪": ["驪"],
	"麗": ["麗"],
	"轢": ["轢"],
	"憐": ["憐"],
	"戀": ["戀"],
	"撚": ["撚"],
	"漣": ["漣"],
	"煉": ["煉"],
	"璉": ["璉"],
	"練": ["練"],
	"聯": ["聯"],
	"輦": ["輦"],
	"蓮": ["蓮"],
	"連": ["連"],
	"鍊": ["鍊"],
	"裂": ["裂"],
	"廉": ["廉"],
	"念": ["念"],
	"捻": ["捻"],
	"殮": ["殮"],
	"簾": ["簾"],
	"獵": ["獵"],
	"令": ["令"],
	"囹": ["囹"],
	"寧": ["寧"],
	"嶺": ["嶺"],
	"怜": ["怜"],
	"玲": ["玲"],
	"瑩": ["瑩"],
	"羚": ["羚"],
	"聆": ["聆"],
	"鈴": ["鈴"],
	"零": ["零"],
	"靈": ["靈"],
	"領": ["領"],
	"禮": ["禮"],
	"隷": ["隸"],
	"寮": ["寮"],
	"料": ["料"],
	"樂": ["樂"],
	"燎": ["燎"],
	"療": ["療"],
	"蓼": ["蓼"],
	"遼": ["遼"],
	"龍": ["龍"],
	"柳": ["柳"],
	"流": ["流"],
	"溜": ["溜"],
	"琉": ["琉"],
	"硫": ["硫"],
	"紐": ["紐"],
	"六": ["六"],
	"戮": ["戮"],
	"倫": ["倫"],
	"崘": ["崙"],
	"淪": ["淪"],
	"輪": ["輪"],
	"慄": ["慄"],
	"栗": ["栗"],
	"履": ["履"],
	"李": ["李"],
	"梨": ["梨"],
	"泥": ["泥"],
	"痢": ["痢"],
	"罹": ["罹"],
	"裏": ["裏"],
	"裡": ["裡"],
	"溺": ["溺"],
	"吝": ["吝"],
	"燐": ["燐"],
	"璘": ["璘"],
	"藺": ["藺"],
	"隣": ["隣"],
	"鱗": ["鱗"],
	"麟": ["麟"],
	"淋": ["淋"],
	"立": ["立"],
	"笠": ["笠"],
	"粒": ["粒"],
	"狀": ["狀"],
	"炙": ["炙"],
	"識": ["識"],
	"切": ["切"],
	"度": ["度"],
	"糖": ["糖"],
	"宅": ["宅"],
	"洞": ["洞"],
	"廓": ["廓"],
};

T_TABLE = {
	"丽": ["丽"],
	"備": ["備"],
	"具": ["具"],
	"㒹": ["㒹"],
	"冗": ["冗"],
	"𩇟": ["𩇟"],
	"剆": ["剆"],
	"北": ["北"],
	"善": ["善"],
	"喳": ["喳"],
	"噴": ["噴"],
	"堲": ["堲"],
	"奢": ["奢"],
	"姬": ["姬"],
	"姘": ["姘"],
	"寘": ["寘"],
	"岍": ["岍"],
	"𡷦": ["𡷦"],
	"嵮": ["嵮"],
	"嵫": ["嵫"],
	"幩": ["幩"],
	"㡢": ["㡢"],
	"庰": ["庰"],
	"廊": ["廊"],
	"𣊸": ["𣊸"],
	"𦇚": ["𦇚"],
	"㣣": ["㣣"],
	"憤": ["憤"],
	"拼": ["拼"],
	"揤": ["揤"],
	"𢯱": ["𢯱"],
	"揅": ["揅"],
	"撝": ["撝"],
	"暑": ["暑"],
	"㬈": ["㬈"],
	"㫤": ["㫤"],
	"朗": ["朗"],
	"望": ["望"],
	"枅": ["枅"],
	"楂": ["楂"],
	"𣢧": ["𣢧"],
	"𣪍": ["𣪍"],
	"𣫺": ["𣫺"],
	"汧": ["汧"],
	"流": ["流"],
	"洴": ["洴"],
	"㴳": ["㴳"],
	"滇": ["滇"],
	"淹": ["淹"],
	"濆": ["濆"],
	"𤉣": ["𤉣"],
	"犕": ["犕"],
	"𤜵": ["𤜵"],
	"瑇": ["瑇"],
	"瑜": ["瑜"],
	"𥁄": ["𥁄"],
	"㿼": ["㿼"],
	"䀈": ["䀈"],
	"直": ["直"],
	"𥃳": ["𥃳"],
	"瞋": ["瞋"],
	"𥐝": ["𥐝"],
	"䃣": ["䃣"],
	"䄯": ["䄯"],
	"穊": ["穊"],
	"穏": ["穏"],
	"𥪧": ["𥪧"],
	"竮": ["竮"],
	"䈂": ["䈂"],
	"䈧": ["䈧"],
	"糒": ["糒"],
	"䊠": ["䊠"],
	"䌁": ["䌁"],
	"縂": ["縂"],
	"𦉇": ["𦉇"],
	"𦌾": ["𦌾"],
	"者": ["者"],
	"聠": ["聠"],
	"育": ["育"],
	"䐋": ["䐋"],
	"𦞧": ["𦞧"],
	"𣎜": ["𣎜"],
	"䑫": ["䑫"],
	"劳": ["劳"],
	"𦬼": ["𦬼"],
	"茝": ["茝"],
	"荣": ["荣"],
	"荓": ["荓"],
	"𦳕": ["𦳕"],
	"䔫": ["䔫"],
	"蓱": ["蓱"],
	"蓳": ["蓳"],
	"𧏊": ["𧏊"],
	"𧃒": ["𧃒"],
	"蚈": ["蚈"],
	"蛢": ["蛢"],
	"蝫": ["蝫"],
	"䗗": ["䗗"],
	"蟡": ["蟡"],
	"蠁": ["蠁"],
	"䗹": ["䗹"],
	"衠": ["衠"],
	"裗": ["裗"],
	"𧥦": ["𧥦"],
	"䚾": ["䚾"],
	"諭": ["諭"],
	"𧲨": ["𧲨"],
	"賁": ["賁"],
	"𧼯": ["𧼯"],
	"趼": ["趼"],
	"跰": ["跰"],
	"郱": ["郱"],
	"𨜮": ["𨜮"],
	"鉼": ["鉼"],
	"䦕": ["䦕"],
	"𨵷": ["𨵷"],
	"雃": ["雃"],
	"𩈚": ["𩈚"],
	"䪲": ["䪲"],
	"頩": ["頩"],
	"䯎": ["䯎"],
	"鱀": ["鱀"],
	"鳽": ["鳽"],
	"鵧": ["鵧"],
	"𪃎": ["𪃎"],
	"𪊑": ["𪊑"],
	"鼖": ["鼖"],
	"𪘀": ["𪘀"],
	"再": ["再", "c"],
	"冬": ["冬", "c"],
	"割": ["割", "c"],
	"勺": ["勺", "c"],
	"卉": ["卉", "c"],
	"卿": ["卿", "c"],
	"周": ["周", "c"],
	"城": ["城", "c"],
	"姬": ["姬", "c"],
	"将": ["将", "c"],
	"屠": ["屠", "c"],
	"彫": ["彫", "c"],
	"慈": ["慈", "c"],
	"憲": ["憲", "c"],
	"成": ["成", "c"],
	"杓": ["杓", "c"],
	"桒": ["桒", "c"],
	"栟": ["栟", "c"],
	"櫛": ["櫛", "c"],
	"浩": ["浩", "c"],
	"滋": ["滋", "c"],
	"爵": ["爵", "c"],
	"絣": ["絣", "c"],
	"芽": ["芽", "c"],
	"諭": ["諭", "c"],
	"輸": ["輸", "c"],
};

RADICALS_VARIANTS_TABLE = {
	'⺤': '⺥',
	'⺭': '⺬',
	'⺾': '⺿',
	'⻌': '⻍',
	'⻎': '⻍',
	'⻟': '⻞',
	'⺓': '⼳',
	'⺯': '⽷',
	'⻆': '⾓',
	'⻘': '⾭',
	'⻝': '⾷',
	'⻣': '⾻',
	'⻤': '⿁',
	'⻩': '⿈',
	'⻱': '⿔',
};