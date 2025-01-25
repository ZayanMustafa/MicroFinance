import React from "react";
import { FaRing, FaHome, FaBriefcase, FaGraduationCap } from "react-icons/fa"; // Importing appropriate icons

const loanCategories = [
  {
    title: "Wedding Loans",
    icon: <FaRing />,
    subcategories: ["Valima", "Furniture", "Valima Food", "Jahez"],
    maxLoan: "PKR 5 Lakh",
    loanPeriod: "3 years"
  },
  {
    title: "Home Construction Loans",
    icon: <FaHome />,
    subcategories: ["Structure", "Finishing", "Loan"],
    maxLoan: "PKR 10 Lakh",
    loanPeriod: "5 years"
  },
  {
    title: "Business Startup Loans",
    icon: <FaBriefcase />,
    subcategories: ["Buy Stall", "Advance Rent for Shop", "Shop Assets", "Shop Machinery"],
    maxLoan: "PKR 10 Lakh",
    loanPeriod: "5 years"
  },
  {
    title: "Education Loans",
    icon: <FaGraduationCap />,
    subcategories: ["University Fees", "Child Fees Loan"],
    maxLoan: "Based on requirement",
    loanPeriod: "4 years"
  }
];

export default function LoanCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {loanCategories.map((loan, index) => (
        <div
          key={index}
          className="flex-shrink-0 max-w-xs w-full h-auto rounded-lg overflow-hidden shadow-lg bg-white p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="text-2xl text-indigo-500">{loan.icon}</div>
            <h2 className="text-xl font-semibold text-gray-800">{loan.title}</h2>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-700">Subcategories:</h3>
            <ul className="list-disc pl-5 text-gray-600">
              {loan.subcategories.map((subcategory, index) => (
                <li key={index}>{subcategory}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <p className="text-gray-700">
              <strong>Maximum Loan:</strong> {loan.maxLoan}
            </p>
            <p className="text-gray-700">
              <strong>Loan Period:</strong> {loan.loanPeriod}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
