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

let variantTable = {};
let jTable = {};
let kTable = {};
let tTable = {};
let ivsADTable = {};
let ivsMSTable = {};

const varTargets = {jTable: 'j', kTable: 'k', tTable: 't'};

async function loadTable() {
  const variant_url = 'https://raw.githubusercontent.com/haydenwong7bm/inherited-glyphs-converter/main/inheritedglyphs/conversion-tables/variants_list.txt';

  try {
    const response = await fetch(variant_url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    const text = await response.text();
    
    // Clear old data
    variantTable = {};
    jTable = {};
    kTable = {};
    tTable = {};
    
    text.split('\n').forEach(line => {
      if (line.trim()) {
        const [key, valueStr] = line.split('\t');
        
        if (key && valueStr) {
          // Split the value string by tabs (\t) and clean up extra spaces
          const valueTuple = valueStr.split('\t').map(item => item.trim()).filter(item => item);
          
          const regex = /[jkt]/g
          
		  if (valueTuple.length > 1) {
            if regex.test(valueTuple[1]) {
              for (const flag of ["j", "k", "t"]) {
                if (valueTuple[1].includes(flag)){
				  valueTuple_ = [...valueTuple]
                  valueTuple_[1] = valueTuple_[1].replace(regex, "");
                  
                  if (valueTuple_[1].length === 0) {
                    valueTuple_.splice(1, 1);
                  }
                  
                  varTargets[flag][key] = valueTuple_;
                }
              }
            } else {
              variantTable[key] = valueTuple;
            }
		  }
        }
      }
    });
  } catch (error) {
    console.error("Failed to load the variant table:", error);
  }
  
  //
  
  const ivsADTable = {};
  const ivs_ad_url = 'https://raw.githubusercontent.com/haydenwong7bm/inherited-glyphs-converter/main/inheritedglyphs/conversion-tables/ivs-adobe-japan1.txt';

  try {
    const response = await fetch(ivs_ad_url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const text = await response.text();
    
    text.split('\n').forEach(line => {
      // Ignore empty lines and comment lines (if the file has them, e.g., starting with #)
      if (line.trim() && !line.trim().startsWith('#')) {
        
        // Destructure only the key and value0, ignoring value1/flags entirely
        const [key, value0] = line.split(',');
        
        if (key && value0) {
          ivsADTable[key.trim()] = value0.trim();
        }
      }
    });
	
  } catch (error) {
    console.error("Failed to load or parse the table file:", error);
  }
  
  //
  
  const ivsADTable = {};
  const ivs_ms_url = 'https://raw.githubusercontent.com/haydenwong7bm/inherited-glyphs-converter/main/inheritedglyphs/conversion-tables/ivs-mscs.txt';

  try {
    const response = await fetch(ivs_ms_url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const text = await response.text();
    
    text.split('\n').forEach(line => {
      // Ignore empty lines and comment lines (if the file has them, e.g., starting with #)
      if (line.trim() && !line.trim().startsWith('#')) {
        
        // Destructure only the key and value0, ignoring value1/flags entirely
        const [key, value0] = line.split(',');
        
        if (key && value0) {
          ivsADTable[key.trim()] = value0.trim();
        }
      }
    });
	
  } catch (error) {
    console.error("Failed to load or parse the table file:", error);
  }
}

loadTable();

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
                    comp_order.push([J, jTable]);
                    break;
                case K:
                    comp_order.push([K, kTable]);
                    break;
                case T:
                    comp_order.push([T, tTable]);
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
            
            temp = variantTable[value];
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
                    
                    if (ivs_order.length && attr_new.includes(IVS_COMP_CLASH)) {
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
                            table = ivsADTable;
                            break;
                        case IVS_MS:
                            table = ivsMSTable;
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

function x_post() {
    text_output = document.getElementById('output').value;
    window.open("https://x.com/intent/post?text=" + encodeURIComponent(text_output));
}
