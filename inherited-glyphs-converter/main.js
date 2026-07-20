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

const varTargets = {J: jTable, K: kTable, T: tTable};

let isTableLoaded = false;

// Helper function to explicitly strip variation selectors from any string
function stripVariationSelectors(str) {
  let result = str;
  for (let ord = 0xfe00; ord <= 0xfe0f; ord++) {
    result = result.replaceAll(String.fromCodePoint(ord), '');
  }
  for (let ord = 0xe0100; ord <= 0xe01ef; ord++) {
    result = result.replaceAll(String.fromCodePoint(ord), '');
  }
  return result;
}

async function loadTable() {
  const variant_url = 'https://raw.githubusercontent.com/haydenwong7bm/inherited-glyphs-converter/main/inheritedglyphs/conversion-tables/variants_list.txt';

  try {
    const response = await fetch(variant_url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    const text = await response.text();
    
    variantTable = {};
    jTable = {};
    kTable = {};
    tTable = {};
    
    varTargets[J] = jTable;
    varTargets[K] = kTable;
    varTargets[T] = tTable;
    
    text.split('\n').forEach(line => {
      if (line.trim()) {
        const [key, valueStr] = line.trim().split(/\t(.*)/);
        
        if (key && valueStr) {
          const valueTuple = valueStr.split('\t').map(item => item.trim()).filter(item => item);
		  
          const regex = /[jkt]/g;
		  
          if (valueTuple.length > 1) {
            if (regex.test(valueTuple[1])) {
              for (const flag of [J, K, T]) {
                if (valueTuple[1].includes(flag)){
                  let valueTuple_ = [...valueTuple];
                  valueTuple_[1] = valueTuple_[1].replace(regex, "");
                  
                  if (valueTuple_[1].length === 0) {
                    valueTuple_.splice(1, 1);
                  }
				  
                  varTargets[flag][key] = valueTuple_;
                }
              }
            }
          } else {
            variantTable[key] = valueTuple;
          }
        }
      }
    });
  } catch (error) {
    console.error("Failed to load the variant table:", error);
  }
  
  const parsedADTable = {};
  const parsedMSTable = {};
  
  const ivsConfigs = [
    {
      url: 'https://raw.githubusercontent.com/haydenwong7bm/inherited-glyphs-converter/main/inheritedglyphs/conversion-tables/ivs-adobe-japan1.txt',
      targetMap: parsedADTable
    },
    {
      url: 'https://raw.githubusercontent.com/haydenwong7bm/inherited-glyphs-converter/main/inheritedglyphs/conversion-tables/ivs-mscs.txt',
      targetMap: parsedMSTable
    }
  ];

  for (const config of ivsConfigs) {
    try {
      const response = await fetch(config.url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const text = await response.text();
      
      text.split('\n').forEach(line => {
        const [key, value0] = line.split('\t');
          
        if (key && value0) {
          // CRITICAL FIX: Ensure the lookup key is stripped of any variation selectors 
          // that might exist in the data file so it perfectly aligns with your stripped text input.
          const cleanKey = stripVariationSelectors(key.trim());
          config.targetMap[cleanKey] = value0.trim();
        }
      });
      
    } catch (error) {
      console.error(`Failed to load or parse table from ${config.url}:`, error);
    }
  }

  ivsADTable = parsedADTable;
  ivsMSTable = parsedMSTable;
  isTableLoaded = true;
}

function convert() {
    let supp_option = document.querySelector('input[name="supp"]:checked').value;
    let use_not_unifiable = document.getElementById(N).checked;
    let replaced_cache = [];
    let priority = document.querySelector('input[name="priority"]:checked').value;
    
    let comp_order = [];
    for (const opt of [J, K, T]) {
        if (document.getElementById(opt).checked) {
            switch (opt) {
                case J: comp_order.push([J, jTable]); break;
                case K: comp_order.push([K, kTable]); break;
                case T: comp_order.push([T, tTable]); break;
            }
        }
    }
    
    let ivs_order = [];
    for (const opt of [IVS_AD, IVS_MS]) {
        if (document.getElementById(opt).checked) {
            ivs_order.push(opt);
        }
    }
    
    ivs_order = ivs_order.filter(item => item !== priority);
    if (document.getElementById(priority).checked) {
        ivs_order.unshift(priority);
    }
    
    let text_input = document.getElementById('input').value;
    
    text_input = stripVariationSelectors(text_input);
    
    let converted = text_input;
    let chr_cache = [];
    
    const chars = Array.from(text_input);
    
    for (const chr of chars) {
        if (!chr_cache.includes(chr)) {
            let replace = false;
            let temp;
            let value = chr;
            let attr;
            
            temp = variantTable[chr];
            if (temp !== undefined) {
                value = temp[0];
				console.log(value.codePointAt(0));
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
            
            let value_new = value;
            let attr_new = attr;
            let temp_flag = false;
            let char_locale;
            
            for (let table of comp_order) {
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
            
			console.log(temp_flag);
			
            if (!temp_flag) {
                for (let ivs of ivs_order) {
                    let ivsTable;
                    switch (ivs) {
                        case IVS_AD: ivsTable = ivsADTable; break;
                        case IVS_MS: ivsTable = ivsMSTable; break;
                    }
                    
                    temp = ivsTable[value];
					console.log(value, temp);
                    if (temp !== undefined) {
                        value_new = temp;
                        replace = true;
                        break;
                    }
                }
            }
            
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
    
    document.getElementById('input_textarea').innerHTML = htmlContent_input;
    document.getElementById('output_textarea').innerHTML = htmlContent_output;
}

function changeLocale() {
    let text_input = document.getElementById('input').value;
    let text_output = document.getElementById('output').value;
    initTextarea();
    document.getElementById('input').value = text_input;
    document.getElementById('output').value = text_output;
}

function x_post() {
    text_output = document.getElementById('output').value;
    window.open("https://x.com/intent/post?text=" + encodeURIComponent(text_output));
}

async function init() {
  initTextarea();
  await loadTable();
}

init();
