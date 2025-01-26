import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
  // const [showGuaranteeForm, setShowGuaranteeForm] = useState(false);
  const [openModal, setOpenModal] = useState(false); // Track modal visibility

  const calculateLoanPayment = (loanAmount, loanPeriod) => {
    const annualRate = 0.001; // 10% annual interest
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
      alert("Invalid input! Loan amount or period exceeds limits.");
    } else {
      const payment = calculateLoanPayment(loanAmount, loanPeriod);
      setMonthlyPayment(payment);
      setOpenModal(true); // Show modal when loan calculation is successful
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false); 
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-8">Loan Application</h1>

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

      {/* Modal Form */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const name = formJson.name;
            console.log(name); // handle form submission here
            handleCloseModal();
          },
        }}
      >
        <DialogTitle>Loan Application Form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in your details along with two guarantees for loan approval.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Full Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="picture"
            name="picture"
            label="Profile Picture"
            type="file"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="cnic"
            name="cnic"
            label="CNIC"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="loanAmount"
            name="loanAmount"
            label="Loan Amount"
            value={loanAmount}
            type="text"
            fullWidth
            variant="standard"
            disabled
          />
          {/* First Guarantee */}
          <TextField
            required
            margin="dense"
            id="guarantee1Name"
            name="guarantee1Name"
            label="First Guarantee Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="guarantee1Email"
            name="guarantee1Email"
            label="First Guarantee Email"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="guarantee1Cnic"
            name="guarantee1Cnic"
            label="First Guarantee CNIC"
            type="text"
            fullWidth
            variant="standard"
          />
          {/* Second Guarantee */}
          <TextField
            required
            margin="dense"
            id="guarantee2Name"
            name="guarantee2Name"
            label="Second Guarantee Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="guarantee2Email"
            name="guarantee2Email"
            label="Second Guarantee Email"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="guarantee2Cnic"
            name="guarantee2Cnic"
            label="Second Guarantee CNIC"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LoanCalculator;
