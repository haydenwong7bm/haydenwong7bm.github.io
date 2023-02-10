const J = 'j';
const K = 'k';
const T = 't';

function convert() {
	var supp_option = document.querySelector('input[name="supp"]:checked').value;
	
	var use_inherited = document.getElementById('i').checked;
	
	var comp_options = "";
	
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
		
	document.getElementById('output').value = converted;
	}
}

function copy() {
	navigator.clipboard.writeText(document.getElementById('output').value)
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
	"虜": ["虜", "j"],
	"晴": ["晴", "j"],
	"猪": ["猪", "j"],
	"益": ["益", "j"],
	"礼": ["礼", "j"],
	"神": ["神", "j"],
	"祥": ["祥", "j"],
	"福": ["福", "j"],
	"靖": ["靖", "j"],
	"精": ["精", "j"],
	"羽": ["羽", "j"],
	"諸": ["諸", "j"],
	"都": ["都", "j"],
	"飯": ["飯", "j"],
	"飼": ["飼", "j"],
	"館": ["館", "j"],
	"侮": ["侮", "j"],
	"僧": ["僧", "j"],
	"喝": ["喝", "j"],
	"嘆": ["嘆", "j"],
	"器": ["器", "j"],
	"塀": ["塀", "j"],
	"層": ["層", "j"],
	"悔": ["悔", "j"],
	"慨": ["慨", "j"],
	"憎": ["憎", "j"],
	"懲": ["懲", "j"],
	"敏": ["敏", "j"],
	"既": ["既", "j"],
	"旣": ["既", "j"],
	"暑": ["暑", "j"],
	"梅": ["梅", "j"],
	"海": ["海", "j"],
	"渚": ["渚", "j"],
	"漢": ["漢", "j"],
	"煮": ["煮", "j"],
	"琢": ["琢", "j"],
	"社": ["社", "j"],
	"祉": ["祉", "j"],
	"祈": ["祈", "j"],
	"祐": ["祐", "j"],
	"祖": ["祖", "j"],
	"祝": ["祝", "j"],
	"禍": ["禍", "j"],
	"禎": ["禎", "j"],
	"穀": ["穀", "j"],
	"突": ["突", "j"],
	"節": ["節", "j"],
	"練": ["練", "j"],
	"繁": ["繁", "j"],
	"署": ["署", "j"],
	"者": ["者", "j"],
	"臭": ["臭", "j"],
	"著": ["著", "j"],
	"褐": ["褐", "j"],
	"視": ["視", "j"],
	"謁": ["謁", "j"],
	"謹": ["謹", "j"],
	"賓": ["賓", "j"],
	"贈": ["贈", "j"],
	"逸": ["逸", "j"],
	"難": ["難", "j"],
	"響": ["響", "j"],
	"廊": ["廊", "jk"],
	"朗": ["朗", "jk"],
	"類": ["類", "jk"],
};

