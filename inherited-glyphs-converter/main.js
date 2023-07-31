const J = 'j';
const K = 'k';
const T = 't';

const N = 'n'

const IVS_AD = 'ivs_ad';
const IVS_MS = 'ivs_ms';

const IVS_COMP_CLASH = "'";

const BMP_ONLY = '';
const CORE = 'c';
const ALL = '*';

function convert() {
	var supp_option = document.querySelector('input[name="supp"]:checked').value;
	
	var use_not_unifiable = document.getElementById(N).checked;
	
	var replaced_cache = [];
	
	var priority = document.querySelector('input[name="priority"]:checked').value;
	
	var comp_order = [];
	for (const opt of [J, K, T]) {
		if (document.getElementById(opt).checked) {
			switch (opt) {
				case J:
					comp_order.push([J, J_TABLE]);
					break;
				case K:
					comp_order.push([K, K_TABLE]);
					break;
				case T:
					comp_order.push([T, T_TABLE]);
					break;
			}
		}
	}
	
	var ivs_order = [];
	for (const opt of [IVS_AD, IVS_MS]) {
		if (document.getElementById(opt).checked) {
			ivs_order.push(opt);
		}
	}
	
	ivs_order = ivs_order.filter(item => item !== priority);
	
	if (document.getElementById(priority).checked) {
		ivs_order.unshift(priority);
	}
	
	var text_input = document.getElementById('input').value;
	
	// Remove variation selectors
	
	for (ord = 0xfe00; ord <= 0xfe0f; ord++) {
		text_input = text_input.replaceAll(String.fromCodePoint(ord), '');
	}
	
	for (ord = 0xe0100; ord <= 0xe01ef; ord++) {
		text_input = text_input.replaceAll(String.fromCodePoint(ord), '');
	}
	
	// Main conversion
	
	var converted = text_input;
	
	var chr_cache = [];
	
	for (const chr of text_input) {
		if (!chr_cache.includes(chr)) {
			var replace = false;
			
			var temp;
			var value = chr;
			var attr;
			
			temp = BASIC_TABLE[value];
			if (temp !== undefined) {
				value = temp[0];
				attr = temp[1];
				
				if (attr == undefined) {
					attr = "";
				}
				
				if (attr.includes(N)) {
					replace = use_not_unifiable;
				} else {
					replace = true;
				}
			}
			
			// ---
			
			var value_new = value;
			var attr_new = attr;
			
			var temp_flag = false;
			var char_locale;
			
			for (var table of comp_order) {
				[char_locale, table] = table;
				temp = table[value];
				if (temp !== undefined) {
					value_new = temp[0];
					attr_new = temp[1];
					
					if (attr_new == undefined) {
						attr_new = "";
					}
					
					if (ivs_order.length && char_locale == K && attr_new.includes(IVS_COMP_CLASH)) {
						continue;
					}
					
					replace = true;
					temp_flag = true;
					
					break
				}
			}
			
			if (!temp_flag) {
				for (var ivs of ivs_order) {
					switch (ivs) {
						case IVS_AD:
							table = IVS_AD_TABLE;
							break;
						case IVS_MS:
							table = IVS_MS_TABLE;
							break;
					}	
					
					temp = table[value];
					if (temp !== undefined) {
						value_new = temp
						replace = true;
						
						break;
					}
				}
			}
			
			// ---
			
			if (chr.codePointAt(0) <= 0xFFFF && value_new.codePointAt(0) > 0xFFFF) {
				if (Boolean(supp_option)) {
					value = value_new;
					attr = attr_new;
				}
			} else {
				value = value_new;
				attr = attr_new;
			}
			
			if (chr.codePointAt(0) <= 0xFFFF && value.codePointAt(0) > 0xFFFF) {
				replace = Boolean(supp_option);
				if (supp_option == CORE) {
					replace = attr.includes(CORE);
				}
			}
			
			if (replace) {
				converted = converted.replaceAll(chr, value);
			}
			
			chr_cache.push(chr);
		}
	}
	
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

function initTextarea() {
	if (document.getElementById('locale').checked) {
		htmlContent_input = '<textarea id="input" rows="3" lang=""></textarea>';
		htmlContent_output = '<textarea id="output" rows="3" lang="" readonly></textarea>';
	} else {
		htmlContent_input = '<textarea id="input" rows="3" style="font-family:\'Yu Gothic UI\',\'源ノ角ゴシック JP\',\'Source Han Sans\',\'ヒラギノ角ゴ ProN W3\',\'Hiragino Kaku Gothic ProN W3\';" ></textarea>';
		htmlContent_output = '<textarea id="output" rows="3" style="font-family:\'Yu Gothic UI\',\'源ノ角ゴシック JP\',\'Source Han Sans\',\'ヒラギノ角ゴ ProN W3\',\'Hiragino Kaku Gothic ProN W3\';" readonly></textarea>';
	}
	
	var span = document.getElementById('input_textarea');
	span.innerHTML = htmlContent_input;
	
	var span = document.getElementById('output_textarea');
	span.innerHTML = htmlContent_output;
}

function changeLocale() {
	var text_input = document.getElementById('input').value;
	var text_output = document.getElementById('output').value;
	initTextarea();
	document.getElementById('input').value = text_input;
	document.getElementById('output').value = text_output;
}

function tweet() {
	text_output = document.getElementById('output').value;
	window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(text_output));
}

