import { useState, useEffect, useRef } from 'react';
import './CountrySearch.css';

const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo (Brazzaville)",
    "Congo (Kinshasa)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czechia",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
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
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
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
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
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
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
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
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe"
];

const DEFAULT_DEBOUNCE_DURATION = 1000; // ms

const CountrySearch = () => {
    const [query, setQuery] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [debounceDuration, setDebounceDuration] = useState(DEFAULT_DEBOUNCE_DURATION);
    const [debounceDurationInput, setDebounceDurationInput] = useState(DEFAULT_DEBOUNCE_DURATION);

    const [triggerDuration, setTriggerDuration] = useState(DEFAULT_DEBOUNCE_DURATION);

    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

    const demonstrationIntervalTimerRef = useRef(null);

    // Debounce the search query
    useEffect(() => {
        if (selectedCountry !== '' && query === selectedCountry) {
            return;
        }

        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, debounceDuration);

        setTriggerDuration(debounceDuration);

        if (query.trim() !== '') {
            demonstrationIntervalTimerRef.current = setInterval(() => {
                setTriggerDuration(prev => prev - 1000);
            }, 1000);
        }

        return () => {
            clearTimeout(timer);


            clearInterval(demonstrationIntervalTimerRef.current);

        }
    }, [query, debounceDuration]);

    // Filter countries based on debounced query
    useEffect(() => {
        if (debouncedQuery.trim() === '') {
            setFilteredCountries([]);
            setIsOpen(false);
        } else {
            const filtered = countries
                .filter(country => country.toLowerCase().includes(debouncedQuery.toLowerCase()));

            setFilteredCountries(filtered);
            setIsOpen(filtered.length > 0);
            setSelectedIndex(-1);

            clearInterval(demonstrationIntervalTimerRef.current);
            setTriggerDuration(DEFAULT_DEBOUNCE_DURATION);
        }
    }, [debouncedQuery]);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleCountrySelect = (country) => {
        setQuery(country);
        setSelectedCountry(country);
        setIsOpen(false);
        inputRef.current?.focus();
    };

    const handleKeyDown = (e) => {
        if (!isOpen) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev < filteredCountries.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && filteredCountries[selectedIndex]) {
                    handleCountrySelect(filteredCountries[selectedIndex]);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                setSelectedIndex(-1);
                break;
            default:
                break;
        }
    };

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsOpen(false);
            setSelectedIndex(-1);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const highlightMatch = (text, query) => {
        if (!query) return text;

        const regex = new RegExp(`(${query})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, index) =>
            regex.test(part) ? (
                <span key={index} className="highlight">{part}</span>
            ) : (
                part
            )
        );
    };

    const handleDebounceChange = (e) => {
        setDebounceDurationInput(e.target.value);
    };

    const handleDebounceSet = () => {
        setDebounceDuration(debounceDurationInput);
        setTriggerDuration(debounceDurationInput);
    };

    // computing the step for demonstration purpose
    const step = getStep(query, debouncedQuery, filteredCountries, selectedCountry);


    return (
        <div className="country-search">
            <div className="country-search-container">
                <div className="debounce-exp">

                    <p>Experiment by changing the debounce duration to see how long we wait until the suggestions are displayed</p>
                    <label className="debounce-label" htmlFor="debounce-duration">Debounce duration (ms)</label>
                    <input className="duration-input" id="debounce-duration" type="number" min="100" max="10000" value={debounceDurationInput} onChange={handleDebounceChange} />
                    <button className="set-duration" onClick={handleDebounceSet}>Set</button>
                </div>
                <div className="search-feature">
                    <div className="search-header">
                        <h2>Country: {selectedCountry}</h2>
                        <p>Search for a country with typeahead suggestions (with a debounce of <b>{debounceDuration} ms</b> )</p>

                        <details>
                            <summary>Click here to understand more about how "debouncing" works</summary>
                            <div className="more-details">
                                <p className="instruction">Set a huge value for debounce duration like 9000 ms to better understand this demonstration.</p>
                                <p>Query: <b>{query}</b></p>
                                <p>Debounced query: <b>{debouncedQuery}</b> </p>
                                <p>(The above debounced query is the actual search string which is used for search filtering)</p>
                                <div className="demonstration-step">
                                    {<div className={step === 'step1' ? 'active' : 'inactive'}>
                                        <p>Step 1</p>
                                        <p>No input yet</p>
                                    </div>}
                                    <div className={step === 'step2' ? 'active' : 'inactive'}>
                                        <p>Step 2</p>
                                        <p>Waiting for debounce to settle. Search will be triggered in <b>{step === 'step2' ? triggerDuration : '0'}</b> ms.</p>
                                        <p>Note that any input change during this will reset the debounce wait duration.</p>
                                    </div>
                                    <div className={step === 'step3' ? 'active' : 'inactive'}>
                                        <p>Step 3</p>
                                        <p>Debounce settled. Search triggered & complete (no API call involved). Results displayed.</p>

                                    </div>
                                </div>
                            </div>
                        </details>
                    </div>

                    <div className="search-input-container" ref={dropdownRef}>
                        <div className="search-input-wrapper">
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Search countries (e.g., India, South Africa, ...)"
                                className="search-input"
                                autoComplete="off"
                            />
                            <div className="search-icon">🔍</div>
                        </div>

                        {isOpen && (
                            <div className="dropdown">
                                <div className="dropdown-header">
                                    <span className="results-count">
                                        {filteredCountries.length} result{filteredCountries.length !== 1 ? 's' : ''}
                                    </span>
                                </div>
                                <ul className="dropdown-list">
                                    {filteredCountries.map((country, index) => (
                                        <li
                                            key={country}
                                            className={`dropdown-item ${index === selectedIndex ? 'selected' : ''}`}
                                            onClick={() => handleCountrySelect(country)}
                                            onMouseEnter={() => setSelectedIndex(index)}
                                        >
                                            <span className="country-name">
                                                {highlightMatch(country, debouncedQuery)}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div >
    );
};

const getStep = (query, debouncedQuery, filteredCountries, selectedCountry) => {
    if (query.trim() === '') {
        return 'step1';
    }
    if (query !== debouncedQuery && query !== selectedCountry) {
        return 'step2';
    }
    if (filteredCountries.length > 0 || query === debouncedQuery) {
        return 'step3';
    }
};

export default CountrySearch;