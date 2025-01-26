import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";

const loanCategories = {
  "Wedding Loans": {
    maxLoan: 500000,
    loanPeriod: 3,
    subCategories: ["Valima", "Furniture", "Valima Food", "Jahez"],
  },
  "Home Construction Loans": {
    maxLoan: 1000000,
    loanPeriod: 5,
    subCategories: ["Structure", "Finishing", "Loan"],
  },
  "Business Startup Loans": {
    maxLoan: 1000000,
    loanPeriod: 5,
    subCategories: ["Buy Stall", "Advance Rent for Shop", "Shop Assets", "Shop Machinery"],
  },
  "Education Loans": {
    maxLoan: null,
    loanPeriod: 4,
    subCategories: ["University Fees", "Child Fees Loan"],
  },
};

const LoanCalculator = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPeriod, setLoanPeriod] = useState(3);
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState(""); // success or error
  const [cnic, setCnic] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [showSecondPopup, setShowSecondPopup] = useState(false);

  const user = true; // Set to null to show second popup
  // Loan calculation function
  const calculateLoanPayment = (loanAmount, loanPeriod) => {
    const annualRate = 0.1; // 10% annual interest
    const monthlyRate = annualRate / 12;
    const numberOfPayments = loanPeriod * 12;

    const monthlyPayment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    return monthlyPayment.toFixed(2);
  };

  const handleCalculate = () => {
    const maxLoanAmount = loanCategories[selectedCategory]?.maxLoan;
    const maxLoanPeriod = loanCategories[selectedCategory]?.loanPeriod;

    if (
      loanAmount <= 0 ||
      (maxLoanAmount !== null && loanAmount > maxLoanAmount) ||
      loanPeriod <= 0 ||
      loanPeriod > maxLoanPeriod
    ) {
      setPopupMessage(
        `Invalid input! Loan amount must be within ${maxLoanAmount ? maxLoanAmount + " PKR" : "the required range"
        }, and duration must not exceed ${maxLoanPeriod} years.`
      );

      setPopupType("error");
      setShowPopup(true);
    } else {
      const payment = calculateLoanPayment(loanAmount, loanPeriod);
      setMonthlyPayment(payment);
      setPopupMessage(
        `Loan Calculated: PKR ${loanAmount} with a monthly payment of PKR ${payment} for ${loanPeriod} years.`
      );
      setPopupType("success");
      setShowPopup(true);
    }
  };

  useEffect(() => {
    if (showPopup && popupType === "success") {
      const firstPopupTimer = setTimeout(() => {
        setShowPopup(false);
        setShowSecondPopup(true);
      }, 5000); // First popup closes after 5 seconds

      const secondPopupTimer = setTimeout(() => {
        setShowSecondPopup(false);
        navigate('/navbar');
      }, 12000); // Second popup closes after 12 seconds

      return () => {
        clearTimeout(firstPopupTimer);
        clearTimeout(secondPopupTimer);
      };
    }
  }, [showPopup, popupType]);

  const handleSecondPopupSubmit = () => {
    console.log("User Info:", { cnic, email, name });
    setShowSecondPopup(false);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-8">Loan Application</h1>

      {/* Popup */}
      {showPopup && (
        <div
          className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 p-6 rounded-lg shadow-lg text-center ${popupType === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
        >
          <h2 className="text-xl font-semibold mb-4">
            {popupType === "success" ? "Success" : "Error"}
          </h2>
          <p>{popupMessage}</p>
          {popupType === "success" && (
            <button
              onClick={() => setShowSecondPopup(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4"
            >
              Sign In to Continue
            </button>
          )}
        </div>
      )}

      {/* Second Popup */}
      {!user && showSecondPopup && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 p-6 bg-white rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-4">Enter Your Details</h2>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-2"
          />
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-2"
          />
          <TextField
            label="CNIC"
            variant="outlined"
            value={cnic}
            onChange={(e) => setCnic(e.target.value)}
            className="w-full mb-2"
          />
          <button
            onClick={handleSecondPopupSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4"
          >
            Submit
          </button>
        </div>
      )}


      {/* Loan Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Category */}
        <div className="card p-4 bg-white rounded-lg shadow-lg">
          <label className="block text-lg font-medium mb-2">Select Loan Category</label>
          <select
            className="w-full p-3 border rounded-lg"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {Object.keys(loanCategories).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory */}
        {selectedCategory && (
          <div className="card p-4 bg-white rounded-lg shadow-lg">
            <label className="block text-lg font-medium mb-2">Select Subcategory</label>
            <select
              className="w-full p-3 border rounded-lg"
              value={selectedSubCategory}
              onChange={(e) => setSelectedSubCategory(e.target.value)}
            >
              <option value="">Select Subcategory</option>
              {loanCategories[selectedCategory]?.subCategories.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Loan Amount */}
        {selectedCategory && (
          <div className="card p-4 bg-white rounded-lg shadow-lg">
            <label className="block text-lg font-medium mb-2">
              Loan Amount (Max:{" "}
              {loanCategories[selectedCategory]?.maxLoan
                ? `${loanCategories[selectedCategory]?.maxLoan} PKR`
                : "Based on Requirement"}
              )
            </label>
            <input
              type="number"
              className="w-full p-3 border rounded-lg"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
          </div>
        )}

        {/* Loan Period */}
        {selectedCategory && (
          <div className="card p-4 bg-white rounded-lg shadow-lg">
            <label className="block text-lg font-medium mb-2">Loan Period (Years)</label>
            <input
              type="number"
              className="w-full p-3 border rounded-lg"
              value={loanPeriod}
              onChange={(e) => setLoanPeriod(e.target.value)}
              max={loanCategories[selectedCategory]?.loanPeriod}
              min="1"
            />
          </div>
        )}
      </div>

      {/* Calculate Button */}
      <div className="mt-6 text-center">
        <button
          className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700"
          onClick={handleCalculate}
        >
          Calculate Monthly Payment
        </button>
      </div>
    </div>
  );
};

export default LoanCalculator;