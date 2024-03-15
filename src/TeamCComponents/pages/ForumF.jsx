import React, { useState, useEffect } from "react";
import "../css/ffront.css";
import { IoIosSearch } from "react-icons/io";
import DiscussionPosts from "./DiscussionPosts";
import Team_D_HeaderV2 from "../../TeamDComponents/Team_D_HeaderV2";

const ForumF = () => {
  const [isSearchButtonDisabled, setIsSearchButtonDisabled] = useState(true);
  const [showDiscussionForm, setShowDiscussionForm] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [discussionTitle, setDiscussionTitle] = useState("");
  const [discussionContent, setDiscussionContent] = useState("");
  const [discussionPosts, setDiscussionPosts] = useState([]);

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

  // Functionality for hiding form when submit 2.19.24 Change the modal into
  const hideFormHandle = () => {
    setShowForm((prev) => !prev);
    setShowDiscussionForm(false);
    setTimeout(() => {
      alert("Discussion posted!"); // Show alert when form is submitted
    }, 300); // Display alert for prefer time
  };

  return (
    <>
      <Team_D_HeaderV2 />
      <div className="ForumFSpace">
        <div className="container stretch-forum">
          <div className="row justify-content-center">
            <div className="c_forum_adjustm col-lg-12 mb-3">
              {/*30/24*/}
              <div className="row text-left mb-5">
                <br />
                <div className="c_forum_adjustm col-lg-9mx-auto">
                  {/*30/24*/}
                  <div className="row text-left mb-5">
                    <div className="col-lg-6">
                      <button
                        className="c_forum_btngr btn btn-lg btn-success py-2 px-4 mb-3 bg-op-6 roboto-bold"
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
                <div>{showForm && <DiscussionPosts />}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForumF;