BASIC_TABLE = {
	"⺤": ["⺥"],
	"⺭": ["⺬"],
	"⺾": ["⺿"],
	"⻌": ["⻍"],
	"⻎": ["⻍"],
	"⻟": ["⻞"],
	"⺓": ["⼳"],
	"⺯": ["⽷"],
	"⻆": ["⾓"],
	"⻘": ["⾭"],
	"⻝": ["⾷"],
	"⻣": ["⾻"],
	"⻤": ["⿁"],
	"⻩": ["⿈"],
	"⻱": ["⿔"],
	"𬺽": ["㐂"],
	"𠉶": ["㑭"],
	"𠪨": ["㕓"],
	"𠬍": ["㕙"],
	"䎛": ["㖈"],
	"𡁖": ["㗼"],
	"㦳": ["㘽"],
	"𡍤": ["㘿"],
	"𡎲": ["㙜"],
	"𪦅": ["㛴"],
	"嫩": ["㜛", "n"],
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
	"𢢡": ["㥿"],
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
	"牬": ["㸬", "n"],
	"𤡙": ["㺑"],
	"𤢷": ["㺤"],
	"瓥": ["㼖", "n"],
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
	"𨲶": ["䦋"],
	"𩣙": ["䮢"],
	"𩰘": ["䰗"],
	"𩳠": ["䰥"],
	"䱎": ["䱍"],
	"𮬹": ["䳟"],
	"𪍾": ["䵅"],
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
	"𬽶": ["伉"],
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
	"内": ["內"],
	"俞": ["兪"],
	"𠔃": ["兮"],
	"𠔏": ["共"],
	"册": ["冊"],
	"𠳲": ["冔"],
	"𠗟": ["凂"],
	"净": ["凈"],
	"凢": ["凡"],
	"凣": ["凡"],
	"𠙽": ["凷"],
	"刄": ["刃"],
	"刉": ["刏"],
	"𠛬": ["刑"],
	"别": ["別"],
	"删": ["刪"],
	"刴": ["剁"],
	"刹": ["剎"],
	"剏": ["剙"],
	"剥": ["剝"],
	"𠟾": ["剿"],
	"劔": ["劒"],
	"𠠤": ["劖"],
	"𠠥": ["劖"],
	"蠫": ["劙", "n"],
	"㓛": ["功"],
	"𠡍": ["劲"],
	"勊": ["勀"],
	"𠡳": ["勔"],
	"勗": ["勖", "n"],
	"𠢀": ["勤"],
	"𠢄": ["勤"],
	"𠢶": ["勦"],
	"勻": ["匀", "v"],
	"匄": ["匃"],
	"𭅅": ["匈"],
	"𠣿": ["匓"],
	"𠥆": ["匩"],
	"奩": ["匳", "n"],
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
	"𠮥": ["召"],
	"呑": ["吞"],
	"𭇅": ["吱"],
	"吴": ["吳"],
	"呉": ["吳"],
	"𠯵": ["吳"],
	"呐": ["吶"],
	"告": ["吿"],
	"吕": ["呂"],
	"㕼": ["哅"],
	"𫩴": ["哚"],
	"𫪾": ["唴"],
	"𠸝": ["啑"],
	"啟": ["啓"],
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
	"囱": ["囪"],
	"圏": ["圈"],
	"圎": ["圓"],
	"圗": ["圖"],
	"圡": ["土"],
	"𡈽": ["土"],
	"𡸁": ["垂"],
	"𡊹": ["垔"],
	"垜": ["垛"],
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
	"𰌚": ["嫯"],
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
	"雟": ["巂", "n"],
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
	"匆": ["悤", "n"],
	"惪": ["悳"],
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
	"㧞": ["拔"],
	"抜": ["拔"],
	"𢬌": ["拔"],
	"举": ["挙"],
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
	"𢶗": ["摮"],
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
	"𢾍": ["敖"],
	"𢾕": ["敖"],
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
	"晋": ["晉"],
	"𫞄": ["晉"],
	"𣇈": ["晓"],
	"晩": ["晚"],
	"曍": ["暭"],
	"暨": ["曁"],
	"𣉊": ["曉"],
	"𣋡": ["曚"],
	"曵": ["曳"],
	"曽": ["曾"],
	"𬚽": ["朙"],
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
	"浂": ["泆", "n"],
	"𭰝": ["洍"],
	"𣴑": ["流"],
	"𣵀": ["涅"],
	"渉": ["涉"],
	"涚": ["涗"],
	"涙": ["淚"],
	"𣴤": ["淢"],
	"渌": ["淥"],
	"𭓻": ["淧"],
	"浄": ["淨"],
	"清": ["淸"],
	"𰜟": ["渏"],
	"𣴪": ["渒"],
	"涣": ["渙"],
	"渇": ["渴"],
	"𣷍": ["湄"],
	"𭰫": ["湎"],
	"温": ["溫"],
	"潃": ["滫", "n"],
	"𣿗": ["滶"],
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
	"𤏺": ["熬"],
	"𤐗": ["燎"],
	"𤒄": ["燫"],
	"𤐭": ["燽"],
	"𤑕": ["爋"],
	"𤑛": ["爋"],
	"争": ["爭"],
	"為": ["爲"],
	"𡙁": ["爽"],
	"𫝃": ["爾"],
	"床": ["牀", "n"],
	"𫵠": ["犀"],
	"𰠸": ["犄"],
	"𭸟": ["猗"],
	"𫞤": ["猿"],
	"奬": ["獎"],
	"𤢝": ["獒"],
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
	"𥁊": ["盋"],
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
	"礻": ["示"],
	"鿆": ["祓"],
	"秘": ["祕", "n"],
	"袮": ["祢", "n"],
	"𥚬": ["祹"],
	"禄": ["祿"],
	"𥜽": ["禼"],
	"𥜾": ["禼"],
	"秃": ["禿"],
	"䄵": ["秊"],
	"𥝝": ["秊"],
	"税": ["稅"],
	"𥟑": ["稗"],
	"𫞹": ["空"],
	"𥤮": ["突"],
	"𥨤": ["竂"],
	"𥪖": ["竜"],
	"笻": ["筇", "n"],
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
	"糹": ["糸"],
	"𬗋": ["紫"],
	"絶": ["絕"],
	"緑": ["綠"],
	"𦂶": ["綺"],
	"緒": ["緖"],
	"縁": ["緣"],
	"𬗟": ["緬"],
	"繌": ["緵", "n"],
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
	"𦐓": ["翇"],
	"翺": ["翶"],
	"𫰗": ["耍"],
	"𦕓": ["聓"],
	"𦗷": ["聱"],
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
	"卧": ["臥", "n"],
	"𦤀": ["臭"],
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
	"苃": ["茇"],
	"䒮": ["茕"],
	"兹": ["茲"],
	"𦯬": ["荼"],
	"𭄳": ["莇"],
	"𦯶": ["莔"],
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
	"𦽠": ["蔜"],
	"蒍": ["蔿"],
	"薞": ["蕵", "n"],
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
	"裡": ["裏", "n"],
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
	"𧸟": ["贅"],
	"𦢼": ["贏"],
	"赱": ["走"],
	"𧺆": ["走"],
	"𰷳": ["趄"],
	"𧻬": ["趍"],
	"𧻞": ["趓"],
	"𰷿": ["趫"],
	"𠯁": ["足"],
	"跺": ["跥"],
	"𨂹": ["踴"],
	"𨃒": ["踴"],
	"躱": ["躲"],
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
	"𨗯": ["遨"],
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
	"蒏": ["醟", "n"],
	"釼": ["釰"],
	"鋭": ["銳"],
	"𨦵": ["鋩"],
	"録": ["錄"],
	"𨪆": ["錡"],
	"鋄": ["錽", "n"],
	"錬": ["鍊"],
	"𨭀": ["鎘"],
	"鎮": ["鎭"],
	"𨭼": ["鐐"],
	"䥥": ["鐮"],
	"𨯒": ["鑯"],
	"𨳇": ["門"],
	"閠": ["閏"],
	"閲": ["閱"],
	"䦨": ["闌"],
	"𨺓": ["隆"],
	"陧": ["隉"],
	"𨻶": ["隙"],
	"寉": ["隺"],
	"𨿽": ["雖"],
	"𮥿": ["雚"],
	"𩃓": ["電"],
	"覇": ["霸", "n"],
	"青": ["靑"],
	"静": ["靜"],
	"靣": ["面"],
	"𩉠": ["靫"],
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
	"𩼡": ["鰲"],
	"𩾖": ["鳧"],
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
	"黙": ["默"],
	"㸃": ["點"],
	"𪓾": ["鼇"],
	"皷": ["鼓"],
	"𭽸": ["鼕"],
	"𮮫": ["鼞"],
	"𣦗": ["齒"],
	"𮮽": ["齒"],
	"𱌡": ["齮"],
	"䆋": ["龝"],
	"榉": ["﨔"],
	"𧺯": ["﨣"],
	"𤔁": ["𠀭"],
	"𠒞": ["𠀻"],
	"𤕤": ["𠁊"],
	"𭑘": ["𠁊"],
	"𤱮": ["𠃁"],
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
	"龹": ["𠔉", "c"],
	"𠕂": ["𠕅"],
	"𭁡": ["𠕅"],
	"𡴊": ["𠕓"],
	"𣍓": ["𠕰"],
	"𤎹": ["𠘕"],
	"凞": ["𠘕", "c"],
	"𦥒": ["𠚒"],
	"𢩬": ["𠛃"],
	"𠛹": ["𠜂"],
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
	"龺": ["𠦝", "c"],
	"𠧳": ["𠧹"],
	"𫝂": ["𠩄"],
	"𫠦": ["𠩄"],
	"𠩶": ["𠩲"],
	"𠪬": ["𠪚"],
	"叝": ["𠫳"],
	"叱": ["𠮟", "nc"],
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
	"尮": ["𡯦"],
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
	"𡶲": ["𡷔"],
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
	"𢇬": ["𢇷"],
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
	"慤": ["𢡱", "c"],
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
	"桗": ["𣑫"],
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
	"𬆔": ["𣧷"],
	"㱿": ["𣪊"],
	"㲃": ["𣪘", "c"],
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
	"溄": ["𣺿"],
	"淹": ["𣼜"],
	"𣾞": ["𣽁"],
	"𭒞": ["𣽦"],
	"𣽍": ["𣾄"],
	"澚": ["𤀀"],
	"濍": ["𤁬", "n"],
	"𤂴": ["𤃪"],
	"𤅃": ["𤅄"],
	"𤊮": ["𤉺"],
	"焨": ["𤊻"],
	"焨": ["𤊻", "n"],
	"㷗": ["𤌇"],
	"𤏊": ["𤐂"],
	"𤑋": ["𤐥"],
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
	"𬎨": ["𤬾"],
	"𤮬": ["𤮫"],
	"𪐕": ["𤯒"],
	"𭻐": ["𤱧"],
	"𢍚": ["𤱿"],
	"𤵵": ["𤵨"],
	"𬏝": ["𤵶"],
	"𤿪": ["𥀈"],
	"昷": ["𥁕", "c"],
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
	"磁": ["𥔵", "c"],
	"磙": ["𥕦", "c"],
	"𬒛": ["𥕧"],
	"𮁳": ["𥙨"],
	"𥛈": ["𥙸"],
	"𮂁": ["𥚣"],
	"𥜨": ["𥜪"],
	"𮃄": ["𥞛"],
	"稽": ["𥠻"],
	"𥡴": ["𥠻"],
	"𥠸": ["𥡃"],
	"𥡱": ["𥡤"],
	"𥢰": ["𥢤"],
	"𥤛": ["𥤚"],
	"𥦣": ["𥥗"],
	"𥦐": ["𥦪"],
	"𥦙": ["𥦱"],
	"窴": ["𥧑"],
	"𥪺": ["𥫃"],
	"𥫕": ["𥫖"],
	"𥬘": ["𥬟"],
	"𥬸": ["𥬲"],
	"𥰓": ["𥯣"],
	"𥬽": ["𥯮"],
	"𥰅": ["𥲂"],
	"𥲤": ["𥳁"],
	"𥳸": ["𥳹"],
	"𥱃": ["𥳿"],
	"𥵄": ["𥶅"],
	"𥷴": ["𥷤"],
	"𦀉": ["𥿰"],
	"𥿰": ["𦀉"],
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
	"羿": ["𦐧", "n"],
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
	"𢲓": ["𦥹"],
	"𠮌": ["𦦖"],
	"𦦧": ["𦦝"],
	"𦦡": ["𦦞"],
	"𦨳": ["𦨼"],
	"𦪰": ["𦪈"],
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
	"虀": ["𧆌", "n"],
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
	"𧟤": ["𧟥"],
	"𧟵": ["𧟱"],
	"𧟶": ["𧟳"],
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
	"𠔌": ["𧮫"],
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
	"邍": ["𨙅", "n"],
	"邔": ["𨙬"],
	"𨚛": ["𨚤"],
	"𨛻": ["𨛲"],
	"𨜭": ["𨜓"],
	"𫑮": ["𨞬"],
	"䤇": ["𨡻"],
	"𨡦": ["𨢂"],
	"𨢫": ["𨣊"],
	"𨥀": ["𨥄"],
	"銢": ["𨥭", "c"],
	"𨫗": ["𨫷"],
	"鑙": ["𨮺"],
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
	"飠": ["𩙿", "c"],
	"𩞟": ["𩝫"],
	"𩟣": ["𩟤"],
	"𩢯": ["𩣇"],
	"𩣈": ["𩣐"],
	"𩣦": ["𩣮"],
	"𩦔": ["𩦴"],
	"𩪨": ["𩪋"],
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
	"𩾃": ["𩾅"],
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
	"𧙤": ["𬡖"],
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
};

