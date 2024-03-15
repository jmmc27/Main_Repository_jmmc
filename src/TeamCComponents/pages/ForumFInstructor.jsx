import React, { useState, useEffect } from "react";
import "../css/ffront.css";
import { IoIosSearch } from "react-icons/io";
import DiscussionPosts from "./DiscussionPosts";
import Nav from "../../TeamBComponents/components/NavBar/Nav";
import DiscussionPostsInstructor from "./DiscussionPostsInstructor";
import Footer from "../../TeamBComponents/components/Footer";

const ForumFInstructor = () => {
  const [isSearchButtonDisabled, setIsSearchButtonDisabled] = useState(true);
  const [showDiscussionForm, setShowDiscussionForm] = useState(false);
  const [discussionPosts, setDiscussionPosts] = useState([]);
  const [discussionTitle, setDiscussionTitle] = useState("");
  const [discussionContent, setDiscussionContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const toggleDiscussionForm = () => {
    setShowDiscussionForm(!showDiscussionForm);
  };

  const searchDiscussions = () => {
    const trimmedSearchTerm = searchTerm.trim().toLowerCase();
    const updatedDiscussionPosts = discussionPosts.map((post) => {
      const discussionTitle = post.title.toLowerCase();

      if (trimmedSearchTerm && discussionTitle.includes(trimmedSearchTerm)) {
        return { ...post, display: true };
      } else {
        return { ...post, display: false };
      }
    });

    setDiscussionPosts(updatedDiscussionPosts);
  };

  function postDiscussion() {
    var discussionTitleInput = document.getElementById("discussionTitle");
    var discussionContentInput = document.getElementById("discussionContent");

    // Retrieve the input values
    var discussionTitle = discussionTitleInput.value.trim();
    var discussionContent = discussionContentInput.value.trim();

    // Validate discussion title length
    if (discussionTitle.length > 200) {
      alert("Discussion title must not exceed 200 characters!");
      return;
    }

    // Validate special characters in the discussion title using a regular expression
    var specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
    if (specialCharacters.test(discussionTitle)) {
      alert("Special characters are not allowed in the discussion title!");
      return;
    }

    // Validate if both title and content are provided
    if (discussionTitle === "" || discussionContent === "") {
      alert("Discussion title and content are required!");
      return;
    }

    // Add an event listener to the discussion title for redirection
    var discussionTitleElement = newDiscussionCard.querySelector(
      `#discussionTitle_${Date.now()}`
    );
    discussionTitleElement.addEventListener("click", function () {
      redirectToDiscussionDetails(discussionTitle, discussionContent);
    });

    // Insert the new discussion card before the first post
    var existingDiscussions = document.getElementById("discussionPosts");
    existingDiscussions.insertBefore(
      newDiscussionCard,
      existingDiscussions.firstChild
    );

    // Reset the input fields and hide the form using state-setting functions
    setDiscussionTitle("");
    setDiscussionContent("");
    setShowDiscussionForm(false);

    // Show modal and set timeout to close it after 1 second
    var myModal = new bootstrap.Modal(document.getElementById("niceModal"));
    myModal.show();

    setTimeout(function () {
      myModal.hide();
    }, 1000); // Close the modal after 1 second
  }

  const redirectToDiscussionDetails = (title, content) => {
    const urlTitle = title.replace(/\s+/g, "-").toLowerCase();
    const url = `/discussion_detail/${urlTitle}/${encodeURIComponent(content)}`;
    //navigate("/"); // Use useNavigate instead of history.push
  };

  // Add event listener to prevent Enter key from submitting the form
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  });

  const toggleSearchButton = () => {
    const searchInput = document.getElementById("searchDiscussion");
    setIsSearchButtonDisabled(searchInput.value.trim() === "");
  };

  useEffect(() => {
    const searchInput = document.getElementById("searchDiscussion");
    searchInput.addEventListener("input", toggleSearchButton);

    return () => {
      searchInput.removeEventListener("input", toggleSearchButton);
    };
  }, []);

  //hide and show submit form
  const [showForm, setShowForm] = useState(false);

  //functionlity for hiding form when submit
  const hideFormHandle = () => {
    setShowForm((prev) => !prev);
    setShowDiscussionForm(false);
  };

  return (
    <>
      <Nav />
      <div className="ForumFSpace">
        <div className="container stretch-forum">
          <div className="row justify-content-center">
            <div className="mb-3 c_forum_adjustm col-lg-12">
              {/*30/24*/}
              <div className="mb-5 text-left row">
                <br />
                <div className="c_forum_adjustm col-lg-9mx-auto">
                  {/*30/24*/}

                  <div className="mt-20 mb-5 text-left row">
                    <div className="col-lg-6">
                      <button
                        className="px-4 py-2 mb-3 c_forum_btngr btn btn-lg btn-success bg-op-6 roboto-bold"
                        onClick={toggleDiscussionForm}
                      >
                        {/*30/24*/}
                        Add discussion
                      </button>
                    </div>
                    <div className="col-lg-6">
                      <div className="input-group">
                        <input
                          type="text"
                          className="c_forum_search form-control form-control-lg search-bar"
                          id="searchDiscussion"
                          placeholder="Search topic..."
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {/*30/24*/}
                        <button
                          id="c_forum_btnsrch"
                          className="btn btn-success"
                          type="button"
                          onClick={searchDiscussions}
                          disabled={isSearchButtonDisabled}
                        >
                          <IoIosSearch />
                          {/*30/24*/}
                        </button>
                      </div>
                    </div>
                  </div>
                  {showDiscussionForm && (
                    <div id="discussionForm">
                      <div>
                        <div className="form-group">
                          <label htmlFor="discussionTitle">
                            Discussion Title
                          </label>
                          <input
                            type="text"
                            className="TeamC_FormCon form-control"
                            id="discussionTitle"
                            placeholder="Enter discussion title"
                            value={discussionTitle}
                            onChange={(e) => setDiscussionTitle(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="discussionContent">
                            Discussion Content
                          </label>
                          <textarea
                            className="TeamC_FormCon form-control"
                            id="discussionContent"
                            rows="3"
                            placeholder="Enter discussion content"
                            value={discussionContent}
                            onChange={(e) =>
                              setDiscussionContent(e.target.value)
                            }
                          />
                          {/*30/24*/}
                        </div>
                        <div className="d-md-flex justify-content-md-end">
                          <button
                            type="button"
                            className="c_forum_btngr btn btn-success"
                            onClick={hideFormHandle}
                            style={{
                              marginTop: "10px",
                              paddingLeft: "11px",
                              backgroundColor: "#165207",
                            }}
                          >
                            Post
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div>{showForm && <DiscussionPostsInstructor />}</div>
              </div>
            </div>
          </div>
          <div
            className="modal fade top-right"
            id="niceModal"
            tabIndex="-1"
            aria-labelledby="niceModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="c_forum_modal modal-content">
                <div className="c_forum_modbod modal-body">
                  Discussion posted!
                </div>
              </div>
            </div>
          </div>
          <div
            className="modalSec modal fade"
            id="discussionDetailModal"
            tabindex="-1"
            aria-labelledby="discussionDetailModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modalCont modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="discussionDetailModalLabel">
                    Discussion Details
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div id="discussionDetailContent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ForumFInstructor;
