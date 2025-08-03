import { getAllBlogs } from "@/services/blogService";
import ArticleCard from "./ArticleCard";
import { TBlog } from "@/types/blogTypes";
import SeeButton from "./SeeButton";

const LatestArticle = async () => {
  const query: Record<string, string | string[] | number | undefined> = {};
  query.limit = 3;
  const { data: blogData } = await getAllBlogs(query);
  const articles = blogData?.result || [];
  return (
    <section className="md:px-24 px-5 mb-20 space-y-8">
      <div className="max-w-4xl mx-auto text-center space-y-4 px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-800 dark:text-white">
          Read Our Latest Article
        </h2>
        <p className="text-lg md:text-xl font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
          Stay up-to-date with the freshest insights, cooking tips, and culinary
          stories from the Daily Dish community. Our latest articles serve up
          everything from time-saving meal hacks to deep dives into trending
          food topics — helping you make every meal better.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {articles.map((article: TBlog) => (
          <ArticleCard key={article._id} blog={article} />
        ))}
      </div>
      <SeeButton />
    </section>
  );
};

export default LatestArticle;
