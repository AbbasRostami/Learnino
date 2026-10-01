export type SearchCourseItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl?: string;
  price: number;
  level: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
};

export type SearchPostItem = {
  id: string;
  title: string;
  slug: string;
  imageUrl?: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
};

export type SearchResponse = {
  status: "success";
  data: {
    query: string;
    courses: SearchCourseItem[];
    posts: SearchPostItem[];
  };
};
