import React, { useState, useEffect } from "react";
import ResumeService from "../../services/resumeService";
import DataTableProfile from "../layouts/DataTableLayout/DataTableProfile";
import DataTable from "../layouts/DataTableLayout/DataTable";
import * as constants from "../../constants/constantsMethods"

export default function ResumeController() {
  const [resumees, setResumees] = useState([]);

  useEffect(() => {
    let resumeService = new ResumeService();
    resumeService.getAll().then((response) => setResumees(response.data.data));
  }, []);

  const headerCells = [
    "Id",
    "Çalışan",
    "Açıklama",
    "Github",
    "Linkedin",
    "Beceriler",
    "Okul",
    "İş Tecrübeleri",
    "Diller",
  ];

  var cells = []

  var a = ["React", "Unity", "C#", "Javascript"]


  return (
    <>
      {resumees.map((resume) => {
        const employee = resume.employee
        const cell = []
        cell.push(resume.id)
        cell.push(
          <DataTableProfile
            header={employee.firstName + " " + employee.lastName}
            subHeader={employee.user.email}
          />
        )
        cell.push(resume.description)
        cell.push(resume.githubUrl)
        cell.push(resume.linkedinUrl)
        cell.push(constants.listToSeparatedText(a))
        cell.push(resume.schools.length)
        cell.push(resume.jobExperiences.length)
        cell.push(2)
        cells.push(cell)
      })}
      <DataTable headerCells={headerCells} cells={cells} />
    </>
  );
}
