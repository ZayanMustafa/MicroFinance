import React from "react";
import Navbar from "../../components/navbar";
import LoanCards from "../../components/loancards";
import LoanCalculator from "../../components/loancalculator";
import Slider from "../../components/slider";
import Footer from "../../components/footer";

export default function MainPage() {
    return (
        <React.Fragment>
            <Navbar/>
            {/* <Slider/> */}
            <LoanCards/>
            <LoanCalculator/>
            <Footer/>
        </React.Fragment>
    );
}