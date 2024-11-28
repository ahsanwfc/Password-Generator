import React, { useCallback, useEffect, useRef, useState } from "react";

const PasswordGenerator = () => {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [symbol, setSymbol] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const handlePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMONQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) {
      str += "123456789";
    }
    if (symbol) {
      str += "!@#$%^&*(){}[]";
    }
    for (let index = 0; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, number, symbol]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    handlePassword();
  }, [length, number, symbol]);
  return (
    <div className="container">
      <div className="w-[400px] max-h-[500px] bg-white rounded text-black py-5 px-4">
        <div className="font-semibold text-xl mb-2">
          <h1>Password Generator</h1>
        </div>
        <div className="relative">
          <input
            className="w-full py-2 px-3 bg-gray-200 rounded-full border border-gray-500 outline-none"
            placeholder="Password"
            type="text"
            value={password}
            ref={passwordRef}
            readOnly
          />
          <button
            onClick={copyToClipboard}
            className="py-2 px-4 absolute top-0 right-0 transition ease-in-out delay-150 bg-blue-500 rounded-full border text-white hover:bg-cyan-500 duration-300"
          >
            Copy
          </button>
        </div>
        <div className="flex items-center justify-between my-4">
          <div className="text-sm">Password length (4 - 20)</div>
          <div className="flex items-center gap-2">
            <input
              onChange={(e) => setLength(e.target.value)}
              min="4"
              max="20"
              type="range"
              id="rangeValue"
              value={length}
            />
            <label htmlFor="rangeValue">{length}</label>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="numberCheckbox" className="text-sm">
            Include Numbers
          </label>
          <input
            type="checkbox"
            id="numberCheckbox"
            onClick={() => setNumber((prev) => !prev)}
            value={number}
          />
        </div>
        <div className="flex items-center justify-between my-4">
          <label htmlFor="symbolCheckbox" className="text-sm">
            Include Symbols
          </label>
          <input
            type="checkbox"
            id="symbolCheckbox"
            onClick={() => setSymbol((prev) => !prev)}
            value={symbol}
          />
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
