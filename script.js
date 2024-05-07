function copyText() {
	var text = document.getElementById("a");
	navigator.clipboard.writeText(text.textContent);
}

function rand_text(possible_letters = letters) {
	let text = "";
	let temp = "";
	for (let i = 0; i < Math.floor(Math.random() * 5 + 3); i++) {
		do {
			temp = possible_letters[Math.floor(Math.random() * possible_letters.length)];
		} while (deny_letter.includes(temp));
		text += temp;
	}
	return text;
}

function rgbToHex(r, g, b) {
	let red = parseInt(r).toString(16);
	let green = parseInt(g).toString(16);
	let blue = parseInt(b).toString(16);

	if (red.length === 1) red = "0" + red;
	if (green.length === 1) green = "0" + green;
	if (blue.length === 1) blue = "0" + blue;

	return "#" + red + green + blue;
}

function is_in(str1, str2) {
	for (let i = 0; i < str1.length; i++) {
		if (str2.includes(str1[i])) {
			return true;
		}
	}
	return false;
}

function is_3inrow(str) {
	for (let i = 0; i < str.length - 2; i++) {
		if (case_sens) {
			if (str[i].toUpperCase() == str[i + 1].toUpperCase() && str[i].toUpperCase() == str[i + 2].toUpperCase()) {
				return true;
			}
		} else if (str[i] == str[i + 1] && str[i] == str[i + 2]) {
			return true;
		}
	}
	return false;
}

function sum_of_integers(str) {
	let ans = 0;
	for (let i = 0; i < str.length; i++) {
		if (numbers.includes(str[i])) {
			ans += parseInt(str[i]);
		}
	}
	return ans;
}

function count_email(str) {
	let ans = 0;
	let syms = [];
	let mail = document.getElementById("email").value;
	let char = "";
	mail = mail.substring(0, mail.indexOf("@"));
	if (case_sens) {
		mail = mail.toUpperCase();
	}
	for (let i = 0; i < str.length; i++) {
		char = str[i];
		if (case_sens) {
			char = str[i].toUpperCase();
		}
		if (mail.includes(char)) {
			if (!syms.includes(char)) {
				syms.push(char);
				ans++;
			}
		}
	}
	return ans;
}

function count_words(str) {
	var matches = str.match(/\b\s+\b/g);
	return matches ? matches.length : 0;
}

function product_of_ascii(str) {
	let start = str.indexOf('"');
	let end = str.indexOf('"', start + 1);
	ans = 1;
	for (let i = start + 1; i < end; i++) {
		ans *= str.charCodeAt(i);
	}
	return ans;
}

function sum_of_months(str) {
	let matches = str.match(new RegExp(months.join("|"), "g"));
	if (matches) {
		let ans = 0;
		for (let i of matches) {
			ans += months.indexOf(i) + 1;
		}
		return ans;
	}
	return 0;
}

function sum_of_XX_years(str) {
	let matches = str.match(get_years);
	if (matches) {
		let ans = 0;
		for (let i of matches) {
			ans += parseInt(i);
		}
		return ans;
	}
	return 0;
}

function sum_of_bin(bins) {
	ans = 0;
	bins.forEach((n) => {
		ans += parseInt(n, 2);
	});
	return ans;
}

function replace_all(str1, str2, str3) {
	return str1.replace(new RegExp(str2, "g"), str3);
}

function to_green(id) {
	let el = document.getElementById(id);
	el.animate([{backgroundColor: "rgba(0, 255, 0, 0.33)", borderColor: "green", color: "green"}], {duration: 1000, fill: "forwards"});
	el.style.order = "3";
}

function to_darkgoldenrod(id) {
	let el = document.getElementById(id);
	el.animate([{backgroundColor: "rgba(255, 255, 0, 0.33)", borderColor: "darkgoldenrod", color: "darkgoldenrod"}], {duration: 1000, fill: "forwards"});
	el.style.order = "2";
}

function to_red(id) {
	let el = document.getElementById(id);
	el.animate([{backgroundColor: "rgba(255, 0, 0, 0.33)", borderColor: "red", color: "red"}], {duration: 1000, fill: "forwards"});
	el.style.order = "1";
}

function to_visible(id) {
	document.getElementById(id).animate([{opacity: 1}], {duration: 1000, fill: "forwards"});
}

