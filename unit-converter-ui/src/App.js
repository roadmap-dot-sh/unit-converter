import {useState} from "react";
import "./App.css";

function App() {
    const [value, setValue] = useState("");
    const [from, setFrom] = useState("m");
    const [to, setTo] = useState("cm");
    const [type, setType] = useState("length");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const units = {
        length: ["mm", "cm", "m", "km", "inch", "ft", "yard", "mile"],
        weight: ["mg", "g", "kg", "oz", "lb"],
        temperature: ["C", "F", "K"]
    };

    // 🎯 format number thông minh
    const formatNumber = (num) => {
        if (num === 0) return "0";
        if (Math.abs(num) < 0.001) return num.toExponential(3);
        if (Math.abs(num) < 1) return num.toFixed(4);
        return num.toFixed(2);
    };

    const handleConvert = async () => {
        setError("");
        setResult(null);

        if (!value) {
            setError("Please enter a value");
            return;
        }

        try {
            const res = await fetch(
                `http://localhost:3333/api/convert?value=${value}&from=${from}&to=${to}&type=${type}`
            );

            if (!res.ok) {
                throw new Error("API error");
            }

            const data = await res.json();

            if (typeof data.result === "number") {
                setResult(data.result);
            } else {
                setError("Invalid response from server");
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong");
        }
    };

    return (
        <div style={{padding: 40}}>
            <h1>🔥 Unit Converter</h1>

            {/* TYPE */}
            <select
                value={type}
                onChange={(e) => {
                    const newType = e.target.value;
                    setType(newType);
                    setFrom(units[newType][0]);
                    setTo(units[newType][1]);
                    setResult(null);
                    setError("");
                }}
            >
                <option value="length">Length</option>
                <option value="weight">Weight</option>
                <option value="temperature">Temperature</option>
            </select>

            <br/><br/>

            {/* VALUE */}
            <input
                type="number"
                placeholder="Enter value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />

            <br/><br/>

            {/* FROM */}
            <select value={from} onChange={(e) => setFrom(e.target.value)}>
                {units[type].map((u) => (
                    <option key={u} value={u}>{u}</option>
                ))}
            </select>

            →

            {/* TO */}
            <select value={to} onChange={(e) => setTo(e.target.value)}>
                {units[type].map((u) => (
                    <option key={u} value={u}>{u}</option>
                ))}
            </select>

            <br/><br/>

            <button onClick={handleConvert} disabled={!value}>
                Convert
            </button>

            <br/><br/>

            {/* ERROR */}
            {error && <p style={{color: "red"}}>{error}</p>}

            {/* RESULT */}
            {typeof result === "number" && (
                <h2>
                    {value} {from} = {formatNumber(result)} {to}
                </h2>
            )}
        </div>
    );
}

export default App;