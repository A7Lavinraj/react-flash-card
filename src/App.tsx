import { useEffect, useState } from "react";
import CategoryCard from "./components/CategoryCard";
import { getCategories } from "./services";
import QuizPage from "./components/QuizPage";

const colors = [
  "teal",
  "fuchsia",
  "blue",
  "orange",
  "red",
  "green",
  "amber",
  "violet",
];

export default function App() {
  const [isCategoryPage, setIsCategoryPage] = useState<boolean>(true);
  const [category, setCategory] = useState<string>("");
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    [],
  );

  function backToCategoryPage() {
    setIsCategoryPage(true);
  }

  function goToQuizPage(param: string) {
    setIsCategoryPage(false);
    setCategory(param);
  }

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  return (
    <div className="container mx-auto text-center">
      <h1 className="text-3xl font-bold">Flash card</h1>

      {isCategoryPage ? (
        <>
          <p>Choose category and start learning</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-2 place-items-center w-fit mt-8 mx-auto">
            {categories.map((category, index) => {
              return (
                <CategoryCard
                  key={index}
                  title={category.name}
                  color={colors[index]}
                  callback={goToQuizPage}
                />
              );
            })}
          </div>
        </>
      ) : (
        <QuizPage category={category} callback={backToCategoryPage} />
      )}
    </div>
  );
}
