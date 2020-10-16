import { createStoryLine, getCurrentStoryStep } from "../helpers/story_helpers";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as lstorage from "local-storage";
import { plots, STEP_TYPE } from "../constants/story_constants";
import Story from "../components/Story";

export default function MyStoryEndPage() {
  const router = useRouter();
  const [currentStory, setCurrentStory] = useState([]);
  const [authorName, setAuthorName] = useState("");
  const [storyTitle, setStoryTitle] = useState("");

  useEffect(() => {
    const selectedStoryPlot = lstorage("story");
    const author = lstorage("storyAuthor");
    const title = lstorage("storyTitle");
    setAuthorName(author || "");
    setStoryTitle(title || "");

    setCurrentStory(selectedStoryPlot || []);
  }, []);

  const storyLine = createStoryLine(currentStory, plots);

  return (
    <div className="pageWidthAlign">
      <Story story={storyLine} title={storyTitle} author={authorName}></Story>

      <h2>A tua história está pronta e fantástica.</h2>
      <div>Ajuda a casa damião a partilhar histórias</div>
      <br></br>
      <button>Partilhar</button>

      <h1>Doar</h1>
      <div>As crianças da casa damião precisam da tua ajuda neste natal. <a>Saber mais.</a></div>
      <br></br>
      <button>Doar</button>
      <br></br>

      <br></br>
      <br></br>

    </div>
  );
}
