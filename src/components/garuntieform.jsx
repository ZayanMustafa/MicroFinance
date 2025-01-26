import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from "@mui/material";

const LoanApplicationForm = ({ open, handleCloseModal, loanAmount }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    picture: null,
    cnic: "",
    guarantee1Name: "",
    guarantee1Email: "",
    guarantee1Cnic: "",
    guarantee2Name: "",
    guarantee2Email: "",
    guarantee2Cnic: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "picture") {
      setFormData((prevData) => ({ ...prevData, picture: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send formData to your server or handle form submission logic.
    console.log(formData);
    handleCloseModal(); // Close the modal after submission.
  };

  return (
    <Dialog open={open} onClose={handleCloseModal}>
      <DialogTitle>Loan Application Form</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill in your details along with two guarantees for loan approval.
        </DialogContentText>
        
        {/* Full Name */}
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
          value={formData.name}
          onChange={handleChange}
        />
        
        {/* Email Address */}
        <TextField
          required
          margin="dense"
          id="email"
          name="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          value={formData.email}
          onChange={handleChange}
        />
        
        {/* Profile Picture */}
        <TextField
          margin="dense"
          id="picture"
          name="picture"
          label="Profile Picture"
          type="file"
          fullWidth
          variant="standard"
          onChange={handleChange}
        />
        
        {/* CNIC */}
        <TextField
          required
          margin="dense"
          id="cnic"
          name="cnic"
          label="CNIC"
          type="text"
          fullWidth
          variant="standard"
          value={formData.cnic}
          onChange={handleChange}
        />
        
        {/* Loan Amount */}
        <TextField
          required
          margin="dense"
          id="loanAmount"
          name="loanAmount"
          label="Loan Amount"
          value={loanAmount} // Loan amount passed as a prop
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
          value={formData.guarantee1Name}
          onChange={handleChange}
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
          value={formData.guarantee1Email}
          onChange={handleChange}
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
          value={formData.guarantee1Cnic}
          onChange={handleChange}
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
          value={formData.guarantee2Name}
          onChange={handleChange}
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
          value={formData.guarantee2Email}
          onChange={handleChange}
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
          value={formData.guarantee2Cnic}
          onChange={handleChange}
        />
      </DialogContent>

      {/* Dialog Actions */}
      <DialogActions>
        <Button onClick={handleCloseModal}>Cancel</Button>
        <Button type="submit" onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoanApplicationForm;
