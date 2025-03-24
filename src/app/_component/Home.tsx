"use client";

import { useState } from "react";

export function Home() {
    const [display, setDisplay] = useState(0);
    const [leftOperand, setLeftOperand] = useState(0);
    const [operator, setOperator] = useState("");
    const [isDecimal, setIsDecimal] = useState(false);
    const [hasClickedOperator, setHasClickedOperator] = useState(false);
    const [equation, setEquation] = useState("");

    const handleNumberClick = (num: number) => {
        if (hasClickedOperator) {
            setDisplay(num);
            setHasClickedOperator(false);
            setEquation(equation + num);
        } else if (display === 0 || equation.endsWith("=")) {
            setDisplay(num);
            setEquation("" + num);
        } else if (isDecimal) {
            setDisplay(parseFloat(display + "." + num));
            setEquation(equation + "." + num);
            setIsDecimal(false);
        } else {
            setDisplay(parseFloat(display + "" + num));
            setEquation(equation + num);
        }
    };

    const handleBackspace = () => {
        setDisplay((prev) => Math.floor(prev / 10));
        setIsDecimal(false);
    };

    const clearDisplay = () => {
        setDisplay(0);
        setLeftOperand(0);
        setOperator("");
        setIsDecimal(false);
        setEquation("");
    };
 
    const handleOperator = (newOperator: string) => {
        let result = display;
    
        // If there's already an operator, perform the calculation first
        if (operator && !hasClickedOperator) {
            switch (operator) {
                case "+":
                    result = leftOperand + display;
                    break;
                case "-":
                    result = leftOperand - display;
                    break;
                case "*":
                    result = leftOperand * display;
                    break;
                case "/":
                    result = leftOperand / display;
                    break;
                default:
                    break;
            }
            setDisplay(result);
        }
    
        setLeftOperand(result);  // Store result for next operation
        setOperator(newOperator);
        setHasClickedOperator(true);
    
        // Prevent duplicate operators
        if (equation.endsWith(" + ") || equation.endsWith(" - ") || equation.endsWith(" * ") || equation.endsWith(" / ")) {
            setEquation(equation.slice(0, -3) + " " + newOperator + " ");
        } else if (equation.endsWith("=")) {
            setEquation(result + " " + newOperator + " ");
        } else {
            setEquation(equation + " " + newOperator + " ");
        }
    };
    
    const handleEquals = () => {
        if (!operator || hasClickedOperator) {
            setEquation(equation.slice(0, -3)); // Remove trailing operator before evaluation
            return;
        }
    
        let result = 0;
        switch (operator) {
            case "+":
                result = leftOperand + display;
                break;
            case "-":
                result = leftOperand - display;
                break;
            case "*":
                result = leftOperand * display;
                break;
            case "/":
                result = leftOperand / display;
                break;
            default:
                return;
        }
    
        setDisplay(result);
        setEquation(result.toString()); // Show only final result
        setLeftOperand(result);
        setOperator("");
        setHasClickedOperator(false);
    };
    
    

    const handlePercent = () => {
    const result = display / 100;
    setDisplay(result);
    setEquation(result.toString());
    };

    const handleDecimal = () => {
        if (!String(display).includes(".")) {
            setIsDecimal(true);
        }
    };

    const toggleSign = () => {
        setDisplay(-display);
        setIsDecimal(false);
    };

    return (
        <>
            <div className="calculator w-full max-w-xs mx-auto p-4 bg-gray-200 rounded-lg">
                <div className="display bg-black text-white text-right py-4 px-2 rounded-lg mb-4">
                    <div className="text-gray-400 text-sm mb-1">{equation}</div>
                    <input
                        type="text"
                        className="w-full text-2xl bg-transparent text-right focus:outline-none"
                        value={display}
                        readOnly
                    />
                </div>

                <div className="buttons grid grid-cols-4 gap-2">
                    {/* Row 1 */}
                    <input
                        type="button"
                        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4  border-b-4 border-blue-700 hover:border-blue-500 rounded 
                                    active:scale-90 transition duration-150 ease-in-out"
                        value="C"
                        onClick={clearDisplay}
                    />

                    <input
                        type="button"
                        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4  border-b-4 border-blue-700 hover:border-blue-500 rounded 
                                    active:scale-90 transition duration-150 ease-in-out"
                        value="%"
                        onClick={handlePercent}
                    />
                    <input
                        type="button"
                        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4  border-b-4 border-blue-700 hover:border-blue-500 rounded 
                                    active:scale-90 transition duration-150 ease-in-out"
                        value="⌫"
                        onClick={handleBackspace}
                    />
                    <input
                        type="button"
                        style={operator === '/' ? { borderTop: '4px solid var(--color-blue-700)', borderBottom: '0px' } : {}}
                        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                        value="/"
                        onClick={() => handleOperator("/")}
                    />

                    {/* Row 2 */}
                    <input
                        type="button"
                        className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 border-b-0 border-gray-500 rounded"
                        value="7"
                        onClick={() => handleNumberClick(7)}
                    />
                    <input
                        type="button"
                        className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 border-b-0 border-gray-500 rounded"
                        value="8"
                        onClick={() => handleNumberClick(8)}
                    />
                    <input
                        type="button"
                        className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 border-b-0 border-gray-500 rounded"
                        value="9"
                        onClick={() => handleNumberClick(9)}
                    />
                    <input
                        type="button"
                        style={operator === '*' ? { borderTop: '4px solid var(--color-blue-700)', borderBottom: '0px' } : {}}
                        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                        value="*"
                        onClick={() => handleOperator("*")}
                    />


                    {/* Row 3 */}
                    <input
                        type="button"
                        className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 border-b-0 border-gray-500 rounded"
                        value="4"
                        onClick={() => handleNumberClick(4)}
                    />
                    <input
                        type="button"
                        className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 border-b-0 border-gray-500 rounded"
                        value="5"
                        onClick={() => handleNumberClick(5)}
                    />
                    <input
                        type="button"
                        className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 border-b-0 border-gray-500 rounded"
                        value="6"
                        onClick={() => handleNumberClick(6)}
                    />
                    <input
                        type="button"
                        style={operator === '-' ? { borderTop: '4px solid var(--color-blue-700)', borderBottom: '0px' } : {}}
                        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                        value="-"
                        onClick={() => handleOperator("-")}
                    />

                    {/* Row 4 */}
                    <input
                        type="button"
                        className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 border-b-0 border-gray-500 rounded"
                        value="1"
                        onClick={() => handleNumberClick(1)}
                    />
                    <input
                        type="button"
                        className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 border-b-0 border-gray-500 rounded"
                        value="2"
                        onClick={() => handleNumberClick(2)}
                    />
                    <input
                        type="button"
                        className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 border-b-0 border-gray-500 rounded"
                        value="3"
                        onClick={() => handleNumberClick(3)}
                    />
                    <input
                        type="button"
                        style={operator === '+' ? { borderTop: '4px solid var(--color-blue-700)', borderBottom: '0px' } : {}}
                        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                        value="+"
                        onClick={() => handleOperator("+")}
                    />

                    {/* Row 5 */}
                    <input
                        type="button"
                        className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 border-b-0 border-gray-500 rounded 
                                   active:scale-90 transition duration-150 ease-in-out"
                        value="+/-"
                        onClick={toggleSign}
                    />
                    <input
                        type="button"
                        className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 border-b-0 border-gray-500 rounded"
                        value="0"
                        onClick={() => handleNumberClick(0)}
                    />
                    <input
                        type="button"
                        className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 border-b-0 border-gray-500 rounded 
                                    active:scale-90 transition duration-150 ease-in-out"
                        value="."
                        onClick={handleDecimal}
                    />
                    <input
                        type="button"
                        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4  border-b-4 border-blue-700 hover:border-blue-500 rounded 
                                    active:scale-90 transition duration-150 ease-in-out"
                        value="="
                        onClick={handleEquals}
                    />
                </div>
            </div>
        </>
    );
}
