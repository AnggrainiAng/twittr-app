import { useParams } from "react-router-dom";
import CardOtherProfile from "../components/CardOtherProfile/CardOtherProfile";

const OtherProfile = () => {
  const params = useParams();
  return (
    <section className="max-w-7xl mx-auto bg-black text-white">
      <CardOtherProfile userId={params.userId} />
    </section>
  );
};

export default OtherProfile;