function show() {
	i++;
	if (i == 9) {
		to_visible("w9");
		to_darkgoldenrod("w9");
		case_sens = true;
		i = 10;
	}
	if (i == 12) {
		rand_letter = letters + letters.toUpperCase();
		rand_letter = rand_letter[Math.floor(Math.random() * rand_letter.length)];
		alert(rand_letter);
	}
	if (i == 18) {
		to_visible("w18");
		to_darkgoldenrod("w18");
		i = 19;
		let a;
		for (let i = 0; i < 3; i++) {
			do {
				a = blockable[Math.floor(Math.random() * blockable.length)];
			} while (deny_letter.includes(a) || a == rand_letter);
			deny_letter.push(a);
		}
		document.getElementById("deny").textContent = `Let's remove 3 random letters from your password. Now you cannot use "${deny_letter[0]}", "${deny_letter[1]}" and "${deny_letter[2]}"`;
	}
	if (i == 21) {
		let a, temp;
		do {
			a = letters[Math.floor(Math.random() * letters.length)].toUpperCase();
			temp = countries.filter((str) => str[0] == a && !deny_letter.some((letter) => str.includes(letter)));
		} while (deny_letter.includes(a.toLowerCase()) || temp.length == 0);
		document.getElementById("country").textContent = `Your password must include a country that starts with the letter "${a}"`;
		countries = countries.filter((str) => str[0] == a && !deny_letter.some((letter) => str.includes(letter)));
		alert(countries);
	}
	to_visible(`w${i}`);
	to_red(`w${i}`);
}

function checkRule(id, condition, flag) {
	if (i > id - 1) {
		if (condition) {
			to_green("w" + id);
			if (i == id && flag) {
				show();
			}
		} else {
			to_red("w" + id);
			flag = false;
		}
	}
	return flag;
}

function checkPassword(event) {
	if (i == 0) {
		show();
	}
	/** @type {string} */
	let text = event.target.value,
		flag = true,
		condition;
	//removing deny letter
	if (i > 17) {
		for (let i = 0; i < 3; i++) {
			text = replace_all(text, deny_letter[i], "");
		}
		event.target.value = text;
	}
	try {
		let contains = text.includes(document.getElementById("email").value);
		if (case_sens) {
			contains = text.toUpperCase().includes(document.getElementById("email").value.toUpperCase());
		}
		let ascii = product_of_ascii(text); //decimal code ;)
		let months_sum = sum_of_months(text);
		let has_country = new RegExp(`${countries.join("|")}`);
		let yearsXX = sum_of_XX_years(text);
		let has_Planguage = new RegExp(`.*(${languages.join("|")}).*`); //P stands for Programming
		let romans = text.match(get_romans);
		let bins = text.match(get_bin);
		if (romans == null) {
			romans = [];
		}
		if (bins == null) {
			bins = [];
		}
		let conditions = [
			is_in(text, letters) && is_in(text, letters.toUpperCase()) && is_in(text, numbers) && is_in(text, special), //1
			text.length > 8, //2
			!is_3inrow(text), //3
			sum_of_integers(text) % w4 == 0, //4
			has_elements.test(text), //5
			has_email.test(text), //6
			!contains, //7
			count_email(text) <= 10, //8
			"to_darkgoldenrod", //9
			text.match(/.*https?:\/\/[A-Za-z0-9_.-]+\.(com|net|edu|org).*/g), //10
			text.match(/.*https:\/\/[A-Za-z0-9_.-]+\.com.*/g), //11
			text.includes(rand_letter), //12
			count_words(text) >= 3, //13
			/.*".*".*/.test(text), //14
			ascii >= 4225 && ascii <= 4900, //15
			has_million.test(text), //16
			[0, 1, 2, 3, 4].some((i) => text.includes(sentences[i])), //17
			"to_darkgoldenrod", //18
			has_month.test(text), //19
			w20 <= months_sum && months_sum <= w20 + 5, //20
			text.match(has_country), //21
			text.match(get_years), //22
			3900 <= yearsXX && yearsXX < 4000, //23
			has_wiki.test(text), //24
			has_greek.test(text), //25
			text.includes(hex), //26
			text.includes(date), //27
			text.match(has_Planguage), //28
			text.charCodeAt(0) > 10000 && text.charCodeAt(1) > 10000 && text.charCodeAt(2) > 10000, //29
			romans.length > 2, //30
			bins.length == 3, //31
			sum_of_bin(bins) == 67, //32 - 10101,11011,10011
			text.includes(w33Character), //34
		];
		for (let i = 0; i < conditions.length; i++) {
			if (conditions[i] == "to_darkgoldenrod") {
				continue;
			}
			flag = checkRule(i + 1, conditions[i], flag);
		}
	} catch (ex) {
		alert(ex + "----- EX");
	}
	if (flag && i > 34) {
		document.getElementById("submit").disabled = false;
	} else {
		document.getElementById("submit").disabled = true;
	}
}

