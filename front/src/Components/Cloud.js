import { useEffect, useState } from "react";
import { TagCloud } from "react-tagcloud";

export default function Cloud(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let cloud = props.cloud;
    cloud = cloud.map((element) => {
      return { value: element[0], count: element[1] };
    });
    setData(cloud);
  }, []);

  return (
    <div style={{ width: "500px", height: "500px", overflow: "scroll" }}>
      <TagCloud
        // width={200}
        minSize={12}
        maxSize={50}
        tags={data}
        onClick={(tag) => alert(`'${tag.value}' was selected!`)}
      />
    </div>
  );
}
