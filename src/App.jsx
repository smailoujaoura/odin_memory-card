import { useState, useEffect } from 'react'
import Nav from "./components/Nav"
import Cards from "./components/Cards"
import Slider from '@mui/material/Slider';
import clsx from 'clsx';

// this api is trash missing key countries like south korea
const COUNTRIES_NAMES_FLAGS_API = "https://countriesnow.space/api/v0.1/countries/flag/images"
// I don't see the need for using it as it only supplies with a static array of country names and flag urls from wikimedia; the only reason is to learn using fetch inside useeffect; that's all..e.

// ARRAY ONE: Well-known countries (major global presence, economy, culture, or population)
const wellKnownCountries = [
  "Afghanistan", "Argentina", "Australia", "Austria", "Bangladesh", "Belgium",
  "Brazil", "Canada", "Chile", "China", "Colombia", "Cuba", "Czech Republic",
  "Denmark", "Egypt", "Finland", "France", "Germany", "Greece", "Hong Kong",
  "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
  "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kenya", "Malaysia",
  "Mexico", "Morocco", "Netherlands", "New Zealand", "Nigeria", "Norway",
  "Pakistan", "Peru", "Philippines", "Poland", "Portugal", "Russia",
  "Saudi Arabia", "Singapore", "South Africa", "Spain", "Sweden", "Switzerland",
  "Syria", "Taiwan", "Thailand", "Turkey", "Ukraine", "United Arab Emirates",
  "United Kingdom", "United States", "Venezuela", "Vietnam"
];

// ARRAY TWO: Less known countries (regional significance, smaller nations)
const lessKnownCountries = [
  "Albania", "Algeria", "Andorra", "Angola", "Armenia", "Azerbaijan",
  "Bahamas", "Bahrain", "Barbados", "Belarus", "Belize", "Benin", "Bhutan",
  "Bosnia and Herzegovina", "Botswana", "Brunei", "Bulgaria", "Burkina Faso",
  "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Central African Republic",
  "Chad", "Comoros", "Congo", "Costa Rica", "Croatia", "Cyprus", "Djibouti",
  "Dominica", "Dominican Republic", "Ecuador", "El Salvador", "Equatorial Guinea",
  "Eritrea", "Estonia", "Ethiopia", "Fiji", "Gabon", "Gambia", "Georgia",
  "Ghana", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti",
  "Honduras", "Kazakhstan", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon",
  "Lesotho", "Liberia", "Liechtenstein", "Lithuania", "Luxembourg", "Macau",
  "Madagascar", "Malawi", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius",
  "Moldova", "Monaco", "Mongolia", "Montenegro", "Mozambique", "Myanmar",
  "Namibia", "Nepal", "Nicaragua", "Niger", "Oman", "Panama", "Papua New Guinea",
  "Paraguay", "Qatar", "Romania", "Rwanda", "Saint Lucia", "Samoa", "San Marino",
  "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Slovakia", "Slovenia",
  "Somalia", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Tajikistan",
  "Tanzania", "Timor-Leste", "Togo", "Trinidad and Tobago", "Tunisia",
  "Turkmenistan", "Uganda", "Uruguay", "Uzbekistan", "Vanuatu", "Vietnam",
  "Yemen", "Zambia", "Zimbabwe"
];

// ARRAY THREE: Not known countries (territories, dependencies, very small nations)
const notKnownCountries = [
  "Anguilla", "Antigua and Barbuda", "Aruba", "Bermuda",
  "Bouvet Island", "British Indian Ocean Territory", "Cayman Islands",
  "Christmas Island", "Cocos (Keeling) Islands", "Cook Islands",
  "Falkland Islands", "Faroe Islands", "French Polynesia", "Gibraltar",
  "Greenland", "Guadeloupe", "Guam", "Guernsey", "Heard Island and McDonald Islands",
  "Vatican City State (Holy See)", "Isle of Man", "Jersey", "Kiribati",
  "Marshall Islands", "Martinique", "Mayotte", "Montserrat",
  "Nauru", "New Caledonia", "Niue", "Norfolk Island",
  "Northern Mariana Islands", "Palau", "Pitcairn", "Puerto Rico",
  "Réunion", "Saint Kitts and Nevis", "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines", "Sao Tome and Principe",
  "Solomon Islands", "South Georgia and the South Sandwich Islands",
  "Tokelau", "Tonga", "Turks and Caicos Islands", "Tuvalu",
  "United States Minor Outlying Islands", "Wallis and Futuna"
];

function App() {
  // this does not need a state if it were readily passed but in here it needs for rerending upon countries being ready
  const [countries, setCountries] = useState([]);
  const [currScore, setCurrScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [usedCards, setUsedCards] = useState(new Set())
  const [number, setNumber] = useState(20);
  const [level, setLevel] = useState(true); // should probably have more descriptive names for such: 'normal' 'difficult'

  const onSliderMove = (event, newNumber) => {
    setNumber(newNumber)
  }

  useEffect(() => {
    let ignore = false;
    async function getCountries() {
      try {
        const resu = await fetch(COUNTRIES_NAMES_FLAGS_API);
        const data = await resu.json();
        if (!ignore) {
          const countriesPool = level ? wellKnownCountries : lessKnownCountries;
          const polishedCountries = data.data
            .filter(item => countriesPool.includes(item.name))
            .sort(() => Math.random() - 0.5)
            .slice(0, number)
          setCountries([...polishedCountries]);
        }
      } catch (err) {
        console.log("error fetching and jsonification of countries names and flags");
      }
    }
    getCountries();
    return () => {
      ignore = true
    };
  }, [number, level])

  function onScore(scored) {
    if (scored) {
      if (currScore === bestScore) {
        // case 2 scored and broke record
        setBestScore(currScore + 1);
      }
      // case 1 just scored
      setCurrScore(currScore + 1);
    } else {
      // case 3 did not score by clicking a losing("already used") card
      setCurrScore(0);
      setUsedCards(new Set());
    }
  }

  function onCardClick(name) {
    if (usedCards.has(name)) {
      console.log("twice");
      onScore(false);
    } else {
      console.log("once");
      const updatedUsedCards = new Set([...usedCards, name]);
      setUsedCards(updatedUsedCards);
      onScore(true);
    }
  }

  function handleLevel(newLevel) {
    if (newLevel !== level) {
      setLevel(newLevel);
    }
  }

  return (
    <>
      <Nav 
        current={currScore}
        best={bestScore}
      />
      <div className='px-40 py-2'>
        <h2>Number of cards</h2>
        <Slider
          value={number}
          onChange={onSliderMove}
          min={4}
          max={62}
          valueLabelDisplay="auto"
          step={1}
          marks
        />
        <h2>Levels</h2>
        <div className="flex gap-4 justify-center items-center">
          <button onClick={() => {handleLevel(true)}} className={clsx("text-white bg-amber-700 rounded-2xl px-8 py-2 font-bold", level && "border-6 border-blue-500")}>Normal</button>
          <button onClick={() => {handleLevel(false)}} className={clsx("text-white bg-amber-700 rounded-2xl px-8 py-2 font-bold", !level && "border-6 border-blue-500")}>Difficult</button>
        </div>
      </div>
      <Cards
        countries={countries}
        onCardClick={onCardClick}
    />
    </>
  )
}

export default App