J_TABLE = {
	"廊": ["廊"],
	"朗": ["朗"],
	"虜": ["虜"],
	"類": ["類"],
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
	"免": ["免", "v"],
	"勉": ["勉"],
	"勤": ["勤"],
	"卑": ["卑"],
	"喝": ["喝"],
	"嘆": ["嘆"],
	"器": ["器"],
	"塀": ["塀"],
	"墨": ["墨"],
	"層": ["層"],
	"屮": ["屮"],
	"悔": ["悔"],
	"慨": ["慨"],
	"憎": ["憎"],
	"懲": ["懲"],
	"敏": ["敏"],
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
	"頻": ["頻"],
};

K_TABLE = {
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
	"廊": ["廊"],
	"朗": ["朗"],
	"浪": ["浪"],
	"狼": ["狼"],
	"冷": ["冷"],
	"勞": ["勞"],
	"爐": ["爐"],
	"老": ["老"],
	"虜": ["虜"],
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
	"讀": ["讀", "'"],
	"拏": ["拏"],
	"諾": ["諾"],
	"怒": ["怒"],
	"率": ["率", "'"],
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
	"憐": ["憐", "'"],
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
	"寮": ["寮"],
	"料": ["料"],
	"樂": ["樂"],
	"燎": ["燎"],
	"療": ["療"],
	"蓼": ["蓼"],
	"遼": ["遼"],
	"龍": ["龍", "'"],
	"柳": ["柳"],
	"流": ["流"],
	"溜": ["溜"],
	"琉": ["琉"],
	"硫": ["硫"],
	"紐": ["紐"],
	"類": ["類"],
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
	"燐": ["燐", "'"],
	"璘": ["璘"],
	"藺": ["藺"],
	"隣": ["隣", "'"],
	"鱗": ["鱗", "'"],
	"麟": ["麟", "'"],
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
	"免": ["免", "v"],
	"兔": ["兔", "cv"],
	"具": ["具"],
	"㒹": ["㒹"],
	"再": ["再", "c"],
	"冗": ["冗"],
	"冤": ["冤", "cv"],
	"冬": ["冬", "c"],
	"𩇟": ["𩇟"],
	"剆": ["剆"],
	"割": ["割", "c"],
	"勺": ["勺", "c"],
	"北": ["北"],
	"卉": ["卉", "c"],
	"卿": ["卿", "c"],
	"周": ["周", "c"],
	"善": ["善"],
	"喳": ["喳"],
	"噴": ["噴"],
	"城": ["城", "c"],
	"堲": ["堲"],
	"奢": ["奢"],
	"姬": ["姬", "c"],
	"姘": ["姘"],
	"寘": ["寘"],
	"将": ["将", "c"],
	"屠": ["屠", "c"],
	"岍": ["岍"],
	"𡷦": ["𡷦"],
	"嵮": ["嵮"],
	"嵫": ["嵫"],
	"巽": ["巽", "c"],
	"幩": ["幩"],
	"㡢": ["㡢"],
	"庰": ["庰"],
	"廊": ["廊"],
	"𣊸": ["𣊸"],
	"𦇚": ["𦇚"],
	"彫": ["彫", "c"],
	"㣣": ["㣣"],
	"慈": ["慈", "c"],
	"憲": ["憲", "c"],
	"憤": ["憤"],
	"成": ["成", "c"],
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
	"杓": ["杓", "c"],
	"㭉": ["㭉"],
	"枅": ["枅"],
	"桒": ["桒", "c"],
	"栟": ["栟", "c"],
	"楂": ["楂"],
	"櫛": ["櫛", "c"],
	"𣢧": ["𣢧"],
	"𣪍": ["𣪍"],
	"𣫺": ["𣫺"],
	"汧": ["汧"],
	"流": ["流"],
	"浩": ["浩", "c"],
	"洴": ["洴"],
	"㴳": ["㴳"],
	"滋": ["滋", "c"],
	"滇": ["滇"],
	"淹": ["淹"],
	"潮": ["潮", "c"],
	"濆": ["濆"],
	"𤉣": ["𤉣"],
	"爵": ["爵", "c"],
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
	"絣": ["絣", "c"],
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
	"芽": ["芽", "c"],
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
	"諭": ["諭", "c"],
	"𧲨": ["𧲨"],
	"賁": ["賁"],
	"𧼯": ["𧼯"],
	"趼": ["趼"],
	"跰": ["跰"],
	"輸": ["輸", "c"],
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
};

