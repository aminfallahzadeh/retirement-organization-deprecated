// react imports
import { useState, useEffect } from "react";

// component imports
import RetiredAdditionalInfo from "../../forms/RetiredAdditionalInfo";
import RetiredPensionaryForm from "../../forms/RetiredPensionaryForm";
import RetiredPersonForm from "../../forms/RetiredPersonForm";
import ElectronicCaseSection from "./ElectronicCaseSection";

// mui imports
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";

function IndividualInfoSection() {
  const [theme, setTheme] = useState("default"); // State variable to hold the theme

  useEffect(() => {
    const colorScheme = document.documentElement.getAttribute("color-scheme");
    setTheme(colorScheme);
    console.log(theme);
  }, [theme]);

  const content = (
    <section className="pensionersAffairs">
      <Accordion
        sx={{
          color: "#333533",
          backgroundColor: theme === "default" ? "#c0c0c0" : "#ebebeb",
        }}
      >
        <AccordionSummary
          id="panel-header"
          aria-controls="panel-content"
          expandIcon={<ArrowDropDownIcon />}
        >
          اطلاعات فردی بازنشسته
        </AccordionSummary>
        <AccordionDetails>
          <RetiredPersonForm />
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          color: "#333533",
          backgroundColor: theme === "default" ? "#c0c0c0" : "#ebebeb",
        }}
      >
        <AccordionSummary
          id="panel-header"
          aria-controls="panel-content"
          expandIcon={<ArrowDropDownIcon />}
        >
          اطلاعات پرسنلی
        </AccordionSummary>
        <AccordionDetails>
          <RetiredPensionaryForm />
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          color: "#333533",
          backgroundColor: theme === "default" ? "#c0c0c0" : "#ebebeb",
        }}
      >
        <AccordionSummary
          id="panel-header"
          aria-controls="panel-content"
          expandIcon={<ArrowDropDownIcon />}
        >
          اطلاعات تکمیلی
        </AccordionSummary>
        <AccordionDetails>
          <RetiredAdditionalInfo />
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          color: "#333533",
          backgroundColor: theme === "default" ? "#c0c0c0" : "#ebebeb",
        }}
      >
        <AccordionSummary
          id="panel-header"
          aria-controls="panel-content"
          expandIcon={<ArrowDropDownIcon />}
        >
          پرونده الکترونیک
        </AccordionSummary>
        <AccordionDetails>
          <ElectronicCaseSection />
        </AccordionDetails>
      </Accordion>
    </section>
  );

  return content;
}

export default IndividualInfoSection;
