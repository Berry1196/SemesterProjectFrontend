import { useEffect, useState } from "react";
import axios from "axios";

export default function MuscleGroupImage() {
  const [image, setImage] = useState("");

  const fetchImage = async () => {
    axios
      .get(`https://muscle-group-image-generator.p.rapidapi.com/getImage?muscleGroups=${props.muscleGroups.join(",")}`, {
        headers: {
          "X-RapidAPI-Key": "04cb178b04msh880aff6d34465f7p118339jsn457ca14b4907",
          "X-RapidAPI-Host": "muscle-group-image-generator.p.rapidapi.com",
        },
        responseType: "arraybuffer",
      })
      .then((response) => {
        const imageFile = new Blob([response.data]);
        const imageUrl = URL.createObjectURL(imageFile);
        setImage(imageUrl);
      });
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return <img src={image} alt={`Image of ${props.muscleGroups.join(",")}`} />;
}
