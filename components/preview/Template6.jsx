// import React from "react";
import {useContext} from "react";
import { ResumeContext } from "../../pages/builder";
import { HighlightMenu } from "react-highlight-menu";
import ContactInfo from "./ContactInfo";
import { CgWebsite } from "react-icons/cg";
import DateRange from "../utility/DateRange";
import Language from "./Language";
import Skills from "./Skills";
import Certification from "./Certification";
import Link from "next/link";
import {
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaFacebook,
    FaInstagram,
    FaYoutube, FaBold, FaItalic, FaPlus, FaMinus, FaAlignLeft, FaAlignCenter, FaAlignRight,FaLink,
    FaUnderline,
  } from "react-icons/fa";
  import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
  import dynamic from "next/dynamic";
  // Importing draggable components dynamically
const DragDropContext = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.DragDropContext), { ssr: false });
const Droppable = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.Droppable), { ssr: false });
const Draggable = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.Draggable), { ssr: false })
const Template6 = () => {
    const { resumeData, setResumeData,headerColor,backgroundColorss } = useContext(ResumeContext);
    const icons = [
        { name: "github", icon: <FaGithub /> },
        { name: "linkedin", icon: <FaLinkedin /> },
        { name: "twitter", icon: <FaTwitter /> },
        { name: "facebook", icon: <FaFacebook /> },
        { name: "instagram", icon: <FaInstagram /> },
        { name: "youtube", icon: <FaYoutube /> },
        { name: "website", icon: <CgWebsite /> },
      ];
    
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
        <div className="container mx-auto flex bg-white shadow-lg">
          {/* Left Column */}
          <div className="left-column w-8/12 p-8 border-r border-gray-300">
            <h3 className="text-4xm text-orange-600 mb-2" style={{ color: headerColor }}>{resumeData.name}</h3>
            <h2 className="text-2xl text-gray-700 mb-8" style={{ color: headerColor }}>{resumeData.position}</h2>

            <h3 className="text-xl text-orange-600 mt-10 mb-2" style={{ color: headerColor }}>WORK EXPERIENCE</h3>

            {/* Job 1 */}
            <div className="job mb-8">
              <div className="col-span-2 space-y-2">
                {resumeData.workExperience.length > 0 && (
                  <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        <h2
                          className="section-title mb-1 border-b-2 border-gray-300 editable leading-tight"
                          contentEditable
                          suppressContentEditableWarning
                          style={{ color: headerColor }} >
                          Work Experience
                        </h2>
                        {resumeData.workExperience.map((item, index) => (
                          <Draggable
                            key={`${item.company}-${index}`}
                            draggableId={`WORK_EXPERIENCE-${index}`}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
                                  "outline-dashed outline-2 outline-gray-400 bg-white"
                                  }`}
                              >
                                <div className="flex flex-row justify-between space-y-1">
                                  <p className="content i-bold leading-normal">{item.company}</p>
                                  <DateRange
                                    startYear={item.startYear}
                                    endYear={item.endYear}
                                    id={`work-experience-start-end-date`}
                                  />
                                </div>
                                <p className="content leading-relaxed">{item.position}</p>
                                <p className="content hyphens-auto leading-loose">
                                  {item.description}
                                </p>
                                <Droppable
                                  droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
                                  type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
                                >
                                  {(provided) => (
                                    <ul
                                      className="list-disc ul-padding content leading-snug"
                                      {...provided.droppableProps}
                                      ref={provided.innerRef}
                                    >
                                      {typeof item.keyAchievements === "string" &&
                                        item.keyAchievements
                                          .split("\n")
                                          .map((achievement, subIndex) => (
                                            <Draggable
                                              key={`${item.company}-${index}-${subIndex}`}
                                              draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                              index={subIndex}
                                            >
                                              {(provided, snapshot) => (
                                                <li
                                                  ref={provided.innerRef}
                                                  {...provided.draggableProps}
                                                  {...provided.dragHandleProps}
                                                  className={`
                                              hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
                                              ${snapshot.isDragging &&
                                                    "outline-dashed outline-2 outline-gray-400 bg-white"
                                                    }`}
                                                >
                                                  <div
                                                    dangerouslySetInnerHTML={{
                                                      __html: achievement,
                                                    }}
                                                    contentEditable
                                                  />
                                                </li>
                                              )}
                                            </Draggable>
                                          ))}
                                      {provided.placeholder}
                                    </ul>
                                  )}
                                </Droppable>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                )}
                {resumeData.projects.length > 0 && (
                  <Droppable droppableId="projects" type="PROJECTS">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        <h2
                          className="section-title mb-1 border-b-2 border-gray-300 editable leading-tight"
                          contentEditable
                          suppressContentEditableWarning
                          style={{ color: headerColor }} >
                          Projects
                        </h2>
                        {resumeData.projects.map((item, index) => (
                          <Draggable
                            key={`${item.name}-${index}`}
                            draggableId={`PROJECTS-${index}`}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`mb-1 ${snapshot.isDragging &&
                                  "outline-dashed outline-2 outline-gray-400 bg-white"
                                  }`}
                              >
                                <div className="flex flex-row justify-between space-y-1">
                                  <p className="content i-bold leading-normal">{item.name}</p>
                                  <DateRange
                                    startYear={item.startYear}
                                    endYear={item.endYear}
                                    id={`work-experience-start-end-date`}
                                  />
                                </div>
                                <Link
                                  href={item.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="content leading-normal"
                                >
                                  {item.link}
                                </Link>
                                <p className="content leading-relaxed">{item.description}</p>
                                <Droppable
                                  droppableId={`PROJECTS_KEY_ACHIEVEMENT-${index}`}
                                  type="PROJECTS_KEY_ACHIEVEMENT"
                                >
                                  {(provided) => (
                                    <ul
                                      className="list-disc ul-padding content leading-snug"
                                      {...provided.droppableProps}
                                      ref={provided.innerRef}
                                    >
                                      {typeof item.keyAchievements === "string" &&
                                        item.keyAchievements
                                          .split("\n")
                                          .map((achievement, subIndex) => (
                                            <Draggable
                                              key={`${item.name}-${index}-${subIndex}`}
                                              draggableId={`PROJECTS_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                              index={subIndex}
                                            >
                                              {(provided, snapshot) => (
                                                <li
                                                  ref={provided.innerRef}
                                                  {...provided.draggableProps}
                                                  {...provided.dragHandleProps}
                                                  className={`
                                              hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
                                              ${snapshot.isDragging &&
                                                    "outline-dashed outline-2 outline-gray-400 bg-white"
                                                    }`}
                                                >
                                                  <div
                                                    dangerouslySetInnerHTML={{
                                                      __html: achievement,
                                                    }}
                                                    contentEditable
                                                  />
                                                </li>
                                              )}
                                            </Draggable>
                                          ))}
                                      {provided.placeholder}
                                    </ul>
                                  )}
                                </Droppable>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                )}
              </div>

            </div>
          </div>

          {/* Right Column */}
          <div className="right-column w-4/12 bg-gray-100 p-8" style={{ backgroundColor: backgroundColorss }}>
            <div className="contact mb-8">
              <h3 className="text-xl text-orange-600 mb-2" style={{ color: headerColor }}>CONTACT</h3>
              <ContactInfo
                mainclass="  gap-1 mb-1 contact"
                linkclass="inline-flex items-center gap-1"
                teldata={resumeData.contactInformation}
                emaildata={resumeData.email}
                addressdata={resumeData.address}
                telicon={<MdPhone />}
                emailicon={<MdEmail />}
                addressicon={<MdLocationOn />}
              />
            </div>

            <div className="skills mb-8">
              <h3 className="text-xl text-orange-600 mb-2" style={{ color: headerColor }}>SKILLS</h3>
              <Droppable droppableId="skills" type="SKILLS">
                {(provided) => (
                  <ul
                    className=" "
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {resumeData.skills.map((skill, index) => (
                      <Draggable
                        key={`SKILLS-${index}`}
                        draggableId={`SKILLS-${index}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={` hover:scale-105 transition-transform duration-300 text-sm mb-1.5 ${snapshot.isDragging &&
                              "outline-dashed outline-2 outline-gray-400 bg-white"
                              }`}
                          >
                            <Skills title={skill.title} skills={skill.skills} />
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
              <p className="text-gray-700 mt-4 text-orange-600" style={{ color: headerColor }}>Languages:</p>
              <Language languages={resumeData.languages} />
              <Certification
                title="Certifications"
                certifications={resumeData.certifications}
              />
            </div>

            <div className="education mb-8">
              {resumeData.education.length > 0 && (
                <div className="mb-1">
                  <h2 className="section-title mb-1 border-b-2 border-gray-300 text-orange-600" style={{ color: headerColor }}>
                    Education
                  </h2>
                  {resumeData.education.map((item, index) => (
                    <div key={index} className="mb-1">
                      <p className="content i-bold">{item.degree}</p>
                      <p className="content">{item.school}</p>
                      <DateRange
                        startYear={item.startYear}
                        endYear={item.endYear}
                        id={`education-start-end-date`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

const A4PageWrapper = ({ children }) => {
    const alertA4Size = () => {
      const preview = document.querySelector(".preview");
      const previewHeight = preview.offsetHeight;
      console.log(previewHeight);
      if (previewHeight > 1122) {
        alert("A4 size exceeded");
      }
    };
  
    return (
      <div className="w-8.5in border p-3" onLoad={alertA4Size}>
        {children}
      </div>
    );
  
  };

export default Template6;
