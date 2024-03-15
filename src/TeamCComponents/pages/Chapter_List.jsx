import React, { useState, usePara } from "react";
import Team_D_HeaderV2 from "../../TeamDComponents/Team_D_HeaderV2";
import Component_ChapterList from "../components/chapter_list";

function TeamC_ChapterList() {
  const [chapters, setChapters] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const result = await axios.get(
          `http://localhost:8080/api/v1/auth/course/${id}`
        );

        // Ensure that result.data is always an array by converting it
        const coursesArray = Array.isArray(result.data)
          ? result.data
          : [result.data];
        setChapters(coursesArray);
      } catch (error) {
        console.error("Error loading chapters:", error);
      }
    };

    fetchChapters();
  }, [id]);
  console.log(chapters);

  return (
    <>
      <Team_D_HeaderV2 />
      <Component_ChapterList />
    </>
  );
}

export default TeamC_ChapterList;