K_TABLE = {
	"廊": ["廊", "jk"],
	"朗": ["朗", "jk"],
	"類": ["類", "jk"],
	"滑": ["滑", "k"],
	"龜": ["龜", "k"],
	"懶": ["懶", "k"],
	"癩": ["癩", "k"],
	"羅": ["羅", "k"],
	"蘿": ["蘿", "k"],
	"螺": ["螺", "k"],
	"裸": ["裸", "k"],
	"邏": ["邏", "k"],
	"樂": ["樂", "k"],
	"烙": ["烙", "k"],
	"亂": ["亂", "k"],
	"爛": ["爛", "k"],
	"鸞": ["鸞", "k"],
	"襤": ["襤", "k"],
	"拉": ["拉", "k"],
	"臘": ["臘", "k"],
	"浪": ["浪", "k"],
	"狼": ["狼", "k"],
	"郞": ["郎", "k"],
	"冷": ["冷", "k"],
	"勞": ["勞", "k"],
	"爐": ["爐", "k"],
	"老": ["老", "k"],
	"露": ["露", "k"],
	"碌": ["碌", "k"],
	"祿": ["祿", "k"],
	"綠": ["綠", "k"],
	"菉": ["菉", "k"],
	"錄": ["錄", "k"],
	"鹿": ["鹿", "k"],
	"論": ["論", "k"],
	"壟": ["壟", "k"],
	"籠": ["籠", "k"],
	"聾": ["聾", "k"],
	"牢": ["牢", "k"],
	"雷": ["雷", "k"],
	"屢": ["屢", "k"],
	"樓": ["樓", "k"],
	"淚": ["淚", "k"],
	"漏": ["漏", "k"],
	"累": ["累", "k"],
	"縷": ["縷", "k"],
	"陋": ["陋", "k"],
	"肋": ["肋", "k"],
	"凌": ["凌", "k"],
	"稜": ["稜", "k"],
	"綾": ["綾", "k"],
	"菱": ["菱", "k"],
	"陵": ["陵", "k"],
	"讀": ["讀", "k"],
	"拏": ["拏", "k"],
	"諾": ["諾", "k"],
	"怒": ["怒", "k"],
	"率": ["率", "k"],
	"北": ["北", "k"],
	"復": ["復", "k"],
	"數": ["數", "k"],
	"索": ["索", "k"],
	"參": ["參", "k"],
	"塞": ["塞", "k"],
	"說": ["說", "k"],
	"掠": ["掠", "k"],
	"亮": ["亮", "k"],
	"凉": ["凉", "k"],
	"梁": ["梁", "k"],
	"糧": ["糧", "k"],
	"良": ["良", "k"],
	"諒": ["諒", "k"],
	"女": ["女", "k"],
	"廬": ["廬", "k"],
	"旅": ["旅", "k"],
	"驪": ["驪", "k"],
	"麗": ["麗", "k"],
	"轢": ["轢", "k"],
	"憐": ["憐", "k"],
	"戀": ["戀", "k"],
	"撚": ["撚", "k"],
	"漣": ["漣", "k"],
	"煉": ["煉", "k"],
	"璉": ["璉", "k"],
	"練": ["練", "k"],
	"聯": ["聯", "k"],
	"輦": ["輦", "k"],
	"蓮": ["蓮", "k"],
	"連": ["連", "k"],
	"裂": ["裂", "k"],
	"廉": ["廉", "k"],
	"念": ["念", "k"],
	"捻": ["捻", "k"],
	"簾": ["簾", "k"],
	"獵": ["獵", "k"],
	"令": ["令", "k"],
	"囹": ["囹", "k"],
	"寧": ["寧", "k"],
	"嶺": ["嶺", "k"],
	"怜": ["怜", "k"],
	"玲": ["玲", "k"],
	"瑩": ["瑩", "k"],
	"羚": ["羚", "k"],
	"聆": ["聆", "k"],
	"鈴": ["鈴", "k"],
	"零": ["零", "k"],
	"靈": ["靈", "k"],
	"領": ["領", "k"],
	"禮": ["禮", "k"],
	"隷": ["隸", "k"],
	"寮": ["寮", "k"],
	"料": ["料", "k"],
	"樂": ["樂", "k"],
	"燎": ["燎", "k"],
	"療": ["療", "k"],
	"蓼": ["蓼", "k"],
	"遼": ["遼", "k"],
	"龍": ["龍", "k"],
	"柳": ["柳", "k"],
	"流": ["流", "k"],
	"溜": ["溜", "k"],
	"琉": ["琉", "k"],
	"硫": ["硫", "k"],
	"紐": ["紐", "k"],
	"六": ["六", "k"],
	"戮": ["戮", "k"],
	"慄": ["慄", "k"],
	"履": ["履", "k"],
	"李": ["李", "k"],
	"梨": ["梨", "k"],
	"泥": ["泥", "k"],
	"痢": ["痢", "k"],
	"罹": ["罹", "k"],
	"裏": ["裏", "k"],
	"裡": ["裡", "k"],
	"溺": ["溺", "k"],
	"吝": ["吝", "k"],
	"燐": ["燐", "k"],
	"璘": ["璘", "k"],
	"藺": ["藺", "k"],
	"隣": ["隣", "k"],
	"鱗": ["鱗", "k"],
	"麟": ["麟", "k"],
	"立": ["立", "k"],
	"笠": ["笠", "k"],
	"粒": ["粒", "k"],
	"炙": ["炙", "k"],
	"識": ["識", "k"],
	"切": ["切", "k"],
	"度": ["度", "k"],
	"糖": ["糖", "k"],
	"宅": ["宅", "k"],
	"洞": ["洞", "k"],
	"廓": ["廓", "k"],
};