IVS_AD_TABLE = {
	"丈": "丈󠄁",
	"与": "与󠄁",
	"乳": "乳󠄁",
	"亡": "亡󠄁",
	"交": "交󠄁",
	"伴": "伴󠄁",
	"使": "使󠄁",
	"侮": "侮󠄁",
	"侵": "侵󠄁",
	"便": "便󠄁",
	"偉": "偉󠄁",
	"偏": "偏󠄁",
	"健": "健󠄁",
	"傑": "傑󠄂",
	"僊": "僊󠄁",
	"僧": "僧󠄁",
	"僭": "僭󠄀",
	"僲": "僲󠄁",
	"全": "全󠄁",
	"八": "八󠄀",
	"公": "公󠄁",
	"兼": "兼󠄁",
	"冉": "冉󠄁",
	"再": "再󠄀",
	"冒": "冒󠄁",
	"冤": "冤󠄀",
	"冬": "冬󠄀",
	"冴": "冴󠄂",
	"凋": "凋󠄁",
	"凡": "凡󠄁",
	"刃": "刃󠄁",
	"分": "分󠄁",
	"判": "判󠄁",
	"券": "券󠄁",
	"削": "削󠄁",
	"前": "前󠄁",
	"剤": "剤󠄁",
	"割": "割󠄂",
	"勇": "勇󠄁",
	"勉": "勉󠄀",
	"勗": "勗󠄁",
	"勝": "勝󠄁",
	"勤": "勤󠄁",
	"勺": "勺󠄀",
	"包": "包󠄁",
	"化": "化󠄁",
	"匹": "匹󠄁",
	"匿": "匿󠄁",
	"區": "區󠄁",
	"半": "半󠄁",
	"卑": "卑󠄀",
	"博": "博󠄁",
	"卥": "卥󠄁",
	"厩": "厩󠄂",
	"叉": "叉󠄀",
	"及": "及󠄁",
	"受": "受󠄁",
	"史": "史󠄁",
	"吏": "吏󠄁",
	"吸": "吸󠄁",
	"呀": "呀󠄀",
	"呈": "呈󠄁",
	"周": "周󠄀",
	"咬": "咬󠄀",
	"唐": "唐󠄁",
	"唳": "唳󠄂",
	"啄": "啄󠄁",
	"商": "商󠄁",
	"啓": "啓󠄁",
	"喝": "喝󠄁",
	"喩": "喩󠄂",
	"喫": "喫󠄂",
	"喰": "喰󠄁",
	"嗤": "嗤󠄂",
	"嘅": "嘅󠄁",
	"嘆": "嘆󠄀",
	"嘉": "嘉󠄀",
	"器": "器󠄁",
	"嚮": "嚮󠄁",
	"囮": "囮󠄁",
	"坪": "坪󠄁",
	"城": "城󠄀",
	"埖": "埖󠄁",
	"堋": "堋󠄁",
	"堙": "堙󠄁",
	"堽": "堽󠄁",
	"塀": "塀󠄁",
	"塘": "塘󠄁",
	"塚": "塚󠄂",
	"墜": "墜󠄁",
	"墨": "墨󠄀",
	"契": "契󠄂",
	"奓": "奓󠄁",
	"妄": "妄󠄁",
	"妥": "妥󠄁",
	"姬": "姬󠄁",
	"姿": "姿󠄁",
	"娜": "娜󠄁",
	"婦": "婦󠄁",
	"媛": "媛󠄁",
	"媾": "媾󠄁",
	"嫂": "嫂󠄁",
	"嫌": "嫌󠄁",
	"嫚": "嫚󠄁",
	"害": "害󠄃",
	"宵": "宵󠄁",
	"寒": "寒󠄁",
	"寧": "寧󠄀",
	"寨": "寨󠄀",
	"将": "将󠄀",
	"尊": "尊󠄂",
	"尋": "尋󠄁",
	"導": "導󠄁",
	"尨": "尨󠄁",
	"屑": "屑󠄁",
	"層": "層󠄁",
	"屮": "屮󠄀",
	"崩": "崩󠄁",
	"嵎": "嵎󠄁",
	"嶇": "嶇󠄁",
	"巡": "巡󠄁",
	"巨": "巨󠄁",
	"巽": "巽󠄀",
	"帆": "帆󠄁",
	"帝": "帝󠄁",
	"帽": "帽󠄁",
	"幔": "幔󠄁",
	"幣": "幣󠄁",
	"平": "平󠄁",
	"庭": "庭󠄁",
	"廉": "廉󠄀",
	"廊": "廊󠄂",
	"廐": "廐󠄁",
	"廟": "廟󠄁",
	"廠": "廠󠄁",
	"延": "延󠄁",
	"廷": "廷󠄁",
	"建": "建󠄁",
	"廻": "廻󠄀",
	"弊": "弊󠄁",
	"弭": "弭󠄁",
	"弱": "弱󠄁",
	"弸": "弸󠄁",
	"彩": "彩󠄁",
	"彫": "彫󠄁",
	"往": "往󠄁",
	"徘": "徘󠄀",
	"忍": "忍󠄁",
	"忘": "忘󠄁",
	"忙": "忙󠄁",
	"忝": "忝󠄁",
	"急": "急󠄁",
	"恐": "恐󠄁",
	"悔": "悔󠄀",
	"情": "情󠄁",
	"愉": "愉󠄁",
	"意": "意󠄁",
	"慈": "慈󠄁",
	"慌": "慌󠄁",
	"慢": "慢󠄁",
	"慧": "慧󠄁",
	"慨": "慨󠄁",
	"憎": "憎󠄀",
	"憐": "憐󠄁",
	"憲": "憲󠄁",
	"懲": "懲󠄂",
	"成": "成󠄁",
	"房": "房󠄁",
	"所": "所󠄁",
	"扇": "扇󠄁",
	"扈": "扈󠄁",
	"扉": "扉󠄁",
	"扱": "扱󠄁",
	"抱": "抱󠄁",
	"拐": "拐󠄁",
	"拒": "拒󠄁",
	"拳": "拳󠄁",
	"拷": "拷󠄁",
	"挺": "挺󠄀",
	"捨": "捨󠄁",
	"捩": "捩󠄁",
	"掃": "掃󠄁",
	"授": "授󠄁",
	"採": "採󠄁",
	"援": "援󠄁",
	"搆": "搆󠄁",
	"搜": "搜󠄁",
	"搨": "搨󠄁",
	"摩": "摩󠄁",
	"摯": "摯󠄀",
	"擶": "擶󠄁",
	"敏": "敏󠄀",
	"敷": "敷󠄁",
	"文": "文󠄁",
	"斉": "斉󠄁",
	"斎": "斎󠄁",
	"斧": "斧󠄀",
	"旟": "旟󠄁",
	"明": "明󠄁",
	"晟": "晟󠄁",
	"晴": "晴󠄀",
	"暑": "暑󠄁",
	"暖": "暖󠄁",
	"暗": "暗󠄁",
	"暵": "暵󠄀",
	"曁": "曁󠄀",
	"曙": "曙󠄁",
	"曜": "曜󠄁",
	"更": "更󠄁",
	"書": "書󠄁",
	"曼": "曼󠄁",
	"最": "最󠄁",
	"月": "月󠄁",
	"朋": "朋󠄁",
	"服": "服󠄁",
	"朕": "朕󠄂",
	"朗": "朗󠄃",
	"朝": "朝󠄁",
	"期": "期󠄁",
	"杖": "杖󠄀",
	"条": "条󠄁",
	"松": "松󠄁",
	"枦": "枦󠄁",
	"柊": "柊󠄁",
	"栓": "栓󠄁",
	"栟": "栟󠄁",
	"校": "校󠄁",
	"桃": "桃󠄀",
	"桒": "桒󠄀",
	"桝": "桝󠄂",
	"梅": "梅󠄀",
	"梗": "梗󠄀",
	"梛": "梛󠄁",
	"梢": "梢󠄁",
	"棚": "棚󠄁",
	"楞": "楞󠄁",
	"榻": "榻󠄁",
	"構": "構󠄁",
	"槪": "槪󠄁",
	"槾": "槾󠄁",
	"樽": "樽󠄁",
	"橕": "橕󠄁",
	"檎": "檎󠄁",
	"檐": "檐󠄀",
	"欄": "欄󠄀",
	"欝": "欝󠄁",
	"次": "次󠄁",
	"欤": "欤󠄁",
	"殺": "殺󠄀",
	"氺": "氺󠄁",
	"沪": "沪󠄁",
	"沿": "沿󠄂",
	"泡": "泡󠄁",
	"派": "派󠄂",
	"浩": "浩󠄁",
	"浮": "浮󠄁",
	"海": "海󠄀",
	"浸": "浸󠄁",
	"消": "消󠄁",
	"添": "添󠄁",
	"済": "済󠄁",
	"渚": "渚󠄀",
	"港": "港󠄁",
	"湮": "湮󠄁",
	"湲": "湲󠄀",
	"溝": "溝󠄁",
	"滋": "滋󠄁",
	"滕": "滕󠄁",
	"滛": "滛󠄁",
	"滬": "滬󠄁",
	"漑": "漑󠄁",
	"漢": "漢󠄁",
	"潑": "潑󠄁",
	"潔": "潔󠄁",
	"潛": "潛󠄁",
	"潮": "潮󠄀",
	"澘": "澘󠄁",
	"濯": "濯󠄁",
	"瀛": "瀛󠄁",
	"灰": "灰󠄁",
	"煒": "煒󠄀",
	"煙": "煙󠄁",
	"煢": "煢󠄀",
	"煮": "煮󠄀",
	"煽": "煽󠄂",
	"熔": "熔󠄀",
	"熳": "熳󠄁",
	"燐": "燐󠄁",
	"燿": "燿󠄁",
	"爨": "爨󠄀",
	"爵": "爵󠄂",
	"父": "父󠄁",
	"爺": "爺󠄀",
	"爾": "爾󠄀",
	"牌": "牌󠄁",
	"牙": "牙󠄁",
	"狡": "狡󠄀",
	"猪": "猪󠄀",
	"猶": "猶󠄂",
	"率": "率󠄁",
	"珊": "珊󠄀",
	"珎": "珎󠄁",
	"珥": "珥󠄁",
	"班": "班󠄁",
	"琢": "琢󠄀",
	"環": "環󠄁",
	"瓊": "瓊󠄁",
	"瓘": "瓘󠄁",
	"甄": "甄󠄁",
	"甌": "甌󠄁",
	"甦": "甦󠄀",
	"畔": "畔󠄁",
	"瘈": "瘈󠄁",
	"瘦": "瘦󠄀",
	"癒": "癒󠄁",
	"的": "的󠄁",
	"皓": "皓󠄁",
	"盆": "盆󠄁",
	"益": "益󠄁",
	"盔": "盔󠄀",
	"盛": "盛󠄁",
	"盟": "盟󠄁",
	"盲": "盲󠄁",
	"瞍": "瞍󠄁",
	"瞢": "瞢󠄁",
	"瞬": "瞬󠄁",
	"矩": "矩󠄁",
	"砲": "砲󠄁",
	"硝": "硝󠄁",
	"硬": "硬󠄁",
	"硼": "硼󠄁",
	"碑": "碑󠄀",
	"磔": "磔󠄁",
	"磨": "磨󠄁",
	"礪": "礪󠄁",
	"礼": "礼󠄁",
	"社": "社󠄁",
	"祈": "祈󠄀",
	"祉": "祉󠄁",
	"祐": "祐󠄀",
	"祖": "祖󠄁",
	"祝": "祝󠄀",
	"神": "神󠄀",
	"祢": "祢󠄁",
	"祥": "祥󠄀",
	"禍": "禍󠄀",
	"禎": "禎󠄁",
	"福": "福󠄁",
	"禺": "禺󠄁",
	"程": "程󠄁",
	"稱": "稱󠄁",
	"穀": "穀󠄀",
	"穠": "穠󠄁",
	"穴": "穴󠄁",
	"突": "突󠄁",
	"窗": "窗󠄁",
	"筑": "筑󠄁",
	"筵": "筵󠄀",
	"箙": "箙󠄁",
	"節": "節󠄁",
	"篇": "篇󠄁",
	"築": "築󠄁",
	"篝": "篝󠄁",
	"簿": "簿󠄁",
	"籍": "籍󠄁",
	"籐": "籐󠄁",
	"籘": "籘󠄁",
	"籾": "籾󠄁",
	"粉": "粉󠄁",
	"粐": "粐󠄁",
	"粮": "粮󠄁",
	"精": "精󠄀",
	"糖": "糖󠄀",
	"糲": "糲󠄁",
	"約": "約󠄁",
	"紋": "紋󠄁",
	"納": "納󠄁",
	"級": "級󠄁",
	"紛": "紛󠄁",
	"終": "終󠄁",
	"絜": "絜󠄁",
	"絞": "絞󠄁",
	"絣": "絣󠄁",
	"綛": "綛󠄁",
	"綟": "綟󠄁",
	"綮": "綮󠄁",
	"網": "網󠄁",
	"総": "総󠄁",
	"緝": "緝󠄁",
	"編": "編󠄁",
	"緩": "緩󠄁",
	"緯": "緯󠄁",
	"練": "練󠄀",
	"縛": "縛󠄁",
	"縢": "縢󠄂",
	"縫": "縫󠄁",
	"縵": "縵󠄂",
	"繁": "繁󠄁",
	"繃": "繃󠄁",
	"缾": "缾󠄁",
	"署": "署󠄀",
	"羀": "羀󠄁",
	"羡": "羡󠄀",
	"羽": "羽󠄀",
	"翁": "翁󠄂",
	"翌": "翌󠄁",
	"習": "習󠄁",
	"翔": "翔󠄁",
	"翠": "翠󠄁",
	"翩": "翩󠄁",
	"翻": "翻󠄁",
	"翼": "翼󠄂",
	"耀": "耀󠄁",
	"考": "考󠄁",
	"者": "者󠄁",
	"耒": "耒󠄀",
	"耕": "耕󠄁",
	"耗": "耗󠄁",
	"聖": "聖󠄁",
	"聡": "聡󠄁",
	"聰": "聰󠄀",
	"聶": "聶󠄁",
	"肇": "肇󠄁",
	"肖": "肖󠄁",
	"肞": "肞󠄁",
	"肩": "肩󠄁",
	"肺": "肺󠄁",
	"胞": "胞󠄁",
	"脈": "脈󠄂",
	"腱": "腱󠄀",
	"臭": "臭󠄁",
	"舌": "舌󠄁",
	"舜": "舜󠄁",
	"舮": "舮󠄁",
	"船": "船󠄁",
	"艇": "艇󠄁",
	"艹": "艹󠄂",
	"芍": "芍󠄁",
	"花": "花󠄁",
	"芽": "芽󠄀",
	"苅": "苅󠄁",
	"苒": "苒󠄁",
	"苣": "苣󠄁",
	"荒": "荒󠄁",
	"荵": "荵󠄁",
	"莽": "莽󠄁",
	"菓": "菓󠄁",
	"菜": "菜󠄁",
	"菟": "菟󠄀",
	"萌": "萌󠄁",
	"萢": "萢󠄁",
	"著": "著󠄁",
	"葜": "葜󠄁",
	"蓮": "蓮󠄀",
	"蓴": "蓴󠄁",
	"蔑": "蔑󠄀",
	"蕃": "蕃󠄁",
	"蕝": "蕝󠄁",
	"薄": "薄󠄁",
	"薇": "薇󠄁",
	"藕": "藕󠄁",
	"藤": "藤󠄁",
	"蘭": "蘭󠄁",
	"虐": "虐󠄁",
	"虔": "虔󠄀",
	"虜": "虜󠄀",
	"虞": "虞󠄁",
	"蚊": "蚊󠄁",
	"蝙": "蝙󠄁",
	"螂": "螂󠄁",
	"螽": "螽󠄁",
	"蟒": "蟒󠄂",
	"蠎": "蠎󠄁",
	"蠶": "蠶󠄂",
	"衂": "衂󠄁",
	"衋": "衋󠄁",
	"術": "術󠄁",
	"衛": "衛󠄁",
	"衷": "衷󠄁",
	"褊": "褊󠄁",
	"褐": "褐󠄁",
	"襯": "襯󠄁",
	"覆": "覆󠄁",
	"覇": "覇󠄁",
	"視": "視󠄁",
	"覯": "覯󠄁",
	"訊": "訊󠄂",
	"訟": "訟󠄁",
	"註": "註󠄀",
	"評": "評󠄁",
	"認": "認󠄁",
	"誕": "誕󠄁",
	"誠": "誠󠄁",
	"誤": "誤󠄁",
	"誹": "誹󠄀",
	"調": "調󠄁",
	"請": "請󠄁",
	"諛": "諛󠄁",
	"諞": "諞󠄁",
	"諭": "諭󠄀",
	"諮": "諮󠄁",
	"諸": "諸󠄀",
	"謁": "謁󠄀",
	"謄": "謄󠄁",
	"謙": "謙󠄁",
	"講": "講󠄁",
	"謹": "謹󠄀",
	"謾": "謾󠄁",
	"譁": "譁󠄁",
	"譖": "譖󠄂",
	"貛": "貛󠄁",
	"貧": "貧󠄁",
	"貨": "貨󠄁",
	"資": "資󠄁",
	"賊": "賊󠄁",
	"賓": "賓󠄀",
	"購": "購󠄂",
	"贅": "贅󠄁",
	"贈": "贈󠄁",
	"赧": "赧󠄀",
	"起": "起󠄁",
	"距": "距󠄁",
	"踉": "踉󠄁",
	"躍": "躍󠄁",
	"躡": "躡󠄁",
	"較": "較󠄁",
	"輸": "輸󠄁",
	"轄": "轄󠄂",
	"込": "込󠄁",
	"迅": "迅󠄁",
	"迎": "迎󠄁",
	"近": "近󠄁",
	"返": "返󠄁",
	"迩": "迩󠄁",
	"迪": "迪󠄁",
	"迫": "迫󠄁",
	"迭": "迭󠄁",
	"述": "述󠄁",
	"迷": "迷󠄁",
	"追": "追󠄁",
	"退": "退󠄁",
	"送": "送󠄁",
	"逃": "逃󠄂",
	"逆": "逆󠄁",
	"透": "透󠄁",
	"逐": "逐󠄁",
	"途": "途󠄁",
	"通": "通󠄁",
	"逝": "逝󠄁",
	"逞": "逞󠄁",
	"速": "速󠄁",
	"造": "造󠄁",
	"連": "連󠄀",
	"逮": "逮󠄁",
	"週": "週󠄁",
	"進": "進󠄁",
	"逵": "逵󠄀",
	"逸": "逸󠄁",
	"遂": "遂󠄂",
	"遇": "遇󠄁",
	"遊": "遊󠄁",
	"運": "運󠄁",
	"遍": "遍󠄁",
	"過": "過󠄁",
	"道": "道󠄁",
	"達": "達󠄁",
	"違": "違󠄂",
	"遘": "遘󠄁",
	"遠": "遠󠄁",
	"遣": "遣󠄁",
	"適": "適󠄁",
	"遭": "遭󠄁",
	"遮": "遮󠄁",
	"遵": "遵󠄁",
	"遷": "遷󠄂",
	"選": "選󠄁",
	"遺": "遺󠄁",
	"遼": "遼󠄁",
	"避": "避󠄁",
	"邃": "邃󠄁",
	"還": "還󠄁",
	"那": "那󠄁",
	"邨": "邨󠄁",
	"邪": "邪󠄂",
	"都": "都󠄀",
	"酌": "酌󠄁",
	"酷": "酷󠄁",
	"醱": "醱󠄁",
	"釁": "釁󠄁",
	"采": "采󠄁",
	"釜": "釜󠄀",
	"釣": "釣󠄁",
	"鉛": "鉛󠄁",
	"鋩": "鋩󠄁",
	"錵": "錵󠄁",
	"鍥": "鍥󠄁",
	"鍵": "鍵󠄀",
	"鎋": "鎋󠄁",
	"鎌": "鎌󠄁",
	"鎖": "鎖󠄁",
	"鎡": "鎡󠄁",
	"鏝": "鏝󠄁",
	"鑷": "鑷󠄁",
	"閒": "閒󠄁",
	"降": "降󠄁",
	"隆": "隆󠄁",
	"隊": "隊󠄁",
	"隣": "隣󠄂",
	"隻": "隻󠄁",
	"雅": "雅󠄂",
	"雇": "雇󠄁",
	"雙": "雙󠄁",
	"雚": "雚󠄁",
	"難": "難󠄀",
	"雪": "雪󠄁",
	"雰": "雰󠄁",
	"靖": "靖󠄁",
	"靭": "靭󠄂",
	"靴": "靴󠄁",
	"鞭": "鞭󠄀",
	"韓": "韓󠄁",
	"韞": "韞󠄀",
	"音": "音󠄁",
	"響": "響󠄃",
	"頌": "頌󠄁",
	"頑": "頑󠄁",
	"頒": "頒󠄁",
	"頻": "頻󠄀",
	"類": "類󠄀",
	"顧": "顧󠄁",
	"顳": "顳󠄁",
	"食": "食󠄁",
	"飢": "飢󠄁",
	"飯": "飯󠄀",
	"飼": "飼󠄁",
	"飽": "飽󠄁",
	"飾": "飾󠄁",
	"養": "養󠄁",
	"餓": "餓󠄁",
	"館": "館󠄁",
	"饅": "饅󠄂",
	"駁": "駁󠄀",
	"騰": "騰󠄁",
	"驅": "驅󠄁",
	"驊": "驊󠄀",
	"驟": "驟󠄁",
	"髯": "髯󠄁",
	"鬘": "鬘󠄁",
	"鬮": "鬮󠄁",
	"鬵": "鬵󠄁",
	"魔": "魔󠄁",
	"鮗": "鮗󠄁",
	"鮫": "鮫󠄀",
	"鯛": "鯛󠄁",
	"鱈": "鱈󠄁",
	"鱗": "鱗󠄁",
	"鵬": "鵬󠄁",
	"鶿": "鶿󠄁",
	"鷀": "鷀󠄁",
	"麗": "麗󠄁",
	"麟": "麟󠄂",
	"麻": "麻󠄁",
	"麿": "麿󠄁",
	"黛": "黛󠄁",
	"鼈": "鼈󠄂",
	"鼻": "鼻󠄁",
	"龍": "龍󠄂",
	"龜": "龜󠄁",
	"龝": "龝󠄁",
	"𪘚": "𪘚󠄁",
};

