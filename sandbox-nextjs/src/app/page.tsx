import LinkButton from "./components/LinkButton";
import { revalidateTag } from "next/cache";
import { moduleList } from "./consts";

const Home = () => {
  revalidateTag("tasks");

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-emerald-950">
      <div className="flex flex-col items-center w-1/2 h-1/2 text-orange-900 bg-orange-400 p-4 rounded-3xl">
        <h1 className="text-3xl mb-3">sandbox</h1>
        {moduleList.map((module, index) => (
          <div className="my-2" key={index}>
            <LinkButton
              text={module.name}
              path={module.path}
              active={module.active}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
