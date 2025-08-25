import { TBlogPost } from "@/types/blogTypes";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import BlogInput from "../modules/formInput/BlogInput";
import BlogTextArea from "../modules/formInput/BlogTextArea";
import ImagePreviewer from "../modules/imageUploader/ImagePreviewer";
import ImageUploader from "../modules/imageUploader/ImageUploader";
import { toast } from "sonner";
import { imageUpload } from "@/utills/imageUploader";
import { createBlog } from "@/services/blogService";

const BlogForm = ({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [imageFile, setImageFile] = useState<File | "">("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
    reset,
    trigger,
  } = useForm<TBlogPost>({
    mode: "onChange",
    criteriaMode: "all",
  });
  const onSubmit = async (data: TBlogPost) => {
    if (data?.tags) {
      const tags = data?.tags as string;
      const tagsArray = tags
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0)
        .map((item) => `#${item}`);
      data.tags = tagsArray;
    }
    try {
      if (imageFile) {
        const mealImage = await imageUpload(imageFile);
        if (!mealImage) {
          toast.error("faild to upload image", { duration: 3000 });
        }
        data.coverImage = mealImage as string;
      }

      const result = await createBlog(data);
      if (result?.success) {
        toast.success(result?.message, { duration: 3000 });
        setImagePreview("");
        setOpen(false);
        reset();
      } else {
        toast.error(result?.message, { duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg w-[95%] max-w-2xl relative p-6">
        <button
          onClick={() => {
            setOpen(false);
            reset();
          }}
          className="absolute top-2 right-2 text-2xl text-gray-700 dark:text-white hover:text-red-500 cursor-pointer"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-primary dark:text-yellow-400">
          Create a New Blog
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <BlogInput
            label="Title"
            name="title"
            placeholder="blog title"
            register={register}
            required={true}
            error={errors.title}
            type="text"
            trigger={trigger}
          />
          <BlogTextArea
            label="Content"
            name="content"
            placeholder="Your content"
            register={register}
            error={errors.content}
            required={true}
            validateWatch={watch("content")}
            trigger={trigger}
          />
          {imagePreview ? (
            <ImagePreviewer
              setImageFile={setImageFile}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
            />
          ) : (
            <div>
              <p>Photo uploader (Optional)</p>
              <ImageUploader
                setImageFile={setImageFile}
                setImagePreview={setImagePreview}
              />
            </div>
          )}
          <div>
            <label
              htmlFor="ingredients"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tags (Optional)
            </label>
            <input
              id="tags"
              type="text"
              placeholder="e.g. lunch, dinner, goodMeal"
              {...register("tags", {})}
              className="w-full px-4 py-2 border border-primary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-primary text-sm placeholder-gray-400"
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate items with commas ( , )
            </p>
          </div>
          <div className="flex items-center justify-end">
            <button
              disabled={!isValid || isSubmitting}
              className="bg-secondary hover:bg-white dark:bg-primary dark:border dark:border-secondary dark:text-secondary disabled:bg-gray-700 disabled:text-secondary disabled:cursor-default dark:hover:bg-green-700 duration-500 text-primary border border-primary font-semibold py-1 px-4 rounded-lg shadow-md transition cursor-pointer"
            >
              {isSubmitting ? "Blog Posting" : "Post Your Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