T_TABLE = {
	"丽": ["丽", "t"],
	"備": ["備", "t"],
	"具": ["具", "t"],
	"㒹": ["㒹", "t"],
	"冗": ["冗", "t"],
	"𩇟": ["𩇟", "t"],
	"剆": ["剆", "t"],
	"北": ["北", "t"],
	"善": ["善", "t"],
	"喳": ["喳", "t"],
	"噴": ["噴", "t"],
	"堲": ["堲", "t"],
	"奢": ["奢", "t"],
	"姬": ["姬", "t"],
	"姘": ["姘", "t"],
	"寘": ["寘", "t"],
	"岍": ["岍", "t"],
	"𡷦": ["𡷦", "t"],
	"嵮": ["嵮", "t"],
	"嵫": ["嵫", "t"],
	"幩": ["幩", "t"],
	"㡢": ["㡢", "t"],
	"庰": ["庰", "t"],
	"廊": ["廊", "t"],
	"𣊸": ["𣊸", "t"],
	"𦇚": ["𦇚", "t"],
	"㣣": ["㣣", "t"],
	"憤": ["憤", "t"],
	"拼": ["拼", "t"],
	"揤": ["揤", "t"],
	"𢯱": ["𢯱", "t"],
	"揅": ["揅", "t"],
	"撝": ["撝", "t"],
	"暑": ["暑", "t"],
	"㬈": ["㬈", "t"],
	"㫤": ["㫤", "t"],
	"朗": ["朗", "t"],
	"望": ["望", "t"],
	"枅": ["枅", "t"],
	"楂": ["楂", "t"],
	"𣢧": ["𣢧", "t"],
	"𣪍": ["𣪍", "t"],
	"𣫺": ["𣫺", "t"],
	"汧": ["汧", "t"],
	"流": ["流", "t"],
	"洴": ["洴", "t"],
	"㴳": ["㴳", "t"],
	"滇": ["滇", "t"],
	"淹": ["淹", "t"],
	"濆": ["濆", "t"],
	"𤉣": ["𤉣", "t"],
	"犕": ["犕", "t"],
	"𤜵": ["𤜵", "t"],
	"瑇": ["瑇", "t"],
	"瑜": ["瑜", "t"],
	"𥁄": ["𥁄", "t"],
	"㿼": ["㿼", "t"],
	"䀈": ["䀈", "t"],
	"直": ["直", "t"],
	"𥃳": ["𥃳", "t"],
	"瞋": ["瞋", "t"],
	"𥐝": ["𥐝", "t"],
	"䃣": ["䃣", "t"],
	"䄯": ["䄯", "t"],
	"穊": ["穊", "t"],
	"穏": ["穏", "t"],
	"𥪧": ["𥪧", "t"],
	"竮": ["竮", "t"],
	"䈂": ["䈂", "t"],
	"䈧": ["䈧", "t"],
	"糒": ["糒", "t"],
	"䊠": ["䊠", "t"],
	"䌁": ["䌁", "t"],
	"縂": ["縂", "t"],
	"𦉇": ["𦉇", "t"],
	"𦌾": ["𦌾", "t"],
	"者": ["者", "t"],
	"聠": ["聠", "t"],
	"育": ["育", "t"],
	"䐋": ["䐋", "t"],
	"𦞧": ["𦞧", "t"],
	"𣎜": ["𣎜", "t"],
	"䑫": ["䑫", "t"],
	"劳": ["劳", "t"],
	"𦬼": ["𦬼", "t"],
	"茝": ["茝", "t"],
	"荣": ["荣", "t"],
	"荓": ["荓", "t"],
	"𦳕": ["𦳕", "t"],
	"䔫": ["䔫", "t"],
	"蓱": ["蓱", "t"],
	"蓳": ["蓳", "t"],
	"𧏊": ["𧏊", "t"],
	"𧃒": ["𧃒", "t"],
	"蚈": ["蚈", "t"],
	"蛢": ["蛢", "t"],
	"蝫": ["蝫", "t"],
	"䗗": ["䗗", "t"],
	"蟡": ["蟡", "t"],
	"蠁": ["蠁", "t"],
	"䗹": ["䗹", "t"],
	"衠": ["衠", "t"],
	"裗": ["裗", "t"],
	"𧥦": ["𧥦", "t"],
	"䚾": ["䚾", "t"],
	"諭": ["諭", "t"],
	"𧲨": ["𧲨", "t"],
	"賁": ["賁", "t"],
	"𧼯": ["𧼯", "t"],
	"趼": ["趼", "t"],
	"跰": ["跰", "t"],
	"郱": ["郱", "t"],
	"𨜮": ["𨜮", "t"],
	"鉼": ["鉼", "t"],
	"䦕": ["䦕", "t"],
	"𨵷": ["𨵷", "t"],
	"雃": ["雃", "t"],
	"𩈚": ["𩈚", "t"],
	"䪲": ["䪲", "t"],
	"頩": ["頩", "t"],
	"䯎": ["䯎", "t"],
	"鱀": ["鱀", "t"],
	"鳽": ["鳽", "t"],
	"鵧": ["鵧", "t"],
	"𪃎": ["𪃎", "t"],
	"𪊑": ["𪊑", "t"],
	"鼖": ["鼖", "t"],
	"𪘀": ["𪘀", "t"],
	"再": ["再", "tc"],
	"冬": ["冬", "tc"],
	"割": ["割", "tc"],
	"勺": ["勺", "tc"],
	"卉": ["卉", "tc"],
	"卿": ["卿", "tc"],
	"周": ["周", "tc"],
	"城": ["城", "tc"],
	"姬": ["姬", "tc"],
	"将": ["将", "tc"],
	"屠": ["屠", "tc"],
	"彫": ["彫", "tc"],
	"慈": ["慈", "tc"],
	"憲": ["憲", "tc"],
	"成": ["成", "tc"],
	"杓": ["杓", "tc"],
	"桒": ["桒", "tc"],
	"栟": ["栟", "tc"],
	"櫛": ["櫛", "tc"],
	"浩": ["浩", "tc"],
	"滋": ["滋", "tc"],
	"爵": ["爵", "tc"],
	"絣": ["絣", "tc"],
	"芽": ["芽", "tc"],
	"諭": ["諭", "tc"],
	"輸": ["輸", "tc"],
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