IVS_MS_TABLE = {
	"䁘": "䁘󠄂",
	"䎗": "䎗󠄁",
	"䘕": "䘕󠄁",
	"䤾": "䤾󠄁",
	"䨩": "䨩󠄂",
	"乸": "乸󠄁",
	"倩": "倩󠄄",
	"凑": "凑󠄂",
	"啫": "啫󠄁",
	"嚤": "嚤󠄁",
	"姸": "姸󠄂",
	"岍": "岍󠄃",
	"岭": "岭󠄂",
	"樋": "樋󠄅",
	"汧": "汧󠄅",
	"淎": "淎󠄂",
	"瀞": "瀞󠄉",
	"熮": "熮󠄂",
	"熻": "熻󠄁",
	"硏": "硏󠄄",
	"窰": "窰󠄂",
	"綉": "綉󠄂",
	"綫": "綫󠄂",
	"翬": "翬󠄂",
	"翱": "翱󠄁",
	"翺": "翺󠄃",
	"茺": "茺󠄄",
	"菁": "菁󠄇",
	"蒨": "蒨󠄆",
	"蔴": "蔴󠄄",
	"踭": "踭󠄁",
	"邨": "邨󠄇",
	"銹": "銹󠄂",
	"鍮": "鍮󠄄",
	"靜": "靜󠄉",
	"靭": "靭󠄆",
	"飬": "飬󠄂",
	"餸": "餸󠄁",
	"驣": "驣󠄁",
	"黙": "黙󠄂",
	"𡩴": "𡩴󠄁",
	"𥖄": "𥖄󠄁",
	"𦏹": "𦏹󠄁",
	"𦐐": "𦐐󠄁",
	"𦐹": "𦐹󠄁",
	"𦒉": "𦒉󠄃",
	"𧝁": "𧝁󠄁",
	"𬽺": "𬽺󠄁",
};