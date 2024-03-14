import React, { useState, useEffect } from "react";
import "../TeamDComponents/TeamD_Css/content.css";
import { pdfjs } from "react-pdf";
import { Alert, Dropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { BiFileFind } from "react-icons/bi";
import { MdOutlineFileDownload } from "react-icons/md";
import { FiSearch, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FaArrowUp } from "react-icons/fa";
import NoCert from "../TeamDComponents/TeamD_Assets/undraw_learning_re_32qv.svg";
import { Spinner } from "react-bootstrap";
import Team_D_HeaderV2 from "./Team_D_HeaderV2";
import { Tab, Tabs } from "react-bootstrap";
import { Container, Row } from "react-bootstrap";
import { Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Set up PDF.js worker source
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// Team_D_Content functional component
const Team_D_Content = () => {
  // State declarations
  const [pdfFileNames, setPdfFileNames] = useState([]); // State to store the array of PDF file names fetched from API
  const [thumbnails, setThumbnails] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [disableDownloadButtons, setDisableDownloadButtons] = useState([]);
  const [enableViewButtons, setEnableViewButtons] = useState([]);
  const [overlayVisibilities, setOverlayVisibilities] = useState([]);
  const [disableViewButtons, setDisableViewButtons] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769); // Check if the viewport width is less than 769
  const value = localStorage.getItem("userId");

  const [DateIssued, setDateIssued] = useState("recent"); // Initialize with default value
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8); // Change this value according to your preference

  useEffect(() => {
    handleCategoryChange(DateIssued); // Trigger filtering on initial render
  }, [pdfFileNames]); // Trigger filtering when pdfFileNames changes

  const handleCategoryChange = (value) => {
    setDateIssued(value);
    if (value === "recent") {
      // Filter recent certificates
      const filtered = pdfFileNames.filter(
        (cert) => FilterDate(cert.date_issued) === "recent"
      );
      setFilteredCertificates(filtered);
    } else {
      // Display all certificates
      setFilteredCertificates(pdfFileNames);
    }
  };

  if (value !== null) {
    // Value exists, you can use it
    console.log("User is online!");
  } else {
    // Value does not exist
    console.log("Value not found for the specified key.");
  }

  // State to store the search term
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("searchTerm") || ""
  );

  // State to store the filtered certificates based on the search term
  const [filteredCertificates, setFilteredCertificates] = useState([]);

  // Handle window resize
  const handleResize = () => {
    setIsMobile(window.innerWidth < 769);
  };

  // Effect to fetch PDF file names from API and handle window resize
  useEffect(() => {
    // Fetch PDF file names from API
    fetchPdfFileNamesFromApi();
    // Add event listener to track window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures the effect runs only once during mount

  // Fetch PDF file names from API
  const fetchPdfFileNamesFromApi = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/auth/myCertification/${value}`
      );
      const data = await response.json();
      if (data) {
        setPdfFileNames(data);
      }
    } catch (error) {
      console.error("Error fetching PDF file names:", error);
    }
  };

  //use this when its by week basis
  const FilterDate = (date_issued) => {
    const issuedDate = new Date(date_issued);
    const today = new Date();

    // Calculate the difference in days
    const differenceInDays = Math.floor(
      (today - issuedDate) / (1000 * 60 * 60 * 24)
    );

    // Check if the certificate was issued within the same week
    if (differenceInDays <= 7) {
      return "recent";
    } else {
      return "not_recent";
    }
  };

  //use this if recent is par day basis
  // const FilterDate = (date_issued) => {
  //   const issuedDate = new Date(date_issued);
  //   const today = new Date();

  //   if (
  //     issuedDate.getFullYear() === today.getFullYear() &&
  //     issuedDate.getMonth() === today.getMonth() &&
  //     issuedDate.getDate() === today.getDate()
  //   ) {
  //     return "recent";
  //   } else {
  //     return "not_recent";
  //   }
  // };

  // Function to handle the search based on the current search term
  const handleSearch = () => {
    // Convert the search term to lowercase for case-insensitive comparison
    const searchTermLower = searchTerm.toLowerCase();

    // Filter certificates based on the search term
    const filtered = pdfFileNames.filter((cert) =>
      cert.finalScore.enrollment.course.course_title
        .toLowerCase()
        .includes(searchTermLower)
    );

    // Set the filtered certificates in the state
    setFilteredCertificates(filtered);
  };
  // Function to handle clearing the search term and updating filtered certificates
  const handleClearSearch = () => {
    // Clear the search term
    setSearchTerm("");

    // Display all certificates
    setFilteredCertificates(pdfFileNames);
  };

  // Effect hook to update the filtered certificates when the search term changes
  useEffect(() => {
    // Filter certificates based on the search term
    const filtered =
      searchTerm.trim() === ""
        ? pdfFileNames // If search term is empty, display all certificates
        : pdfFileNames.filter((pdfFile) =>
            pdfFile.finalScore.enrollment.course.course_title
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          );

    // Set the filtered certificates in the state
    setFilteredCertificates(filtered);
  }, [searchTerm, pdfFileNames]);

  // Effect to load thumbnails for PDF files
  useEffect(() => {
    const fetchThumbnails = async () => {
      const newThumbnails = [];
      const newDisableDownloadButtons = [];
      const newEnableViewButtons = [];
      const newOverlayVisibilities = [];
      const newDisableViewButtons = [];
      console.log(pdfFileNames);
      for (let i = 0; i < pdfFileNames.length; i++) {
        const pdfPath = `/PDF/${pdfFileNames[i].certificate_file}`; // Assuming certificate_file contains the path to the PDF
        try {
          const loadingTask = pdfjs.getDocument(pdfPath);
          const pdf = await loadingTask.promise;
          const page = await pdf.getPage(1);

          const viewport = page.getViewport({ scale: 0.5 });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };

          await page.render(renderContext).promise;

          const dataUrl = canvas.toDataURL();
          newThumbnails.push(dataUrl);
          newDisableDownloadButtons.push(false);
          newEnableViewButtons.push(true);
          newOverlayVisibilities.push(false);
          newDisableViewButtons.push(false);
        } catch (error) {
          console.error("Error loading PDF:", error);
        }
      }

      setThumbnails(newThumbnails);
      setDisableDownloadButtons(newDisableDownloadButtons);
      setEnableViewButtons(newEnableViewButtons);
      setOverlayVisibilities(newOverlayVisibilities);
      setDisableViewButtons(newDisableViewButtons);
    };

    fetchThumbnails();
  }, [pdfFileNames]);

  // Effect to handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setShowNotification({
        type: "info",
        message: "You are back online! You can now download certificates.",
      });

      setTimeout(() => {
        setShowNotification(null);
      }, 5000);
    };

    const handleOffline = () => {
      setShowNotification({
        type: "danger",
        message: "You are currently offline. Please connect to the internet.",
      });

      setTimeout(() => {
        setShowNotification(null);
      }, 5000);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Handle download button click
  const handleDownloadClick = (index) => () => {
    // If overlay is not visible, toggle overlay visibility and return
    if (!overlayVisibilities[index]) {
      setDisableDownloadButtons((prevButtons) =>
        prevButtons.map((button, idx) => (idx === index ? false : button))
      );
      setEnableViewButtons((prevButtons) =>
        prevButtons.map((button, idx) => (idx === index ? true : button))
      );
      return;
    }

    // If download button is disabled or view button is not enabled, return
    if (disableDownloadButtons[index] || !enableViewButtons[index]) {
      return;
    }

    // If user is offline, show notification and return
    if (!window.navigator.onLine) {
      setShowNotification({
        type: "danger",
        message:
          "You are currently offline. Please connect to the internet and try again.",
      });
      setTimeout(() => {
        setShowNotification(null);
      }, 5000);
      return;
    }

    // Construct PDF path
    const pdfPath = `/PDF/${pdfFileNames[index].certificate_file}`; // Assuming certificate_file contains the path to the PDF
    const link = document.createElement("a");
    link.href = pdfPath;
    // Assuming certificate_file contains the desired name for the downloaded file
    link.download = pdfFileNames[index].certificate_file;

    // Event listeners for download events
    link.addEventListener("abort", () => {
      setShowNotification({
        type: "danger",
        message: "Download aborted. Please try again.",
      });
    });

    link.addEventListener("error", () => {
      setShowNotification({
        type: "danger",
        message: "Error during download. Please try again.",
      });
    });

    // Trigger download
    link.click();

    // Show download success notification
    setShowNotification({
      type: "success",
      message: "Download successful!",
    });

    // Disable download button temporarily and reset state after 5 seconds
    setDisableDownloadButtons((prevButtons) =>
      prevButtons.map((button, idx) => (idx === index ? true : button))
    );
    setTimeout(() => {
      setDisableDownloadButtons((prevButtons) =>
        prevButtons.map((button, idx) => (idx === index ? false : button))
      );
      setShowNotification(null);
    }, 5000);

    // Disable view button temporarily
    setEnableViewButtons((prevButtons) =>
      prevButtons.map((button, idx) => (idx === index ? false : button))
    );
    setTimeout(() => {
      setEnableViewButtons((prevButtons) =>
        prevButtons.map((button, idx) => (idx === index ? true : button))
      );
    }, 0);

    // Hide overlay after download
    setTimeout(() => {
      setOverlayVisibilities((prevVisibilities) =>
        prevVisibilities.map((visibility, idx) =>
          idx === index ? false : visibility
        )
      );
    }, 0);
  };

  // Handle view button click
  const handleViewClick = (index) => () => {
    // If overlay is not visible, toggle overlay visibility and return
    if (!overlayVisibilities[index]) {
      setEnableViewButtons((prevButtons) =>
        prevButtons.map((button, idx) => (idx === index ? true : button))
      );
      setDisableViewButtons((prevButtons) =>
        prevButtons.map((button, idx) => (idx === index ? false : button))
      );
      return;
    }

    // If view button is not enabled or view is disabled, return
    if (!enableViewButtons[index] || disableViewButtons[index]) {
      return;
    }

    // Disable link and view button temporarily
    const link = document.getElementById(`viewLink_${index}`);
    const viewButton = document.getElementById(`viewButton_${index}`);

    if (link) {
      link.style.pointerEvents = "none";
    }

    if (viewButton) {
      viewButton.style.pointerEvents = "none";
    }

    // Show notification about disabled view
    setShowNotification({
      type: "info",
      message: "Viewing is disabled for 5 seconds.",
    });

    // Disable view button temporarily and reset state after 5 seconds
    setDisableViewButtons((prevButtons) =>
      prevButtons.map((button, idx) => (idx === index ? true : button))
    );
    setTimeout(() => {
      if (link) {
        link.style.pointerEvents = "auto";
      }

      if (viewButton) {
        viewButton.style.pointerEvents = "auto";
      }
      setDisableViewButtons((prevButtons) =>
        prevButtons.map((button, idx) => (idx === index ? false : button))
      );
      setShowNotification(null);
    }, 0);
  };

  // Handle scroll to top button click
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Determine total pages
  const totalPages = Math.ceil(filteredCertificates.length / itemsPerPage);

  // Calculate indexes of items for current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCertificates.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Tooltip for view button
  const viewTooltip = <Tooltip id="viewTooltip">View Certificate</Tooltip>;
  // Tooltip for download button
  const downloadTooltip = (
    <Tooltip id="downloadTooltip">Download Certificate</Tooltip>
  );

  // Determine whether to show scroll to top button based on scroll position
  const shouldShowScrollToTop = window.scrollY > 200;

  // Define custom CSS classes
  const paginationClasses = {
    pagination: "pagination-custom",
    active: "active-custom",
    item: "item-custom",
    prev: "prev-custom",
    next: "next-custom",
  };
  // JSX rendering
  return (
    <div>
      <Team_D_HeaderV2 /> {/* Render Team_D_HeaderV2 component */}
      <section className="TeamD_content">
        {/* Section containing search bar */}
        <section className="withSearchBar">
          <h1>Certificates</h1>
          <InputGroup expand="lg" size="sm" className="float-right">
            <Form.Control
              type="text"
              placeholder="Search here..."
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  // Handle the "Enter" key press, e.g., trigger the verification function
                  handleSearch();
                }
              }}
              className="TeamD_search-input" // Add a class for styling
            />
            {searchTerm && (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip className="clear-tooltip">Clear</Tooltip>}
              >
                <InputGroup.Text
                  className="TeamD_icon_search_icon-container"
                  onClick={handleClearSearch} // Correctly bind the function to onClick
                >
                  <span>
                    <FiX className="TeamD_icon_clear_search_icon" />
                  </span>
                </InputGroup.Text>
              </OverlayTrigger>
            )}
            <InputGroup.Text className="TeamD_icon_search_icon-container">
              <span>
                <FiSearch className="TeamD_icon_search_icon" />
              </span>
            </InputGroup.Text>
          </InputGroup>
        </section>
        <div className="hr"></div> {/* Horizontal rule */}
        <Container className="TeamD_Tab">
          {/* select if show all certificates or only the recent */}
          <Row>
            <Tabs
              id="date_issued"
              activeKey={DateIssued}
              onSelect={(selectedKey) => {
                console.log("Selected value:", selectedKey); // Add console.log statement here
                handleCategoryChange(selectedKey);
              }}
            >
              <Tab eventKey="recent" title="Recent"></Tab>
              <Tab eventKey="" title="All"></Tab>
            </Tabs>
          </Row>
        </Container>
      </section>
      {/* Section for displaying certificates */}
      <section className="certificates">
        {/* Conditionally render certificates or no certificates message */}
        {DateIssued === "recent" ? (
          // Render recent certificates without pagination
          <>
            {filteredCertificates.length > 0 ? (
              filteredCertificates.slice(0, 5).map((pdfFile, index) => (
                // Render certificate item
                <div
                  className="certificate_thumbnail"
                  key={index}
                  onMouseEnter={() =>
                    setOverlayVisibilities((prevVisibilities) =>
                      prevVisibilities.map((visibility, idx) =>
                        idx === index ? true : visibility
                      )
                    )
                  }
                  onMouseLeave={() =>
                    setOverlayVisibilities((prevVisibilities) =>
                      prevVisibilities.map((visibility, idx) =>
                        idx === index ? false : visibility
                      )
                    )
                  }
                >
                  {/* Render certificate thumbnail */}
                  <div className="cert">
                    {isMobile && thumbnails[index] ? (
                      <Link
                        to="/viewCert"
                        state={{
                          pdfName: pdfFile.certificate_file,
                          courseTitle:
                            pdfFile.finalScore.enrollment.course.course_title,
                        }}
                        id={`viewLink_${index}`}
                      >
                        <div className="overlay"></div>
                        <img src={thumbnails[index]} alt="PDF Thumbnail" />
                      </Link>
                    ) : !isMobile && thumbnails[index] ? (
                      <img src={thumbnails[index]} alt="PDF Thumbnail" />
                    ) : (
                      <p className="TeamD_loading-spinner">
                        <Spinner /> <br />
                        Loading..{" "}
                      </p>
                    )}

                    {/* Render overlay with view and download buttons */}
                    {!isMobile && (
                      <div
                        className={`overlay${
                          overlayVisibilities[index] ? " visible" : ""
                        }`}
                      >
                        {thumbnails[index] && (
                          <div className="buttons">
                            {/* View button */}
                            <Link
                              id={`viewLink_${index}`}
                              to="/viewCert"
                              state={{
                                pdfName: pdfFile.certificate_file,
                                courseTitle:
                                  pdfFile.finalScore.enrollment.course
                                    .course_title,
                              }}
                            >
                              <OverlayTrigger
                                placement="top"
                                overlay={viewTooltip}
                              >
                                <button
                                  id={`viewButton_${index}`}
                                  className="view"
                                  style={{
                                    pointerEvents: overlayVisibilities[index]
                                      ? "auto"
                                      : "none",
                                  }}
                                  onClick={handleViewClick(index)}
                                >
                                  <BiFileFind className="TeamD_icon view_icon" />
                                </button>
                              </OverlayTrigger>
                            </Link>
                            {/* Download button */}
                            <OverlayTrigger
                              placement="top"
                              overlay={downloadTooltip}
                            >
                              <button
                                className="download"
                                style={{
                                  pointerEvents: overlayVisibilities[index]
                                    ? "auto"
                                    : "none",
                                }}
                                onClick={handleDownloadClick(index)}
                                disabled={
                                  !enableViewButtons[index] ||
                                  disableDownloadButtons[index]
                                }
                              >
                                <MdOutlineFileDownload className="TeamD_icon download_icon" />
                              </button>
                            </OverlayTrigger>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {/* Display course title */}
                  <p className="TeamD_certificate_courseTitle">
                    {pdfFile.finalScore.enrollment.course.course_title}
                  </p>
                </div>
              ))
            ) : (
              <div className="no-certificates">
                {/* Render no certificates message */}
                <img src={NoCert} alt="No certification yet" /> No certificate
                available.
              </div>
            )}
          </>
        ) : (
          // Render all certificates with pagination
          <>
            {filteredCertificates.length > 0 ? (
              <>
                {/* Print all certificates based on pagination */}
                {filteredCertificates
                  .slice((currentPage - 1) * 8, currentPage * 8)
                  .map((pdfFile, index) => (
                    // Render certificate item
                    <div
                      className="certificate_thumbnail"
                      key={index}
                      onMouseEnter={() =>
                        setOverlayVisibilities((prevVisibilities) =>
                          prevVisibilities.map((visibility, idx) =>
                            idx === index ? true : visibility
                          )
                        )
                      }
                      onMouseLeave={() =>
                        setOverlayVisibilities((prevVisibilities) =>
                          prevVisibilities.map((visibility, idx) =>
                            idx === index ? false : visibility
                          )
                        )
                      }
                    >
                      {/* Render certificate thumbnail */}
                      <div className="cert">
                        {isMobile && thumbnails[index] ? (
                          <Link
                            to="/viewCert"
                            state={{
                              pdfName: pdfFile.certificate_file,
                              courseTitle:
                                pdfFile.finalScore.enrollment.course
                                  .course_title,
                            }}
                            id={`viewLink_${index}`}
                          >
                            <div className="overlay"></div>
                            <img src={thumbnails[index]} alt="PDF Thumbnail" />
                          </Link>
                        ) : !isMobile && thumbnails[index] ? (
                          <img src={thumbnails[index]} alt="PDF Thumbnail" />
                        ) : (
                          <p className="TeamD_loading-spinner">
                            <Spinner /> <br />
                            Loading..{" "}
                          </p>
                        )}

                        {/* Render overlay with view and download buttons */}
                        {!isMobile && (
                          <div
                            className={`overlay${
                              overlayVisibilities[index] ? " visible" : ""
                            }`}
                          >
                            {thumbnails[index] && (
                              <div className="buttons">
                                {/* View button */}
                                <Link
                                  id={`viewLink_${index}`}
                                  to="/viewCert"
                                  state={{
                                    pdfName: pdfFile.certificate_file,
                                    courseTitle:
                                      pdfFile.finalScore.enrollment.course
                                        .course_title,
                                  }}
                                >
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={viewTooltip}
                                  >
                                    <button
                                      id={`viewButton_${index}`}
                                      className="view"
                                      style={{
                                        pointerEvents: overlayVisibilities[
                                          index
                                        ]
                                          ? "auto"
                                          : "none",
                                      }}
                                      onClick={handleViewClick(index)}
                                    >
                                      <BiFileFind className="TeamD_icon view_icon" />
                                    </button>
                                  </OverlayTrigger>
                                </Link>
                                {/* Download button */}
                                <OverlayTrigger
                                  placement="top"
                                  overlay={downloadTooltip}
                                >
                                  <button
                                    className="download"
                                    style={{
                                      pointerEvents: overlayVisibilities[index]
                                        ? "auto"
                                        : "none",
                                    }}
                                    onClick={handleDownloadClick(index)}
                                    disabled={
                                      !enableViewButtons[index] ||
                                      disableDownloadButtons[index]
                                    }
                                  >
                                    <MdOutlineFileDownload className="TeamD_icon download_icon" />
                                  </button>
                                </OverlayTrigger>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      {/* Display course title */}
                      <p className="TeamD_certificate_courseTitle">
                        {pdfFile.finalScore.enrollment.course.course_title}
                      </p>
                    </div>
                  ))}
              </>
            ) : (
              <div className="no-certificates">
                {/* Render no certificates message */}
                <img src={NoCert} alt="No certification yet" /> No certificate
                available.
              </div>
            )}
            {/* Render pagination controls */}
            <Container>
              {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                  <Pagination className={paginationClasses.pagination}>
                    <Pagination.Prev
                      className={paginationClasses.prev}
                      onClick={() =>
                        setCurrentPage((prevPage) =>
                          prevPage > 1 ? prevPage - 1 : prevPage
                        )
                      }
                      disabled={currentPage === 1}
                    />
                    {Array.from({ length: totalPages }, (_, i) => (
                      <Pagination.Item
                        key={i}
                        active={currentPage === i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={paginationClasses.item}
                      >
                        {i + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next
                      className={paginationClasses.next}
                      onClick={() =>
                        setCurrentPage((prevPage) =>
                          prevPage < totalPages ? prevPage + 1 : prevPage
                        )
                      }
                      disabled={currentPage === totalPages}
                    />
                  </Pagination>
                </div>
              )}
            </Container>
          </>
        )}
      </section>
      {/* Render notification */}
      {showNotification && (
        <Alert
          variant={showNotification.type}
          onClose={() => setShowNotification(null)}
          dismissible
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            zIndex: 1000,
          }}
        >
          {showNotification.message}
        </Alert>
      )}
      {/* Render scroll to top button */}
      <div
        className={`scroll-to-top${shouldShowScrollToTop ? " visible" : ""}`}
        onClick={handleScrollToTop}
        style={{
          position: "fixed",
          bottom: shouldShowScrollToTop ? "20px" : "-40px",
          right: "20px",
          cursor: "pointer",
          opacity: shouldShowScrollToTop ? 1 : 0,
          transition: "opacity 0.2s ease-in-out, bottom 0.2s ease-in-out",
          borderRadius: "100px",
          border: "1px solid #ccc",
          background: "#fff",
          padding: "15px",
        }}
      >
        <FaArrowUp />
      </div>
      {/* for mapping of date_issued removed showing mapping since it affects scroll to top button*/}
      {pdfFileNames.map((fil, idx) => {
        const { date_issued } = fil;
        const recent = FilterDate(date_issued) === "recent"; // Check if it's recent
        console.log("Certificate date:", date_issued, "Is recent?", recent);
        return null; // Hide other JSX elements
      })}
    </div>
  );
};

export default Team_D_Content;