var i = 0;
var case_sens = false;
var rand_letter;
var deny_letter = [];
var countries = [
	"Abkhazia",
	"Afghanistan",
	"Albania",
	"Algeria",
	"American Samoa",
	"Andorra",
	"Angola",
	"Anguilla",
	"Antigua",
	"Argentina",
	"Armenia",
	"Artsakh",
	"Aruba",
	"Australia",
	"Austria",
	"Azerbaijan",
	"Bahrain",
	"Bangladesh",
	"Barbados",
	"Barbuda",
	"Belarus",
	"Belgium",
	"Belize",
	"Benin",
	"Bhutan",
	"Bolivia",
	"Bonaire",
	"Bosnia",
	"Botswana",
	"Brazil",
	"British Virgin Islands",
	"Brunei",
	"Bulgaria",
	"Burkina Faso",
	"Burundi",
	"Cambodia",
	"Cameroon",
	"Canada",
	"Cape Verde",
	"Cayman Islands",
	"Central African Republic",
	"CAR",
	"Chad",
	"Chile",
	"China",
	"Colombia",
	"Comoros",
	"Cook Islands",
	"Costa Rica",
	"Croatia",
	"Cuba",
	"Curacao",
	"Cyprus",
	"Czech Republic",
	"Czechia",
	"Democratic Republic of the Congo",
	"Denmark",
	"Djibouti",
	"Dominica",
	"Dominican Republic",
	"East Timor",
	"Ecuador",
	"Egypt",
	"El Salvador",
	"Equatorial Guinea",
	"Eritrea",
	"Estonia",
	"Eswatini",
	"Ethiopia",
	"Fiji",
	"Finland",
	"France",
	"French Polynesia",
	"Gabon",
	"Georgia",
	"Germany",
	"Ghana",
	"Greece",
	"Greenland",
	"Grenada",
	"Guadeloupe",
	"Guam",
	"Guatemala",
	"Guinea",
	"Guinea-Bissau",
	"Guyana",
	"Haiti",
	"Herzegovina",
	"Honduras",
	"Hungary",
	"Iceland",
	"India",
	"Indonesia",
	"Iran",
	"Iraq",
	"Ireland",
	"Israel",
	"Italy",
	"Ivory Coast",
	"Jamaica",
	"Japan",
	"Jordan",
	"Kazakhstan",
	"Kenya",
	"Kiribati",
	"Kosovo",
	"Kuwait",
	"Kyrgyzstan",
	"Laos",
	"Latvia",
	"Lebanon",
	"Lesotho",
	"Liberia",
	"Libya",
	"Liechtenstein",
	"Lithuania",
	"Luxembourg",
	"Madagascar",
	"Malawi",
	"Malaysia",
	"Maldives",
	"Mali",
	"Malta",
	"Marshall Islands",
	"Martinique",
	"Mauritania",
	"Mauritius",
	"Mexico",
	"Moldova",
	"Monaco",
	"Mongolia",
	"Montenegro",
	"Montserrat",
	"Morocco",
	"Mozambique",
	"Myanmar",
	"Namibia",
	"Nauru",
	"Nepal",
	"Netherlands",
	"New Caledonia",
	"New Zealand",
	"Nicaragua",
	"Niger",
	"Nigeria",
	"Niue",
	"North Korea",
	"North Macedonia",
	"Northern Mariana Islands",
	"Norway",
	"Oman",
	"Pakistan",
	"Palau",
	"Palestine",
	"Panama",
	"Papua New Guinea",
	"Paraguay",
	"Peru",
	"Philippines",
	"Pitcairn Islands",
	"Poland",
	"Portugal",
	"Puerto Rico",
	"Qatar",
	"Republic of the Congo",
	"Congo",
	"Romania",
	"Russia",
	"Rwanda",
	"Saint Kitts",
	"Saint Lucia",
	"Saint Vincent",
	"Samoa",
	"San Marino",
	"Saudi Arabia",
	"Senegal",
	"Serbia",
	"Seychelles",
	"Sierra Leone",
	"Singapore",
	"Slovakia",
	"Slovenia",
	"Solomon Islands",
	"Somalia",
	"Somaliland",
	"South Africa",
	"South Korea",
	"South Ossetia",
	"South Sudan",
	"Spain",
	"Sri Lanka",
	"Sudan",
	"Suriname",
	"Sweden",
	"Switzerland",
	"Syria",
	"Sao Tome",
	"Taiwan",
	"Tajikistan",
	"Tanzania",
	"Thailand",
	"Bahamas",
	"Gambia",
	"Togo",
	"Tokelau",
	"Tonga",
	"Transnistria",
	"Trinidad",
	"Tobago",
	"Tunisia",
	"Turkmenistan",
	"Turks and Caicos",
	"Tuvalu",
	"Turkey",
	"US Virgin Islands",
	"Uganda",
	"Ukraine",
	"United Arab Emirates",
	"United Kingdom",
	"United States",
	"Uruguay",
	"Uzbekistan",
	"Vanuatu",
	"Vatican",
	"Venezuela",
	"Vietnam",
	"Wallis",
	"Futuna",
	"Western Sahara",
	"Yemen",
	"Zambia",
	"Zimbabwe",
	"Micronesia",
];
{
	let date_ = new Date();
	var date = `${date_.getDate().toString().padStart(2, "0")}.${(date_.getMonth() + 1).toString().padStart(2, "0")}.${date_.getFullYear()}`;

	let box = document.getElementById("box");
	let rgbString = box.style.backgroundColor.slice(4, -1);
	let rgbValues = rgbString.split(", ");
	var hex = rgbToHex(rgbValues[0], rgbValues[1], rgbValues[2]);
}

