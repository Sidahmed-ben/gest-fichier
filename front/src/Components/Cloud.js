import { useEffect, useState } from "react";
import { TagCloud } from "react-tagcloud";

export default function Cloud(props) {
  const [data, setData] = useState([]);
  const { handleClose, handleSearch, setInputValue } = props;
  function cloudClicked(tag) {
    handleClose();
  }

  useEffect(() => {
    let cloud = props.cloud;
    cloud = cloud.map((element) => {
      if (element[1] > 1) return { value: element[0], count: element[1] };
      else {
        return { value: "", count: 0 };
      }
    });
    setData(cloud);
  }, []);

  return (
    <div
      style={{
        width: "900px",
        height: "500px",
        overflow: "auto",
        marginTop: "20px",
      }}
    >
      <TagCloud
        width={500}
        minSize={12}
        maxSize={50}
        tags={data}
        onClick={(tag) => {
          cloudClicked(tag.value);
          setInputValue(tag.value);
          handleSearch();
        }}
      />
    </div>
  );
}
