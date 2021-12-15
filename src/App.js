import './App.css';
import {useState} from "react";

function App() {
    const [str, setStr] = useState("");
    const [formatter, setFormatter] = useState("");
    const [formattedStr, setFormattedStr] = useState("");

    let parseFormatter = (formatterStr) => {
        let regexArray = formatterStr.match("{[^{}]+}");
        let objStr, args;
        if (regexArray) {
            objStr = regexArray[0].replaceAll(RegExp("[{}]", "g"), "")
            formatterStr = formatterStr.replace(objStr, "");
        }
        args = formatterStr.split(",").map(i => i.trim());
        if (objStr) {
            args[args.indexOf("{}")] = Object.fromEntries(objStr.split(',').map(i => i.split(':').map(j => j.trim())))
        }

        return args;
    }

    let formatStr = (str, formatter) => {
        let parsedFormatter = parseFormatter(formatter)
        setFormattedStr(format(str, ...parsedFormatter));
    }

    let format = (format_string, ...args) => {
        let index = 0;
        return format_string.replace(/{(\w*)}/g, function (match, key) {
            if (key === '') {
                key = index;
                index++
            }

            let int_key = parseInt(key, 10)
            if (int_key >= 0) {
                return args[key] !== undefined ?
                    args[key] :
                    match;
            } else {
                for (let i = 0; i < args.length; i++) {
                    if (typeof args[i] === 'object' && typeof args[i][key] !== undefined) {
                        return args[i][key];
                    }
                }
                return match;
            }
        });
    }

    return (
        <div className="app">
            <div className="inputs">
                <div className="mt-6 flex space-x-4 m-10 justify-center">
                    <div>
                        <label htmlFor="string" className="text_input_label">
                            String
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <textarea
                                name="string"
                                id="string"
                                className="text_input"
                                placeholder="{1} {a} {0}"
                                onChange={(e) => {
                                    setStr(e.target.value);
                                    formatStr(e.target.value, formatter);
                                }}
                                onKeyDown={(e) => {
                                    if (e.code === "Enter") {
                                        e.preventDefault();
                                        formatStr(str, formatter);
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="formatter" className="text_input_label">
                            Formatter
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <textarea
                                name="formatter"
                                id="formatter"
                                className="text_input"
                                placeholder="Bonjour, 3.1, {a: 10}"
                                onChange={(e) => {
                                    setFormatter(e.target.value);
                                    formatStr(str, e.target.value);
                                }}
                                onKeyDown={(e) => {
                                    if (e.code === "Enter") {
                                        e.preventDefault();
                                        formatStr(str, formatter);
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="result">
                <h2>format({str}, {formatter}):</h2>
                <h1 className="text-purple-500">{formattedStr}</h1>
            </div>
        </div>
    );
}

export default App;