const letters = "abcdefghijklmnopqrstuvwxyz";
const blockable = "jqvxyz";
const for_var = "aeiouthgbnfdpw";
const numbers = "1234567890";
const special = "!@#$%&*_/-()^";
const sentences = ["Jazz box vexed me", "Quick fox eats", "A dog swiftly jumps", "Buzzing bee smiles", "Glowing sun shines"];
const elements = ["H", "Li", "Be", "B", "C", "N", "O", "F", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "K", "Ca", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Rb", "Sr", "Zr", "Nb", "Mo", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I", "Cs", "Ba", "La", "Pr", "Nd", "Pm", "Sm", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", "Lu", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At", "Fr", "Ra", "Ac", "Th", "Pa", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md", "No", "Lr", "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts", "Og"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const languages = ["Perl", "C\\+\\+", "VBA", "PHP", "Python", "Ruby", "COBOL", "JavaScript", "Java", "C", "C#", "SQL", "HTML", "CSS", "R", "Swift", "Kotlin", "Assembly", "Go", "Golang", "Rust", "TypeScript", "Dart"];
const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
const get_romans = new RegExp(`${roman.join("|")}`, "g");
const has_elements = new RegExp(`.*(${elements.join("|")}).*`);
const has_email = /.*[A-Za-z0-9._%+-]@gmail\.com.*/;
const has_link = new RegExp(`.*(https?:\/\/.*\.(com|org|net|edu)).*`);
const has_million = /.*[1-9][0-9]{6}.*/;
const get_years = /19\d\d/g;
const has_month = new RegExp(`.*(${months.join("|")}).*`);
const has_wiki = /en\.wikipedia\.org\/wiki\/.{10,}/;
const has_greek = /.*[ΑαΒβΓγΔδΕεΖζΘθΗηΙιΚκΛλΜμΝνΞξΟοΠπΡρΣσςΤτΥυΦφΧχΨψΩω].*/;
const get_bin = /(0|1){5,}/g;

const w4 = Math.floor(Math.random() * 8 + 2);
document.getElementById("w4span").innerHTML = `Sum of integers in your password must be divisible by<br>$\\frac{${w4 * 2}}{\\sqrt{4}}$`;

const w20 = Math.floor(Math.random() * 6 + 5);
document.getElementById("w20span").textContent = `The sum of the ordinal numbers of your months in the password must be between ${w20} and ${w20 + 5}`;

const w33 = Math.floor(Math.random() * 50000);
document.getElementById("w33span").textContent = `Add the character of the deccimal code = ${w33}`;
const w33Character = String.fromCharCode(w33);

const inputPassword = document.getElementById("password");
inputPassword.addEventListener("input", checkPassword);

alert(hex);
