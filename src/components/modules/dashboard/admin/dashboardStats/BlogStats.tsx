import { TBlogsStats } from "@/types/stats.types";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

const BlogStats = ({ data }: { data: TBlogsStats }) => {
  const COLORS = ["#4CAF50", "#FF9800", "#2196F3", "#9C27B0", "#F44336"];
  const topBlogsbyView = data?.topBlogs.map(
    (blog: { title: string; view: number }) => ({
      name:
        blog.title.length > 15 ? blog.title.slice(0, 15) + "..." : blog.title,
      view: blog.view,
    })
  );
  const weeklyBlogs = data?.newBlogsByWeek.map((week) => ({
    week: `Week ${week._id}`,
    blogs: week.count,
  }));
  const blogStatus = [
    { name: "Archived", value: data?.status?.archivedBlog },
    { name: "Published", value: data.status.publishedBlog },
  ];
  return (
    <div className="space-y-10">
      <div className="hidden md:flex flex-col items-start">
        <h3 className="font-semibold mb-2">Top Blogs by view</h3>
        <ResponsiveContainer width={1000} height={500}>
          <BarChart data={topBlogsbyView}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="view" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="md:hidden flex flex-col items-center">
        <h3 className="font-semibold">Top Blogs by view</h3>
        <ResponsiveContainer width={380} height={500}>
          <BarChart
            data={topBlogsbyView}
            margin={{ top: 20, right: 20, left: -20, bottom: 20 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="view" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-10">
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold md:mb-2">New Blogs (Last 4 Weeks)</h3>
          <ResponsiveContainer width={350} height={300}>
            <BarChart
              data={weeklyBlogs}
              margin={{ top: 20, right: 20, left: -20, bottom: 20 }}
            >
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="blogs" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className=" w-full flex flex-col items-center">
          <h3 className="font-semibold ">Blog Status (Published/Archived)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={blogStatus}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {blogStatus.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BlogStats;